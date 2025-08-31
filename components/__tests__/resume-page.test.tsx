import ResumePageClient from '@/components/resume-page';
import { ResumeViewType } from '@/data/constants';
import { useIsMobile } from '@/hooks/use-media-query';
import { useTabState } from '@/hooks/use-tab-state';
import { fireEvent, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

// Mock the hooks
jest.mock('@/hooks/use-tab-state');
jest.mock('@/hooks/use-media-query');

// Mock NavigationLayout
jest.mock('@/components/navigation-layout', () => ({
  NavigationLayout: ({
    children,
    activeFilter,
    onFilterChange,
    isResumePage,
  }: {
    children: ReactNode;
    activeFilter: string;
    onFilterChange: (value: string) => void;
    isResumePage: boolean;
    searchDisabled?: boolean;
    recentItems?: any[];
  }) => (
    <div
      data-testid="navigation-layout"
      data-active-filter={activeFilter}
      data-is-resume-page={isResumePage}
    >
      <button onClick={() => onFilterChange('html')} data-testid="filter-html">
        HTML
      </button>
      <button onClick={() => onFilterChange('pdf')} data-testid="filter-pdf">
        PDF
      </button>
      {children}
    </div>
  ),
}));

// Mock AnimatedTabs
jest.mock('@/components/animated-tabs', () => ({
  AnimatedTabs: ({
    value,
    tabItems,
    onValueChange,
    children,
    className,
    fullWidth,
  }: {
    defaultValue?: string;
    value: string;
    tabItems: Array<{ value: string; label: string }>;
    onValueChange: (value: string) => void;
    children: ReactNode;
    className?: string;
    fullWidth?: boolean;
  }) => (
    <div
      data-testid="animated-tabs"
      data-value={value}
      className={className}
      data-full-width={fullWidth}
    >
      {tabItems.map((item: { value: string; label: string }) => (
        <button
          key={item.value}
          onClick={() => onValueChange(item.value)}
          data-testid={`tab-${item.value}`}
        >
          {item.label}
        </button>
      ))}
      {children}
    </div>
  ),
}));

// Mock Card component
jest.mock('@/components/ui/card', () => ({
  Card: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
}));

// Mock TabsContent
jest.mock('@/components/ui/tabs', () => ({
  TabsContent: ({
    children,
    value,
    className,
  }: {
    children?: ReactNode;
    value: string;
    className?: string;
  }) => (
    <div data-testid="tabs-content" data-value={value} className={className}>
      {children}
    </div>
  ),
}));

// Mock getIconComponent
jest.mock('@/lib/icon-utils', () => ({
  getIconComponent: (iconName: string) => () => (
    <div data-testid={`icon-${iconName}`}>{iconName}</div>
  ),
}));

const mockUseTabState = useTabState as jest.MockedFunction<typeof useTabState>;
const mockUseIsMobile = useIsMobile as jest.MockedFunction<typeof useIsMobile>;

describe('ResumePageClient', () => {
  const defaultTabState = {
    activeTab: ResumeViewType.HTML as string,
    isInitialLoad: true,
    setActiveTab: jest.fn(),
    setIsInitialLoad: jest.fn(),
    handleTabChange: jest.fn(),
    handleValueChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTabState.mockReturnValue(defaultTabState);
    mockUseIsMobile.mockReturnValue(false);
  });

  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      render(<ResumePageClient />);
      expect(screen.getByTestId('navigation-layout')).toBeInTheDocument();
    });

    it('passes correct props to NavigationLayout', () => {
      render(<ResumePageClient />);
      const navigationLayout = screen.getByTestId('navigation-layout');

      expect(navigationLayout).toHaveAttribute(
        'data-active-filter',
        ResumeViewType.HTML
      );
      expect(navigationLayout).toHaveAttribute('data-is-resume-page', 'true');
    });

    it('renders AnimatedTabs with correct props', () => {
      render(<ResumePageClient />);
      const animatedTabs = screen.getByTestId('animated-tabs');

      expect(animatedTabs).toHaveAttribute('data-value', ResumeViewType.HTML);
      expect(animatedTabs).toHaveAttribute('data-full-width', 'true');
      expect(animatedTabs).toHaveClass('mb-0');
    });
  });

  describe('View Mode Switching', () => {
    it('defaults to HTML view mode', () => {
      render(<ResumePageClient />);

      expect(screen.getByTestId('animated-tabs')).toHaveAttribute(
        'data-value',
        ResumeViewType.HTML
      );
      expect(screen.getByTestId('card')).toBeInTheDocument(); // HTML content
    });

    it('switches to PDF view when PDF tab is selected', () => {
      const mockHandleValueChange = jest.fn();
      mockUseTabState.mockReturnValue({
        ...defaultTabState,
        activeTab: ResumeViewType.PDF as string,
        handleValueChange: mockHandleValueChange,
      });

      render(<ResumePageClient />);

      expect(screen.getByTestId('animated-tabs')).toHaveAttribute(
        'data-value',
        ResumeViewType.PDF
      );
      expect(screen.getByTitle('Resume PDF')).toBeInTheDocument();
    });

    it('calls handleValueChange when tab is clicked', () => {
      const mockHandleValueChange = jest.fn();
      mockUseTabState.mockReturnValue({
        ...defaultTabState,
        handleValueChange: mockHandleValueChange,
      });

      render(<ResumePageClient />);
      fireEvent.click(screen.getByTestId('tab-pdf'));

      expect(mockHandleValueChange).toHaveBeenCalledWith('pdf');
    });

    it('calls handleTabChange when filter is changed', () => {
      const mockHandleTabChange = jest.fn();
      mockUseTabState.mockReturnValue({
        ...defaultTabState,
        handleTabChange: mockHandleTabChange,
      });

      render(<ResumePageClient />);
      fireEvent.click(screen.getByTestId('filter-pdf'));

      expect(mockHandleTabChange).toHaveBeenCalledWith('pdf');
    });
  });

  describe('PDF View', () => {
    beforeEach(() => {
      mockUseTabState.mockReturnValue({
        ...defaultTabState,
        activeTab: ResumeViewType.PDF as string,
      });
    });

    it('renders PDF iframe in PDF mode', () => {
      render(<ResumePageClient />);

      const iframe = screen.getByTitle('Resume PDF');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute(
        'src',
        '/jeffreypolasz-resume.pdf#toolbar=0&navpanes=0&view=FitH'
      );
      expect(iframe).toHaveClass('w-full', 'h-full');
    });

    it('shows mobile warning on mobile in PDF mode', () => {
      mockUseIsMobile.mockReturnValue(true);

      render(<ResumePageClient />);

      expect(
        screen.getByText('HTML View is recommended for mobile')
      ).toBeInTheDocument();
    });

    it('does not show mobile warning on desktop in PDF mode', () => {
      mockUseIsMobile.mockReturnValue(false);

      render(<ResumePageClient />);

      expect(
        screen.queryByText('HTML View is recommended for mobile')
      ).not.toBeInTheDocument();
    });
  });

  describe('HTML View', () => {
    it('renders HTML content in HTML mode', () => {
      render(<ResumePageClient />);

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByText('Jeffrey Polasz')).toBeInTheDocument();
      expect(screen.getByText('519-277-5337')).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('Experience')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Education')).toBeInTheDocument();
    });

    it('renders contact information with proper links', () => {
      render(<ResumePageClient />);

      const emailLink = screen.getByRole('link', {
        name: 'jeff_polasz@hotmail.com',
      });
      expect(emailLink).toHaveAttribute(
        'href',
        'mailto:jeff_polasz@hotmail.com'
      );

      const websiteLink = screen.getByRole('link', { name: 'jeffpolasz.com' });
      expect(websiteLink).toHaveAttribute('href', 'https://jeffpolasz.com');
      expect(websiteLink).toHaveAttribute('target', '_blank');

      const githubLink = screen.getByRole('link', {
        name: 'github.com/DigitalEpidemic',
      });
      expect(githubLink).toHaveAttribute(
        'href',
        'https://github.com/DigitalEpidemic'
      );
      expect(githubLink).toHaveAttribute('target', '_blank');
    });

    it('renders skills sections', () => {
      render(<ResumePageClient />);

      expect(screen.getByText('Languages:')).toBeInTheDocument();
      expect(screen.getByText('Frameworks/Libraries:')).toBeInTheDocument();
      expect(screen.getByText('Tools:')).toBeInTheDocument();

      // Check for some specific technologies
      expect(screen.getByText(/JavaScript, TypeScript/)).toBeInTheDocument();
      expect(screen.getByText(/React, Vite, React Native/)).toBeInTheDocument();
      expect(screen.getByText(/Docker, SQL Server/)).toBeInTheDocument();
    });

    it('renders work experience with proper structure', () => {
      render(<ResumePageClient />);

      expect(screen.getByText('Developer')).toBeInTheDocument();
      expect(screen.getByText(/Vehikl - Waterloo, ON/)).toBeInTheDocument();
      expect(screen.getByText('Sep 2020 - Present')).toBeInTheDocument();

      expect(screen.getByText('Unity Game Developer')).toBeInTheDocument();
      expect(screen.getByText(/Adknown - Guelph, ON/)).toBeInTheDocument();

      expect(
        screen.getByText('Web Developer & Graphic Designer')
      ).toBeInTheDocument();
      expect(screen.getByText(/Freelance - Cambridge, ON/)).toBeInTheDocument();
    });

    it('renders project section with external links', () => {
      render(<ResumePageClient />);

      expect(screen.getByText('AI Voice Translator')).toBeInTheDocument();
      expect(screen.getByText('Retro Tool')).toBeInTheDocument();
      expect(screen.getByText('PowerCalc')).toBeInTheDocument();

      // Check external project links
      const githubLink = screen.getByRole('link', {
        name: /github\.com\/DigitalEpidemic\/ai-voice-translator/,
      });
      expect(githubLink).toHaveAttribute('target', '_blank');

      const retroLink = screen.getByRole('link', {
        name: /retro-tool\.netlify\.app/,
      });
      expect(retroLink).toHaveAttribute('target', '_blank');
    });

    it('renders education section', () => {
      render(<ResumePageClient />);

      expect(screen.getByText('Western University')).toBeInTheDocument();
      expect(
        screen.getByText(/Major in Computer Science, Minor in Game Development/)
      ).toBeInTheDocument();
      expect(screen.getByText('Sep 2015 - Jan 2018')).toBeInTheDocument();
    });
  });

  describe('Animation States', () => {
    it('uses initial load animation when isInitialLoad is true', () => {
      mockUseTabState.mockReturnValue({
        ...defaultTabState,
        isInitialLoad: true,
      });

      render(<ResumePageClient />);
      // The component should render without crashing when initial load is true
      expect(screen.getByTestId('navigation-layout')).toBeInTheDocument();
    });

    it('uses view change animation when isInitialLoad is false', () => {
      mockUseTabState.mockReturnValue({
        ...defaultTabState,
        isInitialLoad: false,
      });

      render(<ResumePageClient />);
      // The component should render without crashing when initial load is false
      expect(screen.getByTestId('navigation-layout')).toBeInTheDocument();
    });
  });

  describe('Tab Items Configuration', () => {
    it('generates tab items with correct labels', () => {
      render(<ResumePageClient />);

      // Check that tab items are rendered with correct labels
      expect(screen.getByTestId('tab-html')).toBeInTheDocument();
      expect(screen.getByTestId('tab-pdf')).toBeInTheDocument();
      expect(screen.getByText('r/html')).toBeInTheDocument();
      expect(screen.getByText('r/pdf')).toBeInTheDocument();
    });
  });

  describe('Mobile Responsiveness', () => {
    it('applies correct responsive classes', () => {
      render(<ResumePageClient />);

      // Check that main content container has the right classes
      const container = screen
        .getByText('Jeffrey Polasz')
        .closest('.max-w-\\[1000px\\]');
      expect(container).toHaveClass('max-w-[1000px]', 'mx-auto', 'px-4');
    });

    it('handles mobile layout properly', () => {
      mockUseIsMobile.mockReturnValue(true);

      render(<ResumePageClient />);

      // Component should still render properly on mobile
      expect(screen.getByTestId('navigation-layout')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('integrates with useTabState hook correctly', () => {
      const customTabState = {
        activeTab: ResumeViewType.PDF as string,
        isInitialLoad: false,
        setActiveTab: jest.fn(),
        setIsInitialLoad: jest.fn(),
        handleTabChange: jest.fn(),
        handleValueChange: jest.fn(),
      };

      mockUseTabState.mockReturnValue(customTabState);

      render(<ResumePageClient />);

      expect(mockUseTabState).toHaveBeenCalledWith({
        initialValue: ResumeViewType.HTML,
      });
    });

    it('integrates with useIsMobile hook correctly', () => {
      render(<ResumePageClient />);

      expect(mockUseIsMobile).toHaveBeenCalled();
    });
  });

  describe('Error Boundaries', () => {
    it('handles missing external links gracefully', () => {
      render(<ResumePageClient />);

      // All links should render without throwing errors
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and structure', () => {
      render(<ResumePageClient />);

      // Check for proper heading hierarchy
      const mainHeading = screen.getByRole('heading', {
        name: 'Jeffrey Polasz',
      });
      expect(mainHeading).toBeInTheDocument();

      // Check for section headings
      const skillsHeading = screen.getByRole('heading', { name: 'Skills' });
      expect(skillsHeading).toBeInTheDocument();
    });

    it('provides proper iframe title for PDF view', () => {
      mockUseTabState.mockReturnValue({
        ...defaultTabState,
        activeTab: ResumeViewType.PDF as string,
      });

      render(<ResumePageClient />);

      const iframe = screen.getByTitle('Resume PDF');
      expect(iframe).toBeInTheDocument();
    });
  });
});
