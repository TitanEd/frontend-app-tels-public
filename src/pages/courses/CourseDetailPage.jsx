import { useEffect, useState } from 'react';
import {
  Link, Navigate, useParams, useSearchParams,
} from 'react-router-dom';
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
  Languages,
  Monitor,
  Presentation,
  Signal,
  Tag,
  Wallet,
} from 'lucide-react';

import CourseCard from '../../components/CourseCard';
import EmailSignup from '../../components/EmailSignup';
import emailMessages from '../../components/email-signup-messages';
import {
  fetchCatalogCourses, fetchCourseDetail, fetchCourseInstructors, findCourseKeyBySlug, isCourseKey,
} from '../../data/api/catalog';
import { buildLoginUrl, courseHomeUrl, enrollInCourse } from '../../data/api/enrollment';
import taxonomyMessages, {
  formatDifficulty,
  formatModality,
  formatPace,
  formatSubject,
  formatAvailability,
} from '../../i18n/taxonomyMessages';
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

/** Duration / effort text for the facts card: a real duration, else the weekly effort. */
const timeFacts = (intl, course) => {
  const duration = course.duration ? intl.formatMessage(messages.durationLong, { duration: course.duration }) : '';
  const effort = typeof course.effortHours === 'number' && course.effortHours > 0
    ? intl.formatMessage(messages.effortPerWeek, { hours: Math.round(course.effortHours * 10) / 10 })
    : course.effort;
  return { duration, effort };
};

/**
 * Enrol control of the shared enrolment API (POST /api/v1/catalog/change-enrollment/):
 * enrolled -> "Go to course"; may enrol -> enrol and follow the API's redirect; anonymous -> sign in
 * and come back with ?enroll=1 so the enrolment completes without a second click.
 */
const EnrollControl = ({ course, autoEnroll, onAutoEnrollDone }) => {
  const intl = useIntl();
  const config = getConfig();
  const [state, setState] = useState({ busy: false, error: null });
  const signedIn = Boolean(config.ACCESS_TOKEN_COOKIE_NAME) && typeof document !== 'undefined'
    && document.cookie.split('; ').some((row) => row.startsWith(`${config.ACCESS_TOKEN_COOKIE_NAME}=`));

  const enroll = async () => {
    setState({ busy: true, error: null });
    const result = await enrollInCourse(course.courseKey, { nextPath: `${window.location.href.split('?')[0]}?enroll=1` });
    if (result.ok) {
      window.location.assign(result.redirect);
      return;
    }
    if (result.loginRequired) {
      window.location.assign(result.loginUrl);
      return;
    }
    setState({
      busy: false,
      error: result.message
        ? intl.formatMessage(messages.enrollFailed, { message: result.message })
        : intl.formatMessage(messages.enrollFailedGeneric),
    });
  };

  useEffect(() => {
    if (autoEnroll && signedIn && !course.isEnrolled && course.canEnroll) {
      onAutoEnrollDone();
      enroll();
    } else if (autoEnroll) {
      onAutoEnrollDone();
    }
  }, [autoEnroll]); // eslint-disable-line react-hooks/exhaustive-deps

  if (course.isEnrolled) {
    return (
      <a className="tels-btn tels-btn--primary" href={courseHomeUrl(course.courseKey)}>
        {intl.formatMessage(messages.goToCourse)}
      </a>
    );
  }
  if (course.invitationOnly) {
    return <p className="tels-enroll-banner__message">{intl.formatMessage(messages.invitationOnly)}</p>;
  }
  if (course.isCourseFull) {
    return <p className="tels-enroll-banner__message">{intl.formatMessage(messages.courseFull)}</p>;
  }
  if (!course.canEnroll && signedIn) {
    return <p className="tels-enroll-banner__message">{intl.formatMessage(messages.enrollmentClosed)}</p>;
  }
  if (!signedIn) {
    return (
      <a
        className="tels-btn tels-btn--primary"
        href={buildLoginUrl(`${window.location.href.split('?')[0]}?enroll=1`)}
        aria-label={intl.formatMessage(messages.enrollAria, { title: course.title })}
      >
        {intl.formatMessage(messages.enroll)}
      </a>
    );
  }
  return (
    <>
      <button
        type="button"
        className="tels-btn tels-btn--primary"
        onClick={enroll}
        disabled={state.busy}
        aria-label={intl.formatMessage(messages.enrollAria, { title: course.title })}
      >
        {intl.formatMessage(state.busy ? messages.enrolling : messages.enroll)}
      </button>
      {state.error && <p className="tels-enroll-banner__message" role="alert">{state.error}</p>}
    </>
  );
};

/** /courses/<course key> (and the legacy /course/<slug>): one course from the shared catalog detail API. */
const CourseDetailPage = () => {
  const intl = useIntl();
  const { courseId, slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState({ loading: true, course: null, redirectKey: null });
  const [instructors, setInstructors] = useState([]);
  const [related, setRelated] = useState([]);
  const autoEnroll = searchParams.get('enroll') === '1';

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, course: null, redirectKey: null });
    const load = async () => {
      if (!courseId && slug && !isCourseKey(slug)) {
        // Legacy slug URL: resolve through the search API and move to the canonical course-key URL.
        const key = await findCourseKeyBySlug(slug);
        if (!cancelled) { setState({ loading: false, course: null, redirectKey: key }); }
        return;
      }
      const key = courseId || slug;
      const course = await fetchCourseDetail(key);
      if (cancelled) { return; }
      setState({ loading: false, course, redirectKey: null });
      if (course) {
        fetchCourseInstructors(key).then((rows) => { if (!cancelled) { setInstructors(rows); } });
        if (course.suggestedCourses.length) {
          setRelated(course.suggestedCourses.filter((c) => c.courseKey !== key).slice(0, 3));
        } else if (course.subject) {
          fetchCatalogCourses({ subject: [course.subject], page_size: 4 })
            .then(({ courses }) => {
              if (!cancelled) { setRelated(courses.filter((c) => c.courseKey !== key).slice(0, 3)); }
            });
        }
      }
    };
    load().catch(() => { if (!cancelled) { setState({ loading: false, course: null, redirectKey: null }); } });
    return () => { cancelled = true; };
  }, [courseId, slug]);

  const { course } = state;
  useDocumentTitle(
    course
      ? intl.formatMessage(messages.docTitle, { title: course.title })
      : intl.formatMessage(messages.docTitleFallback),
  );

  if (state.redirectKey) {
    return <Navigate to={`/courses/${encodeURIComponent(state.redirectKey)}${autoEnroll ? '?enroll=1' : ''}`} replace />;
  }
  if (state.loading) {
    return <div className="tels-container tels-course-about__state" aria-busy="true">{intl.formatMessage(messages.loading)}</div>;
  }
  if (!course) {
    return (
      <div className="tels-container tels-course-about__state">
        <p>{intl.formatMessage(messages.notFound)}</p>
        <Link to="/courses" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.backToCatalog)}</Link>
      </div>
    );
  }

  const priceLabel = course.free || course.price === 0
    ? intl.formatMessage(taxonomyMessages.freeStar)
    : course.priceLabel;
  const certPrice = course.free || !course.priceLabel || /free/i.test(course.priceLabel) ? null : course.priceLabel;
  const { duration, effort } = timeFacts(intl, course);
  const heroTeaser = course.description || course.longDescription.slice(0, 240);
  const startDate = course.startDate ? new Date(course.startDate) : null;

  return (
    <article className="tels-course-about">
      <div className="tels-container tels-course-about__layout">
        <div className="tels-course-about__main">
          <header className="tels-course-hero">
            <h1>{course.title}</h1>
            {heroTeaser && <p className="tels-course-hero__teaser">{heroTeaser}</p>}
          </header>

          <div className="tels-course-extras">
            <div className="tels-course-extras__row">
              {(duration || effort) && (
                <div className="tels-course-extras__item">
                  <Calendar size={22} aria-hidden="true" />
                  <span className="sr-only">{intl.formatMessage(messages.duration)}</span>
                  <span>{course.duration || effort}</span>
                </div>
              )}
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
              {course.overviewHtml && (
                <section>
                  <h2 className="tels-detail-heading">{intl.formatMessage(messages.courseDescription)}</h2>
                  {/* The course's own "about" page content, authored in Studio (what the LMS about page renders). */}
                  <div
                    className="tels-course-body__copy tels-course-body__copy--html"
                    dangerouslySetInnerHTML={{ __html: course.overviewHtml }} // eslint-disable-line react/no-danger
                  />
                </section>
              )}
              {!course.overviewHtml && course.description && (
                <section>
                  <h2 className="tels-detail-heading">{intl.formatMessage(messages.courseDescription)}</h2>
                  <p className="tels-course-body__copy">{course.description}</p>
                </section>
              )}

              {course.modules.length > 0 && (
                <section>
                  <h2 className="tels-detail-heading">{intl.formatMessage(messages.curriculum)}</h2>
                  <ol className="tels-course-learn">
                    {course.modules.map((m, index) => (
                      <li key={`${index + 1}-${m.title}`}>
                        {intl.formatMessage(messages.module, { number: index + 1, title: m.title })}
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {course.faq.length > 0 && (
                <section>
                  <h2 className="tels-detail-heading">{intl.formatMessage(messages.faq)}</h2>
                  {course.faq.map((item) => (
                    <details key={item.question} className="tels-syllabus-item">
                      <summary>{item.question}</summary>
                      <div className="body">{item.answer}</div>
                    </details>
                  ))}
                </section>
              )}
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
            {duration && <Fact icon={Calendar} label={intl.formatMessage(messages.duration)}>{duration}</Fact>}
            {effort && <Fact icon={Clock} label={intl.formatMessage(messages.timeCommitment)}>{effort}</Fact>}
            {startDate && !Number.isNaN(startDate.getTime()) && (
              <Fact icon={Calendar} label={intl.formatMessage(messages.startDate)}>
                {course.startDateLabel || intl.formatDate(startDate, { year: 'numeric', month: 'long', day: 'numeric' })}
              </Fact>
            )}
            {course.pace && (
              <Fact icon={Gauge} label={intl.formatMessage(messages.pace)}>{formatPace(intl, course.pace)}</Fact>
            )}
            {course.subject && (
              <Fact icon={GraduationCap} label={intl.formatMessage(messages.subject)}>
                <Link to={`/courses?subject=${encodeURIComponent(course.subject)}`}>
                  {formatSubject(intl, course.subject)}
                </Link>
              </Fact>
            )}
            {course.difficulty && (
              <Fact icon={Signal} label={intl.formatMessage(messages.difficulty)}>
                {formatDifficulty(intl, course.difficulty)}
              </Fact>
            )}
            {course.language && (
              <Fact icon={Languages} label={intl.formatMessage(messages.language)}>
                {intl.formatDisplayName
                  ? (() => { try { return intl.formatDisplayName(course.language, { type: 'language' }); } catch { return course.language; } })()
                  : course.language}
              </Fact>
            )}
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
            {course.topics.length > 0 && (
              <Fact icon={Tag} label={intl.formatMessage(messages.topics)}>
                <div className="tels-topic-chips">
                  {course.topics.map((t) => (
                    <Link key={t} to={`/courses?skill=${encodeURIComponent(t)}`} className="tels-topic-chip">
                      {t}
                    </Link>
                  ))}
                </div>
              </Fact>
            )}
          </div>
          {course.school && (
            <div className="tels-course-facts__schools">
              <p className="tels-course-facts__schools-label">
                {intl.formatMessage(messages.organization)}
              </p>
              <Link to={`/school/${encodeURIComponent(course.org || course.school)}`} className="tels-course-school">
                <span>{course.school}</span>
              </Link>
            </div>
          )}
        </aside>
      </div>

      {instructors.length > 0 && (
        <section
          className="tels-course-faculty"
          aria-labelledby="tels-course-instructors-heading"
        >
          <div className="tels-container">
            <h2 id="tels-course-instructors-heading" className="tels-course-faculty__title">
              {intl.formatMessage(messages.instructors)}
            </h2>
            <ul className="tels-course-faculty__grid">
              {instructors.map((person) => (
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
          <EnrollControl
            course={course}
            autoEnroll={autoEnroll}
            onAutoEnrollDone={() => {
              const next = new URLSearchParams(searchParams);
              next.delete('enroll');
              setSearchParams(next, { replace: true });
            }}
          />
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
                {related.map((item) => <CourseCard key={item.courseKey || item.slug} course={item} />)}
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
