'use client';

import { TabItem } from '@/data/navigation';
import Navigation from './navigation';

interface NavigationLayoutProps {
  children: React.ReactNode;
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
}

export function NavigationLayout({
  children,
  activeFilter,
  onFilterChange,
  filterCategories,
  onSearch,
  searchQuery,
  isResumePage,
  searchPlaceholder,
  searchDisabled,
  redirectRecentsToHome,
  recentItems,
}: NavigationLayoutProps) {
  return (
    <main className="min-h-screen h-screen bg-background flex flex-col">
      {/* Header only */}
      <Navigation
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        filterCategories={filterCategories}
        onSearch={onSearch}
        searchQuery={searchQuery}
        isResumePage={isResumePage}
        searchPlaceholder={searchPlaceholder}
        searchDisabled={searchDisabled}
        redirectRecentsToHome={redirectRecentsToHome}
        recentItems={recentItems}
        hideSidebar={true}
      />

      {/* Content area with sidebar */}
      <div className="flex flex-1 pt-12 bg-background">
        {/* Side Navigation - Desktop only */}
        <Navigation
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          filterCategories={filterCategories}
          onSearch={onSearch}
          searchQuery={searchQuery}
          isResumePage={isResumePage}
          searchPlaceholder={searchPlaceholder}
          searchDisabled={false}
          redirectRecentsToHome={redirectRecentsToHome}
          recentItems={recentItems}
          hideHeader={true}
          className="hidden lg:block [@media(max-height:900px)]:hidden" // Only show on desktop with sufficient height
        />

        {/* Main content */}
        <div className="flex-1 bg-background">{children}</div>
      </div>
    </main>
  );
}
