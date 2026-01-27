#!/usr/bin/env python3
"""
NADESHIKO 再生数データ更新スクリプト

CSVファイルから48時間以上更新されていない投稿を特定し、
各プラットフォームAPIから最新のインサイトデータを取得してCSVを更新する。

Usage:
    python update_views.py                    # 最新月のCSVを更新
    python update_views.py -f "2026年1月.csv"  # 特定ファイルを指定
    python update_views.py -p TT              # TikTokのみ更新
    python update_views.py --all              # 全CSVファイルを処理
    python update_views.py --dry-run          # ドライラン
"""

import os
import re
import sys
import time
import logging
import argparse
import subprocess
from pathlib import Path
from datetime import datetime, timedelta
from urllib.parse import urlparse, parse_qs

import requests
import pandas as pd
from dotenv import load_dotenv
from tqdm import tqdm

# 環境変数読み込み
load_dotenv()

# ==============================================================================
# 設定
# ==============================================================================

CONFIG = {
    'UPDATE_INTERVAL_HOURS': 48,
    'CSV_DIR': Path(__file__).parent.parent / 'data/再生数シート',
    'COLUMNS': {
        'URL': 'URL',
        'UPDATED_AT': '更新日',
        'SNS': 'sns',
        'TITLE': 'タイトル',
        'DURATION': '動画尺',
        'VIEWS': '再生数',
        'LIKES': 'いいね',
        'COMMENTS': 'コメント',
        'SHARES': '共有',
        'SAVES': '保存',
    },
    'SLEEP_TIMES': {
        'YT': 0.5,
        'TT': 0.5,
        'IG': 0.5,
        'X': 0.5,
    },
    'SNS_PRIORITY': {'TT': 0, 'YT': 1, 'IG': 2, 'X': 3},
}

# APIキー
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
TIKTOK_RAPIDAPI_KEY = os.getenv('TIKTOK_RAPIDAPI_KEY')  # TikTok/IG/X共用

# ロガー設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(Path(__file__).parent / 'update_views.log', encoding='utf-8')
    ]
)
logger = logging.getLogger(__name__)


# ==============================================================================
# ユーティリティ関数
# ==============================================================================

def sanitize_url(url: str) -> str:
    """URLのサニタイズ（code.js:1409-1415）"""
    if not url:
        return ''
    return (str(url)
        .replace('\u200b', '').replace('\u200c', '').replace('\u200d', '').replace('\ufeff', '')
        .replace('\u3000', ' ')
        .strip())


def to_num(value):
    """数値変換（code.js:1403-1407）"""
    if value is None or value == '':
        return ''
    try:
        s = str(value).replace(',', '')
        n = float(s)
        return int(n) if n == int(n) else n
    except:
        return ''


def pick_first(*vals):
    """最初の有効な値を返す（code.js:1417-1425）"""
    for v in vals:
        if v is not None and v != '' and v != 0:
            return v
    return ''


# ==============================================================================
# プラットフォーム判定
# ==============================================================================

def detect_platform(url: str) -> str | None:
    """URLからプラットフォームを判定（code.js:612-629）"""
    if not url:
        return None

    url = sanitize_url(url).lower()

    try:
        parsed = urlparse(url if url.startswith('http') else f'https://{url}')
        host = parsed.netloc.replace('www.', '')

        if 'youtube.com' in host or host == 'youtu.be' or 'm.youtube.com' in host:
            return 'YT'
        if 'tiktok.com' in host:
            return 'TT'
        if 'instagram.com' in host:
            return 'IG'
        if 'twitter.com' in host or host == 'x.com':
            return 'X'
    except:
        pass

    # フォールバック: 文字列マッチ
    if 'youtube.com' in url or 'youtu.be' in url:
        return 'YT'
    if 'tiktok.com' in url:
        return 'TT'
    if 'instagram.com' in url:
        return 'IG'
    if 'twitter.com' in url or 'x.com' in url:
        return 'X'

    return None


# ==============================================================================
# 更新対象フィルタリング
# ==============================================================================

def filter_outdated_rows(df: pd.DataFrame) -> pd.DataFrame:
    """48時間以上更新されていない行をフィルタ（code.js:470-487）"""
    now = datetime.now()
    threshold = now - timedelta(hours=CONFIG['UPDATE_INTERVAL_HOURS'])

    def is_outdated(row):
        updated_at = row.get(CONFIG['COLUMNS']['UPDATED_AT'], '')
        url = row.get(CONFIG['COLUMNS']['URL'], '')

        # URLがない行はスキップ
        if not url or str(url).strip() == '':
            return False

        # 更新日が空 → 対象
        if pd.isna(updated_at) or str(updated_at).strip() == '':
            return True

        # 「エラー」→ スキップ（手動削除まで再取得しない）
        if str(updated_at).strip() == 'エラー':
            return False

        # 日付解析
        try:
            dt_str = str(updated_at).strip()[:19]
            for fmt in ['%Y/%m/%d %H:%M:%S', '%Y-%m-%d %H:%M:%S']:
                try:
                    dt = datetime.strptime(dt_str, fmt)
                    return dt < threshold
                except ValueError:
                    continue
            return True  # パースできない → 対象
        except:
            return True

    mask = df.apply(is_outdated, axis=1)
    return df[mask]


def sort_by_platform_priority(df: pd.DataFrame) -> pd.DataFrame:
    """処理順にソート（TT→YT→IG→X）（code.js:1483-1536）"""
    def get_priority(row):
        url = row.get(CONFIG['COLUMNS']['URL'], '')
        platform = detect_platform(url)
        return CONFIG['SNS_PRIORITY'].get(platform, 4)

    df = df.copy()
    df['_priority'] = df.apply(get_priority, axis=1)
    df_sorted = df.sort_values('_priority')
    df_sorted = df_sorted.drop(columns=['_priority'])
    return df_sorted


# ==============================================================================
# YouTube API
# ==============================================================================

def extract_youtube_id(url: str) -> str:
    """YouTube動画IDを抽出（code.js:655-677）"""
    if not url:
        return ''

    url = sanitize_url(url)

    # 単純なIDの場合
    if re.match(r'^[A-Za-z0-9_-]{6,}$', url) and not url.startswith('http'):
        return url

    try:
        parsed = urlparse(url if url.startswith('http') else f'https://{url}')
        host = parsed.netloc.replace('www.', '').lower()

        # youtu.be/VIDEO_ID
        if host == 'youtu.be':
            match = re.match(r'^/([A-Za-z0-9_-]{6,})', parsed.path)
            if match:
                return match.group(1)

        # youtube.com/watch?v=VIDEO_ID
        if 'youtube.com' in host:
            if parsed.path == '/watch':
                v = parse_qs(parsed.query).get('v', [''])[0]
                if v:
                    return v

            # youtube.com/shorts/VIDEO_ID, /embed/VIDEO_ID, /live/VIDEO_ID
            match = re.match(r'^/(shorts|embed|live)/([A-Za-z0-9_-]{6,})', parsed.path)
            if match:
                return match.group(2)
    except:
        pass

    # フォールバック: 正規表現
    match = re.search(r'[?&]v=([A-Za-z0-9_-]{6,})', url)
    if match:
        return match.group(1)

    match = re.search(r'/(shorts|embed|live)/([A-Za-z0-9_-]{6,})', url)
    if match:
        return match.group(2)

    return ''


def parse_youtube_duration(iso_duration: str) -> int | str:
    """ISO 8601期間をパース（code.js:1393-1401）"""
    if not iso_duration:
        return ''

    match = re.match(r'^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$', iso_duration)
    if not match:
        return ''

    hours = int(match.group(1) or 0)
    minutes = int(match.group(2) or 0)
    seconds = int(match.group(3) or 0)

    return hours * 3600 + minutes * 60 + seconds


def fetch_youtube_info(url: str) -> dict | None:
    """YouTube動画情報を取得（code.js:631-653）"""
    video_id = extract_youtube_id(url)
    if not video_id:
        logger.warning(f'YouTube ID not found: {url}')
        return None

    if not YOUTUBE_API_KEY:
        logger.error('YOUTUBE_API_KEY not set')
        return None

    api_url = 'https://www.googleapis.com/youtube/v3/videos'
    params = {
        'part': 'snippet,statistics,contentDetails',
        'id': video_id,
        'key': YOUTUBE_API_KEY
    }

    try:
        response = requests.get(api_url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        items = data.get('items', [])
        if not items:
            return None

        item = items[0]
        snippet = item.get('snippet', {})
        stats = item.get('statistics', {})
        content = item.get('contentDetails', {})

        return {
            'sns': 'YT',
            'title': snippet.get('title', ''),
            'views': to_num(stats.get('viewCount')),
            'likes': to_num(stats.get('likeCount')),
            'comments': to_num(stats.get('commentCount')),
            'shares': '',
            'saves': '',
            'duration': parse_youtube_duration(content.get('duration', '')),
        }
    except Exception as e:
        logger.error(f'YouTube API error for {url}: {e}')
        return None


# ==============================================================================
# TikTok API
# ==============================================================================

def extract_tiktok_id(url: str) -> str:
    """TikTok動画IDを抽出（code.js:784-795）"""
    if not url:
        return ''

    url = sanitize_url(url)

    try:
        parsed = urlparse(url if url.startswith('http') else f'https://{url}')
        # /@user/video/1234567890 or /@user/photo/1234567890
        match = re.search(r'/(video|photo)/(\d+)', parsed.path)
        if match:
            return match.group(2)
    except:
        pass

    # フォールバック: 数字の連続
    match = re.search(r'(\d{8,})', url)
    return match.group(1) if match else ''


def resolve_tiktok_url(url: str) -> str:
    """TikTok短縮URL解決（code.js:798-818）"""
    try:
        response = requests.get(url, allow_redirects=False, timeout=10, headers={
            'User-Agent': 'Mozilla/5.0'
        })
        if 300 <= response.status_code < 400:
            location = response.headers.get('Location', '')
            if location:
                return sanitize_url(location)
    except Exception as e:
        logger.warning(f'TikTok URL resolve error: {e}')
    return url


def extract_tiktok_data(json_data: dict) -> dict | None:
    """TikTokレスポンスからデータ抽出（code.js:1427-1448）"""
    if not json_data:
        return None

    # パターン1: itemInfo.itemStruct
    if json_data.get('itemInfo', {}).get('itemStruct'):
        return json_data['itemInfo']['itemStruct']

    # パターン2: data.itemInfo.itemStruct
    data = json_data.get('data', {})
    if data.get('itemInfo', {}).get('itemStruct'):
        return data['itemInfo']['itemStruct']

    # パターン3: data直下
    if data:
        for key in ['item', 'itemInfo', 'item_info']:
            if data.get(key, {}).get('itemStruct'):
                return data[key]['itemStruct']
        if data.get('item_struct'):
            return data['item_struct']
        if data.get('itemStruct'):
            return data['itemStruct']
        if data.get('aweme_details'):
            return data['aweme_details'][0]
        if data.get('aweme_detail'):
            return data['aweme_detail']
        return data

    # パターン4: aweme_detail直下
    if json_data.get('aweme_detail'):
        return json_data['aweme_detail']
    if json_data.get('aweme_details'):
        return json_data['aweme_details'][0]

    return None


def format_tiktok_response(data: dict) -> dict:
    """TikTokデータを統一形式に変換（code.js:769-781）"""
    stats = data.get('stats') or data.get('video_stats') or data.get('statistics') or {}
    video = data.get('video', {})

    return {
        'sns': 'TikTok',
        'title': pick_first(data.get('title'), data.get('desc'), data.get('caption'),
                           data.get('description'), video.get('title'), video.get('desc')) or '',
        'views': to_num(pick_first(stats.get('playCount'), stats.get('play_count'), stats.get('play'))),
        'likes': to_num(pick_first(stats.get('diggCount'), stats.get('digg_count'), stats.get('like_count'))),
        'comments': to_num(pick_first(stats.get('commentCount'), stats.get('comment_count'))),
        'shares': to_num(pick_first(stats.get('shareCount'), stats.get('share_count'))),
        'saves': to_num(pick_first(stats.get('collectCount'), stats.get('collect_count'), stats.get('save_count'))),
        'duration': to_num(pick_first(data.get('duration'), video.get('duration'))),
    }


def fetch_tiktok_via_rapidapi(video_id: str, url: str) -> dict | None:
    """RapidAPI経由でTikTok情報取得（tiktok-video-downloader-api使用）"""
    from urllib.parse import quote

    # URLをエンコード
    encoded_url = quote(url, safe='')
    api_url = f'https://tiktok-video-downloader-api.p.rapidapi.com/media?videoUrl={encoded_url}'
    headers = {
        'X-RapidAPI-Key': TIKTOK_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'tiktok-video-downloader-api.p.rapidapi.com'
    }

    try:
        response = requests.get(api_url, headers=headers, timeout=15)

        if response.status_code != 200:
            logger.warning(f'TikTok RapidAPI status {response.status_code}')
            return None

        json_data = response.json()

        # エラーチェック
        if 'error' in json_data:
            logger.warning(f'TikTok API error: {json_data.get("error")}')
            return None

        stats = json_data.get('stats', {})
        author = json_data.get('author', {})

        return {
            'sns': 'TikTok',
            'title': json_data.get('description', ''),
            'views': to_num(stats.get('views')),
            'likes': to_num(stats.get('likes')),
            'comments': to_num(stats.get('comments')),
            'shares': to_num(stats.get('shares')),
            'saves': to_num(stats.get('saves')),
            'duration': '',  # このAPIはdurationを返さない
        }
    except Exception as e:
        logger.error(f'TikTok RapidAPI error: {e}')
        return None


def fetch_tiktok_via_web(video_id: str, url: str) -> dict | None:
    """公式Web API経由でTikTok情報取得（code.js:821-879）"""
    api_url = f'https://www.tiktok.com/api/item/detail/?itemId={video_id}'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
        'Referer': 'https://www.tiktok.com/'
    }

    try:
        response = requests.get(api_url, headers=headers, timeout=15)

        if response.status_code != 200:
            logger.warning(f'TikTok Web API status {response.status_code}')
            return None

        json_data = response.json()
        item = json_data.get('itemInfo', {}).get('itemStruct')

        if not item:
            return None

        stats = item.get('stats', {})
        return {
            'sns': 'TikTok',
            'title': item.get('desc', ''),
            'views': to_num(stats.get('playCount')),
            'likes': to_num(stats.get('diggCount')),
            'comments': to_num(stats.get('commentCount')),
            'shares': to_num(stats.get('shareCount')),
            'saves': to_num(stats.get('collectCount')),
            'duration': to_num(item.get('video', {}).get('duration')),
        }
    except Exception as e:
        logger.error(f'TikTok Web API error: {e}')
        return None


def fetch_tiktok_info(url: str) -> dict | None:
    """TikTok動画情報を取得（code.js:680-782）"""
    video_id = extract_tiktok_id(url)

    # 短縮URL解決
    if not video_id:
        resolved_url = resolve_tiktok_url(url)
        if resolved_url and resolved_url != url:
            video_id = extract_tiktok_id(resolved_url)
            url = resolved_url
            logger.info(f'TikTok URL resolved: {resolved_url}')

    if not video_id:
        logger.warning(f'TikTok ID not found: {url}')
        return None

    # RapidAPI (tiktok-api23)
    if TIKTOK_RAPIDAPI_KEY:
        result = fetch_tiktok_via_rapidapi(video_id, url)
        if result:
            return result

    # フォールバック: 公式Web API
    return fetch_tiktok_via_web(video_id, url)


# ==============================================================================
# Instagram API
# ==============================================================================

def normalize_instagram_url(url: str) -> str:
    """Instagram URL正規化"""
    try:
        parsed = urlparse(url if url.startswith('http') else f'https://{url}')

        # /@username/reel/ID → /reel/ID
        path = parsed.path
        match = re.match(r'^\/?@?([^/]+)/(reel|p)/([A-Za-z0-9_-]+)', path)
        if match:
            post_type = match.group(2)
            post_id = match.group(3)
            return f'https://www.instagram.com/{post_type}/{post_id}'

        return f'https://www.instagram.com{path}'.rstrip('/')
    except:
        return url.replace('http://', 'https://').split('?')[0].split('#')[0].rstrip('/')


def fetch_instagram_via_rapidapi(url: str) -> dict | None:
    """RapidAPI (instagram-scraper-stable-api) 経由でInstagram情報取得"""
    from urllib.parse import quote

    encoded_url = quote(url, safe='')
    api_url = f'https://instagram-scraper-stable-api.p.rapidapi.com/get_media_data.php?reel_post_code_or_url={encoded_url}&type=reel'
    headers = {
        'X-RapidAPI-Key': TIKTOK_RAPIDAPI_KEY,  # 同じRapidAPIキーを使用
        'X-RapidAPI-Host': 'instagram-scraper-stable-api.p.rapidapi.com'
    }

    try:
        response = requests.get(api_url, headers=headers, timeout=15)

        if response.status_code != 200:
            logger.warning(f'IG RapidAPI status {response.status_code}')
            return None

        json_data = response.json()

        # エラーチェック
        if 'error' in json_data:
            logger.warning(f'IG RapidAPI error: {json_data.get("error")}')
            return None

        # レスポンス構造: data.xdt_shortcode_media
        media = json_data.get('data', {}).get('xdt_shortcode_media', {})
        if not media:
            logger.warning('IG RapidAPI: xdt_shortcode_media not found')
            return None

        # キャプション取得
        edge_caption = media.get('edge_media_to_caption', {})
        caption = ''
        if edge_caption.get('edges'):
            caption = edge_caption['edges'][0].get('node', {}).get('text', '')

        # いいね数（-1の場合は非公開）
        edge_like = media.get('edge_media_preview_like', {})
        likes = edge_like.get('count', 0)
        if likes == -1:
            likes = ''

        # コメント数
        edge_comment = media.get('edge_media_to_parent_comment', {}) or media.get('edge_media_to_comment', {})
        comments = edge_comment.get('count', 0)

        return {
            'sns': 'IG',
            'title': caption,
            'views': to_num(media.get('video_play_count') or media.get('video_view_count')),
            'likes': to_num(likes) if likes != '' else '',
            'comments': to_num(comments),
            'shares': '',
            'saves': '',
            'duration': to_num(media.get('video_duration')),
        }
    except Exception as e:
        logger.error(f'IG RapidAPI error: {e}')
        return None


def fetch_instagram_info(url: str) -> dict | None:
    """Instagram投稿情報を取得"""
    normalized_url = normalize_instagram_url(url)

    if not TIKTOK_RAPIDAPI_KEY:
        logger.error('TIKTOK_RAPIDAPI_KEY not set (used for IG API too)')
        return None

    return fetch_instagram_via_rapidapi(normalized_url)


# ==============================================================================
# X (Twitter) API
# ==============================================================================

def extract_tweet_id(url: str) -> str:
    """ツイートIDを抽出"""
    if not url:
        return ''

    url = sanitize_url(url)

    # status/ID パターン
    match = re.search(r'status/(\d+)', url)
    if match:
        return match.group(1)

    return ''


def fetch_x_via_rapidapi(tweet_id: str) -> dict | None:
    """RapidAPI (twitter241) 経由でX情報取得"""
    api_url = f'https://twitter241.p.rapidapi.com/tweet-v2?pid={tweet_id}'
    headers = {
        'X-RapidAPI-Key': TIKTOK_RAPIDAPI_KEY,  # 同じRapidAPIキーを使用
        'X-RapidAPI-Host': 'twitter241.p.rapidapi.com'
    }

    try:
        response = requests.get(api_url, headers=headers, timeout=15)

        if response.status_code != 200:
            logger.warning(f'X RapidAPI status {response.status_code}')
            return None

        json_data = response.json()

        # 正しいパス: result.tweetResult.result
        tweet_result = json_data.get('result', {}).get('tweetResult', {}).get('result', {})

        if not tweet_result:
            logger.warning('X RapidAPI: tweetResult not found')
            return None

        # legacy データ（likes, retweets, replies等）
        legacy = tweet_result.get('legacy', {})

        # views は result.tweetResult.result.views.count にある
        views_obj = tweet_result.get('views', {})
        view_count = views_obj.get('count') if isinstance(views_obj, dict) else None

        return {
            'sns': 'X(Twitter)',
            'title': legacy.get('full_text', ''),
            'views': to_num(view_count),
            'likes': to_num(legacy.get('favorite_count')),
            'comments': to_num(legacy.get('reply_count')),
            'shares': to_num(legacy.get('retweet_count')),
            'saves': to_num(legacy.get('bookmark_count', '')),
            'duration': '',
        }
    except Exception as e:
        logger.error(f'X RapidAPI error: {e}')
        return None


def fetch_x_info(url: str) -> dict | None:
    """X(Twitter)投稿情報を取得"""
    tweet_id = extract_tweet_id(url)

    if not tweet_id:
        logger.warning(f'Tweet ID not found: {url}')
        return None

    if not TIKTOK_RAPIDAPI_KEY:
        logger.error('TIKTOK_RAPIDAPI_KEY not set (used for X API too)')
        return None

    return fetch_x_via_rapidapi(tweet_id)


# ==============================================================================
# メイン処理
# ==============================================================================

def fetch_insight(platform: str, url: str) -> dict | None:
    """プラットフォーム別にインサイト取得"""
    if platform == 'YT':
        return fetch_youtube_info(url)
    elif platform == 'TT':
        return fetch_tiktok_info(url)
    elif platform == 'IG':
        return fetch_instagram_info(url)
    elif platform == 'X':
        return fetch_x_info(url)
    return None


def update_dataframe_row(df: pd.DataFrame, idx, info: dict):
    """DataFrameの行を更新（全て文字列として保存）"""
    cols = CONFIG['COLUMNS']

    if info.get('sns'):
        df.at[idx, cols['SNS']] = str(info['sns'])
    if info.get('title'):
        df.at[idx, cols['TITLE']] = str(info['title'])
    if info.get('duration') != '':
        df.at[idx, cols['DURATION']] = str(info['duration'])
    if info.get('views') != '':
        df.at[idx, cols['VIEWS']] = str(info['views'])
    if info.get('likes') != '':
        df.at[idx, cols['LIKES']] = str(info['likes'])
    if info.get('comments') != '':
        df.at[idx, cols['COMMENTS']] = str(info['comments'])
    if info.get('shares') != '':
        df.at[idx, cols['SHARES']] = str(info['shares'])
    if info.get('saves') != '':
        df.at[idx, cols['SAVES']] = str(info['saves'])

    # 更新日を記録
    df.at[idx, cols['UPDATED_AT']] = datetime.now().strftime('%Y/%m/%d %H:%M:%S')


def get_sleep_time(platform: str) -> float:
    """プラットフォーム別のsleep時間"""
    return CONFIG['SLEEP_TIMES'].get(platform, 1.0)


def process_file(filepath: Path, platform_filter: str = None, dry_run: bool = False, limit: int = None) -> tuple[int, int, int]:
    """
    CSVファイルを処理
    Returns: (対象件数, 成功件数, 失敗件数)
    """
    logger.info(f'Processing: {filepath.name}')

    # CSV読み込み
    df = pd.read_csv(filepath, dtype=str)
    df = df.fillna('')

    # バックアップ作成
    if not dry_run:
        backup_path = filepath.with_suffix('.csv.bak')
        df.to_csv(backup_path, index=False)
        logger.info(f'Backup created: {backup_path.name}')

    # 更新対象行をフィルタ
    outdated_df = filter_outdated_rows(df)

    # プラットフォームフィルタ
    if platform_filter:
        outdated_df = outdated_df[
            outdated_df[CONFIG['COLUMNS']['URL']].apply(
                lambda x: detect_platform(x) == platform_filter
            )
        ]

    # 件数制限
    if limit and len(outdated_df) > limit:
        outdated_df = outdated_df.head(limit)

    total = len(outdated_df)
    logger.info(f'Target rows: {total}')

    if total == 0:
        return 0, 0, 0

    # 処理順にソート
    outdated_df = sort_by_platform_priority(outdated_df)

    success_count = 0
    error_count = 0

    for idx in tqdm(outdated_df.index, desc='Updating'):
        row = df.loc[idx]
        url = row.get(CONFIG['COLUMNS']['URL'], '')

        if not url:
            continue

        platform = detect_platform(url)
        platform_icon = {'YT': '📺', 'TT': '🎵', 'IG': '📸', 'X': '🐦'}.get(platform, '❓')

        logger.info(f'{platform_icon} Processing: {url[:60]}...')

        if dry_run:
            logger.info(f'  [DRY RUN] Would fetch {platform} data')
            continue

        try:
            info = fetch_insight(platform, url)

            if info:
                update_dataframe_row(df, idx, info)
                success_count += 1
                logger.info(f'  ✅ Success: views={info.get("views", "N/A")}')

                # 10件ごとに中間保存
                if success_count % 10 == 0:
                    df.to_csv(filepath, index=False)
                    logger.info(f'  💾 Saved ({success_count} rows)')
            else:
                df.at[idx, CONFIG['COLUMNS']['UPDATED_AT']] = 'エラー'
                error_count += 1
                logger.warning(f'  ❌ No data')

            # レート制限対策
            time.sleep(get_sleep_time(platform))

        except Exception as e:
            logger.error(f'  ❌ Error: {e}')
            df.at[idx, CONFIG['COLUMNS']['UPDATED_AT']] = 'エラー'
            error_count += 1

    # 最終保存
    if not dry_run:
        df.to_csv(filepath, index=False)
        logger.info(f'Final save: {filepath.name}')

    return total, success_count, error_count


def get_latest_csv() -> Path:
    """最新のCSVファイルを取得"""
    csv_files = sorted(CONFIG['CSV_DIR'].glob('*.csv'), reverse=True)
    # .bakファイルを除外
    csv_files = [f for f in csv_files if not f.name.endswith('.bak')]
    if not csv_files:
        raise FileNotFoundError(f'No CSV files found in {CONFIG["CSV_DIR"]}')
    return csv_files[0]


def run_json_conversion():
    """csv_to_views.pyを実行"""
    script_path = Path(__file__).parent / 'csv_to_views.py'
    if script_path.exists():
        logger.info('Running csv_to_views.py...')
        subprocess.run([sys.executable, str(script_path)], check=True)
        logger.info('JSON conversion completed')
    else:
        logger.warning(f'csv_to_views.py not found: {script_path}')


def main():
    parser = argparse.ArgumentParser(
        description='NADESHIKO 再生数データ更新スクリプト',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
例:
  python update_views.py                    # 最新月のCSVを更新
  python update_views.py -f "2026年1月.csv"  # 特定ファイルを指定
  python update_views.py -p TT              # TikTokのみ更新
  python update_views.py --all              # 全CSVファイルを処理
  python update_views.py --dry-run          # ドライラン
  python update_views.py --no-convert       # JSON変換をスキップ
        '''
    )
    parser.add_argument('--file', '-f', type=str, help='対象CSVファイル名（デフォルト: 最新月）')
    parser.add_argument('--all', action='store_true', help='全CSVファイルを処理')
    parser.add_argument('--platform', '-p', choices=['YT', 'TT', 'IG', 'X'], help='特定プラットフォームのみ')
    parser.add_argument('--limit', '-l', type=int, help='処理する最大行数（テスト用）')
    parser.add_argument('--dry-run', action='store_true', help='実際の更新を行わない')
    parser.add_argument('--no-convert', action='store_true', help='JSON変換をスキップ')
    args = parser.parse_args()

    # APIキー確認
    missing_keys = []
    if not YOUTUBE_API_KEY:
        missing_keys.append('YOUTUBE_API_KEY')
    if not TIKTOK_RAPIDAPI_KEY:
        missing_keys.append('TIKTOK_RAPIDAPI_KEY (TikTok/IG/X共用)')

    if missing_keys:
        logger.warning(f'Missing API keys: {", ".join(missing_keys)}')
        logger.warning('Some platforms may not work')

    start_time = datetime.now()
    total_all = 0
    success_all = 0
    error_all = 0

    if args.all:
        # 全ファイル処理
        csv_files = sorted(CONFIG['CSV_DIR'].glob('*.csv'))
        csv_files = [f for f in csv_files if not f.name.endswith('.bak')]
        for filepath in csv_files:
            total, success, error = process_file(filepath, args.platform, args.dry_run, args.limit)
            total_all += total
            success_all += success
            error_all += error
    else:
        # 単一ファイル処理
        if args.file:
            filepath = CONFIG['CSV_DIR'] / args.file
            if not filepath.exists():
                logger.error(f'File not found: {filepath}')
                sys.exit(1)
        else:
            filepath = get_latest_csv()

        total_all, success_all, error_all = process_file(filepath, args.platform, args.dry_run, args.limit)

    # 結果サマリー
    elapsed = datetime.now() - start_time
    logger.info('=' * 60)
    logger.info(f'🎉 完了!')
    logger.info(f'  対象: {total_all}件')
    logger.info(f'  成功: {success_all}件')
    logger.info(f'  失敗: {error_all}件')
    logger.info(f'  処理時間: {elapsed}')
    logger.info('=' * 60)

    # JSON変換
    if not args.dry_run and not args.no_convert and success_all > 0:
        run_json_conversion()


if __name__ == '__main__':
    main()
