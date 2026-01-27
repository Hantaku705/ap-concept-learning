'use client';

import { Card } from '../ui/Card';
import { glossary } from '../../data/onboarding-data';

export function KeyTermsTab() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
          Key Terms
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
          Claude Code を始める前に知っておきたい用語集
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {glossary.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-lg">{item.icon}</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{item.term}</span>
              {item.termEn && (
                <span className="text-xs text-zinc-400">({item.termEn})</span>
              )}
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.definition}</p>
            <p className="mt-2 text-xs text-indigo-500 dark:text-indigo-400">{item.analogy}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
