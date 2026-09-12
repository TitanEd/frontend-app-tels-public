import { Navigate, useParams } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';

import { SCHOOLS } from '../../data/telsCourses';
import coursesMessages from './courses-messages';
import CoursesPage from './CoursesPage';

const SchoolPage = () => {
  const intl = useIntl();
  const { slug } = useParams();
  const school = SCHOOLS.find((s) => s.slug === slug);

  if (!school) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <>
      <div
        className="tels-page-header"
        style={{
          display: 'flex', alignItems: 'center', gap: '1.5rem', paddingBottom: '2.5rem', paddingTop: '2.5rem',
        }}
      >
        <div className="tels-container" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {school.logo && <img src={school.logo} alt="" style={{ height: '4rem', objectFit: 'contain' }} />}
          <h1 style={{ margin: 0 }}>{school.name}</h1>
        </div>
      </div>
      <CoursesPage
        title={intl.formatMessage(coursesMessages.schoolCourses, { school: school.name })}
        lockedSchool={school.slug}
      />
    </>
  );
};

export default SchoolPage;
