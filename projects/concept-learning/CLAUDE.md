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
├── CLAUDE.md           ← このファイル
├── webapp/             ← Next.js Webアプリ
│   ├── src/app/        # App Router
│   ├── src/data/       # コンセプトデータ
│   └── package.json
├── docs/               ← 学習資料（Markdown）
│   └── concept-data.json  # マスターデータ
├── item/               ← 関連資料
└── knowledge/          ← PDF資料
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

---

## 更新履歴

- 2026-01-22: CLAUDE.md作成
