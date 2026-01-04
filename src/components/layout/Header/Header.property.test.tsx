import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { Header } from './Header';
import { NavItem } from '../../../types';

/**
 * Property-based tests for Header component sticky navigation
 * Feature: fitness-portfolio, Property 1: Sticky Navigation on Scroll
 * Validates: Requirements 1.3
 */

const mockNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

describe('Header Sticky Navigation Property Tests', () => {
  let scrollYValue = 0;

  beforeEach(() => {
    scrollYValue = 0;
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      get: () => scrollYValue,
      configurable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  /**
   * Helper to simulate scroll and trigger scroll event
   */
  const simulateScroll = (position: number) => {
    scrollYValue = position;
    window.dispatchEvent(new Event('scroll'));
  };

  /**
   * Property 1: Sticky Navigation on Scroll
   * For any scroll position greater than the header height threshold, the navigation
   * component should have the sticky class applied, and for any scroll position less
   * than or equal to the threshold, the sticky class should not be applied.
   */
  it('should apply sticky class when scroll position exceeds threshold', () => {
    const threshold = 100;

    fc.assert(
      fc.property(
        fc.integer({ min: threshold + 1, max: 5000 }),
        (scrollPosition) => {
          cleanup(); // Clean up before each property run
          
          const { container, rerender } = render(
            <Header
              logo="/logo.png"
              navItems={mockNavItems}
              stickyThreshold={threshold}
            />
          );

          simulateScroll(scrollPosition);
          
          // Force re-render to pick up scroll change
          rerender(
            <Header
              logo="/logo.png"
              navItems={mockNavItems}
              stickyThreshold={threshold}
            />
          );

          const header = container.querySelector('[role="banner"]');
          const isSticky = header?.getAttribute('data-sticky') === 'true';
          
          return isSticky === true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should not apply sticky class when scroll position is at or below threshold', () => {
    const threshold = 100;

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: threshold }),
        (scrollPosition) => {
          cleanup(); // Clean up before each property run
          
          const { container, rerender } = render(
            <Header
              logo="/logo.png"
              navItems={mockNavItems}
              stickyThreshold={threshold}
            />
          );

          simulateScroll(scrollPosition);
          
          // Force re-render to pick up scroll change
          rerender(
            <Header
              logo="/logo.png"
              navItems={mockNavItems}
              stickyThreshold={threshold}
            />
          );

          const header = container.querySelector('[role="banner"]');
          const isSticky = header?.getAttribute('data-sticky') === 'true';
          
          return isSticky === false;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should correctly toggle sticky state for any threshold and scroll position combination', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 50, max: 500 }), // threshold
        fc.integer({ min: 0, max: 2000 }), // scroll position
        (threshold, scrollPosition) => {
          cleanup(); // Clean up before each property run
          
          const { container, rerender } = render(
            <Header
              logo="/logo.png"
              navItems={mockNavItems}
              stickyThreshold={threshold}
            />
          );

          simulateScroll(scrollPosition);
          
          // Force re-render to pick up scroll change
          rerender(
            <Header
              logo="/logo.png"
              navItems={mockNavItems}
              stickyThreshold={threshold}
            />
          );

          const header = container.querySelector('[role="banner"]');
          const isSticky = header?.getAttribute('data-sticky') === 'true';
          const expectedSticky = scrollPosition > threshold;
          
          return isSticky === expectedSticky;
        }
      ),
      { numRuns: 100 }
    );
  });
});
