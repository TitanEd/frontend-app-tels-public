import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faSignal,
  faBookOpen,
  faGlobe,
  faChevronDown,
  faChevronUp,
  faQuoteLeft,
  faQuestion,
  faArrowRight,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import CourseCard from '../../components/CourseCard';
import LoadingScreen from '../../components/LoadingScreen';
import VideoModal from '../../components/VideoModal';
import {
  enrollInCourse,
  fetchCourse,
  fetchSuggestedCourses,
  redirectToCheckout,
} from '../../data/api';
import { getNoCourseImageUrl } from '../../data/api/http';
import { displayApiError } from '../../lib/displayApiError';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './course-detail-messages';
import './CourseDetailPage.scss';

const CourseDetailPage = () => {
  const intl = useIntl();
  const { courseId: rawCourseId = '' } = useParams();
  // Router may leave + decoded; course keys need course-v1:Org+Num+Run intact.
  const courseId = decodeURIComponent(rawCourseId).replace(/ /g, '+');
  const {
    data: course, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => fetchCourse(courseId),
    enabled: !!courseId,
  });
  const { data: related = [] } = useQuery({
    queryKey: ['suggestedCourses', course?.id, course?.courseKey],
    queryFn: () => fetchSuggestedCourses(course, 4),
    enabled: !!course,
  });
  const [openIdx, setOpenIdx] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [enrollPending, setEnrollPending] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  useDocumentTitle(course
    ? intl.formatMessage(messages.pageTitle, {
      title: course.title || intl.formatMessage(messages.untitledCourse),
    })
    : intl.formatMessage(messages.pageTitleFallback));

  if (isLoading) {
    return <LoadingScreen variant="courseDetail" showLabel={false} />;
  }
  if (isError) {
    return (
      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-empty">
            <h1 className="tels-h2">{intl.formatMessage(messages.loadErrorTitle)}</h1>
            <p className="tels-muted">
              {displayApiError(error, intl, messages.loadErrorBody)}
            </p>
            <div className="tels-course-detail__error-actions">
              <button type="button" className="tels-btn tels-btn--primary" onClick={() => refetch()}>
                {intl.formatMessage(messages.loadErrorRetry)}
              </button>
              <Link to="/courses" className="tels-btn tels-btn--outline">
                {intl.formatMessage(messages.loadErrorBack)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const courseTitle = course.title || intl.formatMessage(messages.untitledCourse);

  const modules = (Array.isArray(course.modules) ? course.modules : [])
    .filter((m) => m?.title);
  const skills = Array.isArray(course.skills) ? course.skills.filter(Boolean) : [];
  const { instructor } = course;
  const instructorPhotoUrl = instructor?.imageUrl || instructor?.image_url || null;
  const instructorName = instructor?.name || '';
  const instructorInitials = instructorName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  const canEnroll = course.canEnroll !== false;
  const enrollCourseKey = course.courseKey || (String(course.id || '').startsWith('course-v1:') ? course.id : null);

  const testimonials = (Array.isArray(course.testimonials) ? course.testimonials : [])
    .map((t, i) => ({
      key: `api-t-${i}`,
      name: t.name,
      role: t.role,
      quote: t.quote,
    }))
    .filter((t) => t.quote);

  const faq = (Array.isArray(course.faq) ? course.faq : [])
    .map((f, i) => ({
      key: `api-f-${i}`,
      q: f.question || f.q || '',
      a: f.answer || f.a || '',
    }))
    .filter((f) => f.q && f.a);

  const showAbout = !!(course.longDesc || course.shortDesc);
  const showRequirements = !!course.requirements;
  const showCertificate = course.certificateStatus
    && course.certificateStatus !== 'none';
  const hasVideo = !!course.videoUrl;

  const handleEnroll = async () => {
    setEnrollError(null);

    if (course.ecommerceCheckout && course.ecommerceCheckoutLink) {
      redirectToCheckout(course.ecommerceCheckoutLink);
      return;
    }

    if (course.isEnrolled && enrollCourseKey) {
      window.location.href = `${getConfig().LMS_BASE_URL}/courses/${enrollCourseKey}/course/`;
      return;
    }

    if (!enrollCourseKey) {
      setEnrollError(intl.formatMessage(messages.enrollError));
      return;
    }

    setEnrollPending(true);
    try {
      const nextPath = `${getConfig().PUBLIC_PATH || '/public'}/courses/${encodeURIComponent(enrollCourseKey || course.id)}`.replace(/\/{2,}/g, '/');
      const result = await enrollInCourse(enrollCourseKey, { nextPath });
      window.location.href = result.redirect || `${getConfig().LMS_BASE_URL}/dashboard`;
    } catch (enrollErr) {
      if (enrollErr?.code === 'LOGIN_REQUIRED' && enrollErr.loginUrl) {
        window.location.href = enrollErr.loginUrl;
        return;
      }
      setEnrollError(displayApiError(enrollErr, intl, messages.enrollError));
      setEnrollPending(false);
    }
  };

  let enrollLabel = intl.formatMessage(messages.enrollNow);
  if (enrollPending) {
    enrollLabel = intl.formatMessage(messages.enrollPending);
  } else if (course.isEnrolled) {
    enrollLabel = intl.formatMessage(messages.alreadyEnrolled);
  } else if (!canEnroll) {
    enrollLabel = intl.formatMessage(messages.enrollDisabled);
  }

  return (
    <>
      <section className="tels-about-hero">
        <div className="tels-container">
          <div className="tels-breadcrumbs">
            <Link to="/">{intl.formatMessage(messages.breadcrumbHome)}</Link>
            {' '}
            <span>&rsaquo;</span>
            {' '}
            <Link to="/courses">{intl.formatMessage(messages.breadcrumbCourses)}</Link>
            {' '}
            <span>&rsaquo;</span>
            {' '}
            <span>{courseTitle}</span>
          </div>
          <div className="tels-about-grid">
            <div>
              <h1 className="tels-h1 tels-course-detail__title">{courseTitle}</h1>
              {course.shortDesc && <p className="tels-lead">{course.shortDesc}</p>}
              <div className="tels-metarow">
                {modules.length > 0 && (
                  <span>
                    <FontAwesomeIcon icon={faBookOpen} />
                    {' '}
                    {intl.formatMessage(messages.modulesCount, { count: modules.length })}
                  </span>
                )}
                {course.duration && (
                  <span><FontAwesomeIcon icon={faClock} /> {course.duration}</span>
                )}
                {course.level && (
                  <span><FontAwesomeIcon icon={faSignal} /> {course.level}</span>
                )}
                {course.language && (
                  <span><FontAwesomeIcon icon={faGlobe} /> {course.language}</span>
                )}
              </div>
              {(course.org || course.startDate) && (
                <p className="tels-muted tels-course-detail__offered">
                  {course.org && (
                    <>
                      {intl.formatMessage(messages.offeredBy)}
                      {' '}
                      <strong>{course.org}</strong>
                    </>
                  )}
                  {course.startDate && (
                    <>
                      {' '}
                      {intl.formatMessage(messages.startsOn, { startDate: course.startDate })}
                    </>
                  )}
                </p>
              )}
            </div>
            <aside className="tels-enrollcard">
              <div className={`tels-enrollcard__img${hasVideo ? ' tels-enrollcard__img--has-video' : ''}`}>
                <img
                  src={course.image || getNoCourseImageUrl()}
                  alt={courseTitle}
                  onError={(e) => {
                    if (e.target.src !== getNoCourseImageUrl()) {
                      e.target.src = getNoCourseImageUrl();
                    }
                  }}
                />
                {hasVideo && (
                  <button
                    type="button"
                    className="tels-enrollcard__play"
                    onClick={() => setVideoOpen(true)}
                    aria-label={intl.formatMessage(messages.watchIntro)}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                )}
              </div>
              <h3 className="tels-enrollcard__title">{courseTitle}</h3>
              {!course.free && course.price && <div className="tels-enrollcard__price">{course.price}</div>}
              {(course.free || course.price) && (
                <div className="tels-enrollcard__note">
                  {course.free
                    ? intl.formatMessage(messages.enrollNoteFree)
                    : intl.formatMessage(messages.enrollNotePaid)}
                </div>
              )}
              <button
                type="button"
                className="tels-btn tels-btn--primary tels-course-detail__enroll-btn"
                onClick={handleEnroll}
                disabled={enrollPending || (!canEnroll && !course.isEnrolled)}
              >
                {enrollLabel}
              </button>
              {enrollError && (
                <p className="tels-muted tels-course-detail__enroll-error" role="alert">{enrollError}</p>
              )}
              {hasVideo && (
                <button
                  type="button"
                  className="tels-link tels-course-detail__watch-intro"
                  onClick={() => setVideoOpen(true)}
                >
                  <FontAwesomeIcon icon={faPlay} />
                  {' '}
                  {intl.formatMessage(messages.watchIntro)}
                </button>
              )}
            </aside>
          </div>
        </div>
      </section>

      {showAbout && (
      <section className="tels-section tels-section--subtle">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.aboutTitle)}</h2>
          <p className="tels-muted">{course.longDesc || course.shortDesc}</p>
        </div>
      </section>
      )}

      {modules.length > 0 && (
      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.contentTitle)}</h2>
          {modules.map((m, i) => {
            const label = intl.formatMessage(messages.moduleLabel, { moduleNumber: i + 1, moduleTitle: m.title });
            if (!m.description) {
              return (
                <div key={m.title || i} className="tels-syllabus-item tels-syllabus-item--static">
                  <span>{label}</span>
                </div>
              );
            }
            return (
              <div key={m.title || i} className="tels-syllabus-item">
                <button type="button" onClick={() => setOpenIdx(openIdx === i ? null : i)} aria-expanded={openIdx === i}>
                  <span>{label}</span>
                  <FontAwesomeIcon icon={openIdx === i ? faChevronUp : faChevronDown} />
                </button>
                {openIdx === i && <div className="body">{m.description}</div>}
              </div>
            );
          })}
        </div>
      </section>
      )}

      {showRequirements && (
      <section className="tels-section tels-section--subtle">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.prerequisitesTitle)}</h2>
          <p className="tels-muted">{course.requirements}</p>
        </div>
      </section>
      )}

      {instructor && (
      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.instructorTitle)}</h2>
          <div className="tels-course-detail__instructor">
            <div className="tels-course-detail__instructor-avatar">
              {instructorPhotoUrl ? (
                <img
                  src={instructorPhotoUrl}
                  alt={instructorName}
                  className="tels-course-detail__instructor-img"
                />
              ) : (
                <div className="tels-course-detail__instructor-img tels-course-detail__instructor-img--placeholder" aria-hidden="true">
                  {instructorInitials}
                </div>
              )}
            </div>
            <div>
              {instructorName && (
                <h3 className="tels-h3 tels-course-detail__instructor-name">
                  {instructorName}
                </h3>
              )}
              {instructor.title && (
                <p className="tels-muted tels-course-detail__instructor-role">{instructor.title}</p>
              )}
              {instructor.bio && (
                <p className="tels-muted tels-course-detail__instructor-bio">{instructor.bio}</p>
              )}
            </div>
          </div>
        </div>
      </section>
      )}

      {testimonials.length > 0 && (
      <section className="tels-section tels-section--warm">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.testimonialsTitle)}</h2>
          <div className="tels-grid tels-grid--3 tels-course-detail__testimonials">
            {testimonials.map((t) => (
              <div key={t.key} className="tels-benefit">
                <FontAwesomeIcon icon={faQuoteLeft} className="tels-course-detail__quote-icon" />
                <p className="tels-muted tels-course-detail__quote-text">
                  &quot;
                  {t.quote}
                  &quot;
                </p>
                {t.name && <div className="tels-course-detail__quote-name">{t.name}</div>}
                {t.role && <div className="tels-muted tels-course-detail__quote-role">{t.role}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {showCertificate && (
      <section className="tels-section tels-section--subtle">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.certificateTitle)}</h2>
          <p className="tels-muted">
            {intl.formatMessage(messages.certificateBody, { org: course.org })}
          </p>
        </div>
      </section>
      )}

      {faq.length > 0 && (
      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.faqTitle)}</h2>
          <div className="tels-course-detail__faq">
            {faq.map((f, i) => (
              <div key={f.key} className="tels-syllabus-item">
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === `faq-${i}` ? null : `faq-${i}`)}
                  aria-expanded={openIdx === `faq-${i}`}
                >
                  <span>
                    <FontAwesomeIcon icon={faQuestion} />
                    &nbsp;&nbsp;
                    {f.q}
                  </span>
                  <FontAwesomeIcon icon={openIdx === `faq-${i}` ? faChevronUp : faChevronDown} />
                </button>
                {openIdx === `faq-${i}` && (
                  <div className="body">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {skills.length > 0 && (
      <section className="tels-section tels-section--warm">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.skillsTitle)}</h2>
          <div className="tels-pills tels-course-detail__skills">
            {skills.map((s) => <span key={s} className="tels-pill">{s}</span>)}
          </div>
        </div>
      </section>
      )}

      {related.length > 0 && (
      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-section-row__head">
            <h2 className="tels-h2 tels-course-detail__related-title">{intl.formatMessage(messages.relatedTitle)}</h2>
            <Link to="/courses" className="tels-link">{intl.formatMessage(messages.browseAll)} <FontAwesomeIcon icon={faArrowRight} /></Link>
          </div>
          <div className="tels-grid tels-grid--4 tels-course-detail__related-grid">
            {related.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>
      )}

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={course.videoUrl}
        title={courseTitle}
      />
    </>
  );
};
export default CourseDetailPage;
