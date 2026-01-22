"use client";

import {
  strategyMeta,
  tactics,
  tkoData,
  spReasons,
  tlRejectReasons,
  fqCalculation,
} from "@/data/strategy-data";

export default function BudgetContent() {
  const totalBudget = tactics.reduce((sum, t) => sum + t.budget, 0);
  const totalImp = tactics.reduce((sum, t) => sum + (t.imp || 0), 0);

  return (
    <div className="space-y-8">
      {/* Budget Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">総予算</p>
          <p className="text-2xl font-bold text-pink-600">{strategyMeta.totalBudgetFormatted}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">施策数</p>
          <p className="text-2xl font-bold text-gray-900">{tactics.length}施策</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">総Imp</p>
          <p className="text-2xl font-bold text-sky-600">{(totalImp / 1000000).toFixed(0)}M+</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">FQ見込み</p>
          <p className="text-2xl font-bold text-emerald-600">約{fqCalculation.fq}回</p>
        </div>
      </div>

      {/* TKO Reference Data */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">TKO実績データ（参考）</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">種類</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">費用</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Imp</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">CPM</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Reach</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">CTR</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">採用</th>
              </tr>
            </thead>
            <tbody>
              {tkoData.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 ${item.adopted ? "bg-pink-50" : ""}`}
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.type}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{item.costFormatted}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{item.impFormatted}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">¥{item.cpm}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">{item.reachFormatted}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">{item.ctr}%</td>
                  <td className="py-3 px-4 text-center">
                    {item.adopted ? (
                      <span className="px-2 py-1 bg-pink-200 text-pink-700 rounded text-xs font-bold">採用</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-200 text-gray-500 rounded text-xs">不採用</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Allocation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">最終予算配分</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">優先度</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">施策</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">予算</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">実質効果</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">備考</th>
              </tr>
            </thead>
            <tbody>
              {tactics.map((tactic) => (
                <tr key={tactic.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      tactic.priority === 1 ? "bg-pink-100 text-pink-700" :
                      tactic.priority === 2 ? "bg-amber-100 text-amber-700" :
                      tactic.priority === 3 ? "bg-sky-100 text-sky-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {tactic.priority}位
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{tactic.name}</td>
                  <td className="py-3 px-4 text-sm text-right font-bold text-gray-900">{tactic.budgetFormatted}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">
                    {tactic.impFormatted !== "-" ? `${tactic.impFormatted} Imp` : "-"}
                    {tactic.reachFormatted !== "-" && `, Reach ${tactic.reachFormatted}`}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{tactic.note}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td className="py-3 px-4" colSpan={2}>合計</td>
                <td className="py-3 px-4 text-right text-pink-600">{strategyMeta.totalBudgetFormatted}</td>
                <td className="py-3 px-4 text-right text-gray-600" colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SP Adoption Reasons */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-emerald-500">✓</span>
            SP採用理由
          </h2>
          <div className="space-y-2">
            {spReasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-emerald-50 rounded">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span className="text-sm text-gray-700">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-red-500">✗</span>
            TL/TLR不採用理由
          </h2>
          <div className="space-y-2">
            {tlRejectReasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-red-50 rounded">
                <span className="text-red-500 mt-0.5">•</span>
                <span className="text-sm text-gray-700">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FQ Calculation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">FQ試算</h2>

        {/* Prerequisites */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">ターゲット規模</p>
            <p className="text-lg font-bold text-gray-900">{fqCalculation.targetSizeFormatted}</p>
            <p className="text-xs text-gray-500">{fqCalculation.targetDescription}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">運用型広告CPM</p>
            <p className="text-lg font-bold text-gray-900">約¥{fqCalculation.cpm}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">ターゲティング可能予算</p>
            <p className="text-lg font-bold text-gray-900">{fqCalculation.targetableBudgetFormatted}</p>
            <p className="text-xs text-gray-500">SP除く</p>
          </div>
        </div>

        {/* Imp Breakdown */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Imp試算</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-500">施策</th>
                  <th className="text-right py-2 px-4 text-sm font-medium text-gray-500">予算</th>
                  <th className="text-right py-2 px-4 text-sm font-medium text-gray-500">Imp</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-500">備考</th>
                </tr>
              </thead>
              <tbody>
                {fqCalculation.impBreakdown.map((item, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${item.targetable ? "bg-emerald-50" : "bg-gray-50"}`}>
                    <td className="py-2 px-4 text-sm text-gray-900">{item.tactic}</td>
                    <td className="py-2 px-4 text-sm text-right text-gray-900">{item.budget}</td>
                    <td className="py-2 px-4 text-sm text-right text-gray-900">{item.imp}</td>
                    <td className="py-2 px-4 text-sm text-gray-500">{item.note}</td>
                  </tr>
                ))}
                <tr className="bg-emerald-100 font-bold">
                  <td className="py-2 px-4 text-sm">ターゲティング可能合計</td>
                  <td className="py-2 px-4 text-sm text-right">2,600万円</td>
                  <td className="py-2 px-4 text-sm text-right text-emerald-700">{fqCalculation.targetableImpFormatted}</td>
                  <td className="py-2 px-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FQ Result */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
          <div className="text-center">
            <p className="text-emerald-100 text-sm mb-2">FQ計算結果</p>
            <p className="text-lg mb-2">
              {fqCalculation.targetableImpFormatted} Imp ÷ {fqCalculation.targetSizeFormatted} =
            </p>
            <p className="text-4xl font-bold mb-2">約{fqCalculation.fq}回</p>
            <p className="text-emerald-100">
              目標FQ {fqCalculation.fqTarget}回以上 → <span className="font-bold text-white">{fqCalculation.result}</span>
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          ※SP(90M Imp)は別途ブロード配信でリーチ拡大に貢献
        </p>
      </div>
    </div>
  );
}
