'use client';

import { BREAKPOINTS } from '@/data/constants';
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Listen for changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}

// Predefined breakpoint hooks for common use cases
export function useIsMobile(): boolean {
  // Matches original logic: lg:hidden [@media(max-height:900px)]:block
  // Mobile shows when: screen width < 1024px OR screen height < 900px
  const isSmallScreen = useMediaQuery(
    `(max-width: ${BREAKPOINTS.MOBILE_MAX}px)`
  );
  const isShortScreen = useMediaQuery(
    `(max-height: ${BREAKPOINTS.HEIGHT_THRESHOLD - 1}px)`
  );

  return isSmallScreen || isShortScreen;
}

export function useIsDesktop(): boolean {
  // Matches original logic: hidden lg:block [@media(max-height:900px)]:hidden
  // Desktop shows when: screen width >= 1024px AND screen height >= 900px
  const isLargeScreen = useMediaQuery(
    `(min-width: ${BREAKPOINTS.DESKTOP_MIN}px)`
  );
  const isTallScreen = useMediaQuery(
    `(min-height: ${BREAKPOINTS.HEIGHT_THRESHOLD}px)`
  );

  return isLargeScreen && isTallScreen;
}

export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.TABLET_MIN}px) and (max-width: ${BREAKPOINTS.TABLET_MAX}px)`
  );
}
