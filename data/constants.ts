export enum ProjectType {
  ALL = 'all',
  WEB = 'web',
  GAME = 'game',
}

export const ProjectTypeLabels = {
  [ProjectType.ALL]: 'r/all',
  [ProjectType.WEB]: 'r/webdev',
  [ProjectType.GAME]: 'r/gamedev',
};

export const ProjectTypes = Object.values(ProjectType);

export enum ResumeViewType {
  HTML = 'html',
  PDF = 'pdf',
}

export const ResumeViewTypeLabels = {
  [ResumeViewType.HTML]: 'r/html',
  [ResumeViewType.PDF]: 'r/pdf',
};

export const ResumeViewTypes = Object.values(ResumeViewType);

// Tab items for project filtering
export const PROJECT_TAB_ITEMS = [
  {
    value: ProjectType.ALL,
    label: ProjectTypeLabels[ProjectType.ALL],
    icon: 'Globe',
  },
  {
    value: ProjectType.WEB,
    label: ProjectTypeLabels[ProjectType.WEB],
    icon: 'Code',
  },
  {
    value: ProjectType.GAME,
    label: ProjectTypeLabels[ProjectType.GAME],
    icon: 'Gamepad2',
  },
] as const;

// Resume tab items
export const RESUME_TAB_ITEMS = [
  {
    value: ResumeViewType.HTML,
    label: ResumeViewTypeLabels[ResumeViewType.HTML],
    icon: 'MonitorSmartphone',
  },
  {
    value: ResumeViewType.PDF,
    label: ResumeViewTypeLabels[ResumeViewType.PDF],
    icon: 'FileText',
  },
] as const;

export const SITE_OWNER = 'Jeffrey Polasz';
export const SITE_OWNER_USERNAME = 'DigitalEpidemic';
export const SITE_OWNER_EMAIL = 'jeff_polasz@hotmail.com';
export const SITE_OWNER_LINKEDIN = 'https://linkedin.com/in/jeffrey-polasz';
export const SITE_OWNER_GITHUB = 'https://github.com/DigitalEpidemic';
export const SITE_OWNER_CAKE_DAY = 'Oct 28, 1996';
export const SITE_URL = 'https://jeffpolasz.com';
export const SITE_DISPLAY_NAME = 'jeffpolasz';

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  FAST: 0.15,
  NORMAL: 0.2,
  MEDIUM: 0.3,
  SLOW: 0.4,
  SLOWER: 0.5,
  SLOWEST: 0.6,
} as const;

// Animation delays (in seconds)
export const ANIMATION_DELAYS = {
  NONE: 0,
  SHORT: 0.1,
  MEDIUM: 0.2,
  LONG: 0.25,
  LONGER: 0.3,
  LONGEST: 0.35,
  EXTRA_LONG: 0.4,
  EXTRA_LONGER: 0.45,
  SUPER_LONG: 0.55,
  ULTRA_LONG: 0.6,
} as const;

// Layout dimensions (in pixels)
export const LAYOUT_DIMENSIONS = {
  HEADER_HEIGHT: 48,
  SIDEBAR_WIDTH: {
    DEFAULT: 312,
    XL: 312,
    LG: 250,
    MD: 220,
  },
  MOBILE_SHEET_WIDTH: 300,
  PROFILE_IMAGE_SIZE: 80,
  BANNER_HEIGHT: 96,
} as const;

// Responsive breakpoints (in pixels)
export const BREAKPOINTS = {
  MOBILE_MAX: 1023,
  DESKTOP_MIN: 1024,
  HEIGHT_THRESHOLD: 900,
  TABLET_MIN: 768,
  TABLET_MAX: 1023,
} as const;

// Common spacing values
export const SPACING = {
  CONTENT_MAX_WIDTH: {
    DEFAULT: 700,
    SMALL: 500,
    LARGE: 900,
    XL: 1000,
  },
} as const;

// Icon sizes
export const ICON_SIZES = {
  SMALL: 16,
  MEDIUM: 20,
  LARGE: 24,
} as const;

// Post animation constants
export const POST_ANIMATIONS = {
  INITIAL_LOAD: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  FILTER_CHANGE: {
    getInitial: (slideDirection: number) => ({ opacity: 0, x: slideDirection }),
    animate: { opacity: 1, x: 0 },
  },
  TRANSITION: {
    duration: 0.4,
    ease: 'easeOut',
  },
  NO_RESULTS: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
  RESUME_VIEW_CHANGE: {
    getInitial: (slideDirection: number) => ({ opacity: 0, x: slideDirection }),
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  MOBILE_WARNING: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  PDF_IFRAME: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  HTML_CONTENT: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
} as const;
