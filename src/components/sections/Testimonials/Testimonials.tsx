import React, { useState, useEffect, useCallback } from 'react';
import { Testimonial } from '../../../types';
import styles from './Testimonials.module.css';

export interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  title = 'What Our Clients Say',
  subtitle = 'Real stories from real people who transformed their lives',
  testimonials,
  autoPlay = false,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  }, [testimonials.length]);

  const goToPrevious = useCallback(() => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoPlay && testimonials.length > 1) {
      const timer = setInterval(goToNext, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, goToNext, testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${styles.star} ${i > rating ? styles.starEmpty : ''}`}
          aria-hidden="true"
        >
          ★
        </span>
      );
    }
    return (
      <div className={styles.rating} aria-label={`Rating: ${rating} out of 5 stars`}>
        {stars}
      </div>
    );
  };

  return (
    <section
      className={styles.testimonials}
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="testimonials-title" className={styles.title}>
            {title}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>

        <div
          className={styles.carousel}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={styles.slide}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${testimonials.length}`}
                aria-hidden={index !== currentIndex}
              >
                <article className={styles.testimonialCard}>
                  <img
                    src={testimonial.clientPhoto}
                    alt={`${testimonial.clientName}`}
                    className={styles.clientPhoto}
                    loading="lazy"
                  />
                  <p className={styles.review}>{testimonial.review}</p>
                  <h3 className={styles.clientName}>{testimonial.clientName}</h3>
                  {renderStars(testimonial.rating)}
                </article>
              </div>
            ))}
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.navButton}
              onClick={goToPrevious}
              aria-label="Previous testimonial"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className={styles.dots} role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                  onClick={() => goToSlide(index)}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.navButton}
              onClick={goToNext}
              aria-label="Next testimonial"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
