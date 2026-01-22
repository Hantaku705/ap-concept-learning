"use client";

import { useState } from "react";
import {
  mediaPlanTactics,
  monthlyAllocations,
  mediaPlanSummary,
  mediaPlanKpis,
  MediaPlanTactic,
} from "@/data/media-plan-data";

export default function MediaPlanContent() {
  const [expandedTactic, setExpandedTactic] = useState<string | null>(null);

  const getPurposeColor = (color: string) => {
    const colors: Record<string, string> = {
      pink: "bg-pink-100 text-pink-700",
      amber: "bg-amber-100 text-amber-700",
      sky: "bg-sky-100 text-sky-700",
      emerald: "bg-emerald-100 text-emerald-700",
    };
    return colors[color] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">メディアプラン概要</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-pink-50 rounded-lg p-4">
            <p className="text-xs text-pink-600 font-medium">期間</p>
            <p className="text-sm font-bold text-gray-900">{mediaPlanSummary.period}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-xs text-amber-600 font-medium">総予算</p>
            <p className="text-lg font-bold text-amber-700">{mediaPlanSummary.totalBudgetFormatted}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-xs text-purple-600 font-medium">総Imp</p>
            <p className="text-lg font-bold text-purple-700">{mediaPlanSummary.totalImpFormatted}</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-xs text-indigo-600 font-medium">総Reach</p>
            <p className="text-lg font-bold text-indigo-700">{mediaPlanSummary.totalReachFormatted}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 rounded-lg p-4">
            <p className="text-xs text-emerald-600 font-medium">FQ目標</p>
            <p className="text-sm font-bold text-gray-900">
              {mediaPlanSummary.fqTarget}
              <span className="text-xs font-normal text-gray-500 ml-2">（見込: {mediaPlanSummary.fqExpected}）</span>
            </p>
          </div>
          <div className="bg-sky-50 rounded-lg p-4">
            <p className="text-xs text-sky-600 font-medium">施策数</p>
            <p className="text-sm font-bold text-gray-900">{mediaPlanTactics.length}施策</p>
          </div>
        </div>
      </div>

      {/* Monthly Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">施策×月別マトリクス</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 text-sm font-medium text-gray-500 w-[160px]">施策</th>
                {monthlyAllocations.map((month) => (
                  <th key={month.period} className="text-center py-3 px-3 text-sm font-medium text-gray-500">
                    {month.label}
                  </th>
                ))}
                <th className="text-center py-3 px-3 text-sm font-medium text-gray-900 bg-gray-50">合計</th>
              </tr>
            </thead>
            <tbody>
              {mediaPlanTactics.map((tactic) => (
                <tr key={tactic.id} className="border-b border-gray-100">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPurposeColor(tactic.purposeColor)}`}>
                        {tactic.purpose}
                      </span>
                      <span className="text-sm text-gray-900">{tactic.shortName}</span>
                    </div>
                  </td>
                  {monthlyAllocations.map((month) => {
                    const allocation = month.tactics.find((t) => t.tacticId === tactic.id);
                    return (
                      <td key={month.period} className="py-3 px-3 text-center">
                        <div className="text-sm font-medium text-gray-900">
                          {allocation?.budgetFormatted || "-"}
                        </div>
                        {allocation && allocation.imp > 0 && (
                          <div className="text-xs text-purple-600">{allocation.impFormatted}</div>
                        )}
                      </td>
                    );
                  })}
                  <td className="py-3 px-3 text-center bg-gray-50">
                    <div className="text-sm font-bold text-gray-900">{tactic.budgetFormatted.split("（")[0]}</div>
                    {tactic.imp > 0 && (
                      <div className="text-xs font-medium text-purple-600">{tactic.impFormatted}</div>
                    )}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-50 font-bold">
                <td className="py-3 px-3 text-sm text-gray-900">合計</td>
                {monthlyAllocations.map((month) => (
                  <td key={month.period} className="py-3 px-3 text-center">
                    <div className="text-sm text-gray-900">{month.totalBudgetFormatted}</div>
                    <div className="text-xs text-purple-600">{month.totalImpFormatted}</div>
                  </td>
                ))}
                <td className="py-3 px-3 text-center">
                  <div className="text-sm text-pink-700">{mediaPlanSummary.totalBudgetFormatted}</div>
                  <div className="text-xs text-purple-700">{mediaPlanSummary.totalImpFormatted}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tactic Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">施策詳細</h2>
        <p className="text-sm text-gray-500 mb-4">クリックして詳細を表示</p>
        <div className="space-y-3">
          {mediaPlanTactics.map((tactic) => (
            <TacticCard
              key={tactic.id}
              tactic={tactic}
              isExpanded={expandedTactic === tactic.id}
              onToggle={() => setExpandedTactic(expandedTactic === tactic.id ? null : tactic.id)}
              getPurposeColor={getPurposeColor}
            />
          ))}
        </div>
      </div>

      {/* KPI Targets */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">KPI目標</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mediaPlanKpis.map((kpi, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">{kpi.metric}</p>
              <p className="text-sm font-bold text-emerald-700">{kpi.target}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Tactic Card Component
function TacticCard({
  tactic,
  isExpanded,
  onToggle,
  getPurposeColor,
}: {
  tactic: MediaPlanTactic;
  isExpanded: boolean;
  onToggle: () => void;
  getPurposeColor: (color: string) => string;
}) {
  return (
    <div
      className={`border rounded-lg transition-all ${
        isExpanded ? "border-pink-300 bg-pink-50/30" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPurposeColor(tactic.purposeColor)}`}>
            {tactic.purpose}
          </span>
          <span className="font-medium text-gray-900">{tactic.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-amber-700">{tactic.budgetFormatted.split("（")[0]}</span>
          {tactic.imp > 0 && (
            <span className="text-sm text-purple-600">{tactic.impFormatted} Imp</span>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded p-2 border border-gray-100">
              <p className="text-[10px] text-gray-500">期間</p>
              <p className="text-sm font-medium text-gray-900">{tactic.period}</p>
            </div>
            {tactic.cpm && (
              <div className="bg-white rounded p-2 border border-gray-100">
                <p className="text-[10px] text-gray-500">CPM</p>
                <p className="text-sm font-medium text-gray-900">¥{tactic.cpm}</p>
              </div>
            )}
            {tactic.ctr && (
              <div className="bg-white rounded p-2 border border-gray-100">
                <p className="text-[10px] text-gray-500">CTR</p>
                <p className="text-sm font-medium text-gray-900">{tactic.ctr}%</p>
              </div>
            )}
            {tactic.reach > 0 && (
              <div className="bg-white rounded p-2 border border-gray-100">
                <p className="text-[10px] text-gray-500">Reach</p>
                <p className="text-sm font-medium text-indigo-700">{tactic.reachFormatted}</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">詳細</p>
            <ul className="space-y-1">
              {tactic.details.map((detail, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-pink-500">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly Budget */}
          {tactic.weeklyBudget.length > 1 && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">週別予算配分</p>
              <div className="flex flex-wrap gap-2">
                {tactic.weeklyBudget.map((week) => (
                  <div key={week.week} className="bg-white rounded px-3 py-1.5 border border-gray-100">
                    <span className="text-xs text-gray-500">{week.week}</span>
                    <span className="text-sm font-medium text-gray-900 ml-2">{week.budgetFormatted}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
