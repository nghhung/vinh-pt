import React, { useState } from 'react';
import styles from './Image.module.css';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | '3:2' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

/**
 * Optimized Image component with lazy loading, fallback support, and accessibility.
 * Implements Requirements 11.4, 12.2
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  aspectRatio = 'auto',
  objectFit = 'cover',
  className = '',
  loading = 'lazy',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const aspectRatioClass = aspectRatio !== 'auto' ? styles[`aspect${aspectRatio.replace(':', 'x')}`] : '';
  const objectFitClass = styles[`fit${objectFit.charAt(0).toUpperCase() + objectFit.slice(1)}`];

  const classNames = [
    styles.image,
    aspectRatioClass,
    objectFitClass,
    isLoaded ? styles.loaded : styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <img
      src={hasError ? fallbackSrc : src}
      alt={alt}
      className={classNames}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      decoding="async"
      {...rest}
    />
  );
};

export default Image;
