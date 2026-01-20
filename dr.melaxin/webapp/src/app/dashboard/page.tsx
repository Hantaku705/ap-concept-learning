"use client";

import Link from "next/link";
import ReachTrendChart from "@/components/charts/ReachTrendChart";
import SnsPieChart from "@/components/charts/SnsPieChart";
import ReachEfficiencyChart from "@/components/charts/ReachEfficiencyChart";
import { snsSummary, monthlySummary, tacticSummary } from "@/data/matrix-data";
import { quarterSummaries } from "@/data/quarterly-data";

export default function DashboardPage() {
  const totalBudget = snsSummary.reduce((sum, s) => sum + s.budget, 0);
  const totalReach = snsSummary.reduce((sum, s) => sum + s.reach, 0);
  const overallEfficiency = totalBudget > 0 ? ((totalReach / totalBudget) * 100).toFixed(0) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Link href="/" className="text-sky-600 hover:text-sky-700 text-sm">
                  ← 提案書に戻る
                </Link>
                <span className="badge badge-purple">Reach Dashboard</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Reachダッシュボード</h1>
            </div>
            <div className="flex gap-2">
              <Link href="/quarterly" className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Quarterly
              </Link>
              <Link href="/matrix" className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Matrix
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p className="text-xs text-gray-500">年間投資</p>
            <p className="text-2xl font-bold text-amber-600">{(totalBudget / 10000).toFixed(1)}億円</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p className="text-xs text-gray-500">年間Reach</p>
            <p className="text-2xl font-bold text-purple-600">{(totalReach / 10000).toFixed(0)}万UU</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p className="text-xs text-gray-500">平均効率</p>
            <p className="text-2xl font-bold text-emerald-600">{overallEfficiency}</p>
            <p className="text-xs text-gray-400">UU/万円</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p className="text-xs text-gray-500">実質リーチ</p>
            <p className="text-2xl font-bold text-sky-600">1,500-2,000万</p>
            <p className="text-xs text-gray-400">重複除外後</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p className="text-xs text-gray-500">メガ割回数</p>
            <p className="text-2xl font-bold text-gray-900">4回</p>
            <p className="text-xs text-gray-400">3/6/9/11月</p>
          </div>
        </div>

        {/* Quarterly Reach Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {quarterSummaries.map((q) => (
            <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">{q.name}</span>
                <span className="text-xs text-gray-500">{q.period}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{q.keyMessage}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-amber-50 rounded p-2">
                  <p className="text-amber-600">投資</p>
                  <p className="font-semibold text-gray-900">{q.investment}</p>
                </div>
                <div className="bg-purple-50 rounded p-2">
                  <p className="text-purple-600">Reach</p>
                  <p className="font-semibold text-gray-900">{q.totalReach}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <ReachTrendChart />
          <SnsPieChart mode="reach" />
        </div>

        {/* Charts Row 2 */}
        <div className="mb-8">
          <ReachEfficiencyChart />
        </div>

        {/* Budget vs Reach Comparison */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <SnsPieChart mode="budget" />

          {/* Top Tactics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">施策別Reach Top5</h3>
            <div className="space-y-3">
              {[...tacticSummary]
                .sort((a, b) => b.reach - a.reach)
                .slice(0, 5)
                .map((t, idx) => (
                  <div key={t.tactic} className="flex items-center gap-3">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-bold ${
                      idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-amber-700' : 'bg-gray-300'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{t.tactic}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-amber-600">{(t.budget / 10000).toFixed(1)}億円</span>
                        <span className="text-purple-600">{(t.reach / 10000).toFixed(0)}万UU</span>
                        <span className="text-emerald-600">
                          {t.budget > 0 ? ((t.reach / t.budget) * 100).toFixed(0) : 0} UU/万円
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Monthly Summary Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">月別サマリー</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2 text-left font-medium text-gray-500">月</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-500">予算</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-500">Reach</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-500">効率</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">備考</th>
                </tr>
              </thead>
              <tbody>
                {monthlySummary.map((m) => {
                  const efficiency = m.budget > 0 ? ((m.reach / m.budget) * 100).toFixed(0) : 0;
                  const isMegaSale = ['3月', '6月', '9月', '11月'].includes(m.month);
                  return (
                    <tr key={m.month} className={`border-b border-gray-100 ${isMegaSale ? 'bg-amber-50' : ''}`}>
                      <td className="px-3 py-2 font-medium text-gray-900">
                        {m.month}
                        {isMegaSale && <span className="ml-2 text-xs text-amber-600">MEGA</span>}
                      </td>
                      <td className="px-3 py-2 text-right text-amber-600 tabular-nums">
                        {(m.budget / 10000).toFixed(1)}億円
                      </td>
                      <td className="px-3 py-2 text-right text-purple-600 tabular-nums">
                        {(m.reach / 10000).toFixed(0)}万UU
                      </td>
                      <td className="px-3 py-2 text-right">
                        <span className={`font-medium ${Number(efficiency) > 100 ? 'text-emerald-600' : 'text-gray-600'}`}>
                          {efficiency}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-500 text-xs">
                        {isMegaSale ? 'メガ割月（集中投下）' : '継続運用'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-medium">
                  <td className="px-3 py-2">合計</td>
                  <td className="px-3 py-2 text-right text-amber-600">{(totalBudget / 10000).toFixed(1)}億円</td>
                  <td className="px-3 py-2 text-right text-purple-600">{(totalReach / 10000).toFixed(0)}万UU</td>
                  <td className="px-3 py-2 text-right text-emerald-600">{overallEfficiency}</td>
                  <td className="px-3 py-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-sky-900 mb-3">Reach計算に関する注意</h3>
          <ul className="space-y-2 text-sm text-sky-800">
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              <span>表示されているReachは延べUU（重複を含む）です。同一ユーザーへの複数回接触を含みます。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              <span>実質リーチ（重複除外後）は、ターゲット層への複数回接触を考慮して約1,500-2,000万UU程度と想定。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              <span>X（RT部隊）は最も効率が高いですが、認知形成の柱としてTikTokは必要不可欠です。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              <span>メガ割月（3/6/9/11月）にReachを集中投下し、効率的な認知獲得→購買転換を実現します。</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
