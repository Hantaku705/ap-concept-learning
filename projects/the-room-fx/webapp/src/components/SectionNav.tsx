'use client';

import { sections } from '@/data/proposal-data';

interface SectionNavProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function SectionNav({ activeSection, onSectionChange }: SectionNavProps) {
  return (
    <nav className="w-64 bg-gray-50 border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Contents
        </h2>
      </div>
      <ul className="py-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onSectionChange(section.id)}
              className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-900'
                  : 'hover:bg-gray-100 border-l-4 border-transparent text-gray-700'
              }`}
            >
              <span className={`text-xs font-mono ${
                activeSection === section.id ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {section.number}
              </span>
              <div>
                <div className={`text-sm font-medium ${
                  activeSection === section.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {section.title}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {section.description}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
