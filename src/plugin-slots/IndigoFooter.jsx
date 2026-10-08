import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import SocialLinks from '../components/SocialLinks';
import { useFooterConfig } from '../data/api/footerConfig';
import { publicHomeHref, resolveFooterHref } from './publicUrls';
import messages from './footer-messages';
import localLogo from '!!file-loader!../assets/brand/logo.webp';
import './IndigoFooter.scss';

/**
 * Local copy of tutor-tels-theme-plugins' Template2Footer for a standalone `npm start`
 * (the Tutor configuration renders the plugin's component instead). Same source of truth:
 * links from INDIGO_FOOTER_* config, address / email / social links / copyright from the
 * footer settings of the theme configuration page.
 */
const DEFAULT_LINKS = [
  { titleKey: 'home', url: '/' },
  { titleKey: 'about', url: '/about' },
  { titleKey: 'contact', url: '/contact' },
  { titleKey: 'privacy', url: '/privacy' },
  { titleKey: 'terms', url: '/terms' },
];
const HIDDEN_KEYS = new Set(['accessibility', 'eea']);

const IndigoFooter = () => {
  const intl = useIntl();
  const config = getConfig();
  const footer = useFooterConfig();
  const siteName = config.SITE_NAME || 'TitanEd';
  const year = new Date().getFullYear();
  const logoUrl = config.LOGO_URL || config.LOGO_WHITE_URL || localLogo;

  const configured = [...(config.INDIGO_FOOTER_EXPLORE_LINKS || []), ...(config.INDIGO_FOOTER_SUPPORT_LINKS || [])];
  const seen = new Set();
  const links = (configured.length ? configured : DEFAULT_LINKS)
    .filter((link) => !HIDDEN_KEYS.has(link.titleKey) && !seen.has(link.url) && seen.add(link.url));
  const linkLabel = (link) => (link.titleKey && messages[link.titleKey]
    ? intl.formatMessage(messages[link.titleKey])
    : (link.title || link.titleKey || ''));

  const contact = config.INDIGO_FOOTER_CONTACT || {};
  const addressLines = footer.addressLines.length ? footer.addressLines : (contact.address_lines || []);
  const contactEmail = footer.contactEmail || contact.email || '';
  const socialLinks = footer.socialLinks.length ? footer.socialLinks : (config.INDIGO_FOOTER_SOCIAL_LINKS || []);
  const copyright = footer.copyrightText
    ? footer.copyrightText.replace('{year}', year).replace('{siteName}', siteName)
    : intl.formatMessage(messages.copyright, { year, siteName });

  return (
    <footer className="tels-footer" role="contentinfo">
      <div className="tels-container tels-footer__top">
        <div className="tels-footer__contact">
          <h2 className="sr-only">{intl.formatMessage(messages.contactHeading)}</h2>
          {addressLines.length > 0 && (
            <address>{addressLines.map((line) => <div key={line}>{line}</div>)}</address>
          )}
          {contactEmail && <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}
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
            <a href={publicHomeHref(config)} aria-label={intl.formatMessage(messages.homeAria, { siteName })}>
              <img src={logoUrl} alt={intl.formatMessage(messages.logoAlt, { siteName })} />
            </a>
          </div>
          <SocialLinks links={socialLinks} className="tels-footer__social" label={intl.formatMessage(messages.socialLabel)} />
        </div>
      </div>
      <div className="tels-container tels-footer__bottom">
        <span>{copyright}</span>
      </div>
    </footer>
  );
};

export default IndigoFooter;
