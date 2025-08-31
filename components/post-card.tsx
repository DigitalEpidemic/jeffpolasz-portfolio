'use client';

import { ProjectType, ProjectTypeLabels } from '@/data/constants';
import { fadeInVariants, ANIMATION_PRESETS } from '@/lib/animations';
import { formatTimeAgo } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PostActions from './post-actions';
import { Badge } from './ui/badge';

interface PostCardProps {
  title: string;
  slug: string;
  category: ProjectType;
  username: string;
  publishedAt: Date;
  votes: number;
  content: string;
  image?: string;
  tags?: string[];
  github?: string;
  demo?: string;
  shouldAnimate?: boolean;
}

export default function PostCard({
  title,
  slug,
  category,
  username,
  publishedAt,
  votes,
  content,
  image,
  tags = [],
  github,
  demo,
  shouldAnimate = false,
}: PostCardProps) {
  return (
    <article className="bg-card border border-border rounded hover:bg-secondary/50 transition-colors duration-200">
      <Link href={`/post/${slug}`} className="block">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 p-2 text-xs text-muted-foreground flex-wrap sm:flex-nowrap">
            <span className="font-medium text-foreground hover:text-primary cursor-pointer whitespace-nowrap">
              {ProjectTypeLabels[category]}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="whitespace-nowrap">Posted by u/{username}</span>
            <span className="hidden sm:inline">•</span>
            <span className="whitespace-nowrap">
              {formatTimeAgo(publishedAt)}
            </span>
          </div>

          <motion.h2
            className="px-2 text-lg font-medium text-foreground"
            variants={fadeInVariants}
            initial={shouldAnimate ? 'hidden' : false}
            animate={shouldAnimate ? 'visible' : false}
            custom={0.1}
          >
            {title}
          </motion.h2>

          <div className="mt-2">
            {tags.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-1 px-2 mb-2"
                variants={fadeInVariants}
                initial={shouldAnimate ? 'hidden' : false}
                animate={shouldAnimate ? 'visible' : false}
                custom={0.2}
              >
                {tags.map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </motion.div>
            )}
            <motion.p
              className="px-2 text-sm text-foreground"
              variants={fadeInVariants}
              initial={shouldAnimate ? 'hidden' : false}
              animate={shouldAnimate ? 'visible' : false}
              custom={0.3}
            >
              {content}
            </motion.p>
            {image && (
              <motion.div
                variants={fadeInVariants}
                initial={shouldAnimate ? 'hidden' : false}
                animate={shouldAnimate ? 'visible' : false}
                custom={0.4}
              >
                <Image
                  src={image}
                  alt={title}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto max-h-[512px] object-contain mt-2"
                  priority
                  unoptimized
                />
              </motion.div>
            )}
          </div>
        </div>
      </Link>

      <PostActions initialVotes={votes} github={github} demo={demo} />
    </article>
  );
}
