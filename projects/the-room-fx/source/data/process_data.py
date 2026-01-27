#!/usr/bin/env python3
"""
THE Room FX - SNSデータ処理スクリプト
トライブ分析用のデータ加工・集計を行う
"""

import pandas as pd
import json
import re
from pathlib import Path
from datetime import datetime
from collections import Counter

# パス設定
BASE_DIR = Path(__file__).parent
RAW_DIR = BASE_DIR / "raw"
PROCESSED_DIR = BASE_DIR / "processed"
SUMMARY_DIR = BASE_DIR / "summary"
ANALYSIS_DIR = BASE_DIR / "analysis"

# 入力ファイル
INPUT_FILE = RAW_DIR / "export_AnyMindGroup_ビジネスクラス海外_auOahTdC (1).csv"

# トライブ分類キーワード
TRIBE_KEYWORDS = {
    "Business Traveler": [
        "business", "executive", "ceo", "entrepreneur", "corporate", "cfo", "cto",
        "founder", "director", "manager", "consultant", "professional", "lawyer",
        "attorney", "banker", "finance", "investment", "investor"
    ],
    "Travel Enthusiast": [
        "travel", "traveler", "traveller", "wanderlust", "explorer", "aviation",
        "avgeek", "miles", "points", "frequent flyer", "jetsetter", "nomad",
        "globe", "world", "adventure", "passport", "trip", "journey"
    ],
    "Luxury Lifestyle": [
        "luxury", "premium", "first class", "vip", "elite", "exclusive",
        "affluent", "lifestyle", "fashion", "designer", "style"
    ],
    "Tech/Digital": [
        "tech", "developer", "engineer", "software", "digital", "startup",
        "founder", "data", "ai", "product", "crypto", "web3", "coder",
        "programmer", "it "
    ],
    "Creative": [
        "creator", "writer", "author", "photographer", "artist", "designer",
        "filmmaker", "journalist", "blogger", "influencer", "content",
        "youtuber", "podcaster", "media"
    ],
    "Japan Interest": [
        "japan", "tokyo", "osaka", "kyoto", "anime", "manga", "日本", "東京",
        "japanese", "nihon", "nippon", "sushi", "ramen", "samurai"
    ]
}

# トピック分類キーワード
TOPIC_KEYWORDS = {
    "Seat & Comfort": [
        "seat", "comfort", "legroom", "flat bed", "suite", "pod", "privacy",
        "sleep", "rest", "lie-flat", "spacious", "room"
    ],
    "Food & Dining": [
        "food", "meal", "dining", "champagne", "wine", "menu", "chef",
        "breakfast", "lunch", "dinner", "catering", "cuisine"
    ],
    "Service": [
        "service", "crew", "attendant", "staff", "flight attendant", "hospitality",
        "friendly", "helpful", "rude", "excellent service"
    ],
    "Lounge": [
        "lounge", "priority", "access", "airport lounge", "spa", "shower",
        "buffet", "waiting"
    ],
    "Price & Miles": [
        "price", "miles", "points", "upgrade", "deal", "expensive", "worth",
        "value", "cost", "affordable", "redeem", "award"
    ],
    "Entertainment": [
        "entertainment", "movie", "wifi", "screen", "tv", "ife", "music"
    ]
}

# 航空会社キーワード
AIRLINE_KEYWORDS = {
    "American Airlines": ["american airlines", "americanair", "@aa"],
    "United Airlines": ["united airlines", "united ", "@united"],
    "Delta Air Lines": ["delta", "delta air"],
    "Lufthansa": ["lufthansa"],
    "Air France": ["air france", "airfrance"],
    "British Airways": ["british airways", "ba ", "@britishairways"],
    "Singapore Airlines": ["singapore airlines", "singaporeair"],
    "Emirates": ["emirates"],
    "Qatar Airways": ["qatar", "qatar airways"],
    "ANA": ["ana ", "all nippon", "全日空"],
    "JAL": ["jal ", "japan airlines", "日本航空"],
    "Air Canada": ["air canada"],
    "Cathay Pacific": ["cathay pacific", "cathay"],
    "Korean Air": ["korean air"]
}

# 地域分類
REGION_MAPPING = {
    # TC1 - 北米
    "us": "TC1_NA", "ca": "TC1_NA", "mx": "TC1_NA",
    "united states": "TC1_NA", "canada": "TC1_NA", "mexico": "TC1_NA",
    # TC2 - 欧州
    "uk": "TC2_EU", "gb": "TC2_EU", "united kingdom": "TC2_EU",
    "de": "TC2_EU", "germany": "TC2_EU",
    "fr": "TC2_EU", "france": "TC2_EU",
    "it": "TC2_EU", "italy": "TC2_EU",
    "es": "TC2_EU", "spain": "TC2_EU",
    "nl": "TC2_EU", "netherlands": "TC2_EU",
    "be": "TC2_EU", "belgium": "TC2_EU",
    "ch": "TC2_EU", "switzerland": "TC2_EU",
    "at": "TC2_EU", "austria": "TC2_EU",
    "se": "TC2_EU", "sweden": "TC2_EU",
    "no": "TC2_EU", "norway": "TC2_EU",
    "dk": "TC2_EU", "denmark": "TC2_EU",
    "fi": "TC2_EU", "finland": "TC2_EU",
    "ie": "TC2_EU", "ireland": "TC2_EU",
    "pt": "TC2_EU", "portugal": "TC2_EU",
    "pl": "TC2_EU", "poland": "TC2_EU",
    # TC3 - APAC
    "jp": "TC3_APAC", "japan": "TC3_APAC",
    "cn": "TC3_APAC", "china": "TC3_APAC",
    "kr": "TC3_APAC", "south korea": "TC3_APAC",
    "sg": "TC3_APAC", "singapore": "TC3_APAC",
    "th": "TC3_APAC", "thailand": "TC3_APAC",
    "au": "TC3_APAC", "australia": "TC3_APAC",
    "hk": "TC3_APAC", "hong kong": "TC3_APAC",
    "tw": "TC3_APAC", "taiwan": "TC3_APAC",
    "id": "TC3_APAC", "indonesia": "TC3_APAC",
    "my": "TC3_APAC", "malaysia": "TC3_APAC",
    "vn": "TC3_APAC", "vietnam": "TC3_APAC",
    "in": "TC3_APAC", "india": "TC3_APAC",
}

# ターゲット国
TARGET_COUNTRIES = {
    "us": "US", "united states": "US",
    "uk": "UK", "gb": "UK", "united kingdom": "UK",
    "fr": "FR", "france": "FR",
    "de": "DE", "germany": "DE",
    "it": "IT", "italy": "IT",
    "ca": "CA", "canada": "CA"
}


def load_data():
    """CSVデータを読み込む"""
    print(f"Loading data from {INPUT_FILE}...")
    df = pd.read_csv(INPUT_FILE, encoding='utf-8', low_memory=False)
    print(f"Loaded {len(df)} rows")
    return df


def classify_region(country_code, country_name):
    """地域を分類する"""
    if pd.isna(country_code) and pd.isna(country_name):
        return "Unknown"

    # 国コードで判定
    if pd.notna(country_code):
        cc = str(country_code).lower().strip()
        if cc in REGION_MAPPING:
            return REGION_MAPPING[cc]

    # 国名で判定
    if pd.notna(country_name):
        cn = str(country_name).lower().strip()
        if cn in REGION_MAPPING:
            return REGION_MAPPING[cn]

    return "Other"


def classify_target_country(country_code, country_name):
    """ターゲット国を分類する"""
    if pd.isna(country_code) and pd.isna(country_name):
        return "Other"

    if pd.notna(country_code):
        cc = str(country_code).lower().strip()
        if cc in TARGET_COUNTRIES:
            return TARGET_COUNTRIES[cc]

    if pd.notna(country_name):
        cn = str(country_name).lower().strip()
        if cn in TARGET_COUNTRIES:
            return TARGET_COUNTRIES[cn]

    return "Other"


def classify_tribe(text):
    """テキストからトライブを分類する"""
    if pd.isna(text):
        return []

    text_lower = str(text).lower()
    tribes = []

    for tribe, keywords in TRIBE_KEYWORDS.items():
        for keyword in keywords:
            if keyword in text_lower:
                tribes.append(tribe)
                break

    return tribes


def extract_topics(text):
    """テキストからトピックを抽出する"""
    if pd.isna(text):
        return []

    text_lower = str(text).lower()
    topics = []

    for topic, keywords in TOPIC_KEYWORDS.items():
        for keyword in keywords:
            if keyword in text_lower:
                topics.append(topic)
                break

    return topics


def extract_airline(text):
    """テキストから航空会社を抽出する"""
    if pd.isna(text):
        return "Other"

    text_lower = str(text).lower()

    for airline, keywords in AIRLINE_KEYWORDS.items():
        for keyword in keywords:
            if keyword in text_lower:
                return airline

    return "Other"


def parse_date(date_str):
    """日付文字列をパースする"""
    if pd.isna(date_str):
        return None

    try:
        # フォーマット: YY/MM/DD HH:MM:SS
        return datetime.strptime(str(date_str), "%y/%m/%d %H:%M:%S")
    except ValueError:
        return None


def process_data(df):
    """データを処理・加工する"""
    print("Processing data...")

    # カラム名の確認
    print(f"Columns: {df.columns.tolist()[:20]}...")

    # クリーンデータ作成
    clean_df = pd.DataFrame()

    # 基本情報
    clean_df['id'] = df['url']
    clean_df['published_at'] = df['published'].apply(parse_date)
    clean_df['content'] = df['content']
    clean_df['lang'] = df['lang']
    clean_df['sentiment'] = pd.to_numeric(df['sentiment'], errors='coerce').fillna(0)

    # 著者情報
    clean_df['author_name'] = df['extra_author_attributes.name']
    clean_df['author_gender'] = df['extra_author_attributes.gender']
    clean_df['author_followers'] = pd.to_numeric(
        df['source_extended_attributes.twitter_followers'], errors='coerce'
    ).fillna(0).astype(int)
    clean_df['author_description'] = df['extra_author_attributes.description']
    clean_df['author_url'] = df['extra_author_attributes.url']

    # 地理情報
    clean_df['country'] = df['extra_article_attributes.world_data.country']
    clean_df['country_code'] = df['extra_article_attributes.world_data.country_code']
    clean_df['city'] = df['extra_article_attributes.world_data.city']

    # エンゲージメント指標
    clean_df['impressions'] = pd.to_numeric(
        df['article_extended_attributes.twitter_impressions'], errors='coerce'
    ).fillna(0).astype(int)
    clean_df['likes'] = pd.to_numeric(
        df['article_extended_attributes.twitter_likes'], errors='coerce'
    ).fillna(0).astype(int)
    clean_df['retweets'] = pd.to_numeric(
        df['article_extended_attributes.twitter_retweets'], errors='coerce'
    ).fillna(0).astype(int)
    clean_df['replies'] = pd.to_numeric(
        df['article_extended_attributes.twitter_replies'], errors='coerce'
    ).fillna(0).astype(int)
    clean_df['engagement'] = pd.to_numeric(df['engagement'], errors='coerce').fillna(0).astype(int)
    clean_df['reach'] = pd.to_numeric(df['reach'], errors='coerce').fillna(0).astype(int)

    # 地域分類
    clean_df['region'] = clean_df.apply(
        lambda row: classify_region(row['country_code'], row['country']), axis=1
    )
    clean_df['target_country'] = clean_df.apply(
        lambda row: classify_target_country(row['country_code'], row['country']), axis=1
    )

    # トライブ分類（プロフィールから）
    clean_df['tribes'] = clean_df['author_description'].apply(classify_tribe)
    clean_df['tribe_primary'] = clean_df['tribes'].apply(
        lambda x: x[0] if x else "Unclassified"
    )

    # トピック抽出（投稿内容から）
    clean_df['topics'] = clean_df['content'].apply(extract_topics)

    # 航空会社抽出
    clean_df['airline'] = clean_df['content'].apply(extract_airline)

    print(f"Processed {len(clean_df)} rows")
    return clean_df


def save_clean_data(clean_df):
    """クリーンデータを保存する"""
    print("Saving clean data...")

    # CSV保存（tribesとtopicsはJSON文字列に変換）
    csv_df = clean_df.copy()
    csv_df['tribes'] = csv_df['tribes'].apply(json.dumps)
    csv_df['topics'] = csv_df['topics'].apply(json.dumps)
    csv_df.to_csv(PROCESSED_DIR / "clean.csv", index=False, encoding='utf-8')

    # JSON保存
    json_data = clean_df.to_dict(orient='records')
    for record in json_data:
        if pd.notna(record.get('published_at')):
            record['published_at'] = record['published_at'].isoformat()
    with open(PROCESSED_DIR / "clean.json", 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)

    # ターゲット地域のみ抽出
    target_df = clean_df[clean_df['target_country'] != 'Other'].copy()
    target_csv = target_df.copy()
    target_csv['tribes'] = target_csv['tribes'].apply(json.dumps)
    target_csv['topics'] = target_csv['topics'].apply(json.dumps)
    target_csv.to_csv(PROCESSED_DIR / "target_region.csv", index=False, encoding='utf-8')

    target_json = target_df.to_dict(orient='records')
    for record in target_json:
        if pd.notna(record.get('published_at')):
            record['published_at'] = record['published_at'].isoformat()
    with open(PROCESSED_DIR / "target_region.json", 'w', encoding='utf-8') as f:
        json.dump(target_json, f, ensure_ascii=False, indent=2)

    print(f"Saved clean.csv ({len(clean_df)} rows)")
    print(f"Saved target_region.csv ({len(target_df)} rows)")


def generate_author_profiles(clean_df):
    """著者プロファイル分析を生成する"""
    print("Generating author profiles...")

    # 著者ごとに集計
    author_stats = clean_df.groupby('author_name').agg({
        'author_description': 'first',
        'author_followers': 'first',
        'author_url': 'first',
        'country': 'first',
        'target_country': 'first',
        'region': 'first',
        'id': 'count',
        'sentiment': 'mean',
        'engagement': 'sum',
        'impressions': 'sum',
        'tribe_primary': 'first'
    }).reset_index()

    author_stats.columns = [
        'author_name', 'author_description', 'followers', 'author_url',
        'country', 'target_country', 'region', 'post_count',
        'avg_sentiment', 'total_engagement', 'total_impressions', 'tribe'
    ]

    # ソート（フォロワー数順）
    author_stats = author_stats.sort_values('followers', ascending=False)

    # 保存
    author_stats.to_csv(SUMMARY_DIR / "author_profiles.csv", index=False, encoding='utf-8')

    print(f"Generated author_profiles.csv ({len(author_stats)} authors)")
    return author_stats


def generate_tribe_distribution(clean_df):
    """トライブ分布を生成する"""
    print("Generating tribe distribution...")

    # トライブごとに集計
    tribe_stats = clean_df.groupby('tribe_primary').agg({
        'id': 'count',
        'author_name': 'nunique',
        'author_followers': 'mean',
        'impressions': 'sum',
        'engagement': 'sum',
        'sentiment': 'mean'
    }).reset_index()

    tribe_stats.columns = [
        'tribe', 'post_count', 'unique_authors', 'avg_followers',
        'total_impressions', 'total_engagement', 'avg_sentiment'
    ]

    # ソート
    tribe_stats = tribe_stats.sort_values('post_count', ascending=False)

    # 保存
    tribe_stats.to_csv(SUMMARY_DIR / "tribe_distribution.csv", index=False, encoding='utf-8')

    print(f"Generated tribe_distribution.csv")
    return tribe_stats


def generate_region_tribe_matrix(clean_df):
    """地域×トライブのクロス集計を生成する"""
    print("Generating region-tribe matrix...")

    # ターゲット地域のみ
    target_df = clean_df[clean_df['target_country'] != 'Other']

    # クロス集計（投稿数）
    matrix = pd.crosstab(
        target_df['target_country'],
        target_df['tribe_primary'],
        values=target_df['id'],
        aggfunc='count'
    ).fillna(0).astype(int)

    # 保存
    matrix.to_csv(SUMMARY_DIR / "region_tribe_matrix.csv", encoding='utf-8')

    # エンゲージメントベースの集計も
    matrix_engagement = pd.crosstab(
        target_df['target_country'],
        target_df['tribe_primary'],
        values=target_df['engagement'],
        aggfunc='sum'
    ).fillna(0).astype(int)

    matrix_engagement.to_csv(SUMMARY_DIR / "region_tribe_matrix_engagement.csv", encoding='utf-8')

    print(f"Generated region_tribe_matrix.csv")
    return matrix


def generate_topic_analysis(clean_df):
    """トピック分析を生成する"""
    print("Generating topic analysis...")

    # トピックを展開
    topic_rows = []
    for _, row in clean_df.iterrows():
        for topic in row['topics']:
            topic_rows.append({
                'topic': topic,
                'impressions': row['impressions'],
                'engagement': row['engagement'],
                'sentiment': row['sentiment'],
                'region': row['region'],
                'target_country': row['target_country']
            })

    if not topic_rows:
        print("No topics found")
        return None

    topic_df = pd.DataFrame(topic_rows)

    # トピックごとに集計
    topic_stats = topic_df.groupby('topic').agg({
        'impressions': ['count', 'sum', 'mean'],
        'engagement': 'sum',
        'sentiment': 'mean'
    }).reset_index()

    topic_stats.columns = [
        'topic', 'mention_count', 'total_impressions', 'avg_impressions',
        'total_engagement', 'avg_sentiment'
    ]

    topic_stats = topic_stats.sort_values('mention_count', ascending=False)

    # 保存
    topic_stats.to_csv(SUMMARY_DIR / "topic_analysis.csv", index=False, encoding='utf-8')

    print(f"Generated topic_analysis.csv")
    return topic_stats


def generate_daily_stats(clean_df):
    """日別統計を生成する"""
    print("Generating daily stats...")

    # 日付がない行を除外
    daily_df = clean_df[clean_df['published_at'].notna()].copy()
    daily_df['date'] = daily_df['published_at'].dt.date

    # 日別集計
    daily_stats = daily_df.groupby('date').agg({
        'id': 'count',
        'impressions': 'sum',
        'engagement': 'sum',
        'sentiment': 'mean'
    }).reset_index()

    daily_stats.columns = ['date', 'post_count', 'total_impressions', 'total_engagement', 'avg_sentiment']
    daily_stats = daily_stats.sort_values('date')

    # 保存
    daily_stats.to_csv(SUMMARY_DIR / "daily_stats.csv", index=False, encoding='utf-8')

    print(f"Generated daily_stats.csv")
    return daily_stats


def generate_influencer_list(clean_df, author_stats, min_followers=10000):
    """インフルエンサーリストを生成する"""
    print(f"Generating influencer list (min followers: {min_followers})...")

    # フォロワー閾値でフィルタ
    influencers = author_stats[author_stats['followers'] >= min_followers].copy()

    # トップ投稿を取得
    def get_top_post(author_name):
        author_posts = clean_df[clean_df['author_name'] == author_name]
        if len(author_posts) == 0:
            return None
        top_post = author_posts.loc[author_posts['engagement'].idxmax()]
        return top_post['id']

    influencers['top_post'] = influencers['author_name'].apply(get_top_post)

    # ソート
    influencers = influencers.sort_values('followers', ascending=False)

    # 保存
    influencers.to_csv(ANALYSIS_DIR / "influencers_by_tribe.csv", index=False, encoding='utf-8')

    # JSON版
    influencers.to_json(
        ANALYSIS_DIR / "influencers_by_tribe.json",
        orient='records',
        force_ascii=False,
        indent=2
    )

    print(f"Generated influencers_by_tribe.csv ({len(influencers)} influencers)")
    return influencers


def generate_top_voices(clean_df):
    """トップ発言者リストを生成する"""
    print("Generating top voices...")

    # トライブごとにエンゲージメント上位を取得
    top_voices_list = []

    for tribe in clean_df['tribe_primary'].unique():
        tribe_df = clean_df[clean_df['tribe_primary'] == tribe]
        tribe_authors = tribe_df.groupby('author_name').agg({
            'engagement': 'sum',
            'impressions': 'sum',
            'author_followers': 'first',
            'country': 'first',
            'id': 'count'
        }).reset_index()

        tribe_authors.columns = [
            'author_name', 'total_engagement', 'total_impressions',
            'followers', 'country', 'post_count'
        ]

        # 上位10名
        top_10 = tribe_authors.nlargest(10, 'total_engagement')
        top_10['tribe'] = tribe
        top_voices_list.append(top_10)

    if top_voices_list:
        top_voices = pd.concat(top_voices_list, ignore_index=True)
        top_voices.to_csv(ANALYSIS_DIR / "top_voices.csv", index=False, encoding='utf-8')
        print(f"Generated top_voices.csv")
        return top_voices

    return None


def generate_airline_stats(clean_df):
    """航空会社別統計を生成する"""
    print("Generating airline stats...")

    airline_stats = clean_df.groupby('airline').agg({
        'id': 'count',
        'impressions': 'sum',
        'engagement': 'sum',
        'sentiment': 'mean',
        'author_name': 'nunique'
    }).reset_index()

    airline_stats.columns = [
        'airline', 'post_count', 'total_impressions', 'total_engagement',
        'avg_sentiment', 'unique_authors'
    ]

    # ポジティブ/ネガティブ率
    for airline in airline_stats['airline'].unique():
        airline_df = clean_df[clean_df['airline'] == airline]
        total = len(airline_df)
        if total > 0:
            positive_rate = len(airline_df[airline_df['sentiment'] > 0]) / total
            negative_rate = len(airline_df[airline_df['sentiment'] < 0]) / total
            airline_stats.loc[airline_stats['airline'] == airline, 'positive_rate'] = positive_rate
            airline_stats.loc[airline_stats['airline'] == airline, 'negative_rate'] = negative_rate

    airline_stats = airline_stats.sort_values('post_count', ascending=False)

    # 保存
    airline_stats.to_csv(SUMMARY_DIR / "airline_stats.csv", index=False, encoding='utf-8')

    print(f"Generated airline_stats.csv")
    return airline_stats


def main():
    """メイン処理"""
    print("=" * 60)
    print("THE Room FX - SNS Data Processing")
    print("=" * 60)

    # データ読み込み
    df = load_data()

    # データ処理
    clean_df = process_data(df)

    # クリーンデータ保存
    save_clean_data(clean_df)

    # 著者プロファイル生成
    author_stats = generate_author_profiles(clean_df)

    # トライブ分布生成
    generate_tribe_distribution(clean_df)

    # 地域×トライブマトリクス生成
    generate_region_tribe_matrix(clean_df)

    # トピック分析生成
    generate_topic_analysis(clean_df)

    # 日別統計生成
    generate_daily_stats(clean_df)

    # インフルエンサーリスト生成
    generate_influencer_list(clean_df, author_stats)

    # トップ発言者生成
    generate_top_voices(clean_df)

    # 航空会社別統計生成
    generate_airline_stats(clean_df)

    print("=" * 60)
    print("Processing complete!")
    print("=" * 60)

    # サマリー表示
    print("\n📊 Data Summary:")
    print(f"  Total posts: {len(clean_df)}")
    print(f"  Unique authors: {clean_df['author_name'].nunique()}")
    print(f"  Date range: {clean_df['published_at'].min()} - {clean_df['published_at'].max()}")

    print("\n🌍 Region Distribution:")
    print(clean_df['region'].value_counts().to_string())

    print("\n🎯 Target Country Distribution:")
    print(clean_df['target_country'].value_counts().to_string())

    print("\n👥 Tribe Distribution:")
    print(clean_df['tribe_primary'].value_counts().to_string())

    print("\n✈️ Top Airlines Mentioned:")
    print(clean_df['airline'].value_counts().head(10).to_string())


if __name__ == "__main__":
    main()
