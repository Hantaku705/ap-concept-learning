// MTG全体の業績推移
export const mtgPerformance = [
  { year: 2018, revenue: 584, profit: 92, note: '上場翌年、絶頂期' },
  { year: 2019, revenue: 360, profit: -144, note: 'インバウンド崩壊' },
  { year: 2020, revenue: 348, profit: 12, note: 'BEAUTECH効果で回復開始' },
  { year: 2021, revenue: 428, profit: 39, note: '国内市場強化' },
  { year: 2022, revenue: 490, profit: 32, note: '円安で原価高騰' },
  { year: 2023, revenue: 601, profit: 36, note: '全カテゴリ成長' },
  { year: 2024, revenue: 718, profit: 33, note: '国内過去最高' },
  { year: 2025, revenue: 988, profit: 107, note: '過去最高更新' },
]

// ReFaブランド売上推移
export const refaPerformance = [
  { year: 2018, revenue: 130, ratio: 22, product: 'ローラー' },
  { year: 2019, revenue: 136, ratio: 38, product: 'ローラー（インバウンド激減）' },
  { year: 2020, revenue: 219, ratio: 63, product: 'BEAUTECH登場' },
  { year: 2021, revenue: 250, ratio: 58, product: 'ヘアケア成長' },
  { year: 2022, revenue: 296, ratio: 60, product: 'シャワー成長' },
  { year: 2023, revenue: 422, ratio: 70, product: '全カテゴリ成長' },
  { year: 2024, revenue: 514, ratio: 72, product: '国内最高' },
  { year: 2025, revenue: 728, ratio: 74, product: '過去最高' },
]

// KPI比較データ
export const kpiComparison = {
  crisis: { year: 2019, mtgRevenue: 360, profit: -144, refaRevenue: 136, ratio: 38 },
  current: { year: 2025, mtgRevenue: 988, profit: 107, refaRevenue: 728, ratio: 74 },
  change: {
    mtgRevenueGrowth: '+175%',
    profitChange: '+251億円',
    refaRevenueGrowth: '+435%',
    ratioChange: '+36pt',
  },
}

// イノベーター理論 × ReFa戦略マッピング
export const adoptionPhases = [
  {
    id: 1,
    layer: 'イノベーター',
    percentage: 2.5,
    cumulative: 2.5,
    period: '2019年',
    refaPhase: '戦略転換',
    channel: '美容室限定',
    strategy: 'プロユースブランディング',
    description: '美容室20以上と共同開発。「美容室で売っているドライヤー」というポジショニング確立',
    color: '#3B82F6',
  },
  {
    id: 2,
    layer: 'アーリーアダプター',
    percentage: 13.5,
    cumulative: 16,
    period: '2020-2021年',
    refaPhase: '製品多角化',
    channel: '百貨店・EC追加',
    strategy: '「レア髪」コンセプト訴求',
    description: 'コロナ禍を追い風に、新カテゴリ製品で国内市場を開拓。シャワーヘッド大ヒット',
    color: '#10B981',
  },
  {
    id: 3,
    layer: 'アーリーマジョリティ',
    percentage: 34,
    cumulative: 50,
    period: '2022-2023年',
    refaPhase: '体験型・インフルエンサー',
    channel: 'ホテルBtoBtoC 2,600施設',
    strategy: '熱量・共感重視のインフルエンサー',
    description: '「購入前に試したい」ニーズに応える。プレ花嫁・産後ママなど特定セグメントに訴求',
    color: '#F59E0B',
  },
  {
    id: 4,
    layer: 'レイトマジョリティ',
    percentage: 34,
    cumulative: 84,
    period: '2024年〜',
    refaPhase: 'マスマーケティング',
    channel: '家電量販店解禁、タレントアンバサダー',
    strategy: '榮倉奈々・山田裕貴起用、TV CM展開',
    description: '5年かけてブランド価値を構築してからマス展開。「戦略的忍耐」の成功例',
    color: '#EF4444',
    isCurrent: true,
  },
  {
    id: 5,
    layer: 'ラガード',
    percentage: 16,
    cumulative: 100,
    period: '2025年〜',
    refaPhase: 'これから',
    channel: '更なる認知拡大',
    strategy: '消耗品（シャンプー等）でリピート収益化',
    description: '機器売り（単発）からリピート収益モデルへの転換',
    color: '#6B7280',
    isFuture: true,
  },
]

// 5つのフェーズ詳細
export const phases = [
  {
    id: 1,
    name: 'ローラー時代',
    period: '2009-2018',
    overview: 'エステティシャンの手技を再現した美顔ローラーで市場を創造',
    products: [
      { name: 'ReFa CARAT', price: '2-3万円', note: 'フラッグシップ' },
      { name: 'ReFa S CARAT', price: '2万円', note: 'パーツケア用、2014年' },
      { name: 'ReFa GRACE HEAD SPA', price: '3万円', note: '頭皮用、2016年' },
    ],
    promotion: [
      { method: '口コミ・PR', detail: '芸能人の自発的使用（IKKOなど）、美容雑誌掲載' },
      { method: '受賞', detail: '@cosmeベストコスメアワード2016殿堂入り' },
      { method: '体験導入', detail: 'エステサロン・美容室での設置' },
      { method: '海外展開', detail: '2017年、上海に海外初の単独カウンター' },
    ],
    results: [
      '2014年: 累計300万本突破',
      '2017年: 累計700万本突破',
      '2018年: 累計1,000万本突破',
    ],
    characteristics: [
      '単一カテゴリ集中: 美顔ローラーに特化',
      'インバウンド依存: 中国代購が売上の大部分',
      'プロモーションは受動的: 芸能人の自発使用・口コミ中心',
    ],
  },
  {
    id: 2,
    name: 'インバウンド崩壊と戦略転換',
    period: '2019',
    overview: '外部環境の激変により過去最大の危機。同時に大転換の起点となった年',
    crisisFactors: [
      { factor: '中国新EC法施行（1月）', impact: '代購激減（142億円減少）' },
      { factor: '韓国不買運動', impact: '韓国市場縮小' },
      { factor: '香港デモ', impact: 'アジア市場不安定化' },
    ],
    businessImpact: {
      revenueDrop: '584億円 → 360億円（-38%）',
      profitDrop: '92億円 → -144億円（赤字転落）',
      refaImpact: 'ReFa売上の191億円減少のうち、142億円がインバウンド要因',
    },
    strategicTurn: {
      date: '2019年10月',
      products: [
        { name: 'ReFa BEAUTECH DRYER', price: '36,300円', feature: 'プロセンシング、ハイドロイオン' },
        { name: 'ReFa BEAUTECH STRAIGHT IRON', price: '22,000円', feature: 'カーボンレイヤープレート' },
      ],
      keyDecisions: [
        '美容室20以上と共同開発（「レア髪」コンセプト）',
        '最初は美容室限定販売（ブランドイメージ構築優先）',
        '「家電量販店で売っているドライヤー」ではなく「美容室で売っているドライヤー」',
      ],
    },
  },
  {
    id: 3,
    name: '製品多角化・国内市場強化',
    period: '2020-2021',
    overview: 'コロナ禍を追い風に、新カテゴリ製品で国内市場を開拓',
    products: [
      { date: '2020年4月', name: 'ドライヤー・アイロン販路拡大', result: 'EC、百貨店、一部家電量販店へ' },
      { date: '2020年8月', name: 'ReFa FINE BUBBLE S', price: '30,000円', result: 'コロナ禍でヒット' },
      { date: '2021年', name: 'ヘアケアラインナップ拡充', result: 'カールアイロン等追加' },
    ],
    showerSuccess: [
      'コロナ禍で在宅時間増加',
      '清潔志向の高まり',
      '「自宅でサロン体験」ニーズにマッチ',
    ],
    promotionShift: {
      before: ['口コミ・PR依存', '芸能人の自発使用', 'インバウンド重視'],
      after: ['プロユース訴求', '美容師との共同開発ストーリー', '国内EC強化'],
    },
    newConcept: 'サロン帰りの"レア髪"を自宅で再現',
    results: [
      'ReFa売上: 136億円（2019年） → 219億円（2020年、+61%）',
      '国内EC売上: 大幅増加',
      '美容室での好評: 一部店舗で入荷直後に欠品状態',
    ],
  },
  {
    id: 4,
    name: '体験型・インフルエンサー戦略',
    period: '2022-2023',
    overview: 'BtoBtoCモデルとインフルエンサーマーケティングで顧客接点を拡大',
    btoBtoC: {
      facilities: '約2,600施設',
      hotels: [
        '三井ガーデンホテルズ',
        'ダイワロイヤルホテル',
        'リーガロイヤルホテル',
        '京王プレッソイン',
        '東京ベイ有明ワシントンホテル',
      ],
      purpose: [
        '「購入前に試したい」ニーズに応える',
        '宿泊施設を"ショールーム"として活用',
        '体験後のECサイト購入誘導',
      ],
    },
    influencerStrategy: {
      differences: [
        { aspect: '重視指標', traditional: 'フォロワー数', refa: '熱量と共感性' },
        { aspect: 'ターゲット', traditional: '一般層', refa: '特定セグメント' },
        { aspect: '訴求方法', traditional: '製品スペック', refa: '使用シーン・体験' },
      ],
      targetSegments: ['プレ花嫁（結婚式前のヘアケア需要）', '産後ママ（時短美容需要）'],
    },
    results: [
      '2023年: ドライヤー累計50万台突破',
      '2023年: シャワーヘッド累計200万本突破',
      'ReFa売上: 422億円（+43%）',
    ],
  },
  {
    id: 5,
    name: 'マスマーケティング復活',
    period: '2024-現在',
    overview: 'ブランド価値確立後、満を持してマスマーケティングを展開',
    ambassador: {
      date: '2024年2月',
      talents: [
        { name: '榮倉奈々', comment: '世界的に支持されているReFaのアンバサダーということで、とても光栄で嬉しいです' },
        { name: '山田裕貴', comment: '日頃から愛用しているReFaのアンバサダーに就任できたことをとても嬉しく思っています' },
      ],
      campaigns: [
        { talent: '榮倉奈々', title: '「まるでトリートメント」篇' },
        { talent: '山田裕貴', title: '「乾かすその先へ」篇' },
      ],
      catchcopy: 'ドライヤーで、髪はもっと美しくなれる',
    },
    channelStrategy: {
      timeline: [
        { year: 2019, channel: '美容室限定', purpose: 'プロユースブランディング' },
        { year: 2020, channel: '百貨店・EC追加', purpose: '高級感維持' },
        { year: 2024, channel: '家電量販店本格展開', purpose: 'マス拡大' },
      ],
      strategicPatience: '「美容室や百貨店で売っているドライヤー」という印象が顧客に定着するまでは、たとえ売れても家電量販店などには絶対に展開しないと決めていた',
    },
    newProducts: {
      date: '2024年8月',
      series: 'ReFa MILK PROTEIN',
      items: ['SHAMPOO', 'TREATMENT', 'OUTBATH TREATMENT'],
      strategicIntent: '機器売り（単発）からリピート収益モデルへ',
    },
    results: [
      '2025年: シャワーヘッド累計300万本突破',
      'ReFa売上: 728億円（+42%）、過去最高',
      '2026年9月期見通し: 売上高1,200億円、営業利益130億円',
    ],
  },
]

// 製品ポートフォリオ
export const productPortfolio = [
  {
    category: '美顔器',
    startYear: 2009,
    mainProduct: 'ReFa CARAT',
    priceRange: '2-3万円',
    achievement: '累計1,000万本（2018年8月）',
    strategy: '単一カテゴリ集中',
  },
  {
    category: 'ヘアケア機器',
    startYear: 2019,
    mainProduct: 'ドライヤー、アイロン',
    priceRange: '2-4万円',
    achievement: '累計50万台（2023年1月）',
    strategy: 'カテゴリ拡大',
  },
  {
    category: 'バス用品',
    startYear: 2020,
    mainProduct: 'シャワーヘッド',
    priceRange: '3万円',
    achievement: '累計300万本（2025年）',
    strategy: '生活導線へ拡大',
  },
  {
    category: 'ヘアケアコスメ',
    startYear: 2024,
    mainProduct: 'シャンプー、トリートメント',
    priceRange: '数千円',
    achievement: '順調な売れ行き',
    strategy: '消耗品でリピート化',
  },
]

// チャネル展開の段階
export const channelTimeline = [
  {
    phase: 1,
    year: 2019,
    channel: '美容室限定',
    purpose: 'プロユースブランディング',
    result: 'ブランド信頼構築',
    adoptionLayer: 'イノベーター',
  },
  {
    phase: 2,
    year: 2020,
    channel: '百貨店・EC追加',
    purpose: '高級感維持 + コロナ対応',
    result: 'EC売上大幅増',
    adoptionLayer: 'アーリーアダプター',
  },
  {
    phase: 3,
    year: '2019-2023',
    channel: 'ホテルBtoBtoC',
    purpose: '体験機会創出',
    result: '2,600施設導入',
    adoptionLayer: 'アーリーマジョリティ',
  },
  {
    phase: 4,
    year: 2024,
    channel: '家電量販店解禁',
    purpose: 'マス拡大',
    result: '売上728億円達成',
    adoptionLayer: 'レイトマジョリティ',
  },
]

// プロモーション手法の変遷
export const promotionEvolution = [
  { period: '〜2018年', method: '口コミ・PR', feature: '芸能人自発使用、美容誌', touchpoint: '雑誌、@cosme、TV番組' },
  { period: '2019年〜', method: 'BtoBtoC', feature: 'サロン・ホテルでの体験', touchpoint: '美容室、ホテル客室' },
  { period: '2022年〜', method: 'インフルエンサー', feature: '熱量・共感重視', touchpoint: 'Instagram、YouTube' },
  { period: '2024年〜', method: 'マスCM', feature: 'タレントアンバサダー', touchpoint: 'TV、デジタル広告' },
]

// 成功要因サマリー
export const successFactors = [
  {
    factor: '危機を転機に変えた',
    detail: 'インバウンド崩壊を製品多角化のきっかけに',
  },
  {
    factor: 'ブランド価値を守った',
    detail: '短期売上より長期ブランド価値を優先',
  },
  {
    factor: '体験を重視した',
    detail: 'BtoBtoCで「使ってもらう」機会を創出',
  },
  {
    factor: '段階的に拡大した',
    detail: '5年かけてチャネルを慎重に展開',
  },
]

// イノベーター理論の普及曲線データ（グラフ描画用）
export const adoptionCurveData = Array.from({ length: 100 }, (_, i) => {
  const x = i
  // 正規分布に近い釣り鐘型を生成
  const y = Math.exp(-Math.pow((x - 50) / 20, 2) / 2) * 100

  let layer = ''
  let color = '#6B7280'
  if (x <= 2.5) {
    layer = 'イノベーター'
    color = '#3B82F6'
  } else if (x <= 16) {
    layer = 'アーリーアダプター'
    color = '#10B981'
  } else if (x <= 50) {
    layer = 'アーリーマジョリティ'
    color = '#F59E0B'
  } else if (x <= 84) {
    layer = 'レイトマジョリティ'
    color = '#EF4444'
  } else {
    layer = 'ラガード'
    color = '#6B7280'
  }

  return { x, y, layer, color }
})

// セグメント別業績データ（FY2022-FY2025）
export const segmentPerformance = {
  segments: [
    {
      id: 'direct',
      name: 'ダイレクト',
      description: 'BtoC直販（EC、通販）',
      role: '利益の柱（利益率最高）',
      color: '#3B82F6',
    },
    {
      id: 'professional',
      name: 'プロフェッショナル',
      description: 'BtoB（美容サロン、エステ）',
      role: 'ブランド構築・認知拡大',
      color: '#10B981',
    },
    {
      id: 'retail',
      name: 'リテールストア',
      description: '店舗販売（百貨店、家電量販店）',
      role: 'マス層へのリーチ',
      color: '#F59E0B',
    },
  ],
  revenue: [
    { year: 'FY2022', direct: 228.46, professional: 116.66, retail: 110.86, total: 455.98 },
    { year: 'FY2023', direct: 269.97, professional: 154.21, retail: 146.65, total: 570.83 },
    { year: 'FY2024', direct: 291.81, professional: 191.90, retail: 195.17, total: 678.88 },
    { year: 'FY2025', direct: 377.91, professional: 247.57, retail: 303.87, total: 929.35 },
  ],
  profit: [
    { year: 'FY2022', direct: 60.89, professional: 18.89, retail: 7.51, total: 87.29 },
    { year: 'FY2023', direct: 71.84, professional: 16.82, retail: 14.88, total: 103.54 },
    { year: 'FY2024', direct: 65.98, professional: 25.38, retail: 20.82, total: 112.18 },
    { year: 'FY2025', direct: 106.25, professional: 44.07, retail: 36.08, total: 186.40 },
  ],
  insights: [
    {
      title: 'ダイレクトが利益の柱',
      detail: '全利益の約57%（106億円/186億円）を占める。EC・通販は利益率が高く、成長期に最も貢献',
      highlight: '57%',
    },
    {
      title: 'プロフェッショナルは先行投資→回収モデル',
      detail: 'FY2023に利益△11%（サロン拡充投資）→FY2024-25で利益急回復（+51%→+74%）',
      highlight: '+74%',
    },
    {
      title: 'リテールストアが急成長',
      detail: 'FY2023:利益+98%（コロナ後回復）、FY2025:売上+56%（家電量販店本格展開）。「戦略的忍耐」の成果',
      highlight: '+56%',
    },
  ],
}

// 年度別決算詳細
export const fiscalYearDetails = {
  fy2022: {
    year: 'FY2022',
    refaRevenue: 296,
    yoy: '+35%',
    highlights: [
      { title: 'ヘアケアシリーズ', detail: '導入後わずか3年で年間売上100億円以上の柱に成長' },
      { title: 'シャワーヘッド', detail: '導入後わずか2年で年間売上100億円以上の柱に成長' },
      { title: '百貨店戦略', detail: 'ヘアケア特化型カウンターに改装、インバウンド売上に頼らず全店黒字化達成' },
    ],
  },
  fy2023: {
    year: 'FY2023',
    refaRevenue: 422,
    yoy: '+43%',
    highlights: [
      { title: 'ダイレクト（BtoC）', detail: '売上270億円（+18%）、経常利益72億円（+18%）' },
      { title: 'プロフェッショナル（BtoB）', detail: '売上154億円（+32%）、経常利益17億円（△11%）- サロン拡充に先行投資' },
      { title: 'リテールストア', detail: '売上147億円（+32%）、経常利益15億円（+98%）- コロナ後のリアル店舗回帰' },
    ],
    strategicPoint: 'プロフェッショナルへの先行投資が将来の売上成長への種まき',
  },
  fy2024: {
    year: 'FY2024',
    refaRevenue: 514,
    yoy: '+22%',
    highlights: [
      { title: 'ヘアケア売上', detail: '前年比+40%超の大幅増収を継続' },
      { title: '主力新製品', detail: 'DRYER SMART W、HEART COMB Airaが好調' },
      { title: '国内チャネル', detail: '美容サロン・百貨店の店舗販売が前年比+20%超' },
      { title: 'リピート商品', detail: 'ミルクプロテインシリーズの第一弾が好調にスタート' },
    ],
    brandComposition: 'ReFa約75%、SIXPAD約10-15%',
  },
  fy2025: {
    year: 'FY2025',
    refaRevenue: 728,
    yoy: '+42%',
    highlights: [
      { title: 'ダイレクト（BtoC）', detail: '売上378億円（+30%）、経常利益106億円（+61%）' },
      { title: 'プロフェッショナル（BtoB）', detail: '売上248億円（+29%）、経常利益44億円（+74%）- 投資が回収フェーズに' },
      { title: 'リテールストア', detail: '売上304億円（+56%）、経常利益36億円（+73%）- 家電量販店本格展開' },
    ],
    keyAchievements: [
      { title: 'リピート商品', detail: '売上の約10%を占める（前年から2倍超の成長）', highlight: '10%' },
      { title: '営業利益率', detail: '5%→11%に大幅改善（売上成長に対して販管費を抑制）', highlight: '11%' },
      { title: '全セグメント', detail: '利益+60%以上を達成', highlight: '+60%' },
    ],
  },
}

// FY2025投資内訳
export const investmentBreakdown = [
  {
    item: 'マーケティング費',
    amount: 134.64,
    yoy: '+12%',
    purpose: '売上+37%に対して効率的な投資',
    color: '#EF4444',
  },
  {
    item: '研究開発費',
    amount: 34.23,
    yoy: '+53%',
    purpose: '新商品開発への積極投資',
    color: '#3B82F6',
  },
  {
    item: '人件費',
    amount: 110.38,
    yoy: '+22%',
    purpose: '会社成長に伴う人材増強',
    color: '#10B981',
  },
]

// ReFa GINZA 旗艦店データ
export const refaGinza = {
  openDate: '2025年11月15日',
  location: '銀座',
  concept: 'ReFa Amazing Luxury',
  target: '10代から3世代、3,000円〜数十万円の幅広い商品',
  creativePartner: 'GWENAEL NICOLAS（建築家）',
  theme: '訪れた全ての人の心が躍る、賑やかなラグジュアリー',
  strategicIntent: '単なる販売拠点ではなくブランド体験の発信地',
}

// ブランド成長戦略サイクル
export const brandGrowthCycle = {
  steps: [
    { id: 1, name: 'ブランド価値の向上', status: 'current', description: 'ReFa GINZA等の旗艦店投資' },
    { id: 2, name: 'カテゴリーの拡大', status: 'completed', description: 'ローラー→ヘアケア→バス→コスメ' },
    { id: 3, name: '販路の拡大', status: 'completed', description: '美容室→百貨店→家電量販店' },
    { id: 4, name: 'リピートビジネスの推進', status: 'completed', description: 'ミルクプロテインシリーズ（売上の約10%）' },
  ],
  interpretation: 'サイクルの起点「ブランド価値の向上」に再投資。収穫期ではなく次の成長サイクルへの種蒔き',
}

// 今後の展望
export const futureOutlook = {
  title: '「収穫」ではなく「再ブランディング」',
  summary: 'FY2025で売上728億円、営業利益率11%を達成したReFaは、一見「収穫期」に入ったように見える。しかし、MTGの戦略を分析すると、次の成長サイクルに向けた「再ブランディング」フェーズに入っている。',
  evidence: [
    {
      title: 'ReFa GINZA への大型投資',
      detail: '2025年11月に銀座に旗艦店をオープン。世界的クリエイターを起用し、"ReFa Amazing Luxury"をコンセプトとしたブランド体験の発信地',
      icon: 'building',
    },
    {
      title: '研究開発費+53%増',
      detail: 'FY2025の研究開発費は34.23億円で前年比+53%増。収穫期なら投資を抑えるはずが、むしろ積極投資',
      icon: 'lab',
    },
    {
      title: 'ブランド成長戦略サイクルの起点回帰',
      detail: '「ブランド価値の向上 → カテゴリー拡大 → 販路拡大 → リピート化」のサイクルにおいて、販路拡大・リピート化を達成した今、再び起点に戻っている',
      icon: 'cycle',
    },
  ],
  conclusion: 'ReFaの戦略は「成長→収穫→衰退」という一方通行ではなく、循環型の持続成長モデルを採用。これは単なる美容家電ブランドを超え、ラグジュアリービューティーブランドとしてのポジション確立を目指している。',
}
