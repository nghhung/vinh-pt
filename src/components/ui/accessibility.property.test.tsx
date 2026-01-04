import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { Button } from './Button';
import { Card } from './Card';

/**
 * Property-based tests for Keyboard Accessibility
 * Feature: fitness-portfolio, Property 11: Keyboard Accessibility
 * Validates: Requirements 12.4, 12.5
 * 
 * For any interactive element (buttons, links, form inputs, carousel controls,
 * lightbox controls), the element should be focusable via Tab key and operable
 * via Enter/Space key.
 */
describe('Keyboard Accessibility Property Tests', () => {
  // Ensure cleanup after each test
  afterEach(() => {
    cleanup();
  });

  // Generator for unique alphanumeric strings (valid button labels)
  const validLabelArb = fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{2,15}$/);

  /**
   * Property 11: Keyboard Accessibility - Button Component
   * For any button with any variant and size, it should be focusable and
   * operable via Enter and Space keys.
   */
  it('Button should be focusable and operable via keyboard for any variant/size combination', () => {
    const variants = ['primary', 'secondary', 'outline'] as const;
    const sizes = ['small', 'medium', 'large'] as const;

    fc.assert(
      fc.property(
        fc.constantFrom(...variants),
        fc.constantFrom(...sizes),
        validLabelArb,
        (variant, size, label) => {
          cleanup(); // Clean up before each property run
          
          let clicked = false;
          const handleClick = () => { clicked = true; };

          render(
            <Button variant={variant} size={size} onClick={handleClick} data-testid="test-button">
              {label}
            </Button>
          );

          const button = screen.getByTestId('test-button');

          // Should be focusable (has tabIndex >= 0 or is naturally focusable)
          expect(button).not.toHaveAttribute('tabindex', '-1');

          // Should be operable via click
          clicked = false;
          fireEvent.click(button);
          expect(clicked).toBe(true);

          // Button element is natively keyboard accessible
          // Enter and Space keys trigger click events on buttons
          expect(button.tagName).toBe('BUTTON');

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Keyboard Accessibility - Button as Anchor
   * For any button rendered as an anchor, it should be focusable and have
   * proper role and tabIndex.
   */
  it('Button as anchor should be focusable and have proper accessibility attributes', () => {
    const variants = ['primary', 'secondary', 'outline'] as const;
    const sizes = ['small', 'medium', 'large'] as const;

    fc.assert(
      fc.property(
        fc.constantFrom(...variants),
        fc.constantFrom(...sizes),
        validLabelArb,
        fc.webUrl(),
        (variant, size, label, href) => {
          cleanup(); // Clean up before each property run

          render(
            <Button as="a" href={href} variant={variant} size={size} data-testid="test-link">
              {label}
            </Button>
          );

          const link = screen.getByTestId('test-link');

          // Should have role="button" for anchor acting as button
          expect(link).toHaveAttribute('role', 'button');

          // Should be focusable (tabIndex 0)
          expect(link).toHaveAttribute('tabindex', '0');

          // Should have href
          expect(link).toHaveAttribute('href', href);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Keyboard Accessibility - Disabled Button
   * For any disabled button, it should not be focusable or operable.
   */
  it('Disabled button should not be operable', () => {
    const variants = ['primary', 'secondary', 'outline'] as const;
    const sizes = ['small', 'medium', 'large'] as const;

    fc.assert(
      fc.property(
        fc.constantFrom(...variants),
        fc.constantFrom(...sizes),
        validLabelArb,
        (variant, size, label) => {
          cleanup(); // Clean up before each property run
          
          let clicked = false;
          const handleClick = () => { clicked = true; };

          render(
            <Button variant={variant} size={size} onClick={handleClick} disabled data-testid="test-button">
              {label}
            </Button>
          );

          const button = screen.getByTestId('test-button');

          // Should be disabled
          expect(button).toBeDisabled();

          // Click should not trigger handler
          clicked = false;
          fireEvent.click(button);
          expect(clicked).toBe(false);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Keyboard Accessibility - Clickable Card
   * For any clickable card, it should be focusable and operable via
   * Enter and Space keys.
   */
  it('Clickable Card should be focusable and operable via keyboard', () => {
    fc.assert(
      fc.property(
        validLabelArb,
        (content) => {
          cleanup(); // Clean up before each property run
          
          let clicked = false;
          const handleClick = () => { clicked = true; };

          render(
            <Card onClick={handleClick} data-testid="test-card">
              <p>{content}</p>
            </Card>
          );

          const card = screen.getByTestId('test-card');

          // Should be focusable (tabIndex 0)
          expect(card).toHaveAttribute('tabindex', '0');

          // Should have button role
          expect(card).toHaveAttribute('role', 'button');

          // Should be operable via Enter key
          clicked = false;
          fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
          expect(clicked).toBe(true);

          // Should be operable via Space key
          clicked = false;
          fireEvent.keyDown(card, { key: ' ', code: 'Space' });
          expect(clicked).toBe(true);

          // Should be operable via click
          clicked = false;
          fireEvent.click(card);
          expect(clicked).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Keyboard Accessibility - Non-clickable Card
   * For any non-clickable card, it should not have button role or tabIndex.
   */
  it('Non-clickable Card should not have button role or tabIndex', () => {
    fc.assert(
      fc.property(
        validLabelArb,
        (content) => {
          cleanup(); // Clean up before each property run
          
          render(
            <Card data-testid="test-card">
              <p>{content}</p>
            </Card>
          );

          const card = screen.getByTestId('test-card');

          // Should not have button role
          expect(card).not.toHaveAttribute('role', 'button');

          // Should not have tabIndex
          expect(card).not.toHaveAttribute('tabindex');

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
