import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { logError } from '@edx/frontend-platform/logging';

/**
 * Open edX standard HTTP client (same as frontend-app-catalog).
 * Works for anonymous and authenticated users.
 */
export const getHttpClient = () => getAuthenticatedHttpClient();

export const getHttpStatus = (error) => (
  error?.customAttributes?.httpErrorStatus
  ?? error?.response?.status
  ?? null
);

export const isHttpError = (error, status) => getHttpStatus(error) === status;

const getLmsBaseSafe = () => {
  try {
    return getConfig().LMS_BASE_URL || '';
  } catch {
    return '';
  }
};

/**
 * Absolute media URL from LMS-relative asset paths.
 */
export const resolveMediaUrl = (path) => {
  if (!path || typeof path !== 'string') {
    return '';
  }
  if (/^(https?:|data:|blob:)/i.test(path)) {
    return path;
  }
  const base = getLmsBaseSafe();
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Open edX's own "no course image" placeholder — served by the active LMS
 * theme via the standard /theming/asset/ resolver (same pattern already
 * used for LOGO_URL in TelsHeader.jsx / IndigoFooter.jsx), so it always
 * matches whatever theme is actually live instead of hardcoding a theme
 * name. Use as the `src`/`onError` fallback for any course image — never a
 * third-party placeholder service.
 */
export const getNoCourseImageUrl = () => (
  `${getLmsBaseSafe()}/theming/asset/images/no_course_image.png`
);

/**
 * Log and swallow — used for non-critical API failures (e.g. suggested
 * courses) that degrade to an empty state rather than blocking the page.
 */
export const logApiFailure = (label, error) => {
  try {
    logError(`[public-mfe] ${label}`, error);
  } catch {
    // logging may be unavailable in tests
  }
};

/**
 * Build login redirect URL (Open edX authn pattern).
 */
export const buildLoginRedirectUrl = (nextPath) => {
  const loginUrl = getConfig().LOGIN_URL;
  if (!loginUrl) {
    return nextPath;
  }
  const separator = loginUrl.includes('?') ? '&' : '?';
  return `${loginUrl}${separator}next=${encodeURIComponent(nextPath)}`;
};
