# サブスク確認ツール

Gmail請求書メールを自動検出し、サブスクリプションを可視化・管理するWebアプリ。

---

## 概要

| 項目 | 値 |
|------|-----|
| **本番URL** | https://webapp-five-bay.vercel.app |
| 保存先 | `opperation/サブスク/webapp/` |
| 技術スタック | Next.js 16.1.4 + React 19 + Tailwind CSS v4 |
| データ永続化 | LocalStorage |
| 外部連携 | Gmail API（OAuth2）、OpenAI API（GPT-4o-mini） |

---

## 機能

### 1. ダッシュボード
- 月額合計・年額換算
- カテゴリ別円グラフ
- 今後30日の更新予定

### 2. サブスク一覧（テーブル形式）
- **9カラムテーブル**: サービス名、カテゴリ、金額、次回請求、ステータス、PDF、メール、解約方法、操作
- 横スクロール対応
- 全カラムソート可能（クリックで昇順/降順切替）
- カテゴリ・ステータスでフィルタ
- **PDFダウンロード**: PDF添付ありの行で直接ダウンロード
- **メール詳細モーダル**: 件名、送信元、本文抜粋を表示
- **解約ガイドモーダル**: 難易度バッジ（簡単/普通/難）、ステップ表示、解約ページリンク
- **解約方法の動的取得**: 未登録サービスは「取得」ボタンでAI生成、LocalStorageにキャッシュ
- 編集・削除

### 3. Gmailスキャン
- OAuth2認証でGmail連携
- 請求書メールを自動検出
- 20+サービスのパターンマッチング
- **スキャン期間選択**: 今月/先月から/3ヶ月/6ヶ月/1年を選択可能（デフォルト: 今月）

### 4. AIアシスタント
- チャット形式で請求書を検索（「1月の請求書来てる？」「先月のNetflixの請求」など）
- OpenAI GPT-4o-mini + Function calling でGmail検索を自動実行
- 検出された請求書をワンクリックでサブスク一覧に追加
- 会話履歴を保持

### 5. 設定
- データエクスポート（JSON/CSV）
- データ削除

---

## 自動検出対象サービス

| カテゴリ | サービス |
|---------|---------|
| 動画・音楽 | Netflix, Amazon Prime, Spotify, YouTube Premium, Apple Music, Disney+, U-NEXT |
| ソフトウェア | Adobe, Microsoft 365, Notion, Slack, ChatGPT Plus, GitHub |
| クラウド | Google One, iCloud+, Dropbox |
| ゲーム | PlayStation Plus, Nintendo Switch Online, Xbox Game Pass |
| その他 | 日経電子版 等 |

---

## 開発コマンド

```bash
cd opperation/サブスク/webapp

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番起動
npm start
```

---

## デプロイ

### Vercel本番デプロイ

```bash
cd opperation/サブスク/webapp
vercel --prod --yes
```

### 本番環境変数設定（Vercel）

```bash
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production
vercel env add GOOGLE_REDIRECT_URI production <<< "https://webapp-five-bay.vercel.app/api/auth/callback"
vercel env add NEXT_PUBLIC_APP_URL production <<< "https://webapp-five-bay.vercel.app"
vercel env add OPENAI_API_KEY production  # AIアシスタント用
```

設定後、再デプロイ:
```bash
vercel --prod --yes
```

---

## Gmail API設定（初回のみ）

### 1. Google Cloud Console設定

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新規プロジェクト作成
3. 「APIとサービス」→「ライブラリ」→ Gmail API を有効化
4. 「OAuth同意画面」を設定
   - ユーザータイプ: 外部
   - アプリ名、連絡先を入力
   - スコープ追加: `gmail.readonly`, `userinfo.email`
   - テストユーザーに自分のGmailを追加
5. 「認証情報」→「認証情報を作成」→「OAuthクライアントID」
   - アプリケーションの種類: ウェブアプリケーション
   - 承認済みリダイレクトURI:
     - 開発: `http://localhost:3000/api/auth/callback`
     - 本番: `https://webapp-five-bay.vercel.app/api/auth/callback`

### 2. 環境変数設定

```bash
cd webapp
cp .env.local.example .env.local
```

`.env.local` を編集:
```
GOOGLE_CLIENT_ID=取得したクライアントID
GOOGLE_CLIENT_SECRET=取得したシークレット
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## ファイル構成

```
opperation/サブスク/
├── CLAUDE.md               # このファイル
├── docs/
│   └── gmail-api-setup.md  # Gmail API設定詳細
└── webapp/
    ├── package.json
    ├── .env.local.example
    └── src/
        ├── app/            # ページ・API
        ├── components/     # UIコンポーネント
        ├── contexts/       # 状態管理
        ├── lib/            # ユーティリティ
        ├── data/           # パターン・ガイドデータ
        └── types/          # 型定義
```

---

## Key Files

| ファイル | 用途 |
|---------|------|
| `src/data/service-patterns.ts` | サービス検出パターン（追加可能） |
| `src/data/cancellation-guides.ts` | 解約方法データ（追加可能） |
| `src/lib/gmail/parser.ts` | メール解析ロジック |
| `src/lib/gmail/client.ts` | Gmail API連携（attachmentId抽出含む） |
| `src/contexts/SubscriptionContext.tsx` | サブスクデータ管理 |
| `src/components/subscriptions/SubscriptionTable.tsx` | テーブル一覧コンポーネント |
| `src/components/subscriptions/EmailDetailModal.tsx` | メール詳細モーダル |
| `src/components/subscriptions/CancellationGuideModal.tsx` | 解約ガイドモーダル |
| `src/app/api/gmail/attachment/route.ts` | PDFダウンロードAPI |
| `src/app/api/ai/chat/route.ts` | AIチャットAPI（OpenAI Function calling） |
| `src/app/api/cancellation-guide/route.ts` | 解約方法動的取得API（GPT-4o-mini） |
| `src/contexts/CancellationGuideContext.tsx` | 解約ガイドキャッシュ管理 |
| `src/components/ai/AiAssistantContent.tsx` | AIアシスタントUI |

---

## カスタマイズ

### 新しいサービスの検出パターン追加

`src/data/service-patterns.ts` に追加:

```typescript
{
  serviceName: 'サービス名',
  senderPatterns: ['@example.com'],
  subjectPatterns: ['.*請求.*', '.*invoice.*'],
  amountPatterns: ['¥([\\d,]+)'],
  category: 'software',
  cancellationUrl: 'https://example.com/cancel',
}
```

### 解約ガイド追加

`src/data/cancellation-guides.ts` に追加:

```typescript
'サービス名': {
  serviceName: 'サービス名',
  url: 'https://example.com/cancel',
  steps: ['ステップ1', 'ステップ2'],
  difficulty: 'easy',
  estimatedTime: '2分',
}
```

---

## トラブルシューティング

### 1. 「Missing required parameter: redirect_uri」エラー

**症状**: Googleログイン時に「Access blocked: Authorization Error - Missing required parameter: redirect_uri」が表示される

**原因**:
- Vercel環境変数 `GOOGLE_REDIRECT_URI` が未設定、または設定後に再デプロイしていない
- Google Cloud Console にリダイレクトURIが登録されていない

**解決方法**:

1. **Vercel環境変数を確認**:
   ```bash
   vercel env ls
   ```
   `GOOGLE_REDIRECT_URI` が存在することを確認

2. **環境変数が設定済みの場合、再デプロイ**:
   ```bash
   vercel --prod --yes
   ```
   環境変数追加後は必ず再デプロイが必要

3. **Google Cloud Console でリダイレクトURIを確認**:
   - [Google Cloud Console](https://console.cloud.google.com/) → 「APIとサービス」→「認証情報」
   - OAuth 2.0 クライアントID をクリック
   - 「承認済みのリダイレクトURI」に以下が登録されているか確認:
     ```
     https://webapp-five-bay.vercel.app/api/auth/callback
     ```
   - なければ追加して保存

### 2. PDFが反映されない（スキャン後）

**症状**: Gmailスキャン後、既存サブスクのPDF添付情報が更新されない

**原因**: `mergeDetectedSubscriptions` 関数でPDF関連フィールドが更新対象外だった

**解決済み**: `src/lib/gmail/parser.ts` で以下のフィールドも更新するよう修正済み
- `hasPdfAttachment`
- `pdfFilenames`
- `messageId`
- `attachmentIds`
- `emailSubject`
- `emailBody`
- `senderEmail`

---

## 更新履歴

- 2026-01-26: 解約方法の動的取得機能追加（未登録サービスは「取得」ボタンでAI生成、LocalStorageキャッシュ）
- 2026-01-26: スキャン期間選択機能追加（今月/先月から/3ヶ月/6ヶ月/1年、デフォルト: 今月）
- 2026-01-26: 埋め込み形式請求書（PDF添付なし）の検出対応、SNS侍パターン追加
- 2026-01-26: AIアシスタントのキーボードショートカット追加（Enter送信、Cmd+Enter改行）
- 2026-01-26: トラブルシューティングセクション追加（redirect_uriエラー、PDF反映問題）
- 2026-01-26: 本番URL変更（webapp-five-bay.vercel.app）
- 2026-01-26: AIアシスタントタブ追加（OpenAI GPT-4o-mini、任意の日付の請求書検索、サブスク一覧への追加機能）
- 2026-01-26: サブスク一覧をテーブル形式に変更（9カラム、横スクロール、ソート対応）
- 2026-01-26: PDF/メール確認機能追加（PDFダウンロードボタン、メール詳細モーダル）
- 2026-01-26: 解約ガイドモーダル追加（難易度バッジ、ステップ表示、解約ページリンク）
- 2026-01-23: Vercel本番デプロイ（https://subscription-tracker-ten-iota.vercel.app）
- 2026-01-23: 初版作成（Gmail API連携、20+サービス対応）
