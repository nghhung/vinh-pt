import React from 'react';
import { About as AboutSection } from '../components/sections/About';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero} aria-labelledby="about-page-title">
        <div className={styles.heroContent}>
          <h1 id="about-page-title" className={styles.heroTitle}>Về Tôi</h1>
          <p className={styles.heroSubtitle}>
            Tận tâm giúp bạn đạt được mục tiêu fitness
          </p>
        </div>
      </section>

      <AboutSection
        profileImage="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop"
        name="Vinh PT"
        title="Huấn Luyện Viên Cá Nhân & Chuyên Gia Fitness"
        biography="Với hơn 8 năm kinh nghiệm trong ngành fitness, tôi đã dành cả sự nghiệp để giúp mọi người thay đổi cuộc sống thông qua tập luyện. Hành trình của tôi bắt đầu từ một vận động viên nghiệp dư, điều này đã khơi dậy niềm đam mê tìm hiểu về cơ thể con người và tiềm năng thay đổi đáng kinh ngạc của nó.

Tôi sở hữu các chứng chỉ quốc tế từ ISSA, ACE và liên tục cập nhật kiến thức để mang đến cho bạn những phương pháp tập luyện khoa học nhất. Phương pháp của tôi là toàn diện – tôi tin rằng fitness thực sự không chỉ là sức mạnh thể chất, mà còn là sự kiên cường tinh thần và cân bằng dinh dưỡng.

Dù bạn mới bắt đầu hành trình fitness hay đang tìm cách vượt qua điểm dừng, tôi sẽ đồng hành cùng bạn từng bước. Triết lý huấn luyện của tôi tập trung vào tiến bộ bền vững, kỹ thuật đúng và xây dựng thói quen lâu dài."
        stats={[
          { value: '8+', label: 'Năm Kinh Nghiệm' },
          { value: '300+', label: 'Học Viên' },
          { value: '5', label: 'Chứng Chỉ Quốc Tế' },
          { value: '98%', label: 'Hài Lòng' },
        ]}
        ctaText="Bắt Đầu Ngay"
        ctaLink="/contact"
      />

      <section className={styles.certifications} aria-labelledby="certifications-title">
        <div className={styles.container}>
          <h2 id="certifications-title" className={styles.sectionTitle}>Chứng Chỉ & Bằng Cấp</h2>
          <div className={styles.certGrid} role="list">
            <article className={styles.certCard} role="listitem">
              <h3>ISSA Certified Personal Trainer</h3>
              <p>International Sports Sciences Association</p>
            </article>
            <article className={styles.certCard} role="listitem">
              <h3>ACE Fitness Nutrition Specialist</h3>
              <p>American Council on Exercise</p>
            </article>
            <article className={styles.certCard} role="listitem">
              <h3>Chứng Chỉ Huấn Luyện Viên Thể Hình</h3>
              <p>Tổng Cục Thể Dục Thể Thao Việt Nam</p>
            </article>
            <article className={styles.certCard} role="listitem">
              <h3>CPR/AED Certified</h3>
              <p>Sơ Cấp Cứu & Hồi Sức Tim Phổi</p>
            </article>
            <article className={styles.certCard} role="listitem">
              <h3>TRX Suspension Training</h3>
              <p>TRX Training Certified</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
