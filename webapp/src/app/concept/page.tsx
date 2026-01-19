import Link from 'next/link'
import { getAllDefinitions, getAllExamples } from '@/lib/concept'

export default function ConceptPage() {
  const definitions = getAllDefinitions()
  const examples = getAllExamples()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          コンセプト学習
        </h1>
        <p className="text-lg text-gray-600">
          良いコンセプトの作り方を学ぶ
        </p>
        <p className="text-sm text-gray-500 mt-2">
          「事例 ⇔ 抽象化」を双方向に行き来しながら、良いコンセプトの作り方を習得する
        </p>
      </div>

      {/* 3つのセクション */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Link
          href="/concept/definition"
          className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all"
        >
          <div className="text-3xl mb-3">📖</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">コンセプトの定義</h2>
          <p className="text-sm text-gray-600">
            コンセプトとは何か、2つの定義と公式
          </p>
          <div className="mt-4 text-blue-600 text-sm font-medium">
            詳しく見る →
          </div>
        </Link>

        <Link
          href="/concept/good-concept"
          className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all"
        >
          <div className="text-3xl mb-3">✨</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">良いコンセプトとは</h2>
          <p className="text-sm text-gray-600">
            UGC向けネーミングの7条件と評価基準
          </p>
          <div className="mt-4 text-blue-600 text-sm font-medium">
            詳しく見る →
          </div>
        </Link>

        <Link
          href="/concept/examples"
          className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all"
        >
          <div className="text-3xl mb-3">📚</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">事例で学ぶ</h2>
          <p className="text-sm text-gray-600">
            {examples.length}つの成功事例を分析
          </p>
          <div className="mt-4 text-blue-600 text-sm font-medium">
            詳しく見る →
          </div>
        </Link>
      </div>

      {/* 定義の概要 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">2つの定義</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> 良いコンセプトの定義は複数あり、それぞれの視点から商品コンセプトを評価することが重要。
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {definitions.map((def) => (
            <div key={def.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{def.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{def.description}</p>
              <div className="text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">使いどころ: {def.usage}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 最新事例プレビュー */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">事例</h2>
          <Link href="/concept/examples" className="text-blue-600 text-sm hover:underline">
            すべて見る →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {examples.slice(0, 4).map((example) => (
            <Link
              key={example.slug}
              href={`/concept/examples/${example.slug}`}
              className="block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {example.brand}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">「{example.title}」</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {example.concept.existing} → {example.concept.newPerspective}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
