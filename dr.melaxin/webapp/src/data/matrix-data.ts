// Dr.Melaxin Matrix Data - SNS×Month Budget & Reach Tables (15億円版 - 56.18%縮小)

export type SnsType = "TikTok" | "X" | "Instagram" | "YouTube" | "TikTokShop" | "Other";
export type Month = "2月" | "3月" | "4月" | "5月" | "6月" | "7月" | "8月" | "9月" | "10月" | "11月" | "12月";
export type Purpose = "認知" | "比較検討" | "購入" | "話題化" | "ブランディング";

// ============================================
// Annual Budget Matrix (SNS × Month)
// ============================================
export interface BudgetCell {
  value: number; // in 万円
  displayValue: string; // e.g., "30M", "¥3,000万"
}

export interface BudgetRow {
  tactic: string;
  sns: SnsType;
  subRow?: string; // 予算 / 本数 / Reach
  feb: BudgetCell;
  mar: BudgetCell;
  apr: BudgetCell;
  may: BudgetCell;
  jun: BudgetCell;
  jul: BudgetCell;
  aug: BudgetCell;
  sep: BudgetCell;
  oct: BudgetCell;
  nov: BudgetCell;
  dec: BudgetCell;
  total: BudgetCell;
  kpi?: string;
}

// Alias for component use
export type MatrixRow = BudgetRow;

// Annual Budget by Tactic (in 万円) - 15億円版
export const annualBudgetMatrix = [
  {
    tactic: "TikTok大量生成",
    sns: "TikTok" as SnsType,
    purpose: ["認知", "話題化"] as Purpose[],
    data: {
      feb: 1700, mar: 5600, apr: 1700, may: 1700, jun: 5600,
      jul: 2800, aug: 2800, sep: 5600, oct: 2800, nov: 5600, dec: 3400,
    },
    total: 39300,
    kpi: "3,900本・1本¥10,000",
  },
  {
    tactic: "X RT部隊",
    sns: "X" as SnsType,
    purpose: ["話題化"] as Purpose[],
    data: {
      feb: 1100, mar: 4500, apr: 600, may: 600, jun: 3400,
      jul: 600, aug: 600, sep: 3400, oct: 600, nov: 3400, dec: 1100,
    },
    total: 19700,
    kpi: "imp単価¥1・トレンド入り",
  },
  {
    tactic: "広告配信（運用型TT）",
    sns: "TikTok" as SnsType,
    purpose: ["認知"] as Purpose[],
    data: {
      feb: 500, mar: 850, apr: 500, may: 500, jun: 1000,
      jul: 700, aug: 700, sep: 850, oct: 700, nov: 850, dec: 850,
    },
    total: 7900,
    kpi: "CPM¥300",
  },
  {
    tactic: "広告配信（運用型IG）",
    sns: "Instagram" as SnsType,
    purpose: ["認知"] as Purpose[],
    data: {
      feb: 350, mar: 550, apr: 350, may: 350, jun: 700,
      jul: 450, aug: 450, sep: 550, oct: 450, nov: 550, dec: 550,
    },
    total: 5300,
    kpi: "CPM¥300",
  },
  {
    tactic: "広告配信（獲得型X）",
    sns: "X" as SnsType,
    purpose: ["購入"] as Purpose[],
    data: {
      feb: 300, mar: 2000, apr: 300, may: 300, jun: 2200,
      jul: 550, aug: 550, sep: 2000, oct: 550, nov: 2000, dec: 850,
    },
    total: 11500,
    kpi: "CPA¥3,000",
  },
  {
    tactic: "広告配信（獲得型IG）",
    sns: "Instagram" as SnsType,
    purpose: ["購入"] as Purpose[],
    data: {
      feb: 0, mar: 550, apr: 0, may: 0, jun: 850,
      jul: 0, aug: 0, sep: 550, oct: 0, nov: 550, dec: 300,
    },
    total: 2800,
    kpi: "リタゲ",
  },
  {
    tactic: "KOL Pick（IG）",
    sns: "Instagram" as SnsType,
    purpose: ["比較検討", "ブランディング"] as Purpose[],
    data: {
      feb: 0, mar: 3900, apr: 0, may: 0, jun: 3900,
      jul: 0, aug: 0, sep: 3100, oct: 0, nov: 3100, dec: 0,
    },
    total: 14000,
    kpi: "Aクラス2人",
  },
  {
    tactic: "KOL Pick（YT）",
    sns: "YouTube" as SnsType,
    purpose: ["比較検討", "ブランディング"] as Purpose[],
    data: {
      feb: 0, mar: 1700, apr: 0, may: 0, jun: 1700,
      jul: 0, aug: 0, sep: 1100, oct: 0, nov: 1100, dec: 0,
    },
    total: 5600,
    kpi: "メガ系KOL",
  },
  {
    tactic: "TTS GMV MAX",
    sns: "TikTokShop" as SnsType,
    purpose: ["購入"] as Purpose[],
    data: {
      feb: 1100, mar: 3400, apr: 1100, may: 1100, jun: 3400,
      jul: 1700, aug: 1700, sep: 3400, oct: 1700, nov: 3400, dec: 2200,
    },
    total: 24200,
    kpi: "ROAS 200%",
  },
  {
    tactic: "@cosme/LIPS",
    sns: "Other" as SnsType,
    purpose: ["比較検討"] as Purpose[],
    data: {
      feb: 300, mar: 300, apr: 300, may: 300, jun: 300,
      jul: 300, aug: 300, sep: 300, oct: 300, nov: 300, dec: 0,
    },
    total: 2800,
    kpi: "レビュー施策",
  },
  {
    tactic: "アンバサダー起用（グク）",
    sns: "Other" as SnsType,
    purpose: ["ブランディング", "認知", "話題化"] as Purpose[],
    data: {
      feb: 0, mar: 0, apr: 0, may: 0, jun: 16900,
      jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0,
    },
    total: 16900,
    kpi: "6月メガ割に合わせて起用",
  },
];

// ============================================
// Annual Reach Matrix (SNS × Month) - in 万UU (15億円版)
// ============================================
export const annualReachMatrix = [
  {
    tactic: "TikTok大量生成",
    sns: "TikTok" as SnsType,
    purpose: ["認知", "話題化"] as Purpose[],
    data: {
      feb: 830, mar: 2750, apr: 830, may: 830, jun: 2750,
      jul: 1380, aug: 1380, sep: 2750, oct: 1380, nov: 2750, dec: 1650,
    },
    total: 19300,
    note: "UU率70%",
  },
  {
    tactic: "X RT部隊",
    sns: "X" as SnsType,
    purpose: ["話題化"] as Purpose[],
    data: {
      feb: 280, mar: 1120, apr: 140, may: 140, jun: 840,
      jul: 140, aug: 140, sep: 840, oct: 140, nov: 840, dec: 280,
    },
    total: 4900,
    note: "freq4",
  },
  {
    tactic: "広告配信（運用型TT）",
    sns: "TikTok" as SnsType,
    purpose: ["認知"] as Purpose[],
    data: {
      feb: 560, mar: 940, apr: 560, may: 560, jun: 1120,
      jul: 750, aug: 750, sep: 940, oct: 750, nov: 940, dec: 940,
    },
    total: 8800,
    note: "freq3",
  },
  {
    tactic: "広告配信（運用型IG）",
    sns: "Instagram" as SnsType,
    purpose: ["認知"] as Purpose[],
    data: {
      feb: 370, mar: 620, apr: 370, may: 370, jun: 750,
      jul: 500, aug: 500, sep: 620, oct: 500, nov: 620, dec: 620,
    },
    total: 5900,
    note: "freq3",
  },
  {
    tactic: "広告配信（獲得型X）",
    sns: "X" as SnsType,
    purpose: ["購入"] as Purpose[],
    data: {
      feb: 310, mar: 2180, apr: 310, may: 310, jun: 2500,
      jul: 620, aug: 620, sep: 2180, oct: 620, nov: 2180, dec: 940,
    },
    total: 12800,
    note: "freq3",
  },
  {
    tactic: "広告配信（獲得型IG）",
    sns: "Instagram" as SnsType,
    purpose: ["購入"] as Purpose[],
    data: {
      feb: 0, mar: 0, apr: 0, may: 0, jun: 0,
      jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0,
    },
    total: 0,
    note: "リタゲのためReach計算なし",
  },
  {
    tactic: "KOL Pick（IG）",
    sns: "Instagram" as SnsType,
    purpose: ["比較検討", "ブランディング"] as Purpose[],
    data: {
      feb: 0, mar: 670, apr: 0, may: 0, jun: 670,
      jul: 0, aug: 0, sep: 450, oct: 0, nov: 450, dec: 0,
    },
    total: 2200,
    note: "20万FW×10%",
  },
  {
    tactic: "KOL Pick（YT）",
    sns: "YouTube" as SnsType,
    purpose: ["比較検討", "ブランディング"] as Purpose[],
    data: {
      feb: 0, mar: 2250, apr: 0, may: 0, jun: 2250,
      jul: 0, aug: 0, sep: 1680, oct: 0, nov: 1680, dec: 0,
    },
    total: 7900,
    note: "25万登録×40%",
  },
  {
    tactic: "TTS GMV MAX",
    sns: "TikTokShop" as SnsType,
    purpose: ["購入"] as Purpose[],
    data: {
      feb: 220, mar: 670, apr: 220, may: 220, jun: 670,
      jul: 340, aug: 340, sep: 670, oct: 340, nov: 670, dec: 450,
    },
    total: 4800,
    note: "freq5",
  },
  {
    tactic: "@cosme/LIPS",
    sns: "Other" as SnsType,
    purpose: ["比較検討"] as Purpose[],
    data: {
      feb: 0, mar: 0, apr: 0, may: 0, jun: 0,
      jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0,
    },
    total: 0,
    note: "レビュー施策のためReach計算なし",
  },
  {
    tactic: "アンバサダー起用（グク）",
    sns: "Other" as SnsType,
    purpose: ["ブランディング", "認知", "話題化"] as Purpose[],
    data: {
      feb: 0, mar: 0, apr: 0, may: 0, jun: 28100,
      jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0,
    },
    total: 28100,
    note: "5,000万フォロワー",
  },
];

// ============================================
// Monthly Summary Data (15億円版)
// ============================================
export const monthlySummary = [
  { month: "2月", budget: 5350, reach: 2580, event: "立ち上げ" },
  { month: "3月", budget: 23350, reach: 11850, event: "メガ割（年1回目）", isMegaSale: true },
  { month: "4月", budget: 4850, reach: 2440, event: "継続" },
  { month: "5月", budget: 4850, reach: 2440, event: "PD準備" },
  { month: "6月", budget: 39950, reach: 39700, event: "メガ割（年2回目）+ジョングク", isMegaSale: true },
  { month: "7月", budget: 7100, reach: 3730, event: "TTS強化" },
  { month: "8月", budget: 7100, reach: 3730, event: "TTS強化" },
  { month: "9月", budget: 20850, reach: 10780, event: "メガ割（年3回目）+Drug Store", isMegaSale: true },
  { month: "10月", budget: 7100, reach: 3730, event: "BF準備" },
  { month: "11月", budget: 20850, reach: 10780, event: "メガ割（年4回目）+BF", isMegaSale: true },
  { month: "12月", budget: 9250, reach: 5190, event: "BestCosme" },
];

// ============================================
// SNS Summary Data (15億円版)
// ============================================
export const snsSummary = [
  { sns: "TikTok", budget: 47200, budgetPct: 31.5, reach: 28100, reachPct: 29.7, color: "#00f2ea" },
  { sns: "X", budget: 31200, budgetPct: 20.8, reach: 17700, reachPct: 18.7, color: "#1da1f2" },
  { sns: "TikTok Shop", budget: 24200, budgetPct: 16.1, reach: 4800, reachPct: 5.1, color: "#ff0050" },
  { sns: "Instagram", budget: 22100, budgetPct: 14.7, reach: 8100, reachPct: 8.6, color: "#e4405f" },
  { sns: "その他", budget: 19700, budgetPct: 13.1, reach: 28100, reachPct: 29.7, color: "#888888" },
  { sns: "YouTube", budget: 5600, budgetPct: 3.7, reach: 7900, reachPct: 8.3, color: "#ff0000" },
];

// ============================================
// Tactic Summary Data (15億円版)
// ============================================
export const tacticSummary = [
  { tactic: "TikTok大量生成", budget: 39300, reach: 19300, budgetPct: 26.2, color: "#00f2ea" },
  { tactic: "TTS GMV MAX", budget: 24200, reach: 4800, budgetPct: 16.1, color: "#ff0050" },
  { tactic: "X RT部隊", budget: 19700, reach: 4900, budgetPct: 13.1, color: "#1da1f2" },
  { tactic: "KOL Pick", budget: 19600, reach: 10100, budgetPct: 13.1, color: "#e4405f" },
  { tactic: "アンバサダー", budget: 16900, reach: 28100, budgetPct: 11.3, color: "#8b5cf6" },
  { tactic: "広告（獲得型）", budget: 14300, reach: 12800, budgetPct: 9.5, color: "#4267b2" },
  { tactic: "広告（運用型）", budget: 13200, reach: 14700, budgetPct: 8.8, color: "#833ab4" },
  { tactic: "@cosme/LIPS", budget: 2800, reach: 0, budgetPct: 1.9, color: "#888888" },
];

// ============================================
// KPI Summary (15億円版)
// ============================================
export const matrixKpiSummary = {
  totalBudget: 150000, // 万円 = 15億円
  totalReach: 94700, // 万UU = 約9.5億UU
  tiktokVideos: 3900,
  kolDeliveries: 6, // IG 4 + YT 2
  megaSaleGmv: 18, // 億円 (4回合計)
  annualGmv: 45, // 億円
  annualRoas: 300, // %
};

// ============================================
// Reach Calculation Logic
// ============================================
export const reachCalculationLogic = [
  { media: "TikTok大量生成", formula: "本数 × 平均再生7万 × UU率70%", param: "1本¥10,000" },
  { media: "X RT部隊", formula: "予算 ÷ imp単価¥1 ÷ freq4", param: "100万imp/投稿" },
  { media: "広告（運用型）", formula: "(予算 ÷ CPM¥300) × 1,000 ÷ freq3", param: "CPM¥300" },
  { media: "広告（獲得型）", formula: "(予算 ÷ CPM¥300) × 1,000 ÷ freq3", param: "CPA¥3,000目標" },
  { media: "IG KOL Pick", formula: "20万FW × 視聴率10% × 配信数", param: "Aクラス" },
  { media: "YT KOL Pick", formula: "25万登録 × 視聴率40% × 配信数", param: "メガ系" },
  { media: "TTS GMV MAX", formula: "(予算 ÷ CPM¥1,000) × 1,000 ÷ freq5", param: "ROAS 200%" },
];

// ============================================
// Chart-Ready Data
// ============================================

// SNS Budget Pie Chart Data
export const snsBudgetPieData = snsSummary.map((item) => ({
  name: item.sns,
  value: item.budget,
  fill: item.color,
}));

// SNS Reach Pie Chart Data
export const snsReachPieData = snsSummary
  .filter((item) => item.reach > 0)
  .map((item) => ({
    name: item.sns,
    value: item.reach,
    fill: item.color,
  }));

// Tactic Budget Pie Chart Data
export const tacticBudgetPieData = tacticSummary.map((item) => ({
  name: item.tactic,
  value: item.budget,
  fill: item.color,
}));

// Monthly Trend Chart Data
export const monthlyTrendData = monthlySummary.map((item) => ({
  month: item.month,
  budget: item.budget / 100, // 億円に変換
  reach: item.reach / 100, // 億UUに変換
  isMegaSale: item.isMegaSale || false,
}));

// Monthly Reach by SNS (for stacked area chart) - 15億円版
export const monthlyReachTrend = [
  { month: "2月", tiktok: 1010, x: 670, instagram: 450, youtube: 220, tts: 220 },
  { month: "3月", tiktok: 5110, x: 3030, instagram: 1800, youtube: 840, tts: 1050, isMegaSale: true },
  { month: "4月", tiktok: 950, x: 620, instagram: 450, youtube: 200, tts: 220 },
  { month: "5月", tiktok: 950, x: 620, instagram: 450, youtube: 200, tts: 220 },
  { month: "6月", tiktok: 5340, x: 3370, instagram: 1970, youtube: 840, tts: 980, isMegaSale: true },
  { month: "7月", tiktok: 1400, x: 1010, instagram: 620, youtube: 280, tts: 410 },
  { month: "8月", tiktok: 1400, x: 1010, instagram: 620, youtube: 280, tts: 410 },
  { month: "9月", tiktok: 4610, x: 2700, instagram: 1630, youtube: 790, tts: 1050, isMegaSale: true },
  { month: "10月", tiktok: 1400, x: 1010, instagram: 620, youtube: 280, tts: 410 },
  { month: "11月", tiktok: 4610, x: 2700, instagram: 1630, youtube: 790, tts: 1050, isMegaSale: true },
  { month: "12月", tiktok: 2120, x: 1540, instagram: 850, youtube: 390, tts: 290 },
];

// ============================================
// Filter Options
// ============================================
export const filterOptions = {
  sns: ["TikTok", "X", "Instagram", "YouTube", "TikTokShop", "Other"],
  month: ["2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  quarter: ["Q1", "Q2", "Q3", "Q4"],
  tactic: [
    "TikTok大量生成",
    "X RT部隊",
    "広告配信（運用型TT）",
    "広告配信（運用型IG）",
    "広告配信（獲得型X）",
    "広告配信（獲得型IG）",
    "KOL Pick（IG）",
    "KOL Pick（YT）",
    "TTS GMV MAX",
    "@cosme/LIPS",
    "アンバサダー起用（グク）",
  ],
  purpose: ["認知", "比較検討", "購入", "話題化", "ブランディング"],
};

// Purpose color map
export const purposeColors: Record<Purpose, string> = {
  認知: "#3b82f6",      // blue
  比較検討: "#f59e0b",  // amber
  購入: "#10b981",      // emerald
  話題化: "#ec4899",    // pink
  ブランディング: "#8b5cf6", // violet
};

// ============================================
// Quarterly Matrix Summary (15億円版)
// ============================================
export const quarterlyMatrixSummary = [
  {
    quarter: "Q1",
    period: "2-3月",
    budget: 28700,
    reach: 14430,
    mainEvent: "3月メガ割",
    breakdown: {
      tiktok: 8650,
      x: 8100,
      instagram: 5350,
      youtube: 1700,
      tts: 4500,
      other: 600,
    },
  },
  {
    quarter: "Q2",
    period: "4-6月",
    budget: 49650,
    reach: 44580,
    mainEvent: "6月メガ割+ジョングク",
    breakdown: {
      tiktok: 9100,
      x: 6800,
      instagram: 6300,
      youtube: 1700,
      tts: 7900,
      other: 17850,
    },
  },
  {
    quarter: "Q3",
    period: "7-9月",
    budget: 35050,
    reach: 18240,
    mainEvent: "9月メガ割+Drug Store",
    breakdown: {
      tiktok: 11050,
      x: 7500,
      instagram: 4650,
      youtube: 1100,
      tts: 9850,
      other: 900,
    },
  },
  {
    quarter: "Q4",
    period: "10-12月",
    budget: 37200,
    reach: 19700,
    mainEvent: "11月メガ割+BF+BestCosme",
    breakdown: {
      tiktok: 11100,
      x: 8700,
      instagram: 5200,
      youtube: 1100,
      tts: 10500,
      other: 600,
    },
  },
];

// ============================================
// Helper Functions
// ============================================
export function formatBudget(valueInMan: number): string {
  if (valueInMan >= 10000) {
    return `${(valueInMan / 10000).toFixed(1)}億`;
  }
  return `${valueInMan.toLocaleString()}万`;
}

export function formatReach(valueInMan: number): string {
  if (valueInMan >= 10000) {
    return `${(valueInMan / 10000).toFixed(2)}億UU`;
  }
  return `${valueInMan.toLocaleString()}万UU`;
}

export function getQuarterForMonth(month: string): string {
  const q1 = ["2月", "3月"];
  const q2 = ["4月", "5月", "6月"];
  const q3 = ["7月", "8月", "9月"];
  const q4 = ["10月", "11月", "12月"];

  if (q1.includes(month)) return "Q1";
  if (q2.includes(month)) return "Q2";
  if (q3.includes(month)) return "Q3";
  if (q4.includes(month)) return "Q4";
  return "";
}

export function getSnsColor(sns: string): string {
  const colors: Record<string, string> = {
    TikTok: "#00f2ea",
    X: "#1da1f2",
    Instagram: "#e4405f",
    YouTube: "#ff0000",
    TikTokShop: "#ff0050",
    Other: "#888888",
  };
  return colors[sns] || "#888888";
}
