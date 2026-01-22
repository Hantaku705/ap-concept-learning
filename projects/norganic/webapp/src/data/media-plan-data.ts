// N organic Media Plan Data

export interface MediaPlanTactic {
  id: string;
  name: string;
  shortName: string;
  budget: number;
  budgetFormatted: string;
  imp: number;
  impFormatted: string;
  reach: number;
  reachFormatted: string;
  cpm?: number;
  ctr?: number;
  period: string;
  purpose: string;
  purposeColor: string;
  details: string[];
  weeklyBudget: { week: string; budget: number; budgetFormatted: string }[];
}

export interface MonthlyAllocation {
  period: string;
  label: string;
  tactics: {
    tacticId: string;
    budget: number;
    budgetFormatted: string;
    imp: number;
    impFormatted: string;
  }[];
  totalBudget: number;
  totalBudgetFormatted: string;
  totalImp: number;
  totalImpFormatted: string;
}

// 施策マスターデータ
export const mediaPlanTactics: MediaPlanTactic[] = [
  {
    id: "sp-tko",
    name: "スポットライトテイクオーバー",
    shortName: "SP TKO",
    budget: 27000000,
    budgetFormatted: "2,700万円",
    imp: 90000000,
    impFormatted: "90M",
    reach: 34200000,
    reachFormatted: "34.2M",
    cpm: 300,
    ctr: 0.09,
    period: "2/1（1日限定）",
    purpose: "話題化",
    purposeColor: "pink",
    details: [
      "花粉シーズン開幕の「一番槍」でトレンド入り",
      "CPM ¥300で3種の中で最も効率的",
      "ハッシュタグ: #花粉爆発 #するんと花粉オフ",
    ],
    weeklyBudget: [
      { week: "W1", budget: 27000000, budgetFormatted: "2,700万" },
    ],
  },
  {
    id: "kirinuki",
    name: "切り抜き系広告",
    shortName: "切り抜き系",
    budget: 10000000,
    budgetFormatted: "1,000万円",
    imp: 25000000,
    impFormatted: "25M",
    reach: 9500000,
    reachFormatted: "9.5M",
    cpm: 400,
    ctr: 0.4,
    period: "2/1〜3/14（6週間）",
    purpose: "獲得",
    purposeColor: "amber",
    details: [
      "ツイートをスクショ → 引用RT風で広告配信 → Amazon誘導",
      "参考：ジルオーラム事例（Imp億超え、ROAS合う）",
      "3ヶ月自動運用",
      "「するんと花粉オフ」を軸にしたUGC風広告",
    ],
    weeklyBudget: [
      { week: "W1", budget: 1500000, budgetFormatted: "150万" },
      { week: "W2", budget: 1500000, budgetFormatted: "150万" },
      { week: "W3", budget: 1500000, budgetFormatted: "150万" },
      { week: "W4", budget: 1500000, budgetFormatted: "150万" },
      { week: "W5", budget: 2000000, budgetFormatted: "200万" },
      { week: "W6", budget: 2000000, budgetFormatted: "200万" },
    ],
  },
  {
    id: "amplify",
    name: "運用 with アンプリファイ",
    shortName: "運用+アンプリ",
    budget: 8000000,
    budgetFormatted: "800万円（実質1,600万円）",
    imp: 40000000,
    impFormatted: "40M",
    reach: 15200000,
    reachFormatted: "15.2M",
    cpm: 200,
    ctr: 0.3,
    period: "2/1〜2/28（4週間）",
    purpose: "認知",
    purposeColor: "sky",
    details: [
      "KOL費用 400万円 + 広告費用 400万円 = 合計800万円",
      "X社がKOL費用分（400万円）を無料で追加配信",
      "実質1,600万円分の広告効果",
      "美容系インフルエンサー、花粉時流バズ経験者をキャスティング",
    ],
    weeklyBudget: [
      { week: "W1", budget: 2000000, budgetFormatted: "200万" },
      { week: "W2", budget: 2000000, budgetFormatted: "200万" },
      { week: "W3", budget: 2000000, budgetFormatted: "200万" },
      { week: "W4", budget: 2000000, budgetFormatted: "200万" },
    ],
  },
  {
    id: "precan",
    name: "プレゼントキャンペーン",
    shortName: "プレキャン",
    budget: 5000000,
    budgetFormatted: "500万円",
    imp: 0,
    impFormatted: "-",
    reach: 0,
    reachFormatted: "-",
    period: "2/15〜2/28（2週間）",
    purpose: "興味関心",
    purposeColor: "emerald",
    details: [
      "フォロー&RT形式",
      "インセンティブ: 商品プレゼント、Amazonギフトカード",
      "目標: プレキャン参加数 1万件以上",
    ],
    weeklyBudget: [
      { week: "W3", budget: 2500000, budgetFormatted: "250万" },
      { week: "W4", budget: 2500000, budgetFormatted: "250万" },
    ],
  },
];

// 月別配分データ
export const monthlyAllocations: MonthlyAllocation[] = [
  {
    period: "feb-1",
    label: "2月前半",
    tactics: [
      { tacticId: "sp-tko", budget: 27000000, budgetFormatted: "2,700万", imp: 90000000, impFormatted: "90M" },
      { tacticId: "kirinuki", budget: 3000000, budgetFormatted: "300万", imp: 7500000, impFormatted: "7.5M" },
      { tacticId: "amplify", budget: 4000000, budgetFormatted: "400万", imp: 20000000, impFormatted: "20M" },
      { tacticId: "precan", budget: 0, budgetFormatted: "-", imp: 0, impFormatted: "-" },
    ],
    totalBudget: 34000000,
    totalBudgetFormatted: "3,400万",
    totalImp: 117500000,
    totalImpFormatted: "117.5M",
  },
  {
    period: "feb-2",
    label: "2月後半",
    tactics: [
      { tacticId: "sp-tko", budget: 0, budgetFormatted: "-", imp: 0, impFormatted: "-" },
      { tacticId: "kirinuki", budget: 3000000, budgetFormatted: "300万", imp: 7500000, impFormatted: "7.5M" },
      { tacticId: "amplify", budget: 4000000, budgetFormatted: "400万", imp: 20000000, impFormatted: "20M" },
      { tacticId: "precan", budget: 5000000, budgetFormatted: "500万", imp: 0, impFormatted: "-" },
    ],
    totalBudget: 12000000,
    totalBudgetFormatted: "1,200万",
    totalImp: 27500000,
    totalImpFormatted: "27.5M",
  },
  {
    period: "mar",
    label: "3月",
    tactics: [
      { tacticId: "sp-tko", budget: 0, budgetFormatted: "-", imp: 0, impFormatted: "-" },
      { tacticId: "kirinuki", budget: 4000000, budgetFormatted: "400万", imp: 10000000, impFormatted: "10M" },
      { tacticId: "amplify", budget: 0, budgetFormatted: "-", imp: 0, impFormatted: "-" },
      { tacticId: "precan", budget: 0, budgetFormatted: "-", imp: 0, impFormatted: "-" },
    ],
    totalBudget: 4000000,
    totalBudgetFormatted: "400万",
    totalImp: 10000000,
    totalImpFormatted: "10M",
  },
];

// サマリーデータ
export const mediaPlanSummary = {
  totalBudget: 50000000,
  totalBudgetFormatted: "5,000万円",
  totalImp: 155000000,
  totalImpFormatted: "155M",
  totalReach: 51000000,
  totalReachFormatted: "51M",
  period: "2026年2月1日〜3月末",
  fqTarget: "5回以上",
  fqExpected: "約16回",
};

// KPIデータ
export const mediaPlanKpis = [
  { metric: "総Imp", target: "143M", status: "target" },
  { metric: "総Reach", target: "51M", status: "target" },
  { metric: "FQ（接触頻度）", target: "5回以上", status: "target" },
  { metric: "SP TKO Imp", target: "90M", status: "target" },
  { metric: "トレンド入り", target: "達成", status: "target" },
  { metric: "切り抜き系 ROAS", target: "黒字化", status: "target" },
  { metric: "プレキャン参加数", target: "1万件以上", status: "target" },
  { metric: "UGC件数（2月末）", target: "500件以上", status: "target" },
];
