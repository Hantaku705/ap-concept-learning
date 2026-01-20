"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections, strategyMeta } from "@/data/strategy-data";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("executive-summary");
  const pathname = usePathname();
  const isStrategyPage = pathname === "/strategy";
  const isHomePage = pathname === "/";
  const isMediaPlanPage = pathname === "/mediaplan";

  useEffect(() => {
    if (!isStrategyPage) return;

    const handleScroll = () => {
      const sectionElements = sections.map((s) => ({
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
  }, [isStrategyPage]);

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
    <nav className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="block">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-sky">CONFIDENTIAL</span>
              <span className="badge badge-emerald text-xs">$10M</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900 hover:text-sky-600 transition-colors">
              {strategyMeta.brand}
            </h1>
            <p className="text-sm text-gray-500">マーケティング提案書</p>
          </Link>
        </div>

        {/* Page Navigation */}
        <div className="mb-6 space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            ページ
          </p>
          <Link
            href="/"
            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
              isHomePage
                ? "bg-gray-100 text-gray-900 font-medium"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Home
          </Link>
          <Link
            href="/strategy"
            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
              isStrategyPage
                ? "bg-sky-100 text-sky-700 font-medium"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Strategy
          </Link>
          <Link
            href="/mediaplan"
            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
              isMediaPlanPage
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Media Plan
          </Link>
          <Link
            href="/dashboard"
            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
              pathname === "/dashboard"
                ? "bg-sky-100 text-sky-700 font-medium"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/research"
            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
              pathname === "/research"
                ? "bg-sky-100 text-sky-700 font-medium"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Research
          </Link>
        </div>

        {/* Meta info */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p>
            <span className="font-medium">クライアント:</span>{" "}
            {strategyMeta.client}
          </p>
          <p>
            <span className="font-medium">提案者:</span>{" "}
            {strategyMeta.proposer}
          </p>
          <p>
            <span className="font-medium">日付:</span> {strategyMeta.date}
          </p>
        </div>

        {/* Section links (only on strategy page) */}
        {isStrategyPage && (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              セクション
            </p>
            {sections.map((section) => (
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
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p className="font-medium text-gray-700 mb-1">目標</p>
            <p className="text-sky-600 font-semibold">GMV {strategyMeta.targetGmv}</p>
            <p className="mt-2">
              投資: {strategyMeta.budget} / ROAS: {strategyMeta.roas}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
