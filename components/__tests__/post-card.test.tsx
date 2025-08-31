import { ProjectType } from '@/data/constants';
import { render, screen } from '@testing-library/react';
import PostCard from '../post-card';

const mockPostCard = {
  title: 'Test Project',
  slug: 'test-project',
  category: ProjectType.WEB,
  username: 'testuser',
  publishedAt: new Date('2023-01-01'),
  votes: 42,
  content: 'This is test content for the post card.',
  image: '/test-image.jpg',
  tags: ['React', 'TypeScript', 'Next.js'],
  github: 'https://github.com/test/repo',
  demo: 'https://demo.example.com',
};

describe('PostCard', () => {
  it('renders post title', () => {
    render(<PostCard {...mockPostCard} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders post content', () => {
    render(<PostCard {...mockPostCard} />);

    expect(
      screen.getByText('This is test content for the post card.')
    ).toBeInTheDocument();
  });

  it('renders post metadata', () => {
    render(<PostCard {...mockPostCard} />);

    expect(screen.getByText('Posted by u/testuser')).toBeInTheDocument();
    expect(screen.getByText('r/webdev')).toBeInTheDocument();
  });

  it('renders tags when provided', () => {
    render(<PostCard {...mockPostCard} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('does not render tags section when no tags provided', () => {
    const postWithoutTags = { ...mockPostCard, tags: [] };
    render(<PostCard {...postWithoutTags} />);

    // Tags should not be rendered
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('renders image when provided', () => {
    render(<PostCard {...mockPostCard} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Project');
  });

  it('does not render image when not provided', () => {
    const postWithoutImage = { ...mockPostCard, image: undefined };
    render(<PostCard {...postWithoutImage} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('creates correct link to post page', () => {
    render(<PostCard {...mockPostCard} />);

    // Get the main post link specifically (there are also GitHub and demo links)
    const postLink = screen.getAllByRole('link')[0]; // First link is the main post link
    expect(postLink).toHaveAttribute('href', '/post/test-project');
  });

  it('renders PostActions component with correct props', () => {
    render(<PostCard {...mockPostCard} />);

    // PostActions should render vote count in the mock
    expect(screen.getByText('Post Actions 42')).toBeInTheDocument();
    expect(screen.getByTestId('post-actions')).toBeInTheDocument();
  });

  it('applies hover styling', () => {
    const { container } = render(<PostCard {...mockPostCard} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('hover:bg-secondary/50', 'transition-colors');
  });

  it('renders with proper card styling', () => {
    const { container } = render(<PostCard {...mockPostCard} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass(
      'bg-card',
      'border',
      'border-border',
      'rounded'
    );
  });

  it('handles different project categories', () => {
    const gamePost = { ...mockPostCard, category: ProjectType.GAME };
    render(<PostCard {...gamePost} />);

    expect(screen.getByText('r/gamedev')).toBeInTheDocument();
  });

  it('handles posts without optional props', () => {
    const minimalPost = {
      title: 'Minimal Post',
      slug: 'minimal-post',
      category: ProjectType.WEB,
      username: 'user',
      publishedAt: new Date('2023-01-01'),
      votes: 0,
      content: 'Minimal content',
    };

    render(<PostCard {...minimalPost} />);

    expect(screen.getByText('Minimal Post')).toBeInTheDocument();
    expect(screen.getByText('Minimal content')).toBeInTheDocument();
    expect(screen.getByText('Posted by u/user')).toBeInTheDocument();
  });

  it('renders time ago correctly', () => {
    render(<PostCard {...mockPostCard} />);

    // Should show some form of time indication
    // The exact text depends on formatTimeAgo implementation
    expect(
      screen.getByText(/ago|year|month|day|hour|minute/)
    ).toBeInTheDocument();
  });

  it('has proper responsive layout classes', () => {
    render(<PostCard {...mockPostCard} />);

    const metadataDiv = screen.getByText('r/webdev').parentElement;
    expect(metadataDiv).toHaveClass('flex-wrap', 'sm:flex-nowrap');
  });

  it('handles project type labels correctly', () => {
    const allTypePost = { ...mockPostCard, category: ProjectType.ALL };
    render(<PostCard {...allTypePost} />);

    expect(screen.getByText('r/all')).toBeInTheDocument();
  });

  it('renders with default empty tags array', () => {
    const postWithUndefinedTags = { ...mockPostCard, tags: undefined };

    expect(() => {
      render(<PostCard {...postWithUndefinedTags} />);
    }).not.toThrow();
  });
});
