import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faLaptopCode,
  faCertificate,
  faUsers,
  faBriefcase,
  faLightbulb,
  faHeartbeat,
  faChartLine,
  faBookOpen,
  faGraduationCap,
  faCheck,
  faLeaf,
  faCloud,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';
import CourseCard from '../../components/CourseCard';
import { CourseGridSkeleton } from '../../components/Skeletons';
import { fetchCourses, PARTNER_LOGOS } from '../../data/telsData';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './messages';
import './HomePage.scss';

const VIDEO_SRC = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const SOLUTIONS_BUSINESS_IMG = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=75';
const SOLUTIONS_EDUCATION_IMG = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=75';
const VIDEO_THUMB_IMG = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=75';
const INSIGHT_IMAGES = [
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=70',
];
const HomePage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.pageTitle));
  const { data: courses = [], isLoading } = useQuery({ queryKey: ['courses'], queryFn: fetchCourses });
  const featured = courses.slice(0, 4);
  const [slide, setSlide] = useState(0);
  const heroSlides = [
    {
      eyebrow: messages.hero1Eyebrow,
      titleLead: messages.hero1TitleLead,
      titleAccent: messages.hero1TitleAccent,
      body: messages.hero1Body,
      cta: messages.hero1Cta,
    },
    {
      eyebrow: messages.hero2Eyebrow,
      titleLead: messages.hero2TitleLead,
      titleAccent: messages.hero2TitleAccent,
      body: messages.hero2Body,
      cta: messages.hero2Cta,
    },
    {
      eyebrow: messages.hero3Eyebrow,
      titleLead: messages.hero3TitleLead,
      titleAccent: messages.hero3TitleAccent,
      body: messages.hero3Body,
      cta: messages.hero3Cta,
    },
  ];
  const categories = [
    { icon: faLaptopCode, title: messages.catAiTitle, body: messages.catAiBody },
    { icon: faChartLine, title: messages.catDataTitle, body: messages.catDataBody },
    { icon: faCloud, title: messages.catCloudTitle, body: messages.catCloudBody },
    { icon: faBriefcase, title: messages.catLeadTitle, body: messages.catLeadBody },
    { icon: faHeartbeat, title: messages.catHealthTitle, body: messages.catHealthBody },
    { icon: faShieldAlt, title: messages.catSecTitle, body: messages.catSecBody },
    { icon: faLeaf, title: messages.catSusTitle, body: messages.catSusBody },
    { icon: faLightbulb, title: messages.catUxTitle, body: messages.catUxBody },
  ];
  const insights = [
    {
      tag: messages.insight1Tag, accent: false, title: messages.insight1Title, body: messages.insight1Body,
    },
    {
      tag: messages.insight2Tag, accent: true, title: messages.insight2Title, body: messages.insight2Body,
    },
    {
      tag: messages.insight3Tag, accent: false, title: messages.insight3Title, body: messages.insight3Body,
    },
  ];
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, [heroSlides.length]);
  const current = heroSlides[slide];
  return (
    <>
      <section className="tels-hero-band">
        <div className="tels-hero--light">
          <div className="tels-container tels-hero-light__inner">
            <div className="tels-hero-light__slide" key={slide}>
              <div className="tels-eyebrow">{intl.formatMessage(current.eyebrow)}</div>
              <h1>
                {intl.formatMessage(current.titleLead)}
                {' '}
                <br />
                <span className="accent">{intl.formatMessage(current.titleAccent)}</span>
              </h1>
              <p className="lead">{intl.formatMessage(current.body)}</p>
              <div className="tels-hero__cta">
                <Link to="/courses" className="tels-btn tels-btn--primary tels-btn--lg">
                  {intl.formatMessage(current.cta)} <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </div>
            <div className="tels-hero-light__dots" role="tablist" aria-label={intl.formatMessage(messages.heroSlidesAria)}>
              {heroSlides.map((_, i) => (<button key={heroSlides[i].titleLead.id} type="button" role="tab" aria-selected={i === slide} aria-label={intl.formatMessage(messages.goToSlide, { number: i + 1 })} className={`tels-hero-light__dot${i === slide ? ' is-active' : ''}`} onClick={() => setSlide(i)} />))}
            </div>
          </div>
        </div>

        <div className="tels-trusted">
          <div className="tels-container">
            <p className="tels-trusted__label">{intl.formatMessage(messages.trustedBy)}</p>
            <div className="tels-trusted__row">
              {PARTNER_LOGOS.map((p) => <img key={p} src={p} alt={intl.formatMessage(messages.partnerAlt)} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container">
          <div className="tels-home__intro">
            <div className="tels-eyebrow">{intl.formatMessage(messages.solutionsEyebrow)}</div>
            <h2 className="tels-h2">{intl.formatMessage(messages.solutionsTitle)}</h2>
            <p className="tels-lead">{intl.formatMessage(messages.solutionsLead)}</p>
          </div>

          <div className="tels-alt">
            <div className="tels-alt__media" aria-hidden="true">
              <img src={SOLUTIONS_BUSINESS_IMG} alt="" loading="lazy" width={1200} height={750} />
            </div>
            <div className="tels-alt__card">
              <div className="tels-eyebrow">{intl.formatMessage(messages.forBusinessEyebrow)}</div>
              <h3>{intl.formatMessage(messages.forBusinessTitle)}</h3>
              <p>{intl.formatMessage(messages.forBusinessBody)}</p>
              <Link to="/contact" className="tels-link">
                {intl.formatMessage(messages.forBusinessCta)} <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>

          <div className="tels-alt tels-alt--rev">
            <div className="tels-alt__media" aria-hidden="true">
              <img src={SOLUTIONS_EDUCATION_IMG} alt="" loading="lazy" width={1200} height={750} />
            </div>
            <div className="tels-alt__card">
              <div className="tels-eyebrow">{intl.formatMessage(messages.forEducationEyebrow)}</div>
              <h3>{intl.formatMessage(messages.forEducationTitle)}</h3>
              <p>{intl.formatMessage(messages.forEducationBody)}</p>
              <Link to="/about" className="tels-link">
                {intl.formatMessage(messages.forEducationCta)} <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-evergreen">
            <div>
              <div className="tels-eyebrow">{intl.formatMessage(messages.curriculumEyebrow)}</div>
              <h2 className="tels-h2">{intl.formatMessage(messages.curriculumTitle)}</h2>
              <p className="tels-lead">{intl.formatMessage(messages.curriculumLead)}</p>
              <div className="tels-home__features">
                <div className="tels-evergreen__feature">
                  <span className="tels-evergreen__feature-icon"><FontAwesomeIcon icon={faCertificate} /></span>
                  <div>
                    <h4>{intl.formatMessage(messages.certTitle)}</h4>
                    <p>{intl.formatMessage(messages.certBody)}</p>
                  </div>
                </div>
                <div className="tels-evergreen__feature">
                  <span className="tels-evergreen__feature-icon"><FontAwesomeIcon icon={faGraduationCap} /></span>
                  <div>
                    <h4>{intl.formatMessage(messages.pathwaysTitle)}</h4>
                    <p>{intl.formatMessage(messages.pathwaysBody)}</p>
                  </div>
                </div>
                <div className="tels-evergreen__feature">
                  <span className="tels-evergreen__feature-icon"><FontAwesomeIcon icon={faBookOpen} /></span>
                  <div>
                    <h4>{intl.formatMessage(messages.openedxTitle)}</h4>
                    <p>{intl.formatMessage(messages.openedxBody)}</p>
                  </div>
                </div>
              </div>
              <Link to="/courses" className="tels-btn tels-btn--primary tels-btn--lg tels-home__explore-btn">
                {intl.formatMessage(messages.exploreAllCourses)}
              </Link>
            </div>
            <div className="tels-execed">
              <div className="tels-eyebrow">{intl.formatMessage(messages.execedEyebrow)}</div>
              <h3>{intl.formatMessage(messages.execedTitle)}</h3>
              <p>{intl.formatMessage(messages.execedBody)}</p>
              <ul>
                <li><FontAwesomeIcon icon={faCheck} /> {intl.formatMessage(messages.execedItem1)}</li>
                <li><FontAwesomeIcon icon={faCheck} /> {intl.formatMessage(messages.execedItem2)}</li>
                <li><FontAwesomeIcon icon={faCheck} /> {intl.formatMessage(messages.execedItem3)}</li>
                <li><FontAwesomeIcon icon={faCheck} /> {intl.formatMessage(messages.execedItem4)}</li>
              </ul>
              <Link to="/contact" className="tels-btn tels-btn--outline">{intl.formatMessage(messages.execedCta)}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--warm">
        <div className="tels-container">
          <div className="tels-section-row__head">
            <div>
              <div className="tels-eyebrow">{intl.formatMessage(messages.featuredEyebrow)}</div>
              <h2 className="tels-h2 tels-home__heading">{intl.formatMessage(messages.featuredTitle)}</h2>
            </div>
            <Link to="/courses" className="tels-link">
              {intl.formatMessage(messages.showAllCourses)} <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          <div className="tels-home__featured-grid">
            {isLoading ? <CourseGridSkeleton count={4} cols={4} /> : (<div className="tels-grid tels-grid--4">{featured.map((c) => <CourseCard key={c.id} course={c} />)}</div>)}
          </div>
        </div>
      </section>

      <section className="tels-promo-light">
        <div className="tels-container">
          <h2>{intl.formatMessage(messages.promoTitle)}</h2>
          <div className="tels-promo-light__video">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video controls preload="metadata" poster={VIDEO_THUMB_IMG} playsInline>
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-home__skills-intro">
            <div className="tels-eyebrow">{intl.formatMessage(messages.skillsEyebrow)}</div>
            <h2 className="tels-h2">{intl.formatMessage(messages.skillsTitle)}</h2>
            <p className="tels-lead tels-home__skills-lead">{intl.formatMessage(messages.skillsLead)}</p>
          </div>
          <div className="tels-categories">
            {categories.map((c) => (
              <Link key={c.title.id} to="/courses" className="tels-cat">
                <span className="tels-cat__icon"><FontAwesomeIcon icon={c.icon} /></span>
                <h4>{intl.formatMessage(c.title)}</h4>
                <p>{intl.formatMessage(c.body)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-section-row__head">
            <div>
              <div className="tels-eyebrow">{intl.formatMessage(messages.insightsEyebrow)}</div>
              <h2 className="tels-h2 tels-home__heading">{intl.formatMessage(messages.insightsTitle)}</h2>
            </div>
            <a href="#insights" className="tels-link">
              {intl.formatMessage(messages.allInsights)} <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
          <div className="tels-grid tels-grid--3 tels-home__insights-grid">
            {insights.map((i, idx) => (
              <a key={i.title.id} href="#insight" className="tels-insight">
                <div className="tels-insight__img tels-insight__img--photo">
                  <img src={INSIGHT_IMAGES[idx]} alt="" loading="lazy" />
                  <span className={`tels-insight__tag${i.accent ? ' tels-insight__tag--accent' : ''}`}>
                    {intl.formatMessage(i.tag)}
                  </span>
                </div>
                <h4>{intl.formatMessage(i.title)}</h4>
                <p>{intl.formatMessage(i.body)}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--warm">
        <div className="tels-container">
          <div className="tels-stats">
            <div><div className="n">20K+</div><div className="l">{intl.formatMessage(messages.statInitiatives)}</div></div>
            <div><div className="n">2M+</div><div className="l">{intl.formatMessage(messages.statLearners)}</div></div>
            <div><div className="n">120+</div><div className="l">{intl.formatMessage(messages.statPartners)}</div></div>
            <div><div className="n">40+</div><div className="l">{intl.formatMessage(messages.statCountries)}</div></div>
          </div>
        </div>
      </section>

      <section className="tels-cta-band tels-cta-band--light">
        <div className="tels-container">
          <div className="tels-cta-band__inner">
            <div>
              <h2>{intl.formatMessage(messages.ctaTitle)}</h2>
              <p>{intl.formatMessage(messages.ctaBody)}</p>
            </div>
            <div className="tels-cta-band__actions">
              <Link to="/contact" className="tels-btn tels-btn--primary tels-btn--lg">
                {intl.formatMessage(messages.talkToSales)}
              </Link>
              <Link to="/courses" className="tels-btn tels-btn--outline tels-btn--lg">
                {intl.formatMessage(messages.exploreCourses)} <FontAwesomeIcon icon={faUsers} className="tels-home__cta-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;
