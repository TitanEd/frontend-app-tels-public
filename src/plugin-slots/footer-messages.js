import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  exploreCoursesCta: {
    id: 'indigo.footer.exploreCoursesCta',
    defaultMessage: 'Explore courses',
    description: 'Footer CTA button',
  },
  linksHeading: {
    id: 'indigo.footer.links.heading',
    defaultMessage: 'Footer Links',
    description: 'Screen-reader-only heading for the footer legal-links column (matches the live pll.harvard.edu markup, which hides this heading visually)',
  },
  home: {
    id: 'indigo.footer.link.home',
    defaultMessage: 'Home',
    description: 'Footer Home link (public MFE)',
  },
  privacy: {
    id: 'indigo.footer.link.privacy',
    defaultMessage: 'Privacy Policy',
    description: 'Footer Privacy Policy link',
  },
  terms: {
    id: 'indigo.footer.link.terms',
    defaultMessage: 'Terms of Use',
    description: 'Footer Terms of Use link',
  },
  about: {
    id: 'indigo.footer.link.about',
    defaultMessage: 'About Us',
    description: 'Footer About Us link',
  },
  contact: {
    id: 'indigo.footer.link.contact',
    defaultMessage: 'Contact',
    description: 'Footer Contact link',
  },
  homeAria: {
    id: 'indigo.footer.logo.aria',
    defaultMessage: '{siteName} Home',
    description: 'Footer logo link aria-label',
  },
  logoAlt: {
    id: 'indigo.footer.logo.alt',
    defaultMessage: '{siteName}',
    description: 'Footer logo image alt text',
  },
});

export default messages;
