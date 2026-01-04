/**
 * Property-Based Tests for Contact Form Validation
 * Feature: fitness-portfolio
 * Property 9: Contact Form Validation
 * Validates: Requirements 9.2, 9.3
 */
import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { validateContactForm, isValidEmail, isFormValid } from './validation';
import { ContactFormData } from '../types';

// Arbitrary for generating valid email addresses
const validEmailArb = fc
  .tuple(
    fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')), { minLength: 1, maxLength: 10 }),
    fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')), { minLength: 1, maxLength: 10 }),
    fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')), { minLength: 2, maxLength: 4 })
  )
  .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

// Arbitrary for generating non-empty strings (valid names/messages)
const nonEmptyStringArb = fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0);

describe('Contact Form Validation Property Tests', () => {
  /**
   * Property 9: Contact Form Validation
   * For any form submission:
   * - If name is non-empty, email is valid format, and message is non-empty,
   *   the form should submit successfully and display a success message
   * - If any required field is invalid (empty name, invalid email format, empty message),
   *   the form should display specific validation error messages for each invalid field
   */
  describe('Property 9: Contact Form Validation', () => {
    it('should return no errors for valid form data', () => {
      fc.assert(
        fc.property(
          nonEmptyStringArb,
          validEmailArb,
          nonEmptyStringArb,
          fc.option(fc.string(), { nil: undefined }),
          (name, email, message, phone) => {
            const formData: ContactFormData = { name, email, message, phone };
            const errors = validateContactForm(formData);
            return errors.length === 0;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return name error for empty name', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('', '   ', '\t', '\n'),
          validEmailArb,
          nonEmptyStringArb,
          (name, email, message) => {
            const formData: ContactFormData = { name, email, message };
            const errors = validateContactForm(formData);
            const nameError = errors.find((e) => e.field === 'name');
            return nameError !== undefined && nameError.message === 'Name is required';
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return email error for empty email', () => {
      fc.assert(
        fc.property(
          nonEmptyStringArb,
          fc.constantFrom('', '   ', '\t'),
          nonEmptyStringArb,
          (name, email, message) => {
            const formData: ContactFormData = { name, email, message };
            const errors = validateContactForm(formData);
            const emailError = errors.find((e) => e.field === 'email');
            return emailError !== undefined && emailError.message === 'Email is required';
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return email format error for invalid email format', () => {
      // Generate strings that don't match email pattern
      const invalidEmailArb = fc.string({ minLength: 1, maxLength: 50 }).filter((s) => {
        const trimmed = s.trim();
        return trimmed.length > 0 && !isValidEmail(trimmed);
      });

      fc.assert(
        fc.property(
          nonEmptyStringArb,
          invalidEmailArb,
          nonEmptyStringArb,
          (name, email, message) => {
            const formData: ContactFormData = { name, email, message };
            const errors = validateContactForm(formData);
            const emailError = errors.find((e) => e.field === 'email');
            return emailError !== undefined && emailError.message === 'Please enter a valid email address';
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return message error for empty message', () => {
      fc.assert(
        fc.property(
          nonEmptyStringArb,
          validEmailArb,
          fc.constantFrom('', '   ', '\t', '\n'),
          (name, email, message) => {
            const formData: ContactFormData = { name, email, message };
            const errors = validateContactForm(formData);
            const messageError = errors.find((e) => e.field === 'message');
            return messageError !== undefined && messageError.message === 'Message is required';
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return multiple errors when multiple fields are invalid', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('', '   '),
          fc.constantFrom('', '   '),
          fc.constantFrom('', '   '),
          (name, email, message) => {
            const formData: ContactFormData = { name, email, message };
            const errors = validateContactForm(formData);
            // Should have errors for all three required fields
            const hasNameError = errors.some((e) => e.field === 'name');
            const hasEmailError = errors.some((e) => e.field === 'email');
            const hasMessageError = errors.some((e) => e.field === 'message');
            return hasNameError && hasEmailError && hasMessageError;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should validate email format correctly', () => {
      fc.assert(
        fc.property(validEmailArb, (email) => {
          return isValidEmail(email) === true;
        }),
        { numRuns: 100 }
      );
    });

    it('should correctly identify form validity', () => {
      fc.assert(
        fc.property(
          nonEmptyStringArb,
          validEmailArb,
          nonEmptyStringArb,
          (name, email, message) => {
            const formData: ContactFormData = { name, email, message };
            const errors = validateContactForm(formData);
            return isFormValid(errors) === true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
