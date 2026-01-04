import React from 'react';
import { PricingCardProps } from '../../../types';
import { PricingCard } from './PricingCard';
import styles from './Pricing.module.css';

export interface PricingProps {
  title?: string;
  subtitle?: string;
  plans: PricingCardProps[];
}

export const Pricing: React.FC<PricingProps> = ({
  title = 'Pricing Plans',
  subtitle = 'Choose the perfect plan for your fitness journey',
  plans,
}) => {
  return (
    <section className={styles.pricing} id="pricing" aria-labelledby="pricing-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="pricing-title" className={styles.title}>
            {title}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
        <div className={styles.grid} role="list">
          {plans.map((plan, index) => (
            <div key={index} role="listitem">
              <PricingCard {...plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
