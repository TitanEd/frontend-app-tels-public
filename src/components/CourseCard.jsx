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
import { getNoCourseImageUrl } from '../lib/noCourseImage';
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
  const fallbackImage = getNoCourseImageUrl();

  return (
    <article className="tels-course-card">
      <Link
        to={`/course/${course.slug}`}
        className="tels-course-card__img"
        aria-label={intl.formatMessage(messages.courseLinkAria, { title: course.title })}
      >
        <img
          src={course.image || fallbackImage}
          alt={intl.formatMessage(messages.courseImageAlt, { title: course.title })}
          loading="lazy"
          onError={(e) => {
            // Course image 404'd/failed — fall back to Open edX placeholder,
            // never a broken-image icon (same pattern as Template A).
            if (e.target.src !== fallbackImage) {
              e.target.src = fallbackImage;
            }
          }}
        />
      </Link>
      <div className="tels-course-card__body">
        {/* PLL stacks subject + modality as separate rows (no bullet). */}
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

export default CourseCard;
