import React from 'react';
import { Contact as ContactSection } from '../components/sections/Contact';
import { siteConfig } from '../data';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const handleSubmit = async (data: { name: string; email: string; phone?: string; message: string }) => {
    // Simulate form submission
    console.log('Form submitted:', data);
    // In a real app, this would send data to a backend
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className={styles.contactPage}>
      <section className={styles.hero} aria-labelledby="contact-page-title">
        <div className={styles.heroContent}>
          <h1 id="contact-page-title" className={styles.heroTitle}>Liên Hệ</h1>
          <p className={styles.heroSubtitle}>
            Liên hệ ngay để bắt đầu hành trình fitness của bạn
          </p>
        </div>
      </section>

      <ContactSection
        title="Gửi Tin Nhắn"
        subtitle="Có câu hỏi? Chúng tôi rất muốn nghe từ bạn. Điền form bên dưới và chúng tôi sẽ phản hồi sớm nhất có thể."
        contactInfo={siteConfig.contact}
        socialLinks={siteConfig.socialLinks}
        mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197956!2d106.70142!3d10.7769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa5777fb3a5bb9972!2zTmd1eeG7hW4gSHXhu4csIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1699999999999!5m2!1svi!2s"
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Contact;
