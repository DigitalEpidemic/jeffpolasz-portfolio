'use client';

import { ANIMATION_DURATIONS } from '@/data/constants';
import { motion, useAnimation } from 'framer-motion';
import { ArrowBigDown, ArrowBigUp, ExternalLink, Github } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PostActionsProps {
  initialVotes: number;
  github?: string;
  demo?: string;
}

export default function PostActions({
  initialVotes,
  github,
  demo,
}: PostActionsProps) {
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  const [votes, setVotes] = useState(initialVotes);
  const upvoteControls = useAnimation();
  const downvoteControls = useAnimation();

  // Reset vote state when initialVotes changes (when different posts are rendered)
  useEffect(() => {
    setVotes(initialVotes);
    setVoteStatus(null);
  }, [initialVotes]);

  const handleVote = (type: 'up' | 'down') => {
    const isDeselecting = voteStatus === type;
    const controls = type === 'up' ? upvoteControls : downvoteControls;

    setVoteStatus(isDeselecting ? null : type);
    setVotes(
      isDeselecting ? initialVotes : initialVotes + (type === 'up' ? 1 : -1)
    );

    const baseAnimation = { scale: [1, 0.7, 1], rotate: [0, -5, 0] };
    const animation = isDeselecting
      ? baseAnimation
      : { ...baseAnimation, y: [0, type === 'up' ? -15 : 15, 0] };

    controls.start({
      ...animation,
      transition: { duration: ANIMATION_DURATIONS.MEDIUM, ease: 'easeOut' },
    });
  };

  return (
    <div className="flex items-center px-2 py-2 gap-1">
      <div className="flex items-center bg-border hover:bg-foreground/20 dark:bg-secondary dark:hover:bg-white/20 rounded-full h-6 px-1 transition-colors">
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleVote('up');
          }}
          className={`p-1 rounded-full ${voteStatus === 'up' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
          animate={upvoteControls}
          whileHover={{ scale: 1.2 }}
        >
          <ArrowBigUp
            className="h-4 w-4"
            fill={voteStatus === 'up' ? 'currentColor' : 'none'}
          />
        </motion.button>
        <span
          className={`text-xs font-bold px-1 ${voteStatus === 'up' ? 'text-primary' : voteStatus === 'down' ? 'text-blue-400' : 'text-foreground'}`}
        >
          {votes}
        </span>
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleVote('down');
          }}
          className={`p-1 rounded-full ${voteStatus === 'down' ? 'text-blue-400' : 'text-foreground hover:text-blue-400'}`}
          animate={downvoteControls}
          whileHover={{ scale: 1.2 }}
        >
          <ArrowBigDown
            className="h-4 w-4"
            fill={voteStatus === 'down' ? 'currentColor' : 'none'}
          />
        </motion.button>
      </div>

      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 rounded-full bg-border hover:bg-foreground/20 dark:bg-secondary dark:hover:bg-white/20 px-2 py-1 text-foreground"
        >
          <Github className="h-4 w-4" />
          <span className="text-xs">GitHub</span>
        </a>
      )}

      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 rounded-full bg-border hover:bg-foreground/20 dark:bg-secondary dark:hover:bg-white/20 px-2 py-1 text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="text-xs">Demo</span>
        </a>
      )}
    </div>
  );
}
