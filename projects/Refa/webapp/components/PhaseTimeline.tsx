'use client'

import Link from 'next/link'
import { phases } from '@/data/report-data'

const phaseColors = [
  'bg-gray-100 border-gray-300',
  'bg-red-50 border-red-300',
  'bg-blue-50 border-blue-300',
  'bg-amber-50 border-amber-300',
  'bg-green-50 border-green-300',
]

const phaseIcons = ['📊', '⚠️', '🚀', '🏨', '📺']

export function PhaseTimeline() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">5つのフェーズ</h2>
          <p className="text-gray-500 text-sm">
            2009年〜2025年の変遷をクリックで詳細表示
          </p>
        </div>
        <Link
          href="/phases"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          詳細を見る →
        </Link>
      </div>

      <div className="relative">
        {/* タイムライン線 */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200" />

        {/* フェーズカード */}
        <div className="flex gap-2 overflow-x-auto pb-4">
          {phases.map((phase, index) => (
            <Link
              key={phase.id}
              href={`/phases?tab=${index}`}
              className={`flex-shrink-0 w-48 p-3 rounded-lg border-2 ${phaseColors[index]} hover:shadow-md transition-all cursor-pointer group`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{phaseIcons[index]}</span>
                <span className="text-xs text-gray-500">{phase.period}</span>
              </div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {phase.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {phase.overview}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
