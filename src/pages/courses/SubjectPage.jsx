import { Navigate, useParams } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';

import { subjectFromSlug } from '../../data/telsCourses';
import { formatSubject } from '../../i18n/taxonomyMessages';
import coursesMessages from './courses-messages';
import CoursesPage from './CoursesPage';

const SubjectPage = () => {
  const intl = useIntl();
  const { slug } = useParams();
  const subject = subjectFromSlug(slug);

  if (!subject) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <CoursesPage
      title={intl.formatMessage(coursesMessages.subjectCourses, {
        subject: formatSubject(intl, subject),
      })}
      lockedSubject={subject}
    />
  );
};

export default SubjectPage;
