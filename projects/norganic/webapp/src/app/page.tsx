"use client";

import ProposalTabs from "@/components/ProposalTabs";
import ConceptContent from "@/components/ConceptContent";
import StrategyContent from "@/components/StrategyContent";
import BudgetContent from "@/components/BudgetContent";
import TimelineContent from "@/components/TimelineContent";
import CalendarContent from "@/components/CalendarContent";
import { conceptMeta } from "@/data/concept-data";
import { strategyMeta } from "@/data/strategy-data";
import { EditModeToggle } from "@/components/edit";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-xs font-medium bg-pink-100 text-pink-700 rounded">
                  26SS
                </span>
                <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                  {strategyMeta.totalBudgetFormatted}
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                {conceptMeta.brand} - {conceptMeta.product}
              </h1>
              <p className="text-sm text-gray-500">{conceptMeta.campaign}</p>
            </div>
            <div className="flex items-center gap-4">
              <EditModeToggle />
              <div className="text-right text-sm text-gray-500">
                <p>{strategyMeta.period}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <ProposalTabs
        conceptContent={<ConceptContent />}
        strategyContent={<StrategyContent />}
        budgetContent={<BudgetContent />}
        timelineContent={<TimelineContent />}
        calendarContent={<CalendarContent />}
      />
    </main>
  );
}
