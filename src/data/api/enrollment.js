/**
 * Enrolment through the shared catalog API (POST /api/v1/catalog/change-enrollment/, the endpoint
 * template-1 uses as well). Uses frontend-platform's authenticated client so the session / JWT
 * cookies and the CSRF token travel with the request.
 */
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const lmsBase = () => String(getConfig().LMS_BASE_URL || '').replace(/\/$/, '');

/** Where to send a visitor who must sign in first, coming back to `nextPath` afterwards. */
export const buildLoginUrl = (nextPath) => {
  const loginUrl = getConfig().LOGIN_URL || `${lmsBase()}/login`;
  const next = nextPath || (typeof window !== 'undefined' ? window.location.href : '/');
  return `${loginUrl}${loginUrl.includes('?') ? '&' : '?'}next=${encodeURIComponent(next)}`;
};

/** The learner's entry point into a course they are enrolled in. */
export const courseHomeUrl = (courseKey) => {
  const config = getConfig();
  const learning = String(config.LEARNING_BASE_URL || `${lmsBase()}/learning`).replace(/\/$/, '');
  return `${learning}/course/${courseKey}/home`;
};

/**
 * Enrol the signed-in user. Resolves {ok: true, redirect} or {ok: false, loginRequired, loginUrl, message}.
 */
export async function enrollInCourse(courseKey, { nextPath } = {}) {
  if (!courseKey) {
    return { ok: false, message: 'Missing course id.' };
  }
  try {
    const { data } = await getAuthenticatedHttpClient().post(
      `${lmsBase()}/api/v1/catalog/change-enrollment/`,
      { course_id: courseKey, enrollment_action: 'enroll' },
      { headers: { 'Content-Type': 'application/json' } },
    );
    const raw = (data && (data.redirect_url || data.redirect)) || '';
    let redirect = courseHomeUrl(courseKey);
    if (raw) {
      redirect = /^https?:\/\//i.test(raw) ? raw : `${lmsBase()}${raw.startsWith('/') ? '' : '/'}${raw}`;
    }
    return { ok: true, redirect };
  } catch (error) {
    const status = error?.customAttributes?.httpErrorStatus ?? error?.response?.status ?? null;
    if (status === 401 || status === 403) {
      return { ok: false, loginRequired: true, loginUrl: buildLoginUrl(nextPath) };
    }
    const body = error?.response?.data || {};
    const message = (typeof body.error === 'string' && body.error) || body.error?.message || body.message || '';
    return { ok: false, status, message };
  }
}
