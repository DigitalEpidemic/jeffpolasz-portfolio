'use client';

import { Button } from '@/components/ui/button';
import { TabItem } from '@/data/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavigationSectionProps {
  title: string;
  items: TabItem[];
  activeFilter?: string;
  pathname?: string;
  onItemClick?: (value: string) => void;
  redirectRecentsToHome?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

export function NavigationSection({
  title,
  items,
  activeFilter,
  pathname,
  onItemClick,
  redirectRecentsToHome = false,
  isMobile = false,
  onClose,
}: NavigationSectionProps) {
  const handleClick = (item: TabItem) => {
    if (item.onClick) {
      item.onClick();
      onClose?.();
      return;
    }

    if (onItemClick) {
      onItemClick(item.value);
    }
  };

  const renderMobileItem = (item: TabItem, index: number) => {
    const isActive = activeFilter === item.value || pathname === item.href;

    if (item.onClick) {
      return (
        <Button
          key={index}
          variant="ghost"
          className="justify-start text-foreground w-full"
          onClick={() => handleClick(item)}
        >
          <span className="mr-3">{item.icon}</span>
          {item.label}
        </Button>
      );
    }

    if (redirectRecentsToHome && item.value) {
      return (
        <Button
          key={index}
          variant="ghost"
          className={cn(
            'justify-start text-foreground w-full',
            isActive && 'bg-border dark:bg-white/20'
          )}
          asChild
        >
          <Link href={`/?filter=${item.value}`} onClick={onClose}>
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        </Button>
      );
    }

    return (
      <Button
        key={index}
        variant="ghost"
        className={cn(
          'justify-start w-full',
          isActive ? 'text-primary font-semibold' : 'text-foreground',
          activeFilter === item.value && 'bg-border dark:bg-white/20'
        )}
        asChild={!!item.href}
        onClick={!item.href ? () => handleClick(item) : undefined}
      >
        {item.href ? (
          <Link href={item.href} onClick={onClose}>
            <span
              className={cn(
                'mr-3',
                isActive ? 'text-primary' : 'text-foreground'
              )}
            >
              {item.icon}
            </span>
            {item.label}
          </Link>
        ) : (
          <>
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </>
        )}
      </Button>
    );
  };

  const renderDesktopItem = (item: TabItem, index: number) => {
    const isActive = activeFilter === item.value || pathname === item.href;

    if (item.onClick) {
      return (
        <button
          key={index}
          onClick={() => handleClick(item)}
          className="flex items-center px-6 py-2 w-full text-left text-foreground hover:bg-muted dark:hover:bg-secondary/70 transition-colors"
        >
          <span className="mr-3 text-foreground">{item.icon}</span>
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      );
    }

    if (redirectRecentsToHome && item.value) {
      return (
        <Link
          key={index}
          href={`/?filter=${item.value}`}
          className={cn(
            'flex items-center px-6 py-2 text-foreground hover:bg-muted dark:hover:bg-secondary/70 transition-colors',
            isActive && 'bg-border dark:bg-white/20'
          )}
        >
          <span className="mr-3 text-foreground">{item.icon}</span>
          <span className="text-sm font-medium">{item.label}</span>
        </Link>
      );
    }

    return (
      <Link
        key={index}
        href={item.href}
        className={cn(
          'flex items-center px-6 py-2 text-foreground hover:bg-muted dark:hover:bg-secondary/70 transition-colors',
          isActive &&
            (pathname === item.href
              ? 'text-primary font-semibold'
              : 'bg-border dark:bg-white/20')
        )}
        onClick={
          item.value && onItemClick
            ? (e) => {
                e.preventDefault();
                onItemClick(item.value);
              }
            : undefined
        }
      >
        <span
          className={cn(
            'mr-3',
            isActive && pathname === item.href
              ? 'text-primary'
              : 'text-foreground'
          )}
        >
          {item.icon}
        </span>
        <span className="text-sm font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      <div
        className={cn(
          isMobile ? 'pb-2' : 'px-6 pb-2',
          !isMobile && items !== items && 'pt-4 border-t border-border'
        )}
      >
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <nav
        className={cn('space-y-0.5', !isMobile && 'mb-4')}
        aria-label={title}
      >
        {items.map((item, index) =>
          isMobile
            ? renderMobileItem(item, index)
            : renderDesktopItem(item, index)
        )}
      </nav>
    </>
  );
}
