# AP - Claude Code設定 & コンセプト学習リポジトリ

Claude Code設定のリファレンス実装とマーケティングコンセプト学習資料。

---

## フォルダ構成

```
AP/
├── webapp/              # コンセプト学習Webアプリ（Next.js）
├── docs/concept/        # コンセプト学習資料（Markdown）
├── kwonlege/            # ナレッジストア（PDF等）
├── agents/              # Subagent定義
├── commands/            # Skillコマンド定義
├── rules/               # ルール定義
├── skills/              # Skill定義
├── hooks/               # Hook定義
└── mcp-configs/         # MCP設定
```

---

## Webapp（コンセプト学習）

### 本番URL
https://webapp-five-bay.vercel.app

### 技術スタック
- Next.js 16.1.3 (App Router)
- React 19
- TypeScript
- Tailwind CSS

### ページ構成
| パス | 内容 |
|-----|------|
| `/` | トップページ |
| `/concept/definition` | コンセプトの定義（2つの定義） |
| `/concept/good-concept` | 良いコンセプトとは（7条件・7基準） |
| `/concept/examples` | 事例一覧（5件） |
| `/concept/examples/[slug]` | 事例詳細 |

### Key Files
| ファイル | 用途 |
|---------|------|
| `webapp/src/data/concept-data.json` | コンセプトデータ（※手動同期） |
| `webapp/src/lib/concept.ts` | データ取得関数・型定義 |
| `webapp/src/app/concept/` | ページコンポーネント |
| `docs/concept/concept-data.json` | マスターデータ（こちらを編集） |

### データ同期について
`docs/concept/concept-data.json` がマスター。編集後は `webapp/src/data/concept-data.json` にコピーが必要。
**理由**: Next.js 16 Turbopack がシンボリックリンクを解決できないため。

---

## コンセプト学習資料

### docs/concept/
| ファイル | 内容 |
|---------|------|
| `README.md` | 概要 |
| `01-definition.md` | 2つの定義（リフレーミング公式、5条件） |
| `02-good-concept.md` | 良いコンセプトとは |
| `concept-data.json` | 構造化データ |
| `examples/*.md` | 5つの事例 |

### 事例一覧
1. 塗るつけまつげ（デジャヴュ）
2. コンビニジム（チョコザップ）
3. 夜間美容シャンプー（Yolu）
4. 顔面死守ファンデ（フィットミー）
5. 紫外線、浴びたら洗おう（ソラミー）

### 事例評価項目
- **コンセプト分析**: 既存概念→新視点→インサイト→タグライン
- **なぜ良いコンセプトか**: 4観点（リフレーミング、インサイト、シンプル、行動）
- **5条件での評価**: 商品コンセプト5条件
- **UGCネーミング7条件**: ○△×での評価

---

## メディアプラン資料

### メディアプラン_MASCODE/
| ファイル | 内容 |
|---------|------|
| `MASCODE_メディアプラン_SNS別詳細.csv` | Phase×施策×SNS別詳細データ |
| `メディアプラン.md` | 予算・リーチ・投稿数の各種表 |

---

## コマンド

### 開発
```bash
cd webapp
npm run dev
```

### デプロイ
```bash
cd webapp
vercel --prod
```

---

## 更新履歴

- 2026-01-19: UGCネーミング7条件を事例に追加、メディアプラン資料作成
- 2026-01-19: コンセプト学習Webアプリ追加、docs/concept/作成
