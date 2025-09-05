'use client';

import ImageGallery from '@/components/image-gallery';
import { NavigationLayout } from '@/components/navigation-layout';
import PostActions from '@/components/post-actions';
import { ProjectSidebar } from '@/components/project-sidebar';
import { ProjectStructuredData } from '@/components/structured-data';
import { Badge } from '@/components/ui/badge';
import { ProjectType, ProjectTypeLabels } from '@/data/constants';
import { communityItems } from '@/data/navigation';
import { Post } from '@/data/posts';
import { useIsMobile } from '@/hooks/use-media-query';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { formatTimeAgo } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PostPageClientProps {
  post: Post;
}

export default function PostPageClient({ post }: PostPageClientProps) {
  const isMobile = useIsMobile();

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-foreground text-xl">Post not found</p>
        <Link href="/" className="text-primary mt-4 hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <>
      <ProjectStructuredData
        name={post.title}
        description={post.content}
        url={post.demo}
        author="Jeffrey Polasz"
        dateCreated={post.publishedAt.toISOString()}
        programmingLanguage={post.technologies}
        github={post.github}
        image={post.image ? `https://jeffpolasz.com${post.image}` : undefined}
      />
      <NavigationLayout
        searchDisabled
        searchPlaceholder="Search..."
        redirectRecentsToHome={true}
        activeFilter={post.category || ProjectType.ALL}
        recentItems={communityItems}
        filterCategories={[
          {
            value: ProjectType.ALL,
            label: ProjectTypeLabels[ProjectType.ALL],
          },
          {
            value: ProjectType.WEB,
            label: ProjectTypeLabels[ProjectType.WEB],
          },
          {
            value: ProjectType.GAME,
            label: ProjectTypeLabels[ProjectType.GAME],
          },
        ]}
      >
        <div
          className="
          max-w-[700px]
          sm:max-w-[500px] 
          md:max-w-none md:w-[80%]
          lg:max-w-none lg:w-[90%]
          xl:max-w-[900px]
          2xl:max-w-[1000px]
          [@media(max-height:900px)]:max-w-[900px] [@media(max-height:900px)]:w-full
          mx-auto px-4 flex gap-4 md:gap-2 lg:gap-4 py-4 md:pb-4 pb-16
          [@media(max-height:900px)]:flex-col
        "
        >
          {/* Left column - main content */}
          <motion.div
            className="flex-1 relative"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Desktop back button - positioned absolutely */}
            <motion.div
              className="hidden sm:block absolute left-[-42px] top-3 z-10"
              variants={staggerItem}
            >
              <Link
                href="/"
                className="text-foreground hover:text-foreground flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-border dark:hover:bg-white/20 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Mobile back button - visible only on small screens */}
            <motion.div
              className="flex sm:hidden items-center mb-4"
              variants={staggerItem}
            >
              <Link
                href="/"
                className="text-foreground hover:text-foreground flex items-center px-2 py-1 rounded-full bg-secondary hover:bg-border dark:hover:bg-white/20 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                <span className="text-sm">Back</span>
              </Link>
            </motion.div>

            {/* Post card - keeping the same structure as post-card.tsx */}
            <motion.article
              className="bg-card border border-border rounded"
              variants={staggerItem}
            >
              <motion.div
                className="flex flex-col"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center gap-1 p-2 text-xs text-muted-foreground flex-wrap sm:flex-nowrap">
                  <span className="font-medium text-foreground hover:text-primary cursor-pointer whitespace-nowrap">
                    {ProjectTypeLabels[post.category]}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="whitespace-nowrap">
                    Posted by u/{post.username}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="whitespace-nowrap">
                    {formatTimeAgo(post.publishedAt)}
                  </span>
                </div>

                <motion.h1
                  className="px-2 text-lg font-medium text-foreground"
                  variants={staggerItem}
                >
                  {post.title}
                </motion.h1>

                <div className="mt-2">
                  {post.tags && post.tags.length > 0 && (
                    <motion.div
                      className="flex flex-wrap gap-1 px-2 mb-2"
                      variants={staggerItem}
                    >
                      {post.tags.map((tag: string, index: number) => (
                        <Badge key={index}>{tag}</Badge>
                      ))}
                    </motion.div>
                  )}

                  <motion.p
                    className="px-2 text-sm text-foreground"
                    variants={staggerItem}
                  >
                    {post.content}
                  </motion.p>

                  {/* Post description below */}
                  {post.detailedContent && (
                    <motion.div
                      className="px-2 mt-2 text-sm text-foreground"
                      variants={staggerItem}
                    >
                      {post.detailedContent
                        .split('\n\n')
                        .map((paragraph: string, index: number) => (
                          <p key={index} className={index > 0 ? 'mt-2' : ''}>
                            {paragraph}
                          </p>
                        ))}
                    </motion.div>
                  )}

                  {/* Post image */}
                  {post.image && (
                    <motion.div variants={staggerItem}>
                      <ImageGallery
                        images={[{ url: post.image, caption: post.title }]}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <PostActions
                initialVotes={post.votes}
                github={post.github}
                demo={post.demo}
              />
            </motion.article>

            {/* Mobile project details - conditionally rendered based on original breakpoint logic */}
            {isMobile && (
              <motion.div variants={staggerItem}>
                <ProjectSidebar post={post} isMobile={true} />
              </motion.div>
            )}

            {/* Screenshots/Video area */}
            <motion.div
              className="mt-4 bg-card border border-border rounded p-4"
              variants={staggerItem}
            >
              <div className="border-b border-border pb-4">
                <h2 className="font-medium text-foreground mb-3">
                  Project Showcase
                </h2>

                {post.screenshots && post.screenshots.length > 0 ? (
                  <div className="mt-2">
                    <ImageGallery images={post.screenshots} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-muted-foreground mb-2">
                      No additional screenshots available.
                    </p>
                    {post.github && (
                      <Link
                        href={post.github}
                        className="text-primary text-sm hover:underline"
                      >
                        Visit GitHub repository
                      </Link>
                    )}
                    {post.demo && !post.github && (
                      <Link
                        href={post.demo}
                        className="text-primary text-sm hover:underline"
                      >
                        View live demo
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {post.video && (
                <div className="mt-4">
                  <h3 className="font-medium text-sm mb-2">Demo Video</h3>
                  <div className="aspect-video rounded-md overflow-hidden">
                    <iframe
                      src={post.video}
                      title="Project Demo Video"
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Right column - sidebar - conditionally rendered based on original breakpoint logic */}
          {!isMobile && <ProjectSidebar post={post} isMobile={false} />}
        </div>
      </NavigationLayout>
    </>
  );
}
