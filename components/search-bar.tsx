'use client';

import { Input } from '@/components/ui/input';
import { ProjectType } from '@/data/constants';
import { ANIMATION_PRESETS } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  filterCategories?: {
    value: string;
    label: string;
  }[];
  onSearch?: (query: string) => void;
  searchQuery?: string;
  searchPlaceholder?: string;
  searchDisabled?: boolean;
}

export function SearchBar({
  activeFilter = ProjectType.ALL,
  onFilterChange,
  filterCategories = [],
  onSearch,
  searchQuery = '',
  searchPlaceholder = 'Search...',
  searchDisabled = false,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFilterClick = (value: string) => {
    if (onFilterChange && !searchDisabled) {
      onFilterChange(value);
    }
  };

  const handleRemoveFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFilterChange && !searchDisabled) {
      onFilterChange(ProjectType.ALL);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const getActiveCategory = () => {
    return filterCategories.find((cat) => cat.value === activeFilter);
  };

  return (
    <div className="flex-1 min-w-0">
      <div
        className={cn(
          'relative flex items-center max-w-full sm:max-w-[800px] mx-auto bg-secondary border border-border rounded-full h-8 sm:h-9 px-2 sm:px-3',
          isFocused && 'border-foreground',
          searchDisabled && 'border-dashed'
        )}
      >
        {searchDisabled ? (
          <div className="relative mr-2 shrink-0">
            <Search className="h-4 w-4 text-muted-foreground/50" />
            <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-muted-foreground/50 transform translate-y-[-50%]"></div>
          </div>
        ) : (
          <Search className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
        )}

        <div className="flex items-center flex-1 gap-2 max-w-full overflow-x-auto">
          <AnimatePresence>
            {activeFilter && activeFilter !== ProjectType.ALL && (
              <motion.div
                key="filter-badge"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={ANIMATION_PRESETS.quickTransition}
                className={cn(
                  'flex items-center bg-primary text-foreground dark:text-primary-foreground rounded-full h-6 px-2 text-xs font-medium',
                  !searchDisabled && 'cursor-pointer'
                )}
                onClick={() =>
                  !searchDisabled && handleFilterClick(activeFilter)
                }
              >
                <span className="whitespace-nowrap">
                  {getActiveCategory()?.label}
                </span>
                {!searchDisabled && (
                  <button
                    className="ml-1 hover:text-primary-foreground/90 dark:hover:text-black"
                    onClick={handleRemoveFilter}
                    aria-label="Remove filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative flex-1">
            <Input
              placeholder={
                searchDisabled ? 'Search disabled' : searchPlaceholder
              }
              className={cn(
                'border-0 bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-6 p-0 text-sm text-foreground placeholder:text-muted-foreground text-base md:text-sm w-full',
                !searchDisabled && 'pr-6',
                searchDisabled &&
                  'opacity-60 bg-muted/30 placeholder:line-through'
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleSearch}
              value={searchQuery}
              style={{ fontSize: '16px' }}
              disabled={searchDisabled}
              role="searchbox"
              aria-label="Search projects"
            />
            {searchQuery && !searchDisabled && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => onSearch && onSearch('')}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
