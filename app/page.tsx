'use client';

import { AnimatedTabs } from '@/components/animated-tabs';
import { NavigationLayout } from '@/components/navigation-layout';
import PostCard from '@/components/post-card';
import ProfileHeader from '@/components/profile-header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import {
  POST_ANIMATIONS,
  PROJECT_TAB_ITEMS,
  ProjectType,
  ProjectTypeLabels,
  ProjectTypes,
  SITE_OWNER,
  SITE_OWNER_USERNAME,
} from '@/data/constants';
import { communityItems } from '@/data/navigation';
import { POSTS } from '@/data/posts';
import { useIsDesktop, useIsMobile } from '@/hooks/use-media-query';
import { useTabState } from '@/hooks/use-tab-state';
import { getIconComponent } from '@/lib/icon-utils';
import { sortPosts, type SortOption } from '@/lib/post-sorting';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('best');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();

  const { activeTab, isInitialLoad, handleTabChange } =
    useTabState<ProjectType>({
      initialValue: ProjectType.ALL,
      onURLFilterChange: (filter) =>
        ProjectTypes.includes(filter as ProjectType),
    });

  // Debounce search query
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const filteredPosts = sortPosts(
    POSTS.filter(
      (post) => activeTab === ProjectType.ALL || post.category === activeTab
    ).filter((post) => {
      if (!debouncedSearchQuery) return true;

      // Case insensitive search across title, content, tags, and technologies
      const searchLower = debouncedSearchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        ProjectTypeLabels[post.category].toLowerCase().includes(searchLower) ||
        post.username.toLowerCase().includes(searchLower) ||
        (post.tags &&
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower))) ||
        (post.technologies &&
          post.technologies.some((tech) =>
            tech.toLowerCase().includes(searchLower)
          ))
      );
    }),
    sortBy
  );

  const tabItems = PROJECT_TAB_ITEMS.map((item) => ({
    ...item,
    icon: getIconComponent(item.icon),
  }));

  const handleFilterChange = handleTabChange;

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <NavigationLayout
      activeFilter={activeTab !== ProjectType.ALL ? activeTab : undefined}
      onFilterChange={handleFilterChange}
      filterCategories={tabItems}
      onSearch={handleSearch}
      searchQuery={searchQuery}
      recentItems={communityItems}
    >
      <div
        className="
          max-w-[700px]
          sm:max-w-[500px] 
          md:max-w-none md:w-[80%]
          lg:max-w-none lg:w-[90%]
          xl:max-w-[900px]
          2xl:max-w-[1000px]
          mx-auto px-4 flex gap-4 py-4 md:pb-4 pb-16 overflow-x-hidden
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        "
      >
        <div className="flex-1">
          {isMobile && (
            <div className="mb-4">
              <h1 className="sr-only">Jeffrey Polasz - Portfolio</h1>
              <ProfileHeader
                displayName={SITE_OWNER}
                username={SITE_OWNER_USERNAME}
                description={
                  "Full stack developer of web apps, software, game worlds, and whatever's in the backlog"
                }
              />
            </div>
          )}

          {/* Sort Dropdown - Reddit Style */}
          <div className="flex items-center gap-2 mb-3 px-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Sort by
            </span>
            <Select
              value={sortBy}
              onValueChange={(value: SortOption) => setSortBy(value)}
            >
              <SelectTrigger className="w-auto h-7 bg-transparent border-0 text-sm font-medium p-0 focus:ring-0 focus:ring-offset-0 shadow-none gap-1 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="min-w-[100px]">
                <SelectItem value="best" className="text-sm">
                  <div className="flex items-center gap-2">Best</div>
                </SelectItem>
                <SelectItem value="new" className="text-sm">
                  <div className="flex items-center gap-2">New</div>
                </SelectItem>
                <SelectItem value="demos" className="text-sm">
                  <div className="flex items-center gap-2">Demos</div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-card p-1 border border-border rounded">
            <AnimatedTabs
              defaultValue={activeTab}
              value={activeTab}
              tabItems={tabItems}
              onValueChange={handleTabChange}
              className="mb-0"
            >
              {tabItems.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="mt-0"
                />
              ))}
            </AnimatedTabs>
          </div>
          <div className="space-y-4 mt-4">
            {filteredPosts.length > 0 ? (
              <div className="space-y-4">
                {filteredPosts.map((post) => {
                  const slideDirection = Math.random() > 0.5 ? -50 : 50;
                  const shouldUseInitialAnimation =
                    isInitialLoad && !debouncedSearchQuery;
                  return (
                    <motion.div
                      key={`${post.slug}-${activeTab}-${debouncedSearchQuery}-${sortBy}`}
                      initial={
                        shouldUseInitialAnimation
                          ? POST_ANIMATIONS.INITIAL_LOAD.initial
                          : POST_ANIMATIONS.FILTER_CHANGE.getInitial(
                              slideDirection
                            )
                      }
                      animate={
                        shouldUseInitialAnimation
                          ? POST_ANIMATIONS.INITIAL_LOAD.animate
                          : POST_ANIMATIONS.FILTER_CHANGE.animate
                      }
                      transition={POST_ANIMATIONS.TRANSITION}
                    >
                      <PostCard
                        {...post}
                        shouldAnimate={shouldUseInitialAnimation}
                      />
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div
                initial={POST_ANIMATIONS.NO_RESULTS.initial}
                animate={POST_ANIMATIONS.NO_RESULTS.animate}
                transition={POST_ANIMATIONS.NO_RESULTS.transition}
                className="text-center py-8 text-muted-foreground"
              >
                No posts match your search criteria
              </motion.div>
            )}
          </div>
        </div>
        {isDesktop && (
          <div className="w-[312px] xl:w-[312px] lg:w-[250px] md:w-[220px]">
            <div className="fixed w-[312px] xl:w-[312px] lg:w-[250px] md:w-[220px]">
              <h1 className="sr-only">Jeffrey Polasz - Portfolio</h1>
              <ProfileHeader
                displayName={SITE_OWNER}
                username={SITE_OWNER_USERNAME}
                description="Full Stack Developer of Web Apps, Software, Game Worlds, and Whatever's in the Backlog"
              />
            </div>
          </div>
        )}
      </div>
    </NavigationLayout>
  );
}
