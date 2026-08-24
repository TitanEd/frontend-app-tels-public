import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown, faChevronUp, faBookOpen, faCertificate, faCheckCircle, faGraduationCap, faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { PARTNER_LOGOS } from '../../data/telsData';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './messages';
import './AboutPage.scss';

const MISSION_IMG = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=70';
const STORY_IMG = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=70';
const AboutPage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.pageTitle));
  const [openFaq, setOpenFaq] = useState(0);
  const instructors = [
    {
      name: 'Dr. Anita Rao', title: messages.instructor1Title, bio: messages.instructor1Bio, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=70',
    },
    {
      name: 'Marcus Bennett', title: messages.instructor2Title, bio: messages.instructor2Bio, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=70',
    },
    {
      name: 'Priya Sharma', title: messages.instructor3Title, bio: messages.instructor3Bio, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=70',
    },
    {
      name: "James O'Connor", title: messages.instructor4Title, bio: messages.instructor4Bio, image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=70',
    },
    {
      name: 'Sofia Alvarez', title: messages.instructor5Title, bio: messages.instructor5Bio, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=70',
    },
    {
      name: 'David Chen', title: messages.instructor6Title, bio: messages.instructor6Bio, image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=400&q=70',
    },
    {
      name: 'Dr. Fatima Hassan', title: messages.instructor7Title, bio: messages.instructor7Bio, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=70',
    },
    {
      name: 'Liam Nguyen', title: messages.instructor8Title, bio: messages.instructor8Bio, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=70',
    },
  ];
  const outcomes = [
    { icon: faCheckCircle, title: messages.outcome1Title, body: messages.outcome1Body },
    { icon: faGraduationCap, title: messages.outcome2Title, body: messages.outcome2Body },
    { icon: faChartLine, title: messages.outcome3Title, body: messages.outcome3Body },
  ];
  const testimonials = [
    { quote: messages.testimonial1Quote, who: messages.testimonial1Who },
    { quote: messages.testimonial2Quote, who: messages.testimonial2Who },
    { quote: messages.testimonial3Quote, who: messages.testimonial3Who },
  ];
  const formats = [
    {
      icon: faBookOpen,
      title: messages.format1Title,
      body: messages.format1Body,
      items: [messages.format1Item1, messages.format1Item2, messages.format1Item3],
      cta: messages.format1Cta,
      featured: false,
    },
    {
      icon: faCertificate,
      title: messages.format2Title,
      body: messages.format2Body,
      items: [messages.format2Item1, messages.format2Item2, messages.format2Item3],
      cta: messages.format2Cta,
      featured: true,
    },
    {
      icon: faChartLine,
      title: messages.format3Title,
      body: messages.format3Body,
      items: [messages.format3Item1, messages.format3Item2, messages.format3Item3],
      cta: messages.format3Cta,
      featured: false,
    },
    {
      icon: faGraduationCap,
      title: messages.format4Title,
      body: messages.format4Body,
      items: [messages.format4Item1, messages.format4Item2, messages.format4Item3],
      cta: messages.format4Cta,
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

      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-h2 tels-about__text-center">{intl.formatMessage(messages.partnersTitle)}</h2>
          <p className="tels-lead tels-about__lead-partners">{intl.formatMessage(messages.partnersLead)}</p>
          <div className="tels-partners">
            {PARTNER_LOGOS.map((p) => <img key={p} src={p} alt={intl.formatMessage(messages.partnerAlt)} />)}
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

      <section className="tels-section tels-section--warm">
        <div className="tels-container">
          <div className="tels-eyebrow tels-about__text-center">{intl.formatMessage(messages.facultyEyebrow)}</div>
          <h2 className="tels-h2 tels-about__text-center">{intl.formatMessage(messages.facultyTitle)}</h2>
          <p className="tels-lead tels-about__lead-faculty">{intl.formatMessage(messages.facultyLead)}</p>
          <div className="tels-instructors">
            {instructors.map((p) => (
              <div key={p.name} className="tels-instructor">
                <div className="tels-instructor__img">
                  <img src={p.image} alt={p.name} />
                </div>
                <h3>{p.name}</h3>
                <p className="tels-instructor__title">{intl.formatMessage(p.title)}</p>
                <p className="tels-instructor__bio">{intl.formatMessage(p.bio)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-h2 tels-about__text-center">{intl.formatMessage(messages.statsTitle)}</h2>
          <div className="tels-stats tels-about__stats">
            <div><div className="n">20K+</div><div className="l">{intl.formatMessage(messages.stat1Label)}</div></div>
            <div><div className="n">2M+</div><div className="l">{intl.formatMessage(messages.stat2Label)}</div></div>
            <div><div className="n">120+</div><div className="l">{intl.formatMessage(messages.stat3Label)}</div></div>
            <div><div className="n">40+</div><div className="l">{intl.formatMessage(messages.stat4Label)}</div></div>
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container">
          <h2 className="tels-h2 tels-about__text-center">{intl.formatMessage(messages.testimonialsTitle)}</h2>
          <div className="tels-grid tels-grid--3 tels-about__testimonials">
            {testimonials.map((t) => (
              <div key={t.who.id} className="tels-benefit">
                <p className="tels-about__quote">
                  &ldquo;
                  {intl.formatMessage(t.quote)}
                  &rdquo;
                </p>
                <p className="tels-muted tels-about__quote-who">
                  —
                  {' '}
                  {intl.formatMessage(t.who)}
                </p>
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
                  to="/courses"
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
