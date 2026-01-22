"use client";

import { useState } from "react";
import { calendarWeeks, rowLabels, tacticTimeline, tacticWeeklyBudgets, calendarSummary, CalendarWeek } from "@/data/calendar-data";

export default function CalendarContent() {
  const [selectedWeek, setSelectedWeek] = useState<CalendarWeek | null>(null);

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">アクティベーションカレンダー概要</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-pink-50 rounded-lg p-4">
            <p className="text-xs text-pink-600 font-medium">期間</p>
            <p className="text-sm font-bold text-gray-900">{calendarSummary.period}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-xs text-amber-600 font-medium">総予算</p>
            <p className="text-sm font-bold text-gray-900">{calendarSummary.totalBudgetFormatted}</p>
          </div>
          <div className="bg-sky-50 rounded-lg p-4">
            <p className="text-xs text-sky-600 font-medium">コンセプト</p>
            <p className="text-sm font-bold text-gray-900">{calendarSummary.concept}</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4">
            <p className="text-xs text-emerald-600 font-medium">実施週数</p>
            <p className="text-sm font-bold text-gray-900">{calendarSummary.totalWeeks}週間</p>
          </div>
        </div>
        {/* Reach/Imp/Eng 合計 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-xs text-purple-600 font-medium">総Imp</p>
            <p className="text-lg font-bold text-purple-700">{calendarSummary.totalImpFormatted}</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-xs text-indigo-600 font-medium">総Reach</p>
            <p className="text-lg font-bold text-indigo-700">{calendarSummary.totalReachFormatted}</p>
          </div>
          <div className="bg-teal-50 rounded-lg p-4">
            <p className="text-xs text-teal-600 font-medium">総Eng</p>
            <p className="text-lg font-bold text-teal-700">{calendarSummary.totalEngFormatted}</p>
          </div>
        </div>
      </div>

      {/* Main Calendar Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">週別マトリックス</h2>
        <p className="text-sm text-gray-500 mb-4">週をクリックすると詳細が表示されます</p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-fixed">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 text-sm font-medium text-gray-500 w-[140px]"></th>
                {calendarWeeks.map((week) => (
                  <th
                    key={week.id}
                    className={`text-center py-3 px-2 text-xs font-medium cursor-pointer transition-colors w-[108px] ${
                      week.highlight
                        ? "bg-pink-100 text-pink-700"
                        : "text-gray-500 hover:bg-gray-50"
                    } ${selectedWeek?.id === week.id ? "ring-2 ring-pink-500" : ""}`}
                    onClick={() => setSelectedWeek(selectedWeek?.id === week.id ? null : week)}
                  >
                    <div className="font-bold">{week.id.toUpperCase()}</div>
                    <div className="text-[10px] mt-1">{week.period}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Phase Row */}
              <tr className="border-b border-gray-100 bg-gray-50">
                <td className="py-2 px-3 text-xs font-medium text-gray-500">Phase</td>
                {calendarWeeks.map((week) => (
                  <td
                    key={week.id}
                    className={`py-2 px-2 text-[10px] text-center ${
                      week.highlight ? "bg-pink-50" : ""
                    }`}
                  >
                    {week.phase}
                  </td>
                ))}
              </tr>

              {/* Obj/Who/What/How Rows */}
              {rowLabels.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.id === "obj" ? "bg-pink-200 text-pink-700" :
                        row.id === "who" ? "bg-sky-200 text-sky-700" :
                        row.id === "what" ? "bg-amber-200 text-amber-700" :
                        "bg-emerald-200 text-emerald-700"
                      }`}>
                        {row.label}
                      </span>
                    </div>
                    <p className="text-[9px] text-gray-400 mt-0.5">{row.description}</p>
                  </td>
                  {calendarWeeks.map((week) => (
                    <td
                      key={week.id}
                      className={`py-2 px-2 text-[10px] text-gray-700 align-top cursor-pointer transition-colors ${
                        week.highlight ? "bg-pink-50 hover:bg-pink-100" : "hover:bg-gray-50"
                      } ${selectedWeek?.id === week.id ? "bg-pink-100" : ""}`}
                      onClick={() => setSelectedWeek(selectedWeek?.id === week.id ? null : week)}
                    >
                      {row.id === "obj" && truncateText(week.obj, 30)}
                      {row.id === "who" && truncateText(week.who, 30)}
                      {row.id === "what" && truncateText(week.what, 30)}
                      {row.id === "how" && truncateText(week.how, 30)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Budget Row */}
              <tr className="border-b border-gray-100 bg-gray-50">
                <td className="py-2 px-3 text-xs font-medium text-gray-500">予算</td>
                {calendarWeeks.map((week) => (
                  <td
                    key={week.id}
                    className={`py-2 px-2 text-[10px] text-center font-bold ${
                      week.highlight ? "bg-pink-50 text-pink-700" : "text-gray-700"
                    }`}
                  >
                    {week.budgetFormatted}
                  </td>
                ))}
              </tr>

              {/* Imp Row */}
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-200 text-purple-700">
                    Imp
                  </span>
                </td>
                {calendarWeeks.map((week) => (
                  <td
                    key={week.id}
                    className={`py-2 px-2 text-[10px] text-center font-bold ${
                      week.highlight ? "bg-pink-50 text-purple-700" : "text-purple-600"
                    }`}
                  >
                    {week.impFormatted}
                  </td>
                ))}
              </tr>

              {/* Reach Row */}
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-200 text-indigo-700">
                    Reach
                  </span>
                </td>
                {calendarWeeks.map((week) => (
                  <td
                    key={week.id}
                    className={`py-2 px-2 text-[10px] text-center font-bold ${
                      week.highlight ? "bg-pink-50 text-indigo-700" : "text-indigo-600"
                    }`}
                  >
                    {week.reachFormatted}
                  </td>
                ))}
              </tr>

              {/* Eng Row */}
              <tr className="border-b border-gray-200">
                <td className="py-2 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-200 text-teal-700">
                    Eng
                  </span>
                </td>
                {calendarWeeks.map((week) => (
                  <td
                    key={week.id}
                    className={`py-2 px-2 text-[10px] text-center font-bold ${
                      week.highlight ? "bg-pink-50 text-teal-700" : "text-teal-600"
                    }`}
                  >
                    {week.engFormatted}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Week Detail */}
      {selectedWeek && (
        <div className="bg-white rounded-xl shadow-sm border-2 border-pink-300 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                selectedWeek.highlight
                  ? "bg-pink-200 text-pink-700"
                  : "bg-gray-200 text-gray-700"
              }`}>
                {selectedWeek.id.toUpperCase()}
              </span>
              <h3 className="text-lg font-bold text-gray-900">{selectedWeek.period}</h3>
              <span className="text-sm text-gray-500">({selectedWeek.phase})</span>
            </div>
            <button
              onClick={() => setSelectedWeek(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Obj/Who/What/How */}
            <div className="space-y-3">
              <div className="bg-pink-50 rounded-lg p-3">
                <p className="text-xs font-medium text-pink-600 mb-1">Obj（目的）</p>
                <p className="text-sm text-gray-900">{selectedWeek.obj}</p>
              </div>
              <div className="bg-sky-50 rounded-lg p-3">
                <p className="text-xs font-medium text-sky-600 mb-1">Who（誰に）</p>
                <p className="text-sm text-gray-900">{selectedWeek.who}</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-xs font-medium text-amber-600 mb-1">What（何を）</p>
                <p className="text-sm text-gray-900">{selectedWeek.what}</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3">
                <p className="text-xs font-medium text-emerald-600 mb-1">How（どのように）</p>
                <p className="text-sm text-gray-900">{selectedWeek.how}</p>
              </div>
            </div>

            {/* Tactics & KPI */}
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-600 mb-2">施策</p>
                <ul className="space-y-1">
                  {selectedWeek.tactics.map((tactic, i) => (
                    <li key={i} className="text-sm text-gray-900 flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      {tactic}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedWeek.keywords && selectedWeek.keywords.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-purple-600 mb-2">キーワード</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedWeek.keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-purple-200 text-purple-700 rounded text-xs">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Imp/Reach/Eng カード */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-purple-50 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-purple-600 font-medium">Imp</p>
                  <p className="text-sm font-bold text-purple-700">{selectedWeek.impFormatted}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-indigo-600 font-medium">Reach</p>
                  <p className="text-sm font-bold text-indigo-700">{selectedWeek.reachFormatted}</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-teal-600 font-medium">Eng</p>
                  <p className="text-sm font-bold text-teal-700">{selectedWeek.engFormatted}</p>
                </div>
              </div>

              {/* KPI目標 */}
              <div className="bg-emerald-50 rounded-lg p-3">
                <p className="text-xs font-medium text-emerald-600 mb-2">KPI目標</p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedWeek.kpiTargets.map((kpi, i) => (
                    <div key={i} className="bg-white rounded px-2 py-1.5 border border-emerald-200">
                      <p className="text-[10px] text-gray-500">{kpi.metric}</p>
                      <p className="text-sm font-bold text-emerald-700">
                        {kpi.target}{kpi.unit && <span className="text-xs font-normal text-gray-500 ml-0.5">{kpi.unit}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-xs font-medium text-amber-600 mb-1">週予算</p>
                <p className="text-lg font-bold text-amber-700">{selectedWeek.budgetFormatted}</p>
                {selectedWeek.ctr && (
                  <p className="text-xs text-amber-600 mt-1">想定CTR: {selectedWeek.ctr}%</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tactic Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">施策別タイムライン</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-fixed">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-500 w-[140px]">施策</th>
                {calendarWeeks.map((week) => (
                  <th
                    key={week.id}
                    className={`text-center py-2 px-2 text-xs font-medium w-[108px] ${
                      week.highlight ? "bg-pink-50 text-pink-700" : "text-gray-500"
                    }`}
                  >
                    {week.id.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tacticTimeline.map((tactic) => (
                <tr key={tactic.tactic} className="border-b border-gray-100">
                  <td className="py-2 px-3 text-sm text-gray-900">{tactic.tactic}</td>
                  {calendarWeeks.map((week) => (
                    <td key={week.id} className="py-2 px-2 text-center">
                      {tactic.weeks.includes(week.id) ? (
                        tactic.peakWeek === week.id ? (
                          <span className="inline-block w-6 h-6 bg-pink-500 text-white text-xs font-bold rounded-full leading-6">
                            ★
                          </span>
                        ) : (
                          <span className="inline-block w-6 h-6 bg-gray-300 text-gray-600 text-xs rounded-full leading-6">
                            ○
                          </span>
                        )
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span className="inline-block w-4 h-4 bg-pink-500 text-white text-[10px] font-bold rounded-full leading-4 text-center">★</span>
            <span>ピーク週</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-4 h-4 bg-gray-300 text-gray-600 text-[10px] rounded-full leading-4 text-center">○</span>
            <span>実施中</span>
          </div>
        </div>
      </div>

      {/* Tactic Weekly Budget Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">施策×週別予算マトリクス</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-fixed">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-500 w-[180px]">施策</th>
                {calendarWeeks.map((week) => (
                  <th
                    key={week.id}
                    className={`text-center py-2 px-2 text-xs font-medium w-[90px] ${
                      week.highlight ? "bg-pink-50 text-pink-700" : "text-gray-500"
                    }`}
                  >
                    {week.id.toUpperCase()}
                  </th>
                ))}
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-900 bg-gray-50 w-[100px]">合計</th>
              </tr>
            </thead>
            <tbody>
              {tacticWeeklyBudgets.map((tactic) => (
                <tr key={tactic.tacticId} className="border-b border-gray-100">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getPurposeColor(tactic.purposeColor)}`}>
                        {tactic.purpose}
                      </span>
                      <span className="text-sm text-gray-900">{tactic.tactic}</span>
                    </div>
                  </td>
                  {calendarWeeks.map((week) => {
                    const weekData = tactic.weeks.find((w) => w.weekId === week.id);
                    return (
                      <td
                        key={week.id}
                        className={`py-2 px-2 text-center ${week.highlight ? "bg-pink-50" : ""}`}
                      >
                        {weekData ? (
                          <>
                            <div className={`text-xs font-bold ${weekData.isPeak ? "text-pink-700" : "text-gray-900"}`}>
                              {weekData.budgetFormatted}
                            </div>
                            {weekData.imp > 0 && (
                              <div className="text-[10px] text-purple-600">{weekData.impFormatted}</div>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-300 text-xs">-</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="py-2 px-2 text-center bg-gray-50">
                    <div className="text-sm font-bold text-gray-900">{tactic.totalBudgetFormatted}</div>
                    {tactic.totalImp > 0 && (
                      <div className="text-[10px] text-purple-600">{tactic.totalImpFormatted}</div>
                    )}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                <td className="py-2 px-3 text-sm text-gray-900">週合計</td>
                {calendarWeeks.map((week) => {
                  const weekTotal = tacticWeeklyBudgets.reduce((sum, tactic) => {
                    const weekData = tactic.weeks.find((w) => w.weekId === week.id);
                    return sum + (weekData?.budget || 0);
                  }, 0);
                  const weekImpTotal = tacticWeeklyBudgets.reduce((sum, tactic) => {
                    const weekData = tactic.weeks.find((w) => w.weekId === week.id);
                    return sum + (weekData?.imp || 0);
                  }, 0);
                  return (
                    <td
                      key={week.id}
                      className={`py-2 px-2 text-center ${week.highlight ? "bg-pink-100" : ""}`}
                    >
                      <div className="text-xs text-gray-900">
                        {weekTotal > 0 ? formatBudget(weekTotal) : "-"}
                      </div>
                      {weekImpTotal > 0 && (
                        <div className="text-[10px] text-purple-600">{formatImp(weekImpTotal)}</div>
                      )}
                    </td>
                  );
                })}
                <td className="py-2 px-2 text-center">
                  <div className="text-sm text-pink-700">{calendarSummary.totalBudgetFormatted}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// テキストを切り詰める関数
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// 目的カラーを取得
function getPurposeColor(color: string): string {
  const colors: Record<string, string> = {
    pink: "bg-pink-100 text-pink-700",
    amber: "bg-amber-100 text-amber-700",
    sky: "bg-sky-100 text-sky-700",
    emerald: "bg-emerald-100 text-emerald-700",
  };
  return colors[color] || "bg-gray-100 text-gray-700";
}

// 予算をフォーマット
function formatBudget(amount: number): string {
  const man = Math.round(amount / 10000);
  if (man >= 10000) {
    return `${(man / 10000).toFixed(1)}億`;
  }
  return `${man.toLocaleString()}万`;
}

// Impをフォーマット
function formatImp(imp: number): string {
  if (imp >= 1000000000) {
    return `${(imp / 1000000000).toFixed(1)}B`;
  }
  if (imp >= 1000000) {
    return `${(imp / 1000000).toFixed(1)}M`;
  }
  if (imp >= 1000) {
    return `${(imp / 1000).toFixed(0)}K`;
  }
  return imp.toString();
}
