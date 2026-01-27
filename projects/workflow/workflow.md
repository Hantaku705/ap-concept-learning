# APプロジェクト ワークフローガイド

このガイドは、APリポジトリ内の各プロジェクトで実践されてきたワークフローを体系化したものです。
新しい問い/与件に対して、同様のアプローチで対応できるようにすることを目的としています。

---

## 1. 概要

### 5段階ワークフロー

```
与件（PDF/CSV/メモ）
    ↓
┌─────────────────────────────────────────────────────────────┐
│ Stage 1: INPUT CAPTURE（与件取得）                          │
│   - 元資料の収集・整理                                       │
│   - 目標・制約条件の明確化                                   │
└─────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────┐
│ Stage 2: STRATEGIC DOCUMENT SYNTHESIS（戦略ドキュメント化） │
│   - Markdown形式で構造化                                     │
│   - 300-700行の参照可能なドキュメント                        │
└─────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────┐
│ Stage 3: DATA STRUCTURING（データ構造化）                   │
│   - TypeScript interfacesで型定義                            │
│   - 8-37KBの構造化データファイル                             │
└─────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────┐
│ Stage 4: UI COMPONENT MAPPING（UI実装）                     │
│   - React + Recharts でビジュアライゼーション                │
│   - Tabs, Cards, Tables, Charts, Timeline                    │
└─────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────┐
│ Stage 5: WEBAPP DEPLOYMENT（デプロイ）                      │
│   - Next.js App Router                                       │
│   - Vercel自動デプロイ                                       │
└─────────────────────────────────────────────────────────────┘
    ↓
成果物（Webapp + ドキュメント）
```

### 適用範囲

| タスクタイプ | 例 | 適用 |
|-------------|----|----|
| 提案書作成 | Dr.Melaxin, The Room FX | Stage 1-5 すべて |
| 分析レポート | Refa, Phone Farm | Stage 1-5 すべて |
| 戦略立案 | N organic | Stage 1-5 すべて |
| 教育コンテンツ | concept-learning | Stage 1-5 すべて |
| 静的提案書のみ | MASCODE | Stage 1-2 のみ |

---

## 2. 5段階ワークフロー詳細

### Stage 1: INPUT CAPTURE（与件取得）

**目的**: 元資料を収集し、プロジェクトの全体像を把握する

**インプット形式**:
| 形式 | 例 | 処理 |
|------|-----|------|
| PDF | 提案書、RFP、決算資料 | 画像化 or テキスト抽出 |
| CSV/Excel | GTM、財務データ、メディアプラン | データ構造の把握 |
| ミーティングメモ | 内部議事録、クライアントFB | 決定事項の抽出 |
| SNSデータ | Meltwater、分析ツール出力 | 集計・トライブ分類 |

**アウトプット**:
- `source/` フォルダに元資料を格納
- `docs/brief.md` に与件サマリーを記述
- `CLAUDE.md` にプロジェクト概要を記録

**実例**:
```
dr.melaxin/
└── source/
    ├── proposal.pdf       # 65ページ提案書
    ├── proposal.pptx      # PowerPoint版
    ├── gtm-original.csv   # 元GTMデータ
    └── slides/            # PDF→画像変換（65枚）

the-room-fx/
└── brief/
    ├── *.pdf              # ANAブリーフ資料
    └── 全体.md            # ブリーフ整理版
```

---

### Stage 2: STRATEGIC DOCUMENT SYNTHESIS（戦略ドキュメント化）

**目的**: 散在する情報を構造化されたMarkdownドキュメントに統合する

**ドキュメント構造**:
```
docs/
├── proposal.md      # 提案書本体（300-700行）
├── research.md      # 競合調査・市場分析
├── strategy.md      # 戦略方針
├── brief.md         # 元与件サマリー
└── memo.md          # 内部決定事項
```

**記述原則**:
1. **表形式を活用**: 比較・一覧は必ずMarkdown表で
2. **階層構造**: H2→H3→箇条書きの一貫した構造
3. **決定木の明示**: Plan A/B、シナリオ1/2/3 を明記
4. **参照可能性**: 他ドキュメントからリンク可能な見出し

**実例**（Dr.Melaxin budget-proposal-10m.md）:
```markdown
## 3つの投資シナリオ

| シナリオ | 投資額 | 売上予測 | ROAS | 特徴 |
|---------|--------|----------|------|------|
| 1: パフォーマンス重視 | $10M | ¥45B | 285% | EC中心、低リスク |
| 2: バランス型 ✓ | $10M | ¥50B | 316% | Ambassador+EC、推奨 |
| 3: ハイブリッド | $10M | ¥48B | 303% | オフライン含む |

### 推奨: シナリオ2（バランス型）

**理由**:
- Ambassador投資（3億円）で話題創出
- EC主軸でROAS確保
- 6月メガ割でジョングク効果を最大化
```

---

### Stage 3: DATA STRUCTURING（データ構造化）

**目的**: Markdownの内容をTypeScriptの型付きデータに変換し、UIで使用可能にする

**データ構造パターン**:
```typescript
// 1. メタデータ層
export const metadata = {
  title: 'プロジェクト名',
  subtitle: 'サブタイトル',
  client: 'クライアント名',
  date: '2026-01',
  classification: 'Confidential'
}

// 2. セクション定義
export const sections = [
  { id: 'overview', title: '概要' },
  { id: 'strategy', title: '戦略' },
  // ...
]

// 3. コンテンツデータ（オブジェクト）
export const overviewData = {
  summary: '...',
  keyMetrics: { ... }
}

// 4. リストデータ（配列）
export const tacticsList = [
  { name: '施策A', priority: 1, budget: 1000000, kpi: 'Reach 1M' },
  { name: '施策B', priority: 2, budget: 500000, kpi: 'CV 10%' },
]

// 5. 時系列データ（チャート用）
export const monthlyData = [
  { month: '1月', sales: 100, investment: 50, roas: 200 },
  { month: '2月', sales: 120, investment: 60, roas: 200 },
]
```

**ファイル構成例**:
```
webapp/src/data/
├── metadata.ts          # プロジェクト情報
├── proposal-data.ts     # 提案内容
├── quarterly-data.ts    # Q1-Q4時系列
├── matrix-data.ts       # クロス集計
├── tactics-data.ts      # 施策リスト
└── index.ts             # 統合エクスポート
```

**サイズ目安**:
| プロジェクト | データファイル数 | 合計サイズ |
|-------------|-----------------|-----------|
| Dr.Melaxin | 7 | 約100KB |
| Refa | 1 | 32KB |
| The Room FX | 1 | 37KB |
| Phone Farm | 2 | 45KB |

---

### Stage 4: UI COMPONENT MAPPING（UI実装）

**目的**: TypeScriptデータをReactコンポーネントでビジュアライズする

**コンポーネント選定ガイド**:
| データタイプ | 推奨コンポーネント | 用途 |
|-------------|-------------------|------|
| 単一値 | KPICard | 売上、ROAS、件数 |
| 比較 | ComparisonTable | Plan A vs B |
| リスト（5件以上） | FilterableTable | 施策一覧、製品リスト |
| 時系列 | LineChart | 売上推移、トレンド |
| 構成比 | PieChart | 投資配分、チャネル比率 |
| カテゴリ比較 | BarChart | チャネル別売上 |
| 複合 | ComposedChart | 売上+投資+ROAS |
| フェーズ | Timeline | ロードマップ、フェーズ |
| 切り替え | Tabs | 複数ビュー |

**ページ構成パターン**:
```
Page
├── Header（タイトル、メタ情報）
├── TabNavigation
│   ├── Tab 1: OverviewContent
│   │   ├── KPICards（3-4枚）
│   │   ├── ExecutiveSummary
│   │   └── KeyChart
│   ├── Tab 2: DetailsContent
│   │   ├── FilterableTable
│   │   └── CategoryCharts
│   └── Tab 3: TimelineContent
│       ├── PhaseCards
│       └── Gantt/Timeline
└── Footer
```

**Rechartsチャート例**:
```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

<LineChart data={monthlyData} width={800} height={400}>
  <XAxis dataKey="month" />
  <YAxis yAxisId="left" />
  <YAxis yAxisId="right" orientation="right" />
  <Tooltip />
  <Legend />
  <Line yAxisId="left" dataKey="sales" stroke="#8884d8" />
  <Line yAxisId="right" dataKey="roas" stroke="#82ca9d" />
</LineChart>
```

---

### Stage 5: WEBAPP DEPLOYMENT（デプロイ）

**目的**: 完成したWebアプリをVercelで公開する

**プロジェクト構造**:
```
webapp/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── [routes]/
│   ├── components/
│   │   ├── ui/           # shadcn/ui
│   │   ├── charts/       # Recharts wrappers
│   │   └── [Feature]/
│   └── data/
│       └── *.ts
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

**デプロイ手順**:
```bash
# 1. ローカル確認
npm run dev
npm run build

# 2. Vercelデプロイ
vercel --prod --yes

# 3. CLAUDE.mdに本番URL記録
```

**デプロイ済みプロジェクト**:
| プロジェクト | URL |
|-------------|-----|
| concept-learning | https://webapp-five-bay.vercel.app |
| dr.melaxin | https://dr-melaxin-proposal.vercel.app |
| phonefarm | https://phonefarm-threat-intel.vercel.app |
| Refa | https://refa-report.vercel.app |
| norganic | https://webapp-five-bay.vercel.app |

---

## 3. 再利用可能なパターン

### パターン1: データ変換パイプライン

```
PDF/CSV → Markdown → TypeScript → React → Vercel
```

**原則**: 各層で構造を追加し、情報を失わない
- Stage 1→2: ナラティブの一貫性を追加
- Stage 2→3: 型安全性を追加
- Stage 3→4: ビジュアルを追加
- Stage 4→5: アクセス性を追加

### パターン2: マルチフォーマット出力

**すべてのプロジェクトで以下を提供**:
1. 戦略Markdownドキュメント（参照用）
2. 構造化TypeScriptデータ（開発用）
3. インタラクティブWebapp（プレゼン用）
4. 公開URL（共有用）

### パターン3: データドリブンナラティブ

**構成**:
1. エグゼクティブサマリー（KPI強調）
2. 歴史的コンテキスト（時系列分析）
3. 戦略的選択（Plan A/B）
4. 戦術的実行（メディアプラン）
5. 将来展望（予測・推奨）

### パターン4: 決定木の文書化

```markdown
## 決定: チャネル優先順位

### 選択肢
- Option A: Top KOL + TV（Ambassador重視）
- Option B: EC中心（パフォーマンス重視）✓ 採用
- Option C: ハイブリッド

### 決定理由
- ROASの確保が最優先
- クライアントFB: 「6月メガ割に集中したい」
```

### パターン5: モジュラードキュメント構造

```
project/
├── CLAUDE.md          # プロジェクトメタデータ
├── docs/              # 参照ドキュメント（Stage 2出力）
├── source/            # 元資料（Stage 1入力）
└── webapp/            # 実装（Stage 3-5出力）
    └── src/data/      # 構造化データ
```

---

## 4. プロジェクト別サマリー

| プロジェクト | 問い/与件 | アプローチ | 成果物 | 複雑度 |
|-------------|----------|-----------|--------|--------|
| concept-learning | マーケティングコンセプト教育 | ケーススタディ→評価フレームワーク | 学習Webapp（15事例） | ★★★ |
| dr.melaxin | $10M予算でGMV120億 | GTM分析→シナリオ比較 | 提案書Webapp（7チャート） | ★★★★★ |
| phonefarm | Phone Farm脅威対策 | インテリジェンス→ガイド | レポートWebapp（2ページ） | ★★★ |
| Refa | ブランド変遷分析 | 財務→イノベーター理論 | ダッシュボード（4ページ） | ★★★★ |
| the-room-fx | ANA広告配信提案 | SNS 5,795件→トライブ | 13セクション提案書 | ★★★★★ |
| norganic | X戦略立案 | コンセプト→フェーズ戦略 | 5タブWebapp | ★★★★ |
| mascode | プロモーション提案 | メディアプラン作成 | 静的提案書 | ★★ |

---

## 5. テンプレート

### フォルダ構造テンプレート

```
project-name/
├── CLAUDE.md              # プロジェクト概要（必須）
├── docs/
│   ├── brief.md           # 与件サマリー
│   ├── proposal.md        # 提案書本体
│   ├── research.md        # 調査結果
│   └── memo.md            # 内部決定事項
├── source/
│   ├── *.pdf              # 元PDF
│   └── *.csv              # 元データ
└── webapp/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── data/
    ├── package.json
    └── tailwind.config.ts
```

### TypeScriptデータテンプレート

```typescript
// src/data/project-data.ts

export interface Metadata {
  title: string
  subtitle: string
  client: string
  date: string
  classification: string
}

export interface Section {
  id: string
  title: string
}

export interface KPI {
  label: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
}

export interface TimeSeriesPoint {
  period: string
  [key: string]: string | number
}

// Export data
export const metadata: Metadata = {
  title: 'Project Title',
  subtitle: 'Subtitle',
  client: 'Client Name',
  date: '2026-01',
  classification: 'Confidential'
}

export const sections: Section[] = [
  { id: 'overview', title: '概要' },
  { id: 'strategy', title: '戦略' },
  { id: 'execution', title: '実行' },
]

export const kpis: KPI[] = [
  { label: '売上目標', value: '¥120億', change: '+50%', trend: 'up' },
  { label: 'ROAS', value: '316%', trend: 'up' },
]

export const timeSeries: TimeSeriesPoint[] = [
  { period: 'Q1', sales: 10, investment: 5, roas: 200 },
  { period: 'Q2', sales: 25, investment: 10, roas: 250 },
]
```

### デプロイチェックリスト

```markdown
## デプロイ前チェック

### ビルド
- [ ] `npm run build` が成功する
- [ ] TypeScriptエラーがない
- [ ] ESLint警告を確認

### データ
- [ ] docs/ と data/ の整合性
- [ ] 機密情報の除外
- [ ] データソースの明記

### UI
- [ ] モバイル表示確認
- [ ] チャートのレスポンシブ対応
- [ ] ローディング状態

### デプロイ
- [ ] `vercel --prod --yes` 実行
- [ ] 本番URL確認
- [ ] CLAUDE.md に URL 追記
```

---

## 6. よくある課題と解決策

### 課題1: docs/ と data/ の同期

**問題**: Markdownを更新したが、TypeScriptデータが古いまま

**解決策**:
- CLAUDE.md に「Source of Truth」を明記
- 更新時は必ず両方を同時に修正
- 複雑な場合は変換スクリプトを作成（例: `scripts/csv_to_ts.py`）

### 課題2: 複雑な財務データの扱い

**問題**: 8次元以上のGTMデータをどう構造化するか

**解決策**:
1. 時系列軸（Q1-Q4）で分割 → `quarterly-data.ts`
2. クロス集計用 → `matrix-data.ts`
3. UIで切り替え可能に → `FilterableMatrix.tsx`

### 課題3: 大量データの集約

**問題**: 5,795件のSNSデータ、1,185枚のPDFスライド

**解決策**:
- 集計データのみをdata/に格納（件数、平均、分布）
- 元データはsource/に保持
- 必要に応じてサンプルのみ表示

### 課題4: クライアントFBの反映

**問題**: 「この数字を変えて」「この表現をやめて」

**解決策**:
- CLAUDE.md の「重要な決定事項・ユーザーFB」セクションに記録
- 「確定済み（変更不可）」を明示
- 変更履歴を残す

---

## 更新履歴

- 2026-01-26: 初版作成（7プロジェクトの分析に基づく）
