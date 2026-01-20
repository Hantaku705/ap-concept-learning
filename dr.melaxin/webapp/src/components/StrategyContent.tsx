import {
  strategyMeta,
  highlights,
  ogsmSummary,
  csf,
  quarterRoadmap,
} from "@/data/strategy-data";

export default function StrategyContent() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">{strategyMeta.title}</h1>
        <p className="text-sm text-gray-500">{strategyMeta.subtitle}</p>
      </div>

      {/* OGSM 4象限 */}
      <section className="mb-4">
        <div className="bg-white rounded-lg shadow-sm border-2 border-sky-200 p-4 bg-gradient-to-br from-sky-50 to-white">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="mb-3">
                <span className="text-xs font-bold text-sky-600 uppercase">O: 目的</span>
                <p className="text-base font-semibold text-gray-900">{ogsmSummary.objective}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase">G: 目標</span>
                <p className="text-base font-semibold text-gray-900">{ogsmSummary.goals}</p>
              </div>
            </div>
            <div>
              <div className="mb-3">
                <span className="text-xs font-bold text-amber-600 uppercase">S: 戦略</span>
                <p className="text-base font-semibold text-gray-900">{ogsmSummary.strategy}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase">M: 戦術</span>
                <p className="text-base font-semibold text-gray-900">{ogsmSummary.measures}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI 4つ */}
      <section className="mb-4">
        <div className="grid grid-cols-4 gap-3">
          {highlights.map((item) => (
            <div key={item.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 text-center">
              <p className="text-xl font-bold" style={{ color: item.color === 'sky' ? '#0369a1' : item.color === 'emerald' ? '#059669' : item.color === 'amber' ? '#d97706' : '#8b5cf6' }}>
                {item.value}
              </p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CSF: 勝ちパターン4つ */}
      <section className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">勝ちパターン（CSF）</p>
        <div className="grid grid-cols-4 gap-3">
          {csf.map((c) => (
            <div key={c.num} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-sky-500 text-white font-bold text-xs">
                  {c.num}
                </span>
                <span className="font-bold text-sm text-gray-900">{c.factor}</span>
              </div>
              <p className="text-xs text-sky-600 bg-sky-50 px-2 py-1 rounded">{c.tactic}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 四半期ロードマップ */}
      <section>
        <p className="text-sm font-semibold text-gray-700 mb-2">年間ロードマップ</p>
        <div className="grid grid-cols-4 gap-2">
          {quarterRoadmap.map((q) => (
            <div
              key={q.q}
              className={`rounded-lg p-2 ${
                q.isPeak
                  ? "bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-400"
                  : "bg-white border border-gray-200"
              }`}
            >
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold text-sm ${q.isPeak ? "text-amber-700" : "text-gray-700"}`}>
                  {q.q}
                </span>
                <span className="text-xs text-gray-500">{q.period}</span>
              </div>
              {/* 盛り上がりバー */}
              <div className="h-2 bg-gray-100 rounded-full mb-1 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    q.isPeak ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-sky-400"
                  }`}
                  style={{ width: `${q.intensity * 20}%` }}
                />
              </div>
              {/* テーマ */}
              <p className={`text-xs font-semibold mb-1 ${q.isPeak ? "text-amber-700" : "text-gray-700"}`}>
                {q.theme}
              </p>
              {/* キーイベント */}
              <p className={`text-xs px-1.5 py-0.5 rounded inline-block ${
                q.isPeak ? "bg-amber-200 text-amber-800" : "bg-sky-50 text-sky-700"
              }`}>
                {q.keyEvent}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
