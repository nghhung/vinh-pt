import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: 'button';
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: 'a';
    href: string;
  };

type ButtonAsComponent<C extends React.ElementType> = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonBaseProps> & {
    as: C;
    to?: string;
  };

export type ButtonProps<C extends React.ElementType = 'button'> =
  | ButtonAsButton
  | ButtonAsAnchor
  | ButtonAsComponent<C>;

export const Button = <C extends React.ElementType = 'button'>({
  variant = 'primary',
  size = 'medium',
  children,
  fullWidth = false,
  className = '',
  as,
  disabled,
  ...props
}: ButtonProps<C>) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Handle custom component (like Link from react-router-dom)
  if (as && as !== 'button' && as !== 'a') {
    const Component = as as React.ElementType;
    return (
      <Component
        className={classNames}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </Component>
    );
  }

  // Handle anchor element
  if (as === 'a') {
    return (
      <a
        className={classNames}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  // Default: button element
  return (
    <button
      className={classNames}
      disabled={disabled}
      type={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).type || 'button'}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default Button;
