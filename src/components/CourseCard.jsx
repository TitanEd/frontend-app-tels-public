import { Link } from 'react-router-dom';
import {
  BookOpen, MapPin, Monitor, Users,
} from 'lucide-react';

const modalityIcon = (modality) => {
  if (modality === 'In-Person') { return MapPin; }
  if (modality === 'Blended') { return Users; }
  return Monitor; // Online / Online Live
};

const CourseCard = ({ course }) => {
  const ModalityIcon = modalityIcon(course.modality);

  return (
    <article className="tels-course-card">
      <Link to={`/course/${course.slug}`} className="tels-course-card__img" aria-label={course.title}>
        <img src={course.image} alt={course.title} loading="lazy" />
      </Link>
      <div className="tels-course-card__body">
        <div className="tels-course-card__eyebrow">
          <BookOpen size={13} />
          <Link to={`/subject/${course.subjectSlug}`}>{course.subject}</Link>
          <span>&bull;</span>
          <span>
            <ModalityIcon size={13} />
            {' '}
            {course.modality}
          </span>
        </div>
        <h3 className="tels-course-card__title">
          <Link to={`/course/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="tels-course-card__desc">{course.description}</p>
        <div className="tels-course-card__meta">
          <span className="tels-course-card__price">{course.price === 0 ? 'FREE*' : `$${course.price.toLocaleString()}`}</span>
          <span>{course.duration.replace(/\s*long$/, '').toUpperCase()}</span>
          <span>{course.availability.toUpperCase()}</span>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
