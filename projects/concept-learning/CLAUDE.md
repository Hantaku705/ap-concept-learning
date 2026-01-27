# Concept Learning - マーケティングコンセプト学習

マーケティングコンセプト学習のWebアプリと資料。

---

## 概要

| 項目 | 値 |
|------|-----|
| 本番URL | https://webapp-five-bay.vercel.app |
| 技術スタック | Next.js 16.1.3 + React 19 + TypeScript + Tailwind CSS |

---

## フォルダ構成

```
projects/concept-learning/
├── CLAUDE.md               # このファイル
├── docs/
│   ├── CLAUDE.md           # docsフォルダ説明
│   ├── concept-data.json   # マスターデータ
│   ├── proposal/           # 提案資料・教科書
│   │   └── concept-textbook.md
│   └── analysis/           # 分析・リサーチ
│       └── examples/       # 15事例
├── source/                 # 元PDF資料
│   ├── コンセプトの教科書.pdf
│   ├── ご共有用_IPSオリエン資料.pdf
│   └── iP§_製品周り回答_1204.pdf
└── webapp/                 # Next.js Webアプリ
    ├── src/app/            # App Router
    ├── src/data/           # コンセプトデータ
    └── package.json
```

---

## Webapp

### ページ構成

| パス | 内容 |
|-----|------|
| `/` | トップページ |
| `/concept` | コンセプト学習トップ（2セクション） |
| `/concept/textbook` | コンセプトの教科書（全6章） |
| `/concept/examples` | 事例一覧（15件） |
| `/concept/examples/[slug]` | 事例詳細（14項目評価） |

### 開発コマンド

```bash
cd projects/concept-learning/webapp
npm run dev
```

### デプロイ

```bash
cd projects/concept-learning/webapp
vercel --prod --yes
```

---

## Key Files

| ファイル | 用途 |
|---------|------|
| `webapp/src/data/concept-data.json` | コンセプトデータ（※手動同期） |
| `docs/concept-data.json` | マスターデータ（こちらを編集） |
| `docs/proposal/concept-textbook.md` | コンセプト教科書 |
| `docs/analysis/examples/` | 15事例のMarkdownファイル |

---

## 更新履歴

- 2026-01-22: CLAUDE.md作成
