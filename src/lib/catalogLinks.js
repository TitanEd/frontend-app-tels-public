import { CATALOG_FACET_KEYS } from '../data/api/catalogAggs';

/**
 * Build a `/courses` href with optional search (`q`) and catalog facets.
 * Plain browse: `catalogHref()` → `/courses`.
 */
export function catalogHref({ q, skills, ...facets } = {}) {
  const params = new URLSearchParams();
  if (q) {
    params.set('q', q);
  }
  (Array.isArray(skills) ? skills : (skills ? [skills] : [])).forEach((value) => {
    if (value) {
      params.append('skills', value);
    }
  });
  CATALOG_FACET_KEYS.forEach((key) => {
    const raw = facets[key];
    const values = Array.isArray(raw) ? raw : (raw ? [raw] : []);
    values.filter(Boolean).forEach((value) => {
      params.append(key, value);
    });
  });
  const qs = params.toString();
  return qs ? `/courses?${qs}` : '/courses';
}

/** Discovery deep-links for product-format / curriculum CTAs (not plain "Explore courses"). */
export const CATALOG_LINKS = {
  all: catalogHref(),
  individualCourses: catalogHref({ q: 'Individual course' }),
  certificatePrograms: catalogHref({ q: 'certificate' }),
  executiveLearning: catalogHref({ q: 'executive' }),
  learningPathways: catalogHref({ q: 'pathway' }),
  professionalCertificates: catalogHref({ q: 'certificate' }),
};
