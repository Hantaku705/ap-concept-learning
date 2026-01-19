import Link from 'next/link'
import { getMustCriteria, getOptionalCriteria } from '@/lib/concept'

export default function GoodConceptPage() {
  const mustCriteria = getMustCriteria()
  const optionalCriteria = getOptionalCriteria()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/concept" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← コンセプト学習に戻る
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">良いコンセプトの評価項目</h1>
      <p className="text-gray-600 mb-12">
        コンセプトを評価する14項目（マスト7項目 + 任意7項目）
      </p>

      {/* マスト7項目 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          マスト（7項目）
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          コンセプトの本質を評価する必須項目。最低限クリアすべき項目。
        </p>

        <div className="space-y-4">
          {mustCriteria.map((criterion) => (
            <div
              key={criterion.id}
              className="bg-white rounded-lg shadow-sm border border-blue-200 p-5 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                {criterion.id}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{criterion.title}</h3>
                <p className="text-sm text-gray-600">{criterion.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 任意7項目 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          任意（7項目）
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          SNSでの拡散やUGCを狙う場合に追加でチェックする項目。
        </p>

        <div className="space-y-4">
          {optionalCriteria.map((criterion) => (
            <div
              key={criterion.id}
              className="bg-white rounded-lg shadow-sm border border-purple-200 p-5 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm">
                {criterion.id}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{criterion.title}</h3>
                <p className="text-sm text-gray-600">{criterion.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 語呂のコツ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">語呂のコツ</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">5音と7音のリズム</h3>
          <p className="text-sm text-blue-800 mb-4">
            日本語は5音と7音のリズムが心地よい（俳句・短歌と同じ）
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded p-4">
              <p className="text-xs text-gray-500 mb-2">5音の例</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 塗るつけま（ぬ・る・つ・け・ま）</li>
                <li>• コンビニジム（こ・ん・び・に・じ・む）※6音</li>
              </ul>
            </div>
            <div className="bg-white rounded p-4">
              <p className="text-xs text-gray-500 mb-2">7音の例</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 夜間美容シャンプー</li>
                <li>• 顔面死守ファンデ</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 感情喚起ワード */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">感情を喚起するワード例</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">強調系</h3>
            <div className="flex flex-wrap gap-2">
              {['死守', '鉄壁', '完璧', '最強', '神'].map((word) => (
                <span key={word} className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                  {word}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">擬音・オノマトペ系</h3>
            <div className="flex flex-wrap gap-2">
              {['ぷるぷる', 'とぅるん', 'つやつや', 'サラサラ', 'もちもち'].map((word) => (
                <span key={word} className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded">
                  {word}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">時間系</h3>
            <div className="flex flex-wrap gap-2">
              {['秒', '瞬間', '24H', '夜間', '朝の'].map((word) => (
                <span key={word} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* チェックリスト */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">コンセプト完成チェックリスト</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="font-bold text-blue-700 mb-3">マスト項目</h3>
            <ul className="space-y-3">
              {mustCriteria.map((criterion) => (
                <li key={criterion.id} className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-blue-300 rounded flex-shrink-0" />
                  <span className="text-gray-700">{criterion.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-purple-700 mb-3">任意項目（拡散力強化）</h3>
            <ul className="space-y-3">
              {optionalCriteria.map((criterion) => (
                <li key={criterion.id} className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-purple-300 rounded flex-shrink-0" />
                  <span className="text-gray-700">{criterion.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
