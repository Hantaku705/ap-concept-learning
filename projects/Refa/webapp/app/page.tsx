import { Navigation } from '@/components/Navigation'
import { AdoptionCurve } from '@/components/charts/AdoptionCurve'
import { SalesChart } from '@/components/charts/SalesChart'
import { KPICards } from '@/components/KPICards'
import { PhaseTimeline } from '@/components/PhaseTimeline'
import { successFactors, futureOutlook } from '@/data/report-data'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ReFa プロモーション変遷分析
          </h1>
          <p className="text-gray-600 mt-2">
            2019年〜2025年：インバウンド崩壊からの復活
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              MTG株式会社
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
              作成日: 2026年1月26日
            </span>
          </div>
        </div>

        {/* KPIカード */}
        <section className="mb-8">
          <KPICards />
        </section>

        {/* イノベーター理論曲線 */}
        <section className="mb-8">
          <AdoptionCurve />
        </section>

        {/* 売上推移グラフ */}
        <section className="mb-8">
          <SalesChart />
        </section>

        {/* フェーズタイムライン */}
        <section className="mb-8">
          <PhaseTimeline />
        </section>

        {/* 成功要因 */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">復活の成功要因</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {successFactors.map((factor, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <h3 className="font-bold text-sm">{factor.factor}</h3>
                  </div>
                  <p className="text-blue-100 text-xs">{factor.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 今後の展望 */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-2">{futureOutlook.title}</h2>
            <p className="text-purple-100 text-sm mb-6">{futureOutlook.summary}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {futureOutlook.evidence.map((e, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      {e.icon === 'building' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                      {e.icon === 'lab' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      )}
                      {e.icon === 'cycle' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      )}
                    </span>
                    <h3 className="font-bold text-sm">{e.title}</h3>
                  </div>
                  <p className="text-purple-100 text-xs">{e.detail}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <p className="font-bold mb-1">示唆</p>
              <p className="text-purple-100 text-sm">{futureOutlook.conclusion}</p>
            </div>
          </div>
        </section>

        {/* フッター */}
        <footer className="text-center text-gray-400 text-sm py-8 border-t">
          <p>本レポートは公開情報に基づいて作成されています。</p>
          <p className="mt-1">
            出典: MTG IR資料、WWDJAPAN、日経クロストレンド、販促会議
          </p>
        </footer>
      </main>
    </>
  )
}
