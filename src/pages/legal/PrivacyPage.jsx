import { Link } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './privacy-messages';
import './PrivacyPage.scss';

const PrivacyPage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.pageTitle));
  const sections = [
    {
      id: 'information-we-collect',
      title: messages.section1Title,
      body: [messages.section1p1, messages.section1p2, messages.section1p3],
    },
    {
      id: 'how-we-use',
      title: messages.section2Title,
      body: [messages.section2p1, messages.section2p2, messages.section2p3, messages.section2p4],
    },
    {
      id: 'cookies',
      title: messages.section3Title,
      body: [messages.section3p1, messages.section3p2],
    },
    {
      id: 'sharing',
      title: messages.section4Title,
      body: [messages.section4p1, messages.section4p2, messages.section4p3, messages.section4p4],
    },
    {
      id: 'retention',
      title: messages.section5Title,
      body: [messages.section5p1, messages.section5p2],
    },
    {
      id: 'your-rights',
      title: messages.section6Title,
      body: [messages.section6p1, messages.section6p2],
    },
    {
      id: 'security',
      title: messages.section7Title,
      body: [messages.section7p1, messages.section7p2],
    },
    {
      id: 'children',
      title: messages.section8Title,
      body: [messages.section8p1],
    },
    {
      id: 'international',
      title: messages.section9Title,
      body: [messages.section9p1],
    },
    {
      id: 'changes',
      title: messages.section10Title,
      body: [messages.section10p1],
    },
    {
      id: 'contact',
      title: messages.section11Title,
      body: [messages.section11p1],
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
              <span className="tels-privacy__accent">{intl.formatMessage(messages.titleAccent)}</span>
              {' '}
              {intl.formatMessage(messages.titleRest)}
            </h1>
            <p className="tels-lead">{intl.formatMessage(messages.lead)}</p>
            <p className="tels-muted tels-privacy__updated">{intl.formatMessage(messages.lastUpdated)}</p>
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
                <Link to="/contact" className="tels-btn tels-btn--primary">{intl.formatMessage(messages.contactCta)}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PrivacyPage;
