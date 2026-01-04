import React, { useId } from 'react';
import styles from './Input.module.css';

export type InputType = 'text' | 'email' | 'tel' | 'textarea';

export interface InputProps {
  type?: InputType;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  rows = 4,
}) => {
  const id = useId();
  const errorId = `${id}-error`;

  const inputClassNames = [
    styles.input,
    error ? styles.inputError : '',
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClassNames = [styles.wrapper, className].filter(Boolean).join(' ');

  const commonProps = {
    id,
    name,
    value,
    placeholder,
    disabled,
    required,
    className: inputClassNames,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
  };

  return (
    <div className={wrapperClassNames}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>

      {type === 'textarea' ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
