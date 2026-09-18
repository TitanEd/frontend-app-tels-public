import { camelCaseObject } from '@edx/frontend-platform';

import { getHttpClient, logApiFailure } from './http';
import { getFooterConfigUrl } from './urls';

/**
 * GET /ui_configuration/footer-config
 * Empty successful fields stay empty (caller hides those rows).
 * On failure returns null so the caller can apply i18n local defaults.
 */
export async function fetchFooterConfig() {
  try {
    const { data } = await getHttpClient().get(getFooterConfigUrl());
    const payload = camelCaseObject(data) || {};
    const socialLinks = Array.isArray(payload.socialLinks)
      ? payload.socialLinks
        .filter((item) => item?.name && item?.url)
        .map((item) => ({
          name: String(item.name).toLowerCase(),
          url: item.url,
        }))
      : [];
    const addressLines = Array.isArray(payload.addressLines)
      ? payload.addressLines.map((line) => String(line).trim()).filter(Boolean)
      : [];

    return {
      contactEmail: (typeof payload.contactEmail === 'string' && payload.contactEmail.trim()) || '',
      addressLines,
      copyrightText: (typeof payload.copyrightText === 'string' && payload.copyrightText.trim()) || '',
      socialLinks,
      fromApi: true,
    };
  } catch (error) {
    logApiFailure('fetchFooterConfig failed', error);
    return null;
  }
}

/**
 * Normalize reach-us fields for Contact:
 * - API fail (null) → fromApi false, empty fields (UI fills via formatMessage)
 * - API ok → fromApi true; empty fields stay empty (UI hides)
 */
export function resolveContactReachInfo(footerConfig) {
  if (!footerConfig) {
    return {
      contactEmail: '',
      addressLines: [],
      socialLinks: [],
      fromApi: false,
    };
  }

  return {
    contactEmail: footerConfig.contactEmail || '',
    addressLines: footerConfig.addressLines || [],
    socialLinks: footerConfig.socialLinks || [],
    fromApi: true,
  };
}
