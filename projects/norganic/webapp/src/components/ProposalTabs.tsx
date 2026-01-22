"use client";

import { useState, ReactNode } from "react";

interface TabProps {
  conceptContent: ReactNode;
  strategyContent: ReactNode;
  budgetContent: ReactNode;
  timelineContent: ReactNode;
  calendarContent: ReactNode;
}

const tabs = [
  { id: "concept", label: "Concept", icon: "💡" },
  { id: "strategy", label: "Strategy", icon: "🎯" },
  { id: "budget", label: "Budget", icon: "💰" },
  { id: "timeline", label: "Timeline", icon: "📅" },
  { id: "calendar", label: "Calendar", icon: "📆" },
];

export default function ProposalTabs({
  conceptContent,
  strategyContent,
  budgetContent,
  timelineContent,
  calendarContent,
}: TabProps) {
  const [activeTab, setActiveTab] = useState("concept");

  const renderContent = () => {
    switch (activeTab) {
      case "concept":
        return conceptContent;
      case "strategy":
        return strategyContent;
      case "budget":
        return budgetContent;
      case "timeline":
        return timelineContent;
      case "calendar":
        return calendarContent;
      default:
        return conceptContent;
    }
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-1" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-3 text-sm font-medium border-b-2 transition-colors
                  ${
                    activeTab === tab.id
                      ? "border-pink-500 text-pink-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">{renderContent()}</div>
    </div>
  );
}
