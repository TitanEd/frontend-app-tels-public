/**
 * Footer settings saved on control-panel's theme configuration page (#footer-settings):
 * address, contact email, social links and copyright. Served by the LMS at
 * /ui_configuration/footer-config (FOOTER_CONFIG_URL in MFE_CONFIG); the same source the
 * site footer of every template reads. Fetched once per page load.
 */
import { useEffect, useState } from 'react';
import { getConfig } from '@edx/frontend-platform';

const EMPTY = {
  addressLines: [], contactEmail: '', copyrightText: '', socialLinks: [], loaded: false,
};

const footerConfigUrl = () => {
  const config = getConfig();
  if (config.FOOTER_CONFIG_URL) { return config.FOOTER_CONFIG_URL; }
  const lms = String(config.LMS_BASE_URL || '').replace(/\/$/, '');
  return lms ? `${lms}/ui_configuration/footer-config` : '';
};

let request = null;

export function fetchFooterConfig() {
  if (!request) {
    const url = footerConfigUrl();
    request = (url ? fetch(url, { credentials: 'omit' }) : Promise.reject(new Error('no url')))
      .then((response) => (response.ok ? response.json() : {}))
      .then((data) => ({
        addressLines: Array.isArray(data.address_lines) ? data.address_lines : [],
        contactEmail: data.contact_email || '',
        copyrightText: data.copyright_text || '',
        socialLinks: (Array.isArray(data.social_links) ? data.social_links : [])
          .filter((link) => link && link.name && /^https?:\/\//i.test(link.url || '')),
        loaded: true,
      }))
      .catch(() => ({ ...EMPTY, loaded: true }));
  }
  return request;
}

export function useFooterConfig() {
  const [state, setState] = useState(EMPTY);
  useEffect(() => {
    let cancelled = false;
    fetchFooterConfig().then((result) => { if (!cancelled) { setState(result); } });
    return () => { cancelled = true; };
  }, []);
  return state;
}
