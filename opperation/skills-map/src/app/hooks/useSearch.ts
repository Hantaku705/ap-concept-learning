/**
 * useSearch - 検索・フィルター機能フック
 *
 * Claude Code設定アイテムの検索・フィルタリングを提供するカスタムフック
 */

import { useMemo } from 'react';
import { BaseItem, CategoryType, SourceType } from '../types';

// =============================================================================
// Types
// =============================================================================

/**
 * useSearchフックのオプション
 */
export interface UseSearchOptions {
  /** 検索対象のアイテム配列 */
  items: BaseItem[];

  /** 検索クエリ（name, descriptionに対する部分一致） */
  searchQuery: string;

  /** カテゴリフィルター */
  categoryFilter: CategoryType | 'all';

  /** ソースフィルター */
  sourceFilter: SourceType | 'all';
}

/**
 * useSearchフックの戻り値
 */
export interface UseSearchResult {
  /** フィルタリング後のアイテム配列 */
  filteredItems: BaseItem[];

  /** 全アイテム数 */
  totalCount: number;

  /** フィルタリング後のアイテム数 */
  filteredCount: number;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * 検索クエリによるフィルタリング
 * name, descriptionに対する大文字小文字区別なしの部分一致検索
 */
function matchesSearchQuery(item: BaseItem, query: string): boolean {
  if (!query.trim()) {
    return true;
  }

  const normalizedQuery = query.toLowerCase().trim();
  const nameMatch = item.name.toLowerCase().includes(normalizedQuery);
  const descriptionMatch = item.description.toLowerCase().includes(normalizedQuery);

  return nameMatch || descriptionMatch;
}

/**
 * カテゴリフィルターによるフィルタリング
 */
function matchesCategoryFilter(
  item: BaseItem,
  filter: CategoryType | 'all'
): boolean {
  if (filter === 'all') {
    return true;
  }
  return item.category === filter;
}

/**
 * ソースフィルターによるフィルタリング
 */
function matchesSourceFilter(
  item: BaseItem,
  filter: SourceType | 'all'
): boolean {
  if (filter === 'all') {
    return true;
  }
  return item.source === filter;
}

// =============================================================================
// Hook
// =============================================================================

/**
 * 検索・フィルター機能を提供するカスタムフック
 *
 * @param options - 検索オプション
 * @returns フィルタリング結果とカウント情報
 *
 * @example
 * ```tsx
 * const { filteredItems, totalCount, filteredCount } = useSearch({
 *   items: allItems,
 *   searchQuery: 'build',
 *   categoryFilter: 'commands',
 *   sourceFilter: 'all',
 * });
 * ```
 */
export function useSearch(options: UseSearchOptions): UseSearchResult {
  const { items, searchQuery, categoryFilter, sourceFilter } = options;

  // フィルタリング結果をメモ化
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 全フィルター条件をAND条件で適用
      const matchesSearch = matchesSearchQuery(item, searchQuery);
      const matchesCategory = matchesCategoryFilter(item, categoryFilter);
      const matchesSource = matchesSourceFilter(item, sourceFilter);

      return matchesSearch && matchesCategory && matchesSource;
    });
  }, [items, searchQuery, categoryFilter, sourceFilter]);

  // カウント情報をメモ化
  const counts = useMemo(() => {
    return {
      totalCount: items.length,
      filteredCount: filteredItems.length,
    };
  }, [items.length, filteredItems.length]);

  return {
    filteredItems,
    ...counts,
  };
}

// =============================================================================
// Exports
// =============================================================================

export default useSearch;
