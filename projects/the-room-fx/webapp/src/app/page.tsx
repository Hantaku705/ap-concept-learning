'use client';

import { useState } from 'react';
import SectionNav from '@/components/SectionNav';
import PersonaCard from '@/components/PersonaCard';
import BudgetPieChart from '@/components/charts/BudgetPieChart';
import SentimentChart from '@/components/charts/SentimentChart';
import TimelineChart from '@/components/charts/TimelineChart';
import {
  sections,
  executiveSummary,
  ourUnderstanding,
  marketInsight,
  targetStrategy,
  mediaStrategy,
  budgetAllocation,
  kpiFramework,
  campaignTimeline,
  operation,
  whyAnyMind,
  influencerList,
} from '@/data/proposal-data';

export default function Home() {
  const [activeSection, setActiveSection] = useState('executive-summary');

  const renderSection = () => {
    switch (activeSection) {
      case 'executive-summary':
        return <ExecutiveSummarySection />;
      case 'our-understanding':
        return <OurUnderstandingSection />;
      case 'market-insight':
        return <MarketInsightSection />;
      case 'target-strategy':
        return <TargetStrategySection />;
      case 'media-strategy':
        return <MediaStrategySection />;
      case 'budget-allocation':
        return <BudgetAllocationSection />;
      case 'creative-direction':
        return <CreativeDirectionSection />;
      case 'kpi-framework':
        return <KPIFrameworkSection />;
      case 'campaign-timeline':
        return <CampaignTimelineSection />;
      case 'operation':
        return <OperationSection />;
      case 'why-anymind':
        return <WhyAnyMindSection />;
      case 'media-plan-detail':
        return <MediaPlanDetailSection />;
      case 'influencer-list':
        return <InfluencerListSection />;
      default:
        return <ExecutiveSummarySection />;
    }
  };

  const currentSection = sections.find((s) => s.id === activeSection);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SectionNav activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {currentSection?.number}
            </span>
            <h1 className="text-2xl font-bold text-gray-900">{currentSection?.title}</h1>
          </div>
          <p className="text-gray-600">{currentSection?.description}</p>
        </header>

        {/* Content */}
        <div className="max-w-5xl">{renderSection()}</div>
      </main>
    </div>
  );
}

// ==================== Section Components ====================

function ExecutiveSummarySection() {
  return (
    <div className="space-y-6">
      {/* Headline */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <p className="text-xl font-medium">{executiveSummary.headline}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {executiveSummary.keyMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
            <div className="text-lg font-bold text-gray-900">{metric.value}</div>
            {metric.subtext && (
              <div className="text-xs text-gray-400">{metric.subtext}</div>
            )}
          </div>
        ))}
      </div>

      {/* Differentiation Points */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">3つの差別化ポイント</h2>
        <div className="grid grid-cols-3 gap-4">
          {executiveSummary.differentiationPoints.map((point, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <h3 className="font-semibold text-gray-900">{point.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{point.description}</p>
              <ul className="space-y-1">
                {point.details.map((detail, i) => (
                  <li key={i} className="text-xs text-gray-500 flex items-start gap-1">
                    <span className="text-blue-500">&#8226;</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Results */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">期待成果</h2>
        <div className="grid grid-cols-4 gap-4">
          {executiveSummary.expectedResults.map((result, index) => (
            <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-xs text-green-600 mb-1">{result.label}</div>
              <div className="text-lg font-bold text-green-800">{result.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why AnyMind */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Why AnyMind</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">AnyMindの強み</th>
                <th className="text-left p-3 font-medium text-gray-700">アイレップとの差</th>
              </tr>
            </thead>
            <tbody>
              {executiveSummary.whyAnyMind.map((item, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="p-3 font-medium text-gray-900">{item.strength}</td>
                  <td className="p-3 text-gray-600">{item.vs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OurUnderstandingSection() {
  return (
    <div className="space-y-6">
      {/* Product Info */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">THE Room FX</h2>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(ourUnderstanding.product).map(([key, value]) => (
            <div key={key}>
              <div className="text-xs text-gray-500 capitalize">{key}</div>
              <div className="text-sm font-medium text-gray-900">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Shift */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">{ourUnderstanding.strategicShift.before.label}</h3>
          <ul className="space-y-1">
            {ourUnderstanding.strategicShift.before.points.map((point, i) => (
              <li key={i} className="text-sm text-gray-600">&#8226; {point}</li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">{ourUnderstanding.strategicShift.after.label}</h3>
          <ul className="space-y-1">
            {ourUnderstanding.strategicShift.after.points.map((point, i) => (
              <li key={i} className="text-sm text-blue-700">&#8226; {point}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
        <div className="text-xs text-purple-600 font-medium mb-2">Key Takeaway</div>
        <p className="text-lg text-purple-900 italic">&quot;{ourUnderstanding.keyTakeaway}&quot;</p>
      </div>

      {/* Opportunities */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">機会の発見</h2>
        <div className="grid grid-cols-2 gap-4">
          {ourUnderstanding.opportunities.map((opp, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{opp.title}</h3>
              <div className="space-y-2">
                {opp.data.map((d, i) => (
                  <div key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-green-500">&#10004;</span>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketInsightSection() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <p className="text-gray-700 mb-4">{marketInsight.overview.headline}</p>
        <div className="grid grid-cols-5 gap-4">
          {marketInsight.overview.metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
              <div className="text-xs text-gray-500">{metric.label}</div>
              {metric.subtext && (
                <div className="text-xs text-gray-400">{metric.subtext}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment Chart */}
      <SentimentChart />

      {/* Key Insights */}
      <div className="grid grid-cols-2 gap-4">
        {marketInsight.keyInsights.map((insight, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
            <ul className="space-y-1">
              {insight.evidence.map((ev, i) => (
                <li key={i} className="text-xs text-gray-500 flex items-start gap-1">
                  <span className="text-blue-500">&#8226;</span>
                  {ev}
                </li>
              ))}
            </ul>
            {insight.implication && (
              <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-700">
                <strong>Implication:</strong> {insight.implication}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Topic Analysis */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">トピック分析</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">トピック</th>
                <th className="text-right p-3 font-medium text-gray-700">言及数</th>
                <th className="text-right p-3 font-medium text-gray-700">インプレッション</th>
                <th className="text-right p-3 font-medium text-gray-700">センチメント</th>
                <th className="text-left p-3 font-medium text-gray-700">THE Room FXとの関連</th>
              </tr>
            </thead>
            <tbody>
              {marketInsight.topicAnalysis.map((topic, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="p-3 font-medium text-gray-900">{topic.topic}</td>
                  <td className="p-3 text-right text-gray-600">{topic.mentions.toLocaleString()}</td>
                  <td className="p-3 text-right text-gray-600">{topic.impressions.toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      topic.sentiment < -1.5 ? 'bg-red-100 text-red-700' :
                      topic.sentiment < 0 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {topic.sentiment.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600 text-xs">{topic.relevance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TargetStrategySection() {
  return (
    <div className="space-y-6">
      {/* Priority Matrix */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">6ターゲット優先順位マトリクス</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-center p-3 font-medium text-gray-700 w-20">優先度</th>
                <th className="text-left p-3 font-medium text-gray-700">ターゲット</th>
                <th className="text-right p-3 font-medium text-gray-700">投稿数</th>
                <th className="text-right p-3 font-medium text-gray-700">インプレッション</th>
                <th className="text-center p-3 font-medium text-gray-700">配分</th>
                <th className="text-left p-3 font-medium text-gray-700">ペルソナ</th>
              </tr>
            </thead>
            <tbody>
              {targetStrategy.priorityMatrix.map((item) => (
                <tr key={item.priority} className="border-t border-gray-100">
                  <td className="p-3 text-center">
                    <span className={`w-6 h-6 inline-flex items-center justify-center rounded-full text-white text-xs font-bold ${
                      item.priority <= 3 ? 'bg-red-500' : 'bg-gray-400'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-gray-900">{item.target}</td>
                  <td className="p-3 text-right text-gray-600">{item.postCount.toLocaleString()}</td>
                  <td className="p-3 text-right text-gray-600">{item.impressions.toLocaleString()}</td>
                  <td className="p-3 text-center font-bold text-blue-600">{item.allocation}%</td>
                  <td className="p-3 text-gray-700">{item.persona}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Region Allocation */}
      <div className="grid grid-cols-2 gap-4">
        {targetStrategy.regionAllocation.map((region, index) => (
          <div key={index} className={`p-4 rounded-lg ${index === 0 ? 'bg-blue-50 border border-blue-200' : 'bg-purple-50 border border-purple-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">{region.region}</span>
              <span className={`text-2xl font-bold ${index === 0 ? 'text-blue-600' : 'text-purple-600'}`}>{region.allocation}%</span>
            </div>
            <p className="text-sm text-gray-600">{region.composition}</p>
          </div>
        ))}
      </div>

      {/* Personas */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">6ペルソナ詳細</h2>
        <div className="grid grid-cols-2 gap-4">
          {targetStrategy.personas.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} />
          ))}
        </div>
      </div>

      {/* Tribes */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">攻めるべきトライブ</h2>
        <div className="grid grid-cols-2 gap-4">
          {targetStrategy.tribes.map((tribe, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{tribe.name}</h3>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  tribe.sentiment > 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  Sentiment: {tribe.sentiment > 0 ? '+' : ''}{tribe.sentiment.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{tribe.nameEn}</p>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-gray-500">投稿数:</span>{' '}
                  <span className="font-medium">{tribe.postCount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">平均フォロワー:</span>{' '}
                  <span className="font-medium">{tribe.avgFollowers.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-500">訴求ポイント:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tribe.appealPoints.map((point, i) => (
                      <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MediaStrategySection() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <p className="text-gray-700 mb-4">{mediaStrategy.overview.headline}</p>
        <div className="grid grid-cols-4 gap-4">
          {mediaStrategy.overview.principles.map((principle, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded">
              <div className="font-semibold text-gray-900 text-sm">{principle.title}</div>
              <div className="text-xs text-gray-500 mt-1">{principle.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Channels */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">チャネル別戦略</h2>
        <div className="grid grid-cols-2 gap-4">
          {mediaStrategy.channels.map((channel, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                <span className="text-lg font-bold text-blue-600">{channel.allocation}%</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">{channel.role}</div>
              <div className="text-xs text-gray-500 mb-3">
                予算: {channel.budget.toLocaleString()}万円
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {channel.formats.map((format, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                    {format}
                  </span>
                ))}
              </div>
              <div className="space-y-1">
                {channel.kpiTargets.map((kpi, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-gray-500">{kpi.label}</span>
                    <span className="font-medium text-gray-700">{kpi.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PMP Media */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">PMP推奨媒体リスト</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">媒体</th>
                <th className="text-left p-3 font-medium text-gray-700">カテゴリ</th>
                <th className="text-left p-3 font-medium text-gray-700">ターゲット</th>
                <th className="text-left p-3 font-medium text-gray-700">強み</th>
              </tr>
            </thead>
            <tbody>
              {mediaStrategy.pmpMedia.map((media, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="p-3 font-medium text-gray-900">{media.name}</td>
                  <td className="p-3 text-gray-600">{media.category}</td>
                  <td className="p-3 text-gray-600">{media.target}</td>
                  <td className="p-3 text-gray-600">{media.strength}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand Safety */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">ブランドセーフティ対策</h2>
        <div className="grid grid-cols-3 gap-4">
          {mediaStrategy.brandSafety.measures.map((measure, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{measure.measure}</h3>
              <p className="text-xs text-gray-600">{measure.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="font-semibold text-red-800 text-sm mb-2">除外カテゴリ</h4>
          <div className="flex flex-wrap gap-2">
            {mediaStrategy.brandSafety.excludedCategories.map((cat, i) => (
              <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetAllocationSection() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <div className="text-4xl font-bold mb-2">{budgetAllocation.total.toLocaleString()}万円</div>
        <div className="text-blue-100">{budgetAllocation.period}</div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart */}
        <BudgetPieChart />

        {/* By Region */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">地域別配分</h3>
          <div className="space-y-4">
            {budgetAllocation.byRegion.map((region, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{region.category}</span>
                  <span className="text-sm font-bold text-gray-900">{region.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {region.amount.toLocaleString()}万円 - {region.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* By Phase */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">フェーズ別配分</h2>
        <div className="grid grid-cols-2 gap-4">
          {budgetAllocation.byPhase.map((phase, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              index === 0 ? 'bg-purple-50 border-purple-200' : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{phase.category}</span>
                <span className={`text-xl font-bold ${index === 0 ? 'text-purple-600' : 'text-blue-600'}`}>
                  {phase.amount.toLocaleString()}万円
                </span>
              </div>
              <p className="text-sm text-gray-600">{phase.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* By Media */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">媒体別配分</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">媒体</th>
                <th className="text-right p-3 font-medium text-gray-700">配分</th>
                <th className="text-right p-3 font-medium text-gray-700">金額</th>
                <th className="text-left p-3 font-medium text-gray-700">役割</th>
              </tr>
            </thead>
            <tbody>
              {budgetAllocation.byMedia.map((media, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="p-3 font-medium text-gray-900">{media.category}</td>
                  <td className="p-3 text-right font-bold text-blue-600">{media.percentage}%</td>
                  <td className="p-3 text-right text-gray-600">{media.amount.toLocaleString()}万円</td>
                  <td className="p-3 text-gray-600">{media.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CreativeDirectionSection() {
  const assets = [
    { type: 'TVCM', duration: '15秒, 30秒', language: 'EN, JP', usage: '主要プロモーション' },
    { type: 'デジタルCM', duration: '15秒, 30秒', language: 'EN, JP', usage: '横30s、縦15s以内' },
    { type: 'ティーザー', duration: '6秒', language: 'JP, EN, no text', usage: '3/2〜配信' },
    { type: 'KV（昼/夕/夜）', duration: '-', language: 'JP, EN, no text', usage: 'ヒーローバナー' },
  ];

  return (
    <div className="space-y-6">
      {/* Assets */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">ANA支給クリエイティブアセット</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">種類</th>
                <th className="text-left p-3 font-medium text-gray-700">尺</th>
                <th className="text-left p-3 font-medium text-gray-700">言語</th>
                <th className="text-left p-3 font-medium text-gray-700">用途</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="p-3 font-medium text-gray-900">{asset.type}</td>
                  <td className="p-3 text-gray-600">{asset.duration}</td>
                  <td className="p-3 text-gray-600">{asset.language}</td>
                  <td className="p-3 text-gray-600">{asset.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Framework */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">メッセージングフレームワーク</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">Primary（ビジネス渡航層）</h3>
            <ul className="space-y-2">
              <li className="text-sm text-blue-800">&quot;到着した瞬間から、ベストパフォーマンスを&quot;</li>
              <li className="text-sm text-blue-800">&quot;移動時間を、あなたの時間に&quot;</li>
              <li className="text-sm text-blue-800">&quot;空の上のプライベートオフィス&quot;</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-3">Secondary（プレミアムレジャー層）</h3>
            <ul className="space-y-2">
              <li className="text-sm text-purple-800">&quot;旅は、離陸した瞬間から始まる&quot;</li>
              <li className="text-sm text-purple-800">&quot;自宅のようなくつろぎを、空の上で&quot;</li>
              <li className="text-sm text-purple-800">&quot;日本へ。最高のコンディションで&quot;</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPIFrameworkSection() {
  return (
    <div className="space-y-6">
      {/* KPI Hierarchy */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">KPI階層</h2>
        <div className="space-y-4">
          {kpiFramework.hierarchy.map((level, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              index === 0 ? 'bg-blue-50 border-blue-200' :
              index === 1 ? 'bg-green-50 border-green-200' :
              'bg-purple-50 border-purple-200'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-green-500' :
                  'bg-purple-500'
                }`}>
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">{level.level}</h3>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 ml-11">
                {level.metrics.map((metric, i) => (
                  <div key={i} className="bg-white p-3 rounded border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">{metric.name}</div>
                    <div className="text-sm font-bold text-gray-900">{metric.target}</div>
                    {metric.definition && (
                      <div className="text-xs text-gray-400 mt-1">{metric.definition}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Criteria */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">成功基準</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-4">8指標中6指標達成でキャンペーン成功と判定</p>
          <div className="grid grid-cols-3 gap-3">
            {kpiFramework.successCriteria.map((criteria, index) => (
              <div key={index} className={`p-3 rounded border ${
                criteria.weight === 'Critical' ? 'bg-red-50 border-red-200' :
                criteria.weight === 'High' ? 'bg-orange-50 border-orange-200' :
                'bg-gray-50 border-gray-200'
              }`}>
                <div className="text-sm font-medium text-gray-900">{criteria.metric}</div>
                <div className={`text-xs mt-1 ${
                  criteria.weight === 'Critical' ? 'text-red-600' :
                  criteria.weight === 'High' ? 'text-orange-600' :
                  'text-gray-500'
                }`}>
                  {criteria.weight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignTimelineSection() {
  return (
    <div className="space-y-6">
      <TimelineChart />

      {/* Phase Details */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">フェーズ詳細</h2>
        <div className="grid grid-cols-2 gap-4">
          {campaignTimeline.phases.filter(p => p.id !== 'prep').map((phase) => (
            <div key={phase.id} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{phase.name}</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{phase.period}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
              {phase.budget > 0 && (
                <div className="text-sm font-bold text-blue-600 mb-3">
                  予算: {phase.budget.toLocaleString()}万円
                </div>
              )}
              {phase.kpis.length > 0 && (
                <div className="space-y-1">
                  {phase.kpis.map((kpi, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-gray-500">{kpi.label}</span>
                      <span className="font-medium text-gray-700">{kpi.target}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OperationSection() {
  return (
    <div className="space-y-6">
      {/* Team */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">運用体制</h2>
        <div className="grid grid-cols-4 gap-4">
          {operation.team.map((member, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">{member.count}</span>
              </div>
              <div className="font-medium text-gray-900 text-sm">{member.role}</div>
              <div className="text-xs text-gray-500 mt-1">{member.responsibility}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Cycle */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">日次最適化サイクル</h3>
          <div className="space-y-2">
            {operation.dailyCycle.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-500 w-12">{item.time}</span>
                <span className="text-sm text-gray-700">{item.action}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">週次最適化サイクル</h3>
          <div className="space-y-2">
            {operation.weeklyCycle.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-500 w-12">{item.day}</span>
                <span className="text-sm text-gray-700">{item.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Levels */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">緊急対応プロトコル</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">レベル</th>
                <th className="text-left p-3 font-medium text-gray-700">条件</th>
                <th className="text-left p-3 font-medium text-gray-700">対応時間</th>
                <th className="text-left p-3 font-medium text-gray-700">エスカレーション</th>
              </tr>
            </thead>
            <tbody>
              {operation.alertLevels.map((alert, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      alert.level === '緊急' ? 'bg-red-100 text-red-700' :
                      alert.level === '高' ? 'bg-orange-100 text-orange-700' :
                      alert.level === '中' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {alert.level}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{alert.condition}</td>
                  <td className="p-3 text-gray-600">{alert.responseTime}</td>
                  <td className="p-3 text-gray-600">{alert.escalation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function WhyAnyMindSection() {
  return (
    <div className="space-y-6">
      {/* Differentiators */}
      <div className="grid grid-cols-2 gap-4">
        {whyAnyMind.differentiators.map((diff, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <h3 className="font-semibold text-gray-900">{diff.title}</h3>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-green-50 rounded">
                <div className="text-xs text-green-600 font-medium">AnyMind</div>
                <div className="text-sm text-green-800">{diff.anyMind}</div>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-500 font-medium">アイレップ</div>
                <div className="text-sm text-gray-600">{diff.competitor}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Findings */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">具体的な発見</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">発見</th>
                <th className="text-left p-3 font-medium text-gray-700">意味</th>
                <th className="text-left p-3 font-medium text-gray-700">アクション</th>
              </tr>
            </thead>
            <tbody>
              {whyAnyMind.keyFindings.map((finding, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="p-3 font-medium text-gray-900">{finding.finding}</td>
                  <td className="p-3 text-gray-600">{finding.meaning}</td>
                  <td className="p-3 text-blue-600">{finding.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conclusion */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg text-center">
        <p className="text-xl font-bold">{whyAnyMind.conclusion}</p>
      </div>
    </div>
  );
}

function MediaPlanDetailSection() {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          詳細なメディアプランは別途Excel/PDFで提出予定。本セクションはサマリーを表示しています。
        </p>
      </div>

      {/* Media Breakdown */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">媒体別KPI目標</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">媒体</th>
                <th className="text-right p-3 font-medium text-gray-700">予算</th>
                <th className="text-right p-3 font-medium text-gray-700">インプレッション</th>
                <th className="text-right p-3 font-medium text-gray-700">リーチ</th>
                <th className="text-right p-3 font-medium text-gray-700">視聴完了/クリック</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100">
                <td className="p-3 font-medium text-gray-900">YouTube</td>
                <td className="p-3 text-right">1,400万円</td>
                <td className="p-3 text-right">3,000万</td>
                <td className="p-3 text-right">500万</td>
                <td className="p-3 text-right">700万（視聴完了）</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="p-3 font-medium text-gray-900">Meta</td>
                <td className="p-3 text-right">1,200万円</td>
                <td className="p-3 text-right">1,500万</td>
                <td className="p-3 text-right">400万</td>
                <td className="p-3 text-right">250万（ThruPlay）</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="p-3 font-medium text-gray-900">PMP</td>
                <td className="p-3 text-right">600万円</td>
                <td className="p-3 text-right">470万</td>
                <td className="p-3 text-right">160万</td>
                <td className="p-3 text-right">1万（クリック）</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="p-3 font-medium text-gray-900">LinkedIn</td>
                <td className="p-3 text-right">200万円</td>
                <td className="p-3 text-right">500万</td>
                <td className="p-3 text-right">100万</td>
                <td className="p-3 text-right">1万（クリック）</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50 font-bold">
                <td className="p-3 text-gray-900">合計</td>
                <td className="p-3 text-right">4,000万円</td>
                <td className="p-3 text-right">5,470万</td>
                <td className="p-3 text-right">1,160万</td>
                <td className="p-3 text-right">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InfluencerListSection() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-3xl font-bold text-blue-600">{influencerList.overview.total}</div>
          <div className="text-xs text-gray-500">総インフルエンサー数</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-lg font-bold text-gray-900">{influencerList.overview.criteria}</div>
          <div className="text-xs text-gray-500">条件</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-lg font-bold text-gray-900">{influencerList.overview.source}</div>
          <div className="text-xs text-gray-500">データソース</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-lg font-bold text-gray-900">{influencerList.overview.period}</div>
          <div className="text-xs text-gray-500">分析期間</div>
        </div>
      </div>

      {/* By Tribe */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">トライブ別トップインフルエンサー</h2>
        <div className="space-y-4">
          {influencerList.byTribe.map((tribe, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">{tribe.tribe}</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-3 font-medium text-gray-600">名前</th>
                    <th className="text-right p-3 font-medium text-gray-600">フォロワー</th>
                    <th className="text-center p-3 font-medium text-gray-600">国</th>
                    <th className="text-right p-3 font-medium text-gray-600">エンゲージメント</th>
                    <th className="text-center p-3 font-medium text-gray-600">推奨度</th>
                  </tr>
                </thead>
                <tbody>
                  {tribe.influencers.map((inf, i) => (
                    <tr key={i} className="border-t border-gray-50">
                      <td className="p-3 font-medium text-gray-900">{inf.name}</td>
                      <td className="p-3 text-right text-gray-600">{inf.followers.toLocaleString()}</td>
                      <td className="p-3 text-center text-gray-600">{inf.country}</td>
                      <td className="p-3 text-right text-gray-600">{inf.engagement.toLocaleString()}</td>
                      <td className="p-3 text-center text-yellow-500">{inf.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Options */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">インフルエンサー施策オプション</h2>
        <div className="grid grid-cols-3 gap-4">
          {influencerList.campaignOptions.map((option, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{option.option}</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">対象:</span>{' '}
                  <span className="text-gray-700">{option.target}</span>
                </div>
                <div>
                  <span className="text-gray-500">内容:</span>{' '}
                  <span className="text-gray-700">{option.content}</span>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-gray-500">期待成果:</span>{' '}
                  <span className="text-green-700">{option.expectedOutcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
