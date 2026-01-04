import { ContactFormData, FormValidationError } from '../types';

/**
 * Email validation regex pattern
 * Matches standard email format: local@domain.tld
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates contact form data and returns an array of validation errors.
 * Returns an empty array if all fields are valid.
 * 
 * Required fields: name, email, message
 * Optional fields: phone
 * 
 * @param data - The contact form data to validate
 * @returns Array of FormValidationError objects
 */
export function validateContactForm(data: ContactFormData): FormValidationError[] {
  const errors: FormValidationError[] = [];

  // Validate name (required, non-empty)
  if (!data.name || data.name.trim() === '') {
    errors.push({
      field: 'name',
      message: 'Name is required',
    });
  }

  // Validate email (required, valid format)
  if (!data.email || data.email.trim() === '') {
    errors.push({
      field: 'email',
      message: 'Email is required',
    });
  } else if (!isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address',
    });
  }

  // Validate message (required, non-empty)
  if (!data.message || data.message.trim() === '') {
    errors.push({
      field: 'message',
      message: 'Message is required',
    });
  }

  // Phone is optional, no validation needed

  return errors;
}

/**
 * Validates an email address format.
 * 
 * @param email - The email address to validate
 * @returns true if the email format is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Checks if a form has any validation errors.
 * 
 * @param errors - Array of validation errors
 * @returns true if there are no errors, false otherwise
 */
export function isFormValid(errors: FormValidationError[]): boolean {
  return errors.length === 0;
}

/**
 * Gets the error message for a specific field.
 * 
 * @param errors - Array of validation errors
 * @param field - The field name to get the error for
 * @returns The error message or undefined if no error exists
 */
export function getFieldError(
  errors: FormValidationError[],
  field: string
): string | undefined {
  const error = errors.find((e) => e.field === field);
  return error?.message;
}
