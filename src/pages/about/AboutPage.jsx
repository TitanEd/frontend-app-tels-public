import { Link } from 'react-router-dom';

import { SCHOOLS } from '../../data/telsCourses';
import useDocumentTitle from '../../lib/useDocumentTitle';

const STATS = [
  ['2,000,000+', 'LEARNERS'],
  ['500+', 'COURSES'],
  ['100+', 'COUNTRIES'],
];

const AboutPage = () => {
  useDocumentTitle('About Us — TELS by TitanEd');

  return (
    <div>
      <div className="tels-page-header">
        <div className="tels-container">
          <h1>About TELS</h1>
        </div>
      </div>

      <div
        className="tels-container"
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          maxWidth: '48rem',
          color: 'var(--pgn-color-text-secondary)',
          lineHeight: 1.7,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <p>
          TELS — TitanEd Learning Services — is TitanEd&rsquo;s professional and lifelong
          learning platform. We partner with academic and industry organizations to deliver
          rigorous, accessible courses across programming, business, data science,
          humanities, and more.
        </p>
        <p>
          Our courses are built on modern open infrastructure and designed for working
          professionals who want to grow their craft, teachers who want to improve their
          practice, and lifelong learners who want to keep learning.
        </p>
        <p>TitanEd is headquartered in Gurugram, India, and works with partners around the world.</p>
      </div>

      <section className="tels-stats-band tels-stats-band--dark">
        <div className="tels-container tels-stats">
          {STATS.map(([n, l]) => (
            <div key={l}>
              <p className="tels-stats__n">{n}</p>
              <p className="tels-stats__l">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-section-header__title" style={{ marginBottom: '1.5rem' }}>Organizations</h2>
          <div className="tels-orgs-grid--cards">
            {SCHOOLS.map((s) => (
              <Link
                key={s.slug}
                to={`/school/${s.slug}`}
                className="tels-org-card"
                style={{ flexDirection: 'column', gap: '0.5rem' }}
              >
                {s.logo
                  ? <img src={s.logo} alt={s.name} />
                  : <span style={{ fontWeight: 700, fontSize: '0.875rem', textAlign: 'center' }}>{s.name}</span>}
                <span style={{ fontSize: '0.75rem', color: 'var(--pgn-color-chrome-text-muted)' }}>{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="tels-cta-band">
        <div className="tels-container">
          <h2>Ready to keep learning?</h2>
          <div className="tels-cta-band__actions">
            <Link to="/catalog" className="tels-btn tels-btn--primary">Explore courses</Link>
            <Link to="/contact" className="tels-btn tels-btn--outline">Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
