import { ProjectType } from '@/data/constants';
import { useIsMobile } from '@/hooks/use-media-query';
import { fireEvent, render, screen } from '@testing-library/react';
import PostPageClient from '../post-page';

// Most mocks are now global, but some test-specific mocks remain below

// Mock components used by PostPageClient
jest.mock('@/components/image-gallery', () => ({
  __esModule: true,
  default: ({ images }: any) => (
    <div data-testid="image-gallery">
      Image Gallery with {images?.length || 0} images
    </div>
  ),
}));

jest.mock('@/components/navigation-layout', () => ({
  NavigationLayout: ({ children }: any) => <div>{children}</div>,
}));

// PostActions is now mocked globally

jest.mock('@/components/structured-data', () => ({
  ProjectStructuredData: () => null,
}));

const mockPost = {
  title: 'Test Project',
  slug: 'test-project',
  category: ProjectType.WEB,
  username: 'testuser',
  publishedAt: new Date('2023-01-01'),
  votes: 42,
  content: 'This is a test project content.',
  detailedContent: 'This is detailed content.\n\nSecond paragraph.',
  image: '/test-image.jpg',
  tags: ['React', 'TypeScript'],
  github: 'https://github.com/test/repo',
  demo: 'https://demo.example.com',
  keyFeatures: ['Feature 1', 'Feature 2'],
  technologies: ['React', 'Next.js'],
  projectPurpose: 'This project was created to test components.',
  problemSolved: 'Testing component rendering',
  screenshots: [
    { url: '/screenshot1.jpg', caption: 'Screenshot 1' },
    { url: '/screenshot2.jpg', caption: 'Screenshot 2' },
  ],
  video: 'https://example.com/video',
  views: '1.5K',
  stars: '25',
};

const mockUseIsMobile = useIsMobile as jest.MockedFunction<typeof useIsMobile>;

describe('PostPageClient', () => {
  beforeEach(() => {
    // Default to desktop mode
    mockUseIsMobile.mockReturnValue(false);
  });

  it('renders post not found when post is null', () => {
    render(<PostPageClient post={null as any} />);

    expect(screen.getByText('Post not found')).toBeInTheDocument();
    expect(screen.getByText('Return to home')).toBeInTheDocument();
  });

  it('renders post content correctly', () => {
    render(<PostPageClient post={mockPost} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test project content.')
    ).toBeInTheDocument();
    expect(screen.getByText('Posted by u/testuser')).toBeInTheDocument();
  });

  it('renders tags when provided', () => {
    render(<PostPageClient post={mockPost} />);

    expect(screen.getAllByText('React')).toHaveLength(2); // One in tags, one in technologies
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders detailed content with paragraphs', () => {
    render(<PostPageClient post={mockPost} />);

    expect(screen.getByText('This is detailed content.')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
  });

  it('renders key features section', () => {
    render(<PostPageClient post={mockPost} />);

    expect(screen.getByText('KEY FEATURES')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  it('renders technologies section', () => {
    render(<PostPageClient post={mockPost} />);

    expect(screen.getByText('TECHNOLOGIES')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('renders project purpose section', () => {
    render(<PostPageClient post={mockPost} />);

    expect(screen.getByText('PROJECT PURPOSE')).toBeInTheDocument();
    expect(
      screen.getByText('This project was created to test components.')
    ).toBeInTheDocument();
  });

  it('renders problem solved section when provided', () => {
    render(<PostPageClient post={mockPost} />);

    expect(screen.getByText('PROBLEM SOLVED')).toBeInTheDocument();
    expect(screen.getByText('Testing component rendering')).toBeInTheDocument();
  });

  it('renders project showcase section', () => {
    render(<PostPageClient post={mockPost} />);

    expect(screen.getByText('Project Showcase')).toBeInTheDocument();
  });

  it('renders video when provided', () => {
    render(<PostPageClient post={mockPost} />);

    expect(screen.getByText('Demo Video')).toBeInTheDocument();
    expect(screen.getByTitle('Project Demo Video')).toBeInTheDocument();
  });

  it('renders back buttons for navigation', () => {
    render(<PostPageClient post={mockPost} />);

    // Desktop back button (icon only)
    const backButtons = screen.getAllByRole('link');
    const homeLinks = backButtons.filter(
      (link) => link.getAttribute('href') === '/'
    );
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  it('renders stats section with views and stars', () => {
    render(<PostPageClient post={mockPost} />);

    expect(screen.getByText('1.5K')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Views')).toBeInTheDocument();
    expect(screen.getByText('Stars')).toBeInTheDocument();
  });

  it('renders default fallback when no screenshots available', () => {
    const postWithoutScreenshots = { ...mockPost, screenshots: [] };
    render(<PostPageClient post={postWithoutScreenshots} />);

    expect(
      screen.getByText('No additional screenshots available.')
    ).toBeInTheDocument();
    expect(screen.getByText('Visit GitHub repository')).toBeInTheDocument();
  });

  it('handles post without optional fields', () => {
    const minimalPost = {
      title: 'Minimal Post',
      slug: 'minimal-post',
      category: ProjectType.GAME,
      username: 'minimaluser',
      publishedAt: new Date('2023-01-01'),
      votes: 5,
      content: 'Minimal content.',
    };

    render(<PostPageClient post={minimalPost} />);

    expect(screen.getByText('Minimal Post')).toBeInTheDocument();
    expect(screen.getByText('Minimal content.')).toBeInTheDocument();
    expect(screen.getByText('Posted by u/minimaluser')).toBeInTheDocument();
  });

  it('renders fallback technologies for WEB projects when technologies are undefined', () => {
    const postWithoutTechnologies = {
      ...mockPost,
      technologies: undefined,
      category: ProjectType.WEB,
    };

    render(<PostPageClient post={postWithoutTechnologies} />);

    // Should render fallback technologies for WEB projects
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getAllByText('React')).toHaveLength(2); // Fallback React + original React in tags
  });

  it('renders fallback technologies for GAME projects when technologies are undefined', () => {
    const postWithoutTechnologies = {
      ...mockPost,
      technologies: undefined,
      category: ProjectType.GAME,
    };

    render(<PostPageClient post={postWithoutTechnologies} />);

    // Should render fallback technologies for GAME projects
    expect(screen.getByText('C#')).toBeInTheDocument();
    expect(screen.getByText('Unity')).toBeInTheDocument();
  });

  it('renders default views when views not provided', () => {
    const postWithoutViews = { ...mockPost, views: undefined };

    render(<PostPageClient post={postWithoutViews} />);

    // Should render default views value
    expect(screen.getByText('1.2K')).toBeInTheDocument();
  });

  it('renders default stars when stars not provided', () => {
    const postWithoutStars = { ...mockPost, stars: undefined };

    render(<PostPageClient post={postWithoutStars} />);

    // Should render default stars value (likely "0" or some default)
    // Check that stars section is still rendered
    expect(screen.getByText('Stars')).toBeInTheDocument();
  });

  it('renders mobile layout when screen is small (matches original lg:hidden logic)', () => {
    mockUseIsMobile.mockReturnValue(true); // Simulates small screen OR short height

    render(<PostPageClient post={mockPost} />);

    // Should render mobile layout (only one version)
    expect(screen.getByText('KEY FEATURES')).toBeInTheDocument();
    expect(screen.getByText('TECHNOLOGIES')).toBeInTheDocument();
    expect(screen.getByText('PROJECT PURPOSE')).toBeInTheDocument();

    // Verify it's the mobile version (not duplicated)
    expect(screen.getAllByText('KEY FEATURES')).toHaveLength(1);
  });

  it('renders desktop layout when screen is large AND tall (matches original lg:block logic)', () => {
    mockUseIsMobile.mockReturnValue(false); // Simulates large screen AND tall height

    render(<PostPageClient post={mockPost} />);

    // Should render desktop layout (only one version)
    expect(screen.getByText('KEY FEATURES')).toBeInTheDocument();
    expect(screen.getByText('TECHNOLOGIES')).toBeInTheDocument();
    expect(screen.getByText('PROJECT PURPOSE')).toBeInTheDocument();

    // Verify it's the desktop version (not duplicated)
    expect(screen.getAllByText('KEY FEATURES')).toHaveLength(1);
  });

  it('handles animation callback for desktop scroll re-enabling', () => {
    mockUseIsMobile.mockReturnValue(false); // Desktop mode

    // Mock querySelector to return a test element
    const mockElement = {
      style: { overflowY: '' },
    };
    const originalQuerySelector = document.querySelector;
    document.querySelector = jest.fn((selector) => {
      if (selector === '[data-sidebar-container]') {
        return mockElement as any;
      }
      return originalQuerySelector.call(document, selector);
    });

    render(<PostPageClient post={mockPost} />);

    // Find and click the sidebar container to trigger animation callback
    const sidebarContainer = screen.getByTestId('sidebar-container');
    expect(sidebarContainer).toBeInTheDocument();

    // Simulate animation complete
    fireEvent.click(sidebarContainer);

    // Verify the callback executed and set overflowY
    expect(mockElement.style.overflowY).toBe('auto');

    // Restore original querySelector
    document.querySelector = originalQuerySelector;
  });

  it('handles animation callback for mobile (no scroll changes)', () => {
    mockUseIsMobile.mockReturnValue(true); // Mobile mode

    const mockElement = {
      style: { overflowY: '' },
    };
    document.querySelector = jest.fn(() => mockElement as any);

    render(<PostPageClient post={mockPost} />);

    // In mobile mode, the desktop sidebar won't be rendered
    // This tests the isMobile branch in the animation callback
    expect(screen.getByText('Test Project')).toBeInTheDocument();

    // The callback should not modify overflowY in mobile mode
    expect(mockElement.style.overflowY).toBe('');
  });
});
