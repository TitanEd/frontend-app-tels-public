import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown, faChevronUp, faTimes, faSearch,
} from '@fortawesome/free-solid-svg-icons';
import CourseCard from '../../components/CourseCard';
import LoadingScreen, { Skeleton } from '../../components/LoadingScreen';
import { fetchCourses } from '../../data/api';
import {
  CATALOG_FACET_KEYS,
  buildFacetOptionsFromAggs,
  countDistinctFacetValues,
  selectedToCatalogFilters,
} from '../../data/api/catalogAggs';
import { displayApiError } from '../../lib/displayApiError';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './messages';
import './CoursesPage.scss';

const PAGE_SIZE = 8;

/** Tiny inline debounce — avoids pulling in lodash.debounce for one call site. */
function debounce(fn, wait) {
  let timer;
  const debounced = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}

const emptySelected = () => CATALOG_FACET_KEYS.reduce((acc, key) => {
  acc[key] = [];
  return acc;
}, {});

/** Merge legacy ?skills= into search string (not a catalog API facet). */
const parseQFromParams = (searchParams) => {
  let q = searchParams.get('q') ?? '';
  const skills = searchParams.getAll('skills').filter(Boolean);
  if (skills.length) {
    const extra = skills.join(' ');
    q = q ? `${q} ${extra}` : extra;
  }
  return q;
};

const parseSelectedFromParams = (searchParams) => {
  const next = emptySelected();
  CATALOG_FACET_KEYS.forEach((key) => {
    const all = searchParams.getAll(key).filter(Boolean);
    if (all.length) {
      next[key] = all;
    } else {
      const single = searchParams.get(key);
      next[key] = single ? [single] : [];
    }
  });
  return next;
};

const selectedEqual = (a, b) => CATALOG_FACET_KEYS.every(
  (key) => a[key].length === b[key].length && a[key].every((v, i) => v === b[key][i]),
);

const buildSearchParams = (selected, q, page) => {
  const params = new URLSearchParams();
  if (q) {
    params.set('q', q);
  }
  CATALOG_FACET_KEYS.forEach((key) => {
    (selected[key] || []).forEach((value) => {
      params.append(key, value);
    });
  });
  if (page > 1) {
    params.set('page', String(page));
  }
  return params;
};

const CoursesPage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.pageTitle));
  const [searchParams, setSearchParams] = useSearchParams();

  const [q, setQ] = useState(() => parseQFromParams(searchParams));
  const [selected, setSelected] = useState(() => parseSelectedFromParams(searchParams));
  const [openFilter, setOpenFilter] = useState(null);
  const [page, setPage] = useState(() => Number(searchParams.get('page')) || 1);
  const [searchDraft, setSearchDraft] = useState(() => parseQFromParams(searchParams));
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  const catalogFilters = useMemo(() => selectedToCatalogFilters(selected), [selected]);

  const { data: browseMeta } = useQuery({
    queryKey: ['courses', 'catalog', 'browse-meta'],
    queryFn: () => fetchCourses({ pageSize: 1, pageIndex: 0 }),
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: catalogData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['courses', 'catalog', q, catalogFilters, page],
    queryFn: () => fetchCourses({
      pageSize: PAGE_SIZE,
      pageIndex: page - 1,
      searchString: q,
      filters: catalogFilters,
    }),
    placeholderData: (previous) => previous,
  });

  const aggs = catalogData?.aggs;
  const apiTotal = catalogData?.total ?? 0;
  const apiCourses = catalogData?.courses ?? [];

  const facetOptions = useMemo(() => {
    if (aggs) {
      return buildFacetOptionsFromAggs(aggs);
    }
    return emptySelected();
  }, [aggs]);

  // Only a filter whose facet actually has at least one option in the API
  // response gets a pill at all — no disabled/empty pills rendered.
  const filters = useMemo(() => ([
    { key: 'subject', label: messages.filterSubject, options: facetOptions.subject || [] },
    { key: 'org', label: messages.filterOrg, options: facetOptions.org || [] },
    { key: 'modes', label: messages.filterModes, options: facetOptions.modes || [] },
    { key: 'language', label: messages.filterLanguage, options: facetOptions.language || [] },
    { key: 'level', label: messages.filterLevel, options: facetOptions.level || [] },
  ].filter((f) => f.options.length > 0)), [facetOptions]);

  const {
    displayCourses, totalResults, totalPages, currentPage,
  } = useMemo(() => {
    const pages = Math.max(1, Math.ceil(apiTotal / PAGE_SIZE));
    const safePage = Math.min(page, pages);
    return {
      displayCourses: apiCourses,
      totalResults: apiTotal,
      totalPages: pages,
      currentPage: safePage,
    };
  }, [page, apiCourses, apiTotal]);

  const heroAggs = browseMeta?.aggs || aggs;
  const heroCourseCount = browseMeta?.total ?? apiTotal;
  const heroOrgCount = heroAggs
    ? countDistinctFacetValues(heroAggs, 'org')
    : (facetOptions.org?.length || 0);
  const heroSubjectCount = heroAggs
    ? countDistinctFacetValues(heroAggs, 'subject')
    : (facetOptions.subject?.length || 0);
  const heroLanguageCount = heroAggs
    ? countDistinctFacetValues(heroAggs, 'language')
    : (facetOptions.language?.length || 0);

  useEffect(() => {
    const nextQ = parseQFromParams(searchParams);
    const nextSelected = parseSelectedFromParams(searchParams);
    const nextPage = Number(searchParams.get('page')) || 1;
    setQ((prev) => (prev === nextQ ? prev : nextQ));
    setSearchDraft((prev) => (prev === nextQ ? prev : nextQ));
    setSelected((prev) => (selectedEqual(prev, nextSelected) ? prev : nextSelected));
    setPage((prev) => (prev === nextPage ? prev : nextPage));
  }, [searchParams]);

  const writeUrl = useCallback((nextSelected, nextQ, nextPage) => {
    setSearchParams(buildSearchParams(nextSelected, nextQ, nextPage), { replace: true });
  }, [setSearchParams]);
  const writeUrlRef = useRef(writeUrl);
  writeUrlRef.current = writeUrl;

  const debouncedQ = useRef(debounce((val) => {
    setQ(val);
    setPage(1);
    writeUrlRef.current(selectedRef.current, val, 1);
  }, 300)).current;

  useEffect(() => () => debouncedQ.cancel(), [debouncedQ]);

  const anyFilter = CATALOG_FACET_KEYS.some((key) => selected[key].length > 0) || !!q;
  const showInitialLoading = isLoading && !catalogData;

  const toggle = (key, opt) => {
    setSelected((s) => {
      const nextVals = s[key].includes(opt) ? s[key].filter((v) => v !== opt) : [...s[key], opt];
      const next = { ...s, [key]: nextVals };
      writeUrl(next, q, 1);
      return next;
    });
    setPage(1);
  };

  const clearKey = (key) => {
    setSelected((s) => {
      const next = { ...s, [key]: [] };
      writeUrl(next, q, 1);
      return next;
    });
    setPage(1);
  };

  const clearAll = () => {
    const next = emptySelected();
    setSelected(next);
    setQ('');
    setSearchDraft('');
    setPage(1);
    setSearchParams({}, { replace: true });
  };

  const goToPage = (n) => {
    setPage(n);
    writeUrl(selected, q, n);
  };

  const activeChips = [];
  CATALOG_FACET_KEYS.forEach((k) => {
    selected[k].forEach((v) => activeChips.push({ key: k, value: v }));
  });
  if (q) {
    activeChips.unshift({ key: 'q', value: q });
  }

  return (
    <>
      <section className="tels-courses-hero">
        <div className="tels-container">
          <p className="tels-eyebrow">{intl.formatMessage(messages.heroEyebrow)}</p>
          <h1 className="tels-h1">{intl.formatMessage(messages.heroTitle)}</h1>
          <p className="tels-lead">
            {intl.formatMessage(messages.heroLead)}
          </p>
          <div className="tels-courses-hero__stats">
            <div><strong>{showInitialLoading ? '—' : `${heroCourseCount}+`}</strong><span>{intl.formatMessage(messages.statCourses)}</span></div>
            <div><strong>{showInitialLoading ? '—' : `${heroOrgCount}+`}</strong><span>{intl.formatMessage(messages.statOrgs)}</span></div>
            <div><strong>{showInitialLoading ? '—' : heroSubjectCount}</strong><span>{intl.formatMessage(messages.statSubjects)}</span></div>
            <div><strong>{showInitialLoading ? '—' : heroLanguageCount}</strong><span>{intl.formatMessage(messages.statLanguages)}</span></div>
          </div>
        </div>
      </section>

      <div className="tels-container tels-courses__main">
        <div className="tels-search-wide">
          <FontAwesomeIcon icon={faSearch} />
          <input
            value={searchDraft}
            placeholder={intl.formatMessage(messages.searchPlaceholder)}
            aria-label={intl.formatMessage(messages.searchAria)}
            onChange={(e) => {
              const val = e.target.value;
              setSearchDraft(val);
              debouncedQ(val);
            }}
          />
        </div>

        <div className="tels-filterbar" role="group" aria-label={intl.formatMessage(messages.filtersAria)}>
          {filters.map((f) => {
            const isOpen = openFilter === f.key;
            const label = intl.formatMessage(f.label);
            return (
              <div key={f.key} className="tels-courses__filter-wrap">
                <button
                  type="button"
                  className={`tels-filterpill ${selected[f.key].length ? 'active' : ''}`}
                  onClick={() => setOpenFilter(isOpen ? null : f.key)}
                  aria-expanded={isOpen}
                >
                  {label}
                  {selected[f.key].length ? ` (${selected[f.key].length})` : ''}
                  <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                </button>
                {isOpen && (
                <div className="tels-filterpill__panel" role="dialog" aria-label={intl.formatMessage(messages.filterOptionsAria, { label })}>
                  {f.options.map((opt) => (
                    <label key={opt}>
                      <input type="checkbox" checked={selected[f.key].includes(opt)} onChange={() => toggle(f.key, opt)} />
                      {opt}
                    </label>
                  ))}
                  <div className="tels-filterpill__actions">
                    <button type="button" className="tels-btn tels-btn--outline tels-btn--sm" onClick={() => clearKey(f.key)}>
                      {intl.formatMessage(messages.clear)}
                    </button>
                    <button type="button" className="tels-btn tels-btn--primary tels-btn--sm" onClick={() => setOpenFilter(null)}>
                      {intl.formatMessage(messages.apply)}
                    </button>
                  </div>
                </div>
                )}
              </div>
            );
          })}
        </div>

        {activeChips.length > 0 && (
        <div className="tels-chips">
          {activeChips.map((c) => (
            <span key={`${c.key}-${c.value}`} className="tels-chip">
              {c.value}
              <button
                type="button"
                aria-label={intl.formatMessage(messages.removeChip, { value: c.value })}
                onClick={() => {
                  if (c.key === 'q') {
                    setQ('');
                    setSearchDraft('');
                    setPage(1);
                    writeUrl(selected, '', 1);
                    return;
                  }
                  toggle(c.key, c.value);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </span>
          ))}
          <button type="button" className="tels-btn tels-btn--outline tels-btn--sm" onClick={clearAll}>{intl.formatMessage(messages.clearAll)}</button>
        </div>
        )}

        <div className="tels-results-head">
          <h2 className="tels-courses__results-title">
            {showInitialLoading
              ? <Skeleton w={180} h={22} />
              : intl.formatMessage(messages.resultsCount, { count: totalResults })}
            {anyFilter && !showInitialLoading && (
              <span className="tels-muted tels-courses__matching">
                {intl.formatMessage(messages.matchingFilters)}
              </span>
            )}
            {isFetching && !showInitialLoading && (
              <span className="tels-muted tels-courses__matching"> …</span>
            )}
          </h2>
          {!showInitialLoading && totalResults > 0 && (
          <span className="tels-muted">
            {intl.formatMessage(messages.showingRange, {
              start: (currentPage - 1) * PAGE_SIZE + 1,
              end: Math.min(currentPage * PAGE_SIZE, totalResults),
              total: totalResults,
            })}
          </span>
          )}
        </div>

        {showInitialLoading && <LoadingScreen variant="courses" count={12} cols={4} showLabel={false} />}

        {!showInitialLoading && isError && (
        <div className="tels-empty" role="alert">
          <h3 className="tels-h3">{intl.formatMessage(messages.errorTitle)}</h3>
          {/* API's own error message takes priority; local message is only a fallback. */}
          <p className="tels-muted">{displayApiError(error, intl, messages.errorFallbackBody)}</p>
          <button type="button" className="tels-btn tels-btn--primary" onClick={() => refetch()}>
            {intl.formatMessage(messages.retry)}
          </button>
        </div>
        )}

        {!showInitialLoading && !isError && totalResults === 0 && (
        <div className="tels-empty">
          <h3 className="tels-h3">{intl.formatMessage(messages.emptyTitle)}</h3>
          <p className="tels-muted">{intl.formatMessage(messages.emptyBody)}</p>
          <button type="button" className="tels-btn tels-btn--primary" onClick={clearAll}>{intl.formatMessage(messages.clearFilters)}</button>
        </div>
        )}

        {!showInitialLoading && !isError && totalResults > 0 && (
        <>
          <div className="tels-grid tels-grid--4">
            {displayCourses.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
          {totalPages > 1 && (
          <nav className="tels-pagination" aria-label={intl.formatMessage(messages.paginationAria)}>
            <button type="button" className="tels-btn tels-btn--outline tels-btn--sm" onClick={() => goToPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
              {intl.formatMessage(messages.previous)}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button type="button" key={n} className={`tels-pagination__num ${n === currentPage ? 'is-active' : ''}`} onClick={() => goToPage(n)} aria-current={n === currentPage ? 'page' : undefined}>
                {n}
              </button>
            ))}
            <button type="button" className="tels-btn tels-btn--outline tels-btn--sm" onClick={() => goToPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
              {intl.formatMessage(messages.next)}
            </button>
          </nav>
          )}
        </>
        )}
      </div>
    </>
  );
};
export default CoursesPage;
