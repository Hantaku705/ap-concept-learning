import PositioningMap from "@/components/PositioningMap"
import TaglineTable from "@/components/TaglineTable"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            リップ タグライン ポジショニングマップ
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            横軸: 色持ち・機能訴求 ← → 発色・感性訴求　／　縦軸: ナチュラル ← → 華やか
          </p>
        </header>

        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">ポジショニングマップ</h2>
          <PositioningMap />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">タグライン一覧</h2>
          <TaglineTable />
        </section>
      </div>
    </main>
  )
}
