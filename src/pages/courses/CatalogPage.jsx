import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';

import CourseCard from '../../components/CourseCard';
import EmailSignup from '../../components/EmailSignup';
import { COURSES, SUBJECTS, SCHOOLS } from '../../data/telsCourses';
import useDocumentTitle from '../../lib/useDocumentTitle';

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
        <ChevronDown size={13} style={{ transform: open ? 'rotate(180deg)' : undefined }} />
      </button>
      {open && (
        <div className="tels-filter-panel">
          {children(() => setOpen(false))}
        </div>
      )}
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
  useDocumentTitle(title ? `${title} — TELS by TitanEd` : 'Courses — TELS by TitanEd');

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
  (search.subject || '').split(',').filter(Boolean).forEach((s) => activeChips.push({ label: s, onRemove: () => toggleCsv('subject', s) }));
  (search.school || '').split(',').filter(Boolean).forEach((s) => {
    const name = SCHOOLS.find((x) => x.slug === s)?.name || s;
    activeChips.push({ label: name, onRemove: () => toggleCsv('school', s) });
  });
  if (search.price) {
    activeChips.push({ label: search.price, onRemove: () => update({ price: undefined }) });
  }
  if (search.duration) {
    activeChips.push({ label: search.duration, onRemove: () => update({ duration: undefined }) });
  }
  if (search.difficulty) {
    activeChips.push({ label: search.difficulty, onRemove: () => update({ difficulty: undefined }) });
  }
  if (search.modality) {
    activeChips.push({ label: search.modality, onRemove: () => update({ modality: undefined }) });
  }

  return (
    <>
      <section className="tels-catalog-header">
        <div className="tels-container">
          <h1>{title ?? 'Courses'}</h1>
        </div>
        <div className="tels-filter-bar">
          <div className="tels-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Dropdown label="Subject Area" active={!!effective.subject}>
              {() => SUBJECTS.map((s) => (
                <CheckOption
                  key={s}
                  checked={(effective.subject || '').split(',').includes(s)}
                  disabled={lockedSubject === s}
                  onChange={() => toggleCsv('subject', s)}
                >
                  {s}
                </CheckOption>
              ))}
            </Dropdown>
            <Dropdown label="Price" active={!!search.price}>
              {() => (
                <>
                  <RadioOption checked={search.price === undefined} onChange={() => update({ price: undefined })}>
                    Any
                  </RadioOption>
                  <RadioOption checked={search.price === 'Free'} onChange={() => update({ price: 'Free' })}>
                    Free
                  </RadioOption>
                  <RadioOption checked={search.price === 'Paid'} onChange={() => update({ price: 'Paid' })}>
                    Paid
                  </RadioOption>
                </>
              )}
            </Dropdown>
            <Dropdown label="Start Date">
              {() => (
                <>
                  <RadioOption checked onChange={() => {}}>Any</RadioOption>
                  <RadioOption checked={false} onChange={() => {}}>Available now</RadioOption>
                  <RadioOption checked={false} onChange={() => {}}>Starts soon</RadioOption>
                </>
              )}
            </Dropdown>
            <Dropdown label="Schools" active={!!effective.school}>
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
            <Dropdown label="Duration" active={!!search.duration}>
              {() => (
                <>
                  <RadioOption checked={!search.duration} onChange={() => update({ duration: undefined })}>
                    Any
                  </RadioOption>
                  {DURATION_BUCKETS.map((b) => (
                    <RadioOption
                      key={b.label}
                      checked={search.duration === b.label}
                      onChange={() => update({ duration: b.label })}
                    >
                      {b.label}
                    </RadioOption>
                  ))}
                </>
              )}
            </Dropdown>
            <Dropdown label="Difficulty" active={!!search.difficulty}>
              {() => (
                <>
                  <RadioOption checked={!search.difficulty} onChange={() => update({ difficulty: undefined })}>
                    Any
                  </RadioOption>
                  {DIFFICULTIES.map((d) => (
                    <RadioOption key={d} checked={search.difficulty === d} onChange={() => update({ difficulty: d })}>
                      {d}
                    </RadioOption>
                  ))}
                </>
              )}
            </Dropdown>
            <Dropdown label="Modality" active={!!search.modality}>
              {() => (
                <>
                  <RadioOption checked={!search.modality} onChange={() => update({ modality: undefined })}>
                    Any
                  </RadioOption>
                  {MODALITIES.map((m) => (
                    <RadioOption key={m} checked={search.modality === m} onChange={() => update({ modality: m })}>
                      {m}
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
              {results.length}
              {' '}
              results
              {activeChips.length > 0 ? ' for' : ''}
            </h2>
          </div>
          {activeChips.length > 0 && (
            <div className="tels-chips">
              {activeChips.map((c) => (
                <span key={c.label} className="tels-chip">
                  {c.label}
                  <button type="button" onClick={c.onRemove} aria-label={`Remove ${c.label} filter`}>
                    <X size={13} />
                  </button>
                </span>
              ))}
              <button type="button" className="tels-clear-filters" onClick={clearAll}>Clear all filters</button>
            </div>
          )}
          {results.length === 0 ? (
            <div className="tels-empty">No courses matched your search.</div>
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
