'use client';

import { Badge } from '@/components/ui/badge';
import {
  ANIMATION_DELAYS,
  ANIMATION_DURATIONS,
  ProjectType,
} from '@/data/constants';
import { Post } from '@/data/posts';
import { formatTimeAgo } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProjectSidebarProps {
  post: Post;
  isMobile?: boolean;
}

export function ProjectSidebar({
  post,
  isMobile = false,
}: ProjectSidebarProps) {
  // Since we're conditionally rendering, remove the CSS visibility classes
  const containerClass = isMobile
    ? 'space-y-4 mb-4 mt-4'
    : 'w-[312px] xl:w-[312px] lg:w-[250px] md:w-[220px]';

  const fixedClass = isMobile
    ? ''
    : 'fixed top-[4rem] max-h-[calc(100vh-5rem)] w-[312px] xl:w-[312px] lg:w-[250px] md:w-[220px]';

  const textSizeClasses = isMobile
    ? {
        heading: 'text-xs',
        content: 'text-sm',
        spacing: 'mb-2 space-y-1',
        padding: 'p-3',
        margin: 'mb-4 mt-2',
      }
    : {
        heading: 'text-xs md:text-[10px] lg:text-[10px] xl:text-xs',
        content: 'text-sm md:text-xs lg:text-xs xl:text-sm',
        spacing:
          'mb-2 md:mb-1 lg:mb-1 xl:mb-2 space-y-1 md:space-y-0.5 lg:space-y-0.5 xl:space-y-1',
        padding: 'p-3 md:p-2 lg:p-2 xl:p-3',
        margin: 'mb-4 md:mb-2 lg:mb-2 xl:mb-4 mt-2 md:mt-1 lg:mt-1 xl:mt-2',
      };

  return (
    <div className={containerClass}>
      <motion.div
        className={fixedClass}
        initial={{ overflow: 'hidden' }}
        animate={{ overflow: 'visible' }}
        transition={{ delay: 1.0, duration: 0 }}
        onAnimationComplete={() => {
          // Re-enable scrolling after animations complete
          if (!isMobile) {
            const element = document.querySelector(
              '[data-sidebar-container]'
            ) as HTMLElement;
            if (element) {
              element.style.overflowY = 'auto';
            }
          }
        }}
        data-sidebar-container
      >
        {/* Project info card */}
        <motion.div
          className="bg-card border border-border rounded-md overflow-hidden mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: ANIMATION_DURATIONS.SLOW,
            ease: 'easeOut',
          }}
        >
          <motion.div
            className="p-3 border-b border-border bg-secondary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: ANIMATION_DURATIONS.SLOWER,
              delay: ANIMATION_DELAYS.LONG,
              ease: 'easeOut',
            }}
          >
            <h2 className="font-medium text-sm text-foreground">
              PROJECT DETAILS
            </h2>
          </motion.div>
          <motion.div
            className={textSizeClasses.padding}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: ANIMATION_DURATIONS.SLOW,
              delay: ANIMATION_DELAYS.LONGEST,
              ease: 'easeOut',
            }}
          >
            {/* Key Features */}
            {post.keyFeatures && post.keyFeatures.length > 0 && (
              <div className={textSizeClasses.margin}>
                <h3
                  className={`${textSizeClasses.heading} font-medium text-muted-foreground ${textSizeClasses.spacing}`}
                >
                  KEY FEATURES
                </h3>
                <ul
                  className={`${textSizeClasses.content} text-foreground ${textSizeClasses.spacing}`}
                >
                  {Array.isArray(post.keyFeatures) ? (
                    post.keyFeatures.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-muted-foreground mr-2">•</span>
                        {feature}
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      {post.keyFeatures}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Tech stack */}
            <div className={textSizeClasses.margin}>
              <h3
                className={`${textSizeClasses.heading} font-medium text-muted-foreground ${textSizeClasses.spacing}`}
              >
                TECHNOLOGIES
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.technologies?.map((tech: string, index: number) => (
                  <Badge key={index}>{tech}</Badge>
                )) || (
                  <>
                    <Badge>
                      {post.category === ProjectType.WEB ? 'JavaScript' : 'C#'}
                    </Badge>
                    <Badge>
                      {post.category === ProjectType.WEB ? 'React' : 'Unity'}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {post.views || '1.2K'}
                  </div>
                  <div className="text-xs text-muted-foreground">Views</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {post.stars || '--'}
                  </div>
                  <div className="text-xs text-muted-foreground">Stars</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {formatTimeAgo(post.publishedAt)}
                  </div>
                  <div className="text-xs text-muted-foreground">Published</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Project purpose */}
        <motion.div
          className="bg-card border border-border rounded-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: ANIMATION_DURATIONS.SLOW,
            delay: ANIMATION_DELAYS.SHORT,
            ease: 'easeOut',
          }}
        >
          <motion.div
            className="p-3 border-b border-border bg-secondary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: ANIMATION_DURATIONS.SLOW,
              delay: ANIMATION_DELAYS.EXTRA_LONGER,
              ease: 'easeOut',
            }}
          >
            <h2 className="font-medium text-sm text-foreground">
              PROJECT PURPOSE
            </h2>
          </motion.div>
          <motion.div
            className="p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: ANIMATION_DURATIONS.SLOW,
              delay: ANIMATION_DELAYS.SUPER_LONG,
              ease: 'easeOut',
            }}
          >
            <div className="text-sm">
              <p className="text-foreground mb-3">
                {post.projectPurpose ||
                  'This project was built to demonstrate modern web development techniques and best practices.'}
              </p>

              {post.problemSolved && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h3 className="text-xs font-medium text-muted-foreground mb-2">
                    PROBLEM SOLVED
                  </h3>
                  <p className="text-foreground">{post.problemSolved}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
