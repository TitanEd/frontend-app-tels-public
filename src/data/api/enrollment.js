import { camelCaseObject, getConfig } from '@edx/frontend-platform';

import {
  buildLoginRedirectUrl, getHttpClient, getHttpStatus, isHttpError, logApiFailure,
} from './http';
import { getChangeEnrollmentUrl } from './urls';

/**
 * Enroll via Template A control-panel
 * `POST /api/v1/catalog/change-enrollment/`.
 * Does NOT fake success on failure.
 * User-visible local copy must use intl message ids in the UI layer.
 */
export async function enrollInCourse(courseId, { nextPath } = {}) {
  if (!courseId) {
    const err = new Error('');
    err.code = 'MISSING_COURSE_ID';
    err.fromApi = false;
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
          'Content-Type': 'application/json',
        },
      },
    );
    const payload = camelCaseObject(data) || {};
    const lmsBase = getConfig().LMS_BASE_URL || '';
    const rawRedirect = payload.redirectUrl
      || payload.redirect
      || payload.learningUrl
      || '';
    let redirect = `${lmsBase}/dashboard`;
    if (rawRedirect) {
      if (/^https?:\/\//i.test(rawRedirect)) {
        redirect = rawRedirect;
      } else {
        redirect = `${lmsBase}${rawRedirect.startsWith('/') ? '' : '/'}${rawRedirect}`;
      }
    }
    return {
      ok: true,
      courseId,
      ...payload,
      redirect,
    };
  } catch (error) {
    logApiFailure('enrollInCourse failed', error);

    if (isHttpError(error, 403) || isHttpError(error, 401)) {
      const loginNext = nextPath
        || (typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '/');
      const loginError = new Error('');
      loginError.code = 'LOGIN_REQUIRED';
      loginError.fromApi = false;
      loginError.loginUrl = buildLoginRedirectUrl(loginNext);
      loginError.status = getHttpStatus(error) || 403;
      throw loginError;
    }

    const status = getHttpStatus(error);
    const responseData = camelCaseObject(error?.response?.data) || {};
    const apiMessage = (
      (typeof responseData?.error === 'string' && responseData.error)
      || responseData?.error?.message
      || responseData?.message
      || null
    );
    const enrollError = new Error(apiMessage || '');
    enrollError.fromApi = !!apiMessage;
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
