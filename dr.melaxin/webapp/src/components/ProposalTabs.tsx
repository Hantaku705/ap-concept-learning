"use client";

import { useState } from "react";

type TabType = "strategy" | "tactics" | "mediaplan" | "calendar";

interface ProposalTabsProps {
  strategyContent: React.ReactNode;
  tacticsContent?: React.ReactNode;
  mediaplanContent: React.ReactNode;
  calendarContent?: React.ReactNode;
  defaultTab?: TabType;
}

export default function ProposalTabs({
  strategyContent,
  tacticsContent,
  mediaplanContent,
  calendarContent,
  defaultTab = "strategy",
}: ProposalTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);

  return (
    <div>
      {/* Tab Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex">
            {/* Strategy Tab */}
            <button
              onClick={() => setActiveTab("strategy")}
              className={`flex-1 py-4 px-4 text-center font-medium transition-colors relative ${
                activeTab === "strategy"
                  ? "text-sky-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Strategy
              </span>
              {activeTab === "strategy" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600" />
              )}
            </button>

            {/* Tactics Tab */}
            {tacticsContent && (
              <button
                onClick={() => setActiveTab("tactics")}
                className={`flex-1 py-4 px-4 text-center font-medium transition-colors relative ${
                  activeTab === "tactics"
                    ? "text-violet-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Tactics
                </span>
                {activeTab === "tactics" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600" />
                )}
              </button>
            )}

            {/* Media Plan Tab */}
            <button
              onClick={() => setActiveTab("mediaplan")}
              className={`flex-1 py-4 px-4 text-center font-medium transition-colors relative ${
                activeTab === "mediaplan"
                  ? "text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Media Plan
              </span>
              {activeTab === "mediaplan" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
              )}
            </button>

            {/* Calendar Tab */}
            {calendarContent && (
              <button
                onClick={() => setActiveTab("calendar")}
                className={`flex-1 py-4 px-4 text-center font-medium transition-colors relative ${
                  activeTab === "calendar"
                    ? "text-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Calendar
                </span>
                {activeTab === "calendar" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className={activeTab === "strategy" ? "block" : "hidden"}>
        {strategyContent}
      </div>
      {tacticsContent && (
        <div className={activeTab === "tactics" ? "block" : "hidden"}>
          {tacticsContent}
        </div>
      )}
      <div className={activeTab === "mediaplan" ? "block" : "hidden"}>
        {mediaplanContent}
      </div>
      {calendarContent && (
        <div className={activeTab === "calendar" ? "block" : "hidden"}>
          {calendarContent}
        </div>
      )}
    </div>
  );
}
