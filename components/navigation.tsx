'use client';

import {
  LAYOUT_DIMENSIONS,
  ProjectType,
  SITE_DISPLAY_NAME,
} from '@/data/constants';
import { communityItems, TabItem } from '@/data/navigation';
import { useIsMobile } from '@/hooks/use-media-query';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { DesktopSidebar } from './desktop-sidebar';
import { MobileNavigationSheet } from './mobile-navigation-sheet';
import { SearchBar } from './search-bar';
import { ThemeToggle } from './theme-toggle';

interface NavigationProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  filterCategories?: {
    value: string;
    label: string;
  }[];
  onSearch?: (query: string) => void;
  searchQuery?: string;
  isResumePage?: boolean;
  searchPlaceholder?: string;
  searchDisabled?: boolean;
  redirectRecentsToHome?: boolean;
  recentItems?: TabItem[];
  className?: string;
  hideHeader?: boolean;
  hideSidebar?: boolean;
}

export default function Navigation({
  activeFilter = ProjectType.ALL,
  onFilterChange,
  filterCategories = [],
  onSearch,
  searchQuery = '',
  isResumePage = false,
  searchPlaceholder = 'Search...',
  searchDisabled = false,
  redirectRecentsToHome = false,
  recentItems = communityItems,
  className,
  hideHeader = false,
  hideSidebar = false,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      {/* Header - Fixed at the top */}
      {!hideHeader && (
        <header
          className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border w-full"
          style={{ height: LAYOUT_DIMENSIONS.HEADER_HEIGHT }}
        >
          <div className="flex items-center h-full py-4 px-2 gap-2 sm:gap-4">
            {isMobile && (
              <MobileNavigationSheet
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                activeFilter={activeFilter}
                onFilterChange={onFilterChange}
                isResumePage={isResumePage}
                redirectRecentsToHome={redirectRecentsToHome}
              />
            )}

            <Link href="/" className="flex items-center shrink-0">
              <motion.div
                className="flex items-center gap-2"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-card to-gray-500 dark:from-card dark:to-gray-700 p-0.5 flex items-center justify-center"
                  variants={staggerItem}
                >
                  <Image
                    src="https://styles.redditmedia.com/t5_b5p6r/styles/profileIcon_snoo0813a449-4beb-4242-9d95-e8d3e4d9802b-headshot.png?width=128&height=128&frame=1&auto=webp&crop=&s=afd655c1db77770a2113f2a33059bd055bb00cb8"
                    alt="Jeffrey Polasz Profile"
                    className="h-full w-full rounded-full object-cover"
                    width={32}
                    height={32}
                  />
                </motion.div>
                <motion.span
                  className="text-primary dark:text-white text-2xl font-bold hidden sm:block"
                  variants={staggerItem}
                >
                  {SITE_DISPLAY_NAME}
                </motion.span>
              </motion.div>
            </Link>

            <SearchBar
              activeFilter={activeFilter}
              onFilterChange={onFilterChange}
              filterCategories={filterCategories}
              onSearch={onSearch}
              searchQuery={searchQuery}
              searchPlaceholder={searchPlaceholder}
              searchDisabled={searchDisabled}
            />

            <ThemeToggle className="shrink-0" />
          </div>
        </header>
      )}

      {/* Side Navigation - Desktop only */}
      {!hideSidebar && (
        <DesktopSidebar
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          redirectRecentsToHome={redirectRecentsToHome}
          recentItems={recentItems}
          className={className}
        />
      )}
    </>
  );
}
