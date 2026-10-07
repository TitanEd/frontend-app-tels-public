import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';

import { fetchTaxonomy, slugify } from '../../data/api/catalog';
import { formatSubject } from '../../i18n/taxonomyMessages';
import coursesMessages from './courses-messages';
import CoursesPage from './CoursesPage';

/** /subject/<slug>: the catalog locked to one subject area of the taxonomy API. */
const SubjectPage = () => {
  const intl = useIntl();
  const { slug } = useParams();
  const [state, setState] = useState({ loading: true, subject: null });

  useEffect(() => {
    let cancelled = false;
    fetchTaxonomy()
      .then(({ subjects }) => {
        const match = subjects.find((s) => slugify(s.name) === slug);
        if (!cancelled) { setState({ loading: false, subject: match ? match.name : null }); }
      })
      .catch(() => { if (!cancelled) { setState({ loading: false, subject: null }); } });
    return () => { cancelled = true; };
  }, [slug]);

  if (state.loading) { return null; }
  if (!state.subject) { return <Navigate to="/courses" replace />; }
  return (
    <CoursesPage
      title={intl.formatMessage(coursesMessages.subjectCourses, { subject: formatSubject(intl, state.subject) })}
      lockedSubject={state.subject}
    />
  );
};

export default SubjectPage;
