import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Palette,
  Briefcase,
  Code,
  Database,
  GraduationCap,
  HeartPulse,
  Users,
  Sigma,
  Terminal,
  FlaskConical,
  Globe,
  BookOpen,
} from 'lucide-react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import ChromeLink from './ChromeLink';
import LanguageMenu from './LanguageMenu';
import { publicCoursesHref, publicHomeHref, resolvePublicMfeUrl } from './publicUrls';
import messages from './messages';
import { formatSubject } from '../i18n/taxonomyMessages';
import localLogo from '!!file-loader!../assets/brand/logo.webp';
import './TelsHeader.scss';

const SUBJECTS = [
  'Art & Design',
  'Business',
  'Computer Science',
  'Data Science',
  'Education & Teaching',
  'Health & Medicine',
  'Humanities',
  'Mathematics',
  'Programming',
  'Science',
  'Social Sciences',
  'Theology',
];

const SUBJECT_ICONS = {
  'Art & Design': Palette,
  Business: Briefcase,
  'Computer Science': Code,
  'Data Science': Database,
  'Education & Teaching': GraduationCap,
  'Health & Medicine': HeartPulse,
  Humanities: Users,
  Mathematics: Sigma,
  Programming: Terminal,
  Science: FlaskConical,
  'Social Sciences': Globe,
  Theology: BookOpen,
};

/**
 * Same widget as tutor-tels-theme-plugins TelsHeader (tels_header slot).
 * Template B (Harvard-PLL): sticky header — solid dark navy except transparent
 * over the home hero until scroll. Hamburger (3-span, PLL-style) opens
 * "Browse by Subject Area"; centered logo; right-side catalog search →
 * /courses?keywords=… (same param CoursesPage already reads).
 */
const TelsHeader = () => {
  const intl = useIntl();
  const config = getConfig();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => {
    try {
      return new URLSearchParams(location.search).get('keywords') || '';
    } catch {
      return '';
    }
  });

  const siteName = config.SITE_NAME || 'TitanEd';
  const logoUrl = config.LOGO_URL || localLogo;
  const homeUrl = publicHomeHref(config);
  const coursesUrl = resolvePublicMfeUrl('/courses', config);

  const isPublicMfe = process.env.APP_ID === 'public';
  const pathname = location?.pathname || '';
  const isHome = isPublicMfe && (pathname === '/' || pathname === '');
  // PLL shows “View All Courses” in the header on every non-home page
  // (course detail, catalog, legal, …).
  const showViewAllCourses = isPublicMfe && !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const next = new URLSearchParams(location.search).get('keywords') || '';
    setSearchQuery(next);
  }, [location.search]);

  // Same chrome on every route: dark navy. Home is the only exception —
  // transparent over the hero until scroll (or until the mega-menu opens).
  const overHomeHero = isHome && !scrolled && !menuOpen;
  const variant = overHomeHero ? 'transparent' : 'dark';

  const closeMenu = () => setMenuOpen(false);

  const goToCourseSearch = (rawQuery) => {
    const keywords = String(rawQuery || '').trim();
    if (isPublicMfe) {
      navigate(keywords
        ? `/courses?keywords=${encodeURIComponent(keywords)}`
        : '/courses');
      return;
    }
    window.location.assign(publicCoursesHref(config, keywords ? { keywords } : {}));
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    goToCourseSearch(searchQuery);
  };

  return (
    <>
      <header className={`tels-header${variant === 'dark' ? ' tels-header--dark' : ''}`}>
        <div className="tels-container">
          <div className="tels-header__row">
            <div className="tels-header__start">
              <button
                type="button"
                className={`tels-header__menu-btn${menuOpen ? ' is-open' : ''}`}
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={intl.formatMessage(menuOpen ? messages.close : messages.menu)}
                aria-expanded={menuOpen}
                aria-controls="tels-header-menu"
              >
                <span />
                <span />
                <span />
              </button>
              {showViewAllCourses && (
                <ChromeLink href={coursesUrl} className="tels-header__view-all">
                  {intl.formatMessage(messages.viewAllCourses)}
                </ChromeLink>
              )}
            </div>

            <a
              href={homeUrl}
              className="tels-header__logo"
              aria-label={intl.formatMessage(messages.homeAria, { siteName })}
            >
              <img src={logoUrl} alt={intl.formatMessage(messages.logoAlt, { siteName })} />
            </a>

            <div className="tels-header__end">
              <form
                className="tels-header__search"
                role="search"
                onSubmit={onSearchSubmit}
                action={coursesUrl}
                method="get"
              >
                <label className="sr-only" htmlFor="tels-header-search">
                  {intl.formatMessage(messages.searchLabel)}
                </label>
                <input
                  id="tels-header-search"
                  className="tels-header__search-input"
                  type="text"
                  name="keywords"
                  placeholder={intl.formatMessage(messages.searchPlaceholder)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                  maxLength={128}
                />
                <button
                  type="submit"
                  className="tels-header__search-submit"
                  aria-label={intl.formatMessage(messages.searchSubmit)}
                >
                  <Search size={35} strokeWidth={3.25} absoluteStrokeWidth aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div
        id="tels-header-menu"
        className={`tels-header__menu${menuOpen ? ' tels-header__menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="tels-header__menu-clip">
          <div className="tels-container tels-header__menu-inner">
            <h2 className="tels-header__menu-title">
              {intl.formatMessage(messages.browseBySubject)}
            </h2>
            <ul className="tels-header__subjects">
              {SUBJECTS.map((subject) => {
                const SubjectIcon = SUBJECT_ICONS[subject] || BookOpen;
                return (
                  <li key={subject}>
                    <ChromeLink
                      href={publicCoursesHref(config, { subject })}
                      className="tels-header__subject-link"
                      onClick={closeMenu}
                      tabIndex={menuOpen ? 0 : -1}
                    >
                      <SubjectIcon size={20} />
                      <span>{formatSubject(intl, subject)}</span>
                    </ChromeLink>
                  </li>
                );
              })}
            </ul>
            <div className="tels-header__menu-lang">
              <LanguageMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TelsHeader;
