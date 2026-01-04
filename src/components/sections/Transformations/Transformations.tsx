import React, { useState, useRef, useCallback } from 'react';
import styles from './Transformations.module.css';

export interface TransformationData {
  id: string;
  name: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
}

interface TransformationsProps {
  title?: string;
  subtitle?: string;
  transformations: TransformationData[];
}

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  name: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  name,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={styles.sliderContainer}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      role="img"
      aria-label={`Before and after comparison for ${name}`}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={`${name} - After`}
        className={styles.afterImage}
        loading="lazy"
      />
      
      {/* Before Image (Clipped) */}
      <div
        className={styles.beforeImageWrapper}
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`${name} - Before`}
          className={styles.beforeImage}
          loading="lazy"
        />
      </div>

      {/* Slider Handle */}
      <div
        className={styles.sliderHandle}
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        role="slider"
        aria-valuenow={sliderPosition}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Drag to compare before and after"
        tabIndex={0}
      >
        <div className={styles.sliderLine} />
        <div className={styles.sliderButton}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8l4 4-4 4M6 8l-4 4 4 4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className={styles.labelBefore}>Trước</span>
      <span className={styles.labelAfter}>Sau</span>
    </div>
  );
};

export const Transformations: React.FC<TransformationsProps> = ({
  title = 'Kết Quả Thực Tế',
  subtitle = 'Những câu chuyện thành công từ học viên của chúng tôi',
  transformations,
}) => {
  return (
    <section className={styles.transformations} aria-labelledby="transformations-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="transformations-title" className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <div className={styles.grid}>
          {transformations.map((transformation) => (
            <article key={transformation.id} className={styles.card}>
              <BeforeAfterSlider
                beforeImage={transformation.beforeImage}
                afterImage={transformation.afterImage}
                name={transformation.name}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardName}>{transformation.name}</h3>
                <span className={styles.cardDuration}>{transformation.duration}</span>
                {transformation.description && (
                  <p className={styles.cardDescription}>{transformation.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Transformations;
