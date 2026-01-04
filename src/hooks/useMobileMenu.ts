import { useState, useCallback } from 'react';

/**
 * Return type for the useMobileMenu hook
 */
export interface UseMobileMenuReturn {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

/**
 * Custom hook to manage mobile menu state.
 * Provides toggle and close functions for hamburger menu functionality.
 * 
 * @returns Object containing isOpen state and toggle/close functions
 */
export function useMobileMenu(): UseMobileMenuReturn {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    toggle,
    close,
  };
}

export default useMobileMenu;
