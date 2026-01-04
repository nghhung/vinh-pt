import { useState, useCallback } from 'react';
import { FormValidationError } from '../types';

/**
 * Return type for the useForm hook
 */
export interface UseFormReturn<T> {
  values: T;
  errors: FormValidationError[];
  handleChange: (field: keyof T, value: string) => void;
  handleSubmit: (onSubmit: (data: T) => void | Promise<void>) => void;
  isValid: boolean;
  isSubmitting: boolean;
  reset: () => void;
  setErrors: (errors: FormValidationError[]) => void;
}

/**
 * Custom hook for form state management with validation.
 * Manages form values, validation errors, and submission state.
 * 
 * @param initialValues - Initial form field values
 * @param validate - Validation function that returns array of errors
 * @returns Object containing form state and handler functions
 */
export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validate: (values: T) => FormValidationError[]
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = useCallback((field: keyof T, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field when user starts typing
    setErrors((prev) => prev.filter((error) => error.field !== field));
  }, []);

  const handleSubmit = useCallback(
    (onSubmit: (data: T) => void | Promise<void>) => {
      // Run validation
      const validationErrors = validate(values);
      setErrors(validationErrors);

      // If no errors, call onSubmit
      if (validationErrors.length === 0) {
        setIsSubmitting(true);
        
        const result = onSubmit(values);
        
        // Handle async onSubmit
        if (result instanceof Promise) {
          result
            .then(() => {
              setIsSubmitting(false);
            })
            .catch(() => {
              setIsSubmitting(false);
            });
        } else {
          setIsSubmitting(false);
        }
      }
    },
    [values, validate]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors([]);
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = errors.length === 0;

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isValid,
    isSubmitting,
    reset,
    setErrors,
  };
}

export default useForm;
