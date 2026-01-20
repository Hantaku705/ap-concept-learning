// Qoo10 韓国コスメ競合リサーチデータ

// メタデータ
export const researchMeta = {
  title: "Qoo10 韓国コスメ競合リサーチ",
  subtitle: "Dr.Melaxin 日本市場参入に向けた競合分析",
  source: "Qoo10担当者ヒアリング及び各ブランド調査に基づく",
};

// セクション定義
export const researchSections = [
  { id: "market", title: "市場概況" },
  { id: "patterns", title: "成功パターン" },
  { id: "competitors", title: "競合分析（詳細）" },
  { id: "marketing", title: "マーケティング手法" },
  { id: "jt", title: "JT代理店情報" },
  { id: "implications", title: "Dr.Melaxinへの示唆" },
];

// 市場概況データ
export const marketData = {
  brandTiers: [
    { tier: "Top", brands: "Anua, Medicube", megaSale: "20億", normalMonth: "1億未満", annual: "100億" },
    { tier: "Middle", brands: "Dalba, VT", megaSale: "10億", normalMonth: "-", annual: "50億" },
    { tier: "Lower", brands: "BOH, Numberzin", megaSale: "5億", normalMonth: "-", annual: "-" },
  ],
  purchaseTrends: [
    { trend: "セット販売が伸びている", direction: "up" },
    { trend: "平均購買商品点数は減少", direction: "down" },
    { trend: "平均購買単価は上昇", direction: "up" },
    { trend: "韓国コスメ全体は成長しているが、上位ブランドが売上を牽引", direction: "up" },
  ],
};

// 成功パターンデータ
export const successPatterns = {
  normalPeriod: [
    { tactic: "販売", content: "GIFT（おまけ）中心、価格は維持" },
    { tactic: "マーケ", content: "Xでの話題形成（ホワイト/グレー含む）" },
  ],
  megaSale: [
    { tactic: "販売", content: "まとめ買い × 大幅ディスカウント（50-75%OFF）" },
    { tactic: "価格着地", content: "約7,000円" },
    { tactic: "刈り取り", content: "KOL Pick（Instagram Live等）" },
  ],
  winningPattern: "通常期で話題を作り、メガ割で刈り取る",
};

// 競合詳細データ
export const competitorDetails = {
  dalba: {
    name: "Dalba",
    tier: "Top",
    successFactor: "X Top KOL（Mocchi）が80投稿でバズ",
    salesStrategy: {
      normal: "GIFTでおまけ",
      megaSale: "まとめ買い × 75%OFF → 7,000円前後",
    },
    marketingBudget: "推定投資10億以上",
    campaigns: [
      { date: "2024/08", content: "アドトラック with HOSH" },
      { date: "2024/11", content: "パリ インフルエンサー招待" },
      { date: "2025/02", content: "三吉彩花アンバサダー（fw125万人）" },
      { date: "2025/02", content: "アドトラック/OOH" },
      { date: "2025/05", content: "大型オフラインイベント" },
      { date: "通常期", content: "X Top KOL（Mocchi）アフィリエイト80投稿" },
      { date: "メガ割", content: "KOL Pick（Instagram Live）" },
    ],
    megaSaleRanking: [
      { day: "初日（11/21）", rank: 25 },
      { day: "2日目（11/22）", rank: 4 },
      { day: "3日目（11/23）", rank: 4 },
      { day: "残り3日（12/1）", rank: 2, note: "最高順位" },
      { day: "残り2日（12/2）", rank: 3 },
      { day: "最終日（12/3）", rank: 9 },
    ],
    roiEvaluation: [
      { media: "Instagram", rating: 2, note: "イベント/アドトラック/パリ" },
      { media: "Instagram アフィ", rating: 3, note: "TierS アフィリエイターが刈り取り" },
      { media: "X", rating: 3, note: "Mocchiアフィリエイト" },
      { media: "TikTok", rating: 2, note: "ライフスタイル系投稿" },
    ],
  },
  medicube: {
    name: "Medicube",
    tier: "Top",
    successFactor: "千賀の切り抜きがバズ",
    salesStrategy: {
      normal: "GIFTでおまけ",
      megaSale: "まとめ買い × 50%OFF → 7,000円前後",
    },
    campaigns: [
      { content: "TOPタレント切り抜きバズ（千賀）" },
      { content: "RT部隊によるX話題化（LAKA/Fwee/VTと同業者）" },
      { content: "メガ割時KOL Pick" },
    ],
  },
  laka: {
    name: "LAKA",
    tier: "成長中",
    successFactor: "RT部隊による人工バズ",
    salesStrategy: {
      normal: "GIFTでおまけ",
      megaSale: "まとめ買い × 50%OFF → 7,000円前後",
    },
    campaigns: [
      { content: "RT部隊（人工バズ）- Medicube/Fwee/VTと同業者" },
      { content: "大型KOLコラボ - ハウスダスト&せよ" },
      { content: "メガ割時KOL Pick" },
    ],
    caseStudy: {
      title: "10-11月施策詳細（1億達成事例）",
      timeline: [
        { date: "10/27", content: "RT部隊で新商品話題化", rank: "1位" },
        { date: "10/27-30", content: "継続", rank: "1-3位" },
        { date: "11/12", content: "プレキャンで認知拡大", rank: "20位" },
        { date: "11/21", content: "メガ割初日: ハウスダスト&セヨコラボ", rank: "27位" },
        { date: "11/22", content: "ひかる&ぱちょコラボ", rank: "10位" },
        { date: "12/3", content: "最終日", rank: "26位" },
      ],
    },
  },
  others: [
    { brand: "VT", tier: "Middle", note: "RT部隊利用（LAKA/Medicubeと同業者）" },
    { brand: "BOH", tier: "Lower", note: "-" },
    { brand: "Numberzin", tier: "Lower", note: "-" },
    { brand: "Fwee", tier: "-", note: "RT部隊利用、ステマで有名" },
    { brand: "TirTir", tier: "-", note: "ステマで有名" },
    { brand: "Anua", tier: "Top", note: "RT部隊は使っていないと主張（1投稿のみ確認）" },
  ],
};

// マーケティング手法データ
export const marketingMethods = {
  whiteTactics: [
    { tactic: "KOL Pick", overview: "Instagram Liveでの商品紹介", effect: "メガ割時の刈り取りに効果的" },
    { tactic: "オフラインイベント", overview: "大型イベント、来場者招待", effect: "ブランディング" },
    { tactic: "タレント起用", overview: "アンバサダー契約", effect: "認知拡大" },
    { tactic: "アドトラック/OOH", overview: "屋外広告", effect: "認知拡大" },
  ],
  grayTactics: {
    overview: "Xでの人工バズを作る業者。複数アカウントでRTを回し、トレンド入りさせる。",
    rtSquad: [
      { name: "ぎょうざのりさ", note: "TOP業者" },
      { name: "バズコス暴露ちゃん", note: "-" },
      { name: "顔面工事ちゃん", note: "-" },
      { name: "かくれもじり", note: "-" },
      { name: "課金ちゃん", note: "-" },
    ],
    usingBrands: ["LAKA", "Medicube", "VT", "Fwee", "TirTir"],
    incidents: [
      "炎上後も名前を変えて継続",
    ],
  },
};

// JT代理店情報
export const jtAgencyData = {
  company: {
    name: "株式会社JT",
    role: "LAKA/朝鮮美女の日本市場での販売・プロモーションを担う総代理店",
    note: "本国プロモーションとは別に日本市場を担当",
    history: "過去にAnyMindに与件あり（2025/06提案→失注）",
  },
  characteristics: [
    "インフルエンサーマーケリテラシーは高くない",
    "これまでギフティング施策に限定",
    "過去KPI設定なし",
    "提案内容によって予算調整可能",
    "直近PR代理店との契約キャンセル経緯あり",
  ],
  lakaIssues: [
    "Qoo10ランキング上位表示の強化",
    "メガポ等の大型キャンペーン時にランキング上位を狙いたい",
    "ギフティング施策の実施機会拡大",
    "最適なタイミング・方法の検討",
  ],
  joseonIssues: [
    "国内での知名度不足",
    "話題性の創出",
    "ブランドイメージに合致したインフルエンサーとの連携強化",
  ],
};

// Dr.Melaxinへの示唆
export const implications = {
  topTierCommon: [
    "シンプルな美容液がメイン商材",
    "セット販売で大幅ディスカウント（50-75%OFF）",
    "7,000円の価格着地点",
    "通常期の話題形成 → メガ割で刈り取りの勝ちパターン",
  ],
  currentIssue: "Dr.Melaxinは尖っている商材のため、マス受けしにくい",
  requiredActions: [
    { action: "Product戦略の見直し", detail: "マス受けする新しい方向性での商品開発が必要" },
    { action: "価格戦略", detail: "セット販売×ディスカウントで7,000円着地の設計" },
    { action: "話題形成", detail: "通常期でのX施策（ホワイト/グレー）の検討" },
    { action: "刈り取り", detail: "メガ割時のKOL Pick体制構築" },
  ],
};
