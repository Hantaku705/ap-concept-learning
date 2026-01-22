'use client';

import { campaignTimeline } from '@/data/proposal-data';

export default function TimelineChart() {
  const phases = campaignTimeline.phases.filter((p) => p.id !== 'prep');

  const phaseColors: Record<string, string> = {
    teaser: 'bg-purple-500',
    main: 'bg-blue-500',
    event: 'bg-orange-500',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">キャンペーンタイムライン</h3>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Milestones */}
        <div className="space-y-6">
          {campaignTimeline.milestones.map((milestone, index) => (
            <div key={index} className="relative flex items-start gap-4 pl-10">
              <div className="absolute left-2.5 w-3 h-3 rounded-full bg-gray-400 border-2 border-white" />
              <div>
                <div className="text-xs font-mono text-gray-500">{milestone.date}</div>
                <div className="text-sm text-gray-900">{milestone.event}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase Cards */}
      <div className="mt-6 space-y-3">
        {phases.map((phase) => (
          <div key={phase.id} className="flex items-stretch gap-3">
            <div className={`w-1 rounded-full ${phaseColors[phase.id]}`} />
            <div className="flex-1 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{phase.name}</span>
                <span className="text-xs text-gray-500">{phase.period}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{phase.description}</p>
              {phase.budget > 0 && (
                <div className="text-xs text-blue-600 font-medium">
                  予算: {phase.budget.toLocaleString()}万円
                </div>
              )}
              {phase.kpis.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {phase.kpis.map((kpi, index) => (
                    <span key={index} className="text-xs bg-white px-2 py-1 rounded border border-gray-200">
                      {kpi.label}: {kpi.target}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
