import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  viewCourse: {
    id: 'public.course-card.view-course',
    defaultMessage: 'View course',
    description: 'Course card CTA button label',
  },
  ratedOutOfFive: {
    id: 'public.course-card.rated-out-of-five',
    defaultMessage: 'Rated {rating} out of 5',
    description: 'Course card rating aria label',
  },
});
export default messages;
