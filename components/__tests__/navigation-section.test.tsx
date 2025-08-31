import { TabItem } from '@/data/navigation';
import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationSection } from '../navigation-section';

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

describe('NavigationSection', () => {
  const mockOnItemClick = jest.fn();
  const mockOnClose = jest.fn();

  const mockItems: TabItem[] = [
    {
      label: 'Web Projects',
      value: 'web',
      href: '/web',
      icon: '🌐',
    },
    {
      label: 'Games',
      value: 'game',
      href: '/games',
      icon: '🎮',
    },
    {
      label: 'Resume',
      href: '/resume',
      value: 'resume',
      icon: '📄',
    },
    {
      label: 'Custom Action',
      icon: '⚡',
      value: '',
      href: '/custom',
      onClick: jest.fn(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop rendering', () => {
    it('renders section title and items correctly', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          isMobile={false}
        />
      );

      expect(screen.getByText('Test Section')).toBeInTheDocument();
      expect(screen.getByText('Web Projects')).toBeInTheDocument();
      expect(screen.getByText('Games')).toBeInTheDocument();
      expect(screen.getByText('Resume')).toBeInTheDocument();
      expect(screen.getByText('Custom Action')).toBeInTheDocument();
    });

    it('highlights active filter item', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          activeFilter="web"
          pathname="/different-path"
          isMobile={false}
        />
      );

      const webLink = screen.getByRole('link', { name: /web projects/i });
      // In desktop mode, when activeFilter matches and pathname doesn't match href, it gets bg-secondary for light mode
      expect(webLink).toHaveClass('bg-border', 'dark:bg-white/20');
    });

    it('highlights active pathname item', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          pathname="/resume"
          isMobile={false}
        />
      );

      const resumeItem = screen.getByRole('link', { name: /resume/i });
      expect(resumeItem).toHaveClass('text-primary', 'font-semibold');
    });

    it('calls onItemClick when filter item is clicked', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          onItemClick={mockOnItemClick}
          isMobile={false}
        />
      );

      fireEvent.click(screen.getByText('Web Projects'));
      expect(mockOnItemClick).toHaveBeenCalledWith('web');
    });

    it('calls custom onClick when item has onClick handler', () => {
      const customOnClick = jest.fn();
      const itemsWithOnClick: TabItem[] = [
        {
          label: 'Custom Action',
          icon: '⚡',
          value: 'custom',
          href: '/custom',
          onClick: customOnClick,
        },
      ];

      render(
        <NavigationSection
          title="Test Section"
          items={itemsWithOnClick}
          onClose={mockOnClose}
          isMobile={false}
        />
      );

      fireEvent.click(screen.getByText('Custom Action'));
      expect(customOnClick).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('redirects to home with filter when redirectRecentsToHome is true', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          redirectRecentsToHome={true}
          isMobile={false}
        />
      );

      const webItem = screen.getByRole('link', { name: /web projects/i });
      expect(webItem).toHaveAttribute('href', '/?filter=web');
    });

    it('prevents default and calls onItemClick for filter items with href', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          onItemClick={mockOnItemClick}
          isMobile={false}
        />
      );

      const event = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      const webItem = screen.getByText('Web Projects');
      fireEvent(webItem, event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(mockOnItemClick).toHaveBeenCalledWith('web');
    });
  });

  describe('Mobile rendering', () => {
    it('renders section title and items correctly', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          isMobile={true}
        />
      );

      expect(screen.getByText('Test Section')).toBeInTheDocument();
      expect(screen.getByText('Web Projects')).toBeInTheDocument();
      expect(screen.getByText('Games')).toBeInTheDocument();
      expect(screen.getByText('Resume')).toBeInTheDocument();
      expect(screen.getByText('Custom Action')).toBeInTheDocument();
    });

    it('highlights active filter item', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          activeFilter="web"
          isMobile={true}
        />
      );

      // Mobile items can be either links or buttons depending on props
      const webElement =
        screen.queryByRole('button', { name: /web projects/i }) ||
        screen.getByRole('link', { name: /web projects/i });
      expect(webElement).toHaveClass('bg-border', 'dark:bg-white/20');
    });

    it('highlights active pathname item', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          pathname="/resume"
          isMobile={true}
        />
      );

      // Mobile items can be either links or buttons depending on props
      const resumeElement =
        screen.queryByRole('button', { name: /resume/i }) ||
        screen.getByRole('link', { name: /resume/i });
      expect(resumeElement).toHaveClass('text-primary', 'font-semibold');
    });

    it('calls onClose when item with href is clicked', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          onItemClick={mockOnItemClick}
          onClose={mockOnClose}
          isMobile={true}
        />
      );

      const webElement = screen.getByRole('link', { name: /web projects/i });
      fireEvent.click(webElement);
      // Items with href call onClose, not onItemClick
      expect(mockOnClose).toHaveBeenCalled();
      expect(mockOnItemClick).not.toHaveBeenCalled();
    });

    it('calls custom onClick and onClose when item has onClick handler', () => {
      const customOnClick = jest.fn();
      const itemsWithOnClick: TabItem[] = [
        {
          label: 'Custom Action',
          icon: '⚡',
          value: 'custom',
          href: '/custom',
          onClick: customOnClick,
        },
      ];

      render(
        <NavigationSection
          title="Test Section"
          items={itemsWithOnClick}
          onClose={mockOnClose}
          isMobile={true}
        />
      );

      const customButton = screen.getByRole('button', {
        name: /custom action/i,
      });
      fireEvent.click(customButton);
      expect(customOnClick).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('redirects to home with filter when redirectRecentsToHome is true', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          redirectRecentsToHome={true}
          onClose={mockOnClose}
          isMobile={true}
        />
      );

      const webLink = screen.getByRole('link', { name: /web projects/i });
      expect(webLink).toHaveAttribute('href', '/?filter=web');

      fireEvent.click(webLink);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onClose when mobile item with href is clicked', () => {
      render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          onClose={mockOnClose}
          isMobile={true}
        />
      );

      const resumeLink = screen.getByRole('link', { name: /resume/i });

      fireEvent.click(resumeLink);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('handles empty items array', () => {
      render(
        <NavigationSection title="Empty Section" items={[]} isMobile={false} />
      );

      expect(screen.getByText('Empty Section')).toBeInTheDocument();
    });

    it('handles items without value or href', () => {
      const itemsWithoutValue: TabItem[] = [
        {
          label: 'No Value Item',
          icon: '❓',
          href: '/no-value',
          value: '',
        },
      ];

      render(
        <NavigationSection
          title="Test Section"
          items={itemsWithoutValue}
          isMobile={false}
        />
      );

      expect(screen.getByText('No Value Item')).toBeInTheDocument();
    });

    it('does not call onItemClick when item has no value', () => {
      const itemsWithoutValue: TabItem[] = [
        {
          label: 'No Value Item',
          icon: '❓',
          href: '/no-value',
          value: '',
        },
      ];

      render(
        <NavigationSection
          title="Test Section"
          items={itemsWithoutValue}
          onItemClick={mockOnItemClick}
          isMobile={false}
        />
      );

      fireEvent.click(screen.getByText('No Value Item'));
      expect(mockOnItemClick).not.toHaveBeenCalled();
    });

    it('renders correctly without optional props', () => {
      render(<NavigationSection title="Basic Section" items={mockItems} />);

      expect(screen.getByText('Basic Section')).toBeInTheDocument();
      expect(screen.getByText('Web Projects')).toBeInTheDocument();
    });
  });

  describe('Styling and classes', () => {
    it('applies correct mobile styling', () => {
      const { container } = render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          isMobile={true}
        />
      );

      const titleContainer = container.querySelector('div');
      expect(titleContainer).toHaveClass('pb-2');
      expect(titleContainer).not.toHaveClass('px-6');
    });

    it('applies correct desktop styling', () => {
      const { container } = render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          isMobile={false}
        />
      );

      const titleContainer = container.querySelector('div');
      expect(titleContainer).toHaveClass('px-6', 'pb-2');
    });

    it('applies active styles correctly for both mobile and desktop', () => {
      const { rerender } = render(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          activeFilter="web"
          isMobile={false}
        />
      );

      // Desktop active item
      let webItem = screen.getByRole('link', { name: /web projects/i });
      expect(webItem).toHaveClass('bg-border', 'dark:bg-white/20');

      // Mobile active item
      rerender(
        <NavigationSection
          title="Test Section"
          items={mockItems}
          activeFilter="web"
          isMobile={true}
        />
      );

      // Mobile items can be either links or buttons depending on props
      const webElement =
        screen.queryByRole('button', { name: /web projects/i }) ||
        screen.getByRole('link', { name: /web projects/i });
      expect(webElement).toHaveClass('bg-border', 'dark:bg-white/20');
    });
  });
});
