# clawdbot/ - Clawdbot AIアシスタント

Clawdbot（メッセージングアプリ内AIアシスタント）の設定ガイド・セットアップ資料。

---

## 概要

| 項目 | 値 |
|------|-----|
| ツール名 | Clawdbot |
| バージョン | 2026.1.24-3 |
| 用途 | Slack/Telegram/WhatsApp等で動作するAIアシスタント |
| 公式サイト | https://clawd.bot |

---

## Clawdbotの特徴

1. **メッセージングアプリ統合** - Slack, Telegram, WhatsApp, Discord, iMessage等で動作
2. **記憶機能** - 過去の会話、好み、コンテキストを記憶
3. **プロアクティブ通知** - AIから先にメッセージを送信可能
4. **タスク実行** - コンピュータ上で実際に作業を実行

---

## セットアップ済み環境

| 項目 | 設定 |
|------|------|
| チャンネル | Slack（テスト用ワークスペース） |
| LLM | Claude API（Anthropic） |
| Gateway | LaunchAgent（自動起動） |
| ポート | 18789 |

---

## よく使うコマンド

```bash
# ステータス確認
clawdbot status
clawdbot gateway status
clawdbot channels status

# ログ確認
clawdbot logs

# Gateway操作
clawdbot gateway start
clawdbot gateway stop
clawdbot gateway restart

# ペアリング承認
clawdbot pairing approve slack <CODE>

# プラグイン管理
clawdbot plugins list
clawdbot plugins enable <plugin>
```

---

## ファイル一覧

| ファイル | 説明 |
|---------|------|
| `CLAUDE_clawdbot.md` | Clawdbot完全ガイド（概要、仕組み、使用例、インストール手順） |

---

## 設定ファイル

| パス | 用途 |
|------|------|
| `~/.clawdbot/clawdbot.json` | メイン設定ファイル |
| `~/.clawdbot/agents/` | エージェント設定 |
| `~/clawd/` | ワークスペース |
| `~/Library/LaunchAgents/com.clawdbot.gateway.plist` | Gateway自動起動設定（macOS） + **ANTHROPIC_API_KEY** |

---

## トラブルシューティング

### "No API key found for provider 'anthropic'" エラー

**原因**: LaunchAgentで起動したGatewayにAPIキーが渡っていない

**解決方法**:
1. LaunchAgent plistに環境変数を追加
   ```xml
   <key>ANTHROPIC_API_KEY</key>
   <string>sk-ant-api03-...</string>
   ```
2. LaunchAgentを再読み込み
   ```bash
   launchctl unload ~/Library/LaunchAgents/com.clawdbot.gateway.plist
   launchctl load ~/Library/LaunchAgents/com.clawdbot.gateway.plist
   ```
3. 確認
   ```bash
   clawdbot gateway status  # Runtime: running を確認
   ```

---

---

## Gmail/Calendar連携（gog CLI）

### インストール済み
```bash
brew install steipete/tap/gogcli  # v0.9.0
```

### セットアップ手順（未完了）

1. **Google Cloud Console** で認証情報を作成
   - https://console.cloud.google.com/apis/credentials
   - Gmail API、Google Calendar API を有効化
   - OAuthクライアントID（デスクトップアプリ）を作成
   - JSONをダウンロード

2. **gog に登録**
   ```bash
   gog auth credentials ~/Downloads/client_secret_xxxxx.json
   gog auth add your-email@gmail.com --services gmail,calendar
   gog auth list
   ```

### よく使うコマンド
```bash
# Gmail
gog gmail search 'newer_than:7d' --max 10
gog gmail send --to a@b.com --subject "Hi" --body "Hello"

# Calendar
gog calendar events primary --from 2026-01-26 --to 2026-02-01
gog calendar create primary --summary "Meeting" --from 2026-01-27T10:00 --to 2026-01-27T11:00
```

---

---

## リアクション機能（処理中表示）

### 設定済み
```json
{
  "ackReaction": "eyes",
  "ackReactionScope": "all"
}
```

### 必要なSlack権限（未追加）
**Bot Token Scopes** に `reactions:write` を追加する必要あり

1. https://api.slack.com/apps → Clawdbot App
2. **OAuth & Permissions** → **Bot Token Scopes**
3. `reactions:write` を追加
4. **Reinstall to Workspace**

### 動作
- メッセージ受信時: 👀 リアクション追加
- 応答完了時: 👀 リアクション削除

---

## 更新履歴

- 2026-01-26: リアクション機能設定追加（`reactions:write`スコープ未追加で動作せず）
- 2026-01-26: gog CLIインストール、Gmail/Calendar連携準備
- 2026-01-26: Slack全チャンネル対応（groupPolicy: open）
- 2026-01-26: APIキー問題修正（LaunchAgent plistにANTHROPIC_API_KEY追加）
- 2026-01-26: 初版作成（Clawdbotセットアップ完了、Slack連携）
