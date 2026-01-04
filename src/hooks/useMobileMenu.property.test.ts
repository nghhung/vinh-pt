import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import * as fc from 'fast-check';
import { useMobileMenu } from './useMobileMenu';

/**
 * Property-based tests for useMobileMenu hook
 * Feature: fitness-portfolio, Property 2: Mobile Menu Toggle
 * Validates: Requirements 1.5
 */
describe('useMobileMenu Property Tests', () => {
  /**
   * Property 2: Mobile Menu Toggle
   * For any initial mobile menu state (open or closed), clicking the hamburger
   * menu icon should toggle the state to the opposite value.
   */
  it('should toggle state to opposite value for any sequence of toggle calls', () => {
    fc.assert(
      fc.property(
        fc.array(fc.boolean(), { minLength: 1, maxLength: 50 }),
        (toggleSequence) => {
          const { result } = renderHook(() => useMobileMenu());
          
          // Initial state should be closed
          expect(result.current.isOpen).toBe(false);
          
          let expectedState = false;
          
          for (const shouldToggle of toggleSequence) {
            if (shouldToggle) {
              act(() => {
                result.current.toggle();
              });
              expectedState = !expectedState;
            }
            expect(result.current.isOpen).toBe(expectedState);
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should always result in opposite state after single toggle', () => {
    fc.assert(
      fc.property(
        fc.nat({ max: 10 }),
        (initialToggles) => {
          const { result } = renderHook(() => useMobileMenu());
          
          // Set up initial state by toggling n times
          for (let i = 0; i < initialToggles; i++) {
            act(() => {
              result.current.toggle();
            });
          }
          
          const stateBefore = result.current.isOpen;
          
          // Toggle once more
          act(() => {
            result.current.toggle();
          });
          
          const stateAfter = result.current.isOpen;
          
          // State should be opposite
          return stateBefore !== stateAfter;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should always close menu regardless of current state when close is called', () => {
    fc.assert(
      fc.property(
        fc.nat({ max: 10 }),
        (toggleCount) => {
          const { result } = renderHook(() => useMobileMenu());
          
          // Toggle random number of times to get to any state
          for (let i = 0; i < toggleCount; i++) {
            act(() => {
              result.current.toggle();
            });
          }
          
          // Call close
          act(() => {
            result.current.close();
          });
          
          // Should always be closed
          return result.current.isOpen === false;
        }
      ),
      { numRuns: 100 }
    );
  });
});
