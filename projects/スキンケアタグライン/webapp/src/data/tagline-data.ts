export interface SkincareTagline {
  brand: string
  maker: string
  price: number
  priceCategory: "petit" | "middle" | "luxury"
  catchcopy?: string
  tagline: string
  url?: string
  taglineFC: boolean
  taglineSourceUrl?: string
  catchcopyFC?: boolean
  catchcopySourceUrl?: string
  x: number // -5(成分・機能訴求) 〜 +5(体験・感性訴求)
  y: number // -5(ベーシック・日常ケア) 〜 +5(ラグジュアリー・特別感)
}

export const priceCategoryLabels: Record<string, string> = {
  petit: "プチプラ (~2,000円)",
  middle: "ミドル (2,000~5,000円)",
  luxury: "デパコス (5,000円~)",
}

export const priceCategoryColors: Record<string, string> = {
  petit: "#22c55e",
  middle: "#3b82f6",
  luxury: "#a855f7",
}

export const taglineData: SkincareTagline[] = [
  // ===== プチプラ (~2,000円) =====
  {
    brand: "ハトムギ化粧水",
    maker: "イミュ（ナチュリエ）",
    price: 715,
    priceCategory: "petit",
    tagline: "天然ハトムギエキス配合で、うるおい浸透・明るく透明感のある健やかな肌へ",
    url: "https://www.imju.jp/shop/g/g4903335695117/",
    taglineFC: false,
    x: -3,
    y: -4
  },
  {
    brand: "肌ラボ",
    maker: "ロート製薬",
    price: 900,
    priceCategory: "petit",
    tagline: "うるおいと、シンプルと、正直と。",
    catchcopy: "極潤",
    url: "https://jp.rohto.com/hadalabo/",
    taglineFC: false,
    x: -4,
    y: -3
  },
  {
    brand: "キュレル",
    maker: "花王",
    price: 1980,
    priceCategory: "petit",
    tagline: "乾燥性敏感肌を考えた、セラミドケア",
    url: "https://www.kao.co.jp/curel/",
    taglineFC: false,
    x: -3,
    y: -2
  },
  {
    brand: "なめらか本舗",
    maker: "常盤薬品工業",
    price: 1100,
    priceCategory: "petit",
    tagline: "豆乳発酵液でふっくらもちもち肌へ",
    catchcopy: "豆乳イソフラボン",
    url: "https://www.sana.jp/nameraka/",
    taglineFC: false,
    x: -2,
    y: -3
  },
  {
    brand: "ちふれ",
    maker: "ちふれ化粧品",
    price: 660,
    priceCategory: "petit",
    tagline: "正直品質、適正価格",
    url: "https://www.chifure.co.jp/",
    taglineFC: false,
    x: -4,
    y: -4
  },
  {
    brand: "無印良品",
    maker: "良品計画",
    price: 990,
    priceCategory: "petit",
    tagline: "素材を厳選し、シンプルに、肌にやさしいスキンケア",
    url: "https://www.muji.com/jp/ja/special-feature/healthandbeauty/skincare/",
    taglineFC: false,
    x: -2,
    y: -3
  },
  {
    brand: "メラノCC",
    maker: "ロート製薬",
    price: 1200,
    priceCategory: "petit",
    tagline: "ビタミンC誘導体でシミ対策",
    catchcopy: "肌のお守り",
    url: "https://jp.rohto.com/melanocc/",
    taglineFC: false,
    x: -4,
    y: -3
  },
  {
    brand: "ビオレ",
    maker: "花王",
    price: 600,
    priceCategory: "petit",
    tagline: "素肌にやさしい、弱酸性",
    url: "https://www.kao.co.jp/biore/",
    taglineFC: false,
    x: -3,
    y: -4
  },
  {
    brand: "ニベア",
    maker: "花王（ニベア花王）",
    price: 500,
    priceCategory: "petit",
    tagline: "素肌のうるおいを守り、肌を健康に保つ",
    url: "https://www.nivea.co.jp/",
    taglineFC: false,
    x: -2,
    y: -4
  },
  {
    brand: "ケシミン",
    maker: "小林製薬",
    price: 1320,
    priceCategory: "petit",
    tagline: "メラニンの生成を抑えて、しみ、そばかすを防ぐ",
    url: "https://www.kobayashi.co.jp/brand/kesimin/",
    taglineFC: false,
    x: -4,
    y: -3
  },
  {
    brand: "セタフィル",
    maker: "ガルデルマ",
    price: 1650,
    priceCategory: "petit",
    tagline: "皮膚科医推奨、敏感肌のための科学的スキンケア",
    url: "https://www.cetaphil.jp/",
    taglineFC: false,
    x: -3,
    y: -2
  },
  {
    brand: "セラヴィ",
    maker: "ロレアル",
    price: 1800,
    priceCategory: "petit",
    tagline: "皮膚科医と共同開発、全製品にセラミド配合",
    url: "https://www.cerave.com/",
    taglineFC: false,
    x: -3,
    y: -2
  },
  {
    brand: "ミノン",
    maker: "第一三共ヘルスケア",
    price: 1650,
    priceCategory: "petit",
    tagline: "9種の保潤アミノ酸で肌のバリア機能を守る",
    url: "https://www.daiichisankyo-hc.co.jp/site_minon/",
    taglineFC: false,
    x: -3,
    y: -2
  },

  // ===== ミドル (2,000~5,000円) =====
  {
    brand: "ONE BY KOSE",
    maker: "コーセー",
    price: 3850,
    priceCategory: "middle",
    tagline: "シミの核心に直効き、未来のシミまで防ぐ",
    catchcopy: "高効能ブランド",
    url: "https://www.kose.co.jp/onebykose/",
    taglineFC: false,
    x: -2,
    y: 1
  },
  {
    brand: "ELIXIR",
    maker: "資生堂",
    price: 3080,
    priceCategory: "middle",
    tagline: "年齢にとらわれることなく、一人ひとりの美しさを最大限に引き出す",
    catchcopy: "つや玉",
    url: "https://www.shiseido.co.jp/elixir/",
    taglineFC: false,
    x: 1,
    y: 2
  },
  {
    brand: "dプログラム",
    maker: "資生堂",
    price: 3740,
    priceCategory: "middle",
    tagline: "ときどき敏感肌を考えた、低刺激設計",
    url: "https://www.shiseido.co.jp/dp/",
    taglineFC: false,
    x: -2,
    y: 0
  },
  {
    brand: "ORBIS",
    maker: "オルビス",
    price: 2970,
    priceCategory: "middle",
    tagline: "スマートエイジング、自分らしく、きれいを磨く",
    url: "https://www.orbis.co.jp/",
    taglineFC: false,
    x: 0,
    y: 1
  },
  {
    brand: "アクアレーベル",
    maker: "資生堂",
    price: 1650,
    priceCategory: "middle",
    tagline: "あわただしい時も、自分らしく、きれいを磨きたい",
    url: "https://www.shiseido.co.jp/sw/c/aqualabel/",
    taglineFC: false,
    x: 0,
    y: -1
  },
  {
    brand: "SOFINA",
    maker: "花王",
    price: 3300,
    priceCategory: "middle",
    tagline: "いくつになっても、どんなときでも、美しくあり続けたい",
    url: "https://www.sofina.co.jp/",
    taglineFC: false,
    x: 1,
    y: 1
  },
  {
    brand: "FANCL",
    maker: "ファンケル",
    price: 3300,
    priceCategory: "middle",
    tagline: "無添加主義、肌本来の力を引き出す",
    url: "https://www.fancl.co.jp/",
    taglineFC: false,
    x: -1,
    y: 0
  },
  {
    brand: "雪肌精",
    maker: "コーセー",
    price: 5500,
    priceCategory: "middle",
    tagline: "雪のように透明感のあるきめ細やかな肌へ",
    url: "https://www.kose.co.jp/sekkisei/",
    taglineFC: false,
    x: 2,
    y: 2
  },
  {
    brand: "アベンヌ",
    maker: "ピエールファーブル",
    price: 2750,
    priceCategory: "middle",
    tagline: "敏感肌の駆け込み寺、アベンヌ温泉水のちから",
    url: "https://www.avene.co.jp/",
    taglineFC: false,
    x: -1,
    y: 1
  },
  {
    brand: "ラロッシュポゼ",
    maker: "ロレアル",
    price: 4180,
    priceCategory: "middle",
    tagline: "皮膚科学に基づくダーマコスメティック",
    url: "https://www.laroche-posay.jp/",
    taglineFC: false,
    x: -2,
    y: 1
  },
  {
    brand: "オバジ",
    maker: "ロート製薬",
    price: 4400,
    priceCategory: "middle",
    tagline: "活性型ビタミンCで、肌に新しい可能性を",
    url: "https://www.obagi.co.jp/",
    taglineFC: false,
    x: -1,
    y: 1
  },
  {
    brand: "ドクターシーラボ",
    maker: "ドクターシーラボ",
    price: 3960,
    priceCategory: "middle",
    tagline: "Simple, Result, Science - 肌トラブルに悩むすべての人々を救う",
    url: "https://www.ci-labo.com/",
    taglineFC: false,
    x: -1,
    y: 0
  },
  {
    brand: "米肌",
    maker: "コーセー",
    price: 5500,
    priceCategory: "middle",
    tagline: "自ら潤う肌を育てる、ライスパワー",
    url: "https://www.maihada.jp/",
    taglineFC: false,
    x: 0,
    y: 2
  },
  {
    brand: "アスタリフト",
    maker: "富士フイルム",
    price: 4180,
    priceCategory: "middle",
    tagline: "明日より美しい明日にしよう、実感できるエイジングケア",
    url: "https://www.fujifilm.com/jp/ja/consumer/skincare/astalift",
    taglineFC: false,
    x: 1,
    y: 2
  },
  {
    brand: "エトヴォス",
    maker: "エトヴォス",
    price: 4400,
    priceCategory: "middle",
    tagline: "納得のいくコスメで肌悩みに負けず、みんなでキレイになろう",
    catchcopy: "セラミドスキンケア",
    url: "https://etvos.com/",
    taglineFC: false,
    x: 0,
    y: 1
  },

  // ===== デパコス・高級 (5,000円~) =====
  {
    brand: "SK-II",
    maker: "P&G",
    price: 18700,
    priceCategory: "luxury",
    tagline: "すべての女性に透明感あふれるクリアな素肌を",
    catchcopy: "ピテラの力",
    url: "https://www.sk-ii.jp/",
    taglineFC: false,
    x: 2,
    y: 4
  },
  {
    brand: "クレ・ド・ポー ボーテ",
    maker: "資生堂",
    price: 16500,
    priceCategory: "luxury",
    tagline: "肌の知性を育み、輝き続ける肌へ",
    url: "https://www.cledepeau-beaute.com/",
    taglineFC: false,
    x: 3,
    y: 5
  },
  {
    brand: "コスメデコルテ",
    maker: "コーセー",
    price: 11000,
    priceCategory: "luxury",
    tagline: "内面の充実と外見の自信、どちらも最高の状態へ",
    catchcopy: "リポソーム技術",
    url: "https://www.decorte.com/",
    taglineFC: false,
    x: 2,
    y: 4
  },
  {
    brand: "IPSA",
    maker: "資生堂",
    price: 6050,
    priceCategory: "luxury",
    tagline: "自ら、シンプルに、肌本来の力を引き出す",
    url: "https://www.ipsa.co.jp/",
    taglineFC: false,
    x: -1,
    y: 3
  },
  {
    brand: "アルビオン",
    maker: "アルビオン",
    price: 5500,
    priceCategory: "luxury",
    tagline: "素肌と生きる。透明感のあるしなやかな肌を",
    url: "https://www.albion.co.jp/",
    taglineFC: false,
    x: 2,
    y: 3
  },
  {
    brand: "イグニス",
    maker: "アルビオン",
    price: 6050,
    priceCategory: "luxury",
    tagline: "点火する、喚起する。白神の植物の力で美しさを呼び覚ます",
    url: "https://www.ignis.jp/",
    taglineFC: false,
    x: 3,
    y: 3
  },
  {
    brand: "POLA B.A",
    maker: "ポーラ",
    price: 13200,
    priceCategory: "luxury",
    tagline: "Science. Art. 最高峰エイジングケア",
    url: "https://www.pola.co.jp/",
    taglineFC: false,
    x: 1,
    y: 4
  },
  {
    brand: "クリニーク",
    maker: "エスティローダー",
    price: 7700,
    priceCategory: "luxury",
    tagline: "美しい肌は自分で創りだせる、皮膚科学に基づくシンプルケア",
    url: "https://www.clinique.jp/",
    taglineFC: false,
    x: -1,
    y: 3
  },
  {
    brand: "エスティローダー",
    maker: "エスティローダー",
    price: 19800,
    priceCategory: "luxury",
    tagline: "最新テクノロジーで、本質的なエイジングケアを",
    url: "https://www.esteelauder.jp/",
    taglineFC: false,
    x: 2,
    y: 5
  },
  {
    brand: "ランコム",
    maker: "ロレアル",
    price: 8800,
    priceCategory: "luxury",
    tagline: "幸福をもたらすフランス発、先端科学と感性の融合",
    url: "https://www.lancome.jp/",
    taglineFC: false,
    x: 3,
    y: 4
  },
  {
    brand: "シャネル",
    maker: "シャネル",
    price: 12100,
    priceCategory: "luxury",
    tagline: "植物カメリアの力で、肌本来の輝きを取り戻す",
    catchcopy: "N°1 ドゥ シャネル",
    url: "https://www.chanel.com/ja_JP/fragrance-beauty/skincare.html",
    taglineFC: false,
    x: 4,
    y: 5
  },
  {
    brand: "ディオール",
    maker: "LVMH",
    price: 14300,
    priceCategory: "luxury",
    tagline: "ハイファッションから生まれた、ラグジュアリーサイエンス",
    url: "https://www.dior.com/ja_jp/beauty/skincare",
    taglineFC: false,
    x: 4,
    y: 5
  },
]
