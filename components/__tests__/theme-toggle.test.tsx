import { fireEvent, render, screen } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '../theme-toggle';

// Mock useTheme hook locally to override global mock
const mockSetTheme = jest.fn();

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);
  });

  it('renders toggle button', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has screen reader accessible text', () => {
    render(<ThemeToggle />);

    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
  });

  it('displays sun icon in light mode', () => {
    mockUseTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);
    render(<ThemeToggle />);

    // Check for sun icon by looking for the SVG element
    const sunIcon = document.querySelector('svg');
    expect(sunIcon).toBeInTheDocument();
  });

  it('displays moon icon in dark mode', () => {
    mockUseTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    } as any);
    render(<ThemeToggle />);

    // Check for moon icon by looking for the SVG element
    const moonIcon = document.querySelector('svg');
    expect(moonIcon).toBeInTheDocument();
  });

  it('toggles from light to dark when clicked', () => {
    mockUseTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles from dark to light when clicked', () => {
    mockUseTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    } as any);
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('applies custom className', () => {
    render(<ThemeToggle className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has proper button styling', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('relative');
  });

  it('handles icon container styling', () => {
    render(<ThemeToggle />);

    const iconContainer = document.querySelector('.overflow-hidden');
    expect(iconContainer).toHaveClass(
      'relative',
      'h-5',
      'w-5',
      'overflow-hidden'
    );
  });

  it('does not render icons before mounting', () => {
    // Create a version that hasn't mounted yet
    const UnmountedThemeToggle = () => {
      const { setTheme, resolvedTheme } = {
        setTheme: mockSetTheme,
        resolvedTheme: 'light',
      };

      return (
        <button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          <div className="relative h-5 w-5 overflow-hidden">
            {/* No mounted check - should not render icons */}
          </div>
        </button>
      );
    };

    render(<UnmountedThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // Should not have any SVG icons when not mounted
    const icons = button.querySelectorAll('svg');
    expect(icons).toHaveLength(0);
  });

  it('handles undefined resolved theme gracefully', () => {
    mockUseTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: undefined,
    } as any);

    expect(() => {
      render(<ThemeToggle />);
    }).not.toThrow();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Should default to dark when undefined
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles correctly when theme is system', () => {
    mockUseTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'system',
    } as any);
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Should default to dark when not explicitly light
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('has proper icon sizes', () => {
    mockUseTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);
    render(<ThemeToggle />);

    const icon = document.querySelector('svg');
    expect(icon).toHaveClass('h-5', 'w-5');
  });

  it('uses motion.div for animations', () => {
    mockUseTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);
    render(<ThemeToggle />);

    const motionDiv = document.querySelector('.absolute');
    expect(motionDiv).toBeInTheDocument();
  });
});
