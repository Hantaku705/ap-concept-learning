"use client";

import { useState, useMemo } from "react";
import {
  annualBudgetMatrix,
  annualReachMatrix,
  filterOptions,
  formatBudget,
  formatReach,
  getSnsColor,
  purposeColors,
  type Purpose,
} from "@/data/matrix-data";

type ViewMode = "budget" | "reach" | "both";
type DataFilter = {
  sns: string[];
  tactic: string[];
  purpose: string[];
  quarter: string[];
  month: string[];
};

// Quarter to months mapping
const quarterMonths: Record<string, string[]> = {
  Q1: ["2月", "3月"],
  Q2: ["4月", "5月", "6月"],
  Q3: ["7月", "8月", "9月"],
  Q4: ["10月", "11月", "12月"],
};

const quarters = ["Q1", "Q2", "Q3", "Q4"];

// Month mapping from Japanese to English keys
const monthMapping: Record<string, string> = {
  "2月": "feb",
  "3月": "mar",
  "4月": "apr",
  "5月": "may",
  "6月": "jun",
  "7月": "jul",
  "8月": "aug",
  "9月": "sep",
  "10月": "oct",
  "11月": "nov",
  "12月": "dec",
};

const months = ["2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

type MatrixDataRow = {
  tactic: string;
  sns: string;
  purpose?: Purpose[];
  data: Record<string, number>;
  total: number;
  kpi?: string;
};

export default function FilterableMatrix() {
  const [viewMode, setViewMode] = useState<ViewMode>("budget");
  const [filters, setFilters] = useState<DataFilter>({
    sns: [],
    tactic: [],
    purpose: [],
    quarter: [],
    month: [],
  });

  const toggleFilter = (type: "sns" | "tactic" | "purpose" | "quarter" | "month", value: string) => {
    setFilters((prev) => {
      const current = prev[type];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [type]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({ sns: [], tactic: [], purpose: [], quarter: [], month: [] });
  };

  // Calculate filtered months based on quarter and month filters
  const filteredMonths = useMemo(() => {
    let result = [...months];

    // Apply quarter filter
    if (filters.quarter.length > 0) {
      const quarterAllowedMonths = filters.quarter.flatMap(q => quarterMonths[q]);
      result = result.filter(m => quarterAllowedMonths.includes(m));
    }

    // Apply month filter (AND condition)
    if (filters.month.length > 0) {
      result = result.filter(m => filters.month.includes(m));
    }

    return result;
  }, [filters.quarter, filters.month]);

  const filteredBudgetData = useMemo(() => {
    return (annualBudgetMatrix as MatrixDataRow[]).filter((row) => {
      if (filters.sns.length > 0 && !filters.sns.includes(row.sns)) return false;
      if (filters.tactic.length > 0 && !filters.tactic.includes(row.tactic)) return false;
      if (filters.purpose.length > 0) {
        const rowPurposes = row.purpose || [];
        if (!filters.purpose.some((p) => rowPurposes.includes(p as Purpose))) return false;
      }
      return true;
    });
  }, [filters]);

  const filteredReachData = useMemo(() => {
    return (annualReachMatrix as MatrixDataRow[]).filter((row) => {
      if (filters.sns.length > 0 && !filters.sns.includes(row.sns)) return false;
      if (filters.tactic.length > 0 && !filters.tactic.includes(row.tactic)) return false;
      if (filters.purpose.length > 0) {
        const rowPurposes = row.purpose || [];
        if (!filters.purpose.some((p) => rowPurposes.includes(p as Purpose))) return false;
      }
      return true;
    });
  }, [filters]);

  const getMonthValue = (row: MatrixDataRow, month: string): number => {
    const key = monthMapping[month];
    return row.data[key] || 0;
  };

  const calculateTotals = (data: MatrixDataRow[], visibleMonths: string[]) => {
    const totals: Record<string, number> = {};
    visibleMonths.forEach((m) => {
      totals[m] = data.reduce((sum, row) => sum + getMonthValue(row, m), 0);
    });
    totals.total = visibleMonths.reduce((sum, m) => sum + totals[m], 0);
    return totals;
  };

  // Calculate row total for filtered months only
  const calculateRowTotal = (row: MatrixDataRow, visibleMonths: string[]) => {
    return visibleMonths.reduce((sum, m) => sum + getMonthValue(row, m), 0);
  };

  const budgetTotals = calculateTotals(filteredBudgetData, filteredMonths);
  const reachTotals = calculateTotals(filteredReachData, filteredMonths);

  const renderCell = (value: number, type: "budget" | "reach") => {
    if (value === 0) return <span className="text-gray-300">-</span>;
    return type === "budget" ? formatBudget(value) : formatReach(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-lg font-semibold text-gray-900">メディア投資マトリックス</h3>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            {(["budget", "reach", "both"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === mode
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {mode === "budget" ? "予算" : mode === "reach" ? "Reach" : "両方"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-medium text-gray-700">フィルター:</span>

          {/* SNS Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">SNS:</span>
            <div className="flex flex-wrap gap-1">
              {filterOptions.sns.map((sns) => {
                const isActive = filters.sns.includes(sns);
                const color = getSnsColor(sns);
                return (
                  <button
                    key={sns}
                    onClick={() => toggleFilter("sns", sns)}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      isActive
                        ? "font-medium"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                    style={isActive ? { backgroundColor: `${color}20`, color: color } : undefined}
                  >
                    {sns}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Purpose Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">目的:</span>
            <div className="flex flex-wrap gap-1">
              {filterOptions.purpose.filter(p => p !== "全て").map((purpose) => {
                const isActive = filters.purpose.includes(purpose);
                const color = purposeColors[purpose as Purpose] || "#888";
                return (
                  <button
                    key={purpose}
                    onClick={() => toggleFilter("purpose", purpose)}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      isActive
                        ? "font-medium"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                    style={isActive ? { backgroundColor: `${color}20`, color: color } : undefined}
                  >
                    {purpose}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quarter Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">期間:</span>
            <div className="flex flex-wrap gap-1">
              {quarters.map((q) => {
                const isActive = filters.quarter.includes(q);
                return (
                  <button
                    key={q}
                    onClick={() => toggleFilter("quarter", q)}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {q}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Month Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">月:</span>
            <div className="flex flex-wrap gap-1">
              {months.map((m) => {
                const isActive = filters.month.includes(m);
                return (
                  <button
                    key={m}
                    onClick={() => toggleFilter("month", m)}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      isActive
                        ? "bg-green-100 text-green-700 font-medium"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          {(filters.sns.length > 0 || filters.tactic.length > 0 || filters.purpose.length > 0 || filters.quarter.length > 0 || filters.month.length > 0) && (
            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              クリア
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {(viewMode === "budget" || viewMode === "both") && (
          <div className={viewMode === "both" ? "mb-6" : ""}>
            {viewMode === "both" && (
              <div className="px-4 py-2 bg-amber-50 border-b border-amber-200">
                <span className="text-sm font-medium text-amber-700">予算（万円）</span>
              </div>
            )}
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 sticky left-0 bg-gray-50">SNS</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">施策</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">目的</th>
                  {filteredMonths.map((m) => (
                    <th key={m} className="px-2 py-2 text-right text-xs font-medium text-gray-500 whitespace-nowrap">
                      {m}
                    </th>
                  ))}
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 bg-gray-100">計</th>
                </tr>
              </thead>
              <tbody>
                {filteredBudgetData.map((row, idx) => {
                  const color = getSnsColor(row.sns);
                  return (
                    <tr key={`${row.sns}-${row.tactic}-${idx}`} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2 sticky left-0 bg-white font-medium" style={{ color }}>
                        {row.sns}
                      </td>
                      <td className="px-3 py-2 text-gray-600">{row.tactic}</td>
                      <td className="px-2 py-2">
                        <div className="flex flex-wrap gap-1">
                          {(row.purpose || []).map((p) => (
                            <span
                              key={p}
                              className="px-1.5 py-0.5 text-xs rounded"
                              style={{
                                backgroundColor: `${purposeColors[p]}20`,
                                color: purposeColors[p],
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                      {filteredMonths.map((m) => (
                        <td key={m} className="px-2 py-2 text-right text-gray-700 tabular-nums">
                          {renderCell(getMonthValue(row, m), "budget")}
                        </td>
                      ))}
                      <td className="px-3 py-2 text-right font-medium text-gray-900 bg-gray-50 tabular-nums">
                        {formatBudget(calculateRowTotal(row, filteredMonths))}
                      </td>
                    </tr>
                  );
                })}
                {/* Totals row */}
                <tr className="border-t-2 border-gray-300 bg-gray-100 font-medium">
                  <td className="px-3 py-2 sticky left-0 bg-gray-100" colSpan={3}>合計</td>
                  {filteredMonths.map((m) => (
                    <td key={m} className="px-2 py-2 text-right text-gray-900 tabular-nums">
                      {formatBudget(budgetTotals[m])}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-right text-gray-900 bg-gray-200 tabular-nums">
                    {formatBudget(budgetTotals.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {(viewMode === "reach" || viewMode === "both") && (
          <div>
            {viewMode === "both" && (
              <div className="px-4 py-2 bg-purple-50 border-b border-purple-200">
                <span className="text-sm font-medium text-purple-700">Reach（万UU）</span>
              </div>
            )}
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 sticky left-0 bg-gray-50">SNS</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">施策</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">目的</th>
                  {filteredMonths.map((m) => (
                    <th key={m} className="px-2 py-2 text-right text-xs font-medium text-gray-500 whitespace-nowrap">
                      {m}
                    </th>
                  ))}
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 bg-gray-100">計</th>
                </tr>
              </thead>
              <tbody>
                {filteredReachData.map((row, idx) => {
                  const color = getSnsColor(row.sns);
                  return (
                    <tr key={`${row.sns}-${row.tactic}-${idx}`} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2 sticky left-0 bg-white font-medium" style={{ color }}>
                        {row.sns}
                      </td>
                      <td className="px-3 py-2 text-gray-600">{row.tactic}</td>
                      <td className="px-2 py-2">
                        <div className="flex flex-wrap gap-1">
                          {(row.purpose || []).map((p) => (
                            <span
                              key={p}
                              className="px-1.5 py-0.5 text-xs rounded"
                              style={{
                                backgroundColor: `${purposeColors[p]}20`,
                                color: purposeColors[p],
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                      {filteredMonths.map((m) => (
                        <td key={m} className="px-2 py-2 text-right text-gray-700 tabular-nums">
                          {renderCell(getMonthValue(row, m), "reach")}
                        </td>
                      ))}
                      <td className="px-3 py-2 text-right font-medium text-gray-900 bg-gray-50 tabular-nums">
                        {formatReach(calculateRowTotal(row, filteredMonths))}
                      </td>
                    </tr>
                  );
                })}
                {/* Totals row */}
                <tr className="border-t-2 border-gray-300 bg-gray-100 font-medium">
                  <td className="px-3 py-2 sticky left-0 bg-gray-100" colSpan={3}>合計</td>
                  {filteredMonths.map((m) => (
                    <td key={m} className="px-2 py-2 text-right text-gray-900 tabular-nums">
                      {formatReach(reachTotals[m])}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-right text-gray-900 bg-gray-200 tabular-nums">
                    {formatReach(reachTotals.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {filteredBudgetData.length}件の施策を表示中
          </span>
          <div className="flex gap-4">
            <span className="text-gray-700">
              予算合計: <strong className="text-amber-600">{formatBudget(budgetTotals.total)}</strong>
            </span>
            <span className="text-gray-700">
              Reach合計: <strong className="text-purple-600">{formatReach(reachTotals.total)}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
