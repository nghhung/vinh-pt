import React from 'react';
import { ServiceCardProps } from '../../../types';
import styles from './ServiceCard.module.css';

export interface ServiceCardComponentProps extends ServiceCardProps {
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardComponentProps> = ({
  icon,
  title,
  description,
  link,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      window.location.href = link;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className={styles.serviceCard}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${title} service`}
    >
      <div className={styles.iconWrapper} aria-hidden="true">
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
};

export default ServiceCard;
