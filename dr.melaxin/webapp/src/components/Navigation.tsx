"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sections, proposalMeta } from "@/data/proposal-data";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
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
    <nav className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-sky">CONFIDENTIAL</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">
            {proposalMeta.brand}
          </h1>
          <p className="text-sm text-gray-500">マーケティング提案書</p>
        </div>

        {/* Page Navigation */}
        <div className="mb-6 flex gap-2">
          <span className="flex-1 px-3 py-2 text-center text-sm rounded-lg bg-sky-100 text-sky-700 font-medium">
            提案書
          </span>
          <Link
            href="/research"
            className="flex-1 px-3 py-2 text-center text-sm rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            リサーチ
          </Link>
        </div>

        {/* Meta info */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p>
            <span className="font-medium">クライアント:</span>{" "}
            {proposalMeta.client}
          </p>
          <p>
            <span className="font-medium">提案者:</span>{" "}
            {proposalMeta.proposer}
          </p>
          <p>
            <span className="font-medium">日付:</span> {proposalMeta.date}
          </p>
        </div>

        {/* Section links */}
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

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p className="font-medium text-gray-700 mb-1">目標</p>
            <p className="text-sky-600 font-semibold">GMV 120億円</p>
            <p className="mt-2">
              投資: 38億円 / ROAS: 316%
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
