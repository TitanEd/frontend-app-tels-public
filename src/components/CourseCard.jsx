import { Link } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  BookOpen, MapPin, Monitor, Users,
} from 'lucide-react';

import taxonomyMessages, {
  formatAvailability,
  formatModality,
  formatSubject,
} from '../i18n/taxonomyMessages';
import messages from './course-card-messages';

const modalityIcon = (modality) => {
  if (modality === 'In-Person') { return MapPin; }
  if (modality === 'Blended') { return Users; }
  return Monitor; // Online / Online Live
};

const CourseCard = ({ course }) => {
  const intl = useIntl();
  const ModalityIcon = modalityIcon(course.modality);
  const duration = course.duration.replace(/\s*long$/i, '');
  const price = course.price === 0
    ? intl.formatMessage(taxonomyMessages.freeStar)
    : intl.formatNumber(course.price, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <article className="tels-course-card">
      <Link to={`/course/${course.slug}`} className="tels-course-card__img" aria-label={course.title}>
        <img src={course.image} alt={course.title} loading="lazy" />
      </Link>
      <div className="tels-course-card__body">
        <div className="tels-course-card__eyebrow">
          <BookOpen size={13} />
          <Link to={`/courses?subject=${encodeURIComponent(course.subject)}`}>
            {formatSubject(intl, course.subject)}
          </Link>
          <span>&bull;</span>
          <span>
            <ModalityIcon size={13} />
            {' '}
            {formatModality(intl, course.modality)}
          </span>
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

export default CourseCard;
