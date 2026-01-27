import { cn } from '../../lib/cn';

export type BadgeVariant =
  | 'skills'
  | 'commands'
  | 'agents'
  | 'rules'
  | 'project'
  | 'global'
  | 'default';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  skills: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  commands: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  agents: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  rules: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  project: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  global: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
  default: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
};

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full',
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
