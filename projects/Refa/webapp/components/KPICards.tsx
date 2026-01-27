'use client'

import { kpiComparison } from '@/data/report-data'

const kpis = [
  {
    label: 'MTG売上高',
    crisis: `${kpiComparison.crisis.mtgRevenue}億円`,
    current: `${kpiComparison.current.mtgRevenue}億円`,
    change: kpiComparison.change.mtgRevenueGrowth,
    color: 'text-blue-600',
  },
  {
    label: '営業利益',
    crisis: `${kpiComparison.crisis.profit}億円`,
    current: `${kpiComparison.current.profit}億円`,
    change: kpiComparison.change.profitChange,
    color: 'text-green-600',
  },
  {
    label: 'ReFa売上',
    crisis: `${kpiComparison.crisis.refaRevenue}億円`,
    current: `${kpiComparison.current.refaRevenue}億円`,
    change: kpiComparison.change.refaRevenueGrowth,
    color: 'text-purple-600',
  },
  {
    label: 'MTG内比率',
    crisis: `${kpiComparison.crisis.ratio}%`,
    current: `${kpiComparison.current.ratio}%`,
    change: kpiComparison.change.ratioChange,
    color: 'text-orange-600',
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <p className="text-gray-500 text-sm">{kpi.label}</p>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.current}</p>
              <p className="text-xs text-gray-400">
                2019年: {kpi.crisis}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-sm font-bold rounded">
                {kpi.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
