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
import LoadingScreen from '../../components/LoadingScreen';
import { fetchCoursesList, fetchHomePromo } from '../../data/api';
import { displayApiError } from '../../lib/displayApiError';
import useDocumentTitle from '../../lib/useDocumentTitle';
import { CATALOG_LINKS, catalogHref } from '../../lib/catalogLinks';
// Bundled locally — no external image links. `.webp` needs the file-loader
// named explicitly inline: the shared webpack config's image rule only
// matches jpe?g|png|gif, not webp (verified with a standalone build); the
// project's own webpack.*-tutor.config.js overrides are gitignored/
// generated, not real editable config, so this is the durable fix.
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import solutionsBusinessImg from '!!file-loader!../../assets/home/collaborative-learning.webp';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import solutionsEducationImg from '!!file-loader!../../assets/home/classroom-education.webp';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import insight1Img from '!!file-loader!../../assets/home/insight-1.webp';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import insight2Img from '!!file-loader!../../assets/home/insight-2.webp';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import insight3Img from '!!file-loader!../../assets/home/insight-3.webp';
import messages from './messages';
import './HomePage.scss';

const SOLUTIONS_BUSINESS_IMG = solutionsBusinessImg;
const SOLUTIONS_EDUCATION_IMG = solutionsEducationImg;
const INSIGHT_IMAGES = [insight1Img, insight2Img, insight3Img];
const HomePage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.pageTitle));
  const {
    data: courses = [], isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['courses', 'home', 4],
    queryFn: () => fetchCoursesList({ pageSize: 4, pageIndex: 0 }),
  });
  const { data: promo } = useQuery({
    queryKey: ['homePromo'],
    queryFn: fetchHomePromo,
  });
  const featured = courses.slice(0, 4);
  const promoVideoSrc = promo?.videoUrl;
  const promoPoster = promo?.posterUrl;
  const [slide, setSlide] = useState(0);
  const heroSlides = [
    {
      eyebrow: messages.hero1Eyebrow,
      titleLead: messages.hero1TitleLead,
      titleAccent: messages.hero1TitleAccent,
      body: messages.hero1Body,
      cta: messages.hero1Cta,
      to: CATALOG_LINKS.all,
    },
    {
      eyebrow: messages.hero2Eyebrow,
      titleLead: messages.hero2TitleLead,
      titleAccent: messages.hero2TitleAccent,
      body: messages.hero2Body,
      cta: messages.hero2Cta,
      to: '/contact',
    },
    {
      eyebrow: messages.hero3Eyebrow,
      titleLead: messages.hero3TitleLead,
      titleAccent: messages.hero3TitleAccent,
      body: messages.hero3Body,
      cta: messages.hero3Cta,
      to: CATALOG_LINKS.certificatePrograms,
    },
  ];
  const categories = [
    {
      icon: faLaptopCode, title: messages.catAiTitle, body: messages.catAiBody, to: catalogHref({ subject: 'Technology', q: 'AI' }),
    },
    {
      icon: faChartLine, title: messages.catDataTitle, body: messages.catDataBody, to: catalogHref({ subject: 'Data' }),
    },
    {
      icon: faCloud, title: messages.catCloudTitle, body: messages.catCloudBody, to: catalogHref({ subject: 'Technology', q: 'Cloud' }),
    },
    {
      icon: faBriefcase, title: messages.catLeadTitle, body: messages.catLeadBody, to: catalogHref({ subject: 'Leadership' }),
    },
    {
      icon: faHeartbeat, title: messages.catHealthTitle, body: messages.catHealthBody, to: catalogHref({ subject: 'Health' }),
    },
    {
      icon: faShieldAlt, title: messages.catSecTitle, body: messages.catSecBody, to: catalogHref({ subject: 'Technology', skills: 'Security' }),
    },
    {
      icon: faLeaf, title: messages.catSusTitle, body: messages.catSusBody, to: catalogHref({ q: 'Sustainability' }),
    },
    {
      icon: faLightbulb, title: messages.catUxTitle, body: messages.catUxBody, to: catalogHref({ subject: 'Business', q: 'Product' }),
    },
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
                <Link to={current.to} className="tels-btn tels-btn--primary tels-btn--lg">
                  {intl.formatMessage(current.cta)} <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </div>
            <div className="tels-hero-light__dots" role="tablist" aria-label={intl.formatMessage(messages.heroSlidesAria)}>
              {heroSlides.map((_, i) => (<button key={heroSlides[i].titleLead.id} type="button" role="tab" aria-selected={i === slide} aria-label={intl.formatMessage(messages.goToSlide, { number: i + 1 })} className={`tels-hero-light__dot${i === slide ? ' is-active' : ''}`} onClick={() => setSlide(i)} />))}
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
                <Link to={CATALOG_LINKS.professionalCertificates} className="tels-evergreen__feature">
                  <span className="tels-evergreen__feature-icon"><FontAwesomeIcon icon={faCertificate} /></span>
                  <div>
                    <h4>{intl.formatMessage(messages.certTitle)}</h4>
                    <p>{intl.formatMessage(messages.certBody)}</p>
                  </div>
                </Link>
                <Link to={CATALOG_LINKS.learningPathways} className="tels-evergreen__feature">
                  <span className="tels-evergreen__feature-icon"><FontAwesomeIcon icon={faGraduationCap} /></span>
                  <div>
                    <h4>{intl.formatMessage(messages.pathwaysTitle)}</h4>
                    <p>{intl.formatMessage(messages.pathwaysBody)}</p>
                  </div>
                </Link>
                <div className="tels-evergreen__feature">
                  <span className="tels-evergreen__feature-icon"><FontAwesomeIcon icon={faBookOpen} /></span>
                  <div>
                    <h4>{intl.formatMessage(messages.openedxTitle)}</h4>
                    <p>{intl.formatMessage(messages.openedxBody)}</p>
                  </div>
                </div>
              </div>
              <Link to={CATALOG_LINKS.all} className="tels-btn tels-btn--primary tels-btn--lg tels-home__explore-btn">
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

      {(isLoading || featured.length > 0 || isError) && (
      <section className="tels-section tels-section--warm">
        <div className="tels-container">
          <div className="tels-section-row__head">
            <div>
              <div className="tels-eyebrow">{intl.formatMessage(messages.featuredEyebrow)}</div>
              <h2 className="tels-h2 tels-home__heading">{intl.formatMessage(messages.featuredTitle)}</h2>
            </div>
            {!isError && (
            <Link to="/courses" className="tels-link">
              {intl.formatMessage(messages.showAllCourses)} <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            )}
          </div>
          <div className="tels-home__featured-grid">
            {isLoading && <LoadingScreen variant="courses" count={4} cols={4} showLabel={false} />}
            {!isLoading && isError && (
              <div className="tels-empty">
                <h3 className="tels-h3">{intl.formatMessage(messages.featuredErrorTitle)}</h3>
                <p className="tels-muted">
                  {displayApiError(error, intl, messages.featuredErrorBody)}
                </p>
                <button type="button" className="tels-btn tels-btn--primary" onClick={() => refetch()}>
                  {intl.formatMessage(messages.featuredRetry)}
                </button>
              </div>
            )}
            {!isLoading && !isError && featured.length > 0 && (
              <div className="tels-grid tels-grid--4">
                {featured.map((c) => <CourseCard key={c.id} course={c} />)}
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Real promo video from the API only — no fake sample video, and the
          whole section is hidden when there's nothing real to show. */}
      {promo && (promo.videoUrl || promo.youtubeId) && (
      <section className="tels-promo-light">
        <div className="tels-container">
          {(promo.title || intl.formatMessage(messages.promoTitle)) && (
            <h2>{promo.title || intl.formatMessage(messages.promoTitle)}</h2>
          )}
          <div className="tels-promo-light__video">
            {promo.youtubeId ? (
              <iframe
                title={promo.title || intl.formatMessage(messages.promoTitle)}
                src={`https://www.youtube-nocookie.com/embed/${promo.youtubeId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video controls preload="metadata" poster={promoPoster || undefined} playsInline>
                {promoVideoSrc && <source src={promoVideoSrc} type="video/mp4" />}
              </video>
            )}
          </div>
        </div>
      </section>
      )}

      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-home__skills-intro">
            <div className="tels-eyebrow">{intl.formatMessage(messages.skillsEyebrow)}</div>
            <h2 className="tels-h2">{intl.formatMessage(messages.skillsTitle)}</h2>
            <p className="tels-lead tels-home__skills-lead">{intl.formatMessage(messages.skillsLead)}</p>
          </div>
          <div className="tels-categories">
            {categories.map((c) => (
              <Link key={c.title.id} to={c.to} className="tels-cat">
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
          </div>
          <div className="tels-grid tels-grid--3 tels-home__insights-grid">
            {insights.map((i, idx) => (
              <article key={i.title.id} className="tels-insight">
                <div className="tels-insight__img tels-insight__img--photo">
                  <img
                    src={INSIGHT_IMAGES[idx]}
                    alt=""
                    loading="lazy"
                    // If the external photo fails to load, hide the broken
                    // <img> rather than show a broken-image icon — the
                    // card's own gradient background (.tels-insight__img)
                    // already sits behind it as a visual fallback.
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className={`tels-insight__tag${i.accent ? ' tels-insight__tag--accent' : ''}`}>
                    {intl.formatMessage(i.tag)}
                  </span>
                </div>
                <h4>{intl.formatMessage(i.title)}</h4>
                <p>{intl.formatMessage(i.body)}</p>
              </article>
            ))}
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
