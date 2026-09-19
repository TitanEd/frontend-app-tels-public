import { Link, Navigate, useParams } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import {
  Calendar,
  CircleHelp,
  ClipboardList,
  Clock,
  Gauge,
  GraduationCap,
  Landmark,
  Monitor,
  Presentation,
  Signal,
  Tag,
  Wallet,
} from 'lucide-react';

import CourseCard from '../../components/CourseCard';
import EmailSignup from '../../components/EmailSignup';
import emailMessages from '../../components/email-signup-messages';
import { COURSES, SCHOOLS } from '../../data/telsCourses';
import taxonomyMessages, {
  formatDifficulty,
  formatModality,
  formatPace,
  formatSubject,
  formatAvailability,
} from '../../i18n/taxonomyMessages';
import { getEnrollHref } from '../../lib/api';
import useDocumentTitle from '../../lib/useDocumentTitle';
import { getNoCourseImageUrl } from '../../lib/noCourseImage';
import messages from './course-detail-messages';

const Fact = ({ icon: Icon, label, children }) => (
  <div className="tels-course-fact">
    <div className="tels-course-fact__label">
      <Icon size={24} aria-hidden="true" />
      <span>{label}</span>
    </div>
    <div className="tels-course-fact__value">{children}</div>
  </div>
);

const instructorInitials = (name) => {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) { return '?'; }
  if (parts.length === 1) { return parts[0].slice(0, 1).toUpperCase(); }
  return `${parts[0].slice(0, 1)}${parts[parts.length - 1].slice(0, 1)}`.toUpperCase();
};

const EnrollButton = ({ title, href, className = 'tels-btn tels-btn--primary' }) => {
  const intl = useIntl();
  return (
    <a
      className={className}
      href={href}
      aria-label={intl.formatMessage(messages.enrollAria, { title })}
    >
      {intl.formatMessage(messages.enroll)}
    </a>
  );
};

const CourseDetailPage = () => {
  const intl = useIntl();
  const { slug } = useParams();
  const course = COURSES.find((c) => c.slug === slug);

  useDocumentTitle(
    course
      ? intl.formatMessage(messages.docTitle, { title: course.title })
      : intl.formatMessage(messages.docTitleFallback),
  );

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const school = SCHOOLS.find((s) => s.slug === course.schoolSlug)
    || SCHOOLS.find((s) => s.name === course.school);
  const related = COURSES.filter((c) => c.subject === course.subject && c.slug !== course.slug).slice(0, 3);
  const priceLabel = course.price === 0
    ? intl.formatMessage(taxonomyMessages.freeStar)
    : intl.formatNumber(course.price, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const certPrice = course.price === 0 ? null : priceLabel;
  // Longer PLL-style sub-header copy: short line + long description when distinct.
  const heroTeaser = course.longDescription && course.longDescription !== course.description
    ? `${course.description} ${course.longDescription}`
    : (course.longDescription || course.description);
  const enrollHref = getEnrollHref(course, getConfig());

  return (
    <article className="tels-course-about">
      <div className="tels-container tels-course-about__layout">
        {/* Left stack + facts side-by-side: layout height includes the card so
            it cannot paint over the Enroll banner. */}
        <div className="tels-course-about__main">
          <header className="tels-course-hero">
            <h1>{course.title}</h1>
            <p className="tels-course-hero__teaser">{heroTeaser}</p>
          </header>

          <div className="tels-course-extras">
            <div className="tels-course-extras__row">
              <div className="tels-course-extras__item">
                <Calendar size={22} aria-hidden="true" />
                <span className="sr-only">{intl.formatMessage(messages.duration)}</span>
                <span>{course.duration.replace(/\s*long$/i, '')}</span>
              </div>
              <div className="tels-course-extras__item">
                <ClipboardList size={22} aria-hidden="true" />
                <span className="sr-only">{intl.formatMessage(messages.registrationDeadline)}</span>
                <span>{formatAvailability(intl, course.availability)}</span>
              </div>
              <div className="tels-course-extras__item">
                <Wallet size={22} aria-hidden="true" />
                <span className="sr-only">{intl.formatMessage(messages.price)}</span>
                <span>{priceLabel}</span>
              </div>
              <div className="tels-course-extras__item">
                <Presentation size={22} aria-hidden="true" />
                <span className="sr-only">{intl.formatMessage(messages.modality)}</span>
                <span>{formatModality(intl, course.modality)}</span>
                <Link
                  to="/contact"
                  className="tels-course-extras__help"
                  title={intl.formatMessage(messages.helpChoose)}
                >
                  <CircleHelp size={16} aria-hidden="true" />
                  <span className="sr-only">{intl.formatMessage(messages.helpChoose)}</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="tels-course-about__primary">
            <div className="tels-course-body">
              <section>
                <h2 className="tels-detail-heading">{intl.formatMessage(messages.whatYoullLearn)}</h2>
                <ul className="tels-course-learn">
                  {course.learn.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>

              <section>
                <h2 className="tels-detail-heading">{intl.formatMessage(messages.courseDescription)}</h2>
                <p className="tels-course-body__copy">{course.longDescription}</p>
              </section>
            </div>
          </div>
        </div>

        <aside className="tels-course-facts">
          <div className="tels-course-facts__media">
            <img
              src={course.image || getNoCourseImageUrl()}
              alt={intl.formatMessage(messages.courseImageAlt, { title: course.title })}
              width={530}
              height={298}
              onError={(e) => {
                const fallback = getNoCourseImageUrl();
                if (e.target.src !== fallback) {
                  e.target.src = fallback;
                }
              }}
            />
          </div>
          <div className="tels-course-facts__list">
            <Fact icon={Calendar} label={intl.formatMessage(messages.duration)}>
              {intl.formatMessage(messages.durationLong, {
                duration: course.duration.replace(/\s*long$/i, ''),
              })}
            </Fact>
            <Fact icon={Clock} label={intl.formatMessage(messages.timeCommitment)}>{course.timeCommitment}</Fact>
            <Fact icon={Gauge} label={intl.formatMessage(messages.pace)}>{formatPace(intl, course.pace)}</Fact>
            <Fact icon={GraduationCap} label={intl.formatMessage(messages.subject)}>
              <Link to={`/courses?subject=${encodeURIComponent(course.subject)}`}>
                {formatSubject(intl, course.subject)}
              </Link>
            </Fact>
            <Fact icon={Signal} label={intl.formatMessage(messages.difficulty)}>
              {formatDifficulty(intl, course.difficulty)}
            </Fact>
            <Fact icon={Landmark} label={intl.formatMessage(messages.credit)}>
              {intl.formatMessage(messages.auditFree)}
              {certPrice ? (
                <>
                  <br />
                  {intl.formatMessage(messages.verifiedCert, { price: certPrice })}
                </>
              ) : null}
            </Fact>
            <Fact icon={Monitor} label={intl.formatMessage(messages.platform)}>
              {intl.formatMessage(messages.platformValue)}
            </Fact>
            <Fact icon={Tag} label={intl.formatMessage(messages.topics)}>
              <div className="tels-topic-chips">
                {course.topics.map((t) => (
                  <Link key={t} to={`/courses?keywords=${encodeURIComponent(t)}`} className="tels-topic-chip">
                    {t}
                  </Link>
                ))}
              </div>
            </Fact>
          </div>
          {school && (
            <div className="tels-course-facts__schools">
              <p className="tels-course-facts__schools-label">
                {intl.formatMessage(messages.associatedSchools)}
              </p>
              <Link to={`/courses?school=${encodeURIComponent(school.slug)}`} className="tels-course-school">
                {school.logo ? (
                  <span className="tels-course-school__logo">
                    <img
                      src={school.logo}
                      alt={intl.formatMessage(messages.schoolLogoAlt, { name: school.name })}
                      width={96}
                      height={116}
                    />
                  </span>
                ) : null}
                <span>{school.name}</span>
              </Link>
            </div>
          )}
        </aside>
      </div>

      {Array.isArray(course.instructors) && course.instructors.length > 0 && (
        <section
          className="tels-course-faculty"
          aria-labelledby="tels-course-instructors-heading"
        >
          <div className="tels-container">
            <h2 id="tels-course-instructors-heading" className="tels-course-faculty__title">
              {intl.formatMessage(messages.instructors)}
            </h2>
            <ul className="tels-course-faculty__grid">
              {course.instructors.map((person) => (
                <li key={`${person.name}-${person.title}`} className="tels-course-faculty__item">
                  <article className="tels-instructor-card">
                    <div className="tels-instructor-card__media" aria-hidden="true">
                      {person.image ? (
                        <img
                          className="tels-instructor-card__photo"
                          src={person.image}
                          alt=""
                          width={145}
                          height={145}
                          loading="lazy"
                        />
                      ) : (
                        <span className="tels-instructor-card__avatar">
                          {instructorInitials(person.name)}
                        </span>
                      )}
                    </div>
                    <div className="tels-instructor-card__body">
                      <h3 className="tels-instructor-card__name">{person.name}</h3>
                      {person.title ? (
                        <p className="tels-instructor-card__title">{person.title}</p>
                      ) : null}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="tels-enroll-banner" id="enroll" aria-label={intl.formatMessage(messages.enrollNow)}>
        <div className="tels-container tels-enroll-banner__inner">
          <p className="tels-enroll-banner__stat">{intl.formatMessage(messages.enrollNow)}</p>
          <EnrollButton title={course.title} href={enrollHref} />
        </div>
      </section>

      <div className="tels-course-about__more">
        {related.length > 0 && (
          <section className="tels-section tels-section--tight">
            <div className="tels-container">
              <h2 className="tels-section-header__title tels-course-related-title">
                {intl.formatMessage(messages.youMayAlsoLike)}
              </h2>
              <div className="tels-grid tels-grid--3">
                {related.map((item) => <CourseCard key={item.slug} course={item} />)}
              </div>
            </div>
          </section>
        )}

        <EmailSignup
          title={intl.formatMessage(emailMessages.joinListTitle)}
          subtitle={intl.formatMessage(emailMessages.joinListSubtitle)}
          submitLabel={intl.formatMessage(emailMessages.submit)}
        />
      </div>
    </article>
  );
};

export default CourseDetailPage;
