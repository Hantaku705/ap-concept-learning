'use client';

import { Card } from '../ui/Card';
import { CopyButton } from '../ui/CopyButton';
import { starterKit } from '../../data/onboarding-data';

export function StarterKitTab() {
  return (
    <div className="space-y-10">
      <div className="text-center p-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/60 dark:border-emerald-800/60">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
          Starter Kit
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-lg mx-auto">
          12 commands + 8 agents + 6 rules in one install
        </p>
        <div className="relative max-w-xl mx-auto">
          <div className="bg-zinc-900 text-zinc-100 p-5 rounded-xl font-mono text-sm">
            {starterKit.installCommand}
          </div>
          <div className="absolute top-3 right-3">
            <CopyButton text={starterKit.installCommand} />
          </div>
        </div>
        <a
          href={starterKit.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          View on GitHub →
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { n: '12', label: 'Commands', color: 'text-indigo-500' },
          { n: '8', label: 'Agents', color: 'text-purple-500' },
          { n: '6', label: 'Rules', color: 'text-orange-500' },
          { n: '1', label: 'SDK Doc', color: 'text-teal-500' },
        ].map((s) => (
          <Card key={s.label} className="p-5 text-center">
            <div className={`text-3xl font-bold ${s.color}`}>{s.n}</div>
            <div className="text-sm text-zinc-400 mt-1">{s.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
