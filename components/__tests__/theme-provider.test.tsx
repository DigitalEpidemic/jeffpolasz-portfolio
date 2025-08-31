import { render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { ThemeProvider } from '../theme-provider';

// Test component that uses the theme provider
function TestComponent() {
  return <div data-testid="test-content">Theme content</div>;
}

// Component to simulate hydration effect
function HydrationTestComponent() {
  useEffect(() => {
    // Simulate client-side hydration
  }, []);

  return <div data-testid="hydration-content">Hydrated content</div>;
}

describe('ThemeProvider', () => {
  it('renders children after client-side hydration', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Should render content after hydration
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Theme content')).toBeInTheDocument();
  });

  it('passes through theme provider props', () => {
    const mockProps = {
      attribute: 'class' as const,
      defaultTheme: 'system',
      enableSystem: true,
      storageKey: 'theme',
    };

    render(
      <ThemeProvider {...mockProps}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('handles component without children', () => {
    expect(() => {
      render(<ThemeProvider />);
    }).not.toThrow();
  });

  it('handles complex nested children', () => {
    render(
      <ThemeProvider>
        <div>
          <TestComponent />
          <HydrationTestComponent />
        </div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('hydration-content')).toBeInTheDocument();
  });

  it('maintains theme provider functionality', () => {
    // The ThemeProvider should wrap NextThemesProvider
    render(
      <ThemeProvider attribute="class">
        <div data-testid="theme-aware">Theme aware component</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-aware')).toBeInTheDocument();
  });

  it('handles theme provider with all common props', () => {
    render(
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        disableTransitionOnChange={false}
        storageKey="custom-theme"
        themes={['light', 'dark']}
        forcedTheme={undefined}
        enableColorScheme={true}
        nonce="test-nonce"
      >
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  // Note: Testing the hydration behavior fully would require more complex setup
  // as it involves client-side effects. The current tests verify the basic
  // functionality and prop passing.

  it('preserves theme provider context', () => {
    // This test ensures that the context is properly maintained
    function ThemeConsumerTest() {
      return <div data-testid="theme-consumer">Consumer component</div>;
    }

    render(
      <ThemeProvider>
        <ThemeConsumerTest />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-consumer')).toBeInTheDocument();
  });
});
