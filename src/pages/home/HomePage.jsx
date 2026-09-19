import { Link } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Palette, Briefcase, Code, Database, GraduationCap, HeartPulse,
  Users, Sigma, Terminal, FlaskConical, Globe, BookOpen, Monitor, MapPin,
} from 'lucide-react';

import CourseCard from '../../components/CourseCard';
import EmailSignup from '../../components/EmailSignup';
import SchoolsCarousel from '../../components/SchoolsCarousel';
import {
  COURSES, SUBJECTS, SCHOOLS, FEATURED_TOPICS, TRENDING_GRAPHICS,
} from '../../data/telsCourses';
import taxonomyMessages, {
  formatAvailability,
  formatModality,
  formatSubject,
} from '../../i18n/taxonomyMessages';
import heroImage from '!!file-loader!../../assets/pll/hero-learning.webp';
import ctaCampusImage from '!!file-loader!../../assets/pll/cta-campus.webp';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './messages';

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

const modalityIcon = (modality) => {
  if (modality === 'In-Person') { return MapPin; }
  if (modality === 'Blended') { return Users; }
  return Monitor;
};

// PLL: Subjects = solid primary; Trending / Recently / Starting Soon = outline primary.
const SectionHeader = ({ title, viewAll }) => {
  const btnClass = viewAll?.variant === 'outline'
    ? 'tels-btn tels-btn--outline'
    : 'tels-btn tels-btn--primary';
  return (
    <div className="tels-section-header">
      <h2 className="tels-section-header__title">{title}</h2>
      {viewAll && (
        <Link to={viewAll.to} className={btnClass}>{viewAll.label}</Link>
      )}
    </div>
  );
};

const ThreeCards = ({ items }) => (
  <div className="tels-grid tels-grid--3">
    {items.slice(0, 3).map((c) => <CourseCard key={c.slug} course={c} />)}
  </div>
);

const TrendingCard = ({ course, i }) => {
  const intl = useIntl();
  const g = TRENDING_GRAPHICS[i % TRENDING_GRAPHICS.length];
  const ModalityIcon = modalityIcon(course.modality);
  const duration = course.duration.replace(/\s+long$/i, '');
  const price = course.price === 0
    ? intl.formatMessage(taxonomyMessages.freeStar)
    : intl.formatNumber(course.price, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <article className="tels-trending-card">
      <Link to={`/course/${course.slug}`} className="tels-trending-card__thumb" style={{ background: g.gradient }}>
        <div className="tels-trending-card__code">
          <div>
            <div>{g.code}</div>
            <div className="tels-trending-card__code-dim">{g.code}</div>
            <div className="tels-trending-card__code-dimmer">{g.code}</div>
          </div>
        </div>
        <span className="tels-trending-card__glyph">{g.glyph}</span>
      </Link>
      <div className="tels-trending-card__body">
        <div className="tels-course-card__eyebrow">
          <div className="tels-course-card__subject">
            <BookOpen size={13} aria-hidden="true" />
            <Link to={`/courses?subject=${encodeURIComponent(course.subject)}`}>
              {formatSubject(intl, course.subject)}
            </Link>
          </div>
          <div className="tels-course-card__modality">
            <ModalityIcon size={13} aria-hidden="true" />
            <span>{formatModality(intl, course.modality)}</span>
          </div>
        </div>
        <h3 className="tels-course-card__title">
          <Link to={`/course/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="tels-course-card__desc">{course.description}</p>
        <div className="tels-course-card__meta">
          <span className="tels-course-card__price">{price}</span>
          <span>{intl.formatMessage(messages.durationLong, { duration })}</span>
          <span>{formatAvailability(intl, course.availability)}</span>
        </div>
      </div>
    </article>
  );
};

const HomePage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.docTitle));

  const featured = COURSES.filter((c) => c.featured).slice(0, 3);
  const trending = COURSES.filter((c) => c.trending).slice(0, 3);
  const recent = COURSES.filter((c) => c.recent).slice(0, 3);
  const startingSoon = COURSES.filter((c) => c.startingSoon).slice(0, 3);

  return (
    <>
      <section className="tels-hero">
        <img
          className="tels-hero__media"
          src={heroImage}
          alt={intl.formatMessage(messages.heroImageAlt)}
          decoding="async"
        />
        <div className="tels-container tels-hero__inner">
          <h1 className="tels-hero__title">
            {intl.formatMessage(messages.heroTitle)}
          </h1>
          <h2 className="tels-hero__subtitle">{intl.formatMessage(messages.heroSubtitle)}</h2>
          <div className="tels-hero__cta">
            <Link to="/courses" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.allCourses)}</Link>
            <Link to="/courses?modality=Online" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.onlineCourses)}</Link>
            <Link to="/courses?price=Free" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.freeCourses)}</Link>
            <Link to="/courses?modality=Online+Live" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.liveOnline)}</Link>
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container">
          <SectionHeader title={intl.formatMessage(messages.featured)} />
          <div className="tels-grid tels-grid--3">
            {featured.map((c) => <CourseCard key={c.slug} course={c} />)}
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--bordered">
        <div className="tels-container">
          <SectionHeader
            title={intl.formatMessage(messages.subjectAreas)}
            viewAll={{ to: '/courses', label: intl.formatMessage(messages.viewAllSubjects) }}
          />
          <ul className="tels-subject-grid">
            {SUBJECTS.map((s) => {
              const SubjectIcon = SUBJECT_ICONS[s] || BookOpen;
              return (
                <li key={s}>
                  <Link to={`/courses?subject=${encodeURIComponent(s)}`}>
                    <SubjectIcon size={18} />
                    <span>{formatSubject(intl, s)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container">
          <SectionHeader
            title={intl.formatMessage(messages.trending)}
            viewAll={{ to: '/courses', label: intl.formatMessage(messages.viewAllTrending), variant: 'outline' }}
          />
          <div className="tels-grid tels-grid--3">
            {trending.map((c, i) => <TrendingCard key={c.slug} course={c} i={i} />)}
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-section-header__title">
            {intl.formatMessage(messages.featuredTopics)}
          </h2>
          <div className="tels-topic-pills">
            {FEATURED_TOPICS.map((t) => (
              <Link key={t} to={`/courses?keywords=${encodeURIComponent(t)}`} className="tels-topic-pill">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EmailSignup />

      <section className="tels-section">
        <div className="tels-container">
          <SectionHeader
            title={intl.formatMessage(messages.recentlyAdded)}
            viewAll={{ to: '/courses', label: intl.formatMessage(messages.viewRecentlyAdded), variant: 'outline' }}
          />
          <ThreeCards items={recent} />
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container">
          <SectionHeader
            title={intl.formatMessage(messages.startingSoon)}
            viewAll={{ to: '/courses', label: intl.formatMessage(messages.viewStartingSoon), variant: 'outline' }}
          />
          <ThreeCards items={startingSoon} />
        </div>
      </section>

      <section className="tels-stats-band">
        <div className="tels-container tels-stats">
          <div>
            <p className="tels-stats__n">6,000,000+</p>
            <p className="tels-stats__l">{intl.formatMessage(messages.learners)}</p>
          </div>
          <div>
            <p className="tels-stats__n">508</p>
            <p className="tels-stats__l">{intl.formatMessage(messages.courses)}</p>
          </div>
          <div>
            <p className="tels-stats__n">246</p>
            <p className="tels-stats__l">{intl.formatMessage(messages.countries)}</p>
          </div>
        </div>
      </section>

      <section className="tels-orgs-band">
        <div className="tels-container">
          <SchoolsCarousel schools={SCHOOLS} />
        </div>
      </section>

      <section
        className="tels-cta-photo"
        style={{ backgroundImage: `url('${ctaCampusImage}')` }}
      >
        <div className="tels-container tels-cta-photo__inner">
          <h2>{intl.formatMessage(messages.keepLearning)}</h2>
          <Link to="/courses" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.viewAllCourses)}</Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
