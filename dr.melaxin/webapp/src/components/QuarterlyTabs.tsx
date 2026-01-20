"use client";

import { useState } from "react";
import { q1Data, q2Data, q3Data, q4Data, QuarterData } from "@/data/quarterly-data";

type QuarterId = "Q1" | "Q2" | "Q3" | "Q4";

const quarterDataMap: Record<QuarterId, QuarterData> = {
  Q1: q1Data,
  Q2: q2Data,
  Q3: q3Data,
  Q4: q4Data,
};

const quarterTabs: { id: QuarterId; label: string; period: string }[] = [
  { id: "Q1", label: "Q1", period: "2-3月" },
  { id: "Q2", label: "Q2", period: "4-6月" },
  { id: "Q3", label: "Q3", period: "7-9月" },
  { id: "Q4", label: "Q4", period: "10-12月" },
];

export default function QuarterlyTabs() {
  const [activeQuarter, setActiveQuarter] = useState<QuarterId>("Q1");
  const data = quarterDataMap[activeQuarter];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Tab Header */}
      <div className="flex border-b border-gray-200">
        {quarterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveQuarter(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeQuarter === tab.id
                ? "bg-sky-50 text-sky-700 border-b-2 border-sky-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="block font-semibold">{tab.label}</span>
            <span className="block text-xs opacity-75">{tab.period}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-xs text-amber-600 font-medium">投資額</p>
            <p className="text-xl font-bold text-amber-700">{data.summary.investment}</p>
            {data.summary.extraBudget && (
              <p className="text-xs text-amber-500 mt-1">+ {data.summary.extraBudget}</p>
            )}
          </div>
          <div className="bg-sky-50 rounded-lg p-4">
            <p className="text-xs text-sky-600 font-medium">目標GMV</p>
            <p className="text-xl font-bold text-sky-700">{data.summary.targetGmv}</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4">
            <p className="text-xs text-emerald-600 font-medium">目標ROAS</p>
            <p className="text-xl font-bold text-emerald-700">{data.summary.targetRoas}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-xs text-purple-600 font-medium">Reach</p>
            <p className="text-xl font-bold text-purple-700">{data.summary.totalReach}</p>
          </div>
        </div>

        {/* Key Message & Main Event */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="badge badge-amber">{data.summary.mainEvent}</span>
            <span className="badge badge-gray">TikTok {data.summary.tiktokVideos}本</span>
          </div>
          <p className="text-sm text-gray-600">{data.summary.keyMessage}</p>
        </div>

        {/* Media Breakdown */}
        <div className="mb-6">
          <h5 className="text-sm font-semibold text-gray-700 mb-3">メディア投資内訳</h5>
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
                {data.mediaBreakdown.map((item) => (
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

        {/* Monthly Plans */}
        <div className="mb-6">
          <h5 className="text-sm font-semibold text-gray-700 mb-3">月別施策</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.monthlyPlans.map((month) => {
              const isMegaSale = ["3月", "6月", "9月", "11月"].includes(month.month);
              return (
                <div
                  key={month.month}
                  className={`p-4 rounded-lg border ${
                    isMegaSale
                      ? "border-amber-300 bg-amber-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{month.month}</span>
                      {isMegaSale && (
                        <span className="badge badge-amber text-xs">メガ割</span>
                      )}
                    </div>
                    <span className="text-sm text-amber-600 font-medium">{month.budget}</span>
                  </div>
                  <p className="text-xs text-purple-600 mb-2">Reach: {month.reach}</p>
                  <div className="space-y-1">
                    {month.tactics.slice(0, 3).map((tactic, idx) => (
                      <p key={idx} className="text-xs text-gray-600">
                        • {tactic.name}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* KPIs */}
        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-3">KPI目標</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data.kpi.final.map((kpi) => (
              <div key={kpi.metric} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">{kpi.metric}</p>
                <p className="text-lg font-bold text-gray-900">{kpi.target}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Decisions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h5 className="text-sm font-semibold text-gray-700 mb-3">重要決定事項</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.keyDecisions.map((decision) => (
              <div key={decision.item} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{decision.item}</p>
                  <p className="text-xs text-sky-600">{decision.decision}</p>
                  {decision.note && (
                    <p className="text-xs text-gray-500 mt-1">{decision.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
