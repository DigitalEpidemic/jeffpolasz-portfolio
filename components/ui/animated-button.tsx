import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useState } from 'react';

interface AnimatedButtonProps extends ButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export function AnimatedButton({
  icon,
  children,
  className,
  href,
  target,
  rel,
  ...props
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonContent = (
    <>
      <span
        className={cn(
          'mr-2 transition-transform duration-200',
          isHovered && 'scale-125'
        )}
      >
        {icon}
      </span>
      {children}
    </>
  );

  // If href is provided, render as an anchor tag
  if (href) {
    return (
      <Button
        className={cn(className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        asChild
        {...props}
      >
        <Link
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : rel}
        >
          {buttonContent}
        </Link>
      </Button>
    );
  }

  // Otherwise render as a normal button
  return (
    <Button
      className={cn(className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {buttonContent}
    </Button>
  );
}
