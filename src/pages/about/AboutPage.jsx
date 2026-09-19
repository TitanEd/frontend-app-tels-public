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

      <div className="tels-container tels-page-body tels-about-prose">
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
          <h2 className="tels-section-header__title tels-about-orgs-title">
            {intl.formatMessage(messages.organizations)}
          </h2>
          <div className="tels-orgs-grid--cards">
            {SCHOOLS.map((s) => (
              <Link
                key={s.slug}
                to={`/school/${s.slug}`}
                className="tels-org-card tels-org-card--stacked"
              >
                {s.logo
                  ? (
                    <img
                      src={s.logo}
                      alt={intl.formatMessage(messages.orgLogoAlt, { name: s.name })}
                    />
                  )
                  : <span className="tels-org-card__fallback">{s.name}</span>}
                <span className="tels-org-card__caption">{s.name}</span>
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
