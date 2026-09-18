import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  viewCourse: {
    id: 'public.course-card.view-course',
    defaultMessage: 'View course',
    description: 'Course card CTA button label',
  },
  loadingCourse: {
    id: 'public.course-card.loading-course',
    defaultMessage: 'Loading…',
    description: 'Course card CTA while fetching course detail API',
  },
  ratedOutOfFive: {
    id: 'public.course-card.rated-out-of-five',
    defaultMessage: 'Rated {rating} out of 5',
    description: 'Course card rating aria label',
  },
  untitledCourse: {
    id: 'public.course-card.untitled',
    defaultMessage: 'Untitled course',
    description: 'Fallback title when course has no name from the API',
  },
  closeVideo: {
    id: 'public.video-modal.close',
    defaultMessage: 'Close video',
    description: 'Close button / backdrop aria label for video modal',
  },
  videoTitle: {
    id: 'public.video-modal.title',
    defaultMessage: 'Course intro video',
    description: 'Default video modal title when course title is missing',
  },
});
export default messages;
