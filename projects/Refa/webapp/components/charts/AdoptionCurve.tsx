'use client'

import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from 'recharts'
import { adoptionPhases } from '@/data/report-data'

// 正規分布に近い釣り鐘型データを生成
const generateBellCurve = () => {
  const data = []
  for (let i = 0; i <= 100; i++) {
    const x = i
    const y = Math.exp(-Math.pow((x - 50) / 18, 2) / 2) * 100
    data.push({ x, y })
  }
  return data
}

const curveData = generateBellCurve()

// 各層の境界
const boundaries = [
  { start: 0, end: 2.5, layer: 'イノベーター', color: '#3B82F6' },
  { start: 2.5, end: 16, layer: 'アーリーアダプター', color: '#10B981' },
  { start: 16, end: 50, layer: 'アーリーマジョリティ', color: '#F59E0B' },
  { start: 50, end: 84, layer: 'レイトマジョリティ', color: '#EF4444' },
  { start: 84, end: 100, layer: 'ラガード', color: '#6B7280' },
]

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: number
}

const CustomTooltip = ({ active, label }: CustomTooltipProps) => {
  if (active && label !== undefined) {
    const phase = adoptionPhases.find((p, i) => {
      const boundary = boundaries[i]
      return label >= boundary.start && label < boundary.end
    }) || adoptionPhases[adoptionPhases.length - 1]

    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border max-w-sm">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: phase.color }}
          />
          <span className="font-bold">{phase.layer}</span>
          <span className="text-gray-500">({phase.percentage}%)</span>
        </div>
        <div className="text-sm space-y-1">
          <p><span className="text-gray-500">時期:</span> {phase.period}</p>
          <p><span className="text-gray-500">ReFa:</span> {phase.refaPhase}</p>
          <p><span className="text-gray-500">チャネル:</span> {phase.channel}</p>
          <p className="text-gray-600 text-xs mt-2">{phase.description}</p>
        </div>
      </div>
    )
  }
  return null
}

export function AdoptionCurve() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(3) // レイトマジョリティがデフォルト

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          イノベーター理論 × ReFa戦略
        </h2>
        <p className="text-gray-500 text-sm">
          5年かけた「戦略的忍耐」による段階的チャネル展開
        </p>
      </div>

      {/* 凡例 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {adoptionPhases.map((phase, index) => (
          <button
            key={phase.id}
            onClick={() => setSelectedPhase(index)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
              selectedPhase === index
                ? 'ring-2 ring-offset-1 ring-current'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: `${phase.color}20`,
              color: phase.color,
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: phase.color }}
            />
            <span className="font-medium">{phase.layer}</span>
            <span className="text-xs opacity-70">({phase.percentage}%)</span>
            {phase.isCurrent && (
              <span className="ml-1 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded">
                現在
              </span>
            )}
          </button>
        ))}
      </div>

      {/* グラフ */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={curveData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <defs>
              {boundaries.map((b) => (
                <linearGradient
                  key={b.layer}
                  id={`gradient-${b.layer}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={b.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={b.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <XAxis
              dataKey="x"
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />

            {/* 各層の領域 */}
            {boundaries.map((b, i) => (
              <ReferenceArea
                key={b.layer}
                x1={b.start}
                x2={b.end}
                fill={b.color}
                fillOpacity={selectedPhase === i ? 0.3 : 0.1}
              />
            ))}

            {/* ReFa現在地のマーカー（レイトマジョリティの中間点 = 67%）*/}
            <ReferenceLine
              x={67}
              stroke="#EF4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{
                value: '★ ReFa現在地',
                position: 'top',
                fill: '#EF4444',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            />

            <Area
              type="monotone"
              dataKey="y"
              stroke="#94A3B8"
              strokeWidth={2}
              fill="url(#gradient-イノベーター)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 選択されたフェーズの詳細 */}
      {selectedPhase !== null && (
        <div
          className="mt-4 p-4 rounded-lg"
          style={{ backgroundColor: `${adoptionPhases[selectedPhase].color}10` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3
                className="font-bold text-lg"
                style={{ color: adoptionPhases[selectedPhase].color }}
              >
                {adoptionPhases[selectedPhase].refaPhase}
              </h3>
              <p className="text-gray-600 text-sm">
                {adoptionPhases[selectedPhase].period}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">チャネル</p>
              <p className="font-medium">{adoptionPhases[selectedPhase].channel}</p>
            </div>
          </div>
          <p className="mt-2 text-gray-700 text-sm">
            {adoptionPhases[selectedPhase].description}
          </p>
        </div>
      )}

      {/* タイムライン */}
      <div className="mt-6 flex justify-between text-xs text-gray-500">
        <span>2019</span>
        <span>2020-21</span>
        <span>2022-23</span>
        <span className="text-red-500 font-bold">2024</span>
        <span>2025〜</span>
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>美容室限定</span>
        <span>百貨店/EC</span>
        <span>ホテルBtoB</span>
        <span className="text-red-500">家電量販店</span>
        <span>マス拡大</span>
      </div>
    </div>
  )
}
