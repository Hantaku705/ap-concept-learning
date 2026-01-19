import Link from 'next/link'
import { getAllDefinitions } from '@/lib/concept'

export default function DefinitionPage() {
  const definitions = getAllDefinitions()
  const reframing = definitions.find(d => d.id === 'reframing')
  const fiveConditions = definitions.find(d => d.id === 'five-conditions')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/concept" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← コンセプト学習に戻る
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">コンセプトの定義</h1>
      <p className="text-gray-600 mb-8">
        コンセプトとは、商品やサービスの本質的な価値を「短く伝わる言葉」で表現したもの。
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-12">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> 良いコンセプトの定義は複数あり、それぞれの視点から商品コンセプトを評価することが重要。
        </p>
      </div>

      {/* 定義1: リフレーミング公式 */}
      {reframing && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            定義1: {reframing.name}
          </h2>

          {/* 公式 */}
          {reframing.formula && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-sm font-bold text-blue-800 mb-3">公式</h3>
              <p className="text-lg text-blue-900 font-medium leading-relaxed">
                {reframing.formula}
              </p>
            </div>
          )}

          {/* 4要素 */}
          {reframing.elements && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">4つの要素</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {reframing.elements.map((element, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                    <h4 className="font-bold text-gray-900 mb-2">{index + 1}. {element.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{element.description}</p>

                    {element.examples && element.examples.length > 0 && (
                      <div className="space-y-2">
                        {element.examples.slice(0, 2).map((ex, i) => (
                          <div key={i} className="text-xs bg-gray-50 p-2 rounded">
                            {ex.before && ex.after && (
                              <span>{ex.before} → 「{ex.after}」</span>
                            )}
                            {ex.insight && ex.result && (
                              <span>「{ex.insight}」→「{ex.result}」</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {element.good && (
                      <div className="mt-3">
                        <span className="text-xs text-green-600 font-medium">良い例: </span>
                        <span className="text-xs text-gray-600">{element.good.join('、')}</span>
                      </div>
                    )}

                    {element.points && (
                      <ul className="mt-3 space-y-1">
                        {element.points.map((point, i) => (
                          <li key={i} className="text-xs text-gray-600">• {point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">使いどころ: {reframing.usage}</span>
          </div>
        </section>
      )}

      <hr className="my-12 border-gray-200" />

      {/* 定義2: 5条件 */}
      {fiveConditions && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            定義2: {fiveConditions.name}
          </h2>
          {fiveConditions.source && (
            <p className="text-sm text-gray-500 mb-6">出典: {fiveConditions.source}</p>
          )}

          {fiveConditions.conditions && (
            <div className="space-y-6">
              {fiveConditions.conditions.map((condition) => (
                <div key={condition.number} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {condition.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{condition.title}</h3>
                      <p className="text-sm text-blue-600 mb-3">{condition.point}</p>
                      <p className="text-sm text-gray-600 mb-4">{condition.description}</p>

                      {condition.costs && (
                        <div className="bg-gray-50 rounded p-3 mb-4">
                          <p className="text-xs font-medium text-gray-700 mb-2">3つのコスト:</p>
                          <div className="grid grid-cols-3 gap-2">
                            {condition.costs.map((cost, i) => (
                              <div key={i} className="text-xs">
                                <span className="font-medium">{cost.type}</span>
                                <p className="text-gray-500">{cost.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {condition.example && condition.example.scenario && (
                        <div className="bg-yellow-50 rounded p-3 mb-4">
                          <p className="text-xs font-medium text-yellow-800 mb-2">例: {condition.example.scenario}</p>
                          {condition.example.steps && (
                            <ol className="text-xs text-yellow-700 space-y-1">
                              {condition.example.steps.map((step, i) => (
                                <li key={i}>{i + 1}. {step}</li>
                              ))}
                            </ol>
                          )}
                        </div>
                      )}

                      {condition.example && condition.example.product && (
                        <div className="bg-green-50 rounded p-3 mb-4">
                          <p className="text-xs font-medium text-green-800 mb-2">例: {condition.example.product}</p>
                          {condition.example.barriers && (
                            <div className="mb-2">
                              <p className="text-xs text-green-700">買わない理由:</p>
                              <ul className="text-xs text-green-600 ml-3">
                                {condition.example.barriers.map((b, i) => (
                                  <li key={i}>• {b}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {condition.example.solutions && (
                            <div>
                              <p className="text-xs text-green-700">先回りして:</p>
                              <ul className="text-xs text-green-600 ml-3">
                                {condition.example.solutions.map((s, i) => (
                                  <li key={i}>• {s}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {condition.tips && (
                        <ul className="text-xs text-gray-600 space-y-1">
                          {condition.tips.map((tip, i) => (
                            <li key={i}>• {tip}</li>
                          ))}
                        </ul>
                      )}

                      {condition.checklist && (
                        <ul className="text-xs text-gray-600 space-y-1">
                          {condition.checklist.map((item, i) => (
                            <li key={i}>☑ {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">使いどころ: {fiveConditions.usage}</span>
          </div>
        </section>
      )}

      {/* 定義の比較 */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">定義の比較</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-medium text-gray-700">観点</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">定義1（リフレーミング公式）</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">定義2（5条件）</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">焦点</td>
                <td className="py-2 px-3">ネーミング・タグライン</td>
                <td className="py-2 px-3">商品コンセプト全体</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">強み</td>
                <td className="py-2 px-3">差別化・独自性</td>
                <td className="py-2 px-3">購買までの説得力</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">使いどころ</td>
                <td className="py-2 px-3">コピー・ネーミング開発</td>
                <td className="py-2 px-3">商品企画・広告設計</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          両方の定義を組み合わせることで、より強力なコンセプトが作れる
        </p>
      </section>
    </div>
  )
}
