import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Services } from '../components/sections/Services';
import { Testimonials } from '../components/sections/Testimonials';
import { Transformations } from '../components/sections/Transformations';
import { BMICalculator } from '../components/features/BMICalculator';
import { services, testimonials, transformations } from '../data';

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

const Home: React.FC = () => {
  // Transform services data to include React icons
  const servicesWithIcons = services.slice(0, 6).map((service) => ({
    icon: getServiceIcon(service.iconName),
    title: service.title,
    description: service.description,
    link: service.link,
  }));

  return (
    <>
      <Hero
        backgroundImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop"
        headline="Thay Đổi Cơ Thể, Thay Đổi Cuộc Sống"
        subheadline="Huấn luyện viên cá nhân chuyên nghiệp với hơn 8 năm kinh nghiệm. Cùng bạn đạt được mục tiêu fitness."
        ctaText="Bắt Đầu Ngay"
        ctaLink="/contact"
      />

      <About
        profileImage="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop"
        name="Vinh PT"
        title="Huấn Luyện Viên Cá Nhân & Chuyên Gia Fitness"
        biography="Với hơn 8 năm kinh nghiệm trong ngành fitness, tôi đã giúp hàng trăm học viên đạt được mục tiêu sức khỏe của họ. Phương pháp của tôi kết hợp chương trình tập luyện cá nhân hóa, hướng dẫn dinh dưỡng và hỗ trợ liên tục để đảm bảo kết quả bền vững. Tôi tin rằng mỗi người đều có thể thay đổi nếu có phương pháp đúng và sự kiên trì."
        stats={[
          { value: '8+', label: 'Năm Kinh Nghiệm' },
          { value: '300+', label: 'Học Viên' },
          { value: '5', label: 'Chứng Chỉ Quốc Tế' },
        ]}
        ctaText="Tìm Hiểu Thêm"
        ctaLink="/about"
      />

      <Services
        title="Dịch Vụ Của Chúng Tôi"
        subtitle="Giải pháp fitness toàn diện được thiết kế riêng cho bạn"
        services={servicesWithIcons}
      />

      <Testimonials
        title="Học Viên Nói Gì"
        subtitle="Những câu chuyện thật từ những người đã thay đổi cuộc sống"
        testimonials={testimonials}
        autoPlay={true}
        interval={5000}
      />

      <Transformations
        title="Kết Quả Thực Tế"
        subtitle="Kéo thanh trượt để xem sự thay đổi trước và sau khi tập luyện"
        transformations={transformations}
      />

      <BMICalculator defaultUnit="metric" />
    </>
  );
};

export default Home;
