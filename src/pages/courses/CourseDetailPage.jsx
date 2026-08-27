import { Link, Navigate, useParams } from 'react-router-dom';

import CourseCard from '../../components/CourseCard';
import EmailSignup from '../../components/EmailSignup';
import { COURSES, SCHOOLS } from '../../data/telsCourses';
import useDocumentTitle from '../../lib/useDocumentTitle';

const initials = (name) => name.split(' ').map((n) => n[0]).join('').slice(0, 2);

const CourseDetailPage = () => {
  const { slug } = useParams();
  const course = COURSES.find((c) => c.slug === slug);

  useDocumentTitle(course ? `${course.title} — TELS by TitanEd` : 'Course — TELS by TitanEd');

  if (!course) {
    return <Navigate to="/catalog" replace />;
  }

  const school = SCHOOLS.find((s) => s.slug === course.schoolSlug);
  const related = COURSES.filter((c) => c.subject === course.subject && c.slug !== course.slug).slice(0, 3);

  return (
    <article>
      <div className="tels-page-header">
        <div className="tels-container">
          <div className="tels-breadcrumb">
            <Link to="/catalog">Courses</Link>
            <span className="tels-breadcrumb__sep">/</span>
            <Link to={`/subject/${course.subjectSlug}`}>{course.subject}</Link>
          </div>
          <h1>{course.title}</h1>
          <p style={{
            marginTop: '1rem', maxWidth: '48rem', color: 'var(--pgn-color-text-secondary)', lineHeight: 1.6,
          }}
          >{course.description}
          </p>

          <div className="tels-course-meta">
            <span style={{ fontWeight: 600, color: 'var(--pgn-color-text-base)' }}>{course.availability}</span>
            <span className="tels-course-meta__price">{course.price === 0 ? 'Free*' : `$${course.price.toLocaleString()}`}</span>
            <span>{course.modality}</span>
            <a href="#help" className="tels-link">Help me choose</a>
          </div>

          <div style={{
            marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
          }}
          >
            <a href="#enroll" className="tels-btn tels-btn--primary">Enroll now</a>
            <a href="#learn-more" className="tels-btn tels-btn--outline">Learn More</a>
          </div>
        </div>
      </div>

      <div className="tels-container tels-detail-grid" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <section>
            <h2 className="tels-detail-heading">What you&rsquo;ll learn</h2>
            <ul style={{ color: 'var(--pgn-color-text-secondary)', paddingLeft: '1.25rem' }}>
              {course.learn.map((l) => <li key={l} style={{ marginBottom: '0.5rem' }}>{l}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="tels-detail-heading">Course description</h2>
            <p style={{ color: 'var(--pgn-color-text-secondary)', lineHeight: 1.6 }}>{course.longDescription}</p>
          </section>

          <section>
            <h2 className="tels-detail-heading">Instructors</h2>
            <div className="tels-grid tels-grid--2">
              {course.instructors.map((i) => (
                <div key={i.name} className="tels-instructor-card">
                  <div className="tels-instructor-card__avatar">{initials(i.name)}</div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>{i.name}</p>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--pgn-color-chrome-text-muted)' }}>{i.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {school && (
            <section>
              <h2 className="tels-detail-heading">Associated Schools</h2>
              <Link to={`/school/${school.slug}`} className="tels-instructor-card" style={{ maxWidth: '28rem' }}>
                {school.logo
                  ? <img src={school.logo} alt="" style={{ height: '2.5rem', objectFit: 'contain' }} />
                  : <span style={{ fontWeight: 700 }}>{school.name}</span>}
                <span style={{ fontWeight: 600 }}>{school.name}</span>
              </Link>
            </section>
          )}
        </div>

        <aside className="tels-detail-aside--sticky">
          <div className="tels-details-card">
            <h3>Details</h3>
            <dl>
              {[
                ['Duration', course.duration],
                ['Time Commitment', course.timeCommitment],
                ['Pace', course.pace],
                ['Subject', course.subject],
                ['Course Language', course.language],
                ['Video transcript', course.transcript],
                ['Difficulty', course.difficulty],
                ['Platform', 'TELS / Open edX'],
              ].map(([k, v]) => (
                <div key={k} className="tels-details-row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p style={{
              fontSize: '0.75rem', color: 'var(--pgn-color-chrome-text-muted)', margin: '1rem 0 0',
            }}
            >
              Topics
            </p>
            <div className="tels-topic-chips">
              {course.topics.map((t) => (
                <Link key={t} to={`/catalog?keywords=${encodeURIComponent(t)}`} className="tels-topic-chip">
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="tels-section" style={{ borderTop: '1px solid var(--pgn-color-chrome-border)' }}>
          <div className="tels-container">
            <h2 className="tels-section-header__title" style={{ marginBottom: '1.5rem' }}>You may also like</h2>
            <div className="tels-grid tels-grid--3">
              {related.map((c) => <CourseCard key={c.slug} course={c} />)}
            </div>
          </div>
        </section>
      )}

      <EmailSignup />
    </article>
  );
};

export default CourseDetailPage;
