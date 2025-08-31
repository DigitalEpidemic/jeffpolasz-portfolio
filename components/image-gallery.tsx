'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

interface ImageGalleryProps {
  images: Array<{
    url: string;
    caption?: string;
  }>;
  className?: string;
}

export default function ImageGallery({
  images,
  className = '',
}: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const lightboxSlides = images.map((image) => ({
    src: image.url,
    alt: image.caption || '',
  }));

  return (
    <>
      <div
        className={`${images.length === 1 ? '' : 'grid grid-cols-1 md:grid-cols-2 gap-4'} ${className}`}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer hover:opacity-90 transition-opacity ${
              images.length === 1
                ? 'mt-2'
                : 'overflow-hidden rounded-md border border-border'
            }`}
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={image.url}
              alt={image.caption || `Image ${index + 1}`}
              className={`${
                images.length === 1
                  ? 'w-full max-h-[512px] object-contain'
                  : 'w-full h-auto object-cover'
              }`}
              width={images.length === 1 ? 800 : 400}
              height={images.length === 1 ? 512 : 300}
              priority={index === 0}
              unoptimized
            />
            {image.caption && images.length > 1 && (
              <div className="p-2 text-xs text-muted-foreground">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
        plugins={[Zoom]}
        data-testid="lightbox"
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
        }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: true,
        }}
        noScroll={{
          disabled: true,
        }}
        carousel={{
          finite: images.length <= 1,
          preload: 2,
        }}
      />
    </>
  );
}
