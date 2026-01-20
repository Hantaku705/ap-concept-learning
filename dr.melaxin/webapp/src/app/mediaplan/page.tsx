"use client";

import FilterableMatrix from "@/components/FilterableMatrix";
import { snsSummary, tacticSummary, formatBudget, formatReach } from "@/data/matrix-data";

export default function MediaPlanPage() {
  const totalBudget = snsSummary.reduce((sum, s) => sum + s.budget, 0);
  const totalReach = snsSummary.reduce((sum, s) => sum + s.reach, 0);

  return (
    <main className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Media Plan</h1>
        <p className="text-gray-500">SNS×月別の予算・Reach一覧</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">年間投資</p>
          <p className="text-2xl font-bold text-amber-600">{formatBudget(totalBudget)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">年間Reach</p>
          <p className="text-2xl font-bold text-purple-600">{formatReach(totalReach)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">SNS数</p>
          <p className="text-2xl font-bold text-sky-600">{snsSummary.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">施策数</p>
          <p className="text-2xl font-bold text-gray-900">{tacticSummary.length}</p>
        </div>
      </div>

      {/* Matrix Table */}
      <FilterableMatrix />
    </main>
  );
}
