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
  accessibility: {
    id: 'indigo.footer.link.accessibility',
    defaultMessage: 'Accessibility',
    description: 'Footer Accessibility link',
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
  eea: {
    id: 'indigo.footer.link.eea',
    defaultMessage: 'EEA Privacy Disclosures',
    description: 'Footer EEA Privacy Disclosures link',
  },
});

export default messages;
