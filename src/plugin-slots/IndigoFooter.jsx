import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn, faFacebookF, faTwitter, faYoutube, faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { resolvePublicMfeUrl } from './publicUrls';
import messages from './footer-messages';
import './IndigoFooter.scss';

const SOCIAL_ICONS = {
  linkedin: faLinkedinIn,
  facebook: faFacebookF,
  twitter: faTwitter,
  youtube: faYoutube,
  instagram: faInstagram,
};
const DEFAULT_EXPLORE_LINKS = [
  { titleKey: 'home', url: '/' },
  { titleKey: 'courses', url: '/courses' },
  { titleKey: 'about', url: '/about' },
  { titleKey: 'contact', url: '/contact' },
];
const DEFAULT_COMPANY_LINKS = [
  { titleKey: 'about', url: '/about' },
  { titleKey: 'contact', url: '/contact' },
];
const DEFAULT_SUPPORT_LINKS = [
  { titleKey: 'privacy', url: '/privacy' },
  { titleKey: 'terms', url: '/terms' },
];
/** Same widget as tutor-tels-theme-plugins IndigoFooter (indigo_footer slot). */
const IndigoFooter = () => {
  const intl = useIntl();
  const config = getConfig();
  const siteName = config.SITE_NAME || 'TitanEd';
  const year = new Date().getFullYear();
  const logoUrl = config.LOGO_URL
        || config.LOGO_WHITE_URL
        || `${config.LMS_BASE_URL}/theming/asset/images/logo.png`;
  const socialLinks = config.INDIGO_FOOTER_SOCIAL_LINKS || [];
  const exploreLinks = config.INDIGO_FOOTER_EXPLORE_LINKS || DEFAULT_EXPLORE_LINKS;
  const companyLinks = config.INDIGO_FOOTER_COMPANY_LINKS || DEFAULT_COMPANY_LINKS;
  const supportLinks = config.INDIGO_FOOTER_SUPPORT_LINKS || DEFAULT_SUPPORT_LINKS;
  const contact = config.INDIGO_FOOTER_CONTACT || {};
  const contactEmail = contact.email || 'Legal@TitanEd.com';
  const contactWebUrl = contact.web_url || 'https://titaned.com/';
  const contactWebLabel = contact.web_label || 'titaned.com';
  const addressLines = contact.address_lines || ['TitanEd, Gurugram,', 'Haryana, India'];
  // Home/Courses/About/Contact/Privacy/Terms → public MFE (see publicUrls.ts).
  const resolveUrl = (url) => resolvePublicMfeUrl(url, config);
  const linkTitle = (link) => {
    if (link.titleKey && link.titleKey in messages) {
      return intl.formatMessage(messages[link.titleKey]);
    }
    return link.title || link.titleKey || '';
  };
  const renderLinkColumn = (headingMessage, links) => (
    <div className="tels-footer__col">
      <h4>{intl.formatMessage(headingMessage)}</h4>
      <ul>
        {links.map((link) => (
          <li key={`${link.url}-${link.titleKey || link.title}`}>
            <a href={resolveUrl(link.url)}>{linkTitle(link)}</a>
          </li>
        ))}
      </ul>
    </div>
  );
  const contactFormHref = resolveUrl((exploreLinks.find((l) => l.titleKey === 'contact') || {}).url || '/contact');
  return (
    <footer className="tels-footer" role="contentinfo">
      <div className="tels-container">
        <div className="tels-footer__top">
          <div className="tels-footer__logo">
            <a href={resolveUrl('/')}>
              <img src={logoUrl} alt={intl.formatMessage(messages.logoAlt, { siteName })} />
            </a>
          </div>
          {socialLinks.length > 0 && (
          <div className="tels-footer__social" aria-label={intl.formatMessage(messages.socialLabel)}>
            {socialLinks.map((item) => {
              const icon = SOCIAL_ICONS[item.name];
              if (!icon) {
                return null;
              }
              return (
                <a key={item.name} href={item.url} target="_blank" rel="noreferrer" aria-label={item.label || item.name}>
                  <FontAwesomeIcon icon={icon} />
                </a>
              );
            })}
          </div>
          )}
        </div>

        <div className="tels-footer__cols">
          {renderLinkColumn(messages.exploreHeading, exploreLinks)}
          {renderLinkColumn(messages.companyHeading, companyLinks)}
          {renderLinkColumn(messages.supportHeading, supportLinks)}
          <div className="tels-footer__col tels-footer__contact">
            <h4>{intl.formatMessage(messages.contactHeading)}</h4>
            <p>
              {intl.formatMessage(messages.emailLabel)}
              {' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
            <p>
              {intl.formatMessage(messages.webLabel)}
              {' '}
              <a href={contactWebUrl} target="_blank" rel="noreferrer">
                {contactWebLabel}
              </a>
            </p>
            <p>
              {addressLines.map((line, index) => (
                <React.Fragment key={line}>
                  {line}
                  {index < addressLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
            <p className="tels-footer__contact-note">
              {intl.formatMessage(messages.supportNotePrefix)}
              <a href={contactFormHref}>
                {intl.formatMessage(messages.contactForm)}
              </a>
              {intl.formatMessage(messages.supportNoteSuffix)}
            </p>
          </div>
        </div>

        <div className="tels-footer__bottom">
          <span>{intl.formatMessage(messages.copyright, { year, siteName })}</span>
          <span>{intl.formatMessage(messages.poweredBy)}</span>
        </div>
      </div>
    </footer>
  );
};
export default IndigoFooter;
