import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import { fetchCourse } from '../data/api';
import { getNoCourseImageUrl } from '../data/api/http';
import messages from './messages';
import './CourseCard.scss';

/** Prefer Open edX course key so detail API can load without a slug search. */
const getDetailCourseId = (course) => (
  course?.courseKey || course?.id || ''
);

const getDetailPath = (courseId) => (
  `/courses/${encodeURIComponent(courseId)}`
);

const CourseCard = ({ course }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);

  const title = course.title || intl.formatMessage(messages.untitledCourse);
  const rating = Number.isFinite(Number(course.rating)) ? Number(course.rating) : 0;
  const reviews = Number.isFinite(Number(course.reviews)) ? Number(course.reviews) : 0;
  const detailCourseId = getDetailCourseId(course);
  const detailPath = detailCourseId ? getDetailPath(detailCourseId) : '/courses';

  const openCourseDetail = async (event) => {
    event.preventDefault();
    if (!detailCourseId || pending) {
      return;
    }

    setPending(true);
    try {
      // Warm react-query cache via course detail API before navigation.
      await queryClient.fetchQuery({
        queryKey: ['course', detailCourseId],
        queryFn: () => fetchCourse(detailCourseId),
      });
    } catch {
      // Best-effort cache warm only — CourseDetailPage re-fetches on its own
      // and handles a genuine failure there; still navigate either way.
    } finally {
      setPending(false);
      navigate(detailPath);
    }
  };

  return (
    <article className="tels-card">
      <a
        href={detailPath}
        className="tels-card__img tels-card__img--photo"
        aria-label={title}
        onClick={openCourseDetail}
      >
        <img
          src={course.image || getNoCourseImageUrl()}
          alt={title}
          loading="lazy"
          onError={(e) => {
            // The course's own image URL 404'd/failed to load — fall back
            // to Open edX's own placeholder, never a broken-image icon.
            if (e.target.src !== getNoCourseImageUrl()) {
              e.target.src = getNoCourseImageUrl();
            }
          }}
        />
      </a>
      <div className="tels-card__body">
        <h3 className="tels-card__title">
          <a
            href={detailPath}
            className="tels-card__title-link"
            onClick={openCourseDetail}
          >
            {title}
          </a>
        </h3>
        {course.org && <div className="tels-card__org">{course.org}</div>}
        {course.shortDesc && <p className="tels-card__desc">{course.shortDesc}</p>}
        {(rating > 0 || course.startDate) && (
        <div className="tels-card__meta">
          {rating > 0 && (
          <span className="tels-card__rating" aria-label={intl.formatMessage(messages.ratedOutOfFive, { rating })}>
            <FontAwesomeIcon icon={faStar} />
            {' '}
            <strong>{rating.toFixed(1)}</strong>
            <span className="tels-muted">
              {' '}
              (
              {reviews.toLocaleString()}
              )
            </span>
          </span>
          )}
          {course.startDate && (
          <span>
            <FontAwesomeIcon icon={faCalendar} />
            {' '}
            {course.startDate}
          </span>
          )}
        </div>
        )}
        <button
          type="button"
          className="tels-btn tels-btn--primary tels-btn--sm tels-card__cta"
          onClick={openCourseDetail}
          disabled={pending || !detailCourseId}
          aria-busy={pending}
        >
          {intl.formatMessage(pending ? messages.loadingCourse : messages.viewCourse)}
          {' '}
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </article>
  );
};
export default CourseCard;
