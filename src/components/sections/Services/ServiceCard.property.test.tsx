/**
 * Property-Based Tests for ServiceCard Component
 * Feature: fitness-portfolio, Property 3: Service Cards Render Complete Data
 * Validates: Requirements 4.1, 4.2
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { ServiceCard } from './ServiceCard';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Arbitrary for generating service card data
const serviceCardArbitrary = fc.record({
  title: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
  description: fc.string({ minLength: 1, maxLength: 500 }).filter(s => s.trim().length > 0),
  link: fc.option(fc.webUrl(), { nil: undefined }),
});

describe('ServiceCard Property Tests', () => {
  /**
   * Property 3: Service Cards Render Complete Data
   * For any array of service data objects, each rendered Service Card should
   * display the icon, title, and description from its corresponding data object.
   */
  it('should render title and description for any valid service data', () => {
    fc.assert(
      fc.property(serviceCardArbitrary, (serviceData) => {
        // Clean up before each property test iteration
        cleanup();
        
        const testIcon = <span data-testid="test-icon">Icon</span>;
        
        const { container } = render(
          <ServiceCard
            icon={testIcon}
            title={serviceData.title}
            description={serviceData.description}
            link={serviceData.link}
          />
        );

        // Verify title is rendered in h3 element
        const titleElement = container.querySelector('h3');
        expect(titleElement).not.toBeNull();
        expect(titleElement?.textContent).toBe(serviceData.title);

        // Verify description is rendered in p element
        const descriptionElement = container.querySelector('p');
        expect(descriptionElement).not.toBeNull();
        expect(descriptionElement?.textContent).toBe(serviceData.description);

        // Verify icon is rendered
        expect(screen.getByTestId('test-icon')).toBeInTheDocument();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should be keyboard accessible for any service card', () => {
    fc.assert(
      fc.property(serviceCardArbitrary, (serviceData) => {
        // Clean up before each property test iteration
        cleanup();
        
        const testIcon = <span>Icon</span>;
        
        render(
          <ServiceCard
            icon={testIcon}
            title={serviceData.title}
            description={serviceData.description}
            link={serviceData.link}
          />
        );

        // Verify the card has role="button" and is focusable
        const card = screen.getByRole('button');
        expect(card).toHaveAttribute('tabIndex', '0');
        expect(card).toHaveAttribute('aria-label', `${serviceData.title} service`);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
