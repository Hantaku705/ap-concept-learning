"use client";

import ProposalTabs from "@/components/ProposalTabs";
import StrategyContent from "@/components/StrategyContent";
import TacticsListContent from "@/components/TacticsListContent";
import MediaPlanContent from "@/components/MediaPlanContent";
import ActivationCalendarContent from "@/components/ActivationCalendarContent";
import { strategyMeta } from "@/data/strategy-data";

export default function HomePage() {
  return (
    <main>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-xs font-medium bg-sky-100 text-sky-700 rounded">
                  CONFIDENTIAL
                </span>
                <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                  $10M
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                {strategyMeta.brand} - Japan Market Proposal
              </h1>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>{strategyMeta.proposer}</p>
              <p>{strategyMeta.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <ProposalTabs
        strategyContent={<StrategyContent />}
        tacticsContent={<TacticsListContent />}
        mediaplanContent={<MediaPlanContent />}
        calendarContent={<ActivationCalendarContent />}
      />
    </main>
  );
}
