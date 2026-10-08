/**
 * Start date of a course in the visitor's language. The catalog API gives a ready-made English label
 * (`start_date_label`: "Self-paced" or the advertised start), so the UI prefers the facts behind it:
 * self-paced courses get a translated label and dated courses a localised date.
 */
import { defineMessages } from '@edx/frontend-platform/i18n';

export const courseDateMessages = defineMessages({
  selfPaced: {
    id: 'public.course-card.self-paced',
    defaultMessage: 'Self-paced',
    description: 'Shown instead of a start date for self-paced courses',
  },
});

export const formatStartDate = (intl, course) => {
  if (course.selfPaced) {
    return intl.formatMessage(courseDateMessages.selfPaced);
  }
  if (course.start) {
    const date = new Date(course.start);
    if (!Number.isNaN(date.getTime())) {
      return intl.formatDate(date, { year: 'numeric', month: 'short', day: 'numeric' });
    }
  }
  return course.startDate || '';
};
