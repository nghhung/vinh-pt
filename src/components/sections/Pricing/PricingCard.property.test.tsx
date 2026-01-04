/**
 * Property-Based Tests for PricingCard Component
 * Feature: fitness-portfolio, Property 4: Pricing Cards Render Complete Data with Popular Highlighting
 * Validates: Requirements 5.1, 5.2, 5.3
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { PricingCard } from './PricingCard';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Arbitrary for generating pricing card data
const pricingCardArbitrary = fc.record({
  name: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
  price: fc.integer({ min: 1, max: 9999 }),
  period: fc.constantFrom('month', 'session', 'package') as fc.Arbitrary<'month' | 'session' | 'package'>,
  features: fc.array(
    fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
    { minLength: 1, maxLength: 10 }
  ),
  isPopular: fc.boolean(),
  ctaText: fc.string({ minLength: 1, maxLength: 30 }).filter(s => s.trim().length > 0),
  ctaLink: fc.webUrl(),
});

describe('PricingCard Property Tests', () => {
  /**
   * Property 4: Pricing Cards Render Complete Data with Popular Highlighting
   * For any array of pricing plan data objects, each rendered Pricing Card should
   * display the plan name, price, period, features list, and CTA button.
   * Additionally, if a plan is marked as popular, it should have visual distinction.
   */
  it('should render all pricing data for any valid pricing plan', () => {
    fc.assert(
      fc.property(pricingCardArbitrary, (pricingData) => {
        cleanup();
        
        const { container } = render(
          <PricingCard
            name={pricingData.name}
            price={pricingData.price}
            period={pricingData.period}
            features={pricingData.features}
            isPopular={pricingData.isPopular}
            ctaText={pricingData.ctaText}
            ctaLink={pricingData.ctaLink}
          />
        );

        // Verify name is rendered
        const nameElement = container.querySelector('h3');
        expect(nameElement).not.toBeNull();
        expect(nameElement?.textContent).toBe(pricingData.name);

        // Verify price is rendered
        const priceText = container.textContent;
        expect(priceText).toContain(String(pricingData.price));

        // Verify period is rendered
        const periodLabels: Record<string, string> = {
          month: '/month',
          session: '/session',
          package: '/package',
        };
        expect(priceText).toContain(periodLabels[pricingData.period]);

        // Verify all features are rendered
        const featureItems = container.querySelectorAll('li');
        expect(featureItems.length).toBe(pricingData.features.length);
        pricingData.features.forEach((feature, index) => {
          expect(featureItems[index].textContent).toContain(feature);
        });

        // Verify CTA button is rendered with correct text and link
        const ctaButton = container.querySelector('a[role="button"]');
        expect(ctaButton).not.toBeNull();
        expect(ctaButton?.textContent).toBe(pricingData.ctaText);
        expect(ctaButton?.getAttribute('href')).toBe(pricingData.ctaLink);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should apply popular styling when isPopular is true', () => {
    fc.assert(
      fc.property(pricingCardArbitrary, (pricingData) => {
        cleanup();
        
        const { container } = render(
          <PricingCard
            name={pricingData.name}
            price={pricingData.price}
            period={pricingData.period}
            features={pricingData.features}
            isPopular={pricingData.isPopular}
            ctaText={pricingData.ctaText}
            ctaLink={pricingData.ctaLink}
          />
        );

        const card = container.querySelector('article');
        const popularBadge = container.querySelector('[aria-label="Most popular plan"]');

        if (pricingData.isPopular) {
          // Popular cards should have the popular class and badge
          expect(card?.className).toContain('popular');
          expect(popularBadge).not.toBeNull();
        } else {
          // Non-popular cards should not have the popular class or badge
          expect(card?.className).not.toContain('popular');
          expect(popularBadge).toBeNull();
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
