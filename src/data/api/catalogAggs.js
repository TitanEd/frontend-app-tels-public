/**
 * Facet helpers for control-panel POST /api/v1/catalog/courses/ (aggs block).
 * Field names match Open edX catalog_search: subject, org, language, modes, level.
 */

export const CATALOG_FACET_KEYS = ['subject', 'org', 'language', 'modes', 'level'];

/** ES-shaped facet → sorted option labels (by count desc). */
export function facetTermsToOptions(aggs, facetKey) {
  const terms = aggs?.[facetKey]?.terms;
  if (!terms || typeof terms !== 'object') {
    return [];
  }
  return Object.entries(terms)
    .sort((a, b) => b[1] - a[1])
    .map(([value]) => value);
}

export function buildFacetOptionsFromAggs(aggs) {
  return CATALOG_FACET_KEYS.reduce((acc, key) => {
    acc[key] = facetTermsToOptions(aggs, key);
    return acc;
  }, {});
}

/** UI selected checkboxes → POST body filter fields. */
export function selectedToCatalogFilters(selected) {
  const filters = {};
  CATALOG_FACET_KEYS.forEach((key) => {
    const vals = selected?.[key];
    if (Array.isArray(vals) && vals.length) {
      filters[key] = vals;
    }
  });
  return filters;
}

export function countDistinctFacetValues(aggs, facetKey) {
  const terms = aggs?.[facetKey]?.terms;
  if (!terms || typeof terms !== 'object') {
    return 0;
  }
  return Object.keys(terms).length;
}
