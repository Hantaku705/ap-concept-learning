---
description: "/scaffold-webapp - データ駆動webappの雛形生成"
---

# Scaffold Webapp

データ駆動型のwebapp（提案書・ダッシュボード）の雛形を生成する。

## 前提知識

このコマンドは `webapp-data-pattern` スキルのパターンに従う。
詳細は `~/.claude/skills/webapp-data-pattern.md` を参照。

## 実行手順

1. **プロジェクト情報を確認**
   - プロジェクト名（例: `dr.melaxin`, `the-room-fx`）
   - 主要データ種類（予算、リーチ、施策、KPI等）
   - フィルター軸（SNS、目的、期間、地域等）
   - 表示形式（タブ、ピボットテーブル、グラフ等）

2. **webappフォルダ作成**
   ```bash
   mkdir -p [project]/webapp/src/{app,components,data}
   cd [project]/webapp
   npx create-next-app@latest . --typescript --tailwind --app --yes
   ```

3. **データファイル生成**

   **`src/data/master-data.ts`**:
   - 型定義（マスターデータ型、列挙型）
   - マスターデータ配列
   - フィルターオプション

   **`src/data/matrix-data.ts`**（ピボット用）:
   - マトリックスデータ（行×列）
   - 集計データ（SNS別、目的別等）
   - 月別/四半期別サマリー

   **`src/data/config.ts`**:
   - 色マッピング（SNS色、目的色）
   - フォーマッター関数（予算、リーチ、投稿数）

4. **コンポーネント生成**

   **`src/components/ProposalTabs.tsx`**:
   - タブナビゲーション
   - ReactNode props（Composition）

   **`src/components/FilterableMatrix.tsx`**:
   - フィルター状態管理
   - ピボットテーブル表示
   - 軸切り替え

   **`src/components/KPICards.tsx`**:
   - サマリーカード（6枚程度）
   - フォーマット済み数値表示

5. **ページ生成**

   **`src/app/page.tsx`**:
   - タブ構成
   - 各タブにContentコンポーネント

6. **動作確認**
   ```bash
   npm run dev
   ```
   - フィルタリング動作確認
   - ピボット軸切り替え確認
   - レスポンシブ確認

## 生成ファイル構成

```
webapp/
├── src/
│   ├── app/
│   │   ├── page.tsx           # メインページ
│   │   ├── layout.tsx         # レイアウト
│   │   └── globals.css        # グローバルCSS
│   │
│   ├── components/
│   │   ├── ProposalTabs.tsx       # タブナビゲーション
│   │   ├── FilterableMatrix.tsx   # フィルター付きピボット
│   │   ├── KPICards.tsx           # サマリーカード
│   │   ├── StrategyContent.tsx    # 戦略タブ
│   │   ├── TacticsContent.tsx     # 施策一覧タブ
│   │   ├── MediaPlanContent.tsx   # メディアプランタブ
│   │   └── charts/
│   │       ├── PieChart.tsx
│   │       ├── BarChart.tsx
│   │       └── TrendChart.tsx
│   │
│   └── data/
│       ├── master-data.ts     # マスターデータ + 型
│       ├── matrix-data.ts     # 集計データ
│       └── config.ts          # 色 + フォーマッター
│
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## データファイルテンプレート

### master-data.ts

```typescript
// ===== 型定義 =====
export type SnsType = "TikTok" | "X" | "Instagram" | "YouTube" | "Other";
export type Purpose = "認知" | "比較検討" | "購入" | "話題化";

export interface TacticMaster {
  id: string;
  name: string;
  shortName: string;
  sns: SnsType;
  purposes: Purpose[];
  priority: 1 | 2 | 3 | 4 | 5;
  annualBudget: number;  // 万円
  annualReach: number;   // 万UU
  kpi?: string;
  note?: string;
}

// ===== マスターデータ =====
export const tacticsMasterData: TacticMaster[] = [
  {
    id: "tactic-1",
    name: "TikTok大量生成",
    shortName: "TT大量",
    sns: "TikTok",
    purposes: ["認知", "話題化"],
    priority: 5,
    annualBudget: 7000,
    annualReach: 35000,
    kpi: "再生数1億回",
  },
  // ...
];

// ===== フィルターオプション =====
export const filterOptions = {
  sns: ["TikTok", "X", "Instagram", "YouTube", "Other"] as SnsType[],
  purpose: ["認知", "比較検討", "購入", "話題化"] as Purpose[],
};
```

### config.ts

```typescript
import type { SnsType, Purpose } from "./master-data";

// ===== 色マッピング =====
export const snsColors: Record<SnsType, string> = {
  TikTok: "#00f2ea",
  X: "#1da1f2",
  Instagram: "#e4405f",
  YouTube: "#ff0000",
  Other: "#888888",
};

export const purposeColors: Record<Purpose, string> = {
  認知: "#3b82f6",
  比較検討: "#f59e0b",
  購入: "#10b981",
  話題化: "#ec4899",
};

// ===== フォーマッター =====
export function formatBudget(valueInMan: number): string {
  if (valueInMan >= 10000) return `${(valueInMan / 10000).toFixed(1)}億`;
  return `${valueInMan.toLocaleString()}万`;
}

export function formatReach(valueInMan: number): string {
  if (valueInMan >= 10000) return `${(valueInMan / 10000).toFixed(2)}億UU`;
  return `${valueInMan.toLocaleString()}万UU`;
}

export function getSnsColor(sns: string): string {
  return snsColors[sns as SnsType] || "#888888";
}
```

## 注意事項

- **データ優先**: 先にデータファイルを作成し、コンポーネントは後から
- **型安全**: 全てのデータに型定義を付ける
- **useMemo**: フィルタリング・集計は必ずuseMemoでラップ
- **フォーマッター統一**: 数値表示は必ずフォーマッター経由

## 参考実装

dr.melaxin webapp: `/Users/hantaku/Downloads/AP/projects/dr.melaxin/webapp/`
