import { ProjectType } from '@/data/constants';
import { POSTS } from '@/data/posts';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProfileHeader from '../profile-header';

// Mock the useToast hook
const mockToast = jest.fn();
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
  writable: true,
});

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  };
});

// Mock profile image import
jest.mock('@/public/profile.jpg', () => '/profile.jpg');

describe('ProfileHeader', () => {
  const defaultProps = {
    displayName: 'Jeffrey Polasz',
    username: 'DigitalEpidemic',
    description:
      'Full-stack developer passionate about creating amazing web experiences.',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful clipboard write
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValue(undefined);
  });

  it('renders display name and username', () => {
    render(<ProfileHeader {...defaultProps} />);

    expect(screen.getByText('Jeffrey Polasz')).toBeInTheDocument();
    expect(screen.getByText('u/DigitalEpidemic')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ProfileHeader {...defaultProps} />);

    expect(
      screen.getByText(
        'Full-stack developer passionate about creating amazing web experiences.'
      )
    ).toBeInTheDocument();
  });

  it('renders profile image with correct attributes', () => {
    render(<ProfileHeader {...defaultProps} />);

    const profileImage = screen.getByAltText('DigitalEpidemic');
    expect(profileImage).toHaveAttribute('src', '/profile.jpg');
    expect(profileImage).toHaveClass('w-20', 'h-20', 'rounded-full');
  });

  it('displays project counts correctly', () => {
    const webProjectsLength = POSTS.filter(
      (post) => post.category === ProjectType.WEB
    ).length;
    const gameProjectsLength = POSTS.filter(
      (post) => post.category === ProjectType.GAME
    ).length;

    render(<ProfileHeader {...defaultProps} />);

    expect(screen.getByText(webProjectsLength.toString())).toBeInTheDocument(); // Web projects
    expect(screen.getByText(gameProjectsLength.toString())).toBeInTheDocument(); // Game projects
    expect(screen.getByText('Web projects')).toBeInTheDocument();
    expect(screen.getByText('Game projects')).toBeInTheDocument();
  });

  it('displays cake day', () => {
    render(<ProfileHeader {...defaultProps} />);

    expect(screen.getByText('Oct 28, 1996')).toBeInTheDocument();
    expect(screen.getByText('Cake day')).toBeInTheDocument();
  });

  it('calculates and displays years of experience', () => {
    render(<ProfileHeader {...defaultProps} />);

    expect(screen.getByText('Years of experience')).toBeInTheDocument();
    // Should show some number of years (depends on current date) - use getAllByText since there are multiple numbers
    expect(screen.getAllByText(/^\d+$/).length).toBeGreaterThan(0);
  });

  it('renders share button', () => {
    render(<ProfileHeader {...defaultProps} />);

    const shareButton = screen.getByRole('button');
    expect(shareButton).toBeInTheDocument();
  });

  it('copies URL to clipboard when share button is clicked', async () => {
    render(<ProfileHeader {...defaultProps} />);

    const shareButton = screen.getByRole('button');
    fireEvent.click(shareButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'https://jeffpolasz.com'
    );

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Website URL copied!',
        description:
          'https://jeffpolasz.com has been copied to your clipboard.',
      });
    });
  });

  it('shows error toast when clipboard API fails', async () => {
    // Mock clipboard API to fail
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(
      new Error('Clipboard failed')
    );

    // Mock document.execCommand to succeed
    const mockExecCommand = jest.fn().mockReturnValue(true);
    Object.defineProperty(document, 'execCommand', {
      value: mockExecCommand,
      writable: true,
    });

    render(<ProfileHeader {...defaultProps} />);

    const shareButton = screen.getByRole('button');
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Website URL copied!',
        description:
          'https://jeffpolasz.com has been copied to your clipboard.',
      });
    });
  });

  it('shows fallback error when both clipboard and execCommand fail', async () => {
    // Mock clipboard API to fail
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(
      new Error('Clipboard failed')
    );

    // Mock document.execCommand to fail
    const mockExecCommand = jest.fn().mockReturnValue(false);
    Object.defineProperty(document, 'execCommand', {
      value: mockExecCommand,
      writable: true,
    });

    render(<ProfileHeader {...defaultProps} />);

    const shareButton = screen.getByRole('button');
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Copy failed',
        description:
          'Unable to copy website URL. Please copy manually: https://jeffpolasz.com',
        variant: 'destructive',
      });
    });
  });

  it('disables share button while copying', async () => {
    render(<ProfileHeader {...defaultProps} />);

    const shareButton = screen.getByRole('button');
    fireEvent.click(shareButton);

    // Button should be disabled immediately
    expect(shareButton).toBeDisabled();

    // Wait for the operation to complete and button to re-enable
    await waitFor(
      () => {
        expect(shareButton).not.toBeDisabled();
      },
      { timeout: 600 }
    );
  });

  it('applies spinning animation to share icon when clicked', () => {
    render(<ProfileHeader {...defaultProps} />);

    const shareButton = screen.getByRole('button');
    const shareIcon = shareButton.querySelector('svg');

    expect(shareIcon).not.toHaveClass('animate-spin');

    fireEvent.click(shareButton);

    expect(shareIcon).toHaveClass('animate-spin');
  });

  it('has proper banner background styling', () => {
    const { container } = render(<ProfileHeader {...defaultProps} />);

    const banner = container.querySelector('.bg-cover');
    expect(banner).toHaveStyle('background-image: url(/profileBanner.jpg)');
  });

  it('renders with proper card styling', () => {
    const { container } = render(<ProfileHeader {...defaultProps} />);

    const card = container.firstChild;
    expect(card).toHaveClass('bg-card', 'border', 'border-border', 'rounded');
  });
});
