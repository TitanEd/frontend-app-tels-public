import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  X,
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
import { resolvePublicMfeUrl } from './publicUrls';
import messages from './messages';
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
 * Template B (Harvard-PLL / tels-mirror): sticky header that's transparent
 * over the home hero (solid on scroll), solid dark on catalog/subject/school
 * pages, white elsewhere — hamburger opens a full-bleed dark "Browse by
 * Subject Area" mega-menu; "View all courses" pill; centered logo. No
 * search bar/logic (product decision).
 */
const TelsHeader = () => {
  const intl = useIntl();
  const config = getConfig();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const siteName = config.SITE_NAME || 'TitanEd';
  const logoUrl = config.LOGO_URL || `${config.LMS_BASE_URL}/theming/asset/images/logo.png`;
  const homeUrl = resolvePublicMfeUrl('/', config);
  const catalogUrl = resolvePublicMfeUrl('/catalog', config);

  const isPublicMfe = process.env.APP_ID === 'public';
  const pathname = location?.pathname || '';
  const isHome = isPublicMfe && (pathname === '/' || pathname === '');
  const isCatalog = isPublicMfe
    && (pathname.startsWith('/catalog') || pathname.startsWith('/subject/') || pathname.startsWith('/school/'));

  useEffect(() => {
    if (!isHome) {
      return undefined;
    }
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  let variant = 'light';
  if (menuOpen || isCatalog) {
    variant = 'dark';
  } else if (isHome) {
    variant = scrolled ? 'dark' : 'transparent';
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`tels-header ${variant === 'dark' ? 'tels-header--dark' : ''} ${variant === 'light' ? 'tels-header--light' : ''}`}>
        <div className="tels-container">
          <div className="tels-header__row">
            <div className="tels-header__start">
              <button
                type="button"
                className="tels-header__menu-btn"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={intl.formatMessage(messages.menu)}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
              <a href={catalogUrl} className="tels-header__view-all">
                {intl.formatMessage(messages.viewAllCourses)}
              </a>
            </div>

            <a
              href={homeUrl}
              className="tels-header__logo"
              aria-label={intl.formatMessage(messages.homeAria, { siteName })}
            >
              <img src={logoUrl} alt={siteName} />
            </a>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="tels-header__menu">
          <div className="tels-container tels-header__menu-inner">
            <h2 className="tels-header__menu-title">
              {intl.formatMessage(messages.browseBySubject)}
            </h2>
            <ul className="tels-header__subjects">
              {SUBJECTS.map((subject) => {
                const SubjectIcon = SUBJECT_ICONS[subject] || BookOpen;
                return (
                  <li key={subject}>
                    <a
                      href={`${catalogUrl}?subject=${encodeURIComponent(subject)}`}
                      className="tels-header__subject-link"
                      onClick={closeMenu}
                    >
                      <SubjectIcon size={20} />
                      <span>{subject}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default TelsHeader;
