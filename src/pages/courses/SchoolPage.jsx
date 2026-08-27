import { Navigate, useParams } from 'react-router-dom';

import { SCHOOLS } from '../../data/telsCourses';
import CatalogPage from './CatalogPage';

/**
 * School landing page — school header band + CatalogPage locked to one
 * school. (tels-mirror's source renders EmailSignup twice here — once
 * inside CatalogView, once again in this wrapper. Fixed to render once.)
 */
const SchoolPage = () => {
  const { slug } = useParams();
  const school = SCHOOLS.find((s) => s.slug === slug);

  if (!school) {
    return <Navigate to="/catalog" replace />;
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
      <CatalogPage title={`${school.name} Courses`} lockedSchool={school.slug} />
    </>
  );
};

export default SchoolPage;
