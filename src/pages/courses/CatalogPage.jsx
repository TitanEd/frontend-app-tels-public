import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ChevronDown, X } from 'lucide-react';

import CourseCard from '../../components/CourseCard';
import EmailSignup from '../../components/EmailSignup';
import { COURSES, SUBJECTS, SCHOOLS } from '../../data/telsCourses';
import taxonomyMessages, {
  formatDifficulty,
  formatDurationBucket,
  formatModality,
  formatSubject,
} from '../../i18n/taxonomyMessages';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './catalog-messages';

const DURATION_BUCKETS = [
  { label: '0-1 weeks', min: 0, max: 1 },
  { label: '1-2 weeks', min: 1, max: 2 },
  { label: '2-4 weeks', min: 2, max: 4 },
  { label: '4-8 weeks', min: 4, max: 8 },
  { label: '8-12 weeks', min: 8, max: 12 },
  { label: '12+ weeks', min: 12, max: 999 },
];
const DIFFICULTIES = ['Introductory', 'Intermediate', 'Advanced'];
const MODALITIES = ['In-Person', 'Blended', 'Online', 'Online Live'];

const filterCourses = (courses, s) => courses.filter((c) => {
  if (s.keywords) {
    const q = s.keywords.toLowerCase();
    const inTitle = c.title.toLowerCase().includes(q);
    const inDescription = c.description.toLowerCase().includes(q);
    const inTopics = c.topics.some((t) => t.toLowerCase().includes(q));
    if (!(inTitle || inDescription || inTopics)) {
      return false;
    }
  }
  if (s.subject) {
    if (!s.subject.split(',').includes(c.subject)) { return false; }
  }
  if (s.price === 'Free' && c.price !== 0) { return false; }
  if (s.price === 'Paid' && c.price === 0) { return false; }
  if (s.school) {
    if (!s.school.split(',').includes(c.schoolSlug)) { return false; }
  }
  if (s.duration) {
    const bucket = DURATION_BUCKETS.find((b) => b.label === s.duration);
    if (bucket && !(c.durationWeeks >= bucket.min && c.durationWeeks < bucket.max)) { return false; }
  }
  if (s.difficulty && c.difficulty !== s.difficulty) { return false; }
  if (s.modality && c.modality !== s.modality) { return false; }
  return true;
});

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
    <div ref={ref} style={{ position: 'relative' }}>
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
  checked, onChange, children, disabled,
}) => (
  <label className="tels-filter-option" style={disabled ? { opacity: 0.6 } : undefined}>
    <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} />
    <span>{children}</span>
  </label>
);

const RadioOption = ({ checked, onChange, children }) => (
  <label className="tels-filter-option">
    <input type="radio" checked={checked} onChange={onChange} />
    <span>{children}</span>
  </label>
);

const CatalogPage = ({ title, lockedSubject, lockedSchool }) => {
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
    price: searchParams.get('price') || undefined,
    school: searchParams.get('school') || undefined,
    duration: searchParams.get('duration') || undefined,
    difficulty: searchParams.get('difficulty') || undefined,
    modality: searchParams.get('modality') || undefined,
  }), [searchParams]);

  const effective = {
    ...search,
    subject: lockedSubject ?? search.subject,
    school: lockedSchool ?? search.school,
  };
  const results = useMemo(() => filterCourses(COURSES, effective), [effective]);

  const update = (patch) => {
    const next = { ...search, ...patch };
    const params = {};
    Object.keys(next).forEach((k) => {
      if (next[k]) { params[k] = next[k]; }
    });
    setSearchParams(params);
  };

  const toggleCsv = (key, value) => {
    const cur = (search[key] || '').split(',').filter(Boolean);
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    update({ [key]: next.length ? next.join(',') : undefined });
  };

  const clearAll = () => setSearchParams({});

  const activeChips = [];
  if (search.keywords) { activeChips.push({ label: `"${search.keywords}"`, onRemove: () => update({ keywords: undefined }) }); }
  (search.subject || '').split(',').filter(Boolean).forEach((s) => activeChips.push({ label: formatSubject(intl, s), onRemove: () => toggleCsv('subject', s) }));
  (search.school || '').split(',').filter(Boolean).forEach((s) => {
    const name = SCHOOLS.find((x) => x.slug === s)?.name || s;
    activeChips.push({ label: name, onRemove: () => toggleCsv('school', s) });
  });
  if (search.price) {
    const priceLabel = search.price === 'Free'
      ? intl.formatMessage(taxonomyMessages.free)
      : intl.formatMessage(taxonomyMessages.paid);
    activeChips.push({ label: priceLabel, onRemove: () => update({ price: undefined }) });
  }
  if (search.duration) {
    activeChips.push({
      label: formatDurationBucket(intl, search.duration),
      onRemove: () => update({ duration: undefined }),
    });
  }
  if (search.difficulty) {
    activeChips.push({
      label: formatDifficulty(intl, search.difficulty),
      onRemove: () => update({ difficulty: undefined }),
    });
  }
  if (search.modality) {
    activeChips.push({
      label: formatModality(intl, search.modality),
      onRemove: () => update({ modality: undefined }),
    });
  }

  return (
    <>
      <section className="tels-catalog-header">
        <div className="tels-container">
          <h1>{heading}</h1>
        </div>
        <div className="tels-filter-bar">
          <div className="tels-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Dropdown label={intl.formatMessage(messages.filterSubject)} active={!!effective.subject}>
              {() => SUBJECTS.map((s) => (
                <CheckOption
                  key={s}
                  checked={(effective.subject || '').split(',').includes(s)}
                  disabled={lockedSubject === s}
                  onChange={() => toggleCsv('subject', s)}
                >
                  {formatSubject(intl, s)}
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
            <Dropdown label={intl.formatMessage(messages.filterStartDate)}>
              {() => (
                <>
                  <RadioOption checked onChange={() => {}}>{intl.formatMessage(taxonomyMessages.any)}</RadioOption>
                  <RadioOption checked={false} onChange={() => {}}>
                    {intl.formatMessage(taxonomyMessages.availableNow)}
                  </RadioOption>
                  <RadioOption checked={false} onChange={() => {}}>
                    {intl.formatMessage(taxonomyMessages.startsSoon)}
                  </RadioOption>
                </>
              )}
            </Dropdown>
            <Dropdown label={intl.formatMessage(messages.filterSchools)} active={!!effective.school}>
              {() => SCHOOLS.map((s) => (
                <CheckOption
                  key={s.slug}
                  checked={(effective.school || '').split(',').includes(s.slug)}
                  disabled={lockedSchool === s.slug}
                  onChange={() => toggleCsv('school', s.slug)}
                >
                  {s.name}
                </CheckOption>
              ))}
            </Dropdown>
            <Dropdown label={intl.formatMessage(messages.filterDuration)} active={!!search.duration}>
              {() => (
                <>
                  <RadioOption checked={!search.duration} onChange={() => update({ duration: undefined })}>
                    {intl.formatMessage(taxonomyMessages.any)}
                  </RadioOption>
                  {DURATION_BUCKETS.map((b) => (
                    <RadioOption
                      key={b.label}
                      checked={search.duration === b.label}
                      onChange={() => update({ duration: b.label })}
                    >
                      {formatDurationBucket(intl, b.label)}
                    </RadioOption>
                  ))}
                </>
              )}
            </Dropdown>
            <Dropdown label={intl.formatMessage(messages.filterDifficulty)} active={!!search.difficulty}>
              {() => (
                <>
                  <RadioOption checked={!search.difficulty} onChange={() => update({ difficulty: undefined })}>
                    {intl.formatMessage(taxonomyMessages.any)}
                  </RadioOption>
                  {DIFFICULTIES.map((d) => (
                    <RadioOption key={d} checked={search.difficulty === d} onChange={() => update({ difficulty: d })}>
                      {formatDifficulty(intl, d)}
                    </RadioOption>
                  ))}
                </>
              )}
            </Dropdown>
            <Dropdown label={intl.formatMessage(messages.filterModality)} active={!!search.modality}>
              {() => (
                <>
                  <RadioOption checked={!search.modality} onChange={() => update({ modality: undefined })}>
                    {intl.formatMessage(taxonomyMessages.any)}
                  </RadioOption>
                  {MODALITIES.map((m) => (
                    <RadioOption key={m} checked={search.modality === m} onChange={() => update({ modality: m })}>
                      {formatModality(intl, m)}
                    </RadioOption>
                  ))}
                </>
              )}
            </Dropdown>
          </div>
        </div>
      </section>

      <section className="tels-catalog-results">
        <div className="tels-container">
          <div className="tels-results-head">
            <h2>
              {intl.formatMessage(
                activeChips.length > 0 ? messages.resultsFor : messages.results,
                { count: results.length },
              )}
            </h2>
          </div>
          {activeChips.length > 0 && (
            <div className="tels-chips">
              {activeChips.map((c) => (
                <span key={c.label} className="tels-chip">
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
          {results.length === 0 ? (
            <div className="tels-empty">{intl.formatMessage(messages.empty)}</div>
          ) : (
            <div className="tels-grid tels-grid--3">
              {results.map((c) => <CourseCard key={c.slug} course={c} />)}
            </div>
          )}
        </div>
      </section>

      <EmailSignup />
    </>
  );
};

export default CatalogPage;
