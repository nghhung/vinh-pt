import React from 'react';
import { GalleryImage } from '../../../types';
import { useLightbox } from '../../../hooks/useLightbox';
import { Lightbox } from '../../ui/Lightbox';
import styles from './Gallery.module.css';

export interface GalleryProps {
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
  columns?: number;
}

export const Gallery: React.FC<GalleryProps> = ({
  title = 'Gallery',
  subtitle = 'See our training sessions and client transformations',
  images,
}) => {
  const { isOpen, currentIndex, open, close, next, previous } = useLightbox(images);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open(index);
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <section className={styles.gallery} id="gallery" aria-labelledby="gallery-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="gallery-title" className={styles.title}>
            {title}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>

        <div className={styles.grid} role="list" aria-label="Image gallery">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={styles.imageWrapper}
              onClick={() => open(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="listitem"
              tabIndex={0}
              aria-label={`View ${image.alt}`}
            >
              <img
                src={image.thumbnail || image.src}
                alt={image.alt}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.overlay} aria-hidden="true">
                <svg
                  className={styles.zoomIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={close}
        onNext={next}
        onPrevious={previous}
      />
    </section>
  );
};

export default Gallery;
