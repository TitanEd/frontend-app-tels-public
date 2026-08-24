import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
import './CourseCard.scss';

const CourseCard = ({ course }) => {
  const intl = useIntl();
  return (
    <article className="tels-card">
      <Link to={`/courses/${course.id}`} className="tels-card__img tels-card__img--photo" aria-label={course.title}>
        <img src={course.image} alt={course.title} loading="lazy" />
      </Link>
      <div className="tels-card__body">
        <h3 className="tels-card__title">
          <Link to={`/courses/${course.id}`} className="tels-card__title-link">
            {course.title}
          </Link>
        </h3>
        <div className="tels-card__org">{course.org}</div>
        <p className="tels-card__desc">{course.shortDesc}</p>
        <div className="tels-card__meta">
          <span className="tels-card__rating" aria-label={intl.formatMessage(messages.ratedOutOfFive, { rating: course.rating })}>
            <FontAwesomeIcon icon={faStar} />
            {' '}
            <strong>{course.rating.toFixed(1)}</strong>
            <span className="tels-muted">
              {' '}
              (
              {course.reviews.toLocaleString()}
              )
            </span>
          </span>
          <span>
            <FontAwesomeIcon icon={faCalendar} />
            {' '}
            {course.startDate}
          </span>
        </div>
        <Link to={`/courses/${course.id}`} className="tels-btn tels-btn--primary tels-btn--sm tels-card__cta">
          {intl.formatMessage(messages.viewCourse)} <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </article>
  );
};
export default CourseCard;
