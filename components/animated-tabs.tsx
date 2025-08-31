'use client';

import { Tabs, TabsList } from '@/components/ui/tabs';
import { ANIMATION_DURATIONS } from '@/data/constants';
import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import * as React from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Custom TabsTrigger without motion wrapper to prevent text disappearing
const CustomTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    onTabStart?: () => void;
  }
>(({ className, onTabStart, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground dark:data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground data-[state=inactive]:hover:bg-secondary/30 active:scale-95 relative z-20 w-full cursor-pointer',
      className
    )}
    onMouseDown={() => {
      onTabStart?.();
    }}
    onTouchStart={() => {
      onTabStart?.();
    }}
    {...props}
  />
));
CustomTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface AnimatedTabsProps
  extends Omit<
    React.ComponentProps<typeof Tabs>,
    'whileHover' | 'initial' | 'animate' | 'variants' | 'transition'
  > {
  tabItems: {
    value: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  onValueChange?: (value: string) => void;
  value?: string;
  fullWidth?: boolean;
}

export function AnimatedTabs({
  defaultValue,
  value,
  tabItems,
  onValueChange,
  className,
  fullWidth = false,
  ...props
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(value || defaultValue);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    height: 0,
  });
  const [animationKey, setAnimationKey] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Update activeTab when value prop changes
  useEffect(() => {
    if (value !== undefined && value !== activeTab) {
      setActiveTab(value);
    }
  }, [value, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setAnimationKey((prev) => prev + 1); // Force new animation on every change
    if (onValueChange) {
      onValueChange(value);
    }
  };

  useLayoutEffect(() => {
    const updateIndicator = () => {
      if (!tabsRef.current) return;

      const tabsList = tabsRef.current.querySelector('[role="tablist"]');
      if (!tabsList) return;

      const activeTabElement = tabsList.querySelector(`[data-state="active"]`);
      if (!activeTabElement) return;

      const { width, left, height } = activeTabElement.getBoundingClientRect();
      const tabsListRect = tabsList.getBoundingClientRect();

      setIndicatorStyle({
        width,
        left: left - tabsListRect.left,
        height,
      });
    };

    // Small delay to ensure layout is complete, especially important on mobile
    const timeoutId = setTimeout(updateIndicator, 0);

    // Use ResizeObserver for efficient layout change detection
    const resizeObserver = new ResizeObserver(() => {
      // Add small delay for ResizeObserver too
      setTimeout(updateIndicator, 0);
    });
    const tabsList = tabsRef.current?.querySelector('[role="tablist"]');
    if (tabsList) {
      resizeObserver.observe(tabsList);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [activeTab]);

  // Determine grid columns based on number of tabs and fullWidth prop
  const gridColumns = fullWidth
    ? tabItems.length === 2
      ? 'grid-cols-2'
      : tabItems.length === 4
        ? 'grid-cols-4'
        : 'grid-cols-3'
    : 'grid-cols-3';

  return (
    <div ref={tabsRef} className={cn('relative', className)}>
      <Tabs
        defaultValue={defaultValue}
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
        {...props}
      >
        <TabsList
          className={cn(
            'relative grid w-full bg-transparent gap-2',
            gridColumns
          )}
        >
          <motion.div
            key={animationKey}
            className="absolute bg-primary rounded-full shadow-sm z-10"
            initial={{
              width: indicatorStyle.width,
              height: indicatorStyle.height,
              x: indicatorStyle.left,
            }}
            animate={{
              width: indicatorStyle.width,
              height: indicatorStyle.height,
              x: indicatorStyle.left,
            }}
            transition={{
              type: 'tween',
              duration: ANIMATION_DURATIONS.FAST,
              ease: 'easeOut',
            }}
          />
          {tabItems.map((item) => (
            <CustomTabsTrigger
              key={item.value}
              value={item.value}
              className="justify-center"
              onTabStart={() => handleTabChange(item.value)}
            >
              {item.icon && (
                <span className="inline-block mr-2">{item.icon}</span>
              )}
              {item.label}
            </CustomTabsTrigger>
          ))}
        </TabsList>
        {props.children}
      </Tabs>
    </div>
  );
}
