// N organic X Strategy Data

export const strategyMeta = {
  brand: "N organic",
  product: "Soothing Cleansing Gel",
  campaign: "26SS X戦略",
  totalBudget: 50000000, // 5,000万円
  totalBudgetFormatted: "5,000万円",
  period: "2026年2月〜3月",
};

// Who - ターゲット
export const targets = [
  {
    id: 1,
    name: "花粉敏感肌層",
    attribute: "30代女性、花粉症持ち",
    insight: "花粉で肌が荒れる。仕方ないと思っていた",
    motivation: "花粉対策ができる",
    priority: "primary",
  },
  {
    id: 2,
    name: "肌ゆらぎタイパママ層",
    attribute: "30代女性、ライト層",
    insight: "春先に肌がゆらぐ。クレンジング見直したい",
    motivation: "売れていて気になる",
    priority: "secondary",
  },
];

export const attackStrategy = [
  "①で話題化・実績作り → 「花粉対策クレンジング」の第一想起を獲得",
  "①の話題を見た②が「売れてるなら試したい」と購入",
];

// What - メッセージ
export const messaging = {
  mainConcept: "帰ったら洗う、花粉オフ",
  emotionCopy: "肌荒れ、卒業。",
  rtb: ["花粉爆発抑制エビデンス", "ベスコス22冠"],
  trend: "2026年は花粉爆発年（過去10年で2番目に多い）",
  hashtags: ["#STOP花粉飛散", "#帰ったら洗う花粉オフ", "#花粉肌荒れ卒業"],
  // WHATメッセージ（期間別）
  whatMessages: {
    w1: "花粉が最近きてるよね、、肌荒れするよね、、norganicおすすめ",
    w3w4: "今日から花粉飛散がされたよね！、肌荒れするよね、、noganicがおすすめ",
  },
};

export const messageHierarchy = [
  { stage: "話題化", message: "花粉飛散宣言、知ってる？ #STOP花粉飛散" },
  { stage: "興味", message: "花粉で肌が老化するって知ってた？" },
  { stage: "理解", message: "「帰ったら洗う、花粉オフ」で対策できる" },
  { stage: "購買", message: "ベスコス22冠、口コミ多数" },
];

// How - 施策優先順位（新戦略：2/11花粉飛散宣言軸）
export const tactics = [
  {
    id: 1,
    priority: 1,
    name: "トレンドテイクオーバー",
    purpose: "話題化",
    role: "#花粉飛散宣言トレンド1位に便乗、#STOP花粉飛散でジャック",
    budget: 27000000,
    budgetFormatted: "2,700万円",
    imp: 90000000,
    impFormatted: "90M",
    reach: 34200000,
    reachFormatted: "34.2M",
    cpm: 300,
    date: "2/11",
    note: "花粉飛散宣言日に実施、遷移先=#STOP花粉飛散",
  },
  {
    id: 2,
    priority: 2,
    name: "KOLアンプリファイ（W1仕込み）",
    purpose: "認知・仕込み",
    role: "トレンドTKO遷移先に#STOP花粉飛散コンテンツを準備",
    budget: 4000000,
    budgetFormatted: "400万円",
    effectiveBudget: 8000000,
    effectiveBudgetFormatted: "800万円（実質）",
    imp: 20000000,
    impFormatted: "2,000万",
    reach: null,
    reachFormatted: "-",
    cpm: 400,
    date: "2/1〜2/10",
    note: "「花粉最近きてる」系メッセージ",
  },
  {
    id: 3,
    priority: 3,
    name: "プレキャン",
    purpose: "UGC・興味関心",
    role: "#STOP花粉飛散 + 花粉肌悩み投稿でUGC誘発",
    budget: 5000000,
    budgetFormatted: "500万円",
    imp: null,
    impFormatted: "-",
    reach: null,
    reachFormatted: "-",
    cpm: null,
    date: "2/11〜2/29",
    note: "条件：花粉による肌悩みを#STOP花粉飛散つけて投稿",
  },
  {
    id: 4,
    priority: 4,
    name: "アンプリファイ（W3/W4）",
    purpose: "認知拡大",
    role: "「今日から花粉飛散」系メッセージで継続認知",
    budget: 4000000,
    budgetFormatted: "400万円",
    effectiveBudget: 8000000,
    effectiveBudgetFormatted: "800万円（実質）",
    imp: 20000000,
    impFormatted: "2,000万",
    reach: null,
    reachFormatted: "-",
    cpm: 400,
    date: "2/12〜2/29",
    note: "花粉飛散宣言後のメッセージ",
  },
  {
    id: 5,
    priority: 5,
    name: "切り抜き系",
    purpose: "獲得",
    role: "Amazon直結、ROAS重視",
    budget: 10000000,
    budgetFormatted: "1,000万円",
    imp: 25000000,
    impFormatted: "2,500万",
    reach: null,
    reachFormatted: "-",
    cpm: 400,
    date: "3月上旬〜",
    note: "刈り取り・CVR重視",
  },
];

// Phase別戦略（新：2/11花粉飛散宣言軸）
export const phases = [
  {
    id: 1,
    name: "Phase 1：仕込み",
    period: "2/1〜2/10",
    purpose: "トレンドTKO遷移先に#STOP花粉飛散コンテンツを準備",
    strategy: "KOLアンプリファイで#STOP花粉飛散投稿を仕込む",
    target: "①花粉敏感肌層に「花粉×クレンジング」の予兆を植え付ける",
    tactics: ["KOLアンプリファイ（TOP-マイクロKOL）"],
    keywords: ["#STOP花粉飛散"],
    whatMessage: "「花粉が最近きてるよね、、肌荒れするよね、、norganicおすすめ」",
    kpi: ["#STOP花粉飛散投稿数", "KOL投稿数"],
  },
  {
    id: 2,
    name: "Phase 2：話題化",
    period: "2/11",
    purpose: "「#花粉飛散宣言」トレンド1位に便乗、#STOP花粉飛散でジャック",
    strategy: "トレンドテイクオーバーの遷移先を#STOP花粉飛散に設定",
    target: "①花粉敏感肌層に「花粉対策クレンジング」の第一想起を獲得",
    tactics: ["トレンドテイクオーバー（90M Imp）", "プレキャン開始"],
    keywords: ["#花粉飛散宣言", "#STOP花粉飛散"],
    whatMessage: "遷移先=#STOP花粉飛散（既にKOL投稿が存在）",
    kpi: ["Imp 90M達成", "トレンド入り", "#STOP花粉飛散投稿数"],
  },
  {
    id: 3,
    name: "Phase 3：エンゲージメント",
    period: "2/11〜2/21",
    purpose: "UGC・エンゲージメント獲得",
    strategy: "プレキャン + アンプリファイで#STOP花粉飛散を継続訴求",
    target: "①②両方にリーチ拡大、FQ（接触頻度）を5回以上に",
    tactics: ["プレキャン（#STOP花粉飛散条件）", "アンプリファイ"],
    keywords: ["#STOP花粉飛散"],
    whatMessage: "「今日から花粉飛散がされたよね！、肌荒れするよね、、noganicがおすすめ」",
    kpi: ["プレキャン参加数", "Imp累計", "FQ 5以上"],
  },
  {
    id: 4,
    name: "Phase 4：UGC醸成",
    period: "2/22〜2/29",
    purpose: "②肌ゆらぎタイパママ層に「売れてる感」を演出",
    strategy: "プレキャン継続 + アンプリファイで口コミ醸成",
    target: "早期購入者の体験投稿を促進",
    tactics: ["プレキャン継続", "アンプリファイ", "UGC促進"],
    keywords: ["#STOP花粉飛散"],
    whatMessage: "「今日から花粉飛散がされたよね！、肌荒れするよね、、noganicがおすすめ」",
    kpi: ["UGC件数 500件以上", "ポジティブ口コミ率"],
  },
  {
    id: 5,
    name: "Phase 5：刈り取り",
    period: "3/1〜3/9",
    purpose: "Amazon新生活応援キャンペーンで売上最大化",
    strategy: "溜まったUGC×切り抜き系広告で購買を後押し",
    target: "①②両方を刈り取り、売切れを目指す",
    tactics: ["切り抜き系広告開始", "Amazon新生活応援連動（3/3〜）"],
    keywords: [],
    whatMessage: "CVR重視",
    kpi: ["Amazon売上", "CVR", "売切れ達成"],
  },
  {
    id: 6,
    name: "Phase 6：拡大",
    period: "3/10〜",
    purpose: "売切れをニュース化、継続的な話題を維持",
    strategy: "「今年も売り切れ」を拡散、リテールへの展開準備",
    target: "来期のリテール展開につなげる",
    tactics: ["売切れニュース投稿", "メディア掲載"],
    keywords: [],
    whatMessage: "-",
    kpi: ["メディア掲載数", "リテール商談数"],
  },
];

// TKO実績データ（トレンドテイクオーバー版）
export const tkoData = [
  { type: "スポットライト(SP)", cost: 27000000, costFormatted: "2,700万円", imp: 90000000, impFormatted: "90M", cpm: 300, reach: 34200000, reachFormatted: "34.2M", ctr: 0.09, adopted: true },
  { type: "タイムライン(TL)", cost: 17000000, costFormatted: "1,700万円", imp: 38000000, impFormatted: "38M", cpm: 447, reach: 27000000, reachFormatted: "27M", ctr: 0.53, adopted: false },
  { type: "タイムラインリーチ(TLR)", cost: 8400000, costFormatted: "840万円", imp: 22000000, impFormatted: "22M", cpm: 382, reach: 16000000, reachFormatted: "16M", ctr: 0.39, adopted: false },
];

// SP採用理由（トレンドテイクオーバー版）
export const spReasons = [
  "圧倒的リーチ: 90M Imp、Reach 34.2Mで話題化の核",
  "CPM効率: ¥300で3種の中で最も効率的",
  "2/11花粉飛散宣言日: #花粉飛散宣言トレンド1位に便乗",
  "遷移先: #STOP花粉飛散（既にKOL投稿で仕込み済み）",
];

// TL/TLR不採用理由
export const tlRejectReasons = [
  "デモグラ設定不可 → 男性にも当たる",
  "アンプリファイ不可 → 同予算なら運用型の方が効率的",
];

// FQ試算
export const fqCalculation = {
  targetSize: 4000000, // 400万人
  targetSizeFormatted: "約400万人",
  targetDescription: "30代女性×X利用",
  cpm: 400,
  targetableBudget: 23000000, // 2,300万円（TKO除く）
  targetableBudgetFormatted: "2,300万円",
  impBreakdown: [
    { tactic: "トレンドテイクオーバー", budget: "2,700万円", imp: "90M", targetable: false, note: "デモグラ設定不可" },
    { tactic: "切り抜き系", budget: "1,000万円", imp: "2,500万", targetable: true, note: "ターゲティング可" },
    { tactic: "KOLアンプリファイ（W1）", budget: "実質800万円", imp: "2,000万", targetable: true, note: "ターゲティング可" },
    { tactic: "アンプリファイ（W3/W4）", budget: "実質800万円", imp: "2,000万", targetable: true, note: "ターゲティング可" },
  ],
  targetableImp: 65000000, // 6,500万
  targetableImpFormatted: "6,500万",
  fq: 16, // 約16回
  fqTarget: 5,
  result: "FQ5以上は十分達成可能",
};

// KPI（新：#STOP花粉飛散軸）
export const kpis = [
  { metric: "トレンドテイクオーバー", target: "Imp 90M、トレンド入り" },
  { metric: "#STOP花粉飛散投稿数（W1仕込み）", target: "KOL投稿でコンテンツ準備", highlight: true },
  { metric: "#STOP花粉飛散投稿数（2月末）", target: "UGC含む500件以上" },
  { metric: "FQ（ターゲット接触頻度）", target: "5回以上（実績見込：約16回）" },
  { metric: "切り抜き系 ROAS", target: "黒字化" },
  { metric: "プレキャン参加数", target: "1万件以上（#STOP花粉飛散条件）" },
  { metric: "Amazon売上（3/3〜3/9）", target: "X倍（目標数字待ち）" },
];

// タイムラインデータ（新：2/11花粉飛散宣言軸）
export const timeline = [
  { period: "2/1〜2/10", phase: "仕込み", tactics: "KOLアンプリファイ（#STOP花粉飛散投稿）", highlight: false },
  { period: "2/11", phase: "話題化", tactics: "トレンドテイクオーバー（90M Imp）→#STOP花粉飛散へ遷移", highlight: true },
  { period: "2/11〜2/21", phase: "エンゲージメント", tactics: "プレキャン開始、アンプリファイ", highlight: false },
  { period: "2/22〜2/29", phase: "UGC醸成", tactics: "プレキャン継続、アンプリファイ、UGC促進", highlight: false },
  { period: "3/1〜3/9", phase: "刈り取り", tactics: "切り抜き系広告開始、Amazon新生活応援連動", highlight: true },
  { period: "3/10〜", phase: "拡大", tactics: "売切れニュース化、継続運用", highlight: false },
];
