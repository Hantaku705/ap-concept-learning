# ReFa - プロモーション変遷分析プロジェクト

MTG株式会社の美容ブランド「ReFa」のプロモーション戦略分析レポート＆可視化Webapp。

---

## 本番URL

https://refa-report.vercel.app

---

## 概要

ReFaの2019年〜2025年のプロモーション戦略変遷を、イノベーター理論（普及曲線）に則って分析・可視化。

**主要指標**:
| 指標 | 2019年（危機） | 2025年（最新） | 変化 |
|------|---------------|---------------|------|
| MTG売上高 | 360億円 | 988億円 | +175% |
| 営業利益 | -144億円 | 107億円 | +251億円 |
| ReFa売上 | 136億円 | 728億円 | +435% |

---

## フォルダ構成

```
projects/Refa/
├── CLAUDE.md               # このファイル
├── docs/
│   └── analysis/           # 分析・リサーチ
│       └── report.md       # 分析レポート（約600行）
├── source/                 # 元ファイル・データ
│   ├── (35 PDFs)           # 元PDF
│   └── slides/             # スライド画像（年度別）
│       └── FY2025/         # FY2025決算スライド
└── webapp/                 # Next.js Webapp
    ├── app/                # App Router
    │   ├── page.tsx        # ダッシュボード（KPI、曲線、売上推移、展望）
    │   ├── phases/         # 5フェーズ詳細（タブ切り替え）
    │   ├── products/       # 製品ポートフォリオ
    │   └── channels/       # チャネル戦略・セグメント分析
    ├── components/         # UIコンポーネント
    │   ├── charts/         # AdoptionCurve, SalesChart, SegmentChart
    │   ├── KPICards.tsx
    │   ├── PhaseTimeline.tsx
    │   └── Navigation.tsx
    └── data/               # データファイル
        └── report-data.ts  # 全データ構造化
```

---

## Webapp詳細

### 技術スタック

- Next.js 16.1.4 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Recharts（グラフ可視化）

### ページ構成

| パス | 内容 |
|-----|------|
| `/` | ダッシュボード（イノベーター曲線、売上推移、KPI、今後の展望） |
| `/phases` | 5フェーズ詳細（タブ切り替え、ReFa GINZA、ブランド成長サイクル） |
| `/products` | 製品ポートフォリオ（カテゴリ拡大軌跡、売上構成） |
| `/channels` | チャネル戦略（段階的展開、セグメント別分析、イノベーター理論対応） |

### 主要コンポーネント

| コンポーネント | 説明 |
|--------------|------|
| `AdoptionCurve.tsx` | インタラクティブ釣り鐘型曲線（ReFa現在地ハイライト） |
| `SalesChart.tsx` | MTG売上/利益/ReFa比率の複合グラフ（2018-2025年） |
| `KPICards.tsx` | 危機年vs復活年の5指標比較 |
| `PhaseTimeline.tsx` | 5フェーズ横スクロールタイムライン |

### データ構造（report-data.ts）

| エクスポート | 説明 |
|-------------|------|
| `mtgPerformance` | MTG全体業績推移（2018-2025） |
| `refaPerformance` | ReFaブランド売上推移 |
| `adoptionPhases` | イノベーター理論×ReFaフェーズマッピング |
| `phases` | 5フェーズ詳細データ |
| `productPortfolio` | 製品カテゴリ別データ |
| `channelTimeline` | チャネル展開タイムライン |
| `segmentPerformance` | セグメント別業績（FY2022-FY2025） |
| `fiscalYearDetails` | 年度別決算詳細 |
| `investmentBreakdown` | FY2025投資内訳 |
| `refaGinza` | ReFa GINZA旗艦店情報 |
| `brandGrowthCycle` | ブランド成長戦略サイクル（4ステップ） |
| `futureOutlook` | 今後の展望（再ブランディング） |

---

## イノベーター理論マッピング

| 層 | 比率 | ReFaフェーズ | 時期 | チャネル |
|---|------|------------|------|--------|
| イノベーター | 2.5% | 戦略転換 | 2019 | 美容室限定 |
| アーリーアダプター | 13.5% | 国内強化 | 2020-21 | 百貨店/EC |
| アーリーマジョリティ | 34% | 体験型 | 2022-23 | ホテルBtoBtoC |
| レイトマジョリティ | 34% | マスマーケ | 2024〜 | 家電量販店 **★現在地** |
| ラガード | 16% | 未来 | 2025〜 | マス拡大 |

---

## 開発コマンド

```bash
cd projects/Refa/webapp
npm run dev      # 開発サーバー起動
npm run build    # ビルド
```

## デプロイ

```bash
cd projects/Refa/webapp
vercel --prod --yes
```

---

## 更新履歴

- 2026-01-26: report.mdブラッシュアップ（Phase 4-5年度別詳細、セグメント分析、「収穫期」→「再ブランディング」視点）
- 2026-01-26: 決算資料PDF→PNG画像化（23 PDF → 1,185枚、791MB）、フォルダ構成整理
- 2026-01-26: ReFa GINZA・ブランド成長サイクル・今後の展望セクション追加
- 2026-01-26: 初版作成（イノベーター理論曲線、4ページ構成、セグメント分析）
