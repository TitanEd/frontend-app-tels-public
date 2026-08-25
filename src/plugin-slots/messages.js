import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  homeAria: {
    id: 'tels.header.logo.aria',
    defaultMessage: '{siteName} Home',
    description: 'Aria label for the header logo home link',
  },
  primaryNav: {
    id: 'tels.header.nav.aria',
    defaultMessage: 'Primary',
    description: 'Aria label for primary navigation',
  },
  home: {
    id: 'tels.header.nav.home',
    defaultMessage: 'Home',
    description: 'Header Home link',
  },
  dashboard: {
    id: 'tels.header.nav.dashboard',
    defaultMessage: 'Dashboard',
    description: 'Header Dashboard link',
  },
  courses: {
    id: 'tels.header.nav.courses',
    defaultMessage: 'Courses',
    description: 'Header Courses link',
  },
  about: {
    id: 'tels.header.nav.about',
    defaultMessage: 'About Us',
    description: 'Header About Us link',
  },
  contact: {
    id: 'tels.header.nav.contact',
    defaultMessage: 'Contact',
    description: 'Header Contact link',
  },
  signIn: {
    id: 'tels.header.actions.signIn',
    defaultMessage: 'Sign In',
    description: 'Header Sign In button',
  },
  register: {
    id: 'tels.header.actions.register',
    defaultMessage: 'Register',
    description: 'Header Register button',
  },
  menu: {
    id: 'tels.header.mobile.menu',
    defaultMessage: 'Menu',
    description: 'Mobile menu toggle aria label',
  },
  userMenu: {
    id: 'tels.header.user.menu',
    defaultMessage: 'User menu',
    description: 'Authenticated user menu toggle aria label',
  },
  profile: {
    id: 'tels.header.user.profile',
    defaultMessage: 'Profile',
    description: 'User dropdown Profile link',
  },
  account: {
    id: 'tels.header.user.account',
    defaultMessage: 'Account',
    description: 'User dropdown Account settings link',
  },
  logout: {
    id: 'tels.header.user.logout',
    defaultMessage: 'Sign Out',
    description: 'User dropdown Sign Out link',
  },
});
export default messages;
