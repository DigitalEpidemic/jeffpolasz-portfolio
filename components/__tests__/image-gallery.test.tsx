import { fireEvent, render, screen } from '@testing-library/react';
import ImageGallery from '../image-gallery';

// Mock yet-another-react-lightbox to avoid DOM prop warnings
jest.mock('yet-another-react-lightbox', () => {
  return function MockLightbox({ open, index, close, slides, ...props }: any) {
    return open ? (
      <div data-testid="lightbox" onClick={() => close && close()}>
        <div>Lightbox Mock - Image {index + 1}</div>
        {slides && slides[index] && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={slides[index].src} alt={slides[index].alt || ''} />
        )}
      </div>
    ) : null;
  };
});

// Mock the Zoom plugin
jest.mock('yet-another-react-lightbox/plugins/zoom', () => ({
  __esModule: true,
  default: function ZoomMock() {
    return null;
  },
}));

describe('ImageGallery', () => {
  const mockImages = [
    { url: '/image1.jpg', caption: 'Image 1' },
    { url: '/image2.jpg', caption: 'Image 2' },
  ];

  const singleImage = [{ url: '/single.jpg', caption: 'Single Image' }];

  it('renders multiple images in grid layout', () => {
    render(<ImageGallery images={mockImages} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);

    expect(images[0]).toHaveAttribute('src', '/image1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Image 1');
    expect(images[1]).toHaveAttribute('src', '/image2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Image 2');
  });

  it('renders single image without grid layout', () => {
    render(<ImageGallery images={singleImage} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/single.jpg');
    expect(image).toHaveAttribute('alt', 'Single Image');
  });

  it('shows captions for multiple images', () => {
    render(<ImageGallery images={mockImages} />);

    expect(screen.getByText('Image 1')).toBeInTheDocument();
    expect(screen.getByText('Image 2')).toBeInTheDocument();
  });

  it('does not show caption for single image', () => {
    render(<ImageGallery images={singleImage} />);

    expect(screen.queryByText('Single Image')).not.toBeInTheDocument();
  });

  it('opens lightbox when image is clicked', () => {
    render(<ImageGallery images={mockImages} />);

    const firstImage = screen.getAllByRole('img')[0];
    fireEvent.click(firstImage);

    expect(screen.getByTestId('lightbox')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ImageGallery images={mockImages} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles images without captions', () => {
    const imagesWithoutCaptions = [
      { url: '/image1.jpg' },
      { url: '/image2.jpg' },
    ];

    render(<ImageGallery images={imagesWithoutCaptions} />);

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('alt', 'Image 1');
    expect(images[1]).toHaveAttribute('alt', 'Image 2');
  });

  it('makes images clickable with cursor pointer', () => {
    render(<ImageGallery images={mockImages} />);

    const imageContainers = screen
      .getAllByRole('img')
      .map((img) => img.parentElement);

    imageContainers.forEach((container) => {
      expect(container).toHaveClass('cursor-pointer');
    });
  });
});
