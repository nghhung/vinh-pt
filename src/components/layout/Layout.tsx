import React from 'react';
import { Header, HeaderProps } from './Header';
import { Footer, FooterProps } from './Footer';
import styles from './Layout.module.css';

export interface LayoutProps {
  children: React.ReactNode;
  headerProps: HeaderProps;
  footerProps: FooterProps;
}

/**
 * Layout wrapper component that wraps pages with Header and Footer.
 * Implements Requirements 1.1, 10.1
 */
export const Layout: React.FC<LayoutProps> = ({
  children,
  headerProps,
  footerProps,
}) => {
  return (
    <div className={styles.layout}>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      
      <Header {...headerProps} />
      
      <main id="main-content" className={styles.main} role="main">
        {children}
      </main>
      
      <Footer {...footerProps} />
    </div>
  );
};

export default Layout;
