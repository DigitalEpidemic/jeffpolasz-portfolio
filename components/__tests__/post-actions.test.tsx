import { fireEvent, render, screen } from '@testing-library/react';

// Unmock PostActions to test the actual component
jest.unmock('@/components/post-actions');
import PostActions from '../post-actions';

describe('PostActions', () => {
  it('renders vote count and buttons', () => {
    render(<PostActions initialVotes={42} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2); // up and down vote buttons
  });

  it('handles upvote click', () => {
    render(<PostActions initialVotes={10} />);

    const upvoteButton = screen.getAllByRole('button')[0];
    fireEvent.click(upvoteButton);

    expect(screen.getByText('11')).toBeInTheDocument();
  });

  it('handles downvote click', () => {
    render(<PostActions initialVotes={10} />);

    const downvoteButton = screen.getAllByRole('button')[1];
    fireEvent.click(downvoteButton);

    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('toggles vote status when same vote is clicked twice', () => {
    render(<PostActions initialVotes={10} />);

    const upvoteButton = screen.getAllByRole('button')[0];

    // First click - should upvote
    fireEvent.click(upvoteButton);
    expect(screen.getByText('11')).toBeInTheDocument();

    // Second click - should remove upvote
    fireEvent.click(upvoteButton);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('changes vote when different vote button is clicked', () => {
    render(<PostActions initialVotes={10} />);

    const upvoteButton = screen.getAllByRole('button')[0];
    const downvoteButton = screen.getAllByRole('button')[1];

    // First upvote
    fireEvent.click(upvoteButton);
    expect(screen.getByText('11')).toBeInTheDocument();

    // Then downvote - should change from +1 to -1
    fireEvent.click(downvoteButton);
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('renders GitHub link when provided', () => {
    render(
      <PostActions initialVotes={10} github="https://github.com/test/repo" />
    );

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/repo');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders demo link when provided', () => {
    render(<PostActions initialVotes={10} demo="https://demo.example.com" />);

    const demoLink = screen.getByRole('link', { name: /demo/i });
    expect(demoLink).toHaveAttribute('href', 'https://demo.example.com');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders both GitHub and demo links', () => {
    render(
      <PostActions
        initialVotes={10}
        github="https://github.com/test/repo"
        demo="https://demo.example.com"
      />
    );

    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /demo/i })).toBeInTheDocument();
  });

  it('prevents event propagation on vote button clicks', () => {
    const mockParentClick = jest.fn();

    render(
      <div onClick={mockParentClick}>
        <PostActions initialVotes={10} />
      </div>
    );

    const upvoteButton = screen.getAllByRole('button')[0];
    fireEvent.click(upvoteButton);

    expect(mockParentClick).not.toHaveBeenCalled();
  });

  it('prevents event propagation on external link clicks', () => {
    const mockParentClick = jest.fn();

    render(
      <div onClick={mockParentClick}>
        <PostActions initialVotes={10} github="https://github.com/test/repo" />
      </div>
    );

    const githubLink = screen.getByRole('link', { name: /github/i });
    fireEvent.click(githubLink);

    expect(mockParentClick).not.toHaveBeenCalled();
  });

  it('resets vote state when initialVotes prop changes', () => {
    const { rerender } = render(<PostActions initialVotes={10} />);

    // Vote up
    const upvoteButton = screen.getAllByRole('button')[0];
    fireEvent.click(upvoteButton);
    expect(screen.getByText('11')).toBeInTheDocument();

    // Change initialVotes prop (simulating different post)
    rerender(<PostActions initialVotes={25} />);

    // Should reset to new initialVotes value
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('applies correct styling for active upvote', () => {
    render(<PostActions initialVotes={10} />);

    const upvoteButton = screen.getAllByRole('button')[0];
    fireEvent.click(upvoteButton);

    expect(upvoteButton).toHaveClass('text-primary');
    expect(screen.getByText('11')).toHaveClass('text-primary');
  });

  it('applies correct styling for active downvote', () => {
    render(<PostActions initialVotes={10} />);

    const downvoteButton = screen.getAllByRole('button')[1];
    fireEvent.click(downvoteButton);

    expect(downvoteButton).toHaveClass('text-blue-400');
    expect(screen.getByText('9')).toHaveClass('text-blue-400');
  });

  it('renders without external links when not provided', () => {
    render(<PostActions initialVotes={10} />);

    // Should only have vote buttons, no external links
    const buttons = screen.getAllByRole('button');
    const links = screen.queryAllByRole('link');

    expect(buttons).toHaveLength(2); // Just up and down vote
    expect(links).toHaveLength(0); // No external links
  });
});
