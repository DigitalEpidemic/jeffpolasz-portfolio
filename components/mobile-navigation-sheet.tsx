'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LAYOUT_DIMENSIONS, SITE_OWNER } from '@/data/constants';
import {
  communityItems,
  feedItems,
  resourceItems,
  resumeItems,
} from '@/data/navigation';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavigationSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activeFilter: string;
  onFilterChange?: (filter: string) => void;
  isResumePage?: boolean;
  redirectRecentsToHome?: boolean;
}

export function MobileNavigationSheet({
  isOpen,
  onOpenChange,
  activeFilter,
  onFilterChange,
  isResumePage = false,
  redirectRecentsToHome = false,
}: MobileNavigationSheetProps) {
  const pathname = usePathname();

  const handleMobileTabClick = (value: string) => {
    if (redirectRecentsToHome) {
      onOpenChange(false);
    } else if (onFilterChange) {
      onFilterChange(value);
      onOpenChange(false);
    }
  };

  const mobileTabItems = isResumePage ? resumeItems : communityItems;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground mr-1 !h-8 !w-8 sm:!h-9 sm:!w-9 !inline-flex !items-center !justify-center"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 bg-card flex flex-col"
        style={{ width: LAYOUT_DIMENSIONS.MOBILE_SHEET_WIDTH }}
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Navigate between different sections and feeds
        </SheetDescription>
        <nav className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Feeds Section */}
              <div className="pb-2">
                <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Feeds
                </h2>
              </div>
              <div className="space-y-0.5">
                {feedItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className={cn(
                        'justify-start w-full',
                        isActive
                          ? 'text-primary font-semibold'
                          : 'text-foreground'
                      )}
                      asChild
                    >
                      <Link
                        href={item.href}
                        onClick={() => onOpenChange(false)}
                      >
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
                    </Button>
                  );
                })}
              </div>

              {/* Recent Section */}
              <div className="pt-4 pb-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Recent
                  </h2>
                </div>
              </div>
              <div className="space-y-0.5">
                {mobileTabItems.map((item, index) => {
                  const isActive = activeFilter === item.value;

                  if (redirectRecentsToHome) {
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
                        <Link
                          href={`/?filter=${item.value}`}
                          onClick={() => onOpenChange(false)}
                        >
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
                        'justify-start text-foreground w-full',
                        isActive && 'bg-border dark:bg-white/20'
                      )}
                      onClick={() => handleMobileTabClick(item.value)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Button>
                  );
                })}
              </div>

              {/* Resources Section */}
              <div className="pt-4 pb-2 border-t border-border">
                <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Resources
                </h2>
              </div>
              <div className="space-y-0.5">
                {resourceItems.map((item, index) => {
                  if (item.onClick) {
                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        className="justify-start text-foreground w-full"
                        onClick={() => {
                          item.onClick?.();
                          onOpenChange(false);
                        }}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                      </Button>
                    );
                  }

                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className={cn(
                        'justify-start w-full',
                        isActive
                          ? 'text-primary font-semibold'
                          : 'text-foreground'
                      )}
                      asChild
                    >
                      <Link href={item.href}>
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
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Copyright Section - fixed at bottom */}
          <div className="p-4 pt-2 text-muted-foreground text-xs border-t border-border bg-card">
            <p>
              © {new Date().getFullYear()} {SITE_OWNER}. All rights reserved.
            </p>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
