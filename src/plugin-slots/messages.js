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
});

export default messages;
