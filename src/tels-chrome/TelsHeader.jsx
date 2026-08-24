import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { isPublicMfeNavActive, PUBLIC_ROUTE_BY_KEY, resolvePublicMfeUrl } from './publicUrls';
import messages from './messages';
import './TelsHeader.scss';

const DEFAULT_GUEST_NAV = [
  { titleKey: 'home', urlKey: 'home' },
  { titleKey: 'courses', urlKey: 'courses' },
  { titleKey: 'about', urlKey: 'about' },
  { titleKey: 'contact', urlKey: 'contact' },
];
const DEFAULT_AUTH_NAV = [
  { titleKey: 'home', urlKey: 'home' },
  { titleKey: 'dashboard', urlKey: 'dashboard' },
  { titleKey: 'courses', urlKey: 'courses' },
  { titleKey: 'about', urlKey: 'about' },
  { titleKey: 'contact', urlKey: 'contact' },
];
/** Same widget as tutor-tels-theme-plugins TelsHeader (tels_header slot). */
const TelsHeader = () => {
  const intl = useIntl();
  const config = getConfig();
  const { authenticatedUser } = useContext(AppContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const siteName = config.SITE_NAME || 'TitanEd';
  const logoUrl = config.LOGO_URL || `${config.LMS_BASE_URL}/theming/asset/images/logo.png`;
  const homeUrl = resolvePublicMfeUrl('/', config);
  const dashboardUrl = config.LEARNER_DASHBOARD_URL
        || config.LEARNER_DASHBOARD_BASE_URL
        || `${config.LMS_BASE_URL}/dashboard`;
  const loginUrl = config.LOGIN_URL;
  const registerUrl = config.REGISTER_URL || `${config.LMS_BASE_URL}/register`;
  const logoutUrl = config.LOGOUT_URL;
  const profileUrl = authenticatedUser && config.ACCOUNT_PROFILE_URL
    ? `${config.ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`
    : null;
  const accountUrl = config.ACCOUNT_SETTINGS_URL;
  const isPublicMfe = process.env.APP_ID === 'public';
  const guestNav = config.INDIGO_HEADER_GUEST_NAV || DEFAULT_GUEST_NAV;
  const authNav = config.INDIGO_HEADER_AUTH_NAV || DEFAULT_AUTH_NAV;
  const navItems = authenticatedUser ? authNav : guestNav;
  const location = useLocation();
  useEffect(() => {
    const onDocClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);
  const labelFor = (titleKey) => {
    if (titleKey in messages) {
      return intl.formatMessage(messages[titleKey]);
    }
    return titleKey;
  };
  const hrefFor = (item) => {
    if (item.urlKey === 'dashboard') {
      return dashboardUrl;
    }
    if (item.url?.startsWith('http')) {
      return item.url;
    }
    const path = item.url || PUBLIC_ROUTE_BY_KEY[item.urlKey] || '/';
    return resolvePublicMfeUrl(path, config);
  };
  const renderNavItemLink = (item, { onClick, className, key } = {}) => {
    const href = hrefFor(item);
    const label = labelFor(item.titleKey);
    const navClass = ['tels-header__nav-link', className].filter(Boolean).join(' ');
    const active = isPublicMfe
      ? isPublicMfeNavActive(item.urlKey, location.pathname)
      : window.location.pathname.replace(/\/$/, '') === String(href).replace(/\/$/, '');
    return (
      <a
        key={key}
        href={href}
        className={[navClass, active ? 'active' : ''].filter(Boolean).join(' ')}
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
      >
        {label}
      </a>
    );
  };
  const closeMobile = () => setMobileOpen(false);
  return (
    <header className="tels-header">
      <div className="tels-container">
        <div className="tels-header__row">
          <a href={homeUrl} className="tels-header__logo" aria-label={intl.formatMessage(messages.homeAria, { siteName })}>
            <img src={logoUrl} alt={siteName} />
          </a>

          <nav className="tels-header__nav" aria-label={intl.formatMessage(messages.primaryNav)}>
            {navItems.map((item) => renderNavItemLink(item, { key: `${item.titleKey}-${item.urlKey}` }))}
          </nav>

          <div className="tels-header__actions">
            {authenticatedUser ? (
              <div className="tels-header__user" ref={userMenuRef}>
                <button type="button" className="tels-header__user-toggle" aria-label={intl.formatMessage(messages.userMenu)} aria-expanded={userMenuOpen} onClick={() => setUserMenuOpen((open) => !open)}>
                  <span className="tels-header__user-name">
                    {authenticatedUser.name || authenticatedUser.username}
                  </span>
                  <FontAwesomeIcon icon={faChevronDown} aria-hidden="true" />
                </button>
                {userMenuOpen && (
                <ul className="tels-header__user-menu">
                  {profileUrl && (
                  <li>
                    <a href={profileUrl} onClick={() => setUserMenuOpen(false)}>
                      {intl.formatMessage(messages.profile)}
                    </a>
                  </li>
                  )}
                  {accountUrl && (
                  <li>
                    <a href={accountUrl} onClick={() => setUserMenuOpen(false)}>
                      {intl.formatMessage(messages.account)}
                    </a>
                  </li>
                  )}
                  <li>
                    <a href={dashboardUrl} onClick={() => setUserMenuOpen(false)}>
                      {intl.formatMessage(messages.dashboard)}
                    </a>
                  </li>
                  <li>
                    <a href={logoutUrl}>{intl.formatMessage(messages.logout)}</a>
                  </li>
                </ul>
                )}
              </div>
            ) : (
              <>
                <a href={loginUrl} className="tels-btn tels-btn--ghost tels-btn--sm">
                  {intl.formatMessage(messages.signIn)}
                </a>
                <a href={registerUrl} className="tels-btn tels-btn--primary tels-btn--sm">
                  {intl.formatMessage(messages.register)}
                </a>
              </>
            )}
          </div>

          <button type="button" className="tels-header__mobile" aria-label={intl.formatMessage(messages.menu)} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
            <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {mobileOpen && (
      <div className="tels-header__mobile-panel">
        {navItems.map((item) => renderNavItemLink(item, {
          key: `mobile-${item.titleKey}-${item.urlKey}`,
          onClick: closeMobile,
        }))}
        {authenticatedUser ? (
          <>
            {profileUrl && (
            <a href={profileUrl} onClick={closeMobile}>
              {intl.formatMessage(messages.profile)}
            </a>
            )}
            {accountUrl && (
            <a href={accountUrl} onClick={closeMobile}>
              {intl.formatMessage(messages.account)}
            </a>
            )}
            <a href={logoutUrl} onClick={closeMobile}>
              {intl.formatMessage(messages.logout)}
            </a>
          </>
        ) : (
          <>
            <a href={loginUrl} className="tels-btn tels-btn--ghost tels-btn--sm" onClick={closeMobile}>
              {intl.formatMessage(messages.signIn)}
            </a>
            <a href={registerUrl} className="tels-btn tels-btn--primary tels-btn--sm" onClick={closeMobile}>
              {intl.formatMessage(messages.register)}
            </a>
          </>
        )}
      </div>
      )}
    </header>
  );
};
export default TelsHeader;
