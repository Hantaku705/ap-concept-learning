// THE Room FX 提案書データ

// ==================== 型定義 ====================

export interface Section {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  description: string;
}

export interface KeyMetric {
  label: string;
  value: string;
  subtext?: string;
}

export interface DifferentiationPoint {
  title: string;
  description: string;
  details: string[];
}

export interface Persona {
  id: string;
  name: string;
  segment: string;
  region: string;
  priority: number;
  age: number;
  occupation: string;
  profile: string;
  motivation: string;
  painPoint: string;
  appealPoint: string;
  messages: string[];
  recommendedMedia: string[];
  budgetAllocation: number;
}

export interface Tribe {
  name: string;
  nameEn: string;
  postCount: number;
  sentiment: number;
  avgFollowers: number;
  characteristics: string[];
  appealPoints: string[];
  strongRegions: string[];
}

export interface CompetitorSentiment {
  airline: string;
  postCount: number;
  sentiment: number;
  positiveRate: number;
  negativeRate: number;
  status: 'lowest' | 'low' | 'neutral' | 'high' | 'no_data';
}

export interface MediaChannel {
  name: string;
  allocation: number;
  budget: number;
  role: string;
  formats: string[];
  kpiTargets: { label: string; value: string }[];
}

export interface BudgetAllocation {
  category: string;
  percentage: number;
  amount: number;
  details?: string;
}

export interface TimelinePhase {
  id: string;
  name: string;
  period: string;
  budget: number;
  description: string;
  kpis: { label: string; target: string }[];
}

export interface KPI {
  level: string;
  description: string;
  metrics: { name: string; target: string; definition?: string }[];
}

export interface Influencer {
  name: string;
  tribe: string;
  followers: number;
  country: string;
  engagement: number;
  postCount?: number;
  recommendation: string;
}

// ==================== セクション定義 ====================

export const sections: Section[] = [
  { id: 'executive-summary', number: '01', title: 'エグゼクティブサマリー', titleEn: 'Executive Summary', description: '提案の核心と期待成果' },
  { id: 'our-understanding', number: '02', title: '課題認識', titleEn: 'Our Understanding', description: 'ブリーフ理解と機会の発見' },
  { id: 'market-insight', number: '03', title: '市場インサイト', titleEn: 'Market Insight', description: 'SNS分析5,795件からの発見' },
  { id: 'target-strategy', number: '04', title: 'ターゲット戦略', titleEn: 'Target Strategy', description: '6セグメント × トライブ' },
  { id: 'media-strategy', number: '05', title: 'メディア戦略', titleEn: 'Media Strategy', description: 'PMP × ブランドセーフティ' },
  { id: 'budget-allocation', number: '06', title: '予算配分', titleEn: 'Budget Allocation', description: '4,000万円の最適配分' },
  { id: 'creative-direction', number: '07', title: 'クリエイティブ', titleEn: 'Creative Direction', description: 'アセット活用方針' },
  { id: 'kpi-framework', number: '08', title: 'KPI設計', titleEn: 'KPI Framework', description: '認知→関心→意向の階層' },
  { id: 'campaign-timeline', number: '09', title: 'タイムライン', titleEn: 'Campaign Timeline', description: 'ティーザー→本プロモーション' },
  { id: 'operation', number: '10', title: '運用', titleEn: 'Operation', description: '最適化サイクル' },
  { id: 'why-anymind', number: '11', title: '差別化', titleEn: 'Why AnyMind', description: '対アイレップ4つの強み' },
  { id: 'media-plan-detail', number: 'A1', title: '詳細メディアプラン', titleEn: 'Media Plan Detail', description: 'Appendix A' },
  { id: 'influencer-list', number: 'A2', title: 'インフルエンサー', titleEn: 'Influencer List', description: 'Appendix B' },
];

// ==================== 01 エグゼクティブサマリー ====================

export const executiveSummary = {
  headline: 'データドリブン × プレミアムメディアで、THE Room FXを北米・欧州で話題化します。',
  keyMetrics: [
    { label: '予算', value: '4,000万円', subtext: '2026年3月度' },
    { label: '配信期間', value: '3/2〜3/31', subtext: '30日間' },
    { label: 'ターゲット', value: '北米70% / 欧州30%', subtext: '地域配分' },
    { label: '目標', value: 'THE Room FX認知最大化', subtext: '' },
  ] as KeyMetric[],
  differentiationPoints: [
    {
      title: 'データドリブン',
      description: '5,795件のSNS分析に基づく市場インサイト',
      details: [
        'American Airlines センチメント -2.49 → 北米の不満層をANAに取り込むチャンス',
        'ANA言及 わずか2件 → 認知度向上の余地が非常に大きい',
        '394名のインフルエンサーリスト → 即時実行可能な体制',
      ],
    },
    {
      title: 'PMP × ブランドセーフティ',
      description: 'プレミアム媒体でANAブランドを守る',
      details: [
        'Bloomberg、Business Insider等のPMP枠確保',
        'MFA回避、ホワイトリスト運用',
        'ビューアビリティ70%以上を担保',
      ],
    },
    {
      title: 'トライブベースターゲティング',
      description: 'デモグラではなく行動・関心軸で精度向上',
      details: [
        'Tech/Digital → イノベーション、WiFi訴求',
        'Business Traveler → 生産性、疲労軽減訴求',
        'Travel Enthusiast → マイル、詳細レビュー訴求',
      ],
    },
  ] as DifferentiationPoint[],
  expectedResults: [
    { label: 'リーチ', value: '1,000万以上' },
    { label: '視聴完了率', value: '35%以上' },
    { label: 'LP流入', value: '10万以上' },
    { label: 'ブランドセーフティ', value: '95%以上' },
  ] as KeyMetric[],
  whyAnyMind: [
    { strength: 'SNS分析5,795件', vs: '運用型広告中心の競合にはない深い分析' },
    { strength: 'PMPネットワーク', vs: 'Google/Meta以外のプレミアム枠' },
    { strength: 'トライブベース', vs: 'デモグラ依存からの脱却' },
    { strength: '即時実行体制', vs: '分析済み資産で初日から動ける' },
  ],
};

// ==================== 02 課題認識 ====================

export const ourUnderstanding = {
  product: {
    name: 'THE Room FX',
    aircraft: 'Boeing 787-9',
    delivery: '2026年夏（予定）',
    concept: 'Elevating comfort through innovation + Future Experience',
  },
  strategicShift: {
    before: {
      label: '従来（Usage中心）',
      points: ['シートスペック強調', '機能・仕様の訴求', 'Functionalな「快適」'],
    },
    after: {
      label: '今回（情緒的価値中心）',
      points: ['顧客体験メリット訴求', '空間の付加価値', '深くくつろぎ、自分をRetreatできるComfort'],
    },
  },
  keyTakeaway: '「新しいビジネスクラスは、今まで見たことないComfortがあって、こだわりのある価値の高い快適が体験できそう」',
  challenges: [
    {
      title: 'THE Room認知不足',
      situation: '777-300ERの「THE Room」はコロナ禍で告知強化できず',
      data: 'SNSデータ: ANA言及わずか2件（分析期間中）',
      implication: 'THE Room FXは「認知ゼロ」からのスタート。認知形成が最優先。',
    },
    {
      title: 'JAL競合',
      comparison: [
        { item: '機材', jal: '大型機（A350-900/1000）', ana: '中型機（B787-9）' },
        { item: '展開', jal: 'ロング路線に積極導入', ana: '多頻度・多都市展開' },
        { item: 'ステータス', jal: '先行で市場話題化', ana: '後発リスク' },
        { item: '機能', jal: 'ヘッドレストスピーカー', ana: '24インチ4Kモニター' },
      ],
      implication: 'JALに対し「後発でも勝てる」戦略が必要。',
    },
    {
      title: '競合航空会社の課題',
      competitors: [
        { airline: 'American Airlines', issue: 'センチメント最低（-2.49）、苦情過去最高', opportunity: '不満層の取り込み' },
        { airline: 'British Airways', issue: '老朽化、サービスのばらつき', opportunity: '最新機材で差別化' },
        { airline: 'Lufthansa', issue: 'ストライキ、サービス低下', opportunity: '安定運航で差別化' },
      ],
    },
  ],
  opportunities: [
    {
      title: 'American Airlines不満層の取り込み',
      data: [
        'AAのセンチメント: -2.49（調査対象航空会社で最低）',
        '2024年苦情件数: 過去最高（前年比+9%）',
        'オンタイム率: 10年間で最低水準',
      ],
      targets: ['北米ビジネス渡航層（David）', 'テック系PM（Alex）'],
      messages: ['「American Airlinesに不満なあなたへ」', '「日本式おもてなしで、安定したサービス品質を」'],
    },
    {
      title: '認知度向上の余地',
      data: ['分析期間中のANA言及: わずか2件', '競合は数百〜数千件の言及'],
      meaning: [
        'ほぼ認知ゼロの状態',
        'THE Room FX発表で一気に話題化を狙える',
        'ノイズが少ない = メッセージが届きやすい',
      ],
    },
  ],
};

// ==================== 03 市場インサイト ====================

export const marketInsight = {
  overview: {
    headline: '5,795件のSNSデータ分析から、北米・欧州市場における競合航空会社の評判と、THE Room FXが狙うべき市場機会を特定しました。',
    metrics: [
      { label: '総投稿数', value: '5,795件' },
      { label: 'ターゲット地域投稿数', value: '2,623件', subtext: 'US/UK/FR/DE/IT/CA' },
      { label: 'ユニーク著者数', value: '4,725名' },
      { label: 'インフルエンサー', value: '394名', subtext: '10,000+フォロワー' },
      { label: '分析期間', value: '2024年1月〜2026年1月' },
    ],
  },
  competitorSentiment: [
    { airline: 'American Airlines', postCount: 1813, sentiment: -2.49, positiveRate: 12, negativeRate: 62, status: 'lowest' },
    { airline: 'British Airways', postCount: 1100, sentiment: -1.86, positiveRate: 14, negativeRate: 51, status: 'low' },
    { airline: 'Air Canada', postCount: 360, sentiment: -1.19, positiveRate: 22, negativeRate: 46, status: 'neutral' },
    { airline: 'Lufthansa', postCount: 847, sentiment: 0, positiveRate: 30, negativeRate: 29, status: 'neutral' },
    { airline: 'Air France', postCount: 846, sentiment: 0, positiveRate: 26, negativeRate: 24, status: 'neutral' },
    { airline: 'Delta Air Lines', postCount: 160, sentiment: 0.97, positiveRate: 41, negativeRate: 22, status: 'high' },
    { airline: 'ANA', postCount: 2, sentiment: 0, positiveRate: 0, negativeRate: 0, status: 'no_data' },
  ] as CompetitorSentiment[],
  keyInsights: [
    {
      title: 'American Airlines不満層がチャンス',
      description: 'American Airlinesのセンチメントが最低（-2.49）',
      evidence: ['2024年苦情件数：過去最高（前年比+9%）', 'オンタイム率：10年間で最低水準', '主な不満：遅延、サービス品質、価値に見合わない'],
      implication: '北米ビジネス渡航層のAA不満層をTHE Room FXで取り込む',
    },
    {
      title: 'ANAの認知度はほぼゼロ',
      description: '分析期間中のANA言及はわずか2件',
      evidence: ['認知度向上の余地が非常に大きい', 'THE Room FX発表で一気に話題化を狙える', '競合への不満が顕在化している今がチャンス'],
      implication: '',
    },
  ],
  topicAnalysis: [
    { topic: 'Seat & Comfort', mentions: 1724, impressions: 3414066, sentiment: -1.48, relevance: '「Roomy」コンセプトに合致' },
    { topic: 'Price & Miles', mentions: 940, impressions: 2163908, sentiment: -0.51, relevance: 'ANAマイレージの訴求ポイント' },
    { topic: 'Service', mentions: 830, impressions: 13338336, sentiment: -2.10, relevance: '差別化チャンス: 日本式おもてなし' },
    { topic: 'Food & Dining', mentions: 730, impressions: 16698912, sentiment: -1.53, relevance: 'ビジュアル活用: 高エンゲージメント' },
    { topic: 'Entertainment', mentions: 498, impressions: 3165564, sentiment: -1.12, relevance: '24インチ4Kモニターをアピール' },
    { topic: 'Lounge', mentions: 457, impressions: 556820, sentiment: -0.49, relevance: 'ラウンジ体験も訴求可能' },
  ],
};

// ==================== 04 ターゲット戦略 ====================

export const targetStrategy = {
  priorityMatrix: [
    { priority: 1, target: 'BC渡航層×欧州', postCount: 668, impressions: 1211385, allocation: 15, persona: 'Thomas' },
    { priority: 2, target: 'BC渡航層×北米', postCount: 1590, impressions: 5580926, allocation: 40, persona: 'David' },
    { priority: 3, target: 'Z/Y世代×北米', postCount: 93, impressions: 2030101, allocation: 20, persona: 'Alex' },
    { priority: 4, target: '訪日検討層×北米', postCount: 40, impressions: 20087, allocation: 10, persona: 'Michael' },
    { priority: 5, target: '訪日検討層×欧州', postCount: 17, impressions: 1435, allocation: 8, persona: 'Sophie' },
    { priority: 6, target: 'Z/Y世代×欧州', postCount: 15, impressions: 10234, allocation: 7, persona: 'Emma' },
  ],
  regionAllocation: [
    { region: '北米（TC1）', allocation: 70, composition: 'BC渡航層40% + Z/Y世代20% + 訪日検討層10%' },
    { region: '欧州（TC2）', allocation: 30, composition: 'BC渡航層15% + 訪日検討層8% + Z/Y世代7%' },
  ],
  personas: [
    {
      id: 'thomas',
      name: 'Thomas',
      segment: 'BC渡航層×欧州',
      region: '欧州',
      priority: 1,
      age: 42,
      occupation: '自動車メーカーのエグゼクティブ（フランクフルト）',
      profile: 'アジア（特に日本）との取引が多い。品質と効率を重視。Lufthansaのステータス会員だが最近不満も。',
      motivation: '日本出張時の快適性、時差ボケ対策、機内での仕事',
      painPoint: 'Lufthansaの最近のサービス低下、ストライキ',
      appealPoint: '日本品質のサービス、静粛性、時差ボケ対策',
      messages: ['到着した瞬間から、ベストパフォーマンスを', '空の上のプライベートオフィス'],
      recommendedMedia: ['LinkedIn', 'ビジネス専門メディア', '航空レビューサイト'],
      budgetAllocation: 15,
    },
    {
      id: 'david',
      name: 'David',
      segment: 'BC渡航層×北米',
      region: '北米',
      priority: 2,
      age: 45,
      occupation: '製造業の副社長（シカゴ）',
      profile: '月2回以上の海外出張。AAステータス会員。効率と快適性を重視。家族との時間を大切にしたい。',
      motivation: '移動時間の有効活用、睡眠の質、到着後のパフォーマンス',
      painPoint: 'American Airlinesの遅延・サービス低下、価値に見合わない',
      appealPoint: '定時運航率、ビジネスに集中できる環境、疲れない座席',
      messages: ['American Airlinesに不満なあなたへ', '到着後すぐに仕事できる、それがTHE Room FX'],
      recommendedMedia: ['Business Insider', 'Bloomberg', 'LinkedInビジネス層向け'],
      budgetAllocation: 40,
    },
    {
      id: 'alex',
      name: 'Alex',
      segment: 'Z/Y世代×北米',
      region: '北米',
      priority: 3,
      age: 28,
      occupation: 'テック企業のプロダクトマネージャー（サンフランシスコ）',
      profile: 'スタートアップで働くミレニアル世代。年収$150K。旅行好きでInstagramでライフスタイルを発信。マイル活用に詳しい。',
      motivation: '長距離フライトでの快適性、到着後すぐに仕事できる状態でいたい',
      painPoint: 'American Airlinesのサービス品質に不満、古い機材が多い',
      appealPoint: '最新テクノロジー搭載のキャビン、WiFi、日本の先進性',
      messages: ['24インチ4Kモニター、WiFi完備。空の上でも仕事も遊びも', 'シェアしたくなる、新しい空の旅'],
      recommendedMedia: ['Instagram', 'TikTok', 'ポイント系ブログ', 'トラベルインフルエンサー'],
      budgetAllocation: 20,
    },
    {
      id: 'michael',
      name: 'Michael',
      segment: '訪日検討層×北米',
      region: '北米',
      priority: 4,
      age: 35,
      occupation: 'IT企業のエンジニア（ニューヨーク）',
      profile: '日本文化に深い関心。アニメ・ゲームがきっかけで日本に興味。年1回は日本旅行。日本語学習中。',
      motivation: '日本への長時間フライトを快適に、到着後すぐに観光を楽しみたい',
      painPoint: '日本行き直行便の選択肢が少ない、機内での日本体験がない',
      appealPoint: '日本を感じられる機内体験、ANAの日本品質、成田/羽田への直行便',
      messages: ['日本は、ここから始まる', 'ANAだけの、本物の日本体験'],
      recommendedMedia: ['Japan旅行系YouTube', 'アニメ・ゲームコミュニティ', '日本観光局連携'],
      budgetAllocation: 10,
    },
    {
      id: 'sophie',
      name: 'Sophie',
      segment: '訪日検討層×欧州',
      region: '欧州',
      priority: 5,
      age: 29,
      occupation: 'ファッション業界のバイヤー（パリ）',
      profile: '日本のファッション・デザインに関心。年2回の東京出張。日本の美意識に共感。',
      motivation: '長距離フライトでの美容・スキンケア、到着時のコンディション',
      painPoint: '欧州から日本への直行便の乗り継ぎ、機内の乾燥',
      appealPoint: 'ANAの美意識、スキンケアアメニティ、日本の「おもてなし」',
      messages: ['美しく、日本へ', '日本の美意識が、空の上にも'],
      recommendedMedia: ['ファッション誌', 'デザイン系メディア', 'Japan House連携'],
      budgetAllocation: 8,
    },
    {
      id: 'emma',
      name: 'Emma',
      segment: 'Z/Y世代×欧州',
      region: '欧州',
      priority: 6,
      age: 32,
      occupation: '金融機関のコンサルタント（ロンドン）',
      profile: 'ヨーロッパ各地への出張が多いY世代。週末は旅行を楽しむ。サステナビリティに関心。',
      motivation: '出張後の疲労回復、プライベートな空間で仕事',
      painPoint: 'British Airwaysの老朽化、サービスの質のばらつき',
      appealPoint: '日本式おもてなし、静かで落ち着いた空間、質の高い機内食',
      messages: ['静かに、深く、くつろぐ', '品質で選ぶなら、日本のエアライン'],
      recommendedMedia: ['サステナビリティ系メディア', '若手ビジネス層向け'],
      budgetAllocation: 7,
    },
  ] as Persona[],
  tribes: [
    {
      name: 'Travel Enthusiast',
      nameEn: '旅行マニア・マイラー',
      postCount: 794,
      sentiment: 0.54,
      avgFollowers: 15800,
      characteristics: ['航空・旅行の専門知識', '詳細なレビューを投稿', 'フランス、ドイツで影響力'],
      appealPoints: ['マイル・ポイント活用', '航空機ファン向け詳細スペック'],
      strongRegions: ['フランス', 'ドイツ'],
    },
    {
      name: 'Tech/Digital',
      nameEn: 'テック系',
      postCount: 922,
      sentiment: -1.11,
      avgFollowers: 12407,
      characteristics: ['最大ボリューム', 'デジタルネイティブで拡散力高', '北米で活発'],
      appealPoints: ['WiFi', '24インチ4Kモニター', 'アプリ連携', 'イノベーション'],
      strongRegions: ['US', 'CA'],
    },
    {
      name: 'Business Traveler',
      nameEn: 'ビジネス出張者',
      postCount: 616,
      sentiment: -1.19,
      avgFollowers: 22147,
      characteristics: ['高フォロワー・高影響力', '高購買力層', 'エンゲージメント最高'],
      appealPoints: ['生産性向上', '到着後のパフォーマンス', '疲労軽減'],
      strongRegions: ['US'],
    },
    {
      name: 'Creative',
      nameEn: 'クリエイター',
      postCount: 205,
      sentiment: -1.24,
      avgFollowers: 25341,
      characteristics: ['ビジュアルコンテンツ力', 'UGC生成力', '北米で影響力'],
      appealPoints: ['シェアしたくなる空間', 'ビジュアル体験'],
      strongRegions: ['US', 'CA'],
    },
  ] as Tribe[],
};

// ==================== 05 メディア戦略 ====================

export const mediaStrategy = {
  overview: {
    headline: 'PMP（プログラマティック保証型）とブランドセーフティを軸に、ANAブランドにふさわしい高品質な配信面を確保します。',
    principles: [
      { title: 'PMP活用', description: 'プレミアム媒体での配信面確保' },
      { title: 'ブランドセーフティ', description: 'MFA回避、ホワイトリスト運用' },
      { title: 'トライブベース', description: 'デモグラではなく行動・関心軸でターゲティング' },
      { title: 'データドリブン', description: 'SNS分析5,795件に基づく媒体選定' },
    ],
  },
  channels: [
    {
      name: 'Google/YouTube',
      allocation: 35,
      budget: 1400,
      role: '認知形成、動画視聴、検索インテント獲得',
      formats: ['TrueView In-Stream', 'Discovery', 'Shorts'],
      kpiTargets: [
        { label: '視聴完了率', value: '35%以上' },
        { label: 'CPV', value: '$0.02以下（北米）' },
      ],
    },
    {
      name: 'Meta（FB/IG）',
      allocation: 30,
      budget: 1200,
      role: 'リーチ拡大、エンゲージメント、Z/Y世代接触',
      formats: ['Reels', 'Stories', 'In-Feed Video'],
      kpiTargets: [
        { label: 'リーチ', value: '500万以上（北米）' },
        { label: 'エンゲージメント率', value: '2%以上' },
      ],
    },
    {
      name: 'PMP/プレミアム',
      allocation: 15,
      budget: 600,
      role: 'ブランド価値保護、高品質な配信面確保',
      formats: ['PMP', 'PG（Programmatic Guaranteed）'],
      kpiTargets: [
        { label: 'ビューアビリティ', value: '70%以上' },
        { label: 'ブランドセーフティ', value: '95%以上' },
      ],
    },
    {
      name: 'LinkedIn',
      allocation: 5,
      budget: 200,
      role: 'ビジネス層への精密ターゲティング',
      formats: ['Sponsored Content', 'Video Ads'],
      kpiTargets: [
        { label: 'リーチ', value: '100万以上' },
        { label: 'CTR', value: '0.3%以上' },
      ],
    },
  ] as MediaChannel[],
  pmpMedia: [
    { name: 'Bloomberg', category: 'ビジネス', target: 'BC渡航層', strength: 'エグゼクティブ直接リーチ' },
    { name: 'Business Insider', category: 'ビジネス×テック', target: 'BC渡航層、Tech', strength: '意思決定者層' },
    { name: 'The Points Guy', category: '旅行', target: 'Travel Enthusiast', strength: 'マイラー・旅行マニアへの直接訴求' },
    { name: 'One Mile at a Time', category: '航空レビュー', target: 'Travel Enthusiast', strength: '専門性の高い露出' },
    { name: 'LinkedIn', category: 'ビジネスSNS', target: 'BC渡航層', strength: '職種・役職ターゲティング' },
  ],
  brandSafety: {
    measures: [
      { measure: 'ホワイトリスト運用', description: '事前承認した配信面のみに配信' },
      { measure: 'ブロックリスト設定', description: 'MFAサイト、低品質サイトを除外' },
      { measure: 'IAS/DV連携', description: '第三者検証ツールでブランドセーフティを担保' },
    ],
    excludedCategories: ['政治・宗教', '事故・災害', '成人向けコンテンツ', 'フェイクニュース'],
    viewabilityStandards: [
      { type: '動画', standard: '70%以上' },
      { type: 'ディスプレイ', standard: '60%以上' },
      { type: '完全視聴可能率', standard: '50%以上' },
    ],
  },
};

// ==================== 06 予算配分 ====================

export const budgetAllocation = {
  total: 4000,
  period: '2026年3月2日〜3月31日（30日間）',
  byRegion: [
    { category: '北米（TC1）', percentage: 70, amount: 2800, details: 'NYC、LAX、シカゴ、サンフランシスコ' },
    { category: '欧州（TC2）', percentage: 30, amount: 1200, details: 'ロンドン、フランクフルト、パリ、ミラノ' },
  ] as BudgetAllocation[],
  byMedia: [
    { category: 'Google/YouTube', percentage: 35, amount: 1400, details: '動画認知、検索インテント' },
    { category: 'Meta（FB/IG）', percentage: 30, amount: 1200, details: 'リーチ、エンゲージメント' },
    { category: 'YouTube単体', percentage: 20, amount: 800, details: '長尺動画、ブランド訴求' },
    { category: 'PMP/プレミアム', percentage: 15, amount: 600, details: '高品質面、ブランドセーフティ' },
  ] as BudgetAllocation[],
  byPhase: [
    { category: 'ティーザー期間（3/2〜3/8）', percentage: 12.5, amount: 500, details: '認知形成' },
    { category: '本プロモーション（3/9〜3/31）', percentage: 87.5, amount: 3500, details: 'ブランド訴求' },
  ] as BudgetAllocation[],
  byTarget: {
    northAmerica: [
      { target: 'BC渡航層（David）', amount: 1120, percentage: 40 },
      { target: 'Z/Y世代（Alex）', amount: 560, percentage: 20 },
      { target: '訪日検討層（Michael）', amount: 280, percentage: 10 },
      { target: '認知拡大', amount: 840, percentage: 30 },
    ],
    europe: [
      { target: 'BC渡航層（Thomas）', amount: 420, percentage: 35 },
      { target: '訪日検討層（Sophie）', amount: 224, percentage: 18.7 },
      { target: 'Z/Y世代（Emma）', amount: 196, percentage: 16.3 },
      { target: '認知拡大', amount: 360, percentage: 30 },
    ],
  },
  reserve: {
    amount: 550,
    percentage: 13.75,
    useCases: [
      { purpose: 'パフォーマンス良好媒体への追加投下', amount: 300, condition: '週次KPI達成時' },
      { purpose: '新規テスト枠', amount: 150, condition: '機会発見時' },
      { purpose: '緊急対応', amount: 100, condition: '想定外の事態' },
    ],
  },
};

// ==================== 08 KPI設計 ====================

export const kpiFramework = {
  hierarchy: [
    {
      level: 'Awareness（認知）',
      description: 'THE Room FXの存在を知る',
      metrics: [
        { name: 'リーチ数', target: '1,000万以上', definition: 'ユニークリーチ' },
        { name: 'インプレッション', target: '5,000万以上', definition: '広告表示回数' },
        { name: 'FQ', target: '3-5回', definition: '平均接触回数' },
      ],
    },
    {
      level: 'Interest（関心）',
      description: 'THE Room FXに興味を持つ',
      metrics: [
        { name: '視聴完了率', target: '35%以上', definition: '視聴完了数÷視聴開始数' },
        { name: 'LP流入数', target: '10万以上', definition: 'LP誘導クリック' },
        { name: '平均滞在時間', target: '60秒以上', definition: 'LP上での滞在時間' },
      ],
    },
    {
      level: 'Intent（意向）',
      description: 'THE Room FXを利用したいと思う',
      metrics: [
        { name: '利用意向', target: '前後比+5pt', definition: 'ブランドリフト調査' },
        { name: '認知度', target: '前後比+10pt', definition: 'ブランドリフト調査' },
        { name: '好意度', target: '前後比+3pt', definition: 'ブランドリフト調査' },
      ],
    },
  ] as KPI[],
  byMedia: {
    video: [
      { name: 'CPM', target: '$8以下（北米）' },
      { name: '表示回数', target: '5,000万以上' },
      { name: '視聴完了率', target: '35%以上' },
      { name: '視聴完了数', target: '1,000万以上' },
      { name: '視聴完了単価', target: '$0.03以下' },
      { name: 'クリック数', target: '10万以上' },
    ],
    banner: [
      { name: 'CPM', target: '$6以下' },
      { name: '表示回数', target: '2,000万以上' },
      { name: 'クリック数', target: '5万以上' },
      { name: 'クリック率', target: '0.25%以上' },
    ],
  },
  successCriteria: [
    { metric: 'リーチ 1,000万以上', weight: 'Critical' },
    { metric: '視聴完了率 35%以上', weight: 'Critical' },
    { metric: 'LP流入 10万以上', weight: 'High' },
    { metric: 'ブランドセーフティ 95%以上', weight: 'High' },
    { metric: 'CPV $0.03以下', weight: 'Medium' },
    { metric: 'FQ 3-5回', weight: 'Medium' },
  ],
};

// ==================== 09 タイムライン ====================

export const campaignTimeline = {
  phases: [
    {
      id: 'prep',
      name: '準備期間',
      period: '〜2/28',
      budget: 0,
      description: 'クリエイティブ入稿、配信設定',
      kpis: [],
    },
    {
      id: 'teaser',
      name: 'ティーザー期間',
      period: '3/2〜3/8',
      budget: 500,
      description: '6秒ティーザー動画で認知形成',
      kpis: [
        { label: 'リーチ', target: '300万以上' },
        { label: '視聴完了率', target: '90%以上' },
      ],
    },
    {
      id: 'main',
      name: '本プロモーション',
      period: '3/9〜3/31',
      budget: 3500,
      description: '30秒CM、PMP配信でブランド訴求',
      kpis: [
        { label: 'リーチ', target: '700万以上' },
        { label: 'LP流入', target: '10万以上' },
        { label: '視聴完了率', target: '35%以上' },
      ],
    },
    {
      id: 'event',
      name: 'オフラインイベント',
      period: '3/12〜3/14',
      budget: 0,
      description: '六本木ミッドタウン イベント連動',
      kpis: [],
    },
  ] as TimelinePhase[],
  milestones: [
    { date: '2/5', event: 'メディアプラン最終提出' },
    { date: '2/末', event: 'クリエイティブアセット受領' },
    { date: '3/2', event: 'ティーザー配信開始' },
    { date: '3/9', event: '本プロモーション開始' },
    { date: '3/12-14', event: '六本木ミッドタウン イベント' },
    { date: '3/31', event: 'キャンペーン終了' },
  ],
};

// ==================== 10 運用 ====================

export const operation = {
  team: [
    { role: 'アカウントマネージャー', count: 1, responsibility: '全体統括、ANA窓口' },
    { role: '運用担当', count: 2, responsibility: '日常運用、最適化' },
    { role: 'クリエイティブ担当', count: 1, responsibility: '素材管理、A/Bテスト' },
    { role: 'アナリスト', count: 1, responsibility: 'データ分析、レポート' },
  ],
  dailyCycle: [
    { time: '9:00', action: '前日パフォーマンス確認' },
    { time: '10:00', action: '異常値チェック、アラート対応' },
    { time: '11:00', action: '入札調整、予算再配分' },
    { time: '17:00', action: '当日中間レビュー' },
  ],
  weeklyCycle: [
    { day: '月曜', action: '前週レビュー、週次レポート作成' },
    { day: '火曜', action: 'オーディエンス分析、調整' },
    { day: '水曜', action: 'クリエイティブ分析、差し替え検討' },
    { day: '木曜', action: 'A/Bテスト結果確認、次週計画' },
    { day: '金曜', action: '週末配信設定、予算調整' },
  ],
  bidStrategy: [
    { media: 'YouTube', strategy: 'Target CPV', purpose: '視聴単価の安定' },
    { media: 'Meta', strategy: 'Reach最適化', purpose: 'コスト効率の良いリーチ' },
    { media: 'LinkedIn', strategy: '手動CPC', purpose: 'ビジネス層への確実なリーチ' },
    { media: 'PMP', strategy: '手動CPM', purpose: '良質な枠の確保' },
  ],
  alertLevels: [
    { level: '低', condition: 'KPI軽微な乖離', responseTime: '24時間以内', escalation: '週次レポートで報告' },
    { level: '中', condition: 'KPI目標の80%未満', responseTime: '4時間以内', escalation: 'AM→ANA担当者' },
    { level: '高', condition: 'KPI目標の50%未満', responseTime: '1時間以内', escalation: 'AM→ANA担当者（電話）' },
    { level: '緊急', condition: '配信停止、ブランド毀損リスク', responseTime: '即時', escalation: '全員→ANA担当者（電話）' },
  ],
};

// ==================== 11 Why AnyMind ====================

export const whyAnyMind = {
  differentiators: [
    {
      title: 'データドリブン',
      anyMind: 'SNS分析5,795件、394名インフルエンサーリスト',
      competitor: '運用型広告中心、深い分析なし',
      icon: 'data',
    },
    {
      title: 'PMP',
      anyMind: 'Bloomberg、Netflix等プレミアム媒体',
      competitor: 'Google/Meta中心、PMPネットワーク弱い',
      icon: 'premium',
    },
    {
      title: 'ブランドセーフティ',
      anyMind: 'MFA回避、ホワイトリスト運用',
      competitor: '対策の具体性不足',
      icon: 'shield',
    },
    {
      title: 'トライブベース',
      anyMind: '行動・関心軸のターゲティング',
      competitor: 'デモグラ中心',
      icon: 'target',
    },
  ],
  assets: [
    { asset: 'SNS分析データ', content: '5,795件の投稿分析', usage: '市場インサイト、訴求ポイント設計' },
    { asset: '競合センチメント', content: '航空会社7社の評判分析', usage: 'AA不満層の取り込み戦略' },
    { asset: 'トライブ分析', content: '6トライブの行動特性', usage: 'ターゲティング精度向上' },
    { asset: 'インフルエンサーリスト', content: '394名（10,000フォロワー以上）', usage: 'インフルエンサー施策の即時実行' },
  ],
  keyFindings: [
    { finding: 'AA センチメント -2.49', meaning: '北米で最大の不満層が存在', action: 'AA不満層をANAに取り込む' },
    { finding: 'ANA言及 2件', meaning: '認知度向上の余地大', action: '認知形成を最優先KPIに' },
    { finding: 'Travel Enthusiast +0.54', meaning: '唯一ポジティブなトライブ', action: '欧州向けの主力ターゲット' },
  ],
  conclusion: 'THE Room FXのグローバルローンチに、AnyMindが最適なパートナーです。',
};

// ==================== Appendix インフルエンサー ====================

export const influencerList = {
  overview: {
    total: 394,
    criteria: '10,000フォロワー以上',
    source: 'Meltwater SNSモニタリング',
    period: '2024年1月〜2026年1月',
  },
  byTribe: [
    {
      tribe: 'Travel Enthusiast',
      influencers: [
        { name: 'non aesthetic things', followers: 4381255, country: '-', engagement: 2950, recommendation: '★★★' },
        { name: 'Sheel Mohnot', followers: 177835, country: 'US', engagement: 3058, recommendation: '★★★' },
        { name: 'Virginie Sigonney', followers: 54574, country: 'FR', engagement: 4918, recommendation: '★★★' },
        { name: 'Andreas Spaeth', followers: 15096, country: 'DE', engagement: 824, recommendation: '★★★' },
        { name: 'Ben Schlappig', followers: 82663, country: '-', engagement: 497, recommendation: '★★★' },
      ],
    },
    {
      tribe: 'Tech/Digital',
      influencers: [
        { name: 'Imtiaz Mahmood', followers: 431999, country: 'UK', engagement: 966, recommendation: '★★★' },
        { name: 'Mike Netter', followers: 51315, country: 'US', engagement: 10114, recommendation: '★★★' },
        { name: 'Patrick Greenfield', followers: 10521, country: 'US', engagement: 2066, recommendation: '★★' },
      ],
    },
    {
      tribe: 'Business Traveler',
      influencers: [
        { name: 'Mario Nawfal', followers: 1581549, country: '-', engagement: 1005, recommendation: '★★★' },
        { name: 'Reno Omokri', followers: 2686084, country: '-', engagement: 782, recommendation: '★★' },
        { name: 'Mike Sington', followers: 141423, country: 'US', engagement: 7331, recommendation: '★★★' },
        { name: 'Rain Drops Media', followers: 89123, country: '-', engagement: 71095, recommendation: '★★★' },
      ],
    },
    {
      tribe: 'Creative',
      influencers: [
        { name: 'ian bremmer', followers: 768296, country: '-', engagement: 3637, recommendation: '★★★' },
        { name: 'Ryan Gerritsen', followers: 113796, country: 'CA', engagement: 18675, recommendation: '★★★' },
      ],
    },
  ],
  campaignOptions: [
    {
      option: '体験搭乗プログラム',
      target: 'Travel Enthusiast 5名',
      content: 'THE Room FX体験搭乗、詳細レビュー',
      expectedOutcome: '専門的なレビュー記事、マイラー層へのリーチ',
    },
    {
      option: 'SNSアンバサダー',
      target: 'Tech/Digital、Business Traveler 各3名',
      content: 'キャンペーン期間中の投稿（3-5投稿/人）',
      expectedOutcome: 'SNS話題化、ハッシュタグトレンド入り',
    },
    {
      option: 'UGCキャンペーン',
      target: 'Creative 5名',
      content: 'THE Room FX関連のビジュアルコンテンツ制作',
      expectedOutcome: '高品質UGC、広告素材としての二次利用',
    },
  ],
};
