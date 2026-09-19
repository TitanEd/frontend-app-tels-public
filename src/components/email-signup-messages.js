import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  title: {
    id: 'tels.emailSignup.title',
    defaultMessage: 'Join our list to learn more',
    description: 'Email signup heading (PLL newsletter band)',
  },
  subtitle: {
    id: 'tels.emailSignup.subtitle',
    defaultMessage: 'Sign up to get updates on courses and events',
    description: 'Email signup subtitle (PLL newsletter band)',
  },
  submit: {
    id: 'tels.emailSignup.submit',
    defaultMessage: 'SUBSCRIBE',
    description: 'Email signup submit button (PLL uppercase)',
  },
  submitting: {
    id: 'tels.emailSignup.submitting',
    defaultMessage: 'Submitting…',
    description: 'Email signup submit button while pending',
  },
  success: {
    id: 'tels.emailSignup.success',
    defaultMessage: 'Thanks — you’re on the list.',
    description: 'Email signup success message',
  },
  error: {
    id: 'tels.emailSignup.error',
    defaultMessage: 'We could not save your email. Please try again.',
    description: 'Email signup generic error',
  },
  notFound: {
    id: 'tels.emailSignup.notFound',
    defaultMessage: 'Newsletter service is unavailable right now.',
    description: 'Email signup when API returns 404',
  },
  emailRequired: {
    id: 'tels.emailSignup.emailRequired',
    defaultMessage: 'Please enter your email address.',
    description: 'Email signup required field error',
  },
  emailInvalid: {
    id: 'tels.emailSignup.emailInvalid',
    defaultMessage: 'Please enter a valid email address.',
    description: 'Email signup invalid format error',
  },
  emailPlaceholder: {
    id: 'tels.emailSignup.emailPlaceholder',
    defaultMessage: 'Email',
    description: 'Email signup input placeholder',
  },
  emailAria: {
    id: 'tels.emailSignup.emailAria',
    defaultMessage: 'Email address',
    description: 'Email signup input aria-label',
  },
  joinListTitle: {
    id: 'tels.emailSignup.joinListTitle',
    defaultMessage: 'Join our list to learn more',
    description: 'Course page email signup heading',
  },
  joinListSubtitle: {
    id: 'tels.emailSignup.joinListSubtitle',
    defaultMessage: 'Sign up to get updates on courses and events',
    description: 'Course page email signup subtitle',
  },
});

export default messages;
