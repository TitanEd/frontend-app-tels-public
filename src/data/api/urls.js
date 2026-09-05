import { getConfig } from '@edx/frontend-platform';

export const getLmsBaseUrl = () => getConfig().LMS_BASE_URL || '';

/** Open edX course list search (catalog MFE standard). */
export const getCourseListSearchUrl = () => (
  `${getLmsBaseUrl()}/search/unstable/v0/course_list_search/`
);

/** Optional TitanEd enriched search wrapper. */
export const getTelsCourseSearchUrl = () => (
  `${getLmsBaseUrl()}/api/tels/v1/courses/search/`
);

/** Open edX courseware about/detail. */
export const getCourseAboutUrl = (courseId) => (
  `${getLmsBaseUrl()}/api/courseware/course/${encodeURIComponent(courseId)}`
);

/** Optional TitanEd detail by course key. */
export const getTelsCourseDetailUrl = (courseId) => (
  `${getLmsBaseUrl()}/api/tels/v1/courses/${encodeURIComponent(courseId)}/`
);

/** Optional TitanEd detail by marketing slug. */
export const getTelsCourseBySlugUrl = (slug) => (
  `${getLmsBaseUrl()}/api/tels/v1/courses/by-slug/${encodeURIComponent(slug)}/`
);

export const getChangeEnrollmentUrl = () => (
  `${getLmsBaseUrl()}/change_enrollment`
);

export const getSuggestedCoursesUrl = (courseId) => (
  `${getLmsBaseUrl()}/api/tels/v1/courses/${encodeURIComponent(courseId)}/suggested/`
);

export const getHomePromoUrl = () => (
  `${getLmsBaseUrl()}/api/tels/v1/home/promo/`
);

export const getContactUrl = () => (
  `${getLmsBaseUrl()}/api/tels/v1/contact/`
);
