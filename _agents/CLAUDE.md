# AP Agents - Claude Agent SDK

Claude Agent SDKを使った共有エージェントサービス。提案書・レポートの自動生成を行う。

---

## 概要

| 項目 | 値 |
|------|-----|
| SDK | `@anthropic-ai/claude-agent-sdk` |
| 言語 | TypeScript |
| ランタイム | Claude Code |
| 用途 | 提案書・レポート自動生成 |

---

## クイックスタート

```bash
# インストール
cd _agents
npm install

# プロジェクト一覧を表示
npx tsx src/index.ts --list-projects

# 提案書を生成
npx tsx src/index.ts --project dr.melaxin --task proposal

# 特定セクションを生成
npx tsx src/index.ts --project the-room-fx --section executive-summary
```

---

## フォルダ構造

```
_agents/
├── package.json
├── tsconfig.json
├── .env.example
├── CLAUDE.md              # このファイル
│
├── src/
│   ├── index.ts           # CLIエントリポイント
│   ├── config.ts          # 設定管理
│   ├── types.ts           # 型定義
│   │
│   ├── agents/            # エージェント定義
│   │   └── proposal-agent.ts
│   │
│   └── utils/             # ユーティリティ
│       └── data-loader.ts
│
└── prompts/               # システムプロンプト
    └── proposal.md
```

---

## 連携プロジェクト

| ID | 名前 | データパス |
|----|------|----------|
| `dr.melaxin` | Dr.Melaxin マーケティング提案 | `projects/dr.melaxin/webapp/src/data` |
| `the-room-fx` | ANA THE Room FX | `projects/the-room-fx/webapp/src/data` |
| `concept-learning` | コンセプト学習 | `projects/concept-learning/webapp/src/data` |
| `phonefarm` | Phone Farm | `projects/phonefarm/webapp/src/data` |
| `norganic` | N organic X戦略提案 | `projects/norganic/webapp/src/data` |
| `mascode` | MASCODE BEAUTY | `projects/mascode/` |

---

## CLI オプション

| オプション | 短縮 | 説明 |
|-----------|------|------|
| `--project` | `-p` | プロジェクトID |
| `--task` | `-t` | タスクタイプ（proposal, research, analysis） |
| `--section` | `-s` | 生成するセクション名 |
| `--verbose` | `-v` | 詳細出力 |
| `--list-projects` | - | プロジェクト一覧 |
| `--show-data` | - | プロジェクトデータ表示 |
| `--help` | `-h` | ヘルプ表示 |

---

## 環境設定

`.env.example` をコピーして `.env` を作成:

```bash
cp .env.example .env
```

### 環境変数

| 変数 | 必須 | 説明 |
|------|------|------|
| `ANTHROPIC_API_KEY` | △ | APIキー（Claude Code認証済みなら不要） |
| `DEFAULT_PROJECT_ID` | × | デフォルトプロジェクト |
| `WORKING_DIR` | × | 作業ディレクトリ |

---

## エージェント

### Proposal Agent

提案書セクションを生成するエージェント。

**使用ツール**:
- `Read`: ファイル読み込み
- `Glob`: ファイル検索
- `Grep`: コンテンツ検索

**Permission Mode**: `bypassPermissions`（確認なし）

---

## 開発

```bash
# 開発モード（ファイル監視）
npm run dev

# 型チェック
npm run typecheck

# ビルド
npm run build
```

---

## 今後の拡張

- [ ] Research Agent（市場調査）
- [ ] REST APIサーバー化
- [ ] WebSearch連携
- [ ] MCP連携（Supabase, GitHub）
- [ ] バッチ処理対応
