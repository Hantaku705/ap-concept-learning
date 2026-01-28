---
name: webapp-data-pattern
description: dr.melaxin webappで学んだデータ駆動型webapp開発のベストプラクティス。ファイルベースアウトプット、フィルタリング、型駆動設計のパターン集。
---

# Webapp Data Pattern

データ駆動型webapp（提案書・ダッシュボード）のベストプラクティス。

---

## 1. ファイルベースデータアーキテクチャ

### ディレクトリ構成

```
src/
├── data/                    # データ層（純粋なTS、Reactなし）
│   ├── master-data.ts       # マスターデータ + 型定義
│   ├── matrix-data.ts       # 集計データ（ピボット用）
│   ├── config.ts            # 色マッピング + フォーマッター
│   └── [domain]-data.ts     # ドメイン別データ
│
├── components/              # 表示層（表示ロジックのみ）
│   ├── *Content.tsx         # データを受け取って表示
│   ├── FilterableMatrix.tsx # フィルター付きピボットテーブル
│   └── charts/              # グラフコンポーネント
│
└── app/                     # ページ層
    └── page.tsx             # タブ構成のメインページ
```

### 原則

| 原則 | 説明 |
|------|------|
| **データファイルはReactを含まない** | 純粋なTypeScript、importはtypeのみ |
| **コンポーネントは表示ロジックのみ** | データ加工はデータファイルで行う |
| **LLM分析結果はファイル化** | 分析結果をTSファイルに書き出し、コンポーネントは参照のみ |

---

## 2. 型駆動設計

### マスターデータ型

```typescript
// 施策マスター
export interface TacticMaster {
  id: string;
  name: string;
  shortName: string;
  sns: SnsType;
  type: TacticType;
  purposes: Purpose[];
  roleDescription: string;
  priority: 1 | 2 | 3 | 4 | 5;
  annualBudget: number;
  annualReach: number;
  annualPosts?: number;
  totalFollowers?: number;
  creatorCount?: number;
  kpi?: string;
  note?: string;
}

// 列挙型
export type SnsType = "TikTok" | "X" | "Instagram" | "YouTube" | "TikTokShop" | "Other";
export type TacticType = "Post" | "Boost" | "Other";
export type Purpose = "認知" | "比較検討" | "購入" | "話題化" | "ブランディング";
```

### 派生データ型

```typescript
// ピボットテーブル用
export interface PivotRow {
  key: string;
  label: string;
  sns?: SnsType;
  tactic?: string;
  purposes?: Purpose[];
  values: Record<string, number>;
  total: number;
  color?: string;
}

// マトリックスセル
export interface BudgetCell {
  value: number;
  displayValue: string;
}
```

---

## 3. フィルタリングパターン

### フィルター状態管理

```typescript
// フィルター型定義
type DataFilter = {
  sns: string[];
  tactic: string[];
  purpose: string[];
};

// 初期状態
const [filters, setFilters] = useState<DataFilter>({
  sns: [],
  tactic: [],
  purpose: [],
});
```

### トグル・クリア関数

```typescript
// トグル（追加 or 削除）
const toggleFilter = (type: keyof DataFilter, value: string) => {
  setFilters(prev => ({
    ...prev,
    [type]: prev[type].includes(value)
      ? prev[type].filter(v => v !== value)
      : [...prev[type], value]
  }));
};

// 全クリア
const clearFilters = () => {
  setFilters({ sns: [], tactic: [], purpose: [] });
};

// 特定軸クリア
const clearFilterType = (type: keyof DataFilter) => {
  setFilters(prev => ({ ...prev, [type]: [] }));
};
```

### フィルター適用ロジック

```typescript
const filterData = (data: TacticMaster[]): TacticMaster[] => {
  return data.filter(row => {
    // SNSフィルター
    if (filters.sns.length > 0 && !filters.sns.includes(row.sns)) {
      return false;
    }
    // 施策フィルター
    if (filters.tactic.length > 0 && !filters.tactic.includes(row.name)) {
      return false;
    }
    // 目的フィルター（配列 AND 条件）
    if (filters.purpose.length > 0) {
      const rowPurposes = row.purposes || [];
      if (!filters.purpose.some(p => rowPurposes.includes(p as Purpose))) {
        return false;
      }
    }
    return true;
  });
};
```

### フィルターUI

```tsx
// フィルターボタン（選択状態表示）
<button
  onClick={() => toggleFilter("sns", option)}
  className={`px-3 py-1 rounded ${
    filters.sns.includes(option)
      ? "bg-blue-500 text-white"
      : "bg-gray-100 text-gray-700"
  }`}
>
  {filters.sns.includes(option) && "✓ "}
  {option}
</button>

// 選択数バッジ
{filters.sns.length > 0 && (
  <span className="ml-2 text-xs bg-blue-100 px-2 rounded">
    {filters.sns.length}件選択中
  </span>
)}

// クリアボタン
<button
  onClick={clearFilters}
  className="text-red-500 hover:text-red-700"
>
  クリア
</button>
```

---

## 4. ピボットテーブル軸切り替え

### 軸タイプ

```typescript
type RowAxis = "all" | "sns" | "tactic" | "purpose";
type ColAxis = "month" | "quarter" | "all";
type ViewMode = "budget" | "reach" | "both";
```

### 軸切り替えUI

```tsx
// 行軸セレクター
<select value={rowAxis} onChange={e => setRowAxis(e.target.value as RowAxis)}>
  <option value="all">全て（施策別詳細）</option>
  <option value="sns">SNS別</option>
  <option value="tactic">施策別</option>
  <option value="purpose">目的別</option>
</select>

// 列軸セレクター
<select value={colAxis} onChange={e => setColAxis(e.target.value as ColAxis)}>
  <option value="month">月別</option>
  <option value="quarter">四半期別</option>
  <option value="all">全て（月+四半期計）</option>
</select>
```

### 集計ロジック

```typescript
const aggregateByAxis = (
  data: MatrixRow[],
  axis: RowAxis
): PivotRow[] => {
  if (axis === "all") {
    // 全行表示（SNS/施策/目的カラム追加）
    return data.map(row => ({
      key: row.id,
      label: row.name,
      sns: row.sns,
      tactic: row.tactic,
      purposes: row.purposes,
      values: row.monthlyData,
      total: row.total,
    }));
  }

  // グループ化して集計
  const groups = new Map<string, PivotRow>();
  data.forEach(row => {
    const key = row[axis];
    const existing = groups.get(key);
    if (existing) {
      // 値を加算
      Object.keys(row.monthlyData).forEach(month => {
        existing.values[month] = (existing.values[month] || 0) + row.monthlyData[month];
      });
      existing.total += row.total;
    } else {
      groups.set(key, {
        key,
        label: key,
        values: { ...row.monthlyData },
        total: row.total,
        color: getColorForAxis(axis, key),
      });
    }
  });

  return Array.from(groups.values()).sort((a, b) => b.total - a.total);
};
```

---

## 5. フォーマッター関数

### 数値フォーマッター

```typescript
// 予算（万円単位）
export function formatBudget(valueInMan: number): string {
  if (valueInMan >= 10000) {
    return `${(valueInMan / 10000).toFixed(1)}億`;
  }
  if (valueInMan >= 100) {
    return `${(valueInMan / 100).toFixed(1)}百万`;
  }
  return `${valueInMan.toLocaleString()}万`;
}

// リーチ（万UU単位）
export function formatReach(valueInMan: number): string {
  if (valueInMan >= 10000) {
    return `${(valueInMan / 10000).toFixed(2)}億UU`;
  }
  return `${valueInMan.toLocaleString()}万UU`;
}

// 投稿数
export function formatPosts(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toLocaleString();
}

// フォロワー数
export function formatFollowers(count?: number): string {
  if (!count) return "-";
  if (count >= 10000000) {
    return `${(count / 10000000).toFixed(1)}千万`;
  }
  if (count >= 10000) {
    return `${(count / 10000).toFixed(0)}万`;
  }
  return count.toLocaleString();
}
```

### 優先度表示

```typescript
export function getPriorityStars(priority: number): string {
  return "★".repeat(priority) + "☆".repeat(5 - priority);
}

export function getPriorityColor(priority: number): string {
  const colors: Record<number, string> = {
    5: "#ef4444", // red
    4: "#f97316", // orange
    3: "#eab308", // yellow
    2: "#84cc16", // lime
    1: "#9ca3af", // gray
  };
  return colors[priority] || "#9ca3af";
}
```

---

## 6. 色コーディング

### SNS色

```typescript
export const snsColors: Record<SnsType, string> = {
  TikTok: "#00f2ea",
  X: "#1da1f2",
  Instagram: "#e4405f",
  YouTube: "#ff0000",
  TikTokShop: "#ff0050",
  Other: "#888888",
};

export function getSnsColor(sns: string): string {
  return snsColors[sns as SnsType] || "#888888";
}
```

### 目的色

```typescript
export const purposeColors: Record<Purpose, string> = {
  認知: "#3b82f6",           // blue
  比較検討: "#f59e0b",        // amber
  購入: "#10b981",            // emerald
  話題化: "#ec4899",          // pink
  ブランディング: "#8b5cf6",  // violet
};
```

### 表示モード色

```typescript
// 予算: amber系
const budgetColor = "text-amber-600";
const budgetBg = "bg-amber-50";

// リーチ: purple系
const reachColor = "text-purple-600";
const reachBg = "bg-purple-50";
```

---

## 7. パフォーマンス最適化

### useMemoチェーン

```typescript
// 1. フィルター適用（filters変更時のみ再計算）
const filteredData = useMemo(
  () => filterData(rawData),
  [filters]
);

// 2. ピボット集計（filteredDataまたはaxis変更時のみ）
const pivotData = useMemo(
  () => aggregateByAxis(filteredData, rowAxis),
  [filteredData, rowAxis]
);

// 3. 合計計算（pivotData変更時のみ）
const totals = useMemo(
  () => calculateTotals(pivotData, columnHeaders),
  [pivotData, columnHeaders]
);
```

### テーブル最適化

```tsx
// スティッキーヘッダー
<th className="sticky left-0 bg-gray-50 min-w-[120px]">
  {label}
</th>

// 水平スクロール
<div className="overflow-x-auto">
  <table className="w-full text-sm table-fixed">
    ...
  </table>
</div>

// 固定幅列
<td className="min-w-[85px] text-right">
  {value}
</td>
```

---

## 8. コンポーネント構成パターン

### タブシェル（Composition）

```tsx
interface ProposalTabsProps {
  strategyContent: React.ReactNode;
  tacticsContent?: React.ReactNode;
  mediaplanContent: React.ReactNode;
  calendarContent?: React.ReactNode;
  defaultTab?: TabType;
}

export function ProposalTabs({
  strategyContent,
  tacticsContent,
  mediaplanContent,
  calendarContent,
  defaultTab = "strategy",
}: ProposalTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  // ...
}
```

### KPIカード

```tsx
interface KPICardProps {
  label: string;
  value: string | number;
  subValue?: string;
  color?: string;
}

export function KPICard({ label, value, subValue, color }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`text-2xl font-bold ${color || "text-gray-900"}`}>
        {value}
      </div>
      {subValue && (
        <div className="text-xs text-gray-400">{subValue}</div>
      )}
    </div>
  );
}
```

### 展開可能テーブル行

```tsx
export function ExpandableRow({ data }: { data: TacticMaster }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer hover:bg-gray-50"
      >
        <td>{data.name}</td>
        <td>{formatBudget(data.annualBudget)}</td>
        {/* ... */}
      </tr>
      {expanded && (
        <tr className="bg-gray-50">
          <td colSpan={10}>
            <div className="p-4">
              <p className="text-sm">{data.roleDescription}</p>
              {data.kpi && <p className="text-xs text-gray-500">KPI: {data.kpi}</p>}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
```

---

## 9. エラーハンドリング

### Null/Undefined対策

```typescript
// オプショナルフィールド
const purposes = row.purposes || ["その他"];
const value = row.data?.[key] || 0;
const followers = formatFollowers(tactic.totalFollowers); // 関数内でundefined対応

// 条件付きレンダリング
{row.purposes?.map(p => <Badge key={p}>{p}</Badge>)}
{row.kpi && <div className="text-xs">{row.kpi}</div>}
```

### マッチングデータ取得

```typescript
// 予算とリーチを同時表示（"both"モード）
const findMatchingReachRow = (budgetKey: string): PivotRow | undefined => {
  return pivotReachData.find(r => r.key === budgetKey);
};

// 使用例（フォールバック付き）
const reachRow = findMatchingReachRow(budgetRow.key);
<span className="text-xs text-purple-600">
  {reachRow?.values[col] > 0 ? formatReach(reachRow.values[col]) : "-"}
</span>
```

---

## 10. チェックリスト

### 新規webapp作成時

- [ ] データファイル作成（`src/data/`）
  - [ ] マスターデータ + 型定義
  - [ ] 集計データ（必要に応じて）
  - [ ] 色マッピング + フォーマッター
- [ ] フィルター実装
  - [ ] フィルター状態管理
  - [ ] トグル/クリア関数
  - [ ] フィルターUI
- [ ] ピボットテーブル（必要に応じて）
  - [ ] 軸切り替え
  - [ ] 集計ロジック
  - [ ] 表示モード切り替え
- [ ] パフォーマンス最適化
  - [ ] useMemoチェーン
  - [ ] スティッキーヘッダー
  - [ ] 水平スクロール
