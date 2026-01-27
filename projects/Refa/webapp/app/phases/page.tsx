'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { phases, fiscalYearDetails, investmentBreakdown, refaGinza, brandGrowthCycle } from '@/data/report-data'
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

const tabColors = [
  { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-700' },
  { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-700' },
  { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-700' },
  { bg: 'bg-amber-100', border: 'border-amber-400', text: 'text-amber-700' },
  { bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-700' },
]

function PhaseContent() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(initialTab ? parseInt(initialTab) : 0)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) setActiveTab(parseInt(tab))
  }, [searchParams])

  const phase = phases[activeTab]
  const colors = tabColors[activeTab]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        5つのフェーズ詳細
      </h1>

      {/* タブ */}
      <div className="flex flex-wrap gap-2 mb-6">
        {phases.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === i
                ? `${tabColors[i].bg} ${tabColors[i].text} ring-2 ring-offset-1 ${tabColors[i].border.replace('border-', 'ring-')}`
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="mr-1">{p.period}</span>
            <span className="hidden sm:inline">{p.name}</span>
          </button>
        ))}
      </div>

      {/* コンテンツ */}
      <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-6`}>
        <div className="mb-6">
          <span className="text-sm text-gray-500">{phase.period}</span>
          <h2 className={`text-2xl font-bold ${colors.text}`}>{phase.name}</h2>
          <p className="text-gray-700 mt-2">{phase.overview}</p>
        </div>

        {/* Phase 1: ローラー時代 */}
        {activeTab === 0 && (
          <div className="space-y-6">
            <Section title="製品">
              <div className="grid md:grid-cols-3 gap-4">
                {phase.products?.map((p, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="font-bold">{p.name}</p>
                    {'price' in p && <p className="text-sm text-gray-500">{p.price}</p>}
                    {'note' in p && <p className="text-xs text-gray-400">{p.note}</p>}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="プロモーション手法">
              <div className="space-y-2">
                {phase.promotion?.map((p, i) => (
                  <div key={i} className="flex gap-4 bg-white rounded-lg p-3">
                    <span className="font-medium text-gray-700 min-w-24">{p.method}</span>
                    <span className="text-gray-600">{p.detail}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="実績">
              <ul className="space-y-1">
                {phase.results?.map((r, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="この時期の特徴">
              <ul className="space-y-1">
                {phase.characteristics?.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-gray-400 rounded-full flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        )}

        {/* Phase 2: インバウンド崩壊 */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <Section title="危機の要因">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">要因</th>
                      <th className="text-left py-2 px-3">影響</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phase.crisisFactors?.map((f, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2 px-3 font-medium">{f.factor}</td>
                        <td className="py-2 px-3 text-red-600">{f.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="業績影響">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-500">売上高</p>
                  <p className="text-lg font-bold text-red-600">{phase.businessImpact?.revenueDrop}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-500">営業利益</p>
                  <p className="text-lg font-bold text-red-600">{phase.businessImpact?.profitDrop}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-500">ReFa影響</p>
                  <p className="text-sm text-gray-600">{phase.businessImpact?.refaImpact}</p>
                </div>
              </div>
            </Section>

            <Section title="戦略転換の決断">
              <p className="text-gray-500 mb-4">{phase.strategicTurn?.date}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {phase.strategicTurn?.products?.map((p, i) => (
                  <div key={i} className="bg-white rounded-lg p-4">
                    <p className="font-bold">{p.name}</p>
                    <p className="text-sm text-gray-500">{p.price}</p>
                    <p className="text-xs text-blue-600">{p.feature}</p>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-bold text-blue-800 mb-2">重要な戦略判断</p>
                <ul className="space-y-1">
                  {phase.strategicTurn?.keyDecisions?.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          </div>
        )}

        {/* Phase 3: 製品多角化 */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <Section title="製品拡大">
              <div className="space-y-3">
                {phase.products?.map((p, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 flex flex-wrap items-center gap-4">
                    {'date' in p && <span className="text-sm text-gray-500 min-w-24">{p.date}</span>}
                    <span className="font-bold">{p.name}</span>
                    {'price' in p && p.price && <span className="text-blue-600">{p.price}</span>}
                    {'result' in p && <span className="text-green-600">{p.result}</span>}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="シャワーヘッド成功の背景">
              <ul className="space-y-1">
                {phase.showerSuccess?.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="プロモーション手法の変化">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">従来（〜2019年）</p>
                  <ul className="space-y-1 text-sm">
                    {phase.promotionShift?.before?.map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 mb-2">新戦略（2020年〜）</p>
                  <ul className="space-y-1 text-sm">
                    {phase.promotionShift?.after?.map((a, i) => (
                      <li key={i}>• {a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            <div className="bg-blue-600 text-white rounded-lg p-4">
              <p className="font-bold">新コンセプト</p>
              <p className="text-xl">「{phase.newConcept}」</p>
            </div>

            <Section title="実績">
              <ul className="space-y-1">
                {phase.results?.map((r, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        )}

        {/* Phase 4: 体験型・インフルエンサー */}
        {activeTab === 3 && (
          <div className="space-y-6">
            <Section title="BtoBtoC事業（ホテル導入）">
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-2xl font-bold text-amber-600">
                  {phase.btoBtoC?.facilities}
                </p>
                <p className="text-gray-500">導入施設数</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-2">導入ホテル</p>
                  <ul className="space-y-1 text-sm">
                    {phase.btoBtoC?.hotels?.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">狙い</p>
                  <ul className="space-y-1 text-sm">
                    {phase.btoBtoC?.purpose?.map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="インフルエンサーマーケティング">
              <p className="font-medium mb-3">従来との違い</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-2 px-3">観点</th>
                      <th className="text-left py-2 px-3">従来</th>
                      <th className="text-left py-2 px-3 text-amber-700">ReFa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phase.influencerStrategy?.differences?.map((d, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2 px-3 font-medium">{d.aspect}</td>
                        <td className="py-2 px-3 text-gray-500">{d.traditional}</td>
                        <td className="py-2 px-3 text-amber-700 font-medium">{d.refa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-amber-50 rounded-lg p-4">
                <p className="font-medium mb-2">ターゲット特化</p>
                <ul className="space-y-1 text-sm">
                  {phase.influencerStrategy?.targetSegments?.map((t, i) => (
                    <li key={i}>• {t}</li>
                  ))}
                </ul>
              </div>
            </Section>

            <Section title="実績">
              <ul className="space-y-1">
                {phase.results?.map((r, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* FY2022-FY2023 決算詳細 */}
            <Section title="決算資料から見る成長の詳細">
              <div className="space-y-6">
                {/* FY2022 */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg">FY2022</h4>
                    <div className="text-right">
                      <span className="text-amber-600 font-bold text-xl">{fiscalYearDetails.fy2022.refaRevenue}億円</span>
                      <span className="text-green-600 text-sm ml-2">({fiscalYearDetails.fy2022.yoy})</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {fiscalYearDetails.fy2022.highlights.map((h, i) => (
                      <div key={i} className="bg-amber-50 rounded p-3">
                        <p className="font-medium text-sm">{h.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{h.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FY2023 */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg">FY2023</h4>
                    <div className="text-right">
                      <span className="text-amber-600 font-bold text-xl">{fiscalYearDetails.fy2023.refaRevenue}億円</span>
                      <span className="text-green-600 text-sm ml-2">({fiscalYearDetails.fy2023.yoy})</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3 mb-3">
                    {fiscalYearDetails.fy2023.highlights.map((h, i) => (
                      <div key={i} className="bg-amber-50 rounded p-3">
                        <p className="font-medium text-sm">{h.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{h.detail}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-amber-700 font-medium bg-amber-100 rounded p-2">
                    戦略的ポイント: {fiscalYearDetails.fy2023.strategicPoint}
                  </p>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* Phase 5: マスマーケティング */}
        {activeTab === 4 && (
          <div className="space-y-6">
            <Section title="タレントアンバサダー起用">
              <p className="text-gray-500 mb-4">{phase.ambassador?.date}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {phase.ambassador?.talents?.map((t, i) => (
                  <div key={i} className="bg-white rounded-lg p-4">
                    <p className="font-bold text-lg">{t.name}</p>
                    <p className="text-sm text-gray-600 mt-2">&ldquo;{t.comment}&rdquo;</p>
                  </div>
                ))}
              </div>
              <div className="bg-green-600 text-white rounded-lg p-4 text-center">
                <p className="text-sm">キャッチコピー</p>
                <p className="text-xl font-bold">「{phase.ambassador?.catchcopy}」</p>
              </div>
            </Section>

            <Section title="チャネル戦略の転換">
              <p className="font-medium mb-3">家電量販店への本格展開（発売から5年越しの解禁）</p>
              <div className="space-y-3">
                {phase.channelStrategy?.timeline?.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white rounded-lg p-3">
                    <span className="text-sm font-bold min-w-16">{t.year}年</span>
                    <span className="font-medium">{t.channel}</span>
                    <span className="text-gray-500 text-sm">→ {t.purpose}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4">
                <p className="font-bold text-green-800 mb-2">松下社長のコメント（2019年当時）</p>
                <p className="text-sm text-gray-700">&ldquo;{phase.channelStrategy?.strategicPatience}&rdquo;</p>
              </div>
            </Section>

            <Section title="新製品：消耗品への展開">
              <p className="text-gray-500 mb-2">{phase.newProducts?.date}</p>
              <p className="font-bold mb-3">{phase.newProducts?.series}シリーズ</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {phase.newProducts?.items?.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-white rounded-full text-sm">{item}</span>
                ))}
              </div>
              <p className="text-green-600 font-medium">
                戦略的意図: {phase.newProducts?.strategicIntent}
              </p>
            </Section>

            <Section title="実績">
              <ul className="space-y-1">
                {phase.results?.map((r, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className={i === phase.results!.length - 1 ? 'font-bold text-green-700' : ''}>{r}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* FY2024-FY2025 決算詳細 */}
            <Section title="決算資料から見る成長の詳細">
              <div className="space-y-6">
                {/* FY2024 */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg">FY2024</h4>
                    <div className="text-right">
                      <span className="text-green-600 font-bold text-xl">{fiscalYearDetails.fy2024.refaRevenue}億円</span>
                      <span className="text-green-600 text-sm ml-2">({fiscalYearDetails.fy2024.yoy})</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    {fiscalYearDetails.fy2024.highlights.map((h, i) => (
                      <div key={i} className="bg-green-50 rounded p-3">
                        <p className="font-medium text-sm">{h.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{h.detail}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded p-2">
                    ブランド構成: {fiscalYearDetails.fy2024.brandComposition}
                  </p>
                </div>

                {/* FY2025 */}
                <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-green-500">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg">FY2025</h4>
                      <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded">過去最高</span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-bold text-2xl">{fiscalYearDetails.fy2025.refaRevenue}億円</span>
                      <span className="text-green-600 text-sm ml-2">({fiscalYearDetails.fy2025.yoy})</span>
                    </div>
                  </div>

                  {/* セグメント別ハイライト */}
                  <div className="grid md:grid-cols-3 gap-3 mb-4">
                    {fiscalYearDetails.fy2025.highlights.map((h, i) => (
                      <div key={i} className="bg-green-50 rounded p-3">
                        <p className="font-medium text-sm">{h.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{h.detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* 主要成果 */}
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-4 text-white">
                    <p className="font-bold mb-2">特筆すべき成果</p>
                    <div className="grid md:grid-cols-3 gap-3">
                      {fiscalYearDetails.fy2025.keyAchievements.map((a, i) => (
                        <div key={i} className="bg-white/10 rounded p-2">
                          <span className="text-xl font-bold text-yellow-300">{a.highlight}</span>
                          <p className="text-xs mt-1">{a.title}</p>
                          <p className="text-xs text-green-100 mt-1">{a.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* FY2025 投資内訳 */}
            <Section title="FY2025 投資内訳">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={investmentBreakdown}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" tickFormatter={(v) => `${v}億円`} />
                      <YAxis type="category" dataKey="item" width={100} />
                      <Tooltip
                        formatter={(value) => [`${(value as number).toFixed(1)}億円`]}
                        contentStyle={{ borderRadius: '8px' }}
                      />
                      <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                        {investmentBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {investmentBreakdown.map((inv, i) => (
                    <div key={i} className="rounded p-3" style={{ backgroundColor: `${inv.color}15` }}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: inv.color }} />
                        <span className="font-medium">{inv.item}</span>
                      </div>
                      <p className="text-lg font-bold" style={{ color: inv.color }}>{inv.amount}億円</p>
                      <p className="text-xs text-gray-500">前年比 {inv.yoy}</p>
                      <p className="text-xs text-gray-600 mt-1">{inv.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* ReFa GINZA 旗艦店 */}
            <Section title="再ブランディングへの転換：ReFa GINZA">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-purple-900">ReFa GINZA 旗艦店</h4>
                    <p className="text-purple-600">{refaGinza.openDate} オープン</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">コンセプト</p>
                    <p className="font-bold text-lg text-purple-800">&ldquo;{refaGinza.concept}&rdquo;</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">ターゲット</p>
                    <p className="text-gray-800">{refaGinza.target}</p>
                  </div>
                </div>

                <div className="bg-white/60 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">クリエイティブ投資</p>
                  <p className="font-medium">{refaGinza.creativePartner}</p>
                  <p className="text-sm text-gray-600 mt-1">&ldquo;{refaGinza.theme}&rdquo;</p>
                </div>

                <div className="bg-purple-600 text-white rounded-lg p-4">
                  <p className="font-bold mb-1">戦略的意図</p>
                  <p className="text-purple-100">{refaGinza.strategicIntent}</p>
                </div>
              </div>
            </Section>

            {/* ブランド成長戦略サイクル */}
            <Section title="ブランド成長戦略サイクル">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {brandGrowthCycle.steps.map((step, i) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`px-4 py-2 rounded-lg text-sm ${
                        step.status === 'current'
                          ? 'bg-purple-600 text-white font-bold ring-2 ring-purple-300'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        <span className="mr-1">①②③④"[step.id - 1]</span>
                        {step.name}
                        {step.status === 'completed' && <span className="ml-1">✓</span>}
                      </div>
                      {i < brandGrowthCycle.steps.length - 1 && (
                        <svg className="w-6 h-6 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-4 gap-3 mb-4">
                  {brandGrowthCycle.steps.map((step) => (
                    <div key={step.id} className={`rounded-lg p-3 ${
                      step.status === 'current'
                        ? 'bg-purple-50 border-2 border-purple-400'
                        : 'bg-gray-50'
                    }`}>
                      <p className="font-medium text-sm">{step.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg p-4">
                  <p className="font-bold mb-1">戦略的解釈</p>
                  <p className="text-purple-100">{brandGrowthCycle.interpretation}</p>
                </div>
              </div>
            </Section>
          </div>
        )}
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-bold text-gray-800 mb-3">{title}</h3>
      {children}
    </div>
  )
}

export default function PhasesPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <PhaseContent />
      </Suspense>
    </>
  )
}
