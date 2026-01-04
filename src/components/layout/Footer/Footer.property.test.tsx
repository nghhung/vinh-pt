import { describe, it, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { Footer } from './Footer';
import { NavItem, ContactInfo, SocialLink } from '../../../types';

/**
 * Property-based tests for Footer component social links
 * Feature: fitness-portfolio, Property 10: Social Links Render Correctly
 * Validates: Requirements 10.4
 */

const mockQuickLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

const mockContactInfo: ContactInfo = {
  email: 'test@example.com',
  phone: '+1 234 567 8900',
  address: '123 Test Street, City, Country',
};

// Arbitrary for generating valid social link platforms
const platformArb = fc.constantFrom<SocialLink['platform']>(
  'facebook',
  'instagram',
  'twitter',
  'youtube',
  'linkedin'
);

// Arbitrary for generating valid URLs
const urlArb = fc.webUrl();

// Arbitrary for generating a social link
const socialLinkArb = fc.record<SocialLink>({
  platform: platformArb,
  url: urlArb,
});

// Arbitrary for generating an array of unique social links (unique by platform)
const uniqueSocialLinksArb = fc
  .uniqueArray(socialLinkArb, {
    minLength: 1,
    maxLength: 5,
    selector: (link) => link.platform,
  });

describe('Footer Social Links Property Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Property 10: Social Links Render Correctly
   * For any array of social link objects containing platform and URL,
   * each link should render with the correct platform icon and href attribute matching the URL.
   */
  it('should render each social link with correct platform and URL', () => {
    fc.assert(
      fc.property(uniqueSocialLinksArb, (socialLinks) => {
        cleanup();

        const { container } = render(
          <Footer
            logo="/logo.png"
            description="Test description"
            quickLinks={mockQuickLinks}
            contactInfo={mockContactInfo}
            socialLinks={socialLinks}
          />
        );

        // Check that each social link is rendered with correct href and platform
        for (const social of socialLinks) {
          const linkElement = container.querySelector(
            `a[data-platform="${social.platform}"]`
          );
          
          // Link should exist
          if (!linkElement) {
            return false;
          }

          // Link should have correct href
          const href = linkElement.getAttribute('href');
          if (href !== social.url) {
            return false;
          }

          // Link should have correct aria-label
          const ariaLabel = linkElement.getAttribute('aria-label');
          if (!ariaLabel?.toLowerCase().includes(social.platform)) {
            return false;
          }

          // Link should open in new tab
          const target = linkElement.getAttribute('target');
          if (target !== '_blank') {
            return false;
          }

          // Link should have security attributes
          const rel = linkElement.getAttribute('rel');
          if (!rel?.includes('noopener') || !rel?.includes('noreferrer')) {
            return false;
          }
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });


  it('should render correct number of social links', () => {
    fc.assert(
      fc.property(uniqueSocialLinksArb, (socialLinks) => {
        cleanup();

        const { container } = render(
          <Footer
            logo="/logo.png"
            description="Test description"
            quickLinks={mockQuickLinks}
            contactInfo={mockContactInfo}
            socialLinks={socialLinks}
          />
        );

        const renderedLinks = container.querySelectorAll('a[data-platform]');
        return renderedLinks.length === socialLinks.length;
      }),
      { numRuns: 100 }
    );
  });

  it('should render social icon for each platform', () => {
    fc.assert(
      fc.property(uniqueSocialLinksArb, (socialLinks) => {
        cleanup();

        const { container } = render(
          <Footer
            logo="/logo.png"
            description="Test description"
            quickLinks={mockQuickLinks}
            contactInfo={mockContactInfo}
            socialLinks={socialLinks}
          />
        );

        // Each social link should contain an SVG icon
        for (const social of socialLinks) {
          const linkElement = container.querySelector(
            `a[data-platform="${social.platform}"]`
          );
          
          if (!linkElement) {
            return false;
          }

          const svgIcon = linkElement.querySelector('svg');
          if (!svgIcon) {
            return false;
          }
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
