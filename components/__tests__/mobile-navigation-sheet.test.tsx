import { fireEvent, render, screen } from '@testing-library/react';
import { MobileNavigationSheet } from '../mobile-navigation-sheet';

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

// Mock the navigation data
jest.mock('@/data/navigation', () => ({
  communityItems: [
    { label: 'All', value: 'all', icon: '📋' },
    { label: 'Web', value: 'web', icon: '🌐' },
    { label: 'Games', value: 'game', icon: '🎮' },
  ],
  feedItems: [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Portfolio', href: '/portfolio', icon: '💼' },
  ],
  resourceItems: [
    { label: 'Resume', href: '/resume', icon: '📄' },
    { label: 'Contact', onClick: jest.fn(), icon: '📧' },
  ],
  resumeItems: [
    { label: 'Experience', value: 'experience', icon: '💼' },
    { label: 'Education', value: 'education', icon: '🎓' },
  ],
}));

const { usePathname } = require('next/navigation');

describe('MobileNavigationSheet', () => {
  const mockOnOpenChange = jest.fn();
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    usePathname.mockReturnValue('/');
  });

  const defaultProps = {
    isOpen: true,
    onOpenChange: mockOnOpenChange,
    activeFilter: 'all',
    onFilterChange: mockOnFilterChange,
  };

  describe('Basic rendering', () => {
    it('renders navigation sections correctly', () => {
      render(<MobileNavigationSheet {...defaultProps} />);

      expect(screen.getByText('Feeds')).toBeInTheDocument();
      expect(screen.getByText('Recent')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
    });

    it('renders feed items correctly', () => {
      render(<MobileNavigationSheet {...defaultProps} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Portfolio')).toBeInTheDocument();
    });

    it('renders community items by default', () => {
      render(<MobileNavigationSheet {...defaultProps} />);

      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Web')).toBeInTheDocument();
      expect(screen.getByText('Games')).toBeInTheDocument();
    });

    it('renders resume items when isResumePage is true', () => {
      render(<MobileNavigationSheet {...defaultProps} isResumePage={true} />);

      expect(screen.getByText('Experience')).toBeInTheDocument();
      expect(screen.getByText('Education')).toBeInTheDocument();
    });

    it('renders resource items correctly', () => {
      render(<MobileNavigationSheet {...defaultProps} />);

      expect(screen.getByText('Resume')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renders copyright section', () => {
      render(<MobileNavigationSheet {...defaultProps} />);

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
      usePathname.mockReturnValue('/');
      render(<MobileNavigationSheet {...defaultProps} />);

      const homeElement =
        screen.queryByRole('button', { name: /home/i }) ||
        screen.getByRole('link', { name: /home/i });
      expect(homeElement).toHaveClass('text-primary', 'font-semibold');
    });

    it('highlights active recent item based on activeFilter', () => {
      render(<MobileNavigationSheet {...defaultProps} activeFilter="web" />);

      const webButton = screen.getByRole('button', { name: /web/i });
      expect(webButton).toHaveClass('bg-border', 'dark:bg-white/20');
    });

    it('highlights active resource item based on pathname', () => {
      usePathname.mockReturnValue('/resume');
      render(<MobileNavigationSheet {...defaultProps} />);

      const resumeElement =
        screen.queryByRole('button', { name: /resume/i }) ||
        screen.getByRole('link', { name: /resume/i });
      expect(resumeElement).toHaveClass('text-primary', 'font-semibold');
    });
  });

  describe('Click interactions', () => {
    it('closes sheet when feed item is clicked', () => {
      render(<MobileNavigationSheet {...defaultProps} />);

      const homeLink = screen.getByRole('link', { name: /home/i });
      fireEvent.click(homeLink);

      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });

    it('calls onFilterChange and closes sheet when recent item is clicked', () => {
      render(<MobileNavigationSheet {...defaultProps} />);

      const webButton = screen.getByRole('button', { name: /web/i });
      fireEvent.click(webButton);

      expect(mockOnFilterChange).toHaveBeenCalledWith('web');
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });

    it('only closes sheet when redirectRecentsToHome is true', () => {
      render(
        <MobileNavigationSheet {...defaultProps} redirectRecentsToHome={true} />
      );

      const webLink = screen.getByRole('link', { name: /web/i });
      expect(webLink).toHaveAttribute('href', '/?filter=web');

      fireEvent.click(webLink);
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
      expect(mockOnFilterChange).not.toHaveBeenCalled();
    });

    it('calls item onClick and closes sheet for resource items with onClick', () => {
      render(<MobileNavigationSheet {...defaultProps} />);

      const contactButton = screen.getByRole('button', { name: /contact/i });
      fireEvent.click(contactButton);

      // The mock from the top-level jest.mock should be called
      const { resourceItems } = require('@/data/navigation');
      expect(resourceItems[1].onClick).toHaveBeenCalled();
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Edge cases', () => {
    it('handles missing onFilterChange prop', () => {
      const propsWithoutOnFilterChange = {
        ...defaultProps,
        onFilterChange: undefined,
      };

      render(<MobileNavigationSheet {...propsWithoutOnFilterChange} />);

      const webButton = screen.getByRole('button', { name: /web/i });
      fireEvent.click(webButton);

      // Should not crash, but also should not close the sheet when onFilterChange is missing
      expect(mockOnOpenChange).not.toHaveBeenCalled();
    });

    it('handles resource items without onClick', () => {
      render(<MobileNavigationSheet {...defaultProps} />);

      const resumeElement =
        screen.queryByRole('button', { name: /resume/i }) ||
        screen.getByRole('link', { name: /resume/i });
      expect(resumeElement).toBeInTheDocument();
    });

    it('renders with default props', () => {
      const minimalProps = {
        isOpen: true,
        onOpenChange: mockOnOpenChange,
        activeFilter: 'all',
      };

      render(<MobileNavigationSheet {...minimalProps} />);

      expect(screen.getByText('Feeds')).toBeInTheDocument();
      expect(screen.getByText('Recent')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
    });
  });

  describe('Sheet behavior', () => {
    it('renders sheet trigger button', () => {
      const { container } = render(<MobileNavigationSheet {...defaultProps} />);

      const triggerButton = container.querySelector('button[aria-expanded]');
      expect(triggerButton).toBeInTheDocument();
    });

    it('passes isOpen prop to Sheet component', () => {
      const { rerender } = render(
        <MobileNavigationSheet {...defaultProps} isOpen={false} />
      );
      rerender(<MobileNavigationSheet {...defaultProps} isOpen={true} />);

      // The sheet content should be visible when isOpen is true
      expect(screen.getByText('Feeds')).toBeInTheDocument();
    });

    it('renders accessibility attributes', () => {
      render(<MobileNavigationSheet {...defaultProps} />);

      expect(screen.getByText('Navigation Menu')).toHaveClass('sr-only');
      expect(
        screen.getByText('Navigate between different sections and feeds')
      ).toHaveClass('sr-only');
    });
  });

  describe('handleMobileTabClick function', () => {
    it('redirects when redirectRecentsToHome is true', () => {
      render(
        <MobileNavigationSheet {...defaultProps} redirectRecentsToHome={true} />
      );

      // This path is tested through the redirectRecentsToHome behavior
      const webLink = screen.getByRole('link', { name: /web/i });
      expect(webLink).toHaveAttribute('href', '/?filter=web');

      fireEvent.click(webLink);
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });

    it('calls onFilterChange when onFilterChange is provided and redirectRecentsToHome is false', () => {
      render(
        <MobileNavigationSheet
          {...defaultProps}
          redirectRecentsToHome={false}
        />
      );

      const webButton = screen.getByRole('button', { name: /web/i });
      fireEvent.click(webButton);

      expect(mockOnFilterChange).toHaveBeenCalledWith('web');
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });

    it('does not close sheet when onFilterChange is not provided', () => {
      const propsWithoutOnFilterChange = {
        ...defaultProps,
        onFilterChange: undefined,
        redirectRecentsToHome: false,
      };

      render(<MobileNavigationSheet {...propsWithoutOnFilterChange} />);

      const webButton = screen.getByRole('button', { name: /web/i });
      fireEvent.click(webButton);

      // Should not call onOpenChange when there's no onFilterChange callback
      expect(mockOnOpenChange).not.toHaveBeenCalled();
    });
  });
});
