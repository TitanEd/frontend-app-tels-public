import { useEffect, useState } from 'react';

import { fetchHomeSections, fetchSubjects } from './catalog';

const EMPTY_SECTIONS = {
  featured: [], trending: [], recent: [], startingSoon: [],
};

/** Home page sections from the catalog API; `loading` until the first answer. */
export function useHomeSections(limit = 3) {
  const [state, setState] = useState({ loading: true, sections: EMPTY_SECTIONS });
  useEffect(() => {
    let cancelled = false;
    fetchHomeSections({ limit })
      .then((sections) => { if (!cancelled) { setState({ loading: false, sections }); } })
      .catch(() => { if (!cancelled) { setState({ loading: false, sections: EMPTY_SECTIONS }); } });
    return () => { cancelled = true; };
  }, [limit]);
  return state;
}

let subjectsPromise = null;

/** The subject areas, fetched once per page load and shared by the header and the home page. */
export function useSubjects() {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    let cancelled = false;
    if (!subjectsPromise) {
      subjectsPromise = fetchSubjects().catch(() => []);
    }
    subjectsPromise.then((result) => { if (!cancelled) { setSubjects(result); } });
    return () => { cancelled = true; };
  }, []);
  return subjects;
}
