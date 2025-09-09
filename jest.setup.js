import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, ...props }) => {
    return <a {...props}>{children}</a>;
  };
});

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage(props) {
    // Only pass standard img element props to avoid React DOM warnings
    const { src, alt, className, style, onLoad, onError } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onLoad={onLoad}
        onError={onError}
      />
    );
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      onAnimationComplete,
      whileHover,
      whileTap,
      initial,
      animate,
      variants,
      transition,
      ...props
    }) => (
      <div
        {...props}
        data-testid={
          props['data-sidebar-container'] ? 'sidebar-container' : undefined
        }
        onClick={() => {
          // Simulate animation complete for testing callbacks
          if (onAnimationComplete && props['data-sidebar-container']) {
            onAnimationComplete();
          }
        }}
      >
        {children}
      </div>
    ),
    span: ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      variants,
      transition,
      ...props
    }) => <span {...props}>{children}</span>,
    button: ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      variants,
      transition,
      ...props
    }) => <button {...props}>{children}</button>,
    article: ({
      children,
      whileTap,
      whileHover,
      initial,
      animate,
      variants,
      transition,
      ...props
    }) => <article {...props}>{children}</article>,
    h1: ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      variants,
      transition,
      ...props
    }) => <h1 {...props}>{children}</h1>,
    h2: ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      variants,
      transition,
      ...props
    }) => <h2 {...props}>{children}</h2>,
    h3: ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      variants,
      transition,
      ...props
    }) => <h3 {...props}>{children}</h3>,
    p: ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      variants,
      transition,
      ...props
    }) => <p {...props}>{children}</p>,
    aside: ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      variants,
      transition,
      custom,
      ...props
    }) => <aside {...props}>{children}</aside>,
    nav: ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      variants,
      transition,
      ...props
    }) => <nav {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: jest.fn(),
  }),
}));

// Mock yet-another-react-lightbox
jest.mock('yet-another-react-lightbox', () => {
  return function MockLightbox({ open, children, ...props }) {
    return open ? (
      <div data-testid="lightbox" {...props}>
        {children}
      </div>
    ) : null;
  };
});

jest.mock('yet-another-react-lightbox/plugins/zoom', () => ({
  __esModule: true,
  default: {},
}));

// Mock CSS imports
jest.mock('yet-another-react-lightbox/styles.css', () => ({}));

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }) => children,
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    resolvedTheme: 'light',
  }),
}));

// Mock use-media-query hook
jest.mock('@/hooks/use-media-query', () => ({
  useMediaQuery: jest.fn(() => false),
  useIsMobile: jest.fn(() => false), // Default to desktop
  useIsDesktop: jest.fn(() => true),
  useIsTablet: jest.fn(() => false),
}));

// Mock scrollIntoView for Select component
Element.prototype.scrollIntoView = jest.fn();

// Mock PostActions component
jest.mock('@/components/post-actions', () => ({
  __esModule: true,
  default: ({ initialVotes }) => (
    <div data-testid="post-actions">Post Actions {initialVotes}</div>
  ),
}));

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress specific React DOM warnings in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('priority') ||
        message.includes('non-boolean attribute') ||
        message.includes('whileHover'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
