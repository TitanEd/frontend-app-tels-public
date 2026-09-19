import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  homeAria: {
    id: 'tels.header.logo.aria',
    defaultMessage: '{siteName} Home',
    description: 'Aria label for header logo home link',
  },
  menu: {
    id: 'tels.header.mobile.menu',
    defaultMessage: 'Menu',
    description: 'Hamburger menu toggle aria label',
  },
  viewAllCourses: {
    id: 'tels.header.viewAllCourses',
    defaultMessage: 'View all courses',
    description: 'Header "View all courses" button',
  },
  browseBySubject: {
    id: 'tels.header.browseBySubject',
    defaultMessage: 'Browse by Subject Area',
    description: 'Subject mega-menu heading',
  },
  close: {
    id: 'tels.header.mobile.close',
    defaultMessage: 'Close menu',
    description: 'Hamburger menu close aria label',
  },
  searchLabel: {
    id: 'tels.header.search.label',
    defaultMessage: 'Search',
    description: 'Visually hidden label for header catalog search',
  },
  searchPlaceholder: {
    id: 'tels.header.search.placeholder',
    defaultMessage: 'Search',
    description: 'Placeholder for header catalog search input',
  },
  searchSubmit: {
    id: 'tels.header.search.submit',
    defaultMessage: 'Apply search',
    description: 'Aria label for header search submit / icon button',
  },
  logoAlt: {
    id: 'tels.header.logo.alt',
    defaultMessage: '{siteName}',
    description: 'Header logo image alt text',
  },
});

export default messages;
