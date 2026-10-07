import { useParams } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';

import coursesMessages from './courses-messages';
import CoursesPage from './CoursesPage';

/** /school/<org>: the catalog locked to one organization (Open edX `org`, the `org` filter of the API). */
const SchoolPage = () => {
  const intl = useIntl();
  const { slug } = useParams();
  const org = decodeURIComponent(slug || '');
  return (
    <CoursesPage
      title={intl.formatMessage(coursesMessages.orgCourses, { org })}
      lockedOrg={org}
    />
  );
};

export default SchoolPage;
