// Dr.Melaxin マーケティング提案書データ

// メタデータ
export const proposalMeta = {
  title: "Dr.Melaxin マーケティング提案書",
  subtitle: "日本市場 GMV 120億円達成計画",
  client: "BRAND501 Corp.",
  brand: "Dr.Melaxin",
  proposer: "AnyMind Group Inc.",
  date: "2025.12.23",
  classification: "CONFIDENTIAL",
  target: "日本市場でGMV 120億円をASAPで達成",
};

// セクション定義
export const sections = [
  { id: "overview", title: "概要" },
  { id: "strategy", title: "戦略方針" },
  { id: "financial", title: "財務計画" },
  { id: "investment", title: "投資内訳" },
  { id: "channels", title: "チャネル戦略" },
  { id: "gtm", title: "GTMロードマップ" },
  { id: "competitors", title: "競合分析" },
  { id: "promotion", title: "プロモーション戦略" },
  { id: "kol", title: "KOL・TikTok Shop" },
];

// 概要データ
export const overviewData = {
  basicInfo: [
    { label: "クライアント", value: "BRAND501 Corp." },
    { label: "ブランド", value: "Dr.Melaxin" },
    { label: "提案者", value: "AnyMind Group Inc." },
    { label: "提案日", value: "2025.12.23" },
    { label: "目標", value: "日本市場でGMV 120億円をASAPで達成" },
  ],
  highlights: [
    { label: "年間売上目標", value: "120億円", color: "sky" },
    { label: "マーケティング投資", value: "38億円", color: "amber" },
    { label: "ROAS", value: "316%", color: "emerald" },
    { label: "主力チャネル", value: "Qoo10 (54.9%)", color: "violet" },
  ],
};

// 戦略方針データ
export const strategyData = {
  comparison: [
    {
      plan: "Plan A",
      name: "J-curve",
      period: "3年",
      approach: "Qoo10中心で徐々に拡大",
      investment: "PO金額の60%まで",
      recommended: false,
    },
    {
      plan: "Plan B",
      name: "Vertical Launch",
      period: "ASAP",
      approach: "初期から積極投資で美容液市場を攻める",
      investment: "初期投資を多くできる",
      recommended: true,
    },
  ],
  recommendation:
    "初期投資を多くできることで、初期フェーズからマーケットのメインカテゴリである美容液を攻めて市場を開拓する",
};

// 財務計画データ
export const financialData = {
  summary: {
    grossSales: 120,
    marketingSpent: 38,
    roas: 316,
  },
  phases: [
    { phase: "1-3ヶ月目", name: "立ち上げフェーズ" },
    { phase: "4-6ヶ月目", name: "成長フェーズ（Qoo10メガ割活用）" },
    { phase: "7-9ヶ月目", name: "拡大フェーズ（Amazon、楽天本格展開）" },
    { phase: "10-12ヶ月目", name: "最大化フェーズ（オフライン展開）" },
  ],
  cumulativeSales: [
    { month: "1月", cumulative: 0.12, progress: 0.1 },
    { month: "2月", cumulative: 0.36, progress: 0.3 },
    { month: "3月", cumulative: 6.7, progress: 5.6 },
    { month: "4月", cumulative: 10.5, progress: 8.8 },
    { month: "5月", cumulative: 16.2, progress: 13.5 },
    { month: "6月", cumulative: 29.5, progress: 24.6 },
    { month: "7月", cumulative: 40.2, progress: 33.5 },
    { month: "8月", cumulative: 52.1, progress: 43.4 },
    { month: "9月", cumulative: 69.7, progress: 58.1 },
    { month: "10月", cumulative: 85.3, progress: 71.1 },
    { month: "11月", cumulative: 102.5, progress: 85.4 },
    { month: "12月", cumulative: 120, progress: 100 },
  ],
};

// 投資内訳データ
export const investmentData = {
  categories: [
    { name: "Outbound Mass", amount: 19.23, percentage: 50.6, color: "#0ea5e9" },
    { name: "Offline", amount: 12.43, percentage: 32.7, color: "#f59e0b" },
    { name: "EC", amount: 6.35, percentage: 16.7, color: "#22c55e" },
  ],
  outboundMass: [
    { channel: "Ambassador", annual: 10, q1: 10, q2: 0, q3: 0, q4: 0 },
    { channel: "TV CM", annual: 1.5, q1: 1.5, q2: 0, q3: 0, q4: 0 },
    { channel: "OOH/DOOH", annual: 0.3, q1: 0.3, q2: 0, q3: 0, q4: 0 },
    { channel: "Top KOL", annual: 3, q1: 0.7, q2: 0.65, q3: 0.65, q4: 1 },
    { channel: "YouTube", annual: 1.1, q1: 0.2, q2: 0.3, q3: 0.3, q4: 0.3 },
    { channel: "Meta", annual: 2.05, q1: 0.35, q2: 0.6, q3: 0.5, q4: 0.6 },
    { channel: "X", annual: 0.25, q1: 0.07, q2: 0.06, q3: 0.06, q4: 0.06 },
    { channel: "TikTok", annual: 0.28, q1: 0.1, q2: 0.06, q3: 0.06, q4: 0.06 },
    { channel: "TikTok UGC", annual: 0.75, q1: 0.21, q2: 0.18, q3: 0.18, q4: 0.18 },
  ],
  ec: [
    { channel: "Qoo10", investment: 1.98, sales: 65.9, roas: 3333 },
    { channel: "Amazon", investment: 0.88, sales: 8.7, roas: 987 },
    { channel: "Rakuten", investment: 0.23, sales: 2.3, roas: 1000 },
    { channel: "TikTok Shop", investment: 3.26, sales: 8.1, roas: 250 },
  ],
  offline: [
    { channel: "Variety Store (ドンキ等)", investment: 10.45, sales: 25.7, roas: 246 },
    { channel: "Drug Store", investment: 1.98, sales: 9.2, roas: 1304 },
  ],
};

// チャネル戦略データ
export const channelData = {
  priorities: [
    {
      priority: 1,
      channel: "Qoo10",
      title: "Qoo10での売上最大化",
      points: [
        "120億達成にはQoo10でのTop LINE獲得が不可欠",
        "メガ割のタイミングでは単品SKUではなくセット販売",
        "KOLを活用し、売上を最大化",
      ],
    },
    {
      priority: 2,
      channel: "TikTok Shop",
      title: "TikTok Shop専用戦術",
      points: [
        "AnuaやメディキューブはまだTikTok Shopの勝ち方がわかっていない",
        "TikTok Shopに適したSKUの選定",
        "投稿量を最大化させるKOLネットワークの構築",
      ],
    },
    {
      priority: 3,
      channel: "EC Mall",
      title: "EC Mall（Amazon・楽天）の最適化",
      points: [
        "SEOや広告の出面をしっかり抑える",
        "検索時に刈り取れる体制や商品バンドル",
        "併せ買いの割引設定",
      ],
    },
    {
      priority: 4,
      channel: "Offline",
      title: "Offlineの勝ち筋",
      points: [
        "商品の認知度と見つけやすさ（棚位置）が重要",
        "配荷タイミングでのPower Marketing",
        "POP UPや販促棚周りの取得",
        "年間でROASを+に合わせる",
      ],
    },
  ],
  salesByChannel: [
    { channel: "Qoo10", sales: 65.9, percentage: 54.9, color: "#0ea5e9" },
    { channel: "Variety", sales: 25.7, percentage: 21.5, color: "#f59e0b" },
    { channel: "Drug Store", sales: 9.2, percentage: 7.7, color: "#22c55e" },
    { channel: "Amazon", sales: 8.7, percentage: 7.3, color: "#ef4444" },
    { channel: "TikTok Shop", sales: 8.1, percentage: 6.8, color: "#8b5cf6" },
    { channel: "Rakuten", sales: 2.3, percentage: 1.9, color: "#ec4899" },
  ],
};

// GTMロードマップデータ
export const gtmData = {
  quarterly: [
    { quarter: "Q1", period: "1-3月", investment: 14.3, sales: 6.95, roas: 48.6 },
    { quarter: "Q2", period: "4-6月", investment: 4.64, sales: 22.6, roas: 485.9 },
    { quarter: "Q3", period: "7-9月", investment: 8.63, sales: 40.2, roas: 465.8 },
    { quarter: "Q4", period: "10-12月", investment: 10.44, sales: 50.3, roas: 481.9 },
  ],
  events: [
    { month: "1月", event: "New Year Sales" },
    { month: "3月", event: "Qoo10メガ割、DRUG/GMS/CVS棚替え" },
    { month: "6月", event: "Qoo10メガ割、PD" },
    { month: "9月", event: "Qoo10メガ割" },
    { month: "11-12月", event: "Qoo10メガ割、Black Friday、Best Cosme" },
  ],
  productRoadmap: [
    { period: "1-6ヶ月目", mainSku: "Serum（美容液）", subSku: "Mask & Toner", exclusive: "Eye Phalt (TTS)" },
    { period: "7-12ヶ月目", mainSku: "Serum継続", subSku: "Other SKUs", exclusive: "-" },
  ],
  promotionPhases: [
    { phase: "1-2ヶ月目", content: "Ambassador、TV CM、Top KOL → BCAD" },
    { phase: "3-4ヶ月目", content: "AD truck & DOOH、KOL Tie UP → X&TikTok UGC" },
    { phase: "5-6ヶ月目", content: "Qoo10 KOL Collab、PD" },
    { phase: "7-9ヶ月目", content: "New SKUの販売開始、権威性のあるKOLを継続起用、UGC拡散" },
    { phase: "10-12ヶ月目", content: "美顔器の販売開始、KOL体験会、相性のいい美容液の開発" },
  ],
  offlinePhases: [
    { phase: "3ヶ月目", content: "POP UP Shelving" },
    { phase: "4ヶ月目", content: "Donki in store、Loft、@cosme PLAZA" },
    { phase: "5-9ヶ月目", content: "@COSMEReview拡大、ドンキホーテ、Ainz&Tulpe、HANDS" },
    { phase: "10-12ヶ月目", content: "マツモトキヨシ展開" },
  ],
};

// 競合分析データ
export const competitorData = {
  gmvComparison: [
    {
      brand: "Anua",
      total: 22.85,
      qoo10: 9,
      tts: 0.05,
      amazon: 3.3,
      rakuten: 1.5,
      variety: 7,
      drug: 2,
    },
    {
      brand: "medicube",
      total: 13.75,
      qoo10: 8,
      tts: 0.05,
      amazon: 2.5,
      rakuten: 1,
      variety: 1.2,
      drug: 1,
    },
  ],
  features: [
    { brand: "Anua", mainProduct: "美容液 > スキンケア" },
    { brand: "dalba", mainProduct: "下地 = ミストトナー同じぐらい" },
    { brand: "medicube", mainProduct: "美顔器と美容液" },
  ],
  numbersIn: {
    issue: "直近右肩下がりの傾向",
    cause: "商品開発がよくなかったとされる",
    lesson: "継続的な商品開発の重要性を示唆",
  },
  calcium: {
    us: "USでworkしている",
    japan: "日本ではWorkしない",
    reason: "日本は「カルシウム」が美容と結びつきにくい、成分軸でクロスセルがしにくい",
  },
  adDistribution: [
    { brand: "anua", fbIg: "高", tiktok: "低", x: "低", yt: "低" },
    { brand: "dalba", fbIg: "中", tiktok: "高", x: "高", yt: "低" },
    { brand: "medicube", fbIg: "低", tiktok: "高", x: "高", yt: "高" },
  ],
};

// プロモーション戦略データ
export const promotionData = {
  online: [
    {
      tactic: "大型アンバサダー起用",
      purpose: "ブランディング/信頼性",
      role: "大型タレント/KOL可否率/投稿率向上",
      detail: "マス層への認知を一気に獲得しブランドの認知率向上と信頼性を獲得",
    },
    {
      tactic: "大型タレント/インフルエンサー起用",
      purpose: "権威性/興味醸成",
      role: "切り抜きなど二次活用素材",
      detail: "SNS層への認知獲得、X/TikTokでの話題化のため",
    },
    {
      tactic: "大量投稿（切り抜き/TikTokShop）",
      purpose: "認知/話題性",
      role: "バズ投稿醸成",
      detail: "レビュー投稿を増やし話題性を醸成、B/Aがわかりにくいため人の権威性を中心",
    },
    {
      tactic: "メガ割：KOL pick",
      purpose: "愛用感/信頼性",
      role: "刈り取り",
      detail: "メガ割ランキング上位になるため、KOL×その日限定でランキング上位を狙う",
    },
  ],
  offline: [
    {
      tactic: "棚取り",
      purpose: "売上最大化",
      detail: "オンラインプロモーションで棚取りを狙う",
    },
  ],
};

// KOL・TikTok Shop データ
export const kolData = {
  strategy: {
    key: "メガ割のランキングを上げるには24時間以内の購入が必要",
    approach: "投稿はフィード投稿だけじゃなく、ストーリーとライブ配信も行う",
  },
  recommendedKols: [
    { name: "ひかる｜韓国コスメ&成分マニア", followers: "30.5万人" },
    { name: "あやぱん｜Ayaka Nishizawa", followers: "17.4万人" },
    { name: "Nana", followers: "45.3万人" },
  ],
  ellissCase: {
    brand: "ELLISS",
    strategy: "話題系でバズらせ、検証系で刈り取る",
    results: [
      { type: "切り抜き動画", views: "210万再生" },
      { type: "B/A動画", views: "240万再生" },
      { type: "検証系「買う前に注意」", sales: "$2万" },
      { type: "「皮膚科医がおすすめ」", sales: "$2万" },
    ],
  },
};

// 主要製品データ
export const productsData = [
  { category: "Main", product: "Serum（美容液）", timing: "FY1全期間" },
  { category: "Sub", product: "Mask & Toner", timing: "1-6ヶ月目" },
  { category: "Sub", product: "Other SKUs", timing: "7ヶ月目以降" },
  { category: "Exclusive (TTS)", product: "Eye Phalt", timing: "1ヶ月目〜" },
];
