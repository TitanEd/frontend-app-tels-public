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
import { fetchCoursesList } from '../../data/api';
import {
  SUBJECTS, LEVELS, LANGUAGES, TYPES, ORGS,
} from '../../data/telsData';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './messages';
import './CoursesPage.scss';

const PAGE_SIZE = 8;
const FILTER_KEYS = ['subject', 'skills', 'org', 'type', 'language', 'level'];

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

const emptySelected = () => ({
  subject: [], skills: [], org: [], type: [], language: [], level: [],
});

const parseSelectedFromParams = (searchParams) => {
  const next = emptySelected();
  FILTER_KEYS.forEach((key) => {
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

const selectedEqual = (a, b) => FILTER_KEYS.every(
  (key) => a[key].length === b[key].length && a[key].every((v, i) => v === b[key][i]),
);

const includesIgnoreCase = (list, value) => {
  const needle = String(value || '').toLowerCase();
  return list.some((v) => String(v || '').toLowerCase() === needle);
};

const buildSearchParams = (selected, q, page) => {
  const params = new URLSearchParams();
  if (q) {
    params.set('q', q);
  }
  FILTER_KEYS.forEach((key) => {
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
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses', 'catalog'],
    queryFn: () => fetchCoursesList({ pageSize: 100, pageIndex: 0 }),
  });
  const filters = [
    { key: 'subject', label: messages.filterSubject, options: SUBJECTS },
    { key: 'skills', label: messages.filterSkills, options: ['Python', 'AI', 'SQL', 'Leadership', 'Communication', 'Security'] },
    { key: 'org', label: messages.filterOrg, options: ORGS },
    { key: 'type', label: messages.filterType, options: TYPES },
    { key: 'language', label: messages.filterLanguage, options: LANGUAGES },
    { key: 'level', label: messages.filterLevel, options: LEVELS },
  ];

  const [q, setQ] = useState(() => searchParams.get('q') ?? '');
  const [selected, setSelected] = useState(() => parseSelectedFromParams(searchParams));
  const [openFilter, setOpenFilter] = useState(null);
  const [page, setPage] = useState(() => Number(searchParams.get('page')) || 1);
  const [searchDraft, setSearchDraft] = useState(() => searchParams.get('q') ?? '');
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  // Keep local filter state in sync when URL changes (home category links, back/forward).
  useEffect(() => {
    const nextQ = searchParams.get('q') ?? '';
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
  }, 200)).current;

  useEffect(() => () => debouncedQ.cancel(), [debouncedQ]);

  // Always apply filters client-side (works on live API data and mock fallback).
  const filtered = useMemo(() => courses.filter((c) => {
    const skills = Array.isArray(c.skills) ? c.skills : [];
    const haystack = `${c.title || ''} ${c.org || ''} ${c.subject || ''} ${skills.join(' ')}`.toLowerCase();
    if (q && !haystack.includes(q.toLowerCase())) {
      return false;
    }
    if (selected.subject.length && !includesIgnoreCase(selected.subject, c.subject)) {
      return false;
    }
    if (selected.org.length && !includesIgnoreCase(selected.org, c.org)) {
      return false;
    }
    if (selected.type.length && !includesIgnoreCase(selected.type, c.type)) {
      return false;
    }
    if (selected.language.length && !includesIgnoreCase(selected.language, c.language)) {
      return false;
    }
    if (selected.level.length && !includesIgnoreCase(selected.level, c.level)) {
      return false;
    }
    if (selected.skills.length) {
      const courseSkillsLower = skills.map((s) => String(s).toLowerCase());
      const hasSkill = selected.skills.some((s) => courseSkillsLower.includes(String(s).toLowerCase()));
      if (!hasSkill) {
        return false;
      }
    }
    return true;
  }), [courses, q, selected]);

  const anyFilter = Object.values(selected).some((a) => a.length > 0) || !!q;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
  FILTER_KEYS.forEach((k) => {
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
            <div><strong>{isLoading ? '—' : courses.length}+</strong><span>{intl.formatMessage(messages.statCourses)}</span></div>
            <div><strong>{ORGS.length}+</strong><span>{intl.formatMessage(messages.statOrgs)}</span></div>
            <div><strong>{SUBJECTS.length}</strong><span>{intl.formatMessage(messages.statSubjects)}</span></div>
            <div><strong>{LANGUAGES.length}</strong><span>{intl.formatMessage(messages.statLanguages)}</span></div>
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
                <button type="button" className={`tels-filterpill ${selected[f.key].length ? 'active' : ''}`} onClick={() => setOpenFilter(isOpen ? null : f.key)} aria-expanded={isOpen}>
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
            {isLoading
              ? <Skeleton w={180} h={22} />
              : intl.formatMessage(messages.resultsCount, { count: filtered.length })}
            {anyFilter && !isLoading && (
              <span className="tels-muted tels-courses__matching">
                {intl.formatMessage(messages.matchingFilters)}
              </span>
            )}
          </h2>
          {!isLoading && filtered.length > 0 && (
          <span className="tels-muted">
            {intl.formatMessage(messages.showingRange, {
              start: (currentPage - 1) * PAGE_SIZE + 1,
              end: Math.min(currentPage * PAGE_SIZE, filtered.length),
              total: filtered.length,
            })}
          </span>
          )}
        </div>

        {isLoading && <LoadingScreen variant="courses" count={12} cols={4} showLabel={false} />}

        {!isLoading && filtered.length === 0 && (
        <div className="tels-empty">
          <h3 className="tels-h3">{intl.formatMessage(messages.emptyTitle)}</h3>
          <p className="tels-muted">{intl.formatMessage(messages.emptyBody)}</p>
          <button type="button" className="tels-btn tels-btn--primary" onClick={clearAll}>{intl.formatMessage(messages.clearFilters)}</button>
        </div>
        )}

        {!isLoading && filtered.length > 0 && (
        <>
          <div className="tels-grid tels-grid--4">
            {pageItems.map((c) => <CourseCard key={c.id} course={c} />)}
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
