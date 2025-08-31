import { cn } from '@/lib/utils';
import React from 'react';

interface VisuallyHiddenProps {
  children: React.ReactNode;
  className?: string;
}

export function VisuallyHidden({
  children,
  className,
  ...props
}: VisuallyHiddenProps & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0',
        'clip-[rect(0_0_0_0)] -m-px',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
