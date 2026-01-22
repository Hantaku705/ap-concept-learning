"use client";

import { timeline, kpis, tactics } from "@/data/strategy-data";

export default function TimelineContent() {
  return (
    <div className="space-y-8">
      {/* Timeline Visual */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">タイムライン</h2>

        {/* Timeline Chart */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 md:left-1/2 md:-translate-x-0.5" />

          {/* Timeline Items */}
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-4 md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className={`absolute left-4 w-3 h-3 rounded-full border-2 md:left-1/2 md:-translate-x-1.5 ${
                  item.highlight
                    ? "bg-pink-500 border-pink-500"
                    : "bg-white border-gray-300"
                }`} />

                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className={`p-4 rounded-lg ${
                    item.highlight
                      ? "bg-pink-50 border border-pink-200"
                      : "bg-gray-50 border border-gray-200"
                  }`}>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        item.highlight
                          ? "bg-pink-200 text-pink-700"
                          : "bg-gray-200 text-gray-700"
                      }`}>
                        {item.period}
                      </span>
                      <span className="font-bold text-gray-900">{item.phase}</span>
                    </div>
                    <p className="text-sm text-gray-600">{item.tactics}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">タイムライン詳細</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">期間</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">フェーズ</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">施策</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 ${item.highlight ? "bg-pink-50" : "hover:bg-gray-50"}`}
                >
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      item.highlight
                        ? "bg-pink-200 text-pink-700"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {item.period}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.phase}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{item.tactics}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tactics Detail Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">施策詳細</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {tactics.map((tactic) => (
            <div
              key={tactic.id}
              className={`p-4 rounded-lg border-2 ${
                tactic.priority === 1
                  ? "border-pink-300 bg-pink-50"
                  : tactic.priority === 2
                  ? "border-amber-300 bg-amber-50"
                  : tactic.priority === 3
                  ? "border-sky-300 bg-sky-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    tactic.priority === 1 ? "bg-pink-200 text-pink-700" :
                    tactic.priority === 2 ? "bg-amber-200 text-amber-700" :
                    tactic.priority === 3 ? "bg-sky-200 text-sky-700" :
                    "bg-gray-200 text-gray-700"
                  }`}>
                    {tactic.priority}位
                  </span>
                  <span className="font-bold text-gray-900">{tactic.name}</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{tactic.budgetFormatted}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white rounded p-2">
                  <p className="text-gray-500 text-xs">目的</p>
                  <p className="font-medium text-gray-900">{tactic.purpose}</p>
                </div>
                <div className="bg-white rounded p-2">
                  <p className="text-gray-500 text-xs">実施日</p>
                  <p className="font-medium text-gray-900">{tactic.date}</p>
                </div>
                {tactic.impFormatted !== "-" && (
                  <div className="bg-white rounded p-2">
                    <p className="text-gray-500 text-xs">Imp</p>
                    <p className="font-medium text-gray-900">{tactic.impFormatted}</p>
                  </div>
                )}
                {tactic.reachFormatted !== "-" && (
                  <div className="bg-white rounded p-2">
                    <p className="text-gray-500 text-xs">Reach</p>
                    <p className="font-medium text-gray-900">{tactic.reachFormatted}</p>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-3">{tactic.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* KPI */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">KPI</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">指標</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">目標</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 ${kpi.highlight ? "bg-emerald-50" : "hover:bg-gray-50"}`}
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {kpi.highlight && <span className="mr-2">⭐</span>}
                    {kpi.metric}
                  </td>
                  <td className={`py-3 px-4 text-sm ${kpi.highlight ? "font-bold text-emerald-700" : "text-gray-600"}`}>
                    {kpi.target}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
