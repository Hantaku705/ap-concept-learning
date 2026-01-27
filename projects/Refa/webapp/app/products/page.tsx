'use client'

import { Navigation } from '@/components/Navigation'
import { productPortfolio } from '@/data/report-data'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const categoryColors = ['#6B7280', '#3B82F6', '#10B981', '#F59E0B']

// タイムラインデータ
const timelineData = [
  { year: 2009, category: '美顔器', event: 'ReFa CARAT発売', type: 'launch' },
  { year: 2014, category: '美顔器', event: '累計300万本', type: 'milestone' },
  { year: 2017, category: '美顔器', event: '累計700万本', type: 'milestone' },
  { year: 2018, category: '美顔器', event: '累計1,000万本突破', type: 'milestone' },
  { year: 2019, category: 'ヘアケア', event: 'BEAUTECH発売（ドライヤー）', type: 'launch' },
  { year: 2020, category: 'バス用品', event: 'FINE BUBBLE S発売', type: 'launch' },
  { year: 2023, category: 'ヘアケア', event: 'ドライヤー累計50万台', type: 'milestone' },
  { year: 2023, category: 'バス用品', event: 'シャワー累計200万本', type: 'milestone' },
  { year: 2024, category: 'コスメ', event: 'MILK PROTEIN発売', type: 'launch' },
  { year: 2025, category: 'バス用品', event: 'シャワー累計300万本', type: 'milestone' },
]

// カテゴリ別売上構成（推定）
const revenueByCategory = [
  { category: '美顔器', revenue: 150, color: '#6B7280' },
  { category: 'ヘアケア機器', revenue: 250, color: '#3B82F6' },
  { category: 'シャワーヘッド', revenue: 280, color: '#10B981' },
  { category: 'その他', revenue: 48, color: '#F59E0B' },
]

export default function ProductsPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">製品ポートフォリオ分析</h1>
        <p className="text-gray-500 mb-6">
          単一カテゴリ集中から多角化、そしてリピート収益モデルへ
        </p>

        {/* カテゴリ拡大の軌跡 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">カテゴリ拡大の軌跡</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {productPortfolio.map((product, index) => (
              <div
                key={product.category}
                className="bg-white rounded-xl shadow-sm p-5 border-l-4"
                style={{ borderColor: categoryColors[index] }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: categoryColors[index] }}
                  />
                  <span className="text-sm text-gray-500">{product.startYear}年〜</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{product.category}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.mainProduct}</p>
                <p className="text-sm font-medium" style={{ color: categoryColors[index] }}>
                  {product.priceRange}
                </p>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500">実績</p>
                  <p className="text-sm font-bold text-gray-800">{product.achievement}</p>
                </div>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {product.strategy}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 売上構成グラフ */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              カテゴリ別売上構成（2025年、推定）
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueByCategory}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tickFormatter={(v) => `${v}億円`} />
                  <YAxis type="category" dataKey="category" />
                  <Tooltip
                    formatter={(value) => [`${value as number}億円`, '売上']}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                    {revenueByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              ※ 売上構成は公開情報に基づく推定値
            </p>
          </div>
        </section>

        {/* タイムライン */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">製品展開タイムライン</h2>
            <div className="relative">
              {/* 縦線 */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

              <div className="space-y-4">
                {timelineData.map((item, index) => {
                  const categoryIndex = productPortfolio.findIndex(
                    (p) => p.category === item.category ||
                    (item.category === 'ヘアケア' && p.category === 'ヘアケア機器') ||
                    (item.category === 'コスメ' && p.category === 'ヘアケアコスメ')
                  )
                  const color = categoryColors[categoryIndex] || '#6B7280'

                  return (
                    <div key={index} className="flex items-start gap-4 relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold z-10 ${
                          item.type === 'launch' ? '' : 'opacity-70'
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {item.type === 'launch' ? '★' : '●'}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{item.year}年</span>
                          <span
                            className="px-2 py-0.5 rounded text-xs text-white"
                            style={{ backgroundColor: color }}
                          >
                            {item.category}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-1">{item.event}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ポートフォリオ戦略の評価 */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">ポートフォリオ戦略の成功要因</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <h3 className="font-bold mb-2">1. 製品間シナジー</h3>
                <p className="text-sm text-blue-100">
                  美容室での体験がヘアケア全般への信頼につながった
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <h3 className="font-bold mb-2">2. 生活導線への拡大</h3>
                <p className="text-sm text-blue-100">
                  顔 → 髪 → 全身（シャワー）と自然な拡張
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <h3 className="font-bold mb-2">3. リピート収益化</h3>
                <p className="text-sm text-blue-100">
                  機器（単発） → 消耗品（シャンプー等）で継続収益
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 累計実績 */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">累計実績サマリー</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-100 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-gray-800">1,000万本</p>
              <p className="text-gray-500">美顔ローラー累計</p>
              <p className="text-xs text-gray-400 mt-1">2018年8月達成</p>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-blue-700">50万台</p>
              <p className="text-blue-600">ドライヤー関連累計</p>
              <p className="text-xs text-blue-400 mt-1">2023年1月達成</p>
            </div>
            <div className="bg-green-100 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-green-700">300万本</p>
              <p className="text-green-600">シャワーヘッド累計</p>
              <p className="text-xs text-green-400 mt-1">2025年達成</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
