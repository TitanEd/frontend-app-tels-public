import { camelCaseObject } from '@edx/frontend-platform';

import { getHttpClient, getHttpStatus, logApiFailure } from './http';
import { getContactUrl } from './urls';

/**
 * Submit contact form to Template A control-panel
 * `POST /api/v1/contact-us/`.
 * Validation (400) and all other failures throw — never fake success.
 * Local English is not embedded for UI; callers use intl message ids when
 * `fromApi` is false / message is empty.
 */
export async function submitContact(payload) {
  const body = {
    name: payload.name || '',
    email: payload.email || '',
    org: payload.org || '',
    subject: payload.subject || '',
    message: payload.message || '',
    consent: !!payload.consent,
  };

  try {
    const { data, status } = await getHttpClient().post(getContactUrl(), body, {
      headers: { 'Content-Type': 'application/json' },
    });
    const result = camelCaseObject(data) || {};
    // Treat explicit ok:false in body as failure even if HTTP status is 2xx.
    if (result.ok === false) {
      const failMessage = (typeof result.message === 'string' && result.message.trim())
        || result?.error?.message
        || '';
      const failError = new Error(failMessage);
      failError.code = 'CONTACT_FAILED';
      failError.fromApi = !!failMessage;
      failError.status = status || result.status;
      failError.fields = result?.error?.fields || {};
      throw failError;
    }
    return {
      ok: true,
      status: status || result.status || 201,
      id: result.id,
      createdAt: result.createdAt,
      // Exact API success copy when present — UI falls back to message id.
      message: (typeof result.message === 'string' && result.message.trim()) || '',
      data: result.data || null,
    };
  } catch (error) {
    if (error?.code === 'CONTACT_FAILED') {
      throw error;
    }
    const status = getHttpStatus(error);
    const responseData = camelCaseObject(error?.response?.data) || {};
    const apiMessage = responseData?.error?.message
      || responseData?.message
      || null;

    logApiFailure('submitContact failed', error);

    if (status === 400) {
      const validationError = new Error(apiMessage || '');
      validationError.code = 'VALIDATION_ERROR';
      validationError.fromApi = !!apiMessage;
      validationError.status = 400;
      validationError.fields = responseData?.error?.fields || {};
      throw validationError;
    }

    const submitError = new Error(apiMessage || '');
    submitError.fromApi = !!apiMessage;
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
