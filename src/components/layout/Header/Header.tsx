import React from 'react';
import { NavItem } from '../../../types';
import { useScrollPosition } from '../../../hooks/useScrollPosition';
import { useMobileMenu } from '../../../hooks/useMobileMenu';
import styles from './Header.module.css';

export interface HeaderProps {
  logo: string;
  logoText?: string;
  navItems: NavItem[];
  stickyThreshold?: number;
}

/**
 * Header component with sticky navigation and mobile hamburger menu.
 * Implements Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6
 */
export const Header: React.FC<HeaderProps> = ({
  logo: _logo,
  logoText = 'FitPro',
  navItems,
  stickyThreshold = 100,
}) => {
  const scrollPosition = useScrollPosition();
  const { isOpen, toggle, close } = useMobileMenu();

  const isSticky = scrollPosition > stickyThreshold;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close mobile menu when a link is clicked
    close();

    // Handle smooth scroll for anchor links
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`${styles.header} ${isSticky ? styles.sticky : ''}`}
      role="banner"
      data-sticky={isSticky}
    >
      <div className={styles.container}>
        {/* Logo */}
        <a href="/" className={styles.logo} aria-label="Go to homepage">
          <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
          </svg>
          <span>{logoText}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <a
                  href={item.href}
                  className={`${styles.navLink} ${item.isActive ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger Menu Button */}
        <button
          className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
          onClick={toggle}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`${styles.mobileNavLink} ${item.isActive ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={item.isActive ? 'page' : undefined}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
