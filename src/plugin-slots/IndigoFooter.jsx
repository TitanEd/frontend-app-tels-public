import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { publicHomeHref, resolveFooterHref, resolvePublicMfeUrl } from './publicUrls';
import messages from './footer-messages';
import localLogo from '!!file-loader!../assets/brand/logo.webp';
import './IndigoFooter.scss';

const DEFAULT_LINKS = [
  { titleKey: 'home', url: '/' },
  { titleKey: 'privacy', url: '/privacy' },
  { titleKey: 'terms', url: '/terms' },
  { titleKey: 'about', url: '/about' },
  { titleKey: 'contact', url: '/contact' },
];

const HIDDEN_FOOTER_KEYS = new Set(['accessibility', 'eea']);
const HIDDEN_FOOTER_PATHS = ['/accessibility', '/eea-privacy-disclosures'];

const isHiddenFooterLink = (link) => {
  if (HIDDEN_FOOTER_KEYS.has(link.titleKey)) {
    return true;
  }
  const url = String(link.url || '');
  return HIDDEN_FOOTER_PATHS.some((path) => url === path || url.endsWith(path));
};

/**
 * Same widget as tutor-tels-theme-plugins IndigoFooter (indigo_footer slot).
 * Template B (Harvard-PLL / tels-mirror). Structure measured directly from
 * the live pll.harvard.edu <footer class="site-footer"> — NOT from
 * tels-mirror's own Footer.tsx, which invents a richer footer (CTA+blurb /
 * explore-links+social / logo+tagline+contact) the real site doesn't have.
 * The real footer is just 3 columns: a single CTA button, the "Footer
 * Links" legal-links list (screen-reader-only heading, matching Drupal's
 * own markup), and the site logo — no social icons, no contact block, no
 * bottom copyright bar.
 */
const IndigoFooter = () => {
  const intl = useIntl();
  const config = getConfig();
  const siteName = config.SITE_NAME || 'TitanEd';

  const logoUrl = config.LOGO_URL || config.LOGO_WHITE_URL || localLogo;

  const links = (config.INDIGO_FOOTER_EXPLORE_LINKS || DEFAULT_LINKS)
    .filter((link) => !isHiddenFooterLink(link));

  const homeUrl = publicHomeHref(config);
  const coursesUrl = resolvePublicMfeUrl('/courses', config);

  const linkLabel = (link) => {
    if (link.titleKey && link.titleKey in messages) {
      return intl.formatMessage(messages[link.titleKey]);
    }
    return link.title || link.titleKey || '';
  };

  return (
    <footer className="tels-footer" role="contentinfo">
      <div className="tels-container tels-footer__top">
        <div>
          <a href={coursesUrl} className="tels-btn tels-btn--primary">
            {intl.formatMessage(messages.exploreCoursesCta)}
          </a>
        </div>

        <div className="tels-footer__col">
          <h2 className="sr-only">{intl.formatMessage(messages.linksHeading)}</h2>
          <ul>
            {links.map((link) => (
              <li key={`${link.url}-${link.titleKey || link.title}`}>
                <a href={resolveFooterHref(link, config)}>{linkLabel(link)}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="tels-footer__brand">
          <div className="tels-footer__logo">
            <a href={homeUrl} aria-label={intl.formatMessage(messages.homeAria, { siteName })}>
              <img src={logoUrl} alt={intl.formatMessage(messages.logoAlt, { siteName })} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default IndigoFooter;
