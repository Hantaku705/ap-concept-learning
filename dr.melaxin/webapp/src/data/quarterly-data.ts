// Dr.Melaxin Q1-Q4 Quarterly Media Plan Data ($10M Version)

export type QuarterId = "q1" | "q2" | "q3" | "q4";

export interface QuarterSummary {
  id: QuarterId;
  name: string;
  period: string;
  investment: string;
  investmentValue: number; // 億円
  extraBudget?: string;
  targetGmv: string;
  targetGmvValue: number; // 億円
  targetRoas: string;
  mainEvent: string;
  tiktokVideos: number;
  totalReach: string;
  totalReachValue: number; // 億UU
  keyMessage: string;
}

export interface MediaBreakdown {
  media: string;
  budget: string;
  budgetValue: number; // 億円
  reach: string;
  reachValue: number; // 万UU
  imp?: string;
  note: string;
}

export interface MonthPlan {
  month: string;
  budget: string;
  budgetValue: number;
  reach: string;
  reachValue: number;
  tactics: {
    name: string;
    budget: string;
    target: string;
    reach: string;
  }[];
}

export interface WeeklyTimeline {
  phase: string;
  period: string;
  budget: string;
  reach: string;
  events: {
    date: string;
    event: string;
    budget: string;
    reach: string;
  }[];
}

export interface QuarterKpi {
  final: { metric: string; target: string }[];
  milestones: { date: string; gmv: string; ranking: string; reach: string }[];
}

export interface QuarterData {
  summary: QuarterSummary;
  mediaBreakdown: MediaBreakdown[];
  monthlyPlans: MonthPlan[];
  weeklyTimeline: WeeklyTimeline[];
  kpi: QuarterKpi;
  keyDecisions: { item: string; decision: string; note: string }[];
  risks: { risk: string; probability: string; countermeasure: string }[];
}

// ============================================
// Q1 Data (2-3月)
// ============================================
export const q1Data: QuarterData = {
  summary: {
    id: "q1",
    name: "Q1",
    period: "2025年2月15日〜3月31日",
    investment: "3.8億円",
    investmentValue: 3.8,
    targetGmv: "5-7億円",
    targetGmvValue: 6,
    targetRoas: "130-180%",
    mainEvent: "3月Qoo10メガ割",
    tiktokVideos: 1300,
    totalReach: "約1.2億UU",
    totalReachValue: 1.2,
    keyMessage:
      "Ambassador無し、TikTok大量生成 + RT部隊でXハック + Qoo10メガ割KOL Pick",
  },
  mediaBreakdown: [
    {
      media: "TikTok（GMV MAX）",
      budget: "1.00億",
      budgetValue: 1.0,
      reach: "7,000万",
      reachValue: 7000,
      imp: "1億回再生",
      note: "1,300本×平均7.7万再生、UU率70%",
    },
    {
      media: "X RT部隊",
      budget: "0.70億",
      budgetValue: 0.7,
      reach: "1,750万",
      reachValue: 1750,
      imp: "7,000万",
      note: "imp単価¥1、freq4",
    },
    {
      media: "X 運用型広告",
      budget: "0.20億",
      budgetValue: 0.2,
      reach: "2,200万",
      reachValue: 2200,
      imp: "6,700万",
      note: "CPM¥300、freq3",
    },
    {
      media: "IG KOL Pick",
      budget: "0.40億",
      budgetValue: 0.4,
      reach: "80万",
      reachValue: 80,
      imp: "120万",
      note: "Aクラス2人×6配信、視聴率10%",
    },
    {
      media: "YT メガ系KOL",
      budget: "0.15億",
      budgetValue: 0.15,
      reach: "30万",
      reachValue: 30,
      imp: "30万",
      note: "3配信×25万登録×40%",
    },
    {
      media: "TTS GMV MAX",
      budget: "0.40億",
      budgetValue: 0.4,
      reach: "800万",
      reachValue: 800,
      imp: "4,000万",
      note: "ROAS200%、freq5",
    },
    {
      media: "その他",
      budget: "0.95億",
      budgetValue: 0.95,
      reach: "-",
      reachValue: 0,
      note: "KOLシーディング、@cosme等",
    },
  ],
  monthlyPlans: [
    {
      month: "2月",
      budget: "0.8億円",
      budgetValue: 0.8,
      reach: "2,500万",
      reachValue: 2500,
      tactics: [
        {
          name: "TikTok投稿（300本）+ GMV MAX",
          budget: "0.30億",
          target: "再生2,500万回",
          reach: "1,750万",
        },
        {
          name: "RT部隊稼働開始（週10投稿）",
          budget: "0.20億",
          target: "フォロワー獲得、バズ2-3回",
          reach: "500万",
        },
        {
          name: "KOLシーディング（100名）",
          budget: "0.15億",
          target: "UGC 100件",
          reach: "300万",
        },
        {
          name: "TTS GMV MAX開始",
          budget: "0.10億",
          target: "運用体制構築",
          reach: "200万",
        },
      ],
    },
    {
      month: "3月",
      budget: "3.0億円",
      budgetValue: 3.0,
      reach: "9,500万",
      reachValue: 9500,
      tactics: [
        {
          name: "TikTok投稿（1,000本）+ GMV MAX",
          budget: "0.70億",
          target: "再生7,500万回",
          reach: "5,250万",
        },
        {
          name: "RT部隊全力（毎日15-20投稿）",
          budget: "0.50億",
          target: "トレンド入り5回以上",
          reach: "1,250万",
        },
        {
          name: "IG KOL Pick（Aクラス2人）",
          budget: "0.40億",
          target: "GMV 2億円",
          reach: "80万",
        },
        {
          name: "YTメガ系KOL（3配信）",
          budget: "0.15億",
          target: "GMV 5,000万円",
          reach: "30万",
        },
        {
          name: "X 運用型広告",
          budget: "0.20億",
          target: "リーチ2,200万",
          reach: "2,200万",
        },
        {
          name: "TTS GMV MAX強化",
          budget: "0.30億",
          target: "GMV MAX最大化",
          reach: "600万",
        },
      ],
    },
  ],
  weeklyTimeline: [
    {
      phase: "Phase 1: 準備期",
      period: "2/15〜2/28",
      budget: "0.8億",
      reach: "2,100万",
      events: [
        {
          date: "2/15-21",
          event: "TikTok投稿開始、RT部隊稼働開始",
          budget: "0.4億",
          reach: "1,000万",
        },
        {
          date: "2/22-28",
          event: "TikTok加速、RT部隊強化",
          budget: "0.4億",
          reach: "1,100万",
        },
      ],
    },
    {
      phase: "Phase 2: メガ割直前〜開始",
      period: "3/1〜3/10",
      budget: "1.2億",
      reach: "5,100万",
      events: [
        {
          date: "3/1-5",
          event: "TikTok大量投稿、KOL Pick 1回目",
          budget: "0.6億",
          reach: "2,500万",
        },
        {
          date: "3/6-10",
          event: "メガ割開始、KOL Pick 2回目",
          budget: "0.6億",
          reach: "2,600万",
        },
      ],
    },
    {
      phase: "Phase 3: メガ割中盤〜終盤",
      period: "3/11〜3/20",
      budget: "1.0億",
      reach: "4,000万",
      events: [
        {
          date: "3/11-15",
          event: "追加投稿、RT部隊追い上げ",
          budget: "0.5億",
          reach: "2,000万",
        },
        {
          date: "3/16-20",
          event: "最終追い込み、ラストスパート",
          budget: "0.5億",
          reach: "2,000万",
        },
      ],
    },
  ],
  kpi: {
    final: [
      { metric: "Qoo10ランキング", target: "最終日Top10" },
      { metric: "メガ割GMV", target: "5-7億円" },
      { metric: "X トレンド入り", target: "5回以上" },
      { metric: "TikTok総再生", target: "1億回以上" },
      { metric: "総Reach", target: "約1.2億UU" },
      { metric: "ROAS", target: "130-180%" },
    ],
    milestones: [
      { date: "3/6（初日）", gmv: "5,000万円", ranking: "Top30", reach: "4,000万" },
      { date: "3/10（5日目）", gmv: "2億円", ranking: "Top15", reach: "6,000万" },
      { date: "3/15（10日目）", gmv: "4億円", ranking: "Top10", reach: "9,000万" },
      { date: "3/20（最終日）", gmv: "5-7億円", ranking: "Top10", reach: "1.2億" },
    ],
  },
  keyDecisions: [
    { item: "Ambassador", decision: "起用しない", note: "準備間に合わず、6月ジョングクに集中" },
    { item: "TikTok", decision: "1,300本（全本GMV MAX配信）", note: "大量生成で認知を取る" },
    { item: "RT部隊", decision: "全力稼働", note: "美容カテゴリのXハックが勝ち筋" },
    { item: "KOL Pick", decision: "Aクラス2人", note: "契約済み、刈り取り特化" },
    { item: "X広告", decision: "運用型広告のみ", note: "TopView不使用、CPM¥300で効率重視" },
  ],
  risks: [
    { risk: "RT部隊垢バレ", probability: "中", countermeasure: "ペルソナ分散、即削除対応" },
    { risk: "TikTok本数不足", probability: "低", countermeasure: "Jipanglobal追加発注可能" },
    { risk: "KOL Pick不調", probability: "低", countermeasure: "Bクラス追加投入" },
    { risk: "競合激化", probability: "高", countermeasure: "RT部隊強化、価格調整" },
    { risk: "在庫切れ", probability: "中", countermeasure: "事前在庫確保、追加発注体制" },
  ],
};

// ============================================
// Q2 Data (4-6月)
// ============================================
export const q2Data: QuarterData = {
  summary: {
    id: "q2",
    name: "Q2",
    period: "2025年4月1日〜6月30日",
    investment: "3.6億円",
    investmentValue: 3.6,
    extraBudget: "ジョングク別枠 2.5-3.3億円",
    targetGmv: "10億円",
    targetGmvValue: 10,
    targetRoas: "280%",
    mainEvent: "6月Qoo10メガ割 + ジョングク発表",
    tiktokVideos: 1600,
    totalReach: "約2.2億UU（別枠込み）",
    totalReachValue: 2.2,
    keyMessage: "ジョングク × オフラインイベントで爆発的認知",
  },
  mediaBreakdown: [
    {
      media: "TikTok（GMV MAX）",
      budget: "1.20億",
      budgetValue: 1.2,
      reach: "9,100万",
      reachValue: 9100,
      imp: "1.3億回再生",
      note: "1,600本×平均8万再生、UU率70%",
    },
    {
      media: "X RT部隊",
      budget: "0.80億",
      budgetValue: 0.8,
      reach: "2,000万",
      reachValue: 2000,
      imp: "8,000万",
      note: "imp単価¥1、freq4",
    },
    {
      media: "X 運用型広告",
      budget: "0.20億",
      budgetValue: 0.2,
      reach: "2,200万",
      reachValue: 2200,
      imp: "6,700万",
      note: "CPM¥300、freq3",
    },
    {
      media: "IG KOL Pick",
      budget: "0.50億",
      budgetValue: 0.5,
      reach: "100万",
      reachValue: 100,
      imp: "150万",
      note: "Aクラス2人×8配信、視聴率10%",
    },
    {
      media: "YT メガ系KOL",
      budget: "0.25億",
      budgetValue: 0.25,
      reach: "50万",
      reachValue: 50,
      imp: "50万",
      note: "4-5配信×25万登録×40%",
    },
    {
      media: "TTS GMV MAX",
      budget: "0.50億",
      budgetValue: 0.5,
      reach: "1,000万",
      reachValue: 1000,
      imp: "5,000万",
      note: "CPM¥1,000、freq5",
    },
    {
      media: "その他",
      budget: "0.15億",
      budgetValue: 0.15,
      reach: "-",
      reachValue: 0,
      note: "リーク施策等",
    },
  ],
  monthlyPlans: [
    {
      month: "4月",
      budget: "0.8億円",
      budgetValue: 0.8,
      reach: "3,000万",
      reachValue: 3000,
      tactics: [
        {
          name: "TikTok投稿（300本）+ GMV MAX",
          budget: "0.30億",
          target: "再生2,500万回",
          reach: "1,750万",
        },
        {
          name: "RT部隊継続（週5投稿）",
          budget: "0.20億",
          target: "認知維持",
          reach: "500万",
        },
        {
          name: "TTS GMV MAX継続",
          budget: "0.15億",
          target: "定常運用",
          reach: "300万",
        },
        {
          name: "IG UGC醸成",
          budget: "0.10億",
          target: "UGC 200件",
          reach: "200万",
        },
      ],
    },
    {
      month: "5月",
      budget: "0.8億円",
      budgetValue: 0.8,
      reach: "3,500万",
      reachValue: 3500,
      tactics: [
        {
          name: "TikTok投稿（300本）+ GMV MAX",
          budget: "0.30億",
          target: "累計再生5,000万回",
          reach: "1,750万",
        },
        {
          name: "RT部隊継続（週10投稿）",
          budget: "0.20億",
          target: "バズ3回",
          reach: "500万",
        },
        {
          name: "6月リーク施策",
          budget: "0.10億",
          target: "期待感醸成",
          reach: "500万",
        },
        {
          name: "ジョングク撮影",
          budget: "(別枠)",
          target: "素材完成",
          reach: "-",
        },
      ],
    },
    {
      month: "6月",
      budget: "2.0億円",
      budgetValue: 2.0,
      reach: "1.5億",
      reachValue: 15000,
      tactics: [
        {
          name: "TikTok投稿（1,000本）+ GMV MAX",
          budget: "0.60億",
          target: "ジョングク連動",
          reach: "6,300万",
        },
        {
          name: "RT部隊全力（毎日20投稿）",
          budget: "0.40億",
          target: "トレンド入り5回",
          reach: "1,000万",
        },
        {
          name: "IG KOL Pick（Aクラス2人）",
          budget: "0.40億",
          target: "GMV 2億円",
          reach: "80万",
        },
        {
          name: "YTメガ系KOL（4-5配信）",
          budget: "0.20億",
          target: "GMV 5,000万円",
          reach: "50万",
        },
        {
          name: "X 運用型広告",
          budget: "0.20億",
          target: "リーチ2,200万",
          reach: "2,200万",
        },
      ],
    },
  ],
  weeklyTimeline: [
    {
      phase: "Phase 1: ジョングク発表〜イベント",
      period: "6/1〜6/5",
      budget: "別枠+0.4億",
      reach: "7,500万",
      events: [
        {
          date: "6/1",
          event: "ジョングク発表日（プレスリリース、公式SNS）",
          budget: "別枠",
          reach: "5,000万",
        },
        {
          date: "6/1-5",
          event: "ポップアップ前半、TikTok大量投稿",
          budget: "0.4億",
          reach: "2,500万",
        },
      ],
    },
    {
      phase: "Phase 2: メガ割",
      period: "6/6〜6/15",
      budget: "1.0億",
      reach: "5,500万",
      events: [
        {
          date: "6/6-10",
          event: "メガ割開始、KOL Pick、YT配信",
          budget: "0.6億",
          reach: "3,000万",
        },
        {
          date: "6/11-15",
          event: "メガ割終盤、最終ブースト",
          budget: "0.4億",
          reach: "2,500万",
        },
      ],
    },
  ],
  kpi: {
    final: [
      { metric: "Qoo10ランキング", target: "Top5" },
      { metric: "メガ割GMV", target: "10億円" },
      { metric: "X トレンド入り", target: "5回以上" },
      { metric: "オフライン来場", target: "10,000人" },
      { metric: "SNS投稿数", target: "5,000件" },
      { metric: "総Reach（別枠込み）", target: "約2.2億UU" },
      { metric: "ROAS（$10M枠）", target: "280%" },
    ],
    milestones: [
      { date: "6/6（初日）", gmv: "1億円", ranking: "Top20", reach: "8,000万" },
      { date: "6/10（5日目）", gmv: "4億円", ranking: "Top10", reach: "1.2億" },
      { date: "6/15（最終日）", gmv: "10億円", ranking: "Top5", reach: "1.4億" },
    ],
  },
  keyDecisions: [
    { item: "ジョングク", decision: "起用決定", note: "別予算確保（$10M枠外）" },
    { item: "別枠予算", decision: "2.5-3.3億円", note: "ギャラ+撮影+イベント+PR" },
    { item: "オフライン", decision: "ポップアップストア", note: "渋谷/原宿エリア" },
    { item: "Plan B", decision: "他K-POP", note: "SEVENTEEN, Stray Kids等" },
    { item: "X広告", decision: "運用型広告のみ", note: "CPM¥300で効率重視" },
  ],
  risks: [
    { risk: "ジョングク契約不可", probability: "中", countermeasure: "Plan B（他K-POP）発動" },
    { risk: "スキャンダル", probability: "低", countermeasure: "契約条項で対応、素材撮り溜め" },
    { risk: "来場者不足", probability: "低", countermeasure: "SNS告知強化、KOL来店" },
    { risk: "混雑対策", probability: "高", countermeasure: "整理券制、時間指定" },
    { risk: "RT部隊炎上", probability: "中", countermeasure: "即削除対応、ペルソナ分散" },
  ],
};

// ============================================
// Q3 Data (7-9月)
// ============================================
export const q3Data: QuarterData = {
  summary: {
    id: "q3",
    name: "Q3",
    period: "2025年7月1日〜9月30日",
    investment: "4.0億円",
    investmentValue: 4.0,
    targetGmv: "8億円",
    targetGmvValue: 8,
    targetRoas: "200%",
    mainEvent: "9月Qoo10メガ割 + Drug Store本格参入",
    tiktokVideos: 2000,
    totalReach: "約1.5億UU",
    totalReachValue: 1.5,
    keyMessage: "Qoo10メガ割最適化 × Drug Store参入 × TTS GMV MAX継続",
  },
  mediaBreakdown: [
    {
      media: "TikTok（GMV MAX）",
      budget: "1.20億",
      budgetValue: 1.2,
      reach: "9,800万",
      reachValue: 9800,
      imp: "1.4億回再生",
      note: "2,000本×平均7万再生、UU率70%",
    },
    {
      media: "X RT部隊",
      budget: "0.65億",
      budgetValue: 0.65,
      reach: "1,625万",
      reachValue: 1625,
      imp: "6,500万",
      note: "imp単価¥1、freq4",
    },
    {
      media: "X 運用型広告",
      budget: "0.15億",
      budgetValue: 0.15,
      reach: "1,700万",
      reachValue: 1700,
      imp: "5,000万",
      note: "CPM¥300、freq3",
    },
    {
      media: "IG KOL Pick",
      budget: "0.35億",
      budgetValue: 0.35,
      reach: "80万",
      reachValue: 80,
      imp: "120万",
      note: "Aクラス2人×5配信、視聴率10%",
    },
    {
      media: "YT メガ系KOL",
      budget: "0.20億",
      budgetValue: 0.2,
      reach: "40万",
      reachValue: 40,
      imp: "40万",
      note: "3-4配信×25万登録×40%",
    },
    {
      media: "TTS GMV MAX",
      budget: "0.75億",
      budgetValue: 0.75,
      reach: "1,500万",
      reachValue: 1500,
      imp: "7,500万",
      note: "CPM¥1,000、freq5",
    },
    {
      media: "Drug Store施策",
      budget: "0.50億",
      budgetValue: 0.5,
      reach: "500万",
      reachValue: 500,
      note: "店頭・OOH経由",
    },
    {
      media: "その他",
      budget: "0.20億",
      budgetValue: 0.2,
      reach: "-",
      reachValue: 0,
      note: "@cosme、Amazon/楽天等",
    },
  ],
  monthlyPlans: [
    {
      month: "7月",
      budget: "1.0億円",
      budgetValue: 1.0,
      reach: "4,000万",
      reachValue: 4000,
      tactics: [
        {
          name: "TikTok投稿（500本）+ GMV MAX",
          budget: "0.35億",
          target: "再生4,000万回",
          reach: "2,800万",
        },
        {
          name: "RT部隊継続（週10投稿）",
          budget: "0.15億",
          target: "認知維持",
          reach: "375万",
        },
        {
          name: "TTS GMV MAX強化",
          budget: "0.25億",
          target: "TTS売上1億円/月",
          reach: "500万",
        },
        {
          name: "IG UGC醸成",
          budget: "0.10億",
          target: "UGC 300件",
          reach: "200万",
        },
      ],
    },
    {
      month: "8月",
      budget: "1.0億円",
      budgetValue: 1.0,
      reach: "4,000万",
      reachValue: 4000,
      tactics: [
        {
          name: "TikTok投稿（500本）+ GMV MAX",
          budget: "0.35億",
          target: "累計再生8,000万回",
          reach: "2,800万",
        },
        {
          name: "RT部隊継続（週10投稿）",
          budget: "0.15億",
          target: "バズ3回",
          reach: "375万",
        },
        {
          name: "TTS GMV MAX強化",
          budget: "0.25億",
          target: "TTS売上1.5億円/月",
          reach: "500万",
        },
        {
          name: "Drug Store最終準備",
          budget: "0.10億",
          target: "9月参入確定",
          reach: "-",
        },
      ],
    },
    {
      month: "9月",
      budget: "2.0億円",
      budgetValue: 2.0,
      reach: "1.0億",
      reachValue: 10000,
      tactics: [
        {
          name: "TikTok投稿（1,000本）+ GMV MAX",
          budget: "0.50億",
          target: "再生7,000万回",
          reach: "4,900万",
        },
        {
          name: "RT部隊全力（毎日15-20投稿）",
          budget: "0.35億",
          target: "トレンド入り5回",
          reach: "875万",
        },
        {
          name: "IG KOL Pick（Aクラス2人）",
          budget: "0.35億",
          target: "GMV 1.5億円",
          reach: "80万",
        },
        {
          name: "Drug Store店頭施策",
          budget: "0.15億",
          target: "店頭プロモ",
          reach: "300万",
        },
      ],
    },
  ],
  weeklyTimeline: [
    {
      phase: "Phase 1: 準備期",
      period: "8/15〜8/31",
      budget: "0.7億",
      reach: "3,100万",
      events: [
        {
          date: "8/15-21",
          event: "TikTok加速、Drug Store告知開始",
          budget: "0.35億",
          reach: "1,500万",
        },
        {
          date: "8/22-31",
          event: "メガ割カウントダウン",
          budget: "0.35億",
          reach: "1,600万",
        },
      ],
    },
    {
      phase: "Phase 2: メガ割直前〜開始",
      period: "9/1〜9/10",
      budget: "1.0億",
      reach: "6,500万",
      events: [
        {
          date: "9/1-5",
          event: "Drug Store参入発表、TikTok大量投稿",
          budget: "0.5億",
          reach: "3,500万",
        },
        {
          date: "9/6-10",
          event: "メガ割本番、KOL Pick",
          budget: "0.5億",
          reach: "3,000万",
        },
      ],
    },
    {
      phase: "Phase 3: メガ割中盤〜終盤",
      period: "9/11〜9/20",
      budget: "0.75億",
      reach: "4,300万",
      events: [
        {
          date: "9/11-15",
          event: "追加投稿、RT部隊追い上げ",
          budget: "0.4億",
          reach: "2,300万",
        },
        {
          date: "9/16-20",
          event: "最終追い込み",
          budget: "0.35億",
          reach: "2,000万",
        },
      ],
    },
  ],
  kpi: {
    final: [
      { metric: "Qoo10ランキング", target: "Top5" },
      { metric: "9月メガ割GMV", target: "8億円" },
      { metric: "X トレンド入り", target: "5回以上" },
      { metric: "TikTok総再生", target: "1.4億回以上" },
      { metric: "総Reach", target: "約1.5億UU" },
      { metric: "TTS Q3売上", target: "4億円" },
      { metric: "Drug Store初月売上", target: "1億円" },
    ],
    milestones: [
      { date: "9/1（初日）", gmv: "5,000万円", ranking: "Top30", reach: "8,000万" },
      { date: "9/6（5日目）", gmv: "2.5億円", ranking: "Top15", reach: "1.0億" },
      { date: "9/12（10日目）", gmv: "5億円", ranking: "Top10", reach: "1.3億" },
      { date: "9/20（最終日）", gmv: "8億円", ranking: "Top5", reach: "1.5億" },
    ],
  },
  keyDecisions: [
    { item: "Drug Store", decision: "本格参入", note: "マツモトキヨシ等" },
    { item: "TTS強化", decision: "7-8月で基盤固め", note: "GMV MAX継続" },
    { item: "ジョングク効果", decision: "継続活用", note: "6月素材を再利用" },
    { item: "オフライン連携", decision: "EC×店頭連動", note: "相互送客" },
    { item: "X広告", decision: "運用型広告のみ", note: "CPM¥300で効率重視" },
  ],
  risks: [
    { risk: "Drug Store参入遅延", probability: "中", countermeasure: "Q4への延期も想定" },
    { risk: "店頭売上不振", probability: "中", countermeasure: "EC誘導強化、サンプリング追加" },
    { risk: "RT部隊炎上", probability: "中", countermeasure: "即削除対応、ペルソナ分散" },
    { risk: "競合激化", probability: "高", countermeasure: "ジョングク効果継続、価格調整" },
    { risk: "在庫切れ", probability: "中", countermeasure: "EC/店頭の在庫調整" },
  ],
};

// ============================================
// Q4 Data (10-12月)
// ============================================
export const q4Data: QuarterData = {
  summary: {
    id: "q4",
    name: "Q4",
    period: "2025年10月1日〜12月31日",
    investment: "4.4億円",
    investmentValue: 4.4,
    targetGmv: "10億円（11月メガ割）+ Q4累計15億円",
    targetGmvValue: 15,
    targetRoas: "227%",
    mainEvent: "11月メガ割 + Black Friday + BestCosme",
    tiktokVideos: 2100,
    totalReach: "約1.7億UU",
    totalReachValue: 1.7,
    keyMessage: "11月メガ割×BF年間最大化 + BestCosme獲得 + 年末ギフト需要",
  },
  mediaBreakdown: [
    {
      media: "TikTok（GMV MAX）",
      budget: "1.15億",
      budgetValue: 1.15,
      reach: "1.03億",
      reachValue: 10300,
      imp: "1.47億回再生",
      note: "2,100本×平均7万再生、UU率70%",
    },
    {
      media: "X RT部隊",
      budget: "0.75億",
      budgetValue: 0.75,
      reach: "1,875万",
      reachValue: 1875,
      imp: "7,500万",
      note: "imp単価¥1、freq4",
    },
    {
      media: "X 運用型広告",
      budget: "0.20億",
      budgetValue: 0.2,
      reach: "2,200万",
      reachValue: 2200,
      imp: "6,700万",
      note: "CPM¥300、freq3",
    },
    {
      media: "IG KOL Pick",
      budget: "0.55億",
      budgetValue: 0.55,
      reach: "120万",
      reachValue: 120,
      imp: "180万",
      note: "Aクラス2人×8配信、視聴率10%",
    },
    {
      media: "YT メガ系KOL",
      budget: "0.25億",
      budgetValue: 0.25,
      reach: "50万",
      reachValue: 50,
      imp: "50万",
      note: "4-5配信×25万登録×40%",
    },
    {
      media: "TTS GMV MAX",
      budget: "0.70億",
      budgetValue: 0.7,
      reach: "1,400万",
      reachValue: 1400,
      imp: "7,000万",
      note: "CPM¥1,000、freq5",
    },
    {
      media: "@cosme/BestCosme",
      budget: "0.45億",
      budgetValue: 0.45,
      reach: "300万",
      reachValue: 300,
      imp: "500万",
      note: "ランキング・レビュー経由",
    },
    {
      media: "その他",
      budget: "0.35億",
      budgetValue: 0.35,
      reach: "-",
      reachValue: 0,
      note: "Amazon/楽天、予備等",
    },
  ],
  monthlyPlans: [
    {
      month: "10月",
      budget: "1.0億円",
      budgetValue: 1.0,
      reach: "3,500万",
      reachValue: 3500,
      tactics: [
        {
          name: "TikTok投稿（500本）+ GMV MAX",
          budget: "0.35億",
          target: "再生3,500万回",
          reach: "2,450万",
        },
        {
          name: "RT部隊継続（週10投稿）",
          budget: "0.15億",
          target: "バズ3回",
          reach: "375万",
        },
        {
          name: "TTS GMV MAX継続",
          budget: "0.20億",
          target: "TTS売上1.5億円",
          reach: "400万",
        },
        {
          name: "@cosmeレビュー促進",
          budget: "0.15億",
          target: "レビュー300件",
          reach: "100万",
        },
      ],
    },
    {
      month: "11月",
      budget: "2.0億円",
      budgetValue: 2.0,
      reach: "1.0億",
      reachValue: 10000,
      tactics: [
        {
          name: "TikTok投稿（1,000本）+ GMV MAX",
          budget: "0.50億",
          target: "再生7,000万回",
          reach: "4,900万",
        },
        {
          name: "RT部隊全力（毎日20投稿）",
          budget: "0.40億",
          target: "トレンド入り5回以上",
          reach: "1,000万",
        },
        {
          name: "IG KOL Pick（Aクラス2人）",
          budget: "0.35億",
          target: "GMV 2億円",
          reach: "80万",
        },
        {
          name: "YTメガ系KOL（4-5配信）",
          budget: "0.25億",
          target: "GMV 6,000万円",
          reach: "50万",
        },
        {
          name: "TTS GMV MAX全力",
          budget: "0.30億",
          target: "TTS売上2.5億円",
          reach: "600万",
        },
      ],
    },
    {
      month: "12月",
      budget: "1.4億円",
      budgetValue: 1.4,
      reach: "4,500万",
      reachValue: 4500,
      tactics: [
        {
          name: "TikTok投稿（600本）+ GMV MAX",
          budget: "0.30億",
          target: "ギフト訴求",
          reach: "2,100万",
        },
        {
          name: "RT部隊継続（週15投稿）",
          budget: "0.20億",
          target: "年末バズ",
          reach: "500万",
        },
        {
          name: "@cosme BestCosme施策",
          budget: "0.25億",
          target: "受賞獲得",
          reach: "200万",
        },
        {
          name: "TTS GMV MAX継続",
          budget: "0.20億",
          target: "TTS売上1.5億円",
          reach: "400万",
        },
      ],
    },
  ],
  weeklyTimeline: [
    {
      phase: "Phase 1: 準備期",
      period: "10/15〜10/31",
      budget: "0.5億",
      reach: "2,500万",
      events: [
        {
          date: "10/15-21",
          event: "TikTok加速、@cosmeレビュー強化",
          budget: "0.25億",
          reach: "1,200万",
        },
        {
          date: "10/22-31",
          event: "メガ割カウントダウン、BF準備",
          budget: "0.25億",
          reach: "1,300万",
        },
      ],
    },
    {
      phase: "Phase 2: メガ割",
      period: "11/1〜11/12",
      budget: "1.0億",
      reach: "6,700万",
      events: [
        {
          date: "11/1-5",
          event: "メガ割開始、KOL Pick全力",
          budget: "0.5億",
          reach: "3,500万",
        },
        {
          date: "11/6-12",
          event: "メガ割後半、最終ブースト",
          budget: "0.5億",
          reach: "3,200万",
        },
      ],
    },
    {
      phase: "Phase 3: Black Friday連動",
      period: "11/21〜12/1",
      budget: "0.5億",
      reach: "3,700万",
      events: [
        {
          date: "11/21-27",
          event: "BF本番、全チャネル連動",
          budget: "0.35億",
          reach: "2,500万",
        },
        {
          date: "11/28-12/1",
          event: "BF終盤、サイバーマンデー",
          budget: "0.15億",
          reach: "1,200万",
        },
      ],
    },
  ],
  kpi: {
    final: [
      { metric: "Qoo10ランキング", target: "Top3" },
      { metric: "11月メガ割GMV", target: "10億円" },
      { metric: "X トレンド入り", target: "7回以上" },
      { metric: "TikTok総再生", target: "1.5億回以上" },
      { metric: "総Reach", target: "約1.7億UU" },
      { metric: "TTS Q4売上", target: "5億円" },
      { metric: "BestCosme", target: "受賞" },
      { metric: "Q4合計GMV", target: "15億円" },
    ],
    milestones: [
      { date: "11/1（初日）", gmv: "1億円", ranking: "Top20", reach: "5,000万" },
      { date: "11/6（5日目）", gmv: "4億円", ranking: "Top10", reach: "8,000万" },
      { date: "11/12（最終日）", gmv: "10億円", ranking: "Top3", reach: "1.2億" },
      { date: "11/27（BF終了）", gmv: "+2億円", ranking: "-", reach: "1.4億" },
      { date: "12/31（年末）", gmv: "+3億円", ranking: "-", reach: "1.7億" },
    ],
  },
  keyDecisions: [
    { item: "11月メガ割", decision: "年間最大規模", note: "年4回目、BF連動で最大化" },
    { item: "Black Friday", decision: "全チャネル連動", note: "Amazon/楽天/TTS同時" },
    { item: "BestCosme", decision: "受賞狙い", note: "@cosme重点施策" },
    { item: "年末ギフト", decision: "ギフトセット展開", note: "Serum+Mask+Toner" },
    { item: "X広告", decision: "運用型広告のみ", note: "CPM¥300で効率重視" },
  ],
  risks: [
    { risk: "メガ割競合激化", probability: "高", countermeasure: "最大規模投資で差別化" },
    { risk: "BF売上不振", probability: "中", countermeasure: "メガ割成功をBFに継続" },
    { risk: "BestCosme落選", probability: "中", countermeasure: "他アワード狙いに切替" },
    { risk: "RT部隊炎上", probability: "中", countermeasure: "即削除対応、ペルソナ分散" },
    { risk: "在庫切れ", probability: "高", countermeasure: "年間最大在庫確保" },
  ],
};

// ============================================
// Aggregated Data
// ============================================
export const allQuartersData: Record<QuarterId, QuarterData> = {
  q1: q1Data,
  q2: q2Data,
  q3: q3Data,
  q4: q4Data,
};

export const quarterSummaries: QuarterSummary[] = [
  q1Data.summary,
  q2Data.summary,
  q3Data.summary,
  q4Data.summary,
];

// Chart-ready data for quarterly comparison
export const quarterlyComparisonData = [
  {
    quarter: "Q1",
    investment: 3.8,
    gmv: 6,
    reach: 1.2,
    tiktokVideos: 1300,
    roas: 158,
  },
  {
    quarter: "Q2",
    investment: 3.6,
    gmv: 10,
    reach: 2.2,
    tiktokVideos: 1600,
    roas: 280,
  },
  {
    quarter: "Q3",
    investment: 4.0,
    gmv: 8,
    reach: 1.5,
    tiktokVideos: 2000,
    roas: 200,
  },
  {
    quarter: "Q4",
    investment: 4.4,
    gmv: 15,
    reach: 1.7,
    tiktokVideos: 2100,
    roas: 227,
  },
];

// Monthly investment data for charts
export const monthlyInvestmentData = [
  { month: "2月", investment: 0.8, quarter: "Q1", isMegaSale: false },
  { month: "3月", investment: 3.0, quarter: "Q1", isMegaSale: true },
  { month: "4月", investment: 0.8, quarter: "Q2", isMegaSale: false },
  { month: "5月", investment: 0.8, quarter: "Q2", isMegaSale: false },
  { month: "6月", investment: 2.0, quarter: "Q2", isMegaSale: true },
  { month: "7月", investment: 1.0, quarter: "Q3", isMegaSale: false },
  { month: "8月", investment: 1.0, quarter: "Q3", isMegaSale: false },
  { month: "9月", investment: 2.0, quarter: "Q3", isMegaSale: true },
  { month: "10月", investment: 1.0, quarter: "Q4", isMegaSale: false },
  { month: "11月", investment: 2.0, quarter: "Q4", isMegaSale: true },
  { month: "12月", investment: 1.4, quarter: "Q4", isMegaSale: false },
];

// Annual TikTok video count
export const tiktokVideosByQuarter = [
  { quarter: "Q1", videos: 1300 },
  { quarter: "Q2", videos: 1600 },
  { quarter: "Q3", videos: 2000 },
  { quarter: "Q4", videos: 2100 },
];

// Total annual values
export const annualTotals = {
  investment: 15.8, // 億円
  gmv: 73.6, // 億円
  reach: 6.6, // 億UU (延べ)
  tiktokVideos: 7000,
  roas: 466, // %
};
