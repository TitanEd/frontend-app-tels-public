import {
  useEffect, useMemo, useRef, useState,
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
import {
  fetchCourses, SUBJECTS, LEVELS, LANGUAGES, TYPES, ORGS,
} from '../../data/telsData';
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
const CoursesPage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.pageTitle));
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: courses = [], isLoading } = useQuery({ queryKey: ['courses'], queryFn: fetchCourses });
  const filters = [
    { key: 'subject', label: messages.filterSubject, options: SUBJECTS },
    { key: 'skills', label: messages.filterSkills, options: ['Python', 'AI', 'SQL', 'Leadership', 'Communication', 'Security'] },
    { key: 'org', label: messages.filterOrg, options: ORGS },
    { key: 'type', label: messages.filterType, options: TYPES },
    { key: 'language', label: messages.filterLanguage, options: LANGUAGES },
    { key: 'level', label: messages.filterLevel, options: LEVELS },
  ];
  const [q, setQ] = useState(searchParams.get('q') ?? '');
  const [selected, setSelected] = useState({
    subject: searchParams.get('subject') ? [searchParams.get('subject')] : [],
    skills: [],
    org: searchParams.get('org') ? [searchParams.get('org')] : [],
    type: searchParams.get('type') ? [searchParams.get('type')] : [],
    language: searchParams.get('language') ? [searchParams.get('language')] : [],
    level: searchParams.get('level') ? [searchParams.get('level')] : [],
  });
  const [openFilter, setOpenFilter] = useState(null);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const debouncedQ = useRef(debounce((val) => { setQ(val); setPage(1); }, 200)).current;
  useEffect(() => () => debouncedQ.cancel(), [debouncedQ]);
  const filtered = useMemo(() => courses.filter((c) => {
    if (q && !`${c.title} ${c.org} ${c.subject} ${c.skills.join(' ')}`.toLowerCase().includes(q.toLowerCase())) {
      return false;
    }
    if (selected.subject.length && !selected.subject.includes(c.subject)) {
      return false;
    }
    if (selected.org.length && !selected.org.includes(c.org)) {
      return false;
    }
    if (selected.type.length && !selected.type.includes(c.type)) {
      return false;
    }
    if (selected.language.length && !selected.language.includes(c.language)) {
      return false;
    }
    if (selected.level.length && !selected.level.includes(c.level)) {
      return false;
    }
    if (selected.skills.length && !selected.skills.some((s) => c.skills.includes(s))) {
      return false;
    }
    return true;
  }), [courses, q, selected]);
  const anyFilter = Object.values(selected).some((a) => a.length > 0) || !!q;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const toggle = (key, opt) => {
    setSelected((s) => ({ ...s, [key]: s[key].includes(opt) ? s[key].filter((v) => v !== opt) : [...s[key], opt] }));
    setPage(1);
  };
  const clearAll = () => {
    setSelected({
      subject: [], skills: [], org: [], type: [], language: [], level: [],
    });
    setQ('');
    setPage(1);
    setSearchParams({});
  };
  const activeChips = [];
  Object.keys(selected).forEach((k) => {
    selected[k].forEach((v) => activeChips.push({ key: k, value: v }));
  });
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
            defaultValue={q}
            placeholder={intl.formatMessage(messages.searchPlaceholder)}
            aria-label={intl.formatMessage(messages.searchAria)}
            onChange={(e) => debouncedQ(e.target.value)}
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
                    <button type="button" className="tels-btn tels-btn--outline tels-btn--sm" onClick={() => { setSelected((s) => ({ ...s, [f.key]: [] })); setPage(1); }}>
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
              <button type="button" aria-label={intl.formatMessage(messages.removeChip, { value: c.value })} onClick={() => toggle(c.key, c.value)}><FontAwesomeIcon icon={faTimes} /></button>
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
            <button type="button" className="tels-btn tels-btn--outline tels-btn--sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
              {intl.formatMessage(messages.previous)}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button type="button" key={n} className={`tels-pagination__num ${n === currentPage ? 'is-active' : ''}`} onClick={() => setPage(n)} aria-current={n === currentPage ? 'page' : undefined}>
                {n}
              </button>
            ))}
            <button type="button" className="tels-btn tels-btn--outline tels-btn--sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
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
