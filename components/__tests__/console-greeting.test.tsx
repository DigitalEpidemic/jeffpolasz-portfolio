import { render } from '@testing-library/react';
import { ConsoleGreeting } from '../console-greeting';

describe('ConsoleGreeting', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('renders without crashing', () => {
    render(<ConsoleGreeting />);
  });

  it('returns null (renders nothing to DOM)', () => {
    const { container } = render(<ConsoleGreeting />);
    expect(container.firstChild).toBeNull();
  });

  it('logs welcome message to console on mount', () => {
    render(<ConsoleGreeting />);

    // Check that console.log was called multiple times for the ASCII art
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy.mock.calls.length).toBeGreaterThan(10);

    // Check specific welcome messages
    expect(consoleSpy).toHaveBeenCalledWith(
      '%cWelcome to my portfolio!',
      'color: #0066CC; font-size: 16px; font-weight: bold;'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      '%cWhatcha looking for over here? 👀',
      'color: #0066CC; font-size: 12px;'
    );
  });

  it('logs ASCII art with correct styling', () => {
    render(<ConsoleGreeting />);

    // Check that ASCII art is logged with orange color
    const asciiArtCalls = consoleSpy.mock.calls.filter((call) =>
      call[1]?.includes('color: #FF4500')
    );

    expect(asciiArtCalls.length).toBeGreaterThan(0);

    // Check specific ASCII art lines
    expect(consoleSpy).toHaveBeenCalledWith(
      '%c█   █ █████ █     █     █████',
      'color: #FF4500; font-family: monospace; font-size: 14px;'
    );
  });

  it('only runs effect once on mount', () => {
    const { rerender } = render(<ConsoleGreeting />);
    const initialCallCount = consoleSpy.mock.calls.length;

    // Rerender the component
    rerender(<ConsoleGreeting />);

    // Should not have additional calls since useEffect has empty dependency array
    expect(consoleSpy.mock.calls.length).toBe(initialCallCount);
  });
});
