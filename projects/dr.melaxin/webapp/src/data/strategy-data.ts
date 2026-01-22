// Dr.Melaxin $10M版 戦略データ（1スライド版）

// メタデータ
export const strategyMeta = {
  title: "Dr.Melaxin 日本市場戦略",
  subtitle: "$10M マーケティング提案",
  client: "BRAND501 Corp.",
  brand: "Dr.Melaxin",
  proposer: "AnyMind Group Inc.",
  date: "2025.02",
  classification: "CONFIDENTIAL",
  budget: "15.8億円",
  targetGmv: "73.6億円",
  roas: "466%",
};

// OGSM 1スライド（これが戦略の核）
export const ogsmSummary = {
  objective: "日本市場でTop Tier韓国スキンケアへ",
  goals: "年間GMV 73.6億円、メガ割Top5",
  strategy: "「通常期で話題→メガ割で刈り取り」",
  measures: "TikTok大量 + Xハック + KOL Pick",
};

// KPI（4つの数字）
export const highlights = [
  { label: "年間GMV", value: "73.6億", color: "sky" },
  { label: "投資額", value: "15.8億", color: "amber" },
  { label: "ROAS", value: "466%", color: "emerald" },
  { label: "主力", value: "Qoo10 38%", color: "violet" },
];

// CSF: 勝ちパターン4つ
export const csf = [
  { num: 1, factor: "TikTok大量動画", tactic: "500-1000本/月→1億再生", icon: "video" },
  { num: 2, factor: "Xハック（RT部隊）", tactic: "週5-20投稿→トレンド入り", icon: "trend" },
  { num: 3, factor: "Ambassador起用", tactic: "ブランディング→切り抜き→UGC拡散", icon: "star" },
  { num: 4, factor: "Qoo10メガ割KOL Pick", tactic: "IG/YT Live→メガ割GMV最大化", icon: "users" },
];

// 四半期サマリー（シンプル版）
export const quarterSummary = [
  { q: "Q1", period: "2-3月", invest: "3.8億", gmv: "7.9億", event: "3月メガ割" },
  { q: "Q2", period: "4-6月", invest: "3.6億+別枠", gmv: "13.4億", event: "6月メガ割+ジョングク" },
  { q: "Q3", period: "7-9月", invest: "4.0億", gmv: "21.3億", event: "9月メガ割+Drug Store" },
  { q: "Q4", period: "10-12月", invest: "4.4億", gmv: "31.0億", event: "11月メガ割+BF" },
];

// 四半期ロードマップ（年間の山場を可視化）
// intensity: 1-5（5が最大ピーク）
export const quarterRoadmap = [
  {
    q: "Q1",
    period: "2-3月",
    theme: "市場参入・認知獲得",
    keyEvent: "3月メガ割",
    intensity: 3,
    tactics: ["TikTok大量生成", "RT部隊稼働", "KOL Pick開始"],
    gmvTarget: "7.9億",
  },
  {
    q: "Q2",
    period: "4-6月",
    theme: "Ambassador起用で最大化",
    keyEvent: "6月メガ割+グク",
    intensity: 5, // 年間最大ピーク
    isPeak: true,
    tactics: ["グク起用・切り抜き拡散", "全施策フル稼働", "オフラインPOP UP"],
    gmvTarget: "13.4億",
  },
  {
    q: "Q3",
    period: "7-9月",
    theme: "オフライン展開",
    keyEvent: "9月メガ割+Drug Store",
    intensity: 4,
    tactics: ["Drug Store参入", "TTS強化", "オン×オフ連携"],
    gmvTarget: "21.3億",
  },
  {
    q: "Q4",
    period: "10-12月",
    theme: "年間目標達成",
    keyEvent: "11月メガ割+BF+BestCosme",
    intensity: 4,
    tactics: ["全チャネル連動", "BestCosme獲得", "年間刈り取り"],
    gmvTarget: "31.0億",
  },
];

// ナビゲーション用（シンプル）
export const sections = [
  { id: "strategy", title: "戦略" },
];

// --- グラフ用データ（維持） ---

// 累計売上データ（グラフ用）
export const cumulativeSalesData = [
  { month: "2月", cumulative: 0.2, monthlyInvestment: 0.5 },
  { month: "3月", cumulative: 7.9, monthlyInvestment: 3.5 },
  { month: "4月", cumulative: 8.85, monthlyInvestment: 0.8 },
  { month: "5月", cumulative: 10.25, monthlyInvestment: 0.8 },
  { month: "6月", cumulative: 21.45, monthlyInvestment: 2.0 },
  { month: "7月", cumulative: 23.95, monthlyInvestment: 1.0 },
  { month: "8月", cumulative: 26.45, monthlyInvestment: 1.0 },
  { month: "9月", cumulative: 41.75, monthlyInvestment: 2.0 },
  { month: "10月", cumulative: 45.65, monthlyInvestment: 1.0 },
  { month: "11月", cumulative: 62.35, monthlyInvestment: 2.0 },
  { month: "12月", cumulative: 73.65, monthlyInvestment: 1.2 },
];

// 投資内訳データ（円グラフ用）
export const investmentPieData = [
  { name: "マス施策", value: 5.0, color: "#0ea5e9" },
  { name: "EC施策", value: 5.3, color: "#22c55e" },
  { name: "オフライン", value: 5.5, color: "#f59e0b" },
];

// チャネル別売上データ（棒グラフ用）
export const channelSalesData = [
  { channel: "Qoo10", sales: 28.3, color: "#0ea5e9" },
  { channel: "Drug Store", sales: 19.6, color: "#22c55e" },
  { channel: "Variety", sales: 9.8, color: "#f59e0b" },
  { channel: "TTS", sales: 9.5, color: "#8b5cf6" },
  { channel: "Amazon", sales: 4.9, color: "#ef4444" },
  { channel: "楽天", sales: 1.5, color: "#ec4899" },
];

// 四半期別データ（複合グラフ用）
export const quarterlyChartData = [
  { quarter: "Q1", period: "2-3月", investment: 3.8, sales: 7.9, roas: 208 },
  { quarter: "Q2", period: "4-6月", investment: 3.6, sales: 13.4, roas: 372 },
  { quarter: "Q3", period: "7-9月", investment: 4.0, sales: 21.3, roas: 533 },
  { quarter: "Q4", period: "10-12月", investment: 4.4, sales: 31.0, roas: 705 },
];
