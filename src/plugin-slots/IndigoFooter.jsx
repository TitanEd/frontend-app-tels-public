import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { resolvePublicMfeUrl } from './publicUrls';
import messages from './footer-messages';
import './IndigoFooter.scss';

const DEFAULT_LINKS = [
  { titleKey: 'accessibility', url: '/accessibility' },
  { titleKey: 'privacy', url: '/privacy' },
  { titleKey: 'terms', url: '/terms' },
  { titleKey: 'eea', url: '/eea-privacy-disclosures' },
];

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

  const logoUrl = config.LOGO_URL || config.LOGO_WHITE_URL || `${config.LMS_BASE_URL}/theming/asset/images/logo.png`;

  const links = config.INDIGO_FOOTER_EXPLORE_LINKS || DEFAULT_LINKS;

  const catalogUrl = resolvePublicMfeUrl('/catalog', config);
  const resolveUrl = (url) => resolvePublicMfeUrl(url, config);

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
          <a href={catalogUrl} className="tels-btn tels-btn--primary">
            {intl.formatMessage(messages.exploreCoursesCta)}
          </a>
        </div>

        <div className="tels-footer__col">
          <h2 className="sr-only">{intl.formatMessage(messages.linksHeading)}</h2>
          <ul>
            {links.map((link) => (
              <li key={`${link.url}-${link.titleKey || link.title}`}>
                <a href={resolveUrl(link.url)}>{linkLabel(link)}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="tels-footer__brand">
          <div className="tels-footer__logo">
            <img src={logoUrl} alt={siteName} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default IndigoFooter;
