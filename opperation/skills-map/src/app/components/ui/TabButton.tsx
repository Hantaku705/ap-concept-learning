'use client';

import { cn } from '../../lib/cn';

export interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
  className?: string;
}

export function TabButton({
  label,
  isActive,
  onClick,
  count,
  className,
}: TabButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        isActive
          ? 'bg-indigo-500 text-white shadow-sm'
          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700',
        className
      )}
    >
      <span className="flex items-center gap-2">
        {label}
        {count !== undefined && (
          <span
            className={cn(
              'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs rounded-full',
              isActive
                ? 'bg-white/20 text-white'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
            )}
          >
            {count}
          </span>
        )}
      </span>
    </button>
  );
}
