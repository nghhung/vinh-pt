/**
 * Property-Based Tests for BMI Calculator
 * Feature: fitness-portfolio
 * Property 7: BMI Calculation Correctness
 * Property 8: BMI Calculator Invalid Input Handling
 * Validates: Requirements 8.2, 8.3, 8.4, 8.5
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { calculateBMI, getBMICategory, validateBMIInput } from './bmiCalculator';

describe('BMI Calculator Property Tests', () => {
  /**
   * Property 7: BMI Calculation Correctness
   * For any valid height H > 0 and weight W > 0:
   * - In metric units: BMI = W / (H/100)² where H is in cm and W is in kg
   * - In imperial units: BMI = (W / H²) × 703 where H is in inches and W is in lbs
   */
  describe('Property 7: BMI Calculation Correctness', () => {
    it('should calculate correct BMI for any valid metric inputs', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 50, max: 250, noNaN: true }), // height in cm
          fc.float({ min: 20, max: 300, noNaN: true }), // weight in kg
          (height, weight) => {
            const result = calculateBMI({ height, weight, unit: 'metric' });
            const heightInMeters = height / 100;
            const expected = weight / (heightInMeters * heightInMeters);
            // Allow small floating point tolerance
            return Math.abs(result.value - Math.round(expected * 100) / 100) < 0.01;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should calculate correct BMI for any valid imperial inputs', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 48, max: 96, noNaN: true }), // height in inches (4ft to 8ft)
          fc.float({ min: 50, max: 500, noNaN: true }), // weight in lbs
          (height, weight) => {
            const result = calculateBMI({ height, weight, unit: 'imperial' });
            const expected = (weight / (height * height)) * 703;
            return Math.abs(result.value - Math.round(expected * 100) / 100) < 0.01;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should correctly categorize BMI values', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 10, max: 50, noNaN: true }), // BMI range
          (bmi) => {
            const category = getBMICategory(bmi);
            if (bmi < 18.5) {
              return category === 'Underweight';
            } else if (bmi < 25) {
              return category === 'Normal';
            } else if (bmi < 30) {
              return category === 'Overweight';
            } else {
              return category === 'Obese';
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return consistent category for calculated BMI', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 50, max: 250, noNaN: true }),
          fc.float({ min: 20, max: 300, noNaN: true }),
          (height, weight) => {
            const result = calculateBMI({ height, weight, unit: 'metric' });
            const expectedCategory = getBMICategory(result.value);
            return result.category === expectedCategory;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 8: BMI Calculator Invalid Input Handling
   * For any invalid input (height ≤ 0, weight ≤ 0, non-numeric values, or empty fields),
   * the BMI Calculator should display an appropriate error message and not calculate a BMI value.
   */
  describe('Property 8: BMI Calculator Invalid Input Handling', () => {
    it('should throw error for non-positive height', () => {
      fc.assert(
        fc.property(
          fc.float({ min: -1000, max: 0, noNaN: true }),
          fc.float({ min: 20, max: 300, noNaN: true }),
          (height, weight) => {
            expect(() => calculateBMI({ height, weight, unit: 'metric' })).toThrow();
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should throw error for non-positive weight', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 50, max: 250, noNaN: true }),
          fc.float({ min: -1000, max: 0, noNaN: true }),
          (height, weight) => {
            expect(() => calculateBMI({ height, weight, unit: 'metric' })).toThrow();
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return validation error for missing height', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 20, max: 300, noNaN: true }),
          (weight) => {
            const error = validateBMIInput({ weight, unit: 'metric' });
            return error !== null && error.includes('height');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return validation error for missing weight', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 50, max: 250, noNaN: true }),
          (height) => {
            const error = validateBMIInput({ height, unit: 'metric' });
            return error !== null && error.includes('weight');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return validation error for non-positive height', () => {
      fc.assert(
        fc.property(
          fc.float({ min: -1000, max: 0, noNaN: true }),
          fc.float({ min: 20, max: 300, noNaN: true }),
          (height, weight) => {
            const error = validateBMIInput({ height, weight, unit: 'metric' });
            return error !== null;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return validation error for non-positive weight', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 50, max: 250, noNaN: true }),
          fc.float({ min: -1000, max: 0, noNaN: true }),
          (height, weight) => {
            const error = validateBMIInput({ height, weight, unit: 'metric' });
            return error !== null;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
