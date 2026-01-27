'use client';

import { useState } from 'react';
import {
  gettingStartedSteps,
  features,
  examples,
  tips,
  recommendedSkills,
  architectureElements,
  starterKit,
  categoryColors,
  categoryLabels,
  skillCategoryColors,
  skillCategoryLabels,
  architectureColors,
  type Step,
  type Feature,
  type Example,
  type Tip,
  type RecommendedSkill,
  type ArchitectureElement,
} from './data/onboarding-data';

// Tab navigation
const tabs = [
  { id: 'getting-started', label: 'Getting Started', icon: '1' },
  { id: 'features', label: 'Features', icon: '2' },
  { id: 'examples', label: 'Examples', icon: '3' },
  { id: 'compare', label: 'Compare', icon: '4' },
  { id: 'architecture', label: 'Architecture', icon: '5' },
  { id: 'skills', label: 'Skills', icon: '6' },
  { id: 'starter-kit', label: 'Starter Kit', icon: '7' },
  { id: 'tips', label: 'Tips', icon: '8' },
];

// Copy button component
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-200 transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// Code block component
function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative mt-4">
      <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  );
}

// Step card component
function StepCard({ step, index, isActive }: { step: Step; index: number; isActive: boolean }) {
  return (
    <div
      className={`p-6 rounded-xl border-2 transition-all ${
        isActive
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {index + 1}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{step.title}</h3>
            <span className="px-2 py-0.5 text-xs rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
              {step.duration}
            </span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 mb-3">{step.content}</p>
          {step.code && <CodeBlock code={step.code} />}
          {step.tips && step.tips.length > 0 && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">Tips</p>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                {step.tips.map((tip, i) => (
                  <li key={i}>- {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Feature card component
function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-0.5 text-xs rounded-full ${categoryColors[feature.category]}`}>
          {categoryLabels[feature.category]}
        </span>
        <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {feature.name}
        </span>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.description}</p>
      {feature.usage && (
        <code className="mt-2 inline-block px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300">
          {feature.usage}
        </code>
      )}
    </div>
  );
}

// Example card component
function ExampleCard({ example }: { example: Example }) {
  return (
    <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 text-xs rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
          {example.category}
        </span>
        <span className="font-medium text-zinc-900 dark:text-zinc-100">{example.title}</span>
      </div>
      <div className="relative">
        <div className="bg-zinc-900 text-zinc-100 p-4 rounded-lg">
          <code className="text-sm">{example.prompt}</code>
        </div>
        <CopyButton text={example.prompt} />
      </div>
      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">{example.explanation}</p>
    </div>
  );
}

// Tip card component
function TipCard({ tip }: { tip: Tip }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
      >
        <span className="font-medium text-zinc-900 dark:text-zinc-100">{tip.title}</span>
        <svg
          className={`w-5 h-5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-zinc-200 dark:border-zinc-700">
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">{tip.content}</p>
          {tip.code && <CodeBlock code={tip.code} />}
        </div>
      )}
    </div>
  );
}

// Getting Started tab content
function GettingStartedContent() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-center gap-2 flex-wrap">
        {gettingStartedSteps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(index)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              index === activeStep
                ? 'bg-blue-600 text-white'
                : index < activeStep
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
            }`}
          >
            {index + 1}. {step.title}
          </button>
        ))}
      </div>

      {/* Total time */}
      <div className="mb-6 text-center">
        <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm">
          Total: 約27分
        </span>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {gettingStartedSteps.map((step, index) => (
          <StepCard key={step.id} step={step} index={index} isActive={index === activeStep} />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => setActiveStep(Math.min(gettingStartedSteps.length - 1, activeStep + 1))}
          disabled={activeStep === gettingStartedSteps.length - 1}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Features tab content
function FeaturesContent() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = ['all', 'skill', 'command', 'agent', 'rule'];
  const filteredFeatures = features.filter((f) => {
    const matchesCategory = filter === 'all' || f.category === filter;
    const matchesSearch =
      search === '' ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search and filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search features..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600'
              }`}
            >
              {cat === 'all' ? 'All' : categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(['skill', 'command', 'agent', 'rule'] as const).map((cat) => (
          <div
            key={cat}
            className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-center"
          >
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {features.filter((f) => f.category === cat).length}
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{categoryLabels[cat]}</div>
          </div>
        ))}
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFeatures.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>

      {filteredFeatures.length === 0 && (
        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
          No features found
        </div>
      )}
    </div>
  );
}

// Examples tab content
function ExamplesContent() {
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(examples.map((e) => e.category)))];
  const filteredExamples = examples.filter((e) => filter === 'all' || e.category === filter);

  return (
    <div>
      {/* Category filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              filter === cat
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600'
            }`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Example cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExamples.map((example) => (
          <ExampleCard key={example.id} example={example} />
        ))}
      </div>
    </div>
  );
}

// Compare tab content
function CompareContent() {
  return (
    <div>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Claude Agent SDK、Everything Claude Code、Claude Code Starter Kit の違いを比較します。
      </p>

      {/* Overview comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Agent SDK */}
        <div className="p-6 rounded-xl border-2 border-blue-500 bg-blue-50 dark:bg-blue-950">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-600 text-white">
              公式SDK
            </span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Claude Agent SDK</h3>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Claude Codeの機能をPython/TypeScriptで使い、<strong>自分のアプリを開発</strong>する
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">→</span>
              <span className="text-zinc-700 dark:text-zinc-300">CI/CDパイプライン統合</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">→</span>
              <span className="text-zinc-700 dark:text-zinc-300">カスタムアプリケーション開発</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">→</span>
              <span className="text-zinc-700 dark:text-zinc-300">本番環境の自動化</span>
            </div>
          </div>
        </div>

        {/* Everything Claude Code */}
        <div className="p-6 rounded-xl border-2 border-purple-500 bg-purple-50 dark:bg-purple-950">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-600 text-white">
              設定集
            </span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Everything Claude Code</h3>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            ハッカソン優勝者の設定をインポートし、<strong>Claude Code自体を強化</strong>する
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400">→</span>
              <span className="text-zinc-700 dark:text-zinc-300">日常のClaude Code利用を強化</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400">→</span>
              <span className="text-zinc-700 dark:text-zinc-300">すぐに使える9エージェント</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400">→</span>
              <span className="text-zinc-700 dark:text-zinc-300">Vibe Codingからの脱却</span>
            </div>
          </div>
        </div>

        {/* Claude Code Starter Kit */}
        <div className="p-6 rounded-xl border-2 border-green-500 bg-green-50 dark:bg-green-950">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-600 text-white">
              設定集
            </span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Claude Code Starter Kit</h3>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            社内向け設定を1コマンドでインストールし、<strong>すぐに使える</strong>
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">→</span>
              <span className="text-zinc-700 dark:text-zinc-300">1コマンドでプロ環境構築</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">→</span>
              <span className="text-zinc-700 dark:text-zinc-300">12コマンド + 8エージェント + 6ルール</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">→</span>
              <span className="text-zinc-700 dark:text-zinc-300">日本語対応・実戦向け</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="p-4 text-left font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">項目</th>
              <th className="p-4 text-left font-medium text-blue-600 dark:text-blue-400 border border-zinc-200 dark:border-zinc-700">Claude Agent SDK</th>
              <th className="p-4 text-left font-medium text-purple-600 dark:text-purple-400 border border-zinc-200 dark:border-zinc-700">Everything Claude Code</th>
              <th className="p-4 text-left font-medium text-green-600 dark:text-green-400 border border-zinc-200 dark:border-zinc-700">Starter Kit</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900">
            <tr>
              <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">何か</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">公式ライブラリ（SDK）</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">設定ファイル集（Config）</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">設定ファイル集（Config）</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">提供元</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">Anthropic公式</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">ハッカソン優勝者（コミュニティ）</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">社内チーム</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">対象者</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">開発者（コードを書く人）</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">全ユーザー（設定を使う人）</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">全ユーザー（設定を使う人）</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">導入後</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">自分でコードを書いてエージェント構築</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">すぐに9エージェント等が使える</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">すぐに12コマンド+8エージェント+6ルール</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* What gets installed */}
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-8 mb-4">何が導入されるか</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Agent SDK */}
        <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-3">Claude Agent SDK</h4>
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">パッケージ:</p>
            <code className="block p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-xs">
              npm install @anthropic-ai/claude-agent-sdk
            </code>
            <code className="block p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-xs">
              pip install claude-agent-sdk
            </code>
            <p className="font-medium text-zinc-900 dark:text-zinc-100 mt-3">提供機能:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>query() 関数（エージェント実行）</li>
              <li>組み込みツール（Read, Write, Edit, Bash等）</li>
              <li>フック、サブエージェント、MCP連携</li>
              <li>セッション管理</li>
            </ul>
          </div>
        </div>

        {/* Everything Claude Code */}
        <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-3">Everything Claude Code</h4>
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">コマンド:</p>
            <code className="block p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-xs">
              /plugin marketplace add affaan-m/everything-claude-code
            </code>
            <code className="block p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-xs">
              /plugin install everything-claude-code@everything-claude-code
            </code>
            <p className="font-medium text-zinc-900 dark:text-zinc-100 mt-3">導入される設定:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>9個の特化エージェント</li>
              <li>複数のスキル（TDD、セキュリティ等）</li>
              <li>9個のスラッシュコマンド</li>
              <li>フック、ルール</li>
            </ul>
          </div>
        </div>

        {/* Claude Code Starter Kit */}
        <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <h4 className="font-medium text-green-600 dark:text-green-400 mb-3">Claude Code Starter Kit</h4>
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">コマンド:</p>
            <code className="block p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-xs">
              claude /install-github-plugin Hantaku705/claude-code-starter
            </code>
            <p className="font-medium text-zinc-900 dark:text-zinc-100 mt-3">導入される設定:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>12個のスラッシュコマンド</li>
              <li>8個の特化エージェント</li>
              <li>6個のルール</li>
              <li>テンプレート（CLAUDE.md, settings.json）</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-8 p-5 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
        <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">おすすめの使い分け</h4>
        <div className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
          <p><strong>初心者:</strong> Starter Kit（日本語・シンプル・1コマンド導入）</p>
          <p><strong>中級者:</strong> Everything Claude Code（英語・充実・コミュニティ）</p>
          <p><strong>本番運用したい人:</strong> Claude Agent SDK でカスタムアプリを開発</p>
          <p><strong>組み合わせ:</strong> 日常は Starter Kit or Everything Claude Code、本番は Agent SDK</p>
        </div>
      </div>

      {/* Warning */}
      <div className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
        <p className="text-sm text-red-700 dark:text-red-300">
          <strong>⚠️ 注意:</strong> Everything Claude Code導入時、MCPを入れすぎると 200k → 70k にコンテキスト縮小。推奨: プロジェクトごとに10個以下のMCP
        </p>
      </div>
    </div>
  );
}

// Architecture element card component
function ArchitectureCard({ element }: { element: ArchitectureElement }) {
  return (
    <div className={`p-5 rounded-xl border-2 ${architectureColors[element.id]} transition-all hover:shadow-md`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{element.icon}</span>
        <h3 className="text-lg font-bold">{element.name}</h3>
      </div>
      <p className="text-sm font-medium mb-2">{element.definition}</p>
      <p className="text-sm opacity-80 mb-3">{element.role}</p>
      <div className="space-y-1 text-xs">
        <div className="flex items-start gap-2">
          <span className="font-medium">保存先:</span>
          <code className="bg-white/50 dark:bg-black/30 px-1.5 py-0.5 rounded">{element.location}</code>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-medium">例:</span>
          <span className="opacity-80">{element.example}</span>
        </div>
      </div>
    </div>
  );
}

// Architecture tab content
function ArchitectureContent() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Claude Code 全体像</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Claude Codeを構成する7つの要素とその役割
        </p>
      </div>

      {/* Visual diagram */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-300 dark:border-zinc-700">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Claude Code</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">構成要素マップ</p>
        </div>

        {/* Core elements (top row) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {architectureElements.slice(0, 4).map((el) => (
            <div key={el.id} className={`p-3 rounded-lg text-center ${architectureColors[el.id]} border`}>
              <span className="text-xl">{el.icon}</span>
              <p className="font-medium text-sm mt-1">{el.name}</p>
              <p className="text-xs opacity-75 mt-0.5">{el.definition}</p>
            </div>
          ))}
        </div>

        {/* Extension elements (bottom row) */}
        <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
          {architectureElements.slice(4).map((el) => (
            <div key={el.id} className={`p-3 rounded-lg text-center ${architectureColors[el.id]} border`}>
              <span className="text-xl">{el.icon}</span>
              <p className="font-medium text-sm mt-1">{el.name}</p>
              <p className="text-xs opacity-75 mt-0.5">{el.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Element cards */}
      <div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">各要素の詳細</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {architectureElements.map((element) => (
            <ArchitectureCard key={element.id} element={element} />
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">比較表（コア4要素）</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800">
                <th className="p-3 text-left font-medium border border-zinc-200 dark:border-zinc-700">特性</th>
                <th className="p-3 text-left font-medium border border-zinc-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400">Skills</th>
                <th className="p-3 text-left font-medium border border-zinc-200 dark:border-zinc-700 text-green-600 dark:text-green-400">Commands</th>
                <th className="p-3 text-left font-medium border border-zinc-200 dark:border-zinc-700 text-purple-600 dark:text-purple-400">Agents</th>
                <th className="p-3 text-left font-medium border border-zinc-200 dark:border-zinc-700 text-orange-600 dark:text-orange-400">Rules</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900">
              <tr>
                <td className="p-3 font-medium border border-zinc-200 dark:border-zinc-700">実行方法</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">/skill名</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">/command名</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">自動委譲</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">常時適用</td>
              </tr>
              <tr>
                <td className="p-3 font-medium border border-zinc-200 dark:border-zinc-700">スコープ</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">ワークフロー</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">単発アクション</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">タスク単位</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">セッション全体</td>
              </tr>
              <tr>
                <td className="p-3 font-medium border border-zinc-200 dark:border-zinc-700">対話性</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">あり</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">最小限</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">独立実行</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700">なし</td>
              </tr>
              <tr>
                <td className="p-3 font-medium border border-zinc-200 dark:border-zinc-700">例</td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700"><code>/tdd</code></td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700"><code>/quick-commit</code></td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700"><code>planner</code></td>
                <td className="p-3 border border-zinc-200 dark:border-zinc-700"><code>security.md</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage guide */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">使い分けガイド</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">「この作業を毎回やりたい」</p>
              <p className="text-zinc-600 dark:text-zinc-400">Skill / Command</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-600 dark:text-purple-400 font-bold">→</span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">「この作業を任せたい」</p>
              <p className="text-zinc-600 dark:text-zinc-400">Agent</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-orange-600 dark:text-orange-400 font-bold">→</span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">「これは常に守りたい」</p>
              <p className="text-zinc-600 dark:text-zinc-400">Rule</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-cyan-600 dark:text-cyan-400 font-bold">→</span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">「外部サービスに接続したい」</p>
              <p className="text-zinc-600 dark:text-zinc-400">MCP</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-pink-600 dark:text-pink-400 font-bold">→</span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">「ファイル保存時に自動でXしたい」</p>
              <p className="text-zinc-600 dark:text-zinc-400">Hook</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600 dark:text-amber-400 font-bold">→</span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">「プロジェクト固有の設定」</p>
              <p className="text-zinc-600 dark:text-zinc-400">CLAUDE.md</p>
            </div>
          </div>
        </div>
      </div>

      {/* Folder structure */}
      <div className="p-5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">フォルダ構成</h3>
        <pre className="text-sm text-zinc-700 dark:text-zinc-300 overflow-x-auto">
{`~/.claude/
├── skills/          # ワークフロー定義
├── commands/        # 即時実行コマンド
├── agents/          # Subagent定義
├── rules/           # 常時適用ルール
├── settings.json    # Hooks設定
└── memories/        # 記憶保存

~/.claude.json       # MCP設定

プロジェクト/
└── CLAUDE.md        # プロジェクト固有設定`}
        </pre>
      </div>
    </div>
  );
}

// Skill card component for recommended skills
function SkillCard({ skill }: { skill: RecommendedSkill }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyDefinition = async () => {
    await navigator.clipboard.writeText(skill.definition);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`px-2 py-0.5 text-xs rounded-full ${skillCategoryColors[skill.category]}`}>
            {skillCategoryLabels[skill.category]}
          </span>
          <code className="font-mono font-medium text-zinc-900 dark:text-zinc-100">{skill.name}</code>
        </div>
        <svg
          className={`w-5 h-5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="px-5 pb-2 -mt-2">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{skill.description}</p>
      </div>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-zinc-200 dark:border-zinc-700">
          <div className="mt-4 relative">
            <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
              <code>{skill.definition}</code>
            </pre>
            <button
              onClick={handleCopyDefinition}
              className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-200 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>導入方法:</strong> 上記の内容を <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">~/.claude/commands/{skill.id}.md</code> に保存
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Skills tab content
function SkillsContent() {
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'session', 'git', 'quality', 'dev'] as const;
  const filteredSkills = recommendedSkills.filter((s) => filter === 'all' || s.category === filter);

  return (
    <div>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">
        実戦で使えるおすすめカスタムスキル。コピーして <code className="bg-zinc-200 dark:bg-zinc-700 px-1 rounded">~/.claude/commands/</code> に保存すれば使えます。
      </p>

      {/* Category filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              filter === cat
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600'
            }`}
          >
            {cat === 'all' ? 'All' : skillCategoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(['session', 'git', 'quality', 'dev'] as const).map((cat) => (
          <div
            key={cat}
            className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-center"
          >
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {recommendedSkills.filter((s) => s.category === cat).length}
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{skillCategoryLabels[cat]}</div>
          </div>
        ))}
      </div>

      {/* Skill cards */}
      <div className="space-y-4">
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      {/* Install guide */}
      <div className="mt-8 p-5 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
        <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">スキルの導入方法</h4>
        <ol className="space-y-2 text-sm text-amber-700 dark:text-amber-300 list-decimal list-inside">
          <li>スキルカードを開いて「Copy」ボタンでコピー</li>
          <li><code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">~/.claude/commands/</code> フォルダに <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">[スキル名].md</code> で保存</li>
          <li>Claude Code で <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">/スキル名</code> で呼び出し</li>
        </ol>
      </div>
    </div>
  );
}

// Starter Kit tab content
function StarterKitContent() {
  const [copiedInstall, setCopiedInstall] = useState(false);

  const handleCopyInstall = async () => {
    await navigator.clipboard.writeText(starterKit.installCommand);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950 border border-green-300 dark:border-green-700">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
          Claude Code Starter Kit
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          1コマンドでプロ環境を構築。12コマンド + 8エージェント + 6ルール
        </p>
        <div className="relative max-w-2xl mx-auto">
          <div className="bg-zinc-900 text-zinc-100 p-4 rounded-lg font-mono text-sm">
            {starterKit.installCommand}
          </div>
          <button
            onClick={handleCopyInstall}
            className="absolute top-2 right-2 px-3 py-1.5 text-xs rounded bg-green-600 hover:bg-green-500 text-white transition-colors"
          >
            {copiedInstall ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <a
          href={starterKit.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-green-700 dark:text-green-300 hover:underline"
        >
          GitHub で見る →
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">12</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Commands</div>
        </div>
        <div className="p-6 rounded-xl bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">8</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Agents</div>
        </div>
        <div className="p-6 rounded-xl bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 text-center">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">6</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Rules</div>
        </div>
      </div>

      {/* Commands section */}
      <div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <span className="text-green-600 dark:text-green-400">⚡</span> Commands（12個）
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {starterKit.commands.map((cmd) => (
            <div key={cmd.name} className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
              <code className="font-mono font-medium text-green-600 dark:text-green-400">{cmd.name}</code>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{cmd.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Agents section */}
      <div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <span className="text-purple-600 dark:text-purple-400">🤖</span> Agents（8個）
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {starterKit.agents.map((agent) => (
            <div key={agent.name} className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
              <code className="font-mono font-medium text-purple-600 dark:text-purple-400">{agent.name}</code>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{agent.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rules section */}
      <div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <span className="text-orange-600 dark:text-orange-400">📋</span> Rules（6個）
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {starterKit.rules.map((rule) => (
            <div key={rule.name} className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
              <code className="font-mono font-medium text-orange-600 dark:text-orange-400">{rule.name}.md</code>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{rule.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to use */}
      <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
        <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-4">インストール手順</h3>
        <ol className="space-y-3 text-sm text-amber-700 dark:text-amber-300">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center font-bold text-amber-800 dark:text-amber-200">1</span>
            <div>
              <p className="font-medium">GitHub認証（初回のみ）</p>
              <code className="text-xs bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded mt-1 block">gh auth login</code>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center font-bold text-amber-800 dark:text-amber-200">2</span>
            <div>
              <p className="font-medium">インストールコマンド実行</p>
              <code className="text-xs bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded mt-1 block">{starterKit.installCommand}</code>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center font-bold text-amber-800 dark:text-amber-200">3</span>
            <div>
              <p className="font-medium">コマンドを使う</p>
              <code className="text-xs bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded mt-1 block">/handoff  /resume  /code-review  など</code>
            </div>
          </li>
        </ol>
      </div>

      {/* Note */}
      <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          <strong>Note:</strong> Hooks設定（settings.json）は手動コピーが必要な場合があります。
          詳しくは <a href={starterKit.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">GitHubリポジトリ</a> を参照。
        </p>
      </div>
    </div>
  );
}

// Tips tab content
function TipsContent() {
  return (
    <div className="space-y-4">
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        慣れてきたら使ってみたい上級機能です。クリックして詳細を表示。
      </p>
      {tips.map((tip) => (
        <TipCard key={tip.id} tip={tip} />
      ))}
    </div>
  );
}

// Main component
export default function Home() {
  const [activeTab, setActiveTab] = useState('getting-started');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Claude Code Onboarding
            </h1>
            <a
              href="https://docs.anthropic.com/en/docs/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Official Docs
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-xs mr-2">
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'getting-started' && <GettingStartedContent />}
        {activeTab === 'features' && <FeaturesContent />}
        {activeTab === 'examples' && <ExamplesContent />}
        {activeTab === 'compare' && <CompareContent />}
        {activeTab === 'architecture' && <ArchitectureContent />}
        {activeTab === 'skills' && <SkillsContent />}
        {activeTab === 'starter-kit' && <StarterKitContent />}
        {activeTab === 'tips' && <TipsContent />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>AnyMind Group - Claude Code Onboarding</p>
          <p className="mt-1">Built with Next.js + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
