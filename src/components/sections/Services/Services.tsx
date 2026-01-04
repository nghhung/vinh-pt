import React from 'react';
import { ServiceCardProps } from '../../../types';
import { ServiceCard } from './ServiceCard';
import styles from './Services.module.css';

export interface ServicesProps {
  title?: string;
  subtitle?: string;
  services: ServiceCardProps[];
  onServiceClick?: (index: number) => void;
}

export const Services: React.FC<ServicesProps> = ({
  title = 'Our Services',
  subtitle = 'We offer a wide range of fitness services to help you achieve your goals',
  services,
  onServiceClick,
}) => {
  return (
    <section className={styles.services} id="services" aria-labelledby="services-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="services-title" className={styles.title}>
            {title}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
        <div className={styles.grid} role="list">
          {services.map((service, index) => (
            <div key={index} role="listitem">
              <ServiceCard
                {...service}
                onClick={onServiceClick ? () => onServiceClick(index) : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
