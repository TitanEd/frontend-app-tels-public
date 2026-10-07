import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  hoursPerWeek: {
    id: 'tels.card.hoursPerWeek',
    defaultMessage: '{hours, plural, one {# hour} other {# hours}} per week',
    description: 'Weekly effort of a course on a course card',
  },
  durationLong: {
    id: 'tels.card.durationLong',
    defaultMessage: '{duration} long',
    description: 'Course card duration meta',
  },
  courseImageAlt: {
    id: 'tels.card.imageAlt',
    defaultMessage: '{title}',
    description: 'Course card image alt text',
  },
  courseLinkAria: {
    id: 'tels.card.linkAria',
    defaultMessage: '{title}',
    description: 'Course card image link aria-label',
  },
});

export default messages;
