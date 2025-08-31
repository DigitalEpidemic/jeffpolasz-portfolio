import { ANIMATION_DELAYS, ANIMATION_DURATIONS } from '@/data/constants';

// Common animation variants for Framer Motion
export const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.SLOW,
      delay,
      ease: 'easeOut' as const,
    },
  }),
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.SLOW,
      delay,
      ease: 'easeOut' as const,
    },
  }),
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.SLOWER,
      delay,
      ease: 'backOut' as const,
    },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ANIMATION_DELAYS.SHORT,
      delayChildren: ANIMATION_DELAYS.SHORT,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.SLOW,
      ease: 'easeOut' as const,
    },
  },
};

// Animation presets combining duration and delay
export const ANIMATION_PRESETS = {
  fadeInFast: {
    duration: ANIMATION_DURATIONS.SLOW,
    delay: ANIMATION_DELAYS.SHORT,
    ease: 'easeOut' as const,
  },
  fadeInMedium: {
    duration: ANIMATION_DURATIONS.SLOW,
    delay: ANIMATION_DELAYS.MEDIUM,
    ease: 'easeOut' as const,
  },
  fadeInSlow: {
    duration: ANIMATION_DURATIONS.SLOW,
    delay: ANIMATION_DELAYS.LONGER,
    ease: 'easeOut' as const,
  },
  slideIn: {
    duration: ANIMATION_DURATIONS.SLOWER,
    delay: ANIMATION_DELAYS.MEDIUM,
    ease: 'backOut' as const,
  },
  quickTransition: {
    duration: ANIMATION_DURATIONS.FAST,
    ease: 'easeOut' as const,
  },
} as const;
