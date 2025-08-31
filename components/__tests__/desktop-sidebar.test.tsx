import { fireEvent, render, screen } from '@testing-library/react';
import { DesktopSidebar } from '../desktop-sidebar';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, href, onClick, ...props }: any) => {
    return (
      <a href={href} onClick={onClick} {...props}>
        {children}
      </a>
    );
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    aside: ({ children, className, ...props }: any) => (
      <aside className={className} {...props}>
        {children}
      </aside>
    ),
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    nav: ({ children, className, ...props }: any) => (
      <nav className={className} {...props}>
        {children}
      </nav>
    ),
  },
}));

// Mock the navigation data
jest.mock('@/data/navigation', () => ({
  communityItems: [
    { label: 'All', value: 'all', href: '/', icon: '📋' },
    { label: 'Web', value: 'web', href: '/web', icon: '🌐' },
    { label: 'Games', value: 'game', href: '/games', icon: '🎮' },
  ],
  feedItems: [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Portfolio', href: '/portfolio', icon: '💼' },
  ],
  resourceItems: [
    { label: 'Resume', href: '/resume', icon: '📄' },
    { label: 'Contact', onClick: jest.fn(), icon: '📧' },
  ],
}));

// Don't mock constants - use the real ones

const { usePathname } = require('next/navigation');

describe('DesktopSidebar', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    usePathname.mockReturnValue('/');
  });

  const defaultProps = {
    activeFilter: 'all',
    onFilterChange: mockOnFilterChange,
  };

  describe('Basic rendering', () => {
    it('renders all navigation sections', () => {
      render(<DesktopSidebar {...defaultProps} />);

      expect(screen.getByText('Feeds')).toBeInTheDocument();
      expect(screen.getByText('Recent')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
    });

    it('renders feed items correctly', () => {
      render(<DesktopSidebar {...defaultProps} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Portfolio')).toBeInTheDocument();
    });

    it('renders default community items in recent section', () => {
      render(<DesktopSidebar {...defaultProps} />);

      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Web')).toBeInTheDocument();
      expect(screen.getByText('Games')).toBeInTheDocument();
    });

    it('renders custom recent items when provided', () => {
      const customItems = [
        { label: 'Custom Item', value: 'custom', href: '/custom', icon: '🔥' },
      ];

      render(<DesktopSidebar {...defaultProps} recentItems={customItems} />);

      expect(screen.getByText('Custom Item')).toBeInTheDocument();
    });

    it('renders resource items correctly', () => {
      render(<DesktopSidebar {...defaultProps} />);

      expect(screen.getByText('Resume')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renders copyright footer', () => {
      render(<DesktopSidebar {...defaultProps} />);

      const currentYear = new Date().getFullYear();
      expect(
        screen.getByText(
          `© ${currentYear} Jeffrey Polasz. All rights reserved.`
        )
      ).toBeInTheDocument();
    });
  });

  describe('Active state highlighting', () => {
    it('highlights active feed item based on pathname', () => {
      usePathname.mockReturnValue('/portfolio');
      render(<DesktopSidebar {...defaultProps} />);

      const portfolioLink = screen.getByRole('link', { name: /portfolio/i });
      expect(portfolioLink).toHaveClass('text-primary', 'font-semibold');
    });

    it('highlights active recent item based on activeFilter', () => {
      render(<DesktopSidebar {...defaultProps} activeFilter="web" />);

      const webLink = screen.getByRole('link', { name: /web/i });
      expect(webLink).toHaveClass('bg-border', 'dark:bg-white/20');
    });

    it('does not highlight inactive items', () => {
      render(<DesktopSidebar {...defaultProps} activeFilter="all" />);

      const webLink = screen.getByRole('link', { name: /web/i });
      expect(webLink).not.toHaveClass('bg-secondary/70');
      expect(webLink).not.toHaveClass('text-primary');
    });
  });

  describe('Click interactions', () => {
    it('calls onFilterChange and prevents default when recent item is clicked', () => {
      render(<DesktopSidebar {...defaultProps} />);

      const event = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      const webLink = screen.getByRole('link', { name: /web/i });
      fireEvent(webLink, event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(mockOnFilterChange).toHaveBeenCalledWith('web');
    });

    it('does not prevent default when onFilterChange is not provided', () => {
      const propsWithoutOnFilterChange = {
        activeFilter: 'all',
      };

      render(<DesktopSidebar {...propsWithoutOnFilterChange} />);

      const event = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      const webLink = screen.getByRole('link', { name: /web/i });
      fireEvent(webLink, event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('calls onClick for resource items with onClick handler', () => {
      render(<DesktopSidebar {...defaultProps} />);

      const contactButton = screen.getByRole('button', { name: /contact/i });
      fireEvent.click(contactButton);

      // The mock from the top-level jest.mock should be called
      const { resourceItems } = require('@/data/navigation');
      expect(resourceItems[1].onClick).toHaveBeenCalled();
    });
  });

  describe('redirectRecentsToHome behavior', () => {
    it('creates filter links when redirectRecentsToHome is true', () => {
      render(<DesktopSidebar {...defaultProps} redirectRecentsToHome={true} />);

      const webLink = screen.getByRole('link', { name: /web/i });
      expect(webLink).toHaveAttribute('href', '/?filter=web');
    });

    it('does not add click handlers when redirectRecentsToHome is true', () => {
      render(<DesktopSidebar {...defaultProps} redirectRecentsToHome={true} />);

      const event = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      const webLink = screen.getByRole('link', { name: /web/i });
      fireEvent(webLink, event);

      // Should not prevent default or call onFilterChange
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('highlights active items correctly when redirectRecentsToHome is true', () => {
      render(
        <DesktopSidebar
          {...defaultProps}
          redirectRecentsToHome={true}
          activeFilter="web"
        />
      );

      const webLink = screen.getByRole('link', { name: /web/i });
      expect(webLink).toHaveClass('bg-border', 'dark:bg-white/20');
    });
  });

  describe('Styling and classes', () => {
    it('applies default classes', () => {
      const { container } = render(<DesktopSidebar {...defaultProps} />);

      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveClass(
        'hidden',
        'lg:block',
        'bg-card',
        'border-r',
        'border-border',
        'sticky',
        'top-12'
      );
    });

    it('applies custom className when provided', () => {
      const customClassName = 'custom-sidebar-class';
      const { container } = render(
        <DesktopSidebar {...defaultProps} className={customClassName} />
      );

      const sidebar = container.querySelector('aside');
      expect(sidebar).toHaveClass(customClassName);
    });

    it('applies hover styles to navigation items', () => {
      render(<DesktopSidebar {...defaultProps} />);

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toHaveClass(
        'hover:bg-muted',
        'dark:hover:bg-secondary/70'
      );
    });
  });

  describe('handleTabClick function', () => {
    it('prevents default and calls onFilterChange when onFilterChange is provided', () => {
      render(<DesktopSidebar {...defaultProps} />);

      const event = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      const webLink = screen.getByRole('link', { name: /web/i });
      fireEvent(webLink, event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(mockOnFilterChange).toHaveBeenCalledWith('web');
    });

    it('does nothing when onFilterChange is not provided', () => {
      const propsWithoutHandler = { activeFilter: 'all' };
      render(<DesktopSidebar {...propsWithoutHandler} />);

      const event = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      const webLink = screen.getByRole('link', { name: /web/i });
      fireEvent(webLink, event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('renders without crashing when no props are provided except activeFilter', () => {
      render(<DesktopSidebar activeFilter="all" />);

      expect(screen.getByText('Feeds')).toBeInTheDocument();
      expect(screen.getByText('Recent')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
    });

    it('handles empty recentItems array', () => {
      render(<DesktopSidebar {...defaultProps} recentItems={[]} />);

      expect(screen.getByText('Recent')).toBeInTheDocument();
      // Should not crash even with empty array
    });

    it('renders resource items without onClick correctly', () => {
      render(<DesktopSidebar {...defaultProps} />);

      const resumeLink = screen.getByRole('link', { name: /resume/i });
      expect(resumeLink).toHaveAttribute('href', '/resume');
      expect(resumeLink).toHaveClass(
        'hover:bg-muted',
        'dark:hover:bg-secondary/70'
      );
    });
  });
});
