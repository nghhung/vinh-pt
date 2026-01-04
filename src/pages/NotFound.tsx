import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound} role="main" aria-labelledby="notfound-title">
      <div className={styles.content}>
        <p className={styles.errorCode} aria-hidden="true">404</p>
        <h1 id="notfound-title" className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <nav className={styles.actions} aria-label="Error page navigation">
          <Button as={Link} to="/" variant="primary" size="large">
            Go to Homepage
          </Button>
          <Button as={Link} to="/contact" variant="outline" size="large">
            Contact Us
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default NotFound;
