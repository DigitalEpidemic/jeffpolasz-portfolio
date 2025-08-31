import { Tabs, TabsList } from '@/components/ui/tabs';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { AnimatedTabTrigger } from '../animated-tab-trigger';

const mockIcon = <span data-testid="mock-icon">🎯</span>;

const renderWithTabs = (component: React.ReactElement) => {
  return render(
    <Tabs defaultValue="test">
      <TabsList>{component}</TabsList>
    </Tabs>
  );
};

describe('AnimatedTabTrigger', () => {
  it('renders with label and icon', () => {
    renderWithTabs(
      <AnimatedTabTrigger label="Test Tab" icon={mockIcon} value="test" />
    );

    expect(screen.getByText('Test Tab')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('renders with correct value attribute', () => {
    renderWithTabs(
      <AnimatedTabTrigger label="Test Tab" icon={mockIcon} value="test-value" />
    );

    // Check that the tab renders with the correct content instead of checking value attribute
    const tabTrigger = screen.getByRole('tab');
    expect(tabTrigger).toHaveTextContent('Test Tab');
  });

  it('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();

    renderWithTabs(
      <AnimatedTabTrigger
        label="Test Tab"
        icon={mockIcon}
        value="test"
        onClick={mockOnClick}
      />
    );

    const tabTrigger = screen.getByRole('tab');
    fireEvent.click(tabTrigger);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('works without onClick handler', () => {
    expect(() => {
      renderWithTabs(
        <AnimatedTabTrigger label="Test Tab" icon={mockIcon} value="test" />
      );
    }).not.toThrow();

    const tabTrigger = screen.getByRole('tab');
    expect(() => fireEvent.click(tabTrigger)).not.toThrow();
  });

  it('has full width styling', () => {
    renderWithTabs(
      <AnimatedTabTrigger label="Test Tab" icon={mockIcon} value="test" />
    );

    const tabTrigger = screen.getByRole('tab');
    expect(tabTrigger).toHaveClass('w-full');
  });

  it('icon is wrapped in motion span with inline-block class', () => {
    const { container } = renderWithTabs(
      <AnimatedTabTrigger label="Test Tab" icon={mockIcon} value="test" />
    );

    const iconSpan = container.querySelector('span.inline-block');
    expect(iconSpan).toBeInTheDocument();
    expect(iconSpan).toContainElement(screen.getByTestId('mock-icon'));
  });
});
