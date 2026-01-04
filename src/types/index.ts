// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

// Contact Types
export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin';
  url: string;
}

// Hero Section Types
export interface HeroProps {
  backgroundImage: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

// Service Types
export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

// Pricing Types
export interface PricingCardProps {
  name: string;
  price: number;
  period: 'month' | 'session' | 'package';
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaLink: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  clientName: string;
  clientPhoto: string;
  review: string;
  rating?: number;
}

// Gallery Types
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  thumbnail?: string;
}

// BMI Calculator Types
export interface BMIInput {
  height: number;
  weight: number;
  unit: 'metric' | 'imperial';
}

export type BMICategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

export interface BMIResult {
  value: number;
  category: BMICategory;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface FormValidationError {
  field: string;
  message: string;
}
