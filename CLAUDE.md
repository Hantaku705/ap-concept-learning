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
| `/concept` | コンセプト学習トップ（2セクション） |
| `/concept/textbook` | コンセプトの教科書（全6章） |
| `/concept/examples` | 事例一覧（5件） |
| `/concept/examples/[slug]` | 事例詳細（14項目評価） |

### Key Files
| ファイル | 用途 |
|---------|------|
| `webapp/src/data/concept-data.json` | コンセプトデータ（※手動同期） |
| `webapp/src/lib/concept.ts` | データ取得関数・型定義 |
| `webapp/src/app/concept/textbook/page.tsx` | 教科書ページ（全6章） |
| `webapp/src/app/concept/examples/[slug]/page.tsx` | 事例詳細ページ |
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
| `concept-textbook.md` | コンセプトの教科書（全6章） |
| `concept-data.json` | 構造化データ |
| `examples/*.md` | 5つの事例 |

### 教科書の構成（6章）
1. コンセプトの公式（リフレーミング公式）
2. 良いコンセプトの4要素
3. いい商品コンセプトの5条件
4. 良いコンセプトの7条件（UGC向け）
5. 定義の使い分け
6. 評価項目一覧（14項目）

### 事例一覧
1. 塗るつけまつげ（デジャヴュ）
2. コンビニジム（チョコザップ）
3. 夜間美容シャンプー（Yolu）
4. 顔面死守ファンデ（フィットミー）
5. 紫外線、浴びたら洗おう（ソラミー）

### 評価項目（14項目）

**マスト（7項目）- コンセプトの本質**
1. 新しい視点・独自性があるか
2. 顧客インサイトに応えているか
3. ベネフィットが明確か
4. シンプルで伝わりやすいか
5. 行動・購買意欲を生むか
6. 信じられる理由があるか
7. 誤解なく伝わるか

**任意（7項目）- 拡散力強化**
8. 口に出したくなる・語呂が良いか
9. 感情を喚起するワードがあるか
10. 使った自分を演出できるか
11. ストーリー性・妄想できるか
12. 擬音・造語を活用しているか
13. ハッシュタグ化しやすいか
14. 主張の核心が込められているか

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

- 2026-01-20: webappシンプル化（2セクション構成）、評価項目14項目に統合、用語統一
- 2026-01-19: UGCネーミング7条件を事例に追加、メディアプラン資料作成
- 2026-01-19: コンセプト学習Webアプリ追加、docs/concept/作成
