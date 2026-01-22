'use client';

import { Persona } from '@/data/proposal-data';

interface PersonaCardProps {
  persona: Persona;
}

export default function PersonaCard({ persona }: PersonaCardProps) {
  const priorityColors: Record<number, string> = {
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-green-500',
    5: 'bg-blue-500',
    6: 'bg-purple-500',
  };

  const regionColors: Record<string, string> = {
    '北米': 'bg-blue-100 text-blue-800',
    '欧州': 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className={`h-2 ${priorityColors[persona.priority]}`} />
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900">{persona.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${regionColors[persona.region]}`}>
                {persona.region}
              </span>
            </div>
            <p className="text-sm text-gray-600">{persona.segment}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">Priority</span>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${priorityColors[persona.priority]}`}>
              {persona.priority}
            </span>
          </div>
        </div>

        {/* Profile */}
        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-1">Profile</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{persona.age}歳</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-700">{persona.occupation}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{persona.profile}</p>
        </div>

        {/* Pain Point */}
        <div className="mb-3 p-2 bg-red-50 rounded">
          <div className="text-xs text-red-600 font-medium mb-1">Pain Point</div>
          <p className="text-sm text-red-800">{persona.painPoint}</p>
        </div>

        {/* Appeal Point */}
        <div className="mb-3 p-2 bg-green-50 rounded">
          <div className="text-xs text-green-600 font-medium mb-1">Appeal Point</div>
          <p className="text-sm text-green-800">{persona.appealPoint}</p>
        </div>

        {/* Messages */}
        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-1">Key Messages</div>
          <ul className="space-y-1">
            {persona.messages.map((message, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-blue-500">&#8220;</span>
                <span>{message}</span>
                <span className="text-blue-500">&#8221;</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Budget */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">Budget Allocation</span>
          <span className="text-sm font-bold text-blue-600">{persona.budgetAllocation}%</span>
        </div>
      </div>
    </div>
  );
}
