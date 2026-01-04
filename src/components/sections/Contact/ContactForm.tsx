import React, { useState } from 'react';
import { ContactFormData, FormValidationError } from '../../../types';
import { useForm } from '../../../hooks/useForm';
import { validateContactForm, getFieldError } from '../../../utils/validation';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import styles from './ContactForm.module.css';

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  [key: string]: string;
};

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const validateForm = (values: FormValues): FormValidationError[] => {
  return validateContactForm({
    name: values.name,
    email: values.email,
    phone: values.phone || undefined,
    message: values.message,
  });
};

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const { values, errors, handleChange, handleSubmit, isSubmitting, reset } = useForm(
    initialValues,
    validateForm
  );

  const handleFormSubmit = async (data: FormValues) => {
    try {
      if (onSubmit) {
        await onSubmit({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          message: data.message,
        });
      }
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.successMessage} role="alert" aria-live="polite">
        <svg
          className={styles.successIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 className={styles.successTitle}>Message Sent!</h3>
        <p className={styles.successText}>
          Thank you for reaching out. We'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleFormSubmit);
      }}
      noValidate
    >
      <div className={styles.row}>
        <Input
          type="text"
          label="Name"
          name="name"
          value={values.name}
          onChange={(value) => handleChange('name', value)}
          error={getFieldError(errors, 'name')}
          required
          placeholder="Your name"
        />
        <Input
          type="email"
          label="Email"
          name="email"
          value={values.email}
          onChange={(value) => handleChange('email', value)}
          error={getFieldError(errors, 'email')}
          required
          placeholder="your@email.com"
        />
      </div>

      <Input
        type="tel"
        label="Phone (optional)"
        name="phone"
        value={values.phone || ''}
        onChange={(value) => handleChange('phone', value)}
        placeholder="Your phone number"
      />

      <Input
        type="textarea"
        label="Message"
        name="message"
        value={values.message}
        onChange={(value) => handleChange('message', value)}
        error={getFieldError(errors, 'message')}
        required
        placeholder="How can we help you?"
        rows={5}
      />

      <Button
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;
