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
      <div className="tels-page-header tels-school-header">
        <div className="tels-container tels-school-header__inner">
          {school.logo && (
            <img
              src={school.logo}
              alt={intl.formatMessage(coursesMessages.schoolLogoAlt, { name: school.name })}
              className="tels-school-header__logo"
            />
          )}
          <h1 className="tels-school-header__title">{school.name}</h1>
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
