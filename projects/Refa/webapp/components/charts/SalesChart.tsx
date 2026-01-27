'use client'

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { mtgPerformance, refaPerformance } from '@/data/report-data'

// データを結合
const combinedData = mtgPerformance.map((mtg, i) => ({
  year: mtg.year,
  mtgRevenue: mtg.revenue,
  mtgProfit: mtg.profit,
  refaRevenue: refaPerformance[i].revenue,
  refaRatio: refaPerformance[i].ratio,
  note: mtg.note,
}))

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
    dataKey: string
  }>
  label?: number
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = combinedData.find((d) => d.year === label)
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <p className="font-bold text-lg mb-2">{label}年</p>
        {data?.note && (
          <p className="text-sm text-gray-500 mb-2">{data.note}</p>
        )}
        <div className="space-y-1 text-sm">
          {payload.map((entry) => (
            <div key={entry.dataKey} className="flex justify-between gap-4">
              <span style={{ color: entry.color }}>{entry.name}</span>
              <span className="font-mono">
                {entry.value < 0 ? '-' : ''}
                {Math.abs(entry.value).toLocaleString()}億円
              </span>
            </div>
          ))}
          {data && (
            <div className="pt-2 border-t mt-2">
              <div className="flex justify-between">
                <span className="text-gray-500">MTG内ReFa比率</span>
                <span className="font-bold text-blue-600">{data.refaRatio}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

export function SalesChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">業績推移</h2>
        <p className="text-gray-500 text-sm">
          2019年の危機（-144億円）から2025年の過去最高（728億円）へ
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={combinedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="year" stroke="#6B7280" />
            <YAxis
              yAxisId="left"
              stroke="#6B7280"
              tickFormatter={(v) => `${v}億`}
              domain={[-200, 1100]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#3B82F6"
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {/* 2019年の危機ライン */}
            <ReferenceLine
              yAxisId="left"
              y={0}
              stroke="#EF4444"
              strokeDasharray="3 3"
            />

            {/* 棒グラフ: 売上高 */}
            <Bar
              yAxisId="left"
              dataKey="mtgRevenue"
              name="MTG売上高"
              fill="#94A3B8"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="refaRevenue"
              name="ReFa売上"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />

            {/* 折れ線: 営業利益 */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="mtgProfit"
              name="営業利益"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2 }}
            />

            {/* 折れ線: ReFa比率 */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="refaRatio"
              name="MTG内ReFa比率"
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#10B981', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 注記 */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span>2019年: 営業利益 -144億円（危機）</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          <span>2025年: ReFa売上 728億円（過去最高）</span>
        </div>
      </div>
    </div>
  )
}
