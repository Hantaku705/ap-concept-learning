#!/usr/bin/env python3
"""
新形式CSVを標準形式に変換するスクリプト

新CSV（サマリー付き）を既存の標準フォーマットに変換する。
- 1-16行: サマリー部分（スキップ）
- 17-20行: ヘッダー（複数行に分散、改行含む）
- 21行目〜: 実データ
"""

import csv
import re
import shutil
from pathlib import Path
from datetime import datetime

DATA_DIR = Path(__file__).parent.parent / 'data/再生数シート'

# 標準ヘッダー（28カラム）
STANDARD_HEADERS = [
    '投稿日', 'アカウント名', 'PR/通常', 'sns', '担当者', 'タイトル', 'URL', '種別',
    '更新日', '動画尺', '再生数', 'いいね', 'コメント', '共有', '保存',
    'いいね率', 'コメント率', '共有率', '保存率', '平均視聴時間', '視聴維持率',
    '1秒継続率', '3秒継続率', '6秒継続率', 'フル視聴率', '新規フォロー', 'フォロー率', 'おすすめ率'
]

# ヘッダーマッピング（改行や空白を含む可能性のあるヘッダーを正規化）
HEADER_MAP = {
    '平均\n視聴時間': '平均視聴時間',
    '視聴\n維持率': '視聴維持率',
    '新規\nフォロー': '新規フォロー',
    '平均 視聴時間': '平均視聴時間',
    '視聴 維持率': '視聴維持率',
    '新規 フォロー': '新規フォロー',
}


def parse_date(date_str: str) -> str:
    """日付を標準形式に変換（YYYY-MM-DD HH:MM:SS）"""
    if not date_str or date_str.strip() == '':
        return ''

    date_str = date_str.strip()

    # 既にISO形式の場合
    if re.match(r'^\d{4}-\d{2}-\d{2}', date_str):
        return date_str

    # YYYY/MM/DD形式
    match = re.match(r'^(\d{4})/(\d{1,2})/(\d{1,2})$', date_str)
    if match:
        y, m, d = match.groups()
        return f'{y}-{int(m):02d}-{int(d):02d} 00:00:00'

    # YYYY/MM/DD HH:MM:SS形式
    match = re.match(r'^(\d{4})/(\d{1,2})/(\d{1,2})\s+(\d{1,2}):(\d{2}):(\d{2})$', date_str)
    if match:
        y, m, d, h, mi, s = match.groups()
        return f'{y}-{int(m):02d}-{int(d):02d} {int(h):02d}:{mi}:{s}'

    return date_str


def parse_number(value: str) -> str:
    """数値からカンマを除去"""
    if not value or value.strip() == '':
        return ''

    # カンマ除去
    cleaned = value.strip().replace(',', '')

    # パーセント記号を除去
    if cleaned.endswith('%'):
        cleaned = cleaned[:-1]
        try:
            # パーセント値を小数に変換
            num = float(cleaned) / 100
            return str(num)
        except ValueError:
            return ''

    # 数値チェック
    try:
        float(cleaned)
        return cleaned
    except ValueError:
        return ''


def find_header_row(filepath: Path) -> int:
    """ヘッダー行を検出（「投稿日」で始まる行）"""
    with open(filepath, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f, 1):
            if line.strip().startswith('投稿日,') or line.strip().startswith('投稿日\t'):
                return i
    return -1


def convert_new_csv(input_path: Path, output_path: Path) -> int:
    """新形式CSVを標準形式に変換"""

    # ファイル全体を読み込み
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 改行コードを統一
    content = content.replace('\r\n', '\n').replace('\r', '\n')

    # ヘッダー行を検索（「投稿日,アカウント名」のパターン）
    lines = content.split('\n')
    header_start = -1

    for i, line in enumerate(lines):
        if line.startswith('投稿日,アカウント名'):
            header_start = i
            break

    if header_start == -1:
        raise ValueError('ヘッダー行が見つかりません')

    print(f'ヘッダー行: {header_start + 1}')

    # ヘッダー行を解析（改行が含まれている可能性があるため、複数行をマージ）
    # CSVをパースしてヘッダーを取得
    data_section = '\n'.join(lines[header_start:])

    # CSVとしてパース
    reader = csv.reader(data_section.split('\n'))
    raw_headers = next(reader)

    # ヘッダーを正規化
    headers = []
    for h in raw_headers:
        h = h.strip()
        h = HEADER_MAP.get(h, h)
        # 改行を除去
        h = h.replace('\n', '').replace('\r', '')
        headers.append(h)

    print(f'検出ヘッダー数: {len(headers)}')
    print(f'ヘッダー: {headers[:15]}...')

    # 標準ヘッダーとのマッピングを作成
    header_indices = {}
    for i, h in enumerate(headers):
        for std_h in STANDARD_HEADERS:
            if h == std_h or h.replace(' ', '') == std_h.replace(' ', ''):
                header_indices[std_h] = i
                break

    print(f'マッピングされたヘッダー: {len(header_indices)}/{len(STANDARD_HEADERS)}')

    # データ行を処理
    records = []

    for row in reader:
        if not row or len(row) < 5:
            continue

        # 最初のカラムが日付っぽくなければスキップ
        first_col = row[0].strip() if row else ''
        if not first_col or not re.match(r'^\d{4}[/-]', first_col):
            continue

        # 標準形式のレコードを作成
        record = []
        for std_h in STANDARD_HEADERS:
            idx = header_indices.get(std_h)
            if idx is not None and idx < len(row):
                value = row[idx].strip()

                # 日付カラムの変換
                if std_h == '投稿日':
                    value = parse_date(value)
                # 数値カラムの変換（カンマ除去、パーセント変換）
                elif std_h in ['動画尺', '再生数', 'いいね', 'コメント', '共有', '保存',
                              'いいね率', 'コメント率', '共有率', '保存率',
                              '平均視聴時間', '視聴維持率', '1秒継続率', '3秒継続率',
                              '6秒継続率', 'フル視聴率', '新規フォロー', 'フォロー率', 'おすすめ率']:
                    value = parse_number(value)

                record.append(value)
            else:
                record.append('')

        # 有効なレコードのみ追加（投稿日があるもの）
        if record[0]:
            records.append(record)

    print(f'変換レコード数: {len(records)}')

    # 出力
    with open(output_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(STANDARD_HEADERS)
        writer.writerows(records)

    return len(records)


def main():
    print('=== 新形式CSV変換 ===')

    # 入力ファイル
    input_file = DATA_DIR / 'NADESHIKO 分析 - 1月 (1).csv'
    output_file = DATA_DIR / '2026年1月.csv'

    if not input_file.exists():
        print(f'入力ファイルが見つかりません: {input_file}')
        return

    # バックアップ作成
    if output_file.exists():
        backup_file = DATA_DIR / '2026年1月.csv.bak'
        shutil.copy(output_file, backup_file)
        print(f'バックアップ作成: {backup_file.name}')

    # 変換実行
    count = convert_new_csv(input_file, output_file)

    print()
    print(f'完了: {count}件')
    print(f'出力: {output_file}')


if __name__ == '__main__':
    main()
