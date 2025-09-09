'use client';

import { Button } from '@/components/ui/button';
import {
  ProjectType,
  SITE_OWNER_CAKE_DAY,
  SITE_URL,
  LAYOUT_DIMENSIONS,
} from '@/data/constants';
import {
  slideUpVariants,
  scaleInVariants,
  ANIMATION_PRESETS,
} from '@/lib/animations';
import { POSTS } from '@/data/posts';
import { useToast } from '@/hooks/use-toast';
import profilePic from '@/public/profile.jpg';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProfileHeaderProps {
  displayName: string;
  username: string;
  description: string;
}

export default function ProfileHeader({
  displayName,
  username,
  description,
}: ProfileHeaderProps) {
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);

  const webProjectsLength = POSTS.filter(
    (post) => post.category === ProjectType.WEB
  ).length;
  const gameProjectsLength = POSTS.filter(
    (post) => post.category === ProjectType.GAME
  ).length;

  const startDate = new Date(2019, 4, 1); // May 2019 start date
  const currentDate = new Date();
  const yearsOfExperience = Math.floor(
    (currentDate.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24 * 365.25)
  );

  const handleShareClick = async () => {
    // Start the spin animation
    setIsSpinning(true);

    try {
      await navigator.clipboard.writeText(SITE_URL);
      toast({
        title: 'Website URL copied!',
        description: `${SITE_URL} has been copied to your clipboard.`,
      });
    } catch (err) {
      // Fallback for older browsers or when clipboard API fails
      const textArea = document.createElement('textarea');
      textArea.value = SITE_URL;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        // Suppress TypeScript warning for deprecated API (used only as fallback)
        const successful = (document as any).execCommand('copy');
        if (successful) {
          toast({
            title: 'Website URL copied!',
            description: `${SITE_URL} has been copied to your clipboard.`,
          });
        } else {
          throw new Error('execCommand copy failed');
        }
      } catch (fallbackErr) {
        toast({
          title: 'Copy failed',
          description: `Unable to copy website URL. Please copy manually: ${SITE_URL}`,
          variant: 'destructive',
        });
      }
      document.body.removeChild(textArea);
    }

    // Stop the spin animation after 500ms
    setTimeout(() => {
      setIsSpinning(false);
    }, 500);
  };

  return (
    <motion.div
      className="bg-card border border-border rounded"
      variants={slideUpVariants}
      initial="hidden"
      animate="visible"
      custom={0}
    >
      <div className="relative">
        <motion.div
          className="h-24 rounded-t bg-cover bg-center"
          style={{ backgroundImage: 'url(/profileBanner.jpg)' }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={ANIMATION_PRESETS.fadeInMedium}
        />
        <div className="absolute -bottom-4 left-4">
          <motion.div
            className="relative"
            variants={scaleInVariants}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <Image
              src={profilePic}
              alt={username}
              className="w-20 h-20 rounded-full border-4 border-card"
              width={LAYOUT_DIMENSIONS.PROFILE_IMAGE_SIZE}
              height={LAYOUT_DIMENSIONS.PROFILE_IMAGE_SIZE}
              priority
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="pt-8 px-4 pb-4"
        variants={slideUpVariants}
        initial="hidden"
        animate="visible"
        custom={0.4}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {displayName}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-secondary"
            onClick={handleShareClick}
            disabled={isSpinning}
          >
            <Share2
              className={`h-5 w-5 transition-transform duration-500 ${
                isSpinning ? 'animate-spin' : ''
              }`}
            />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">u/{username}</p>

        <p className="text-sm text-foreground mt-4">{description}</p>

        <motion.div
          className="mt-6"
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start">
              <span className="text-foreground font-medium text-sm">
                {webProjectsLength}
              </span>
              <span className="text-muted-foreground text-xs">
                Web projects
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-foreground font-medium text-sm">
                {gameProjectsLength}
              </span>
              <span className="text-muted-foreground text-xs">
                Game projects
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-foreground font-medium text-sm">
                {SITE_OWNER_CAKE_DAY}
              </span>
              <span className="text-muted-foreground text-xs">Cake day</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-foreground font-medium text-sm">
                {yearsOfExperience}
              </span>
              <span className="text-muted-foreground text-xs">
                Years of experience
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
