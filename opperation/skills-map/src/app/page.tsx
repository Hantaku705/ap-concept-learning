'use client';

import { useState } from 'react';
import { BaseItem, CategoryType, SourceType } from './types';
import {
  skillsData,
  commandsData,
  agentsData,
  rulesData,
  statistics,
} from './data/skills-data';
import { useSearch } from './hooks/useSearch';
import { SearchInput, TabButton, Badge } from './components/ui';
import { ItemGrid, ItemDetail } from './components/tabs';
import { cn } from './lib/cn';

// =============================================================================
// Constants
// =============================================================================

type TabType = 'skills' | 'commands' | 'agents' | 'rules';

interface TabConfig {
  id: TabType;
  label: string;
  data: BaseItem[];
}

const TABS: TabConfig[] = [
  { id: 'skills', label: 'Skills', data: skillsData },
  { id: 'commands', label: 'Commands', data: commandsData },
  { id: 'agents', label: 'Agents', data: agentsData },
  { id: 'rules', label: 'Rules', data: rulesData },
];

const SOURCE_OPTIONS: { value: SourceType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Sources' },
  { value: 'project', label: 'Project' },
  { value: 'global', label: 'Global' },
];

// =============================================================================
// Main Component
// =============================================================================

export default function Home() {
  // State
  const [activeTab, setActiveTab] = useState<TabType>('skills');
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<SourceType | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<BaseItem | null>(null);

  // Get current tab data
  const currentTabData = TABS.find((tab) => tab.id === activeTab)?.data ?? [];

  // Apply search and filters
  const { filteredItems, filteredCount } = useSearch({
    items: currentTabData,
    searchQuery,
    categoryFilter: activeTab as CategoryType,
    sourceFilter,
  });

  // Calculate counts for each tab (with current filters applied)
  const getTabCount = (tabId: TabType) => {
    const tabData = TABS.find((tab) => tab.id === tabId)?.data ?? [];
    return tabData.filter((item) => {
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSource =
        sourceFilter === 'all' || item.source === sourceFilter;
      return matchesSearch && matchesSource;
    }).length;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Title & Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                  Skills Map
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Claude Code Settings Visualization
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  label={`${statistics.total} Total`}
                  variant="default"
                />
                <Badge
                  label={`${statistics.bySource.project} Project`}
                  variant="project"
                />
                <Badge
                  label={`${statistics.bySource.global} Global`}
                  variant="global"
                />
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name or description..."
                className="flex-1"
              />

              {/* Source Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={sourceFilter}
                  onChange={(e) =>
                    setSourceFilter(e.target.value as SourceType | 'all')
                  }
                  className={cn(
                    'px-4 py-2.5 rounded-xl',
                    'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800',
                    'text-zinc-900 dark:text-zinc-100',
                    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
                    'transition-all duration-200',
                    'text-sm font-medium'
                  )}
                  aria-label="Filter by source"
                >
                  {SOURCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-[145px] sm:top-[137px] z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 overflow-x-auto">
            <div
              className="flex gap-2"
              role="tablist"
              aria-label="Category tabs"
            >
              {TABS.map((tab) => (
                <TabButton
                  key={tab.id}
                  label={tab.label}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  count={getTabCount(tab.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Content Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {TABS.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {getTabDescription(activeTab)}
              </p>
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-medium">{filteredCount}</span>
              <span className="mx-1">of</span>
              <span>{currentTabData.length}</span>
              <span className="ml-1">items</span>
            </div>
          </div>
        </div>

        {/* Item Grid */}
        <ItemGrid
          items={filteredItems}
          onItemClick={setSelectedItem}
          emptyMessage={
            searchQuery || sourceFilter !== 'all'
              ? `No ${activeTab} found with current filters`
              : `No ${activeTab} available`
          }
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <p>
              Skills Map - Claude Code Configuration Viewer
            </p>
            <p>
              Data from <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">AP/_claude-code/</code>
            </p>
          </div>
        </div>
      </footer>

      {/* Item Detail Modal */}
      <ItemDetail
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}

// =============================================================================
// Helper Functions
// =============================================================================

function getTabDescription(tab: TabType): string {
  const descriptions: Record<TabType, string> = {
    skills: 'Knowledge patterns, guidelines, and domain expertise for reference',
    commands: 'Slash commands (/command) for executing specific workflows',
    agents: 'Specialized subagents for delegated tasks',
    rules: 'Always-on guidelines and policies',
  };
  return descriptions[tab];
}
