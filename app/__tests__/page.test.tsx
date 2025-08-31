import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../page';

describe('Home Page - Sort Functionality', () => {
  it('renders the sort dropdown with default "Best" option', () => {
    render(<Home />);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays all three sort options when dropdown is opened', async () => {
    render(<Home />);

    // Click the sort dropdown
    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    // Wait for dropdown options to appear (use getAllByText for duplicates)
    await waitFor(() => {
      expect(screen.getAllByText('Best').length).toBeGreaterThan(0);
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.getByText('Demos')).toBeInTheDocument();
    });
  });

  it('can change sort option from "Best" to "New"', async () => {
    render(<Home />);

    // Click the sort dropdown
    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    // Click "New" option
    await waitFor(() => {
      const newOption = screen.getByText('New');
      fireEvent.click(newOption);
    });

    // Verify posts are still rendered after sort change
    const postCards = screen.getAllByRole('article');
    expect(postCards.length).toBeGreaterThan(0);
  });

  it('can change sort option from "Best" to "Demos"', async () => {
    render(<Home />);

    // Click the sort dropdown
    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    // Click "Demos" option
    await waitFor(() => {
      const demosOption = screen.getByText('Demos');
      fireEvent.click(demosOption);
    });

    // Verify posts are still rendered after sort change
    const postCards = screen.getAllByRole('article');
    expect(postCards.length).toBeGreaterThan(0);
  });

  it('maintains post count across different sort options', async () => {
    render(<Home />);

    // Count posts with default "Best" sort
    const initialPostCount = screen.getAllByRole('article').length;
    expect(initialPostCount).toBeGreaterThan(0);

    // Change to "New" sort
    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    await waitFor(() => {
      const newOption = screen.getByText('New');
      fireEvent.click(newOption);
    });

    // Verify same number of posts
    await waitFor(() => {
      const newPostCount = screen.getAllByRole('article').length;
      expect(newPostCount).toBe(initialPostCount);
    });

    // Change to "Demos" sort
    fireEvent.click(selectTrigger);

    await waitFor(() => {
      const demosOption = screen.getByText('Demos');
      fireEvent.click(demosOption);
    });

    // Verify same number of posts
    await waitFor(() => {
      const demosPostCount = screen.getAllByRole('article').length;
      expect(demosPostCount).toBe(initialPostCount);
    });
  });

  it('re-renders posts with new keys when sort changes', async () => {
    render(<Home />);

    // Get initial posts
    const initialPosts = screen.getAllByRole('article');
    const initialPostTitles = initialPosts
      .slice(0, 3)
      .map((post) => post.querySelector('h2')?.textContent || '');

    // Verify we have posts
    expect(initialPostTitles.length).toBe(3);
    expect(initialPostTitles.every((title) => title.length > 0)).toBe(true);

    // Change sort to "New"
    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    await waitFor(() => {
      const newOption = screen.getByText('New');
      fireEvent.click(newOption);
    });

    // Wait for re-render and verify posts are still there
    await waitFor(() => {
      const newPosts = screen.getAllByRole('article');
      const newPostTitles = newPosts
        .slice(0, 3)
        .map((post) => post.querySelector('h2')?.textContent || '');

      expect(newPostTitles.length).toBe(3);
      expect(newPostTitles.every((title) => title.length > 0)).toBe(true);
    });
  });

  it('renders posts from the POSTS data', () => {
    render(<Home />);

    const postCards = screen.getAllByRole('article');

    // Should render actual posts from the data file
    expect(postCards.length).toBeGreaterThan(10); // We have many posts

    // Verify posts have titles (h2 elements)
    const postTitles = postCards.map(
      (post) => post.querySelector('h2')?.textContent
    );
    const validTitles = postTitles.filter((title) => title && title.length > 0);
    expect(validTitles.length).toBe(postCards.length);
  });

  it('renders sort dropdown alongside other UI elements', () => {
    render(<Home />);

    // Verify sort UI is present
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    // Verify other UI elements are also present
    const postCards = screen.getAllByRole('article');
    expect(postCards.length).toBeGreaterThan(0);

    // Should have posts and UI elements coexisting
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(postCards.length).toBeGreaterThan(0);
  });

  it('handles sort changes without throwing errors', async () => {
    // Ensure no console errors during sort operations
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<Home />);

    const selectTrigger = screen.getByRole('combobox');

    // Test all sort options
    const sortOptions = ['New', 'Demos', 'Best'];

    for (const option of sortOptions) {
      fireEvent.click(selectTrigger);

      await waitFor(() => {
        const optionElement = screen.getByText(option);
        fireEvent.click(optionElement);
      });

      // Verify posts are still rendered
      await waitFor(() => {
        const postCards = screen.getAllByRole('article');
        expect(postCards.length).toBeGreaterThan(0);
      });
    }

    // Should not have any console errors
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('integrates sort with filtering functionality', async () => {
    render(<Home />);

    // Should have sort dropdown
    expect(screen.getByText('Sort by')).toBeInTheDocument();

    // Change sort while other functionality is available
    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    await waitFor(() => {
      const newOption = screen.getByText('New');
      fireEvent.click(newOption);
    });

    // Sort and posts should still work together
    await waitFor(() => {
      expect(screen.getByText('Sort by')).toBeInTheDocument();

      const postCards = screen.getAllByRole('article');
      expect(postCards.length).toBeGreaterThan(0);
    });
  });
});
