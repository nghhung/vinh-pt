import React from 'react';
import { Button } from '../../ui/Button';
import styles from './About.module.css';

export interface Stat {
  value: string;
  label: string;
}

export interface AboutProps {
  profileImage: string;
  name: string;
  title: string;
  biography: string;
  stats: Stat[];
  ctaText: string;
  ctaLink: string;
}

export const About: React.FC<AboutProps> = ({
  profileImage,
  name,
  title,
  biography,
  stats,
  ctaText,
  ctaLink,
}) => {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src={profileImage}
            alt={`${name} - ${title}`}
            className={styles.profileImage}
            loading="lazy"
          />
        </div>
        <div className={styles.content}>
          <h2 id="about-title" className={styles.title}>
            {name}
          </h2>
          <p className={styles.subtitle}>{title}</p>
          <p className={styles.biography}>{biography}</p>
          <div className={styles.stats} role="list" aria-label="Statistics">
            {stats.map((stat, index) => (
              <div key={index} className={styles.stat} role="listitem">
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
          <Button as="a" href={ctaLink} variant="secondary" size="medium">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
