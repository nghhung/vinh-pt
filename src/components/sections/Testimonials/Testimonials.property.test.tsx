/**
 * Property-Based Tests for Testimonials Carousel Component
 * Feature: fitness-portfolio, Property 5: Testimonial Carousel Navigation
 * Validates: Requirements 6.3, 6.4
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import { Testimonials } from './Testimonials';
import { Testimonial } from '../../../types';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Arbitrary for generating testimonial data
const testimonialArbitrary: fc.Arbitrary<Testimonial> = fc.record({
  id: fc.uuid(),
  clientName: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
  clientPhoto: fc.webUrl(),
  review: fc.string({ minLength: 10, maxLength: 500 }).filter(s => s.trim().length > 0),
  rating: fc.option(fc.integer({ min: 1, max: 5 }), { nil: undefined }),
});

// Generate array of testimonials with at least 2 items for carousel testing
const testimonialsArrayArbitrary = fc.array(testimonialArbitrary, { minLength: 2, maxLength: 10 });

describe('Testimonials Carousel Property Tests', () => {
  /**
   * Property 5: Testimonial Carousel Navigation
   * For any array of testimonials with length N > 1 and any current index I,
   * clicking "next" should result in index (I + 1) % N,
   * and clicking "previous" should result in index (I - 1 + N) % N (wraparound behavior).
   */
  it('should navigate to next testimonial with wraparound', () => {
    fc.assert(
      fc.property(
        testimonialsArrayArbitrary,
        fc.integer({ min: 0, max: 100 }),
        (testimonials, clickCount) => {
          cleanup();
          
          const { container } = render(
            <Testimonials testimonials={testimonials} autoPlay={false} />
          );

          const nextButton = container.querySelector('[aria-label="Next testimonial"]');
          expect(nextButton).not.toBeNull();

          // Click next button multiple times
          const actualClicks = clickCount % (testimonials.length * 2 + 1);
          for (let i = 0; i < actualClicks; i++) {
            fireEvent.click(nextButton!);
          }

          // Verify the expected index after clicks
          const expectedIndex = actualClicks % testimonials.length;
          const dots = container.querySelectorAll('[role="tab"]');
          const activeDot = container.querySelector('[aria-selected="true"]');
          
          expect(dots[expectedIndex]).toBe(activeDot);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should navigate to previous testimonial with wraparound', () => {
    fc.assert(
      fc.property(
        testimonialsArrayArbitrary,
        fc.integer({ min: 0, max: 100 }),
        (testimonials, clickCount) => {
          cleanup();
          
          const { container } = render(
            <Testimonials testimonials={testimonials} autoPlay={false} />
          );

          const prevButton = container.querySelector('[aria-label="Previous testimonial"]');
          expect(prevButton).not.toBeNull();

          // Click previous button multiple times
          const actualClicks = clickCount % (testimonials.length * 2 + 1);
          for (let i = 0; i < actualClicks; i++) {
            fireEvent.click(prevButton!);
          }

          // Verify the expected index after clicks (wraparound)
          const expectedIndex = (testimonials.length - (actualClicks % testimonials.length)) % testimonials.length;
          const dots = container.querySelectorAll('[role="tab"]');
          const activeDot = container.querySelector('[aria-selected="true"]');
          
          expect(dots[expectedIndex]).toBe(activeDot);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should navigate to specific slide when clicking dots', () => {
    fc.assert(
      fc.property(
        testimonialsArrayArbitrary,
        (testimonials) => {
          cleanup();
          
          const { container } = render(
            <Testimonials testimonials={testimonials} autoPlay={false} />
          );

          const dots = container.querySelectorAll('[role="tab"]');
          expect(dots.length).toBe(testimonials.length);

          // Click each dot and verify it becomes active
          testimonials.forEach((_, index) => {
            fireEvent.click(dots[index]);
            const activeDot = container.querySelector('[aria-selected="true"]');
            expect(dots[index]).toBe(activeDot);
          });

          return true;
        }
      ),
      { numRuns: 50 }
    );
  });
});
