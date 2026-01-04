import React, { useState } from 'react';
import { BMIResult } from '../../../types';
import { calculateBMI, validateBMIInput } from '../../../utils/bmiCalculator';
import { Button } from '../../ui/Button';
import styles from './BMICalculator.module.css';

export interface BMICalculatorProps {
  defaultUnit?: 'metric' | 'imperial';
}

export const BMICalculator: React.FC<BMICalculatorProps> = ({
  defaultUnit = 'metric',
}) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>(defaultUnit);
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
    setUnit(newUnit);
    setHeight('');
    setWeight('');
    setResult(null);
    setError(null);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    // Validate inputs
    const validationError = validateBMIInput({
      height: isNaN(heightNum) ? undefined : heightNum,
      weight: isNaN(weightNum) ? undefined : weightNum,
      unit,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const bmiResult = calculateBMI({
        height: heightNum,
        weight: weightNum,
        unit,
      });
      setResult(bmiResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'Underweight':
        return styles.categoryUnderweight;
      case 'Normal':
        return styles.categoryNormal;
      case 'Overweight':
        return styles.categoryOverweight;
      case 'Obese':
        return styles.categoryObese;
      default:
        return '';
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'You may need to gain some weight. Consult with a healthcare provider.';
      case 'Normal':
        return 'Great! You are within a healthy weight range.';
      case 'Overweight':
        return 'You may benefit from losing some weight through diet and exercise.';
      case 'Obese':
        return 'Consider consulting with a healthcare provider about weight management.';
      default:
        return '';
    }
  };

  const heightLabel = unit === 'metric' ? 'Height (cm)' : 'Height (inches)';
  const weightLabel = unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)';
  const heightUnit = unit === 'metric' ? 'cm' : 'in';
  const weightUnit = unit === 'metric' ? 'kg' : 'lbs';

  return (
    <section
      className={styles.bmiCalculator}
      id="bmi-calculator"
      aria-labelledby="bmi-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="bmi-title" className={styles.title}>
            BMI Calculator
          </h2>
          <p className={styles.subtitle}>
            Calculate your Body Mass Index to understand your current fitness level
          </p>
        </header>

        <div className={styles.card}>
          <div className={styles.unitToggle} role="tablist" aria-label="Unit selection">
            <button
              type="button"
              className={`${styles.unitButton} ${unit === 'metric' ? styles.unitButtonActive : ''}`}
              onClick={() => handleUnitChange('metric')}
              role="tab"
              aria-selected={unit === 'metric'}
              aria-controls="bmi-form"
            >
              Metric (kg/cm)
            </button>
            <button
              type="button"
              className={`${styles.unitButton} ${unit === 'imperial' ? styles.unitButtonActive : ''}`}
              onClick={() => handleUnitChange('imperial')}
              role="tab"
              aria-selected={unit === 'imperial'}
              aria-controls="bmi-form"
            >
              Imperial (lbs/in)
            </button>
          </div>

          <form id="bmi-form" className={styles.form} onSubmit={handleCalculate}>
            <div className={styles.inputGroup}>
              <label htmlFor="height" className={styles.label}>
                {heightLabel}
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  id="height"
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={`Enter your height in ${heightUnit}`}
                  aria-describedby={error ? 'bmi-error' : undefined}
                  step="any"
                  min="0"
                />
                <span className={styles.unit}>{heightUnit}</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="weight" className={styles.label}>
                {weightLabel}
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  id="weight"
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={`Enter your weight in ${weightUnit}`}
                  aria-describedby={error ? 'bmi-error' : undefined}
                  step="any"
                  min="0"
                />
                <span className={styles.unit}>{weightUnit}</span>
              </div>
            </div>

            {error && (
              <p id="bmi-error" className={styles.error} role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              className={styles.calculateButton}
            >
              Calculate BMI
            </Button>
          </form>

          {result && (
            <div
              className={styles.result}
              role="region"
              aria-live="polite"
              aria-label="BMI Result"
            >
              <p className={styles.resultValue}>{result.value.toFixed(1)}</p>
              <p className={`${styles.resultCategory} ${getCategoryClass(result.category)}`}>
                {result.category}
              </p>
              <p className={styles.resultDescription}>
                {getCategoryDescription(result.category)}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
