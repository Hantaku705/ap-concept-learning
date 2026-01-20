"use client";

import { useState } from "react";
import {
  allReasonCategories,
  ReasonCategory,
  ReasonItem,
} from "@/data/reason-data";

interface ReasonAccordionProps {
  category?: string;
  showSearch?: boolean;
}

export default function ReasonAccordion({
  category,
  showSearch = true,
}: ReasonAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(
    category || null
  );

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredCategories = allReasonCategories.filter((cat) => {
    if (activeCategory && cat.id !== activeCategory) return false;
    if (!searchTerm) return true;
    const lowerSearch = searchTerm.toLowerCase();
    return cat.items.some(
      (item) =>
        item.question.toLowerCase().includes(lowerSearch) ||
        item.answer.toLowerCase().includes(lowerSearch) ||
        item.details?.some((d) => d.toLowerCase().includes(lowerSearch))
    );
  });

  const getFilteredItems = (items: ReasonItem[]) => {
    if (!searchTerm) return items;
    const lowerSearch = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(lowerSearch) ||
        item.answer.toLowerCase().includes(lowerSearch) ||
        item.details?.some((d) => d.toLowerCase().includes(lowerSearch))
    );
  };

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    strategy: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
    tactic: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    budget: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    reach: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
    risk: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
    csf: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      {showSearch && (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="質問を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                activeCategory === null
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              すべて
            </button>
            {allReasonCategories.map((cat) => {
              const colors = categoryColors[cat.id] || categoryColors.strategy;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeCategory === cat.id
                      ? `${colors.bg} ${colors.text} font-medium`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Accordion Content */}
      {filteredCategories.map((cat) => {
        const colors = categoryColors[cat.id] || categoryColors.strategy;
        const items = getFilteredItems(cat.items);
        if (items.length === 0) return null;

        return (
          <div key={cat.id} className="space-y-2">
            <h4 className={`text-sm font-semibold ${colors.text} flex items-center gap-2`}>
              <span className={`w-2 h-2 rounded-full ${colors.bg} ${colors.border} border`} />
              {cat.name}
              <span className="text-xs font-normal text-gray-400">({items.length}件)</span>
            </h4>

            <div className="space-y-2">
              {items.map((item) => {
                const isOpen = openItems.has(item.id);
                return (
                  <div
                    key={item.id}
                    className={`border rounded-lg overflow-hidden transition-colors ${
                      isOpen ? colors.border : "border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-full px-4 py-3 text-left flex items-start gap-3 transition-colors ${
                        isOpen ? colors.bg : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 mt-0.5 transition-transform flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        } ${isOpen ? colors.text : "text-gray-400"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <span className={`font-medium ${isOpen ? colors.text : "text-gray-900"}`}>
                        {item.question}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 py-4 border-t border-gray-100 bg-white">
                        <p className="text-gray-700 mb-3">{item.answer}</p>

                        {item.details && item.details.length > 0 && (
                          <ul className="space-y-1 mb-3">
                            {item.details.map((detail, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}

                        {item.sources && item.sources.length > 0 && (
                          <div className="pt-3 border-t border-gray-100">
                            <p className="text-xs text-gray-400 mb-1">参考:</p>
                            <div className="flex flex-wrap gap-1">
                              {item.sources.map((source, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded"
                                >
                                  {source}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {filteredCategories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>検索結果が見つかりませんでした</p>
        </div>
      )}
    </div>
  );
}
