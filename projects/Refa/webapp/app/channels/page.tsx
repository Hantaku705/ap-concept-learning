'use client'

import { Navigation } from '@/components/Navigation'
import { channelTimeline, adoptionPhases, promotionEvolution, segmentPerformance } from '@/data/report-data'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const channelColors = {
  'イノベーター': '#3B82F6',
  'アーリーアダプター': '#10B981',
  'アーリーマジョリティ': '#F59E0B',
  'レイトマジョリティ': '#EF4444',
}

export default function ChannelsPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">チャネル戦略分析</h1>
        <p className="text-gray-500 mb-6">
          5年かけた「戦略的忍耐」による段階的チャネル解禁
        </p>

        {/* 戦略的忍耐の引用 */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white">
            <p className="text-lg italic mb-4">
              &ldquo;美容室や百貨店で売っているドライヤーという印象が顧客に定着するまでは、
              たとえ売れても家電量販店などには絶対に展開しないと決めていた&rdquo;
            </p>
            <p className="text-gray-400 text-sm text-right">
              — 松下社長（2019年当時）
            </p>
          </div>
        </section>

        {/* チャネル展開 × イノベーター理論 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            段階的チャネル展開 × イノベーター理論
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Phase</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">時期</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">チャネル</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">目的</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">結果</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">普及層</th>
                  </tr>
                </thead>
                <tbody>
                  {channelTimeline.map((ch, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold">
                          {ch.phase}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">{ch.year}</td>
                      <td className="py-3 px-4">{ch.channel}</td>
                      <td className="py-3 px-4 text-gray-600">{ch.purpose}</td>
                      <td className="py-3 px-4 text-green-600">{ch.result}</td>
                      <td className="py-3 px-4">
                        <span
                          className="px-2 py-1 rounded text-white text-sm"
                          style={{
                            backgroundColor:
                              channelColors[ch.adoptionLayer as keyof typeof channelColors] ||
                              '#6B7280',
                          }}
                        >
                          {ch.adoptionLayer}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ビジュアルタイムライン */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">チャネル展開フロー</h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {channelTimeline.map((ch, index) => (
                <div key={index} className="flex-1 relative">
                  {/* 矢印 */}
                  {index < channelTimeline.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-gray-300 text-2xl z-10">
                      →
                    </div>
                  )}
                  <div
                    className="h-full p-4 rounded-lg border-2"
                    style={{
                      borderColor:
                        channelColors[ch.adoptionLayer as keyof typeof channelColors] ||
                        '#6B7280',
                      backgroundColor:
                        `${channelColors[ch.adoptionLayer as keyof typeof channelColors]}10` ||
                        '#6B728010',
                    }}
                  >
                    <div className="text-center mb-3">
                      <span className="text-2xl font-bold">{ch.year}</span>
                    </div>
                    <h3 className="font-bold text-center mb-2">{ch.channel}</h3>
                    <div className="text-center">
                      <span
                        className="inline-block px-2 py-1 rounded text-white text-xs"
                        style={{
                          backgroundColor:
                            channelColors[ch.adoptionLayer as keyof typeof channelColors] ||
                            '#6B7280',
                        }}
                      >
                        {ch.adoptionLayer}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 text-center mt-3">{ch.purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 従来のアプローチとの比較 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            従来の美容家電メーカー vs ReFa
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="font-bold text-gray-700 mb-4">従来の美容家電メーカー</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>発売直後から家電量販店で販売</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>価格競争に巻き込まれる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>ブランドイメージが「家電」に固定</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-blue-700 mb-4">ReFaのアプローチ</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>5年間は美容室・百貨店限定</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>「美容室で売っているドライヤー」というポジショニング確立</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>ブランド価値が定着してからマス展開</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* プロモーション手法の変遷 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">プロモーション手法の変遷</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">時期</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">手法</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">特徴</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">タッチポイント</th>
                  </tr>
                </thead>
                <tbody>
                  {promotionEvolution.map((promo, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{promo.period}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                          {promo.method}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{promo.feature}</td>
                      <td className="py-3 px-4 text-gray-500 text-sm">{promo.touchpoint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* セグメント別戦略分析 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">セグメント別戦略分析</h2>
          <p className="text-gray-500 mb-4">
            3つの販売チャネルがそれぞれ異なる役割を担い、相互に補完しながら成長
          </p>

          {/* 3セグメントの役割カード */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {segmentPerformance.segments.map((seg) => (
              <div
                key={seg.id}
                className="bg-white rounded-xl shadow-sm p-5 border-l-4"
                style={{ borderColor: seg.color }}
              >
                <h3 className="font-bold text-lg mb-2" style={{ color: seg.color }}>
                  {seg.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{seg.description}</p>
                <p className="text-sm font-medium" style={{ color: seg.color }}>
                  {seg.role}
                </p>
              </div>
            ))}
          </div>

          {/* 売上推移グラフ */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">セグメント別売上推移（億円）</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={segmentPerformance.revenue}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(v) => `${v}`} />
                  <Tooltip
                    formatter={(value) => [`${(value as number).toFixed(1)}億円`]}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="direct" name="ダイレクト" fill="#3B82F6" stackId="a" />
                  <Bar dataKey="professional" name="プロフェッショナル" fill="#10B981" stackId="a" />
                  <Bar dataKey="retail" name="リテールストア" fill="#F59E0B" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 経常利益推移グラフ */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">セグメント別経常利益推移（億円）</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={segmentPerformance.profit}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(v) => `${v}`} />
                  <Tooltip
                    formatter={(value) => [`${(value as number).toFixed(1)}億円`]}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="direct" name="ダイレクト" fill="#3B82F6" />
                  <Bar dataKey="professional" name="プロフェッショナル" fill="#10B981" />
                  <Bar dataKey="retail" name="リテールストア" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 戦略的インサイト */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
            <h3 className="font-bold text-lg mb-4">戦略的インサイト</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {segmentPerformance.insights.map((insight, index) => (
                <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-yellow-300">{insight.highlight}</span>
                  </div>
                  <h4 className="font-bold mb-1">{insight.title}</h4>
                  <p className="text-sm text-purple-100">{insight.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* イノベーター理論との対応 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            イノベーター理論との完全対応
          </h2>
          <div className="space-y-4">
            {adoptionPhases.map((phase) => (
              <div
                key={phase.id}
                className={`p-4 rounded-lg border-l-4 ${
                  phase.isCurrent ? 'ring-2 ring-offset-2 ring-red-500' : ''
                }`}
                style={{
                  borderColor: phase.color,
                  backgroundColor: `${phase.color}10`,
                }}
              >
                <div className="flex flex-wrap items-center gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: phase.color }}
                    />
                    <span className="font-bold">{phase.layer}</span>
                    <span className="text-gray-500">({phase.percentage}%)</span>
                  </div>
                  <span className="text-gray-600">{phase.period}</span>
                  {phase.isCurrent && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded font-bold">
                      ★ ReFa現在地
                    </span>
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">ReFaフェーズ:</span>
                    <span className="ml-2 font-medium">{phase.refaPhase}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">チャネル:</span>
                    <span className="ml-2">{phase.channel}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">戦略:</span>
                    <span className="ml-2">{phase.strategy}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-2">{phase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* まとめ */}
        <section>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">チャネル戦略の成功ポイント</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">ブランドファースト</h3>
                <p className="text-green-100 text-sm">
                  短期的な売上機会よりも、長期的なブランド価値構築を優先した
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">段階的解禁</h3>
                <p className="text-green-100 text-sm">
                  各層への浸透を確認してから次のチャネルへ展開
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">体験の場の創出</h3>
                <p className="text-green-100 text-sm">
                  ホテルBtoBtoCで「使ってもらう」機会を2,600施設で展開
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">5年の忍耐</h3>
                <p className="text-green-100 text-sm">
                  2019年のBEAUTECH発売から2024年の家電量販店解禁まで5年間待った
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
