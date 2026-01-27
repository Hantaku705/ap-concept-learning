# The Room FX - ANAビジネスクラスプロモーション

ANA新ビジネスクラス「THE Room FX」のグローバル広告配信プロジェクト。

---

## 案件概要

| 項目 | 内容 |
|------|------|
| クライアント | ANA（全日空） |
| 代理店 | AnyMind |
| プロダクト | THE Room FX（B787-9 新ビジネスクラス） |
| 予算 | 4,000万円（2026年3月度）、年間3億円規模 |
| 目的 | 認知拡大 |
| 競合 | アイレップ（2社コンペ） |

---

## スケジュール

| 日付 | 内容 |
|------|------|
| 2026年2月5日 | メディアプラン締切 |
| 2026年2月末 | アセット納品 |
| 2026年3月2日 | ティーザー配信開始 |
| 2026年3月9日 | 本プロモーション開始 |
| 2026年3月12〜14日 | オフラインイベント（六本木ミッドタウン） |

---

## ターゲット

| セグメント | 詳細 |
|-----------|------|
| 地域 | 北米（70%）、欧州（30%） |
| 年齢層 | Z世代、Y世代 |
| 属性 | 訪日検討層、ビジネスクラス渡航層 |

---

## フォルダ構成

```
projects/the-room-fx/
├── CLAUDE.md               ← このファイル
├── docs/
│   ├── brief/              ← ブリーフ資料
│   │   ├── CLAUDE.md
│   │   ├── 全体.md         ← ブリーフ全体像（整理済み）
│   │   ├── 0.md            ← RFP要約
│   │   └── 1.md            ← 議事録・戦略分析
│   └── proposal/           ← 提案書作成
│       ├── CLAUDE.md       ← 提案作成ガイド
│       ├── 01-11_*.md      ← 提案書本編（11ファイル）
│       ├── google-docs-format.txt
│       └── appendix/       ← 付録（メディア詳細、インフルエンサー）
├── source/                 ← 元ファイル・データ
│   ├── *.pdf               ← ANA公式ブリーフPDF
│   └── data/               ← データファイル・分析スクリプト
│       ├── raw/            ← 生データ（Slackエクスポート等）
│       ├── processed/      ← 加工データ
│       ├── summary/        ← サマリーデータ
│       ├── analysis/       ← 分析結果
│       └── *.py            ← 分析スクリプト
└── webapp/                 ← 提案書Webアプリ（Next.js 16）
    ├── src/app/            ← App Router
    ├── src/components/     ← コンポーネント
    ├── src/data/           ← 構造化データ
    └── package.json
```

---

## Key Files

| ファイル | 用途 |
|---------|------|
| `docs/brief/全体.md` | ブリーフ全体像（整理済み） |
| `docs/brief/CLAUDE.md` | ブリーフ資料の概要 |
| `docs/proposal/CLAUDE.md` | 提案書作成ガイド |
| `webapp/src/data/proposal-data.ts` | 全提案書データ（TypeScript構造化） |
| `webapp/src/app/page.tsx` | Webアプリメインページ |

---

## Webapp

| 項目 | 内容 |
|------|------|
| 技術スタック | Next.js 16 + React 19 + TypeScript + Tailwind CSS + Recharts |
| 起動 | `cd webapp && npm run dev` → http://localhost:3000 |
| ビルド | `cd webapp && npm run build` |

### コンポーネント

| コンポーネント | 用途 |
|---------------|------|
| `SectionNav` | 13セクションサイドナビ |
| `PersonaCard` | 6ペルソナ表示カード |
| `BudgetPieChart` | 予算配分円グラフ |
| `SentimentChart` | 競合センチメント棒グラフ |
| `TimelineChart` | キャンペーンタイムライン |

---

## 更新履歴

- 2026-01-22: フォルダ移動（`The Room FX/` → `projects/the-room-fx/`）
- 2026-01-21: Webapp作成（Next.js 16、13セクション表示、グラフ3種）
- 2026-01-21: 初版作成（brief/, proposal/, data/ フォルダ構成）
