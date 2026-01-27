'use client';

import { useEffect, useCallback } from 'react';
import {
  BaseItem,
  CategoryType,
  CommandItem,
  AgentItem,
  RuleItem,
  SkillItem,
} from '../../types';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/cn';

export interface ItemDetailProps {
  item: BaseItem | null;
  onClose: () => void;
}

/**
 * アイテム詳細表示モーダル/パネル
 *
 * カテゴリに応じて追加情報を表示:
 * - commands: slashCommand, args
 * - agents: tools, model
 * - rules: priority, appliesTo
 * - skills: tags, usage
 */
export function ItemDetail({ item, onClose }: ItemDetailProps) {
  // Escキーでモーダルを閉じる
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (item) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-detail-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={cn(
          'relative w-full max-w-2xl max-h-[85vh] overflow-hidden',
          'bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl',
          'flex flex-col'
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                label={item.category}
                variant={item.category as CategoryType}
              />
              <Badge label={item.source} variant={item.source} />
            </div>
            <h2
              id="item-detail-title"
              className="text-xl font-bold text-zinc-900 dark:text-zinc-100 truncate"
            >
              {item.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'ml-4 p-2 rounded-lg',
              'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300',
              'hover:bg-zinc-100 dark:hover:bg-zinc-800',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500'
            )}
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Description */}
          <section className="mb-6">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              {item.description || 'No description available'}
            </p>
          </section>

          {/* Category-specific details */}
          <CategoryDetails item={item} />

          {/* File Info */}
          <section className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              File Information
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-zinc-400 dark:text-zinc-500">
                  File Name
                </dt>
                <dd className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">
                  {item.fileName}.md
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400 dark:text-zinc-500">
                  Source
                </dt>
                <dd className="text-sm text-zinc-700 dark:text-zinc-300">
                  {item.source === 'project'
                    ? 'Project (_claude-code/)'
                    : 'Global (~/.claude/)'}
                </dd>
              </div>
              {item.updatedAt && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-zinc-400 dark:text-zinc-500">
                    Last Updated
                  </dt>
                  <dd className="text-sm text-zinc-700 dark:text-zinc-300">
                    {new Date(item.updatedAt).toLocaleString()}
                  </dd>
                </div>
              )}
            </dl>
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(item.filePath);
            }}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg',
              'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
              'hover:bg-zinc-200 dark:hover:bg-zinc-700',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500'
            )}
          >
            Copy Path
          </button>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg',
              'bg-indigo-500 text-white',
              'hover:bg-indigo-600',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            )}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface CategoryDetailsProps {
  item: BaseItem;
}

function CategoryDetails({ item }: CategoryDetailsProps) {
  switch (item.category) {
    case 'commands':
      return <CommandDetails item={item as CommandItem} />;
    case 'agents':
      return <AgentDetails item={item as AgentItem} />;
    case 'rules':
      return <RuleDetails item={item as RuleItem} />;
    case 'skills':
      return <SkillDetails item={item as SkillItem} />;
    default:
      return null;
  }
}

function CommandDetails({ item }: { item: CommandItem }) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
          Slash Command
        </h3>
        <code className="inline-block px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg font-mono text-sm">
          {item.slashCommand}
        </code>
      </div>
      {item.args && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Arguments
          </h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{item.args}</p>
        </div>
      )}
      {item.usage && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Usage Example
          </h3>
          <pre className="text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg overflow-x-auto">
            {item.usage}
          </pre>
        </div>
      )}
    </section>
  );
}

function AgentDetails({ item }: { item: AgentItem }) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
          Model
        </h3>
        <Badge
          label={item.model}
          variant={
            item.model === 'opus'
              ? 'skills'
              : item.model === 'sonnet'
                ? 'commands'
                : item.model === 'haiku'
                  ? 'agents'
                  : 'default'
          }
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
          Available Tools
        </h3>
        <div className="flex flex-wrap gap-2">
          {item.tools.map((tool) => (
            <Badge key={tool} label={tool} variant="default" />
          ))}
        </div>
      </div>
      {item.role && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Role
          </h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{item.role}</p>
        </div>
      )}
    </section>
  );
}

function RuleDetails({ item }: { item: RuleItem }) {
  return (
    <section className="space-y-4">
      {item.priority && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Priority
          </h3>
          <Badge
            label={item.priority}
            variant={
              item.priority === 'critical'
                ? 'rules'
                : item.priority === 'high'
                  ? 'commands'
                  : item.priority === 'medium'
                    ? 'agents'
                    : 'default'
            }
          />
        </div>
      )}
      {item.appliesTo && item.appliesTo.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Applies To
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.appliesTo.map((scope) => (
              <Badge key={scope} label={scope} variant="default" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function SkillDetails({ item }: { item: SkillItem }) {
  return (
    <section className="space-y-4">
      {item.tags && item.tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} label={tag} variant="skills" />
            ))}
          </div>
        </div>
      )}
      {item.usage && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Usage
          </h3>
          <pre className="text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg overflow-x-auto">
            {item.usage}
          </pre>
        </div>
      )}
    </section>
  );
}
