import { Navigate, useParams } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';

import { subjectFromSlug } from '../../data/telsCourses';
import { formatSubject } from '../../i18n/taxonomyMessages';
import catalogMessages from './catalog-messages';
import CatalogPage from './CatalogPage';

/**
 * Subject landing page — CatalogPage locked to one subject.
 * (tels-mirror's source renders EmailSignup twice here — once inside
 * CatalogView, once again in this wrapper. Fixed to render once.)
 */
const SubjectPage = () => {
  const intl = useIntl();
  const { slug } = useParams();
  const subject = subjectFromSlug(slug);

  if (!subject) {
    return <Navigate to="/catalog" replace />;
  }

  return (
    <CatalogPage
      title={intl.formatMessage(catalogMessages.subjectCourses, {
        subject: formatSubject(intl, subject),
      })}
      lockedSubject={subject}
    />
  );
};

export default SubjectPage;
