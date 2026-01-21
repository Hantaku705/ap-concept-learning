// Dr.Melaxin Tactics Master Data

import { SnsType, Purpose } from "./matrix-data";

// 施策タイプ
export type TacticType = "Post" | "Boost" | "Other";

export interface TacticMaster {
  id: string;
  name: string;              // 施策名
  shortName: string;         // 略称
  sns: SnsType;              // SNS
  type: TacticType;          // タイプ（Post/Boost/Other）
  purposes: Purpose[];       // 目的（複数可）
  roleDescription: string;   // 役割・狙い
  priority: 1 | 2 | 3 | 4 | 5; // 優先順位（5が最高）
  annualBudget: number;      // 年間予算（万円）
  annualReach: number;       // 年間Reach（万UU）
  annualPosts?: number;      // 年間投稿数（本）
  totalFollowers?: number;   // 合計フォロワー数（万人）
  creatorCount?: number;     // 起用人数（平均計算用）
  kpi?: string;              // KPI
  note?: string;             // 備考
}

// タイプ別の色
export const typeColors: Record<TacticType, string> = {
  Post: "#10b981",   // emerald-500
  Boost: "#f59e0b",  // amber-500
  Other: "#8b5cf6",  // violet-500
};

// SNS colors for display
export const snsColors: Record<SnsType, string> = {
  TikTok: "#00f2ea",
  X: "#1da1f2",
  Instagram: "#e4405f",
  YouTube: "#ff0000",
  TikTokShop: "#ff0050",
  Other: "#888888",
};

// Priority display
export function getPriorityStars(priority: number): string {
  return "★".repeat(priority) + "☆".repeat(5 - priority);
}

export function getPriorityColor(priority: number): string {
  if (priority >= 5) return "#ef4444"; // red-500
  if (priority >= 4) return "#f97316"; // orange-500
  if (priority >= 3) return "#eab308"; // yellow-500
  if (priority >= 2) return "#84cc16"; // lime-500
  return "#6b7280"; // gray-500
}

// All tactics master data (15億円版 - 56.18%縮小)
export const tacticsMasterData: TacticMaster[] = [
  {
    id: "ambassador",
    name: "アンバサダー起用（グク）",
    shortName: "Amb",
    sns: "Other",
    type: "Other",
    purposes: ["ブランディング", "認知", "話題化"],
    roleDescription: "ブランディング確立+切り抜きUGC醸成。大量動画のステマ感を軽減し、ブランド信頼性を担保。",
    priority: 5,
    annualBudget: 16900,
    annualReach: 28100,
    totalFollowers: 5000,
    creatorCount: 1,
    kpi: "6月メガ割に合わせて起用",
    note: "切り抜き・UGC拡散でオーガニックリーチ最大化",
  },
  {
    id: "tiktok-ugc",
    name: "TikTok大量生成",
    shortName: "TT",
    sns: "TikTok",
    type: "Post",
    purposes: ["認知", "話題化"],
    roleDescription: "UGC大量生成でアルゴリズムハック。1本1万円でJipanglobal経由。",
    priority: 5,
    annualBudget: 39300,
    annualReach: 19300,
    annualPosts: 3900,
    totalFollowers: 400,
    creatorCount: 3900,
    kpi: "3,900本・1本¥10,000",
    note: "全期間で最重要施策。メガ割月は600本/月",
  },
  {
    id: "x-rt",
    name: "X RT部隊",
    shortName: "RT",
    sns: "X",
    type: "Post",
    purposes: ["話題化"],
    roleDescription: "トレンド入りでバズ創出。美容カテゴリのXハックが勝ち筋。",
    priority: 5,
    annualBudget: 19700,
    annualReach: 4900,
    annualPosts: 280,
    totalFollowers: 200,
    creatorCount: 20,
    kpi: "imp単価¥1・トレンド入り",
    note: "顔面工事ちゃん系の業者。垢バレリスクあり",
  },
  {
    id: "tts-gmvmax",
    name: "TTS GMV MAX",
    shortName: "TTS",
    sns: "TikTokShop",
    type: "Boost",
    purposes: ["購入"],
    roleDescription: "TikTok Shop経由の直接売上。GMV MAX自動最適化で定常配信。",
    priority: 4,
    annualBudget: 24200,
    annualReach: 4800,
    kpi: "ROAS 200%",
    note: "通常期5-15万/日、メガ割期間30-50万/日",
  },
  {
    id: "kol-ig",
    name: "KOL Pick（IG）",
    shortName: "KOL-IG",
    sns: "Instagram",
    type: "Post",
    purposes: ["比較検討", "ブランディング"],
    roleDescription: "Aクラス2人のLive配信でメガ割刈り取り。契約済み。",
    priority: 4,
    annualBudget: 14000,
    annualReach: 2200,
    annualPosts: 4,
    totalFollowers: 40,
    creatorCount: 2,
    kpi: "Aクラス2人・GMV刈り取り",
    note: "メガ割月のみ配信。IG/YT両方",
  },
  {
    id: "kol-yt",
    name: "KOL Pick（YT）",
    shortName: "KOL-YT",
    sns: "YouTube",
    type: "Post",
    purposes: ["比較検討", "ブランディング"],
    roleDescription: "メガ系KOL（25万登録）でYouTube経由の大規模リーチ。",
    priority: 3,
    annualBudget: 5600,
    annualReach: 7900,
    annualPosts: 2,
    totalFollowers: 25,
    creatorCount: 1,
    kpi: "メガ系KOL・登録者25万",
    note: "検証系ミドルではなく大型に集中",
  },
  {
    id: "ad-tiktok",
    name: "広告配信（運用型TT）",
    shortName: "広告TT",
    sns: "TikTok",
    type: "Boost",
    purposes: ["認知"],
    roleDescription: "TikTok広告でリーチ補完。GMV MAX連動。",
    priority: 3,
    annualBudget: 7900,
    annualReach: 8800,
    kpi: "CPM¥300",
    note: "TikTok UGCと連動",
  },
  {
    id: "ad-ig",
    name: "広告配信（運用型IG）",
    shortName: "広告IG",
    sns: "Instagram",
    type: "Boost",
    purposes: ["認知"],
    roleDescription: "Meta広告でリーチ補完。KOL Pickと連動。",
    priority: 2,
    annualBudget: 5300,
    annualReach: 5900,
    kpi: "CPM¥300",
    note: "IG KOLのリーチ補完",
  },
  {
    id: "ad-x-acq",
    name: "広告配信（獲得型X）",
    shortName: "獲得X",
    sns: "X",
    type: "Boost",
    purposes: ["購入"],
    roleDescription: "X広告でCPA最適化。RT部隊との相乗効果狙い。",
    priority: 3,
    annualBudget: 11500,
    annualReach: 12800,
    kpi: "CPA¥3,000",
    note: "RT部隊でトレンド作り→広告で刈り取り",
  },
  {
    id: "ad-ig-acq",
    name: "広告配信（獲得型IG）",
    shortName: "獲得IG",
    sns: "Instagram",
    type: "Boost",
    purposes: ["購入"],
    roleDescription: "リターゲティングで刈り取り。KOL Pick視聴者向け。",
    priority: 2,
    annualBudget: 2800,
    annualReach: 0,
    kpi: "リタゲ",
    note: "KOL Pick後のリタゲ",
  },
  {
    id: "cosme-lips",
    name: "@cosme/LIPS",
    shortName: "@cos",
    sns: "Other",
    type: "Other",
    purposes: ["比較検討"],
    roleDescription: "レビュー施策でSEO・信頼性向上。BestCosme狙い。",
    priority: 2,
    annualBudget: 2800,
    annualReach: 0,
    kpi: "レビュー施策",
    note: "Q4でBestCosme獲得を狙う",
  },
];

// Helper functions
export function getTacticById(id: string): TacticMaster | undefined {
  return tacticsMasterData.find((t) => t.id === id);
}

export function getTacticsByPurpose(purpose: Purpose): TacticMaster[] {
  return tacticsMasterData.filter((t) => t.purposes.includes(purpose));
}

export function getTacticsBySns(sns: SnsType): TacticMaster[] {
  return tacticsMasterData.filter((t) => t.sns === sns);
}

export function getTacticsByPriority(minPriority: number): TacticMaster[] {
  return tacticsMasterData.filter((t) => t.priority >= minPriority);
}

// Summary data
export const tacticsSummary = {
  totalTactics: tacticsMasterData.length,
  totalBudget: tacticsMasterData.reduce((sum, t) => sum + t.annualBudget, 0),
  totalReach: tacticsMasterData.reduce((sum, t) => sum + t.annualReach, 0),
  totalPosts: tacticsMasterData.reduce((sum, t) => sum + (t.annualPosts || 0), 0),
  totalFollowers: tacticsMasterData.reduce((sum, t) => sum + (t.totalFollowers || 0), 0),
  byPriority: {
    high: tacticsMasterData.filter((t) => t.priority >= 4).length,
    medium: tacticsMasterData.filter((t) => t.priority === 3).length,
    low: tacticsMasterData.filter((t) => t.priority <= 2).length,
  },
};
