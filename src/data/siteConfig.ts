import { ContactInfo, SocialLink, NavItem } from '../types';

export interface SiteConfig {
  siteName: string;
  logo: string;
  tagline: string;
  contact: ContactInfo;
  socialLinks: SocialLink[];
  navItems: NavItem[];
}

export const siteConfig: SiteConfig = {
  siteName: 'Vinh PT',
  logo: '/images/vinh-logo.png',
  tagline: 'Thay Đổi Cơ Thể, Thay Đổi Cuộc Sống',
  contact: {
    email: 'vinhpt.fitness@gmail.com',
    phone: '0909 123 456',
    address: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
  },
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/vinhpt.fitness' },
    { platform: 'instagram', url: 'https://instagram.com/vinhpt.fitness' },
    { platform: 'youtube', url: 'https://youtube.com/@vinhpt.fitness' },
    { platform: 'twitter', url: 'https://twitter.com/vinhpt_fitness' },
  ],
  navItems: [
    { label: 'Trang Chủ', href: '/' },
    { label: 'Giới Thiệu', href: '/about' },
    { label: 'Dịch Vụ', href: '/services' },
    { label: 'Bảng Giá', href: '/pricing' },
    { label: 'Thư Viện', href: '/gallery' },
    { label: 'Liên Hệ', href: '/contact' },
  ],
};

export default siteConfig;
