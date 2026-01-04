import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import * as fc from 'fast-check';
import { useLightbox } from './useLightbox';

/**
 * Property-based tests for useLightbox hook
 * Feature: fitness-portfolio, Property 6: Gallery and Lightbox Navigation
 * Validates: Requirements 7.2, 7.3
 */
describe('useLightbox Property Tests', () => {
  // Generator for gallery images
  const galleryImageArb = fc.record({
    id: fc.uuid(),
    src: fc.webUrl(),
    alt: fc.string({ minLength: 1, maxLength: 100 }),
    thumbnail: fc.option(fc.webUrl(), { nil: undefined }),
  });

  const nonEmptyGalleryArb = fc.array(galleryImageArb, { minLength: 2, maxLength: 20 });

  /**
   * Property 6: Gallery and Lightbox Navigation
   * For any array of gallery images with length N, clicking image at index I
   * should open the lightbox displaying that image.
   */
  it('should open lightbox at correct index when open is called', () => {
    fc.assert(
      fc.property(
        nonEmptyGalleryArb,
        fc.nat(),
        (images, rawIndex) => {
          const index = rawIndex % images.length;
          const { result } = renderHook(() => useLightbox(images));

          // Initially closed
          expect(result.current.isOpen).toBe(false);

          // Open at specific index
          act(() => {
            result.current.open(index);
          });

          // Should be open at correct index
          expect(result.current.isOpen).toBe(true);
          expect(result.current.currentIndex).toBe(index);
          expect(result.current.currentImage).toEqual(images[index]);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Gallery and Lightbox Navigation
   * When lightbox is open at index I, clicking "next" should show image at
   * index (I + 1) % N (wraparound behavior).
   */
  it('should navigate to next image with wraparound', () => {
    fc.assert(
      fc.property(
        nonEmptyGalleryArb,
        fc.nat(),
        (images, rawIndex) => {
          const startIndex = rawIndex % images.length;
          const { result } = renderHook(() => useLightbox(images));

          // Open at specific index
          act(() => {
            result.current.open(startIndex);
          });

          // Navigate next
          act(() => {
            result.current.next();
          });

          const expectedIndex = (startIndex + 1) % images.length;
          expect(result.current.currentIndex).toBe(expectedIndex);
          expect(result.current.currentImage).toEqual(images[expectedIndex]);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Gallery and Lightbox Navigation
   * When lightbox is open at index I, clicking "previous" should show image at
   * index (I - 1 + N) % N (wraparound behavior).
   */
  it('should navigate to previous image with wraparound', () => {
    fc.assert(
      fc.property(
        nonEmptyGalleryArb,
        fc.nat(),
        (images, rawIndex) => {
          const startIndex = rawIndex % images.length;
          const { result } = renderHook(() => useLightbox(images));

          // Open at specific index
          act(() => {
            result.current.open(startIndex);
          });

          // Navigate previous
          act(() => {
            result.current.previous();
          });

          const expectedIndex = (startIndex - 1 + images.length) % images.length;
          expect(result.current.currentIndex).toBe(expectedIndex);
          expect(result.current.currentImage).toEqual(images[expectedIndex]);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Navigating N times through N images returns to original
   */
  it('should return to original image after navigating through all images', () => {
    fc.assert(
      fc.property(
        nonEmptyGalleryArb,
        fc.nat(),
        (images, rawIndex) => {
          const startIndex = rawIndex % images.length;
          const { result } = renderHook(() => useLightbox(images));

          // Open at specific index
          act(() => {
            result.current.open(startIndex);
          });

          // Navigate through all images
          for (let i = 0; i < images.length; i++) {
            act(() => {
              result.current.next();
            });
          }

          // Should be back at start
          expect(result.current.currentIndex).toBe(startIndex);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Close always closes the lightbox
   */
  it('should close lightbox regardless of current state', () => {
    fc.assert(
      fc.property(
        nonEmptyGalleryArb,
        fc.nat(),
        fc.nat({ max: 10 }),
        (images, rawIndex, navigations) => {
          const startIndex = rawIndex % images.length;
          const { result } = renderHook(() => useLightbox(images));

          // Open and navigate randomly
          act(() => {
            result.current.open(startIndex);
          });

          for (let i = 0; i < navigations; i++) {
            act(() => {
              result.current.next();
            });
          }

          // Close
          act(() => {
            result.current.close();
          });

          expect(result.current.isOpen).toBe(false);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
