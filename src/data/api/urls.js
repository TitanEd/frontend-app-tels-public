import { getConfig } from '@edx/frontend-platform';

export const getLmsBaseUrl = () => getConfig().LMS_BASE_URL || '';

/**
 * Template A control-panel course list / faceted search
 * (`course_metadata.CourseListView`).
 */
export const getCatalogCoursesUrl = () => (
  `${getLmsBaseUrl()}/api/v1/catalog/courses/`
);

/**
 * Template A control-panel course detail
 * (`course_metadata.CourseDetailView`).
 */
export const getCatalogCourseDetailUrl = (courseId) => (
  `${getLmsBaseUrl()}/api/v1/catalog/courses/${encodeURIComponent(courseId)}`
);

/**
 * Template A control-panel related courses
 * (`course_metadata.CourseRecommendationsView`).
 */
export const getCatalogRecommendationsUrl = (courseId) => (
  `${getLmsBaseUrl()}/api/v1/catalog/courses/${encodeURIComponent(courseId)}/recommendations/`
);

/**
 * Template A control-panel enroll/unenroll
 * (`course_metadata.ChangeEnrollmentView`).
 */
export const getChangeEnrollmentUrl = () => (
  `${getLmsBaseUrl()}/api/v1/catalog/change-enrollment/`
);

/**
 * Home promo — keep planned TitanEd path until control-panel adds it.
 */
export const getHomePromoUrl = () => (
  `${getLmsBaseUrl()}/api/tels/v1/home/promo/`
);

/**
 * Template A control-panel contact form (`contat_us.ContactUsAPIView`).
 */
export const getContactUrl = () => (
  `${getLmsBaseUrl()}/api/v1/contact-us/`
);

/**
 * Template A control-panel footer content
 * (`ui_configuration.footer_config` → FooterConfiguration).
 * Prefer MFE_CONFIG.FOOTER_CONFIG_URL when Tutor wires it.
 */
export const getFooterConfigUrl = () => {
  try {
    const configured = getConfig().FOOTER_CONFIG_URL;
    if (configured) {
      return configured;
    }
  } catch {
    // config may be unavailable in tests
  }
  return `${getLmsBaseUrl()}/ui_configuration/footer-config`;
};
