import { ProjectType } from '@/data/constants';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from '../search-bar';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, ...props }: any) => (
      <div className={className} onClick={onClick} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('SearchBar', () => {
  const mockOnFilterChange = jest.fn();
  const mockOnSearch = jest.fn();

  const mockFilterCategories = [
    { value: 'all', label: 'All Projects' },
    { value: 'web', label: 'Web Projects' },
    { value: 'game', label: 'Game Projects' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    onFilterChange: mockOnFilterChange,
    onSearch: mockOnSearch,
    filterCategories: mockFilterCategories,
  };

  describe('Basic rendering', () => {
    it('renders search input with default placeholder', () => {
      render(<SearchBar {...defaultProps} />);

      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      expect(
        screen.getByRole('searchbox', { name: /search projects/i })
      ).toBeInTheDocument();
    });

    it('renders search input with custom placeholder', () => {
      render(
        <SearchBar {...defaultProps} searchPlaceholder="Search projects..." />
      );

      expect(
        screen.getByPlaceholderText('Search projects...')
      ).toBeInTheDocument();
    });

    it('renders search icon', () => {
      const { container } = render(<SearchBar {...defaultProps} />);

      // Check for Search icon (using class name since it's an SVG)
      const searchIcon = container.querySelector('.lucide-search');
      expect(searchIcon).toBeInTheDocument();
    });

    it('renders with default active filter (ALL)', () => {
      render(<SearchBar {...defaultProps} />);

      // Filter badge should not be visible for default "all" filter
      expect(screen.queryByText('All Projects')).not.toBeInTheDocument();
    });
  });

  describe('Filter badge functionality', () => {
    it('shows filter badge when activeFilter is not ALL', () => {
      render(<SearchBar {...defaultProps} activeFilter="web" />);

      expect(screen.getByText('Web Projects')).toBeInTheDocument();
    });

    it('does not show filter badge when activeFilter is ALL', () => {
      render(<SearchBar {...defaultProps} activeFilter={ProjectType.ALL} />);

      expect(screen.queryByText('All Projects')).not.toBeInTheDocument();
    });

    it('shows X button in filter badge when not disabled', () => {
      render(<SearchBar {...defaultProps} activeFilter="web" />);

      // Look for the remove filter button
      const removeFilterButton = screen.getByRole('button', {
        name: /remove filter/i,
      });
      expect(removeFilterButton).toBeInTheDocument();
    });

    it('does not show X button when searchDisabled is true', () => {
      render(
        <SearchBar {...defaultProps} activeFilter="web" searchDisabled={true} />
      );

      const filterBadge = screen.getByText('Web Projects');
      expect(filterBadge).toBeInTheDocument();

      // X button should not be present when disabled
      const xButton = filterBadge.parentElement?.querySelector('button');
      expect(xButton).toBeNull();
    });

    it('calls onFilterChange when filter badge is clicked and not disabled', () => {
      render(<SearchBar {...defaultProps} activeFilter="web" />);

      const filterBadge = screen.getByText('Web Projects');
      fireEvent.click(filterBadge);

      expect(mockOnFilterChange).toHaveBeenCalledWith('web');
    });

    it('does not call onFilterChange when filter badge is clicked and disabled', () => {
      render(
        <SearchBar {...defaultProps} activeFilter="web" searchDisabled={true} />
      );

      const filterBadge = screen.getByText('Web Projects');
      fireEvent.click(filterBadge);

      expect(mockOnFilterChange).not.toHaveBeenCalled();
    });

    it('calls handleRemoveFilter when X button is clicked', () => {
      render(<SearchBar {...defaultProps} activeFilter="web" />);

      const removeFilterButton = screen.getByRole('button', {
        name: /remove filter/i,
      });

      fireEvent.click(removeFilterButton);
      expect(mockOnFilterChange).toHaveBeenCalledWith(ProjectType.ALL);
    });

    it('stops propagation when X button is clicked', () => {
      render(<SearchBar {...defaultProps} activeFilter="web" />);

      const event = new MouseEvent('click', { bubbles: true });
      const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');

      const removeFilterButton = screen.getByRole('button', {
        name: /remove filter/i,
      });
      fireEvent(removeFilterButton, event);

      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });

  describe('Search input functionality', () => {
    it('calls onSearch when input value changes', () => {
      render(<SearchBar {...defaultProps} />);

      const searchInput = screen.getByRole('searchbox', {
        name: /search projects/i,
      });
      fireEvent.change(searchInput, { target: { value: 'test query' } });

      expect(mockOnSearch).toHaveBeenCalledWith('test query');
    });

    it('displays current searchQuery value', () => {
      render(<SearchBar {...defaultProps} searchQuery="existing query" />);

      const searchInput = screen.getByRole('searchbox', {
        name: /search projects/i,
      }) as HTMLInputElement;
      expect(searchInput.value).toBe('existing query');
    });

    it('shows clear button when searchQuery has value and not disabled', () => {
      render(<SearchBar {...defaultProps} searchQuery="test" />);

      const clearButton = screen.getByRole('button', { name: /clear search/i });
      expect(clearButton).toBeInTheDocument();
    });

    it('does not show clear button when searchQuery is empty', () => {
      render(<SearchBar {...defaultProps} searchQuery="" />);

      expect(
        screen.queryByRole('button', { name: /clear search/i })
      ).not.toBeInTheDocument();
    });

    it('does not show clear button when searchDisabled is true', () => {
      render(
        <SearchBar {...defaultProps} searchQuery="test" searchDisabled={true} />
      );

      expect(
        screen.queryByRole('button', { name: /clear search/i })
      ).not.toBeInTheDocument();
    });

    it('clears search when clear button is clicked', () => {
      render(<SearchBar {...defaultProps} searchQuery="test" />);

      const clearButton = screen.getByRole('button', { name: /clear search/i });
      fireEvent.click(clearButton);

      expect(mockOnSearch).toHaveBeenCalledWith('');
    });

    it('updates focus state on input focus/blur', () => {
      const { container } = render(<SearchBar {...defaultProps} />);

      const searchInput = screen.getByRole('searchbox', {
        name: /search projects/i,
      });
      const searchContainer = container.querySelector(
        '.relative.flex.items-center'
      );

      // Focus input
      fireEvent.focus(searchInput);
      expect(searchContainer).toHaveClass('border-foreground');

      // Blur input
      fireEvent.blur(searchInput);
      expect(searchContainer).not.toHaveClass('border-foreground');
    });
  });

  describe('Disabled state', () => {
    it('disables input when searchDisabled is true', () => {
      render(<SearchBar {...defaultProps} searchDisabled={true} />);

      const searchInput = screen.getByRole('searchbox', {
        name: /search projects/i,
      });
      expect(searchInput).toBeDisabled();
    });

    it('shows "Search disabled" placeholder when disabled', () => {
      render(<SearchBar {...defaultProps} searchDisabled={true} />);

      expect(
        screen.getByPlaceholderText('Search disabled')
      ).toBeInTheDocument();
    });

    it('shows crossed-out search icon when disabled', () => {
      const { container } = render(
        <SearchBar {...defaultProps} searchDisabled={true} />
      );

      const crossedIcon = container.querySelector('.absolute.top-1\\/2');
      expect(crossedIcon).toBeInTheDocument();
    });

    it('applies disabled styling to input', () => {
      render(<SearchBar {...defaultProps} searchDisabled={true} />);

      const searchInput = screen.getByRole('searchbox', {
        name: /search projects/i,
      });
      expect(searchInput).toHaveClass(
        'opacity-60',
        'bg-muted/30',
        'placeholder:line-through'
      );
    });

    it('applies dashed border when disabled', () => {
      const { container } = render(
        <SearchBar {...defaultProps} searchDisabled={true} />
      );

      const searchContainer = container.querySelector(
        '.relative.flex.items-center'
      );
      expect(searchContainer).toHaveClass('border-dashed');
    });
  });

  describe('getActiveCategory function', () => {
    it('returns correct category for active filter', () => {
      render(<SearchBar {...defaultProps} activeFilter="web" />);

      expect(screen.getByText('Web Projects')).toBeInTheDocument();
    });

    it('handles missing category gracefully', () => {
      render(<SearchBar {...defaultProps} activeFilter="nonexistent" />);

      // Should not crash, and filter badge should not show label
      expect(screen.queryByText('nonexistent')).not.toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('renders without onFilterChange callback', () => {
      const propsWithoutOnFilterChange = {
        onSearch: mockOnSearch,
        filterCategories: mockFilterCategories,
      };

      render(<SearchBar {...propsWithoutOnFilterChange} activeFilter="web" />);

      const filterBadge = screen.getByText('Web Projects');
      fireEvent.click(filterBadge);

      // Should not crash
      expect(mockOnSearch).not.toHaveBeenCalled();
    });

    it('renders without onSearch callback', () => {
      const propsWithoutOnSearch = {
        onFilterChange: mockOnFilterChange,
        filterCategories: mockFilterCategories,
      };

      render(<SearchBar {...propsWithoutOnSearch} />);

      const searchInput = screen.getByRole('searchbox', {
        name: /search projects/i,
      });
      fireEvent.change(searchInput, { target: { value: 'test' } });

      // Should not crash
      expect(mockOnFilterChange).not.toHaveBeenCalled();
    });

    it('renders with empty filterCategories', () => {
      render(
        <SearchBar {...defaultProps} filterCategories={[]} activeFilter="web" />
      );

      // Should render but without label
      const filterBadge = screen.queryByText('Web Projects');
      expect(filterBadge).not.toBeInTheDocument();
    });

    it('renders without any props', () => {
      render(<SearchBar />);

      expect(
        screen.getByRole('searchbox', { name: /search projects/i })
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });
  });

  describe('handleFilterClick function', () => {
    it('calls onFilterChange when not disabled and callback exists', () => {
      render(<SearchBar {...defaultProps} activeFilter="web" />);

      const filterBadge = screen.getByText('Web Projects');
      fireEvent.click(filterBadge);

      expect(mockOnFilterChange).toHaveBeenCalledWith('web');
    });

    it('does not call onFilterChange when disabled', () => {
      render(
        <SearchBar {...defaultProps} activeFilter="web" searchDisabled={true} />
      );

      const filterBadge = screen.getByText('Web Projects');
      fireEvent.click(filterBadge);

      expect(mockOnFilterChange).not.toHaveBeenCalled();
    });

    it('does not call onFilterChange when callback does not exist', () => {
      const propsWithoutCallback = {
        filterCategories: mockFilterCategories,
        onSearch: mockOnSearch,
      };

      render(<SearchBar {...propsWithoutCallback} activeFilter="web" />);

      const filterBadge = screen.getByText('Web Projects');
      fireEvent.click(filterBadge);

      // Should not crash
      expect(filterBadge).toBeInTheDocument();
    });
  });
});
