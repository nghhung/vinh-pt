import React from 'react';
import { PricingCardProps } from '../../../types';
import { Button } from '../../ui/Button';
import styles from './PricingCard.module.css';

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  period,
  features,
  isPopular = false,
  ctaText,
  ctaLink,
}) => {
  const periodLabels: Record<string, string> = {
    month: '/tháng',
    session: '/buổi',
    package: '/gói',
  };

  // Format price for VND (prices over 10000 are likely VND)
  const formatPrice = (p: number) => {
    if (p >= 10000) {
      return p.toLocaleString('vi-VN');
    }
    return p.toString();
  };

  // Determine currency symbol
  const currencySymbol = price >= 10000 ? '' : '$';
  const currencySuffix = price >= 10000 ? 'đ' : '';

  const cardClasses = [styles.pricingCard, isPopular ? styles.popular : '']
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cardClasses} aria-label={`${name} pricing plan`}>
      {isPopular && (
        <span className={styles.popularBadge} aria-label="Most popular plan">
          Phổ Biến
        </span>
      )}
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.priceWrapper}>
        <span className={styles.price}>
          {currencySymbol && <span className={styles.currency}>{currencySymbol}</span>}
          {formatPrice(price)}
          {currencySuffix && <span className={styles.currency}>{currencySuffix}</span>}
        </span>
        <span className={styles.period}>{periodLabels[period]}</span>
      </div>
      <ul className={styles.features} role="list" aria-label="Plan features">
        {features.map((feature, index) => (
          <li key={index} className={styles.feature} role="listitem">
            <span className={styles.featureIcon} aria-hidden="true">
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <Button
        as="a"
        href={ctaLink}
        variant={isPopular ? 'primary' : 'outline'}
        size="medium"
        fullWidth
        className={styles.cta}
      >
        {ctaText}
      </Button>
    </article>
  );
};

export default PricingCard;
