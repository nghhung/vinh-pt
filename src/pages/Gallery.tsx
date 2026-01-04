import React from 'react';
import { Gallery as GallerySection } from '../components/sections/Gallery';
import { galleryImages } from '../data';
import styles from './Gallery.module.css';

const Gallery: React.FC = () => {
  return (
    <div className={styles.galleryPage}>
      <section className={styles.hero} aria-labelledby="gallery-page-title">
        <div className={styles.heroContent}>
          <h1 id="gallery-page-title" className={styles.heroTitle}>Thư Viện Ảnh</h1>
          <p className={styles.heroSubtitle}>
            Xem các buổi tập, cơ sở vật chất và kết quả của học viên
          </p>
        </div>
      </section>

      <GallerySection
        title="Hoạt Động Tập Luyện"
        subtitle="Click vào ảnh để xem kích thước đầy đủ"
        images={galleryImages}
      />
    </div>
  );
};

export default Gallery;
