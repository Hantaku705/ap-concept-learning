"use client";

import { QuarterData } from "@/data/quarterly-data";

interface QuarterDetailViewProps {
  data: QuarterData;
}

export default function QuarterDetailView({ data }: QuarterDetailViewProps) {
  const { summary, mediaBreakdown, monthlyPlans, kpi, keyDecisions, risks } = data;
  const isMegaSaleMonth = (month: string) => ["3月", "6月", "9月", "11月"].includes(month);

  return (
    <main className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{summary.name}</h1>
          <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded">
            {summary.mainEvent}
          </span>
        </div>
        <p className="text-gray-500">{summary.period}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">投資額</p>
          <p className="text-2xl font-bold text-amber-600">{summary.investment}</p>
          {summary.extraBudget && (
            <p className="text-xs text-amber-500 mt-1">+ {summary.extraBudget}</p>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">目標GMV</p>
          <p className="text-2xl font-bold text-sky-600">{summary.targetGmv}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">目標ROAS</p>
          <p className="text-2xl font-bold text-emerald-600">{summary.targetRoas}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">Reach</p>
          <p className="text-2xl font-bold text-purple-600">{summary.totalReach}</p>
        </div>
      </div>

      {/* Key Message */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-8">
        <p className="text-sky-800">
          <span className="font-semibold">戦略:</span> {summary.keyMessage}
        </p>
      </div>

      {/* Media Breakdown */}
      <section className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">メディア投資内訳</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">メディア</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">予算</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Reach</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">備考</th>
                </tr>
              </thead>
              <tbody>
                {mediaBreakdown.map((item) => (
                  <tr key={item.media} className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">{item.media}</td>
                    <td className="px-3 py-2 text-right text-amber-600">{item.budget}億</td>
                    <td className="px-3 py-2 text-right text-purple-600">{item.reach}UU</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Monthly Plans */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">月別施策</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {monthlyPlans.map((month) => {
            const isMega = isMegaSaleMonth(month.month);
            return (
              <div
                key={month.month}
                className={`p-4 rounded-xl border ${
                  isMega
                    ? "border-amber-300 bg-amber-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-lg">{month.month}</span>
                    {isMega && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-amber-200 text-amber-800 rounded">
                        メガ割
                      </span>
                    )}
                  </div>
                  <span className="text-amber-600 font-medium">{month.budget}</span>
                </div>
                <p className="text-xs text-purple-600 mb-3">Reach: {month.reach}</p>
                <div className="space-y-2">
                  {month.tactics.slice(0, 4).map((tactic, idx) => (
                    <div key={idx} className="text-sm">
                      <p className="text-gray-700">• {tactic.name}</p>
                      <p className="text-xs text-gray-400 ml-3">{tactic.target}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* KPIs */}
      <section className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">KPI目標</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {kpi.final.map((item) => (
              <div key={item.metric} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">{item.metric}</p>
                <p className="text-lg font-bold text-gray-900">{item.target}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Decisions */}
      <section className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">重要決定事項</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {keyDecisions.map((decision) => (
              <div key={decision.item} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{decision.item}</p>
                  <p className="text-sm text-sky-600">{decision.decision}</p>
                  {decision.note && (
                    <p className="text-xs text-gray-500 mt-1">{decision.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risks */}
      <section className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">リスクと対策</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">リスク</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">確率</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">対策</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((risk) => (
                  <tr key={risk.risk} className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">{risk.risk}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        risk.probability === "高" ? "bg-rose-100 text-rose-700" :
                        risk.probability === "中" ? "bg-amber-100 text-amber-700" :
                        "bg-emerald-100 text-emerald-700"
                      }`}>
                        {risk.probability}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-600">{risk.countermeasure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Milestones */}
      {kpi.milestones.length > 0 && (
        <section className="mb-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-emerald-900 mb-4">マイルストーン</h2>
            <div className="space-y-3">
              {kpi.milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="w-24 text-sm font-medium text-emerald-800">{milestone.date}</span>
                  <span className="text-sm text-emerald-700">GMV: {milestone.gmv}</span>
                  <span className="text-sm text-emerald-700">Ranking: {milestone.ranking}</span>
                  <span className="text-sm text-emerald-700">Reach: {milestone.reach}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
