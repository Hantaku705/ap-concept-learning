# scripts/ - データ変換スクリプト

NADESHIKOプロジェクトのデータ変換・処理スクリプトを格納するフォルダ。

---

## ファイル一覧

| ファイル | 説明 |
|---------|------|
| `update_views.py` | **再生数データ自動更新**（4SNS対応、APIから最新データ取得） |
| `csv_to_deals_all.py` | 利益管理CSV→TypeScript変換（4フォーマット対応） |
| `csv_to_views.py` | 再生数CSV→JSON+TypeScript変換（3タイプ対応、22ファイル→4,781件） |
| `xlsx_to_csv_views.py` | 再生数Excel→CSV変換（月別6シート） |
| `xlsx_to_csv_views_old.py` | 過去再生数Excel→CSV変換（月別16シート） |

---

## update_views.py

### 概要

CSVファイルから48時間以上更新されていない投稿を特定し、各プラットフォームのAPIから最新のインサイトデータを取得してCSVを更新するスクリプト。

### 対応プラットフォーム

| SNS | API | 速度 |
|-----|-----|------|
| **YouTube** | YouTube Data API v3 | ✅ ~0.2秒 |
| **TikTok** | RapidAPI (tiktok-video-downloader-api) | ✅ ~2秒 |
| **Instagram** | RapidAPI (instagram-scraper-stable-api) | ✅ ~2秒 |
| **X(Twitter)** | RapidAPI (twitter241) | ✅ ~1.5秒 |

### セットアップ

```bash
# 1. 仮想環境作成・有効化
cd NADESHIKO/scripts
python3 -m venv venv
source venv/bin/activate

# 2. 依存パッケージインストール
pip install -r requirements.txt

# 3. 環境変数設定
cp .env.example .env
# .envを編集してAPIキーを設定
```

### 環境変数（.env）

```bash
YOUTUBE_API_KEY=your_youtube_api_key_here    # Google Cloud Consoleから取得
TIKTOK_RAPIDAPI_KEY=64b6e140fa...             # TikTok/IG/X共用（RapidAPI）
```

### 使い方

```bash
# 仮想環境を有効化
source venv/bin/activate

# 基本実行（最新月のCSV）
python update_views.py

# 特定ファイルを指定
python update_views.py -f "2026年1月.csv"

# プラットフォーム指定（TT/YT/IG/X）
python update_views.py -p IG

# 処理件数を制限（テスト用）
python update_views.py --limit 5

# ドライラン（実際の更新なし）
python update_views.py --dry-run

# 全CSVファイルを処理
python update_views.py --all

# JSON変換スキップ
python update_views.py --no-convert
```

### CLIオプション

| オプション | 説明 |
|-----------|------|
| `--file`, `-f` | 対象CSVファイル名（デフォルト: 最新月） |
| `--platform`, `-p` | 特定プラットフォームのみ（YT/TT/IG/X） |
| `--limit`, `-l` | 処理する最大行数（テスト用） |
| `--all` | 全CSVファイルを処理 |
| `--dry-run` | 実際の更新を行わない |
| `--no-convert` | JSON変換をスキップ |

### 処理フロー

1. CSVファイル読み込み
2. 48時間以上更新されていない行をフィルタ
3. プラットフォーム優先度でソート（TT→YT→IG→X）
4. 各APIからデータ取得
5. CSVを更新（10件ごとに中間保存）
6. `csv_to_views.py`でJSON変換を自動実行

### 入出力

| 項目 | パス |
|------|------|
| 入力 | `data/再生数シート/*.csv` |
| 出力 | 同ファイルを上書き更新 |
| バックアップ | `*.csv.bak`（自動作成） |
| ログ | `update_views.log` |

### 注意事項

- **YouTube API**: Google Cloud Consoleで有効化・APIキー取得が必要
- **RapidAPI共通キー**: TikTokとX(Twitter)は同じRapidAPIキーを使用
- **処理時間**: YouTube/TikTok/Xは1件あたり1〜3秒、Instagramは10〜30秒（Apifyポーリング）
- **エラー行**: 更新日に「エラー」と記載される

---

## csv_to_deals_all.py

### 概要

利益管理シートCSVファイルをWebアプリ用のTypeScriptデータに変換するスクリプト。

### 対応フォーマット

| フォーマット | 期間 | ヘッダー例 |
|-------------|------|-----------|
| 旧フォーマット | 2023-11〜2025-08 | `Month, アカウント名, 案件名, 取引先...` |
| 9月フォーマット | 2025-09 | `アカウント名, 案件名, 取引先, 摘要, 単価...` |
| 10月フォーマット | 2025-10 | `請求書, 区分, アカウント名, 請求項目...` |
| 新フォーマット | 2025-11〜 | `担当者, クライアント, 案件名, アカウント名...` |

### 実行方法

```bash
python3 scripts/csv_to_deals_all.py
```

### 入出力

| 項目 | パス |
|------|------|
| 入力 | `data/利益管理シート/*.csv` |
| 出力 | `webapp/src/data/deals-data.ts` |

### 処理結果（最新）

| 項目 | 値 |
|------|-----|
| 総案件数 | 1,102件 |
| 対象月数 | 30月（2023年11月〜2026年4月） |

---

## csv_to_views.py

### 概要

再生数シートCSVファイルをWebアプリ用のJSON + TypeScriptラッパーに変換するスクリプト。

### 対応フォーマット（3タイプ）

| タイプ | 期間 | 日付形式 | sns/担当者 |
|-------|------|----------|-----------|
| タイプA | 2024年4月〜9月 | 相対日付（04/12(金)） | 空 |
| タイプB | 2024年10月〜2025年7月 | ISO日付 | 空 |
| タイプC | 2025年8月〜2026年1月 | ISO日付 | あり |

### 実行方法

```bash
python3 scripts/csv_to_views.py
```

### 入出力

| 項目 | パス |
|------|------|
| 入力 | `data/再生数シート/*.csv`（22ファイル） |
| 出力 | `webapp/src/data/views-data.json`、`webapp/src/data/views-data.ts` |

### 処理結果

| 項目 | 値 |
|------|-----|
| 入力CSVファイル | 22件 |
| 入力行数 | 6,304行 |
| 出力レコード | 4,781件（views=0除外後） |
| プラットフォーム | TikTok: 4,755件、IG: 26件 |

---

## xlsx_to_csv_views.py

### 概要

再生数シートExcelファイルを月別CSVに変換するスクリプト。

### 実行方法

```bash
python3 scripts/xlsx_to_csv_views.py
```

### 入出力

| 項目 | パス |
|------|------|
| 入力 | `data/再生数シート/NADESHIKO 分析.xlsx` |
| 出力 | `data/再生数シート/2025年8月.csv` 〜 `2026年1月.csv` |

### 処理結果

| 月 | 行数 |
|---|------|
| 2026年1月 | 1,668 |
| 2025年12月 | 664 |
| 2025年11月 | 533 |
| 2025年10月 | 582 |
| 2025年9月 | 342 |
| 2025年8月 | 321 |
| **合計** | **4,110** |

---

## xlsx_to_csv_views_old.py

### 概要

過去再生数シートExcelファイル（投稿インサイトDB）を月別CSVに変換するスクリプト。

### 実行方法

```bash
python3 scripts/xlsx_to_csv_views_old.py
```

### 入出力

| 項目 | パス |
|------|------|
| 入力 | `data/過去再生数シート/【新】NADESIKO_投稿インサイトDB .xlsx` |
| 出力 | `data/再生数シート/2024年4月.csv` 〜 `2025年7月.csv` |

### 処理結果

| 月 | 行数 |
|---|------|
| 2024年4月 | 112 |
| 2024年5月 | 104 |
| 2024年6月 | 96 |
| 2024年7月 | 103 |
| 2024年8月 | 84 |
| 2024年9月 | 112 |
| 2024年10月 | 152 |
| 2024年11月 | 167 |
| 2024年12月 | 152 |
| 2025年1月 | 134 |
| 2025年2月 | 154 |
| 2025年3月 | 138 |
| 2025年4月 | 180 |
| 2025年5月 | 163 |
| 2025年6月 | 173 |
| 2025年7月 | 170 |
| **合計** | **2,194** |

---

## 更新履歴

- 2026-01-26: 全API高速化（IG→instagram-scraper-stable-api、Apify廃止、処理速度5-10倍向上）
- 2026-01-26: update_views.py API変更（TikTok→tiktok-video-downloader-api、X→twitter241）
- 2026-01-26: update_views.py追加（再生数データ自動更新、4SNS対応）
- 2026-01-23: csv_to_views.py追加（再生数CSV→JSON変換、3タイプ対応）
- 2026-01-23: xlsx_to_csv_views_old.py拡張（2024年4月〜12月追加、計16ファイル）
- 2026-01-23: xlsx_to_csv_views_old.py追加（過去再生数シート変換）
- 2026-01-23: xlsx_to_csv_views.py追加（再生数シート変換）
- 2026-01-23: 初版作成（4フォーマット対応、1,102件変換）
