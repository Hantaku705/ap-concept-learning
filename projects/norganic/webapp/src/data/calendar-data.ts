// N organic Activation Calendar Data（2/11花粉飛散宣言軸）

export interface KpiTarget {
  metric: string;
  target: string;
  unit?: string;
}

export interface CalendarWeek {
  id: string;
  period: string;
  phase: string;
  obj: string;
  who: string;
  what: string;
  how: string;
  tactics: string[];
  keywords?: string[];
  kpi: string[];
  budget: number;
  budgetFormatted: string;
  highlight: boolean;
  // Reach/Imp/Eng データ
  imp: number;
  impFormatted: string;
  reach: number;
  reachFormatted: string;
  engagement: number;
  engFormatted: string;
  ctr?: number;
  kpiTargets: KpiTarget[];
}

export const calendarWeeks: CalendarWeek[] = [
  {
    id: "w1",
    period: "2/1-2/10",
    phase: "仕込み",
    obj: "トレンドTKO遷移先に#STOP花粉飛散コンテンツを準備",
    who: "①花粉敏感肌層（30代女性、花粉症持ち）",
    what: "「花粉が最近きてるよね、、肌荒れするよね、、norganicおすすめ」",
    how: "KOLアンプリファイ（TOP-マイクロKOL）で#STOP花粉飛散投稿を仕込む",
    tactics: ["KOLアンプリファイ（400万円）"],
    keywords: ["#STOP花粉飛散"],
    kpi: ["#STOP花粉飛散投稿数", "KOL投稿数"],
    budget: 4000000,
    budgetFormatted: "400万円",
    highlight: false,
    imp: 20000000,
    impFormatted: "20M",
    reach: 7500000,
    reachFormatted: "7.5M",
    engagement: 60000,
    engFormatted: "60K",
    ctr: 0.3,
    kpiTargets: [
      { metric: "Imp", target: "20M" },
      { metric: "#STOP花粉飛散投稿", target: "KOL投稿で準備" },
      { metric: "KOL投稿数", target: "10件", unit: "以上" },
    ],
  },
  {
    id: "w2",
    period: "2/11-2/14",
    phase: "話題化",
    obj: "「#花粉飛散宣言」トレンド1位に便乗、#STOP花粉飛散でジャック",
    who: "①花粉敏感肌層（30代女性、花粉症持ち）",
    what: "トレンドテイクオーバー → #STOP花粉飛散へ遷移",
    how: "2/11花粉飛散宣言日にトレンドTKO実施、遷移先=#STOP花粉飛散（既にKOL投稿が存在）",
    tactics: ["トレンドテイクオーバー（2,700万円）", "プレキャン開始（125万円）"],
    keywords: ["#花粉飛散宣言", "#STOP花粉飛散"],
    kpi: ["Imp 90M達成", "トレンド入り", "#STOP花粉飛散投稿数"],
    budget: 28250000,
    budgetFormatted: "2,825万円",
    highlight: true,
    imp: 90000000,
    impFormatted: "90M",
    reach: 34200000,
    reachFormatted: "34.2M",
    engagement: 81000,
    engFormatted: "81K",
    ctr: 0.09,
    kpiTargets: [
      { metric: "Imp", target: "90M" },
      { metric: "Reach", target: "34.2M" },
      { metric: "トレンド入り", target: "達成" },
      { metric: "プレキャン開始", target: "参加受付開始" },
    ],
  },
  {
    id: "w3",
    period: "2/15-2/21",
    phase: "エンゲージメント",
    obj: "UGC・エンゲージメント獲得、FQ5以上に引き上げ",
    who: "①②両方にリーチ拡大",
    what: "「今日から花粉飛散がされたよね！、肌荒れするよね、、noganicがおすすめ」",
    how: "プレキャン + アンプリファイで#STOP花粉飛散を継続訴求",
    tactics: ["プレキャン（125万円）", "アンプリファイ（200万円）"],
    keywords: ["#STOP花粉飛散"],
    kpi: ["プレキャン参加数", "Imp累計", "FQ 5以上"],
    budget: 3250000,
    budgetFormatted: "325万円",
    highlight: false,
    imp: 10000000,
    impFormatted: "10M",
    reach: 3800000,
    reachFormatted: "3.8M",
    engagement: 30000,
    engFormatted: "30K",
    ctr: 0.3,
    kpiTargets: [
      { metric: "Imp", target: "10M" },
      { metric: "プレキャン参加", target: "5,000件" },
      { metric: "累計Imp", target: "120M" },
    ],
  },
  {
    id: "w4",
    period: "2/22-2/28",
    phase: "UGC醸成",
    obj: "②肌ゆらぎタイパママ層に「売れてる感」を演出",
    who: "②肌ゆらぎタイパママ層（購入検討層）",
    what: "「今日から花粉飛散がされたよね！、肌荒れするよね、、noganicがおすすめ」",
    how: "プレキャン継続 + アンプリファイで口コミ醸成、UGC促進",
    tactics: ["プレキャン（125万円）", "アンプリファイ（200万円）"],
    keywords: ["#STOP花粉飛散"],
    kpi: ["UGC件数 500件以上", "ポジティブ口コミ率", "プレキャン参加1万件達成"],
    budget: 3250000,
    budgetFormatted: "325万円",
    highlight: false,
    imp: 10000000,
    impFormatted: "10M",
    reach: 3800000,
    reachFormatted: "3.8M",
    engagement: 30000,
    engFormatted: "30K",
    ctr: 0.3,
    kpiTargets: [
      { metric: "Imp", target: "10M" },
      { metric: "UGC件数", target: "500件", unit: "以上" },
      { metric: "プレキャン参加", target: "1万件", unit: "累計" },
    ],
  },
  {
    id: "w5",
    period: "3/1-3/7",
    phase: "刈り取り",
    obj: "Amazon新生活応援キャンペーンで売上最大化",
    who: "①②両方を刈り取り",
    what: "切り抜き系広告（UGC活用）、CVR重視",
    how: "溜まったUGC×切り抜き系広告で購買後押し",
    tactics: ["切り抜き系広告（500万円）", "Amazon新生活応援連動（3/3〜）"],
    kpi: ["Amazon売上", "CVR"],
    budget: 5000000,
    budgetFormatted: "500万円",
    highlight: true,
    imp: 12500000,
    impFormatted: "12.5M",
    reach: 4750000,
    reachFormatted: "4.75M",
    engagement: 50000,
    engFormatted: "50K",
    ctr: 0.4,
    kpiTargets: [
      { metric: "Imp", target: "12.5M" },
      { metric: "CTR", target: "0.4%", unit: "以上" },
      { metric: "CVR", target: "上昇" },
      { metric: "Amazon売上", target: "最大化" },
    ],
  },
  {
    id: "w6",
    period: "3/8-3/14",
    phase: "刈り取り強化",
    obj: "売切れを達成、ニュース化準備",
    who: "①②両方",
    what: "切り抜き系広告継続、完売実績投稿",
    how: "売切れ→ニュース化の流れを作る",
    tactics: ["切り抜き系広告（500万円）", "完売実績投稿", "売切れニュース準備"],
    kpi: ["売切れ達成", "メディア掲載準備"],
    budget: 5000000,
    budgetFormatted: "500万円",
    highlight: false,
    imp: 12500000,
    impFormatted: "12.5M",
    reach: 4750000,
    reachFormatted: "4.75M",
    engagement: 50000,
    engFormatted: "50K",
    ctr: 0.4,
    kpiTargets: [
      { metric: "Imp", target: "12.5M" },
      { metric: "売切れ", target: "達成" },
      { metric: "メディア", target: "掲載準備" },
    ],
  },
  {
    id: "w7",
    period: "3/15〜",
    phase: "拡大",
    obj: "継続的な話題維持、リテール展開準備",
    who: "新規層（リテール顧客）",
    what: "売切れニュース投稿、雑誌付録など",
    how: "「今年も売り切れ」を拡散",
    tactics: ["売切れニュース投稿（オーガニック）", "メディア掲載", "リテール展開商談"],
    kpi: ["メディア掲載数", "リテール商談数"],
    budget: 0,
    budgetFormatted: "-",
    highlight: false,
    imp: 0,
    impFormatted: "-",
    reach: 0,
    reachFormatted: "-",
    engagement: 0,
    engFormatted: "-",
    kpiTargets: [
      { metric: "メディア掲載", target: "3件", unit: "以上" },
      { metric: "リテール商談", target: "開始" },
      { metric: "累計Imp", target: "155M" },
    ],
  },
];

// 行ラベル（Obj/Who/What/How）
export const rowLabels = [
  { id: "obj", label: "Obj", description: "目的" },
  { id: "who", label: "Who", description: "誰に" },
  { id: "what", label: "What", description: "何を" },
  { id: "how", label: "How", description: "どのように" },
];

// 施策別タイムライン（新：2/11花粉飛散宣言軸）
export const tacticTimeline = [
  { tactic: "KOLアンプリファイ（W1仕込み）", weeks: ["w1"], peakWeek: "w1" },
  { tactic: "トレンドテイクオーバー", weeks: ["w2"], peakWeek: "w2" },
  { tactic: "プレキャン", weeks: ["w2", "w3", "w4"], peakWeek: "w2" },
  { tactic: "アンプリファイ（W3/W4）", weeks: ["w3", "w4"], peakWeek: "w3" },
  { tactic: "切り抜き系広告", weeks: ["w5", "w6"], peakWeek: "w5" },
  { tactic: "売切れニュース", weeks: ["w6", "w7"], peakWeek: "w7" },
];

// 施策×週別予算データ（新：2/11花粉飛散宣言軸）
export interface TacticWeeklyBudget {
  tactic: string;
  tacticId: string;
  purpose: string;
  purposeColor: string;
  weeks: {
    weekId: string;
    budget: number;
    budgetFormatted: string;
    imp: number;
    impFormatted: string;
    isPeak: boolean;
  }[];
  totalBudget: number;
  totalBudgetFormatted: string;
  totalImp: number;
  totalImpFormatted: string;
}

export const tacticWeeklyBudgets: TacticWeeklyBudget[] = [
  {
    tactic: "KOLアンプリファイ（W1仕込み）",
    tacticId: "kol-w1",
    purpose: "仕込み",
    purposeColor: "sky",
    weeks: [
      { weekId: "w1", budget: 4000000, budgetFormatted: "400万", imp: 20000000, impFormatted: "20M", isPeak: true },
    ],
    totalBudget: 4000000,
    totalBudgetFormatted: "400万円",
    totalImp: 20000000,
    totalImpFormatted: "20M",
  },
  {
    tactic: "トレンドテイクオーバー",
    tacticId: "trend-tko",
    purpose: "話題化",
    purposeColor: "pink",
    weeks: [
      { weekId: "w2", budget: 27000000, budgetFormatted: "2,700万", imp: 90000000, impFormatted: "90M", isPeak: true },
    ],
    totalBudget: 27000000,
    totalBudgetFormatted: "2,700万円",
    totalImp: 90000000,
    totalImpFormatted: "90M",
  },
  {
    tactic: "プレキャン",
    tacticId: "precan",
    purpose: "UGC・興味関心",
    purposeColor: "emerald",
    weeks: [
      { weekId: "w2", budget: 1250000, budgetFormatted: "125万", imp: 0, impFormatted: "-", isPeak: true },
      { weekId: "w3", budget: 1250000, budgetFormatted: "125万", imp: 0, impFormatted: "-", isPeak: false },
      { weekId: "w4", budget: 1250000, budgetFormatted: "125万", imp: 0, impFormatted: "-", isPeak: false },
    ],
    totalBudget: 5000000,
    totalBudgetFormatted: "500万円",
    totalImp: 0,
    totalImpFormatted: "-",
  },
  {
    tactic: "アンプリファイ（W3/W4）",
    tacticId: "amplify-w3w4",
    purpose: "認知拡大",
    purposeColor: "sky",
    weeks: [
      { weekId: "w3", budget: 2000000, budgetFormatted: "200万", imp: 10000000, impFormatted: "10M", isPeak: true },
      { weekId: "w4", budget: 2000000, budgetFormatted: "200万", imp: 10000000, impFormatted: "10M", isPeak: false },
    ],
    totalBudget: 4000000,
    totalBudgetFormatted: "400万円",
    totalImp: 20000000,
    totalImpFormatted: "20M",
  },
  {
    tactic: "切り抜き系広告",
    tacticId: "kirinuki",
    purpose: "獲得",
    purposeColor: "amber",
    weeks: [
      { weekId: "w5", budget: 5000000, budgetFormatted: "500万", imp: 12500000, impFormatted: "12.5M", isPeak: true },
      { weekId: "w6", budget: 5000000, budgetFormatted: "500万", imp: 12500000, impFormatted: "12.5M", isPeak: false },
    ],
    totalBudget: 10000000,
    totalBudgetFormatted: "1,000万円",
    totalImp: 25000000,
    totalImpFormatted: "25M",
  },
];

// サマリーデータ（新：2/11花粉飛散宣言軸）
export const calendarSummary = {
  totalBudget: 50000000,
  totalBudgetFormatted: "5,000万円",
  totalWeeks: 7,
  period: "2026年2月1日〜3月末",
  concept: "帰ったら洗う、花粉オフ",
  highlightWeeks: ["w2", "w5"], // W2=トレンドTKO、W5=刈り取り開始
  // 合計値（施策積み上げベース）
  totalImp: 155000000,
  totalImpFormatted: "155M",
  totalReach: 58800000,
  totalReachFormatted: "58.8M",
  totalEngagement: 301000,
  totalEngFormatted: "301K",
  // 新戦略のポイント
  strategyHighlights: [
    "W1: KOLで#STOP花粉飛散を仕込む（「花粉最近きてる」系）",
    "W2: 2/11花粉飛散宣言日にトレンドTKO → #STOP花粉飛散へ遷移",
    "W3/W4: アンプリファイ継続（「今日から花粉飛散」系）+ プレキャン",
    "W5〜: 切り抜き系広告で刈り取り",
  ],
};
