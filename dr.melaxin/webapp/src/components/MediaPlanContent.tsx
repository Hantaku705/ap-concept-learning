"use client";

import FilterableMatrix from "@/components/FilterableMatrix";
import { snsSummary, tacticSummary, formatBudget, formatReach } from "@/data/matrix-data";
import { tacticsSummary } from "@/data/tactics-data";

// Format posts
function formatPosts(posts: number): string {
  if (posts >= 1000) {
    return `${(posts / 1000).toFixed(1)}千本`;
  }
  return `${posts}本`;
}

// Format followers (万人単位)
function formatFollowers(followers: number): string {
  if (followers >= 10000) {
    return `${(followers / 10000).toFixed(1)}億人`;
  }
  if (followers >= 100) {
    return `${(followers / 100).toFixed(0)}百万人`;
  }
  return `${followers}万人`;
}

export default function MediaPlanContent() {
  const totalBudget = snsSummary.reduce((sum, s) => sum + s.budget, 0);
  const totalReach = snsSummary.reduce((sum, s) => sum + s.reach, 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">合計投稿数</p>
          <p className="text-2xl font-bold text-sky-600">{formatPosts(tacticsSummary.totalPosts)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">合計フォロワー</p>
          <p className="text-2xl font-bold text-pink-600">{formatFollowers(tacticsSummary.totalFollowers)}</p>
        </div>
      </div>

      {/* Matrix Table */}
      <FilterableMatrix />
    </div>
  );
}
