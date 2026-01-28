---
name: project-workflow
description: プロジェクト型タスクの標準ワークフロー。与件（PDF/CSV/メモ）から戦略ドキュメント→データ構造→Webappまでの5段階フロー。
---

# プロジェクトワークフロー

与件（PDF/CSV/ミーティングメモ）からWebappデプロイまでの標準フロー。

---

## 5段階ワークフロー概要

```
与件 → Markdown → TypeScript → React → Vercel
```

| Stage | 名称 | 出力物 |
|-------|------|--------|
| 1 | INPUT CAPTURE | `source/`, `docs/brief.md`, `CLAUDE.md` |
| 2 | STRATEGIC DOC | `docs/proposal.md`（300-700行） |
| 3 | DATA STRUCTURE | `webapp/src/data/*.ts`（8-37KB） |
| 4 | UI MAPPING | React + Recharts コンポーネント |
| 5 | DEPLOY | Vercel公開URL |

---

## Stage 1: INPUT CAPTURE（与件取得）

**やること**:
1. 元資料を `source/` に格納
2. `docs/brief.md` に与件サマリーを記述
3. `CLAUDE.md` にプロジェクト概要を記録

**インプット形式**:
| 形式 | 処理 |
|------|------|
| PDF | 画像化 or テキスト抽出 |
| CSV/Excel | データ構造の把握 |
| ミーティングメモ | 決定事項の抽出 |
| SNSデータ | 集計・トライブ分類 |

---

## Stage 2: STRATEGIC DOCUMENT SYNTHESIS（戦略ドキュメント化）

**やること**:
1. `docs/proposal.md` を作成（300-700行）
2. 表形式で比較・一覧を記述
3. 決定木（Plan A/B、シナリオ）を明示

**ドキュメント構成**:
```
docs/
├── proposal.md      # 提案書本体
├── research.md      # 競合調査
├── brief.md         # 与件サマリー
└── memo.md          # 内部決定事項
```

---

## Stage 3: DATA STRUCTURING（データ構造化）

**やること**:
1. TypeScript interfacesで型定義
2. `webapp/src/data/*.ts` にデータを構造化

**データ構造パターン**:
```typescript
// メタデータ
export const metadata = { title, subtitle, client, date }

// セクション定義
export const sections = [{ id, title }, ...]

// リストデータ
export const tacticsList = [{ name, priority, budget }, ...]

// 時系列データ
export const monthlyData = [{ month, sales, roas }, ...]
```

---

## Stage 4: UI COMPONENT MAPPING（UI実装）

**コンポーネント選定**:
| データタイプ | 推奨コンポーネント |
|-------------|-------------------|
| 単一値 | KPICard |
| 比較 | ComparisonTable |
| リスト | FilterableTable |
| 時系列 | LineChart |
| 構成比 | PieChart |
| フェーズ | Timeline |
| 切り替え | Tabs |

**ページ構成**:
```
Page
├── Header
├── TabNavigation
│   ├── Tab 1: Overview (KPICards + Chart)
│   ├── Tab 2: Details (Table + Charts)
│   └── Tab 3: Timeline
└── Footer
```

---

## Stage 5: WEBAPP DEPLOYMENT（デプロイ）

**手順**:
```bash
# 1. ローカル確認
npm run dev
npm run build

# 2. Vercelデプロイ
vercel --prod --yes

# 3. CLAUDE.mdに本番URL記録
```

---

## フォルダ構造テンプレート

```
project-name/
├── CLAUDE.md              # プロジェクト概要（必須）
├── docs/
│   ├── brief.md           # 与件サマリー
│   ├── proposal.md        # 提案書本体
│   └── research.md        # 調査結果
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

---

## よくある課題と解決策

| 課題 | 解決策 |
|------|--------|
| docs/ と data/ の同期 | CLAUDE.md に Source of Truth を明記 |
| 複雑な財務データ | 時系列軸で分割、matrix-data.ts 作成 |
| 大量データ | 集計データのみdata/に、元データはsource/ |
| クライアントFB反映 | CLAUDE.md に決定事項として記録 |

---

## 参照

詳細は `projects/workflow/workflow.md` を参照。

---

## 使い方

1. 新規プロジェクト作成時に `/project-workflow` を呼び出し
2. 5段階に沿って進める
3. 各段階で出力物を確認
4. デプロイ後、CLAUDE.md にURLを記録
