import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  docTitle: {
    id: 'tels.contact.docTitle',
    defaultMessage: 'Contact — TELS by TitanEd',
    description: 'Contact page document title',
  },
  heading: {
    id: 'tels.contact.heading',
    defaultMessage: 'Contact',
    description: 'Contact page H1',
  },
  intro: {
    id: 'tels.contact.intro',
    defaultMessage: 'Questions about a course, partnership, or your account? Send us a note.',
    description: 'Contact page intro',
  },
  name: {
    id: 'tels.contact.field.name',
    defaultMessage: 'Name',
    description: 'Contact form label',
  },
  email: {
    id: 'tels.contact.field.email',
    defaultMessage: 'Email',
    description: 'Contact form label',
  },
  message: {
    id: 'tels.contact.field.message',
    defaultMessage: 'Message',
    description: 'Contact form label',
  },
  nameRequired: {
    id: 'tels.contact.field.nameRequired',
    defaultMessage: 'Please enter your name.',
    description: 'Contact name required error',
  },
  emailRequired: {
    id: 'tels.contact.field.emailRequired',
    defaultMessage: 'Please enter your email address.',
    description: 'Contact email required error',
  },
  emailInvalid: {
    id: 'tels.contact.field.emailInvalid',
    defaultMessage: 'Please enter a valid email address.',
    description: 'Contact email invalid error',
  },
  messageRequired: {
    id: 'tels.contact.field.messageRequired',
    defaultMessage: 'Please enter a message.',
    description: 'Contact message required error',
  },
  send: {
    id: 'tels.contact.send',
    defaultMessage: 'Send message',
    description: 'Contact form submit',
  },
  sending: {
    id: 'tels.contact.sending',
    defaultMessage: 'Sending…',
    description: 'Contact form submit while pending',
  },
  thanks: {
    id: 'tels.contact.thanks',
    defaultMessage: 'Thanks — we’ll be in touch.',
    description: 'Contact form success',
  },
  error: {
    id: 'tels.contact.error',
    defaultMessage: 'We could not send your message. Please try again.',
    description: 'Contact form generic error',
  },
  notFound: {
    id: 'tels.contact.notFound',
    defaultMessage: 'Contact service is unavailable right now.',
    description: 'Contact form when API returns 404',
  },
  reachUs: {
    id: 'tels.contact.reachUs',
    defaultMessage: 'Reach us',
    description: 'Contact aside heading',
  },
  emailAddress: {
    id: 'tels.contact.emailAddress',
    defaultMessage: 'Legal@TitanEd.com',
    description: 'Public contact email address',
  },
  address: {
    id: 'tels.contact.address',
    defaultMessage: 'Gurugram, Haryana, India',
    description: 'Public contact address',
  },
  websiteLabel: {
    id: 'tels.contact.websiteLabel',
    defaultMessage: 'titaned.com',
    description: 'Contact website link label',
  },
  linkedinLabel: {
    id: 'tels.contact.linkedinLabel',
    defaultMessage: 'LinkedIn',
    description: 'Contact LinkedIn link label',
  },
});

export default messages;
