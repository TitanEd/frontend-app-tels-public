/**
 * Public MFE API helpers.
 *
 * Message priority: API body message → HTTP status text → local fallback.
 * Endpoints are optional; when unavailable we fall back gracefully so the UI
 * still works with local mock success/error copy.
 */
import { getConfig } from '@edx/frontend-platform';

const joinUrl = (base, path) => {
  const b = String(base || '').replace(/\/$/, '');
  const p = String(path || '').replace(/^\//, '');
  return b ? `${b}/${p}` : `/${p}`;
};

export const getApiBase = () => {
  const config = getConfig();
  return config.TELS_API_BASE_URL
    || config.LMS_BASE_URL
    || '';
};

/**
 * Prefer API-provided message, then statusText, then local fallback.
 */
export const resolveApiMessage = (payload, fallback, statusText) => {
  if (payload && typeof payload === 'object') {
    const candidate = payload.message
      || payload.detail
      || payload.error
      || payload.error_description
      || (typeof payload.errors === 'string' ? payload.errors : null);
    if (candidate && String(candidate).trim()) {
      return String(candidate).trim();
    }
  }
  if (statusText && String(statusText).trim()) {
    return String(statusText).trim();
  }
  return fallback;
};

const parseJsonSafe = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

/**
 * @returns {{ ok: boolean, status: number, notFound: boolean, data: object|null, message: string }}
 */
export async function apiRequest(path, {
  method = 'GET',
  body,
  localFallbackMessage,
  localSuccessMessage,
} = {}) {
  const base = getApiBase();
  if (!base) {
    return {
      ok: true,
      status: 0,
      notFound: false,
      data: null,
      message: localSuccessMessage || localFallbackMessage || '',
      offline: true,
    };
  }

  try {
    const response = await fetch(joinUrl(base, path), {
      method,
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await parseJsonSafe(response);
    const notFound = response.status === 404;

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        notFound,
        data,
        message: resolveApiMessage(
          data,
          localFallbackMessage || (notFound ? 'Not found.' : 'Something went wrong.'),
          response.statusText,
        ),
        offline: false,
      };
    }

    return {
      ok: true,
      status: response.status,
      notFound: false,
      data,
      message: resolveApiMessage(data, localSuccessMessage || localFallbackMessage || '', response.statusText),
      offline: false,
    };
  } catch {
    // Network / CORS — use local fallback so the form still responds.
    return {
      ok: true,
      status: 0,
      notFound: false,
      data: null,
      message: localSuccessMessage || localFallbackMessage || '',
      offline: true,
    };
  }
}

export function submitNewsletter(email, messages) {
  return apiRequest('/api/tels/v1/newsletter/', {
    method: 'POST',
    body: { email },
    localSuccessMessage: messages.success,
    localFallbackMessage: messages.error,
  });
}

export function submitContact(payload, messages) {
  return apiRequest('/api/tels/v1/contact/', {
    method: 'POST',
    body: payload,
    localSuccessMessage: messages.thanks,
    localFallbackMessage: messages.error,
  });
}

/** LMS enroll / login URL for a public course card (demo-safe). */
export function getEnrollHref(course, config = getConfig()) {
  if (course?.enrollUrl) {
    return course.enrollUrl;
  }
  const lms = String(config.LMS_BASE_URL || '').replace(/\/$/, '');
  if (course?.courseId && lms) {
    return `${lms}/courses/${course.courseId}/about`;
  }
  if (lms) {
    return `${lms}/login?next=/dashboard`;
  }
  return '#enroll';
}
