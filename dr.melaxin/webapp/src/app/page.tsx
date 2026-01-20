import Navigation from "@/components/Navigation";
import SalesChart from "@/components/charts/SalesChart";
import InvestmentPieChart from "@/components/charts/InvestmentPieChart";
import ChannelBarChart from "@/components/charts/ChannelBarChart";
import QuarterlyChart from "@/components/charts/QuarterlyChart";
import {
  proposalMeta,
  overviewData,
  strategyData,
  financialData,
  investmentData,
  channelData,
  gtmData,
  competitorData,
  promotionData,
  kolData,
  productsData,
} from "@/data/proposal-data";

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="lg:ml-64 min-h-screen p-6 lg:p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-sky">CONFIDENTIAL</span>
            <span className="badge badge-amber">{proposalMeta.date}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {proposalMeta.title}
          </h1>
          <p className="text-xl text-gray-600">{proposalMeta.subtitle}</p>
        </header>

        {/* Section 1: Overview */}
        <section id="overview" className="mb-12">
          <h2 className="section-header">概要</h2>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {overviewData.highlights.map((item) => (
              <div key={item.label} className="stat-card">
                <p className="stat-value" style={{ color: item.color === 'sky' ? '#0369a1' : item.color === 'emerald' ? '#059669' : item.color === 'amber' ? '#d97706' : '#8b5cf6' }}>
                  {item.value}
                </p>
                <p className="stat-label">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Basic Info */}
          <div className="card">
            <h3 className="card-header">基本情報</h3>
            <table className="data-table">
              <tbody>
                {overviewData.basicInfo.map((item) => (
                  <tr key={item.label}>
                    <td className="font-medium text-gray-600 w-1/4">
                      {item.label}
                    </td>
                    <td className={item.label === "目標" ? "font-bold text-sky-600" : ""}>
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Strategy */}
        <section id="strategy" className="mb-12">
          <h2 className="section-header">戦略方針</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {strategyData.comparison.map((plan) => (
              <div
                key={plan.plan}
                className={`card ${
                  plan.recommended
                    ? "border-2 border-sky-500 bg-sky-50/50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-bold">
                    {plan.plan}: {plan.name}
                  </h3>
                  {plan.recommended && (
                    <span className="recommended">推奨</span>
                  )}
                </div>
                <table className="data-table">
                  <tbody>
                    <tr>
                      <td className="font-medium text-gray-600">期間</td>
                      <td>{plan.period}</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-gray-600">アプローチ</td>
                      <td>{plan.approach}</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-gray-600">投資制限</td>
                      <td>{plan.investment}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div className="alert alert-success">
            <p className="font-semibold mb-1">Plan B 推奨理由</p>
            <p>{strategyData.recommendation}</p>
          </div>
        </section>

        {/* Section 3: Financial */}
        <section id="financial" className="mb-12">
          <h2 className="section-header">財務計画</h2>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="stat-card">
              <p className="stat-value text-sky-600">
                {financialData.summary.grossSales}億円
              </p>
              <p className="stat-label">年間売上目標</p>
            </div>
            <div className="stat-card">
              <p className="stat-value text-amber-600">
                {financialData.summary.marketingSpent}億円
              </p>
              <p className="stat-label">マーケティング投資</p>
            </div>
            <div className="stat-card">
              <p className="stat-value text-emerald-600">
                {financialData.summary.roas}%
              </p>
              <p className="stat-label">ROAS</p>
            </div>
          </div>

          {/* Phases */}
          <div className="card mb-6">
            <h3 className="card-header">フェーズ別展開</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {financialData.phases.map((phase, index) => (
                <div
                  key={phase.phase}
                  className="p-4 bg-gray-50 rounded-lg border-l-4"
                  style={{
                    borderLeftColor: ["#0369a1", "#0891b2", "#0d9488", "#059669"][index],
                  }}
                >
                  <p className="font-semibold text-gray-900">{phase.phase}</p>
                  <p className="text-sm text-gray-600 mt-1">{phase.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Chart */}
          <SalesChart />
        </section>

        {/* Section 4: Investment */}
        <section id="investment" className="mb-12">
          <h2 className="section-header">投資内訳</h2>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <InvestmentPieChart />

            {/* Outbound Mass Details */}
            <div className="card">
              <h3 className="card-header">Outbound Mass 詳細（19.2億円）</h3>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>チャネル</th>
                      <th className="text-right">年間</th>
                      <th className="text-right">Q1</th>
                      <th className="text-right">Q2</th>
                      <th className="text-right">Q3</th>
                      <th className="text-right">Q4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentData.outboundMass.map((item) => (
                      <tr key={item.channel}>
                        <td className="font-medium">{item.channel}</td>
                        <td className="text-right price">{item.annual}億</td>
                        <td className="text-right">{item.q1 || "-"}</td>
                        <td className="text-right">{item.q2 || "-"}</td>
                        <td className="text-right">{item.q3 || "-"}</td>
                        <td className="text-right">{item.q4 || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* EC & Offline */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="card-header">EC 詳細（6.3億円）</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>チャネル</th>
                    <th className="text-right">投資</th>
                    <th className="text-right">売上</th>
                    <th className="text-right">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {investmentData.ec.map((item) => (
                    <tr key={item.channel}>
                      <td className="font-medium">{item.channel}</td>
                      <td className="text-right">{item.investment}億</td>
                      <td className="text-right price">{item.sales}億</td>
                      <td className="text-right text-emerald-600 font-bold">
                        {item.roas}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card">
              <h3 className="card-header">Offline 詳細（12.4億円）</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>チャネル</th>
                    <th className="text-right">投資</th>
                    <th className="text-right">売上</th>
                    <th className="text-right">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {investmentData.offline.map((item) => (
                    <tr key={item.channel}>
                      <td className="font-medium">{item.channel}</td>
                      <td className="text-right">{item.investment}億</td>
                      <td className="text-right price">{item.sales}億</td>
                      <td className="text-right text-emerald-600 font-bold">
                        {item.roas}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: Channels */}
        <section id="channels" className="mb-12">
          <h2 className="section-header">チャネル戦略</h2>

          {/* Channel Bar Chart */}
          <div className="mb-6">
            <ChannelBarChart />
          </div>

          {/* Priority Channels */}
          <div className="grid md:grid-cols-2 gap-6">
            {channelData.priorities.map((channel) => (
              <div key={channel.priority} className="card">
                <div className="flex items-start gap-3 mb-4">
                  <span className={`priority-badge priority-${channel.priority}`}>
                    {channel.priority}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900">{channel.title}</h3>
                    <p className="text-sm text-gray-500">{channel.channel}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {channel.points.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-sky-500 mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: GTM */}
        <section id="gtm" className="mb-12">
          <h2 className="section-header">GTMロードマップ</h2>

          {/* Quarterly Chart */}
          <div className="mb-6">
            <QuarterlyChart />
          </div>

          {/* Events Calendar */}
          <div className="card mb-6">
            <h3 className="card-header">イベントカレンダー</h3>
            <div className="flex flex-wrap gap-2">
              {gtmData.events.map((event) => (
                <div
                  key={event.month}
                  className="px-3 py-2 bg-sky-50 rounded-lg border border-sky-200"
                >
                  <p className="font-semibold text-sky-700">{event.month}</p>
                  <p className="text-sm text-gray-600">{event.event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Roadmap */}
          <div className="card mb-6">
            <h3 className="card-header">製品展開</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>期間</th>
                  <th>Main SKU</th>
                  <th>Sub SKU</th>
                  <th>Exclusive (TTS)</th>
                </tr>
              </thead>
              <tbody>
                {gtmData.productRoadmap.map((item) => (
                  <tr key={item.period}>
                    <td className="font-medium">{item.period}</td>
                    <td className="font-bold text-sky-600">{item.mainSku}</td>
                    <td>{item.subSku}</td>
                    <td>{item.exclusive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Promotion & Offline Phases */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="card-header">プロモーション展開</h3>
              <div className="space-y-3">
                {gtmData.promotionPhases.map((phase) => (
                  <div key={phase.phase} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <p className="font-semibold text-gray-900">{phase.phase}</p>
                    <p className="text-sm text-gray-600">{phase.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="card-header">オフライン展開</h3>
              <div className="space-y-3">
                {gtmData.offlinePhases.map((phase) => (
                  <div key={phase.phase} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <p className="font-semibold text-gray-900">{phase.phase}</p>
                    <p className="text-sm text-gray-600">{phase.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Competitors */}
        <section id="competitors" className="mb-12">
          <h2 className="section-header">競合分析</h2>

          {/* GMV Comparison */}
          <div className="card mb-6">
            <h3 className="card-header">チャネル別GMV比較（単位: 億円）</h3>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ブランド</th>
                    <th className="text-right">Total</th>
                    <th className="text-right">Qoo10</th>
                    <th className="text-right">TTS</th>
                    <th className="text-right">Amazon</th>
                    <th className="text-right">楽天</th>
                    <th className="text-right">Variety</th>
                    <th className="text-right">Drug</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorData.gmvComparison.map((item) => (
                    <tr key={item.brand}>
                      <td className="font-bold">{item.brand}</td>
                      <td className="text-right price text-sky-600">
                        {item.total}
                      </td>
                      <td className="text-right">{item.qoo10}</td>
                      <td className="text-right">{item.tts}</td>
                      <td className="text-right">{item.amazon}</td>
                      <td className="text-right">{item.rakuten}</td>
                      <td className="text-right">{item.variety}</td>
                      <td className="text-right">{item.drug}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Competitor Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {competitorData.features.map((item) => (
              <div key={item.brand} className="card">
                <h4 className="font-bold text-lg mb-2">{item.brand}</h4>
                <p className="text-gray-600">{item.mainProduct}</p>
              </div>
            ))}
          </div>

          {/* Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card border-l-4 border-l-amber-500">
              <h4 className="font-bold mb-2">ナンバーズインの失速要因</h4>
              <p className="text-gray-600 text-sm mb-2">
                {competitorData.numbersIn.issue}
              </p>
              <p className="text-amber-700 text-sm font-medium">
                原因: {competitorData.numbersIn.cause}
              </p>
              <p className="text-sky-700 text-sm mt-2">
                教訓: {competitorData.numbersIn.lesson}
              </p>
            </div>

            <div className="card border-l-4 border-l-red-500">
              <h4 className="font-bold mb-2">カルシウム製品の日本展開</h4>
              <p className="text-gray-600 text-sm mb-2">
                US: {competitorData.calcium.us}
              </p>
              <p className="text-red-700 text-sm font-medium">
                日本: {competitorData.calcium.japan}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                理由: {competitorData.calcium.reason}
              </p>
            </div>
          </div>

          {/* Ad Distribution */}
          <div className="card mt-6">
            <h3 className="card-header">広告配信状況（メガ割期間）</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ブランド</th>
                  <th className="text-center">FB/IG</th>
                  <th className="text-center">TikTok</th>
                  <th className="text-center">X</th>
                  <th className="text-center">YouTube</th>
                </tr>
              </thead>
              <tbody>
                {competitorData.adDistribution.map((item) => (
                  <tr key={item.brand}>
                    <td className="font-medium">{item.brand}</td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          item.fbIg === "高"
                            ? "badge-emerald"
                            : item.fbIg === "中"
                            ? "badge-amber"
                            : "badge-gray"
                        }`}
                      >
                        {item.fbIg}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          item.tiktok === "高"
                            ? "badge-emerald"
                            : item.tiktok === "中"
                            ? "badge-amber"
                            : "badge-gray"
                        }`}
                      >
                        {item.tiktok}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          item.x === "高"
                            ? "badge-emerald"
                            : item.x === "中"
                            ? "badge-amber"
                            : "badge-gray"
                        }`}
                      >
                        {item.x}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          item.yt === "高"
                            ? "badge-emerald"
                            : item.yt === "中"
                            ? "badge-amber"
                            : "badge-gray"
                        }`}
                      >
                        {item.yt}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 8: Promotion */}
        <section id="promotion" className="mb-12">
          <h2 className="section-header">プロモーション戦略</h2>

          {/* Online Tactics */}
          <div className="card mb-6">
            <h3 className="card-header">オンライン施策</h3>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>施策</th>
                    <th>目的</th>
                    <th>役割</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  {promotionData.online.map((item) => (
                    <tr key={item.tactic}>
                      <td className="font-medium">{item.tactic}</td>
                      <td>
                        <span className="badge badge-sky">{item.purpose}</span>
                      </td>
                      <td className="text-sm">{item.role}</td>
                      <td className="text-sm text-gray-600">{item.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Offline Tactics */}
          <div className="card">
            <h3 className="card-header">オフライン施策</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>施策</th>
                  <th>目的</th>
                  <th>詳細</th>
                </tr>
              </thead>
              <tbody>
                {promotionData.offline.map((item) => (
                  <tr key={item.tactic}>
                    <td className="font-medium">{item.tactic}</td>
                    <td>
                      <span className="badge badge-amber">{item.purpose}</span>
                    </td>
                    <td className="text-sm text-gray-600">{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 9: KOL */}
        <section id="kol" className="mb-12">
          <h2 className="section-header">KOL・TikTok Shop</h2>

          {/* Strategy */}
          <div className="alert alert-info mb-6">
            <p className="font-semibold mb-1">KOL Pick戦略</p>
            <p className="mb-2">{kolData.strategy.key}</p>
            <p className="text-sm">{kolData.strategy.approach}</p>
          </div>

          {/* Recommended KOLs */}
          <div className="card mb-6">
            <h3 className="card-header">推奨KOL</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {kolData.recommendedKols.map((kol) => (
                <div key={kol.name} className="kol-card">
                  <div className="kol-avatar">{kol.name.charAt(0)}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{kol.name}</p>
                    <p className="text-sm text-sky-600">{kol.followers}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ELLISS Case Study */}
          <div className="card">
            <h3 className="card-header">TikTok Shop 事例: {kolData.ellissCase.brand}</h3>
            <p className="text-gray-600 mb-4">
              戦略: {kolData.ellissCase.strategy}
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              {kolData.ellissCase.results.map((result) => (
                <div key={result.type} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">{result.type}</p>
                  <p className="font-bold text-lg text-gray-900">
                    {result.views || result.sales}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="mb-12">
          <div className="card">
            <h3 className="card-header">主要製品（SKU）</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>カテゴリ</th>
                  <th>製品</th>
                  <th>展開時期</th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((product) => (
                  <tr key={product.product}>
                    <td>
                      <span
                        className={`badge ${
                          product.category === "Main"
                            ? "badge-sky"
                            : product.category === "Sub"
                            ? "badge-gray"
                            : "badge-violet"
                        }`}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="font-medium">{product.product}</td>
                    <td>{product.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p className="mb-2">
            {proposalMeta.proposer} | {proposalMeta.date}
          </p>
          <p className="text-xs text-gray-400">{proposalMeta.classification}</p>
        </footer>
      </main>
    </>
  );
}
