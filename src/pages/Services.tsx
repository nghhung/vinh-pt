import React from 'react';
import { Services as ServicesSection } from '../components/sections/Services';
import { services } from '../data';
import styles from './Services.module.css';

// Service icons mapping
const serviceIcons: Record<string, React.ReactNode> = {
  dumbbell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5h11M6.5 17.5h11M3 11h3v2H3zM18 11h3v2h-3zM6 8v8M18 8v8M9 6v12M15 6v12" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  laptop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V20a2 2 0 1 0 4 0V9.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z" />
      <path d="M12 2c1.5 0 3 .5 4 1.5" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 12h18M5 5l14 14M19 5L5 19" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

const getServiceIcon = (iconName: string): React.ReactNode => {
  return serviceIcons[iconName] || serviceIcons.dumbbell;
};

const Services: React.FC = () => {
  // Transform services data to include React icons
  const servicesWithIcons = services.map((service) => ({
    icon: getServiceIcon(service.iconName),
    title: service.title,
    description: service.description,
    link: service.link,
  }));

  return (
    <div className={styles.servicesPage}>
      <section className={styles.hero} aria-labelledby="services-page-title">
        <div className={styles.heroContent}>
          <h1 id="services-page-title" className={styles.heroTitle}>Dịch Vụ</h1>
          <p className={styles.heroSubtitle}>
            Giải pháp fitness toàn diện được thiết kế riêng cho mục tiêu của bạn
          </p>
        </div>
      </section>

      <ServicesSection
        title="Chúng Tôi Cung Cấp"
        subtitle="Lựa chọn từ các dịch vụ fitness chuyên nghiệp được thiết kế để giúp bạn thành công"
        services={servicesWithIcons}
      />

      <section className={styles.cta} aria-labelledby="services-cta-title">
        <div className={styles.ctaContent}>
          <h2 id="services-cta-title">Sẵn Sàng Bắt Đầu?</h2>
          <p>Đặt lịch tư vấn miễn phí để thảo luận về mục tiêu fitness của bạn</p>
          <a href="/contact" className={styles.ctaButton} role="button">
            Liên Hệ Ngay
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
