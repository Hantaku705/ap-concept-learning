# TikTokスクレイピング監視システム

TikTok上の任意のハッシュタグ/キーワードを監視し、該当投稿を自動でダッシュボードに反映するシステム。

---

## 概要

| 項目 | 値 |
|------|-----|
| 本番URL | https://tiktok-scraper-tau.vercel.app |
| 初期監視対象 | #アスタリフト |
| 取得頻度 | 1日1回（毎日0時 UTC） |
| 月額コスト | $0（無料枠内） |

---

## 技術構成

| コンポーネント | 技術 | 備考 |
|---------------|------|------|
| フロントエンド | Next.js 16 + Tailwind CSS | App Router |
| グラフ | Recharts | 時系列・ランキング |
| データ取得 | Apify TikTok Hashtag Scraper | $5/1,000件、月$5無料枠 |
| 定期実行 | Vercel Cron Jobs | 日次バッチ |
| データ保存 | Supabase (PostgreSQL) | 無料枠で十分 |

---

## フォルダ構成

```
opperation/tiktokスクレイピング/
├── CLAUDE.md                     # このファイル
├── webapp/                       # Next.jsアプリ
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # ダッシュボード
│   │   │   ├── keywords/page.tsx # キーワード管理
│   │   │   └── api/              # APIルート
│   │   │       ├── scrape/       # スクレイピング実行
│   │   │       ├── cron/         # Cron Job
│   │   │       ├── posts/        # 投稿取得
│   │   │       ├── keywords/     # キーワード管理
│   │   │       └── stats/        # 統計取得
│   │   ├── components/           # UIコンポーネント
│   │   │   ├── PostList.tsx      # 投稿一覧
│   │   │   ├── TrendChart.tsx    # 時系列グラフ
│   │   │   ├── TopPosts.tsx      # ランキング
│   │   │   └── StatsCards.tsx    # 統計カード
│   │   ├── lib/                  # ユーティリティ
│   │   │   ├── apify.ts          # Apifyクライアント
│   │   │   └── supabase.ts       # Supabaseクライアント
│   │   └── types/
│   │       └── tiktok.ts         # 型定義
│   ├── .env.example              # 環境変数テンプレート
│   ├── vercel.json               # Cron設定
│   └── supabase-migration.sql    # DB作成SQL
└── docs/
    └── setup.md                  # セットアップ手順
```

---

## ページ構成

| パス | 内容 |
|-----|------|
| `/` | ダッシュボード（統計、投稿一覧、トレンド、ランキング） |
| `/keywords` | キーワード管理（追加・有効/無効切替・削除） |

---

## 機能

### 1. ダッシュボード（`/`）
- **統計カード**: 総投稿数、総再生数、総いいね、平均エンゲージメント、今日の投稿、トップ投稿者
- **投稿一覧タブ**: サムネイル、再生数、いいね、コメント、投稿日（ソート可能）
- **トレンドタブ**: 日別投稿数、再生数、いいね数の推移グラフ
- **ランキングタブ**: 再生数/いいね数TOP10
- **フィルター**: キーワード別フィルタリング
- **今すぐ取得ボタン**: 手動でスクレイピング実行

### 2. キーワード管理（`/keywords`）
- キーワード追加（ハッシュタグ or キャプション検索）
- 有効/無効切り替え
- 削除
- スクレイプログ表示（最新10件）

### 3. 自動データ取得
- Vercel Cron Jobで毎日0時（UTC）に実行
- アクティブなキーワード全てを順番にスクレイピング
- 重複チェック（video_id）して新規のみ保存

---

## 開発コマンド

```bash
cd opperation/tiktokスクレイピング/webapp

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番起動
npm start
```

---

## セットアップ手順

### 1. Supabaseプロジェクト作成

1. https://supabase.com でアカウント作成
2. New Project作成
3. SQL Editorで `supabase-migration.sql` を実行
4. Project Settings > API から URL と anon key を取得

### 2. Apifyアカウント作成

1. https://apify.com でアカウント作成
2. Settings > Integrations > Personal API tokens でトークン取得
3. 月$5の無料クレジットが付与される

### 3. 環境変数設定

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
APIFY_TOKEN=apify_api_xxxxx
CRON_SECRET=your-cron-secret-here
```

### 4. Vercelデプロイ

```bash
vercel --yes
vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< "https://xxxxx.supabase.co"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<< "eyJxxx..."
vercel env add APIFY_TOKEN production <<< "apify_api_xxxxx"
vercel env add CRON_SECRET production <<< "$(openssl rand -hex 32)"
vercel --prod --yes
```

---

## API仕様

### GET /api/posts
投稿一覧取得

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| keyword | string | キーワードでフィルタ |
| minPlays | number | 最低再生数 |
| limit | number | 取得件数（デフォルト50） |
| offset | number | オフセット |

### GET /api/stats
統計取得

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| type | string | dashboard / daily / logs |
| days | number | dailyの場合の日数（デフォルト30） |
| limit | number | logsの場合の件数（デフォルト20） |

### POST /api/keywords
キーワード追加

```json
{ "keyword": "#アスタリフト", "type": "hashtag" }
```

### GET /api/scrape
全アクティブキーワードをスクレイピング

### POST /api/scrape
指定キーワードをスクレイピング

```json
{ "keyword": "#アスタリフト", "type": "hashtag" }
```

---

## 料金

| サービス | 月額 | 備考 |
|---------|------|------|
| Apify | $0〜$5 | 無料枠$5/月、1,000件まで無料 |
| Supabase | $0 | 無料枠で十分（500MB） |
| Vercel | $0 | 無料枠で十分 |
| **合計** | **$0〜$5** | |

---

## 更新履歴

- 2026-01-27: 初版作成
