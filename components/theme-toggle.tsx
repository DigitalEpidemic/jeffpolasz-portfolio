'use client';

import { Button } from '@/components/ui/button';
import { ANIMATION_DURATIONS } from '@/data/constants';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for client-side render
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={cn('relative', className)}
    >
      <div className="relative h-5 w-5 overflow-hidden">
        {mounted && (
          <>
            {/* Only show the Sun in light mode */}
            {resolvedTheme === 'light' && (
              <motion.div
                className="absolute"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{
                  duration: ANIMATION_DURATIONS.NORMAL,
                  ease: 'easeInOut',
                }}
              >
                <Sun className="h-5 w-5" />
              </motion.div>
            )}

            {/* Only show the Moon in dark mode */}
            {resolvedTheme === 'dark' && (
              <motion.div
                className="absolute"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{
                  duration: ANIMATION_DURATIONS.NORMAL,
                  ease: 'easeInOut',
                }}
              >
                <Moon className="h-5 w-5" />
              </motion.div>
            )}
          </>
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
