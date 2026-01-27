# Gmail API 設定ガイド

サブスク確認ツールでGmail連携を使用するための設定手順。

---

## 1. Google Cloud Console でプロジェクト作成

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 上部の「プロジェクトを選択」→「新しいプロジェクト」
3. プロジェクト名を入力（例: `subscription-tracker`）
4. 「作成」をクリック

---

## 2. Gmail API を有効化

1. 左メニュー「APIとサービス」→「ライブラリ」
2. 検索欄に「Gmail API」と入力
3. 「Gmail API」を選択
4. 「有効にする」をクリック

---

## 3. OAuth同意画面の設定

1. 左メニュー「APIとサービス」→「OAuth同意画面」
2. ユーザータイプ「外部」を選択→「作成」
3. 以下を入力:
   - **アプリ名**: サブスク確認ツール
   - **ユーザーサポートメール**: 自分のメールアドレス
   - **デベロッパーの連絡先情報**: 自分のメールアドレス
4. 「保存して次へ」

### スコープの追加

1. 「スコープを追加または削除」をクリック
2. 以下を検索して追加:
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/userinfo.email`
3. 「更新」→「保存して次へ」

### テストユーザーの追加

1. 「ユーザーを追加」をクリック
2. 自分のGmailアドレスを入力
3. 「追加」→「保存して次へ」

---

## 4. OAuthクライアントIDの作成

1. 左メニュー「APIとサービス」→「認証情報」
2. 「認証情報を作成」→「OAuthクライアントID」
3. 以下を設定:
   - **アプリケーションの種類**: ウェブアプリケーション
   - **名前**: サブスク確認ツール
   - **承認済みのリダイレクトURI**:
     - 開発用: `http://localhost:3000/api/auth/callback`
     - 本番用: `https://subscription-tracker-ten-iota.vercel.app/api/auth/callback`
4. 「作成」をクリック
5. **クライアントID** と **クライアントシークレット** をメモ

---

## 5. 環境変数の設定

```bash
cd webapp
cp .env.local.example .env.local
```

`.env.local` を以下のように編集:

```
# Google OAuth2
GOOGLE_CLIENT_ID=123456789-xxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxx
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 6. 動作確認

```bash
npm run dev
```

1. http://localhost:3000 にアクセス
2. 「Gmailでログイン」をクリック
3. Googleアカウントでログイン
4. 権限を許可
5. 「スキャン」タブでメールスキャンを実行

---

## トラブルシューティング

### 「このアプリは確認されていません」と表示される

- テストユーザーに自分のGmailが追加されているか確認
- 「詳細」→「サブスク確認ツール（安全ではないページ）に移動」で続行可能

### 「redirect_uri_mismatch」エラー

- OAuth同意画面のリダイレクトURIが正確か確認
- `http://localhost:3000/api/auth/callback` （末尾のスラッシュなし）

### 「access_denied」エラー

- スコープ（gmail.readonly, userinfo.email）が追加されているか確認
- テストユーザーが追加されているか確認

---

## 本番デプロイ時の注意

1. 承認済みのリダイレクトURIに本番URLを追加
2. `.env.local` の値を本番用に変更
3. OAuth同意画面を「公開」に変更（審査が必要な場合あり）
