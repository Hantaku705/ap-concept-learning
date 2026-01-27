'use client';

import { BaseItem, CategoryType } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface ItemGridProps {
  items: BaseItem[];
  onItemClick?: (item: BaseItem) => void;
  emptyMessage?: string;
}

/**
 * アイテム一覧をグリッド表示する共通コンポーネント
 *
 * レスポンシブ対応:
 * - モバイル: 1列
 * - タブレット: 2列
 * - デスクトップ: 3列
 * - ワイド: 4列
 */
export function ItemGrid({
  items,
  onItemClick,
  emptyMessage = 'No items found',
}: ItemGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-zinc-400 dark:text-zinc-500 text-center">
          <svg
            className="mx-auto h-12 w-12 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onClick={onItemClick ? () => onItemClick(item) : undefined}
        />
      ))}
    </div>
  );
}

interface ItemCardProps {
  item: BaseItem;
  onClick?: () => void;
}

function ItemCard({ item, onClick }: ItemCardProps) {
  const badges = (
    <>
      <Badge label={item.category} variant={item.category as CategoryType} />
      <Badge label={item.source} variant={item.source} />
    </>
  );

  return (
    <Card
      title={item.name}
      description={item.description || 'No description'}
      badges={badges}
      onClick={onClick}
    >
      <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
          {item.fileName}.md
        </p>
      </div>
    </Card>
  );
}
