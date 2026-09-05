import { camelCaseObject } from '@edx/frontend-platform';
import { getLocale } from '@edx/frontend-platform/i18n';

import { getHttpClient, getHttpStatus, logApiFailure } from './http';
import { getContactUrl } from './urls';

/**
 * Submit contact form to TitanEd API.
 * Validation (400) and all other failures (404/503/5xx/network) throw —
 * UI must show an error, never a success message.
 */
export async function submitContact(payload) {
  let locale = 'en';
  try {
    locale = getLocale() || 'en';
  } catch {
    locale = 'en';
  }

  const body = {
    name: payload.name || '',
    email: payload.email || '',
    org: payload.org || '',
    subject: payload.subject || '',
    message: payload.message || '',
    consent: !!payload.consent,
    source_page: payload.sourcePage || '/public/contact',
    locale: payload.locale || locale,
  };

  try {
    const { data, status } = await getHttpClient().post(getContactUrl(), body, {
      headers: { 'Content-Type': 'application/json' },
    });
    const result = camelCaseObject(data) || {};
    return {
      ok: true,
      status: status || 201,
      id: result.id,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    const status = getHttpStatus(error);
    const responseData = camelCaseObject(error?.response?.data) || {};
    const apiMessage = responseData?.error?.message
      || responseData?.message
      || null;

    logApiFailure('submitContact failed', error);

    if (status === 400) {
      const validationError = new Error(
        apiMessage || 'Please fix the highlighted fields.',
      );
      validationError.code = 'VALIDATION_ERROR';
      validationError.status = 400;
      validationError.fields = responseData?.error?.fields || {};
      throw validationError;
    }

    const submitError = new Error(
      apiMessage || 'Unable to submit — try again later.',
    );
    if (status === 404) {
      submitError.code = 'CONTACT_NOT_FOUND';
    } else if (status === 503) {
      submitError.code = 'CONTACT_UNAVAILABLE';
    } else if (status >= 500) {
      submitError.code = 'CONTACT_SERVER_ERROR';
    } else {
      submitError.code = 'CONTACT_FAILED';
    }
    submitError.status = status;
    throw submitError;
  }
}
