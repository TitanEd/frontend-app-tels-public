import { Link } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Palette, Briefcase, Code, Database, GraduationCap, HeartPulse,
  Users, Sigma, Terminal, FlaskConical, Globe, BookOpen,
} from 'lucide-react';

import CourseCard from '../../components/CourseCard';
import EmailSignup from '../../components/EmailSignup';
import {
  COURSES, SUBJECTS, SCHOOLS, FEATURED_TOPICS, TRENDING_GRAPHICS, subjectSlug,
} from '../../data/telsCourses';
import taxonomyMessages, {
  formatAvailability,
  formatSubject,
} from '../../i18n/taxonomyMessages';
import heroImage from '../../assets/pll/pll-gates.jpg';
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

const SectionHeader = ({ title, viewAll }) => (
  <div className="tels-section-header">
    <h2 className="tels-section-header__title">{title}</h2>
    {viewAll && (
      <Link to={viewAll.to} className="tels-btn tels-btn--primary">{viewAll.label}</Link>
    )}
  </div>
);

const ThreeCards = ({ items }) => (
  <div className="tels-grid tels-grid--3">
    {items.slice(0, 3).map((c) => <CourseCard key={c.slug} course={c} />)}
  </div>
);

const TrendingCard = ({ course, i }) => {
  const intl = useIntl();
  const g = TRENDING_GRAPHICS[i % TRENDING_GRAPHICS.length];
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
            <div style={{ opacity: 0.8 }}>{g.code}</div>
            <div style={{ opacity: 0.6 }}>{g.code}</div>
          </div>
        </div>
        <span className="tels-trending-card__glyph">{g.glyph}</span>
      </Link>
      <div className="tels-trending-card__body">
        <div className="tels-course-card__eyebrow">
          <Link to={`/subject/${course.subjectSlug}`}>{formatSubject(intl, course.subject)}</Link>
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
      <section className="tels-hero" style={{ backgroundImage: `url('${heroImage}')` }}>
        <div className="tels-container tels-hero__inner" style={{ textAlign: 'center' }}>
          <h1 className="tels-hero__title" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            {intl.formatMessage(messages.heroTitle)}
          </h1>
          <p className="tels-hero__subtitle">{intl.formatMessage(messages.heroSubtitle)}</p>
          <div className="tels-hero__cta" style={{ justifyContent: 'center' }}>
            <Link to="/catalog" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.allCourses)}</Link>
            <Link to="/catalog?modality=Online" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.onlineCourses)}</Link>
            <Link to="/catalog?price=Free" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.freeCourses)}</Link>
            <Link to="/catalog?modality=Online+Live" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.liveOnline)}</Link>
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

      <section className="tels-section" style={{ borderTop: '1px solid var(--pgn-color-chrome-border)', borderBottom: '1px solid var(--pgn-color-chrome-border)' }}>
        <div className="tels-container">
          <SectionHeader
            title={intl.formatMessage(messages.subjectAreas)}
            viewAll={{ to: '/catalog', label: intl.formatMessage(messages.viewAllSubjects) }}
          />
          <ul className="tels-subject-grid">
            {SUBJECTS.map((s) => {
              const SubjectIcon = SUBJECT_ICONS[s] || BookOpen;
              return (
                <li key={s}>
                  <Link to={`/subject/${subjectSlug(s)}`}>
                    <SubjectIcon size={15} />
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
            viewAll={{ to: '/catalog', label: intl.formatMessage(messages.viewAllTrending) }}
          />
          <div className="tels-grid tels-grid--3">
            {trending.map((c, i) => <TrendingCard key={c.slug} course={c} i={i} />)}
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-section-header__title" style={{ marginBottom: '2rem' }}>
            {intl.formatMessage(messages.featuredTopics)}
          </h2>
          <div className="tels-topic-pills">
            {FEATURED_TOPICS.map((t) => (
              <Link key={t} to={`/catalog?keywords=${encodeURIComponent(t)}`} className="tels-topic-pill">
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
            viewAll={{ to: '/catalog', label: intl.formatMessage(messages.viewRecentlyAdded) }}
          />
          <ThreeCards items={recent} />
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container">
          <SectionHeader
            title={intl.formatMessage(messages.startingSoon)}
            viewAll={{ to: '/catalog', label: intl.formatMessage(messages.viewStartingSoon) }}
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

      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-orgs-grid">
            {SCHOOLS.filter((s) => s.logo).map((s) => (
              <Link key={s.slug} to={`/school/${s.slug}`} style={{ textAlign: 'center' }}>
                <img src={s.logo} alt={s.name} />
                <figcaption>{s.name}</figcaption>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="tels-cta-photo"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1920&auto=format&fit=crop')" }}
      >
        <div className="tels-container tels-cta-photo__inner">
          <h2>{intl.formatMessage(messages.keepLearning)}</h2>
          <Link to="/catalog" className="tels-btn tels-btn--sm">{intl.formatMessage(messages.viewAllCourses)}</Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
