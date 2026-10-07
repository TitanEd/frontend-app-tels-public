import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ChevronDown, X } from 'lucide-react';

import CourseCard from '../../components/CourseCard';
import EmailSignup from '../../components/EmailSignup';
import Pagination from '../../components/Pagination';
import { fetchCatalogCourses, fetchTaxonomy } from '../../data/api/catalog';
import taxonomyMessages, { formatDifficulty, formatSubject } from '../../i18n/taxonomyMessages';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './courses-messages';

const PAGE_SIZE = 12;
const EMPTY_TAXONOMY = { subjects: [], skills: [], levels: [] };

const csv = (value) => String(value || '').split(',').filter(Boolean);

/**
 * URL state -> parameters of the shared catalog API (GET /api/v1/catalog/courses/):
 *   keywords -> search_string, subject -> subject[], skill -> skill[], difficulty -> level[],
 *   price (Free | Paid) -> free, start (available | upcoming) -> start_before / start_after,
 *   org -> org[], page -> page_index. Nothing is filtered in the browser.
 */
const toApiParams = (search, lockedSubject, lockedOrg) => {
  const params = {
    page_size: PAGE_SIZE,
    page_index: Math.max(0, (Number(search.page) || 1) - 1),
    search_string: search.keywords || '',
    sort: 'start_desc',
  };
  const subjects = lockedSubject ? [lockedSubject] : csv(search.subject);
  if (subjects.length) { params.subject = subjects; }
  const skills = csv(search.skill);
  if (skills.length) { params.skill = skills; }
  if (search.difficulty) { params.level = [search.difficulty]; }
  if (search.price === 'Free') { params.free = true; }
  if (search.price === 'Paid') { params.free = false; }
  if (search.start === 'upcoming') {
    params.start_after = new Date().toISOString();
    params.sort = 'start_asc';
  }
  if (search.start === 'available') { params.start_before = new Date().toISOString(); }
  if (lockedOrg) { params.org = [lockedOrg]; }
  return params;
};

const Dropdown = ({ label, active, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) { setOpen(false); }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div ref={ref} className="tels-filter-dropdown">
      <button
        type="button"
        className={`tels-filter-trigger ${active || open ? 'is-active' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <ChevronDown size={13} />
      </button>
      <div className={`tels-filter-panel-clip${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="tels-filter-panel">
          <div className="tels-filter-panel__inner">
            {children(() => setOpen(false))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckOption = ({
  checked, onChange, children, disabled, count,
}) => (
  <label className={`tels-filter-option${disabled ? ' tels-filter-option--disabled' : ''}`}>
    <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} />
    <span>{children}</span>
    {typeof count === 'number' && <span className="tels-filter-option__count">{count}</span>}
  </label>
);

const RadioOption = ({ checked, onChange, children }) => (
  <label className="tels-filter-option">
    <input type="radio" checked={checked} onChange={onChange} />
    <span>{children}</span>
  </label>
);

const SkeletonCard = () => (
  <article className="tels-course-card tels-course-card--skeleton" aria-hidden="true">
    <div className="tels-course-card__media" />
    <div className="tels-course-card__body">
      <div className="tels-skeleton-line tels-skeleton-line--short" />
      <div className="tels-skeleton-line" />
      <div className="tels-skeleton-line" />
      <div className="tels-skeleton-line tels-skeleton-line--short" />
    </div>
  </article>
);

const CoursesPage = ({ title, lockedSubject, lockedOrg }) => {
  const intl = useIntl();
  const heading = title || intl.formatMessage(messages.heading);
  useDocumentTitle(
    title
      ? intl.formatMessage(messages.docTitleNamed, { title })
      : intl.formatMessage(messages.docTitle),
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const search = useMemo(() => ({
    keywords: searchParams.get('keywords') || undefined,
    subject: searchParams.get('subject') || undefined,
    skill: searchParams.get('skill') || undefined,
    price: searchParams.get('price') || undefined,
    start: searchParams.get('start') || undefined,
    difficulty: searchParams.get('difficulty') || undefined,
    page: searchParams.get('page') || undefined,
  }), [searchParams]);

  const [taxonomy, setTaxonomy] = useState(EMPTY_TAXONOMY);
  useEffect(() => {
    let cancelled = false;
    fetchTaxonomy().then((result) => { if (!cancelled) { setTaxonomy(result); } }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const [results, setResults] = useState({
    loading: true, failed: false, courses: [], total: 0,
  });
  const apiParams = useMemo(() => toApiParams(search, lockedSubject, lockedOrg), [search, lockedSubject, lockedOrg]);
  const requestKey = JSON.stringify({
    ...apiParams,
    start_after: Boolean(apiParams.start_after),
    start_before: Boolean(apiParams.start_before),
  });
  useEffect(() => {
    let cancelled = false;
    setResults((prev) => ({ ...prev, loading: true, failed: false }));
    fetchCatalogCourses(apiParams)
      .then(({ courses, total }) => {
        if (!cancelled) {
          setResults({
            loading: false, failed: false, courses, total,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResults({
            loading: false, failed: true, courses: [], total: 0,
          });
        }
      });
    return () => { cancelled = true; };
  }, [requestKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const page = Math.max(1, Number(search.page) || 1);
  const pageCount = Math.max(1, Math.ceil(results.total / PAGE_SIZE));

  const update = (patch, { keepPage = false } = {}) => {
    const next = { ...search, ...patch };
    if (!keepPage) { next.page = undefined; }
    const params = {};
    Object.keys(next).forEach((k) => {
      if (next[k]) { params[k] = next[k]; }
    });
    setSearchParams(params);
  };

  const toggleCsv = (key, value) => {
    const cur = csv(search[key]);
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    update({ [key]: next.length ? next.join(',') : undefined });
  };

  const goToPage = (nextPage) => {
    update({ page: nextPage > 1 ? String(nextPage) : undefined }, { keepPage: true });
    if (typeof window !== 'undefined') { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  const clearAll = () => setSearchParams({});

  const selectedSubjects = lockedSubject ? [lockedSubject] : csv(search.subject);
  const selectedSkills = csv(search.skill);

  const activeChips = [];
  if (search.keywords) {
    activeChips.push({ key: 'kw', label: `"${search.keywords}"`, onRemove: () => update({ keywords: undefined }) });
  }
  if (!lockedSubject) {
    selectedSubjects.forEach((s) => activeChips.push({
      key: `subject-${s}`, label: formatSubject(intl, s), onRemove: () => toggleCsv('subject', s),
    }));
  }
  selectedSkills.forEach((s) => activeChips.push({
    key: `skill-${s}`, label: s, onRemove: () => toggleCsv('skill', s),
  }));
  if (search.price) {
    const priceLabel = search.price === 'Free'
      ? intl.formatMessage(taxonomyMessages.free)
      : intl.formatMessage(taxonomyMessages.paid);
    activeChips.push({ key: 'price', label: priceLabel, onRemove: () => update({ price: undefined }) });
  }
  if (search.start) {
    activeChips.push({
      key: 'start',
      label: intl.formatMessage(search.start === 'upcoming' ? messages.startUpcoming : messages.startAvailable),
      onRemove: () => update({ start: undefined }),
    });
  }
  if (search.difficulty) {
    activeChips.push({
      key: 'difficulty', label: formatDifficulty(intl, search.difficulty), onRemove: () => update({ difficulty: undefined }),
    });
  }

  return (
    <>
      <section className="tels-courses-header">
        <div className="tels-container">
          <h1>{heading}</h1>
        </div>
        <div className="tels-filter-bar">
          <div className="tels-container">
            <Dropdown label={intl.formatMessage(messages.filterSubject)} active={selectedSubjects.length > 0}>
              {() => taxonomy.subjects.map((s) => (
                <CheckOption
                  key={s.id}
                  checked={selectedSubjects.includes(s.name)}
                  disabled={lockedSubject === s.name}
                  onChange={() => toggleCsv('subject', s.name)}
                  count={s.courseCount}
                >
                  {formatSubject(intl, s.name)}
                </CheckOption>
              ))}
            </Dropdown>
            <Dropdown label={intl.formatMessage(messages.filterPrice)} active={!!search.price}>
              {() => (
                <>
                  <RadioOption checked={search.price === undefined} onChange={() => update({ price: undefined })}>
                    {intl.formatMessage(taxonomyMessages.any)}
                  </RadioOption>
                  <RadioOption checked={search.price === 'Free'} onChange={() => update({ price: 'Free' })}>
                    {intl.formatMessage(taxonomyMessages.free)}
                  </RadioOption>
                  <RadioOption checked={search.price === 'Paid'} onChange={() => update({ price: 'Paid' })}>
                    {intl.formatMessage(taxonomyMessages.paid)}
                  </RadioOption>
                </>
              )}
            </Dropdown>
            <Dropdown label={intl.formatMessage(messages.filterStartDate)} active={!!search.start}>
              {() => (
                <>
                  <RadioOption checked={!search.start} onChange={() => update({ start: undefined })}>
                    {intl.formatMessage(messages.startAny)}
                  </RadioOption>
                  <RadioOption checked={search.start === 'available'} onChange={() => update({ start: 'available' })}>
                    {intl.formatMessage(messages.startAvailable)}
                  </RadioOption>
                  <RadioOption checked={search.start === 'upcoming'} onChange={() => update({ start: 'upcoming' })}>
                    {intl.formatMessage(messages.startUpcoming)}
                  </RadioOption>
                </>
              )}
            </Dropdown>
            <Dropdown label={intl.formatMessage(messages.filterSkills)} active={selectedSkills.length > 0}>
              {() => (taxonomy.skills.length === 0
                ? (
                  <span className="tels-filter-option tels-filter-option--disabled">
                    {intl.formatMessage(taxonomyMessages.any)}
                  </span>
                )
                : taxonomy.skills.map((s) => (
                  <CheckOption
                    key={s.id}
                    checked={selectedSkills.includes(s.name)}
                    onChange={() => toggleCsv('skill', s.name)}
                    count={s.courseCount}
                  >
                    {s.name}
                  </CheckOption>
                )))}
            </Dropdown>
            <Dropdown label={intl.formatMessage(messages.filterDifficulty)} active={!!search.difficulty}>
              {() => (
                <>
                  <RadioOption checked={!search.difficulty} onChange={() => update({ difficulty: undefined })}>
                    {intl.formatMessage(taxonomyMessages.any)}
                  </RadioOption>
                  {taxonomy.levels.map((d) => (
                    <RadioOption
                      key={d.id}
                      checked={search.difficulty === d.name}
                      onChange={() => update({ difficulty: d.name })}
                    >
                      {formatDifficulty(intl, d.name)}
                    </RadioOption>
                  ))}
                </>
              )}
            </Dropdown>
          </div>
        </div>
      </section>

      <section className="tels-courses-results" aria-busy={results.loading}>
        <div className="tels-container">
          <div className="tels-results-head">
            <h2>
              {results.loading
                ? intl.formatMessage(messages.loading)
                : intl.formatMessage(
                  activeChips.length > 0 ? messages.resultsFor : messages.results,
                  { count: results.total },
                )}
            </h2>
            {!results.loading && pageCount > 1 && (
              <span className="tels-results-head__page">
                {intl.formatMessage(messages.pageOf, { page, pageCount })}
              </span>
            )}
          </div>
          {activeChips.length > 0 && (
            <div className="tels-chips">
              {activeChips.map((c) => (
                <span key={c.key} className="tels-chip">
                  {c.label}
                  <button
                    type="button"
                    onClick={c.onRemove}
                    aria-label={intl.formatMessage(messages.removeFilter, { label: c.label })}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
              <button type="button" className="tels-clear-filters" onClick={clearAll}>
                {intl.formatMessage(messages.clearFilters)}
              </button>
            </div>
          )}
          {results.loading && (
            <div className="tels-grid tels-grid--3">
              {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
            </div>
          )}
          {!results.loading && results.failed && (
            <div className="tels-empty" role="alert">{intl.formatMessage(messages.loadFailed)}</div>
          )}
          {!results.loading && !results.failed && results.courses.length === 0 && (
            <div className="tels-empty">{intl.formatMessage(messages.empty)}</div>
          )}
          {!results.loading && !results.failed && results.courses.length > 0 && (
            <div className="tels-grid tels-grid--3">
              {results.courses.map((c) => <CourseCard key={c.courseKey || c.slug} course={c} />)}
            </div>
          )}
          {!results.loading && <Pagination page={page} pageCount={pageCount} onChange={goToPage} />}
        </div>
      </section>

      <EmailSignup />
    </>
  );
};

export default CoursesPage;
