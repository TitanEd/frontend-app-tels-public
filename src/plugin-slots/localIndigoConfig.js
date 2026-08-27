/**
 * Defaults for TelsHeader / IndigoFooter when MFE_CONFIG_API_URL is empty (local npm start).
 * Production values come from Tutor → mfe-lms-common-settings (tutor-tels-theme-plugins
 * plugin.py), where they default to /public — Tutor's default MFE routing serves this
 * app at ${MFE_HOST}/public, not the site root.
 *
 * Locally, .env.development sets PUBLIC_PATH='/public' to match — that same var also
 * drives webpack's publicPath and frontend-platform's router basename (both read it
 * natively), so `npm start` serves the whole app under /public too, and every layer
 * agrees on the same base. PUBLIC_BASE below just mirrors whatever PUBLIC_PATH is set
 * to, falling back to '/' only if that var is ever unset.
 */
const PUBLIC_BASE = (() => {
  const raw = process.env.PUBLIC_PATH || '/';
  const trimmed = raw.replace(/\/$/, '');
  return trimmed || '/';
})();
const withBase = (path) => (PUBLIC_BASE === '/' ? path : `${PUBLIC_BASE}${path}`);

export const localIndigoConfig = {
  INDIGO_ENABLE_DARK_TOGGLE: false,
  INDIGO_ENABLE_LANGUAGE_MENU: false,
  INDIGO_HOME_URL: PUBLIC_BASE,
  INDIGO_CATALOG_URL: withBase('/catalog'),
  INDIGO_COURSES_URL: withBase('/catalog'),
  INDIGO_ABOUT_URL: withBase('/about'),
  INDIGO_CONTACT_URL: withBase('/contact'),
  INDIGO_ACCESSIBILITY_URL: withBase('/accessibility'),
  INDIGO_PRIVACY_URL: withBase('/privacy'),
  INDIGO_TERMS_URL: withBase('/terms'),
  INDIGO_EEA_URL: withBase('/eea-privacy-disclosures'),
  // Matches the real pll.harvard.edu <footer class="site-footer"> exactly —
  // the "Footer Links" nav is Accessibility / Privacy Policy / Terms of Use /
  // EEA Privacy Disclosures ONLY (no About/Contact, no social icons, no
  // contact block — the real footer doesn't have those).
  INDIGO_FOOTER_EXPLORE_LINKS: [
    { titleKey: 'accessibility', url: '/accessibility' },
    { titleKey: 'privacy', url: '/privacy' },
    { titleKey: 'terms', url: '/terms' },
    { titleKey: 'eea', url: '/eea-privacy-disclosures' },
  ],
};
