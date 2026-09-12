import { Link } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';

import { SCHOOLS } from '../../data/telsCourses';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './messages';

const AboutPage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.docTitle));

  const stats = [
    ['2,000,000+', messages.learners],
    ['500+', messages.courses],
    ['100+', messages.countries],
  ];

  return (
    <div>
      <div className="tels-page-header">
        <div className="tels-container">
          <h1>{intl.formatMessage(messages.heading)}</h1>
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
        <p>{intl.formatMessage(messages.p1)}</p>
        <p>{intl.formatMessage(messages.p2)}</p>
        <p>{intl.formatMessage(messages.p3)}</p>
      </div>

      <section className="tels-stats-band tels-stats-band--dark">
        <div className="tels-container tels-stats">
          {stats.map(([n, label]) => (
            <div key={label.id}>
              <p className="tels-stats__n">{n}</p>
              <p className="tels-stats__l">{intl.formatMessage(label)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-section-header__title" style={{ marginBottom: '1.5rem' }}>
            {intl.formatMessage(messages.organizations)}
          </h2>
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
          <h2>{intl.formatMessage(messages.ready)}</h2>
          <div className="tels-cta-band__actions">
            <Link to="/courses" className="tels-btn tels-btn--primary">
              {intl.formatMessage(messages.exploreCourses)}
            </Link>
            <Link to="/contact" className="tels-btn tels-btn--outline">
              {intl.formatMessage(messages.contactUs)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
