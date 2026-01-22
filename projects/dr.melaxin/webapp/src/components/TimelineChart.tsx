"use client";

import { quarterSummaries } from "@/data/quarterly-data";

const months = [
  { month: "2月", quarter: "Q1" },
  { month: "3月", quarter: "Q1", megaSale: true },
  { month: "4月", quarter: "Q2" },
  { month: "5月", quarter: "Q2" },
  { month: "6月", quarter: "Q2", megaSale: true },
  { month: "7月", quarter: "Q3" },
  { month: "8月", quarter: "Q3" },
  { month: "9月", quarter: "Q3", megaSale: true },
  { month: "10月", quarter: "Q4" },
  { month: "11月", quarter: "Q4", megaSale: true },
  { month: "12月", quarter: "Q4" },
];

const quarterColors: Record<string, { bg: string; border: string; text: string }> = {
  Q1: { bg: "bg-sky-100", border: "border-sky-400", text: "text-sky-700" },
  Q2: { bg: "bg-amber-100", border: "border-amber-400", text: "text-amber-700" },
  Q3: { bg: "bg-emerald-100", border: "border-emerald-400", text: "text-emerald-700" },
  Q4: { bg: "bg-purple-100", border: "border-purple-400", text: "text-purple-700" },
};

export default function TimelineChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="card-header mb-6">年間タイムライン</h3>

      {/* Quarter Summary */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {quarterSummaries.map((q) => {
          const colors = quarterColors[q.name];
          return (
            <div
              key={q.id}
              className={`p-4 rounded-lg ${colors.bg} border-l-4 ${colors.border}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-bold ${colors.text}`}>{q.name}</span>
                <span className="text-xs text-gray-500">{q.period}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{q.keyMessage}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">投資</span>
                  <p className="font-semibold text-gray-700">{q.investment}</p>
                </div>
                <div>
                  <span className="text-gray-500">GMV</span>
                  <p className="font-semibold text-gray-700">{q.targetGmv}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full" />

        {/* Month markers */}
        <div className="relative flex justify-between">
          {months.map((m) => {
            const colors = quarterColors[m.quarter];
            return (
              <div key={m.month} className="flex flex-col items-center" style={{ width: "calc(100% / 11)" }}>
                {/* Dot */}
                <div
                  className={`w-4 h-4 rounded-full border-2 z-10 ${
                    m.megaSale
                      ? "bg-amber-400 border-amber-500"
                      : `${colors.bg} ${colors.border}`
                  }`}
                />

                {/* Month label */}
                <span className="mt-2 text-xs font-medium text-gray-600">{m.month}</span>

                {/* Mega sale indicator */}
                {m.megaSale && (
                  <span className="mt-1 text-[10px] font-bold text-amber-600 bg-amber-100 px-1 rounded">
                    MEGA
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Quarter brackets */}
        <div className="mt-6 flex">
          <div className="flex-[2] flex justify-center">
            <span className={`text-xs font-medium ${quarterColors.Q1.text} ${quarterColors.Q1.bg} px-3 py-1 rounded-full`}>
              Q1 (2-3月)
            </span>
          </div>
          <div className="flex-[3] flex justify-center">
            <span className={`text-xs font-medium ${quarterColors.Q2.text} ${quarterColors.Q2.bg} px-3 py-1 rounded-full`}>
              Q2 (4-6月)
            </span>
          </div>
          <div className="flex-[3] flex justify-center">
            <span className={`text-xs font-medium ${quarterColors.Q3.text} ${quarterColors.Q3.bg} px-3 py-1 rounded-full`}>
              Q3 (7-9月)
            </span>
          </div>
          <div className="flex-[3] flex justify-center">
            <span className={`text-xs font-medium ${quarterColors.Q4.text} ${quarterColors.Q4.bg} px-3 py-1 rounded-full`}>
              Q4 (10-12月)
            </span>
          </div>
        </div>
      </div>

      {/* Key Events */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">主要イベント</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quarterSummaries.map((q) => (
            <div key={q.id} className="space-y-2">
              <p className={`text-xs font-medium ${quarterColors[q.name].text}`}>{q.name}</p>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium">
                  {q.mainEvent}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Reach {q.totalReach}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Annual Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500">年間投資</p>
            <p className="text-lg font-bold text-gray-900">15.8億円</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">年間GMV</p>
            <p className="text-lg font-bold text-sky-600">73.6億円</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">年間ROAS</p>
            <p className="text-lg font-bold text-emerald-600">466%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">年間Reach</p>
            <p className="text-lg font-bold text-purple-600">約6.6億UU</p>
          </div>
        </div>
      </div>
    </div>
  );
}
