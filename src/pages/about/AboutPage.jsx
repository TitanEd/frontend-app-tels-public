import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown, faChevronUp, faBookOpen, faCertificate, faCheckCircle, faGraduationCap, faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import useDocumentTitle from '../../lib/useDocumentTitle';
import { CATALOG_LINKS } from '../../lib/catalogLinks';
// Bundled locally — no external image links (same asset as HomePage's
// solutions images; see the comment there re: the inline file-loader for
// .webp — the shared webpack image rule doesn't match it, and the
// project's own webpack.*-tutor.config.js overrides are gitignored/
// generated, not real editable config, so this is the durable fix).
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import missionImg from '!!file-loader!../../assets/home/collaborative-learning.webp';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import storyImg from '!!file-loader!../../assets/home/classroom-education.webp';
import messages from './messages';
import './AboutPage.scss';

const MISSION_IMG = missionImg;
const STORY_IMG = storyImg;
const AboutPage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.pageTitle));
  const [openFaq, setOpenFaq] = useState(0);
  const outcomes = [
    { icon: faCheckCircle, title: messages.outcome1Title, body: messages.outcome1Body },
    { icon: faGraduationCap, title: messages.outcome2Title, body: messages.outcome2Body },
    { icon: faChartLine, title: messages.outcome3Title, body: messages.outcome3Body },
  ];
  const formats = [
    {
      icon: faBookOpen,
      title: messages.format1Title,
      body: messages.format1Body,
      items: [messages.format1Item1, messages.format1Item2, messages.format1Item3],
      cta: messages.format1Cta,
      to: CATALOG_LINKS.individualCourses,
      featured: false,
    },
    {
      icon: faCertificate,
      title: messages.format2Title,
      body: messages.format2Body,
      items: [messages.format2Item1, messages.format2Item2, messages.format2Item3],
      cta: messages.format2Cta,
      to: CATALOG_LINKS.certificatePrograms,
      featured: true,
    },
    {
      icon: faChartLine,
      title: messages.format3Title,
      body: messages.format3Body,
      items: [messages.format3Item1, messages.format3Item2, messages.format3Item3],
      cta: messages.format3Cta,
      to: CATALOG_LINKS.executiveLearning,
      featured: false,
    },
    {
      icon: faGraduationCap,
      title: messages.format4Title,
      body: messages.format4Body,
      items: [messages.format4Item1, messages.format4Item2, messages.format4Item3],
      cta: messages.format4Cta,
      to: CATALOG_LINKS.learningPathways,
      featured: false,
    },
  ];
  const faq = [
    { q: messages.faq1q, a: messages.faq1a },
    { q: messages.faq2q, a: messages.faq2a },
    { q: messages.faq3q, a: messages.faq3a },
    { q: messages.faq4q, a: messages.faq4a },
    { q: messages.faq5q, a: messages.faq5a },
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
            <span>{intl.formatMessage(messages.breadcrumbAbout)}</span>
          </div>
          <div className="tels-courses-hero__text">
            <div className="tels-eyebrow">{intl.formatMessage(messages.heroEyebrow)}</div>
            <h1 className="tels-h1">
              {intl.formatMessage(messages.heroTitleLead)}
              {' '}
              <span className="tels-about__accent">{intl.formatMessage(messages.heroTitleAccent)}</span>
            </h1>
            <p className="tels-lead">{intl.formatMessage(messages.heroLead)}</p>
            <div className="tels-courses-hero__accent" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container tels-about__centered">
          <div className="tels-eyebrow">{intl.formatMessage(messages.whatIsEyebrow)}</div>
          <h2 className="tels-h2">{intl.formatMessage(messages.whatIsTitle)}</h2>
          <p className="tels-lead tels-about__lead-centered">{intl.formatMessage(messages.whatIsBody)}</p>
        </div>
      </section>

      <section className="tels-section tels-section--warm">
        <div className="tels-container">
          <div className="tels-split">
            <div>
              <div className="tels-eyebrow">{intl.formatMessage(messages.missionEyebrow)}</div>
              <h2 className="tels-h2">{intl.formatMessage(messages.missionTitle)}</h2>
              <p className="tels-muted">{intl.formatMessage(messages.missionBody)}</p>
            </div>
            <div className="tels-split__img tels-split__img--photo">
              <img src={MISSION_IMG} alt={intl.formatMessage(messages.missionImgAlt)} />
            </div>
          </div>
          <div className="tels-split tels-split--rev">
            <div className="tels-split__img tels-split__img--photo">
              <img src={STORY_IMG} alt={intl.formatMessage(messages.storyImgAlt)} />
            </div>
            <div>
              <div className="tels-eyebrow">{intl.formatMessage(messages.storyEyebrow)}</div>
              <h2 className="tels-h2">{intl.formatMessage(messages.storyTitle)}</h2>
              <p className="tels-muted">{intl.formatMessage(messages.storyBody)}</p>
              <a href="https://titaned.com/" target="_blank" rel="noreferrer" className="tels-link">{intl.formatMessage(messages.visitTitanEd)}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container">
          <h2 className="tels-h2 tels-about__text-center">{intl.formatMessage(messages.outcomesTitle)}</h2>
          <p className="tels-lead tels-about__lead-outcomes">{intl.formatMessage(messages.outcomesLead)}</p>
          <div className="tels-outcomes">
            {outcomes.map((v) => (
              <div key={v.title.id} className="tels-outcome">
                <span className="tels-outcome__icon"><FontAwesomeIcon icon={v.icon} /></span>
                <h3>{intl.formatMessage(v.title)}</h3>
                <p>{intl.formatMessage(v.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-h2 tels-about__text-center">{intl.formatMessage(messages.formatsTitle)}</h2>
          <p className="tels-lead tels-about__lead-formats">{intl.formatMessage(messages.formatsLead)}</p>
          <div className="tels-formats">
            {formats.map((f) => (
              <div key={f.title.id} className={`tels-format${f.featured ? ' tels-format--featured' : ''}`}>
                <span className="tels-format__icon"><FontAwesomeIcon icon={f.icon} /></span>
                <h3>{intl.formatMessage(f.title)}</h3>
                <p>{intl.formatMessage(f.body)}</p>
                <ul>
                  {f.items.map((it) => (
                    <li key={it.id}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      {' '}
                      {intl.formatMessage(it)}
                    </li>
                  ))}
                </ul>
                <Link
                  to={f.to}
                  className={`tels-btn ${f.featured ? 'tels-btn--primary' : 'tels-btn--outline'} tels-btn--sm`}
                >
                  {intl.formatMessage(f.cta)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container tels-faq">
          <h2 className="tels-h2 tels-about__text-center">{intl.formatMessage(messages.faqTitle)}</h2>
          <div className="tels-about__faq">
            {faq.map((f, i) => (
              <div key={f.q.id} className="tels-syllabus-item" {...(openFaq === i ? { open: true } : {})}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span>{intl.formatMessage(f.q)}</span>
                  <FontAwesomeIcon icon={openFaq === i ? faChevronUp : faChevronDown} />
                </button>
                {openFaq === i && <div className="body">{intl.formatMessage(f.a)}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default AboutPage;
