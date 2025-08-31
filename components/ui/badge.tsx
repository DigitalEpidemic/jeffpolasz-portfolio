import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
  const classes =
    'bg-border hover:bg-foreground/20 dark:bg-secondary dark:hover:bg-white/20 text-xs px-2 py-0.5 rounded-full text-foreground transition-colors cursor-pointer';

  return <span className={classes}>{children}</span>;
}
