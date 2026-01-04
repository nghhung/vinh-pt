import { BMIInput, BMIResult, BMICategory } from '../types';

/**
 * Calculates BMI and returns the value with category classification.
 * 
 * Metric: BMI = weight (kg) / height (m)²
 * Imperial: BMI = (weight (lbs) / height (inches)²) × 703
 * 
 * Categories:
 * - Underweight: BMI < 18.5
 * - Normal: 18.5 ≤ BMI < 25
 * - Overweight: 25 ≤ BMI < 30
 * - Obese: BMI ≥ 30
 */
export function calculateBMI(input: BMIInput): BMIResult {
  const { height, weight, unit } = input;

  // Validate inputs
  if (height <= 0 || weight <= 0) {
    throw new Error('Height and weight must be positive numbers');
  }

  if (!Number.isFinite(height) || !Number.isFinite(weight)) {
    throw new Error('Please enter valid numbers');
  }

  let bmiValue: number;

  if (unit === 'metric') {
    // Height in cm, weight in kg
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    bmiValue = weight / (heightInMeters * heightInMeters);
  } else {
    // Imperial: height in inches, weight in lbs
    bmiValue = (weight / (height * height)) * 703;
  }

  const category = getBMICategory(bmiValue);

  return {
    value: Math.round(bmiValue * 100) / 100, // Round to 2 decimal places
    category,
  };
}

/**
 * Determines the BMI category based on the BMI value.
 */
export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

/**
 * Validates BMI input and returns error message if invalid.
 * Returns null if input is valid.
 */
export function validateBMIInput(input: Partial<BMIInput>): string | null {
  if (input.height === undefined || input.height === null) {
    return 'Please enter your height';
  }

  if (input.weight === undefined || input.weight === null) {
    return 'Please enter your weight';
  }

  if (typeof input.height !== 'number' || !Number.isFinite(input.height)) {
    return 'Please enter valid numbers';
  }

  if (typeof input.weight !== 'number' || !Number.isFinite(input.weight)) {
    return 'Please enter valid numbers';
  }

  if (input.height <= 0) {
    return 'Height must be a positive number';
  }

  if (input.weight <= 0) {
    return 'Weight must be a positive number';
  }

  return null;
}
