export interface ServiceData {
  id: string;
  iconName: string;
  title: string;
  description: string;
  link?: string;
}

export const services: ServiceData[] = [
  {
    id: 'personal-training',
    iconName: 'dumbbell',
    title: 'Tập Luyện Cá Nhân',
    description: 'Chương trình tập luyện 1-1 được thiết kế riêng theo mục tiêu của bạn. Được hướng dẫn trực tiếp bởi HLV Vinh với hơn 8 năm kinh nghiệm.',
    link: '/services#personal-training',
  },
  {
    id: 'group-classes',
    iconName: 'users',
    title: 'Lớp Tập Nhóm',
    description: 'Các lớp tập nhóm năng động bao gồm HIIT, Strength Training, và Cardio. Tập luyện cùng cộng đồng để duy trì động lực.',
    link: '/services#group-classes',
  },
  {
    id: 'online-coaching',
    iconName: 'laptop',
    title: 'Huấn Luyện Online',
    description: 'Chương trình tập luyện online linh hoạt, phù hợp với lịch trình bận rộn. Bao gồm video hướng dẫn và theo dõi tiến độ hàng tuần.',
    link: '/services#online-coaching',
  },
  {
    id: 'nutrition-planning',
    iconName: 'apple',
    title: 'Tư Vấn Dinh Dưỡng',
    description: 'Lập kế hoạch dinh dưỡng khoa học, phù hợp với khẩu vị người Việt. Hỗ trợ đạt mục tiêu giảm cân hoặc tăng cơ hiệu quả.',
    link: '/services#nutrition-planning',
  },
  {
    id: 'weight-loss',
    iconName: 'scale',
    title: 'Giảm Cân - Giảm Mỡ',
    description: 'Chương trình giảm cân bền vững, kết hợp tập luyện và dinh dưỡng. Cam kết kết quả rõ rệt sau 3 tháng.',
    link: '/services#weight-loss',
  },
  {
    id: 'muscle-building',
    iconName: 'bolt',
    title: 'Tăng Cơ - Tăng Sức Mạnh',
    description: 'Xây dựng cơ bắp và sức mạnh với phương pháp khoa học. Phù hợp cho người mới bắt đầu đến vận động viên chuyên nghiệp.',
    link: '/services#muscle-building',
  },
];

export default services;
