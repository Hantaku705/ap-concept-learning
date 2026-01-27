'use client';

import { useState, useMemo } from 'react';
import { BaseItem, CategoryType } from '../../types';
import { ItemGrid } from './ItemGrid';
import { ItemDetail } from './ItemDetail';
import { SearchInput } from '../ui/SearchInput';

export interface CategoryTabProps {
  category: CategoryType;
  items: BaseItem[];
  searchQuery: string;
  onSearchChange?: (query: string) => void;
}

/**
 * カテゴリ別タブの共通コンポーネント
 *
 * - 検索フィルタリング
 * - アイテム一覧表示（ItemGrid）
 * - 詳細表示（ItemDetail）
 */
export function CategoryTab({
  category,
  items,
  searchQuery,
  onSearchChange,
}: CategoryTabProps) {
  const [selectedItem, setSelectedItem] = useState<BaseItem | null>(null);

  // 検索クエリでフィルタリング
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.fileName.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  // カテゴリ別の設定
  const categoryConfig = getCategoryConfig(category);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {categoryConfig.title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {categoryConfig.description}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="font-medium">{filteredItems.length}</span>
          <span>of</span>
          <span>{items.length}</span>
          <span>items</span>
        </div>
      </div>

      {/* Search (optional - controlled from parent) */}
      {onSearchChange && (
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={categoryConfig.searchPlaceholder}
          className="max-w-md"
        />
      )}

      {/* Item Grid */}
      <ItemGrid
        items={filteredItems}
        onItemClick={setSelectedItem}
        emptyMessage={
          searchQuery
            ? `No ${category} found matching "${searchQuery}"`
            : `No ${category} available`
        }
      />

      {/* Item Detail Modal */}
      <ItemDetail
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}

interface CategoryConfig {
  title: string;
  description: string;
  searchPlaceholder: string;
}

function getCategoryConfig(category: CategoryType): CategoryConfig {
  const configs: Record<CategoryType, CategoryConfig> = {
    skills: {
      title: 'Skills',
      description:
        'Knowledge patterns, guidelines, and domain expertise for reference',
      searchPlaceholder: 'Search skills...',
    },
    commands: {
      title: 'Commands',
      description: 'Slash commands for executing specific workflows',
      searchPlaceholder: 'Search commands...',
    },
    agents: {
      title: 'Agents',
      description: 'Specialized subagents for delegated tasks',
      searchPlaceholder: 'Search agents...',
    },
    rules: {
      title: 'Rules',
      description: 'Always-on guidelines and policies',
      searchPlaceholder: 'Search rules...',
    },
  };

  return configs[category];
}
