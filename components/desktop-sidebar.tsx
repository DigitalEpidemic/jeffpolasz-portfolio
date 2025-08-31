'use client';

import { SITE_OWNER } from '@/data/constants';
import {
  communityItems,
  feedItems,
  resourceItems,
  TabItem,
} from '@/data/navigation';
import {
  slideUpVariants,
  staggerContainer,
  fadeInVariants,
  staggerItem,
} from '@/lib/animations';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DesktopSidebarProps {
  activeFilter: string;
  onFilterChange?: (filter: string) => void;
  redirectRecentsToHome?: boolean;
  recentItems?: TabItem[];
  className?: string;
}

export function DesktopSidebar({
  activeFilter,
  onFilterChange,
  redirectRecentsToHome = false,
  recentItems = communityItems,
  className,
}: DesktopSidebarProps) {
  const pathname = usePathname();

  const handleTabClick = (value: string, event: React.MouseEvent) => {
    if (onFilterChange) {
      event.preventDefault();
      onFilterChange(value);
    }
  };

  return (
    <motion.aside
      className={cn(
        'hidden lg:block [@media(max-height:900px)]:hidden bg-card border-r border-border sticky top-12 w-[270px] md:w-[230px] lg:w-[250px] xl:w-[270px] h-[calc(100vh-48px)] overflow-y-auto',
        className
      )}
      variants={slideUpVariants}
      initial="hidden"
      animate="visible"
      custom={0.3}
    >
      <motion.div
        className="h-full py-4 flex flex-col"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="flex-1">
          {/* Feeds Section */}
          <motion.div className="px-6 pb-2" variants={fadeInVariants}>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Feeds
            </h2>
          </motion.div>
          <motion.nav className="space-y-0.5 mb-4" variants={staggerContainer}>
            {feedItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div key={index} variants={staggerItem}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center px-6 py-2 text-foreground hover:bg-muted dark:hover:bg-secondary/70 transition-colors',
                      isActive && 'text-primary font-semibold'
                    )}
                  >
                    <span
                      className={cn(
                        'mr-3',
                        isActive ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Recent Section */}
          <div className="mt-2 border-t border-border pt-4">
            <motion.div
              className="px-6 pb-2 flex items-center justify-between"
              variants={fadeInVariants}
            >
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Recent
              </h2>
            </motion.div>
            <motion.nav
              className="space-y-0.5 mb-4"
              variants={staggerContainer}
            >
              {recentItems.map((item, index) => {
                const isActive = activeFilter === item.value;

                if (redirectRecentsToHome) {
                  return (
                    <motion.div key={index} variants={staggerItem}>
                      <Link
                        href={`/?filter=${item.value}`}
                        className={cn(
                          'flex items-center px-6 py-2 text-foreground hover:bg-muted dark:hover:bg-secondary/70 transition-colors',
                          isActive && 'bg-border dark:bg-white/20'
                        )}
                      >
                        <span className="mr-3 text-foreground">
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={index} variants={staggerItem}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center px-6 py-2 text-foreground hover:bg-muted dark:hover:bg-secondary/70 transition-colors',
                        isActive && 'bg-border dark:bg-white/20'
                      )}
                      onClick={(e) => handleTabClick(item.value, e)}
                    >
                      <span className="mr-3 text-foreground">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </div>

          {/* Resources Section */}
          <div className="mt-2 border-t border-border pt-4">
            <motion.div className="px-6 pb-2" variants={fadeInVariants}>
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Resources
              </h2>
            </motion.div>
            <motion.nav
              className="space-y-0.5 mb-4"
              variants={staggerContainer}
            >
              {resourceItems.map((item, index) => {
                if (item.onClick) {
                  return (
                    <motion.div key={index} variants={staggerItem}>
                      <button
                        onClick={item.onClick}
                        className="flex items-center px-6 py-2 w-full text-left text-foreground hover:bg-muted dark:hover:bg-secondary/70 transition-colors"
                      >
                        <span className="mr-3 text-foreground">
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </button>
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={index} variants={staggerItem}>
                    <Link
                      href={item.href}
                      className="flex items-center px-6 py-2 text-foreground hover:bg-muted dark:hover:bg-secondary/70 transition-colors"
                    >
                      <span className="mr-3 text-foreground">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </div>
        </div>

        {/* Footer Text - Moved to bottom with mt-auto */}
        <motion.div
          className="px-6 pt-4 pb-2 text-muted-foreground text-xs space-y-2 mt-auto border-t border-border"
          variants={fadeInVariants}
        >
          <p>
            © {new Date().getFullYear()} {SITE_OWNER}. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
}
