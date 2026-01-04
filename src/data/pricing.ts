import { PricingCardProps } from '../types';

export const pricingPlans: PricingCardProps[] = [
  {
    name: 'Cơ Bản',
    price: 1500000,
    period: 'month',
    features: [
      'Tập luyện tại phòng gym',
      '2 buổi tập nhóm/tuần',
      'Đánh giá thể lực ban đầu',
      'Hỗ trợ qua Zalo',
    ],
    isPopular: false,
    ctaText: 'Đăng Ký Ngay',
    ctaLink: '/contact?plan=basic',
  },
  {
    name: 'Nâng Cao',
    price: 3500000,
    period: 'month',
    features: [
      'Tất cả gói Cơ Bản',
      '8 buổi PT 1-1/tháng',
      'Tập nhóm không giới hạn',
      'Tư vấn dinh dưỡng',
      'Theo dõi tiến độ hàng tuần',
      'Hỗ trợ ưu tiên 24/7',
    ],
    isPopular: true,
    ctaText: 'Chọn Gói Này',
    ctaLink: '/contact?plan=advanced',
  },
  {
    name: 'VIP',
    price: 6000000,
    period: 'month',
    features: [
      'Tất cả gói Nâng Cao',
      '12 buổi PT 1-1/tháng',
      'Kế hoạch ăn uống chi tiết',
      'Phân tích thành phần cơ thể',
      'Liên hệ HLV 24/7',
      'Buổi recovery massage',
      'Workshop độc quyền',
    ],
    isPopular: false,
    ctaText: 'Trở Thành VIP',
    ctaLink: '/contact?plan=vip',
  },
  {
    name: 'Buổi Lẻ',
    price: 500000,
    period: 'session',
    features: [
      '1 buổi PT 60 phút',
      'Bài tập cá nhân hóa',
      'Hướng dẫn kỹ thuật',
      'Tư vấn bài tập về nhà',
    ],
    isPopular: false,
    ctaText: 'Đặt Lịch',
    ctaLink: '/contact?plan=single',
  },
];

export default pricingPlans;
