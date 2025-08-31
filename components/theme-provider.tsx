'use client';

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return null on first render when client-side hydration hasn't completed
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
