import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnimatedTabs } from '../animated-tabs';

const mockTabItems = [
  { value: 'tab1', label: 'Tab 1', icon: <span data-testid="icon-1">🎯</span> },
  { value: 'tab2', label: 'Tab 2', icon: <span data-testid="icon-2">🚀</span> },
  { value: 'tab3', label: 'Tab 3' },
];

describe('AnimatedTabs', () => {
  it('renders all tab items', () => {
    render(<AnimatedTabs tabItems={mockTabItems} defaultValue="tab1" />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('renders icons when provided', () => {
    render(<AnimatedTabs tabItems={mockTabItems} defaultValue="tab1" />);

    expect(screen.getByTestId('icon-1')).toBeInTheDocument();
    expect(screen.getByTestId('icon-2')).toBeInTheDocument();
  });

  it('sets default active tab', () => {
    render(<AnimatedTabs tabItems={mockTabItems} defaultValue="tab2" />);

    const tab2 = screen.getByRole('tab', { name: /Tab 2/ });
    expect(tab2).toHaveAttribute('data-state', 'active');
  });

  it('handles onValueChange callback through controlled value prop', () => {
    const mockOnValueChange = jest.fn();

    const { rerender } = render(
      <AnimatedTabs
        tabItems={mockTabItems}
        value="tab1"
        onValueChange={mockOnValueChange}
      />
    );

    expect(screen.getByRole('tab', { name: /Tab 1/ })).toHaveAttribute(
      'data-state',
      'active'
    );

    // Simulate external value change (like from a parent component)
    rerender(
      <AnimatedTabs
        tabItems={mockTabItems}
        value="tab2"
        onValueChange={mockOnValueChange}
      />
    );

    expect(screen.getByRole('tab', { name: /Tab 2/ })).toHaveAttribute(
      'data-state',
      'active'
    );
  });

  it('updates active tab when value prop changes', () => {
    const { rerender } = render(
      <AnimatedTabs tabItems={mockTabItems} value="tab1" />
    );

    expect(screen.getByRole('tab', { name: /Tab 1/ })).toHaveAttribute(
      'data-state',
      'active'
    );

    rerender(<AnimatedTabs tabItems={mockTabItems} value="tab3" />);

    expect(screen.getByRole('tab', { name: /Tab 3/ })).toHaveAttribute(
      'data-state',
      'active'
    );
  });

  it('applies fullWidth styling with 2 tabs', () => {
    const twoTabs = mockTabItems.slice(0, 2);
    const { container } = render(
      <AnimatedTabs tabItems={twoTabs} fullWidth defaultValue="tab1" />
    );

    const tabsList = container.querySelector('[role="tablist"]');
    expect(tabsList).toHaveClass('grid-cols-2');
  });

  it('applies fullWidth styling with 4 tabs', () => {
    const fourTabs = [...mockTabItems, { value: 'tab4', label: 'Tab 4' }];
    const { container } = render(
      <AnimatedTabs tabItems={fourTabs} fullWidth defaultValue="tab1" />
    );

    const tabsList = container.querySelector('[role="tablist"]');
    expect(tabsList).toHaveClass('grid-cols-4');
  });

  it('applies default grid-cols-3 when not fullWidth', () => {
    const { container } = render(
      <AnimatedTabs tabItems={mockTabItems} defaultValue="tab1" />
    );

    const tabsList = container.querySelector('[role="tablist"]');
    expect(tabsList).toHaveClass('grid-cols-3');
  });

  it('applies grid-cols-3 with fullWidth for 3 tabs (default case)', () => {
    const { container } = render(
      <AnimatedTabs tabItems={mockTabItems} fullWidth defaultValue="tab1" />
    );

    const tabsList = container.querySelector('[role="tablist"]');
    expect(tabsList).toHaveClass('grid-cols-3');
  });

  it('applies grid-cols-3 with fullWidth for 5 tabs (fallback case)', () => {
    const fiveTabs = [
      ...mockTabItems,
      { value: 'tab4', label: 'Tab 4' },
      { value: 'tab5', label: 'Tab 5' },
    ];
    const { container } = render(
      <AnimatedTabs tabItems={fiveTabs} fullWidth defaultValue="tab1" />
    );

    const tabsList = container.querySelector('[role="tablist"]');
    expect(tabsList).toHaveClass('grid-cols-3');
  });

  it('renders children content', () => {
    render(
      <AnimatedTabs tabItems={mockTabItems} defaultValue="tab1">
        <div data-testid="tab-content">Tab content here</div>
      </AnimatedTabs>
    );

    expect(screen.getByTestId('tab-content')).toBeInTheDocument();
    expect(screen.getByText('Tab content here')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedTabs
        tabItems={mockTabItems}
        defaultValue="tab1"
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders animated indicator', () => {
    const { container } = render(
      <AnimatedTabs tabItems={mockTabItems} defaultValue="tab1" />
    );

    const indicator = container.querySelector('.bg-primary.rounded-full');
    expect(indicator).toBeInTheDocument();
  });

  it('handles tabs without icons', () => {
    const tabsWithoutIcons = [
      { value: 'tab1', label: 'Tab 1' },
      { value: 'tab2', label: 'Tab 2' },
    ];

    render(<AnimatedTabs tabItems={tabsWithoutIcons} defaultValue="tab1" />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('has proper tab roles and attributes', () => {
    render(<AnimatedTabs tabItems={mockTabItems} defaultValue="tab1" />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    // Check that tabs have the correct content instead of value attribute
    expect(tabs[0]).toHaveTextContent('Tab 1');
    expect(tabs[1]).toHaveTextContent('Tab 2');
    expect(tabs[2]).toHaveTextContent('Tab 3');
  });

  it('calls onTabStart on mousedown', () => {
    const mockOnValueChange = jest.fn();
    render(
      <AnimatedTabs
        tabItems={mockTabItems}
        defaultValue="tab1"
        onValueChange={mockOnValueChange}
      />
    );

    const tab2 = screen.getByRole('tab', { name: /Tab 2/ });
    fireEvent.mouseDown(tab2);

    expect(mockOnValueChange).toHaveBeenCalledWith('tab2');
  });

  it('calls onTabStart on touchstart', () => {
    const mockOnValueChange = jest.fn();
    render(
      <AnimatedTabs
        tabItems={mockTabItems}
        defaultValue="tab1"
        onValueChange={mockOnValueChange}
      />
    );

    const tab3 = screen.getByRole('tab', { name: /Tab 3/ });
    fireEvent.touchStart(tab3);

    expect(mockOnValueChange).toHaveBeenCalledWith('tab3');
  });

  it('calls handleTabChange and updates animation key on tab click', async () => {
    const user = userEvent.setup();
    const mockOnValueChange = jest.fn();

    render(
      <AnimatedTabs
        tabItems={mockTabItems}
        defaultValue="tab1"
        onValueChange={mockOnValueChange}
      />
    );

    const tab2 = screen.getByRole('tab', { name: /Tab 2/ });
    await user.click(tab2);

    expect(mockOnValueChange).toHaveBeenCalledWith('tab2');
    expect(tab2).toHaveAttribute('data-state', 'active');
  });

  it('handles ResizeObserver and updates indicator on resize', () => {
    // Mock ResizeObserver
    const mockResizeObserver = jest.fn();
    const mockObserve = jest.fn();
    const mockDisconnect = jest.fn();

    mockResizeObserver.mockImplementation((callback) => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
      callback,
    }));

    global.ResizeObserver = mockResizeObserver;

    const { container } = render(
      <AnimatedTabs tabItems={mockTabItems} defaultValue="tab1" />
    );

    const tabsList = container.querySelector('[role="tablist"]');
    expect(mockObserve).toHaveBeenCalledWith(tabsList);
    expect(mockResizeObserver).toHaveBeenCalledTimes(1);
  });

  it('cleans up ResizeObserver on unmount', () => {
    const mockDisconnect = jest.fn();
    const mockObserve = jest.fn();

    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
    }));

    const { unmount } = render(
      <AnimatedTabs tabItems={mockTabItems} defaultValue="tab1" />
    );

    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
