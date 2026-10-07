/** The "time" chip of a course card: "<duration> long" for a real duration, else the weekly effort. */
export const formatCourseTime = (intl, course, messages) => {
  const duration = String(course.duration || '').replace(/\s*long$/i, '').trim();
  if (duration) {
    return intl.formatMessage(messages.durationLong, { duration });
  }
  if (typeof course.effortHours === 'number' && course.effortHours > 0) {
    return intl.formatMessage(messages.hoursPerWeek, { hours: Math.round(course.effortHours * 10) / 10 });
  }
  return course.effort || '';
};
