import React from 'react';
import { HeroProps } from '../../../types';
import { Button } from '../../ui/Button';
import styles from './Hero.module.css';

export const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  headline,
  subheadline,
  ctaText,
  ctaLink,
}) => {
  return (
    <section className={styles.hero} aria-label="Hero section">
      <img
        src={backgroundImage}
        alt=""
        className={styles.backgroundImage}
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h1 className={styles.headline}>{headline}</h1>
        <p className={styles.subheadline}>{subheadline}</p>
        <Button
          as="a"
          href={ctaLink}
          variant="primary"
          size="large"
          className={styles.cta}
        >
          {ctaText}
        </Button>
      </div>
    </section>
  );
};

export default Hero;
