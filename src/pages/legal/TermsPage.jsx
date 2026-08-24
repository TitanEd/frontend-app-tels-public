import { Link } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './terms-messages';
import './TermsPage.scss';

const TermsPage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.pageTitle));
  const sections = [
    {
      id: 'acceptance',
      title: messages.section1Title,
      body: [messages.section1p1, messages.section1p2],
    },
    {
      id: 'accounts',
      title: messages.section2Title,
      body: [messages.section2p1, messages.section2p2, messages.section2p3],
    },
    {
      id: 'enrollment',
      title: messages.section3Title,
      body: [messages.section3p1, messages.section3p2, messages.section3p3],
    },
    {
      id: 'payments',
      title: messages.section4Title,
      body: [messages.section4p1, messages.section4p2, messages.section4p3],
    },
    {
      id: 'certificates',
      title: messages.section5Title,
      body: [messages.section5p1, messages.section5p2],
    },
    {
      id: 'user-content',
      title: messages.section6Title,
      body: [messages.section6p1, messages.section6p2, messages.section6p3],
    },
    {
      id: 'ip',
      title: messages.section7Title,
      body: [messages.section7p1, messages.section7p2, messages.section7p3],
    },
    {
      id: 'third-party',
      title: messages.section8Title,
      body: [messages.section8p1],
    },
    {
      id: 'disclaimers',
      title: messages.section9Title,
      body: [messages.section9p1, messages.section9p2],
    },
    {
      id: 'liability',
      title: messages.section10Title,
      body: [messages.section10p1],
    },
    {
      id: 'termination',
      title: messages.section11Title,
      body: [messages.section11p1, messages.section11p2],
    },
    {
      id: 'governing-law',
      title: messages.section12Title,
      body: [messages.section12p1],
    },
    {
      id: 'changes',
      title: messages.section13Title,
      body: [messages.section13p1],
    },
    {
      id: 'contact',
      title: messages.section14Title,
      body: [messages.section14p1],
    },
  ];
  return (
    <>
      <section className="tels-courses-hero tels-courses-hero--text-only">
        <div className="tels-container">
          <div className="tels-breadcrumbs">
            <Link to="/">{intl.formatMessage(messages.breadcrumbHome)}</Link>
            {' '}
            <span>&rsaquo;</span>
            {' '}
            <span>{intl.formatMessage(messages.breadcrumbCurrent)}</span>
          </div>
          <div className="tels-courses-hero__text">
            <div className="tels-eyebrow">{intl.formatMessage(messages.eyebrow)}</div>
            <h1 className="tels-h1">
              {intl.formatMessage(messages.titleLead)}
              {' '}
              <span className="tels-terms__accent">{intl.formatMessage(messages.titleAccent)}</span>
            </h1>
            <p className="tels-lead">{intl.formatMessage(messages.lead)}</p>
            <p className="tels-muted tels-terms__updated">{intl.formatMessage(messages.lastUpdated)}</p>
            <div className="tels-courses-hero__accent" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-legal-layout">
            <aside>
              <div className="tels-eyebrow">{intl.formatMessage(messages.tocEyebrow)}</div>
              <ul className="tels-toc">
                {sections.map((s) => (<li key={s.id}><a href={`#${s.id}`}>{intl.formatMessage(s.title)}</a></li>))}
              </ul>
            </aside>
            <div className="tels-legal">
              {sections.map((s) => (
                <article key={s.id} id={s.id} className="tels-legal__block">
                  <h2 className="tels-h3">{intl.formatMessage(s.title)}</h2>
                  {s.body.map((p) => (<p key={p.id}>{intl.formatMessage(p)}</p>))}
                </article>
              ))}
              <div className="tels-legal__cta">
                <Link to="/privacy" className="tels-btn tels-btn--outline">{intl.formatMessage(messages.privacyCta)}</Link>
                <Link to="/contact" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.contactCta)}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default TermsPage;
