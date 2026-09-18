/**
 * Prefer backend error text when present; otherwise Open edX i18n message.
 * Use for all user-visible API failure copy in the Public MFE.
 */
export const displayApiError = (error, intl, fallbackMessage) => {
  if (error?.fromApi && typeof error.message === 'string' && error.message.trim()) {
    return error.message.trim();
  }
  return intl.formatMessage(fallbackMessage);
};
