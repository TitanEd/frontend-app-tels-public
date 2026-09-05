import { camelCaseObject, getConfig } from '@edx/frontend-platform';

import {
  buildLoginRedirectUrl, getHttpClient, getHttpStatus, isHttpError, logApiFailure,
} from './http';
import { getChangeEnrollmentUrl } from './urls';

/**
 * Enroll via LMS `/change_enrollment` (Open edX catalog standard).
 * Does NOT fake success on failure.
 */
export async function enrollInCourse(courseId, { nextPath } = {}) {
  if (!courseId) {
    const err = new Error('Missing course_id');
    err.code = 'MISSING_COURSE_ID';
    throw err;
  }

  try {
    const { data } = await getHttpClient().post(
      getChangeEnrollmentUrl(),
      {
        course_id: courseId,
        enrollment_action: 'enroll',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      },
    );
    const payload = camelCaseObject(data) || {};
    return {
      ok: true,
      courseId,
      ...payload,
      redirect: payload.redirect
        || payload.learningUrl
        || `${getConfig().LMS_BASE_URL}/dashboard`,
    };
  } catch (error) {
    logApiFailure('enrollInCourse failed', error);

    if (isHttpError(error, 403)) {
      const loginNext = nextPath
        || (typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '/');
      const loginError = new Error('Login required to enroll');
      loginError.code = 'LOGIN_REQUIRED';
      loginError.loginUrl = buildLoginRedirectUrl(loginNext);
      loginError.status = 403;
      throw loginError;
    }

    const status = getHttpStatus(error);
    const enrollError = new Error(
      error?.response?.data?.error?.message
      || error?.message
      || 'Enrollment is not available for this course',
    );
    enrollError.code = 'ENROLLMENT_FAILED';
    enrollError.status = status;
    throw enrollError;
  }
}

/**
 * Paid checkout: navigate to ecommerce link from detail (no enroll POST).
 */
export function redirectToCheckout(checkoutUrl) {
  if (!checkoutUrl) {
    return false;
  }
  window.location.href = checkoutUrl;
  return true;
}
