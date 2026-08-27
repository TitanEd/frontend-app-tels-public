import { Navigate, useParams } from 'react-router-dom';

import { subjectFromSlug } from '../../data/telsCourses';
import CatalogPage from './CatalogPage';

/**
 * Subject landing page — CatalogPage locked to one subject.
 * (tels-mirror's source renders EmailSignup twice here — once inside
 * CatalogView, once again in this wrapper. Fixed to render once.)
 */
const SubjectPage = () => {
  const { slug } = useParams();
  const subject = subjectFromSlug(slug);

  if (!subject) {
    return <Navigate to="/catalog" replace />;
  }

  return <CatalogPage title={`${subject} Courses`} lockedSubject={subject} />;
};

export default SubjectPage;
