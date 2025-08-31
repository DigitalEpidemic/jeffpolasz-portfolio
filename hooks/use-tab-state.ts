import { useCallback, useEffect, useState } from 'react';

interface UseTabStateOptions<T> {
  initialValue: T;
  onURLFilterChange?: (filter: string) => boolean; // Return true if filter is valid for this enum
}

export function useTabState<T extends string>({
  initialValue,
  onURLFilterChange,
}: UseTabStateOptions<T>) {
  const [activeTab, setActiveTab] = useState<T>(initialValue);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Update URL when activeTab changes
  const updateURL = useCallback(
    (value: T) => {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (value === initialValue) {
          url.searchParams.delete('filter');
        } else {
          url.searchParams.set('filter', value);
        }

        const newURL = url.pathname + (url.search || '');
        window.history.replaceState({}, '', newURL);
      }
    },
    [initialValue]
  );

  // Check for URL parameter and validate it on initial load and URL changes
  useEffect(() => {
    if (onURLFilterChange && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const filterParam = urlParams.get('filter');

      if (filterParam && onURLFilterChange(filterParam)) {
        setActiveTab(filterParam as T);
      } else if (!filterParam) {
        setActiveTab(initialValue);
      }
    }

    // Listen for popstate events (back/forward buttons)
    const handlePopState = () => {
      if (onURLFilterChange && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');

        if (filterParam && onURLFilterChange(filterParam)) {
          setActiveTab(filterParam as T);
        } else {
          setActiveTab(initialValue);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [onURLFilterChange, initialValue]);

  const handleTabChange = useCallback(
    (value: string) => {
      setIsInitialLoad(false);
      setActiveTab(value as T);
      updateURL(value as T);
    },
    [updateURL]
  );

  const handleValueChange = useCallback(
    (value: string) => {
      setIsInitialLoad(false);
      setActiveTab(value as T);
      updateURL(value as T);
    },
    [updateURL]
  );

  return {
    activeTab,
    isInitialLoad,
    setActiveTab,
    setIsInitialLoad,
    handleTabChange,
    handleValueChange,
  };
}
