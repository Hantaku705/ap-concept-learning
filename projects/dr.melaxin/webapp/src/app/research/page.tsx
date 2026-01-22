"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  researchMeta,
  researchSections,
  marketData,
  successPatterns,
  competitorDetails,
  marketingMethods,
  jtAgencyData,
  implications,
} from "@/data/research-data";

export default function ResearchPage() {
  const [activeSection, setActiveSection] = useState("market");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = researchSections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      const scrollPosition = window.scrollY + 120;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-50">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-violet">RESEARCH</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900">競合リサーチ</h1>
            <p className="text-sm text-gray-500">Qoo10 韓国コスメ</p>
          </div>

          {/* Page Navigation */}
          <div className="mb-6 flex gap-2">
            <Link
              href="/"
              className="flex-1 px-3 py-2 text-center text-sm rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              提案書
            </Link>
            <span className="flex-1 px-3 py-2 text-center text-sm rounded-lg bg-sky-100 text-sky-700 font-medium">
              リサーチ
            </span>
          </div>

          {/* Section links */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              セクション
            </p>
            {researchSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`nav-link w-full text-left text-sm ${
                  activeSection === section.id ? "active" : ""
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Key Insight */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p className="font-medium text-gray-700 mb-1">勝ちパターン</p>
              <p className="text-sky-600 font-semibold text-sm">
                {successPatterns.winningPattern}
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen p-6 lg:p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-violet">RESEARCH</span>
            <Link href="/" className="text-sm text-sky-600 hover:underline">
              ← 提案書に戻る
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {researchMeta.title}
          </h1>
          <p className="text-gray-600">{researchMeta.subtitle}</p>
          <p className="text-sm text-gray-500 mt-2">{researchMeta.source}</p>
        </header>

        {/* Section 1: Market Overview */}
        <section id="market" className="mb-12">
          <h2 className="section-header">市場概況</h2>

          {/* Brand Tiers */}
          <div className="card mb-6">
            <h3 className="card-header">ブランド別売上規模（メガ割）</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>ブランド</th>
                  <th className="text-right">メガ割売上</th>
                  <th className="text-right">定常月</th>
                  <th className="text-right">年間（推定）</th>
                </tr>
              </thead>
              <tbody>
                {marketData.brandTiers.map((tier) => (
                  <tr key={tier.tier}>
                    <td>
                      <span
                        className={`badge ${
                          tier.tier === "Top"
                            ? "badge-emerald"
                            : tier.tier === "Middle"
                            ? "badge-amber"
                            : "badge-gray"
                        }`}
                      >
                        {tier.tier}
                      </span>
                    </td>
                    <td className="font-medium">{tier.brands}</td>
                    <td className="text-right price">{tier.megaSale}</td>
                    <td className="text-right">{tier.normalMonth}</td>
                    <td className="text-right price text-sky-600">{tier.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Purchase Trends */}
          <div className="card">
            <h3 className="card-header">購買傾向</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {marketData.purchaseTrends.map((item, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    item.direction === "up"
                      ? "bg-emerald-50 border-l-emerald-500"
                      : "bg-red-50 border-l-red-500"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-lg ${
                        item.direction === "up" ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {item.direction === "up" ? "↑" : "↓"}
                    </span>
                    <span className="text-sm text-gray-700">{item.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Success Patterns */}
        <section id="patterns" className="mb-12">
          <h2 className="section-header">成功パターン</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Normal Period */}
            <div className="card">
              <h3 className="card-header">通常期</h3>
              <table className="data-table">
                <tbody>
                  {successPatterns.normalPeriod.map((item) => (
                    <tr key={item.tactic}>
                      <td className="font-medium text-gray-600 w-1/4">
                        {item.tactic}
                      </td>
                      <td>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mega Sale */}
            <div className="card border-2 border-sky-500">
              <h3 className="card-header">メガ割</h3>
              <table className="data-table">
                <tbody>
                  {successPatterns.megaSale.map((item) => (
                    <tr key={item.tactic}>
                      <td className="font-medium text-gray-600 w-1/4">
                        {item.tactic}
                      </td>
                      <td className="font-medium">{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Winning Pattern */}
          <div className="alert alert-success">
            <p className="font-semibold text-lg">勝ちパターン</p>
            <p className="text-xl mt-2">「{successPatterns.winningPattern}」</p>
          </div>
        </section>

        {/* Section 3: Competitor Details */}
        <section id="competitors" className="mb-12">
          <h2 className="section-header">競合分析（詳細）</h2>

          {/* Dalba */}
          <div className="card mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold">{competitorDetails.dalba.name}</h3>
              <span className="badge badge-emerald">{competitorDetails.dalba.tier}</span>
            </div>

            <div className="alert alert-info mb-4">
              <p className="font-semibold">成功要因</p>
              <p>{competitorDetails.dalba.successFactor}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-2">販売戦略</h4>
                <table className="data-table">
                  <tbody>
                    <tr>
                      <td className="font-medium text-gray-600">通常期</td>
                      <td>{competitorDetails.dalba.salesStrategy.normal}</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-gray-600">メガ割</td>
                      <td className="font-bold text-sky-600">
                        {competitorDetails.dalba.salesStrategy.megaSale}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h4 className="font-semibold mb-2">投資規模</h4>
                <p className="text-2xl font-bold text-amber-600">
                  {competitorDetails.dalba.marketingBudget}
                </p>
              </div>
            </div>

            <h4 className="font-semibold mb-2">マーケ施策</h4>
            <div className="overflow-x-auto mb-6">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>時期</th>
                    <th>施策</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorDetails.dalba.campaigns.map((item, i) => (
                    <tr key={i}>
                      <td className="font-medium">{item.date}</td>
                      <td>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold mb-2">2024/11メガ割 順位推移</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {competitorDetails.dalba.megaSaleRanking.map((item) => (
                <div
                  key={item.day}
                  className={`px-3 py-2 rounded-lg text-center ${
                    item.note ? "bg-sky-100 border-2 border-sky-500" : "bg-gray-50"
                  }`}
                >
                  <p className="text-xs text-gray-500">{item.day}</p>
                  <p className={`text-xl font-bold ${item.note ? "text-sky-600" : "text-gray-700"}`}>
                    {item.rank}位
                  </p>
                  {item.note && <p className="text-xs text-sky-600">{item.note}</p>}
                </div>
              ))}
            </div>

            <h4 className="font-semibold mb-2">ROI評価</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>媒体</th>
                  <th>評価</th>
                  <th>備考</th>
                </tr>
              </thead>
              <tbody>
                {competitorDetails.dalba.roiEvaluation.map((item) => (
                  <tr key={item.media}>
                    <td className="font-medium">{item.media}</td>
                    <td>
                      <span className={item.rating === 3 ? "text-emerald-600" : "text-amber-600"}>
                        {"★".repeat(item.rating)}{"☆".repeat(3 - item.rating)}
                      </span>
                    </td>
                    <td className="text-sm text-gray-600">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">※ ★★☆: ROI普通 / ★★★: ROI Good</p>
          </div>

          {/* Medicube */}
          <div className="card mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold">{competitorDetails.medicube.name}</h3>
              <span className="badge badge-emerald">{competitorDetails.medicube.tier}</span>
            </div>

            <div className="alert alert-info mb-4">
              <p className="font-semibold">成功要因</p>
              <p>{competitorDetails.medicube.successFactor}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="font-semibold mb-2">販売戦略</h4>
                <table className="data-table">
                  <tbody>
                    <tr>
                      <td className="font-medium text-gray-600">通常期</td>
                      <td>{competitorDetails.medicube.salesStrategy.normal}</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-gray-600">メガ割</td>
                      <td className="font-bold text-sky-600">
                        {competitorDetails.medicube.salesStrategy.megaSale}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h4 className="font-semibold mb-2">主要施策</h4>
                <ul className="space-y-2">
                  {competitorDetails.medicube.campaigns.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-sky-500">•</span>
                      {item.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* LAKA */}
          <div className="card mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold">{competitorDetails.laka.name}</h3>
              <span className="badge badge-amber">{competitorDetails.laka.tier}</span>
            </div>

            <div className="alert alert-warning mb-4">
              <p className="font-semibold">成功要因</p>
              <p>{competitorDetails.laka.successFactor}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="font-semibold mb-2">販売戦略</h4>
                <table className="data-table">
                  <tbody>
                    <tr>
                      <td className="font-medium text-gray-600">通常期</td>
                      <td>{competitorDetails.laka.salesStrategy.normal}</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-gray-600">メガ割</td>
                      <td className="font-bold text-sky-600">
                        {competitorDetails.laka.salesStrategy.megaSale}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h4 className="font-semibold mb-2">主要施策</h4>
                <ul className="space-y-2">
                  {competitorDetails.laka.campaigns.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-amber-500">•</span>
                      {item.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h4 className="font-semibold mb-2">{competitorDetails.laka.caseStudy.title}</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>日付</th>
                  <th>施策</th>
                  <th>順位</th>
                </tr>
              </thead>
              <tbody>
                {competitorDetails.laka.caseStudy.timeline.map((item, i) => (
                  <tr key={i}>
                    <td className="font-medium">{item.date}</td>
                    <td>{item.content}</td>
                    <td className="font-bold text-sky-600">{item.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Other Brands */}
          <div className="card">
            <h3 className="card-header">その他ブランド</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ブランド</th>
                  <th>Tier</th>
                  <th>特記事項</th>
                </tr>
              </thead>
              <tbody>
                {competitorDetails.others.map((item) => (
                  <tr key={item.brand}>
                    <td className="font-medium">{item.brand}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.tier === "Top"
                            ? "badge-emerald"
                            : item.tier === "Middle"
                            ? "badge-amber"
                            : item.tier === "Lower"
                            ? "badge-gray"
                            : "badge-gray"
                        }`}
                      >
                        {item.tier}
                      </span>
                    </td>
                    <td className="text-sm text-gray-600">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Marketing Methods */}
        <section id="marketing" className="mb-12">
          <h2 className="section-header">マーケティング手法</h2>

          {/* White Tactics */}
          <div className="card mb-6">
            <h3 className="card-header">ホワイト施策</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>施策</th>
                  <th>概要</th>
                  <th>効果</th>
                </tr>
              </thead>
              <tbody>
                {marketingMethods.whiteTactics.map((item) => (
                  <tr key={item.tactic}>
                    <td className="font-medium">{item.tactic}</td>
                    <td>{item.overview}</td>
                    <td>
                      <span className="badge badge-emerald">{item.effect}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Gray Tactics */}
          <div className="card border-l-4 border-l-amber-500">
            <h3 className="card-header">グレー施策（RT部隊）</h3>

            <div className="alert alert-warning mb-4">
              <p>{marketingMethods.grayTactics.overview}</p>
            </div>

            <h4 className="font-semibold mb-2">主要業者一覧</h4>
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              {marketingMethods.grayTactics.rtSquad.map((item) => (
                <div key={item.name} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{item.name}</p>
                  {item.note !== "-" && (
                    <p className="text-xs text-amber-600">{item.note}</p>
                  )}
                </div>
              ))}
            </div>

            <h4 className="font-semibold mb-2">利用ブランド</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {marketingMethods.grayTactics.usingBrands.map((brand) => (
                <span key={brand} className="badge badge-red">
                  {brand}
                </span>
              ))}
            </div>

            <p className="text-sm text-red-600">
              ※ {marketingMethods.grayTactics.incidents[0]}
            </p>
          </div>
        </section>

        {/* Section 5: JT Agency */}
        <section id="jt" className="mb-12">
          <h2 className="section-header">JT代理店情報</h2>

          <div className="card mb-6">
            <h3 className="card-header">会社概要</h3>
            <table className="data-table">
              <tbody>
                <tr>
                  <td className="font-medium text-gray-600 w-1/4">会社名</td>
                  <td className="font-bold">{jtAgencyData.company.name}</td>
                </tr>
                <tr>
                  <td className="font-medium text-gray-600">役割</td>
                  <td>{jtAgencyData.company.role}</td>
                </tr>
                <tr>
                  <td className="font-medium text-gray-600">備考</td>
                  <td>{jtAgencyData.company.note}</td>
                </tr>
                <tr>
                  <td className="font-medium text-gray-600">AnyMind関係</td>
                  <td className="text-amber-600">{jtAgencyData.company.history}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="card">
              <h3 className="card-header">特徴</h3>
              <ul className="space-y-2">
                {jtAgencyData.characteristics.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 className="card-header">LAKA 課題感</h3>
              <ul className="space-y-2">
                {jtAgencyData.lakaIssues.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-sky-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card">
            <h3 className="card-header">朝鮮美人 課題感</h3>
            <ul className="space-y-2">
              {jtAgencyData.joseonIssues.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-violet-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 6: Implications */}
        <section id="implications" className="mb-12">
          <h2 className="section-header">Dr.Melaxinへの示唆</h2>

          <div className="card mb-6">
            <h3 className="card-header">Top Tierの共通点</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {implications.topTierCommon.map((item, i) => (
                <div
                  key={i}
                  className="p-4 bg-emerald-50 rounded-lg border-l-4 border-l-emerald-500"
                >
                  <div className="flex items-center gap-2">
                    <span className="priority-badge priority-1">{i + 1}</span>
                    <span className="font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="alert alert-warning mb-6">
            <p className="font-semibold">現状の課題</p>
            <p className="text-lg mt-1">{implications.currentIssue}</p>
          </div>

          <div className="card">
            <h3 className="card-header">必要アクション</h3>
            <div className="space-y-4">
              {implications.requiredActions.map((item, i) => (
                <div
                  key={i}
                  className="p-4 bg-sky-50 rounded-lg border-l-4 border-l-sky-500"
                >
                  <div className="flex items-start gap-3">
                    <span className={`priority-badge priority-${i + 1}`}>{i + 1}</span>
                    <div>
                      <p className="font-bold text-gray-900">{item.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>競合リサーチ | {researchMeta.source}</p>
        </footer>
      </main>
    </>
  );
}
