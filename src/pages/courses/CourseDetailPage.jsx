import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faSignal,
  faBookOpen,
  faGlobe,
  faCertificate,
  faBolt,
  faRocket,
  faChevronDown,
  faChevronUp,
  faCheck,
  faTasks,
  faQuoteLeft,
  faQuestion,
  faUsers,
  faAward,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import CourseCard from '../../components/CourseCard';
import LoadingScreen from '../../components/LoadingScreen';
import { fetchCourse, fetchCourses } from '../../data/telsData';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './course-detail-messages';
import './CourseDetailPage.scss';

const CourseDetailPage = () => {
  const intl = useIntl();
  const { courseId = '' } = useParams();
  const { data: course, isLoading } = useQuery({ queryKey: ['course', courseId], queryFn: () => fetchCourse(courseId) });
  const { data: allCourses = [] } = useQuery({ queryKey: ['courses'], queryFn: fetchCourses });
  const [openIdx, setOpenIdx] = useState(0);
  useDocumentTitle(course
    ? intl.formatMessage(messages.pageTitle, { title: course.title })
    : intl.formatMessage(messages.pageTitleFallback));
  if (isLoading) {
    return <LoadingScreen variant="courseDetail" showLabel={false} />;
  }
  if (!course) {
    return <Navigate to="/courses" replace />;
  }
  const related = allCourses.filter((c) => c.subject === course.subject && c.id !== course.id).slice(0, 4);
  const subjectLower = course.subject.toLowerCase();
  const levelLower = course.level.toLowerCase();
  const benefits = [
    { icon: faBolt, title: messages.why1Title, body: messages.why1Body },
    { icon: faCertificate, title: messages.why2Title, body: messages.why2Body },
    { icon: faRocket, title: messages.why3Title, body: messages.why3Body },
  ];
  const testimonials = [
    {
      name: messages.testimonial1Name,
      role: messages.testimonial1Role,
      quote: intl.formatMessage(messages.testimonial1Quote, { subject: subjectLower }),
    },
    {
      name: messages.testimonial2Name,
      role: messages.testimonial2Role,
      quote: intl.formatMessage(messages.testimonial2Quote),
    },
    {
      name: messages.testimonial3Name,
      role: messages.testimonial3Role,
      quote: intl.formatMessage(messages.testimonial3Quote),
    },
  ];
  const faq = [
    {
      q: messages.faq1q,
      a: course.startDate === 'Self-paced'
        ? intl.formatMessage(messages.faq1aSelfPaced)
        : intl.formatMessage(messages.faq1aScheduled, { startDate: course.startDate }),
    },
    { q: messages.faq2q, a: intl.formatMessage(messages.faq2a, { duration: course.duration }) },
    { q: messages.faq3q, a: intl.formatMessage(messages.faq3a, { level: levelLower }) },
    { q: messages.faq4q, a: intl.formatMessage(messages.faq4a) },
    { q: messages.faq5q, a: intl.formatMessage(messages.faq5a) },
  ];
  return (
    <>
      <section className="tels-about-hero">
        <div className="tels-container">
          <div className="tels-breadcrumbs">
            <Link to="/">{intl.formatMessage(messages.breadcrumbHome)}</Link>
            {' '}
            <span>&rsaquo;</span>
            {' '}
            <Link to="/courses">{intl.formatMessage(messages.breadcrumbCourses)}</Link>
            {' '}
            <span>&rsaquo;</span>
            {' '}
            <span>{course.title}</span>
          </div>
          <div className="tels-about-grid">
            <div>
              <h1 className="tels-h1 tels-course-detail__title">{course.title}</h1>
              <p className="tels-lead">{course.shortDesc}</p>
              <div className="tels-metarow">
                <span>
                  <FontAwesomeIcon icon={faBookOpen} />
                  {' '}
                  {intl.formatMessage(messages.modulesCount, { count: course.modules.length })}
                </span>
                <span><FontAwesomeIcon icon={faClock} /> {course.duration}</span>
                <span><FontAwesomeIcon icon={faSignal} /> {course.level}</span>
                <span><FontAwesomeIcon icon={faGlobe} /> {course.language}</span>
              </div>
              <p className="tels-muted tels-course-detail__offered">
                {intl.formatMessage(messages.offeredBy)}
                {' '}
                <strong>{course.org}</strong>
                {' '}
                {intl.formatMessage(messages.startsOn, { startDate: course.startDate })}
              </p>
            </div>
            <aside className="tels-enrollcard">
              <div className="tels-enrollcard__img">
                <img src={course.image} alt={course.title} />
              </div>
              <h3 className="tels-enrollcard__title">{course.title}</h3>
              {!course.free && <div className="tels-enrollcard__price">{intl.formatMessage(messages.price)}</div>}
              <div className="tels-enrollcard__note">{course.free ? intl.formatMessage(messages.enrollNoteFree) : intl.formatMessage(messages.enrollNotePaid)}</div>
              <button type="button" className="tels-btn tels-btn--primary tels-course-detail__enroll-btn">{intl.formatMessage(messages.enrollNow)}</button>
              <ul className="tels-course-detail__perks">
                <li className="tels-course-detail__perk"><FontAwesomeIcon icon={faCheck} color="var(--pgn-color-success-base)" /> {intl.formatMessage(messages.perkSelfPaced)}</li>
                <li className="tels-course-detail__perk"><FontAwesomeIcon icon={faCheck} color="var(--pgn-color-success-base)" /> {intl.formatMessage(messages.perkMobile)}</li>
                <li><FontAwesomeIcon icon={faCheck} color="var(--pgn-color-success-base)" /> {intl.formatMessage(messages.perkCertificate)}</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.whyTitle)}</h2>
          <div className="tels-grid tels-grid--3 tels-course-detail__benefits">
            {benefits.map((b) => (
              <div key={b.title.id} className="tels-benefit">
                <span className="tels-benefit__icon"><FontAwesomeIcon icon={b.icon} /></span>
                <h3 className="tels-h3">{intl.formatMessage(b.title)}</h3>
                <p className="tels-muted tels-course-detail__benefit-body">{intl.formatMessage(b.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container tels-course-detail__two-col">
          <div>
            <h2 className="tels-h2">{intl.formatMessage(messages.aboutTitle)}</h2>
            <p className="tels-muted">{course.longDesc}</p>
            <p className="tels-muted">{intl.formatMessage(messages.aboutExtra)}</p>
          </div>
          <div>
            <h3 className="tels-h3">{intl.formatMessage(messages.learnTitle)}</h3>
            <ul className="tels-course-detail__list">
              <li>{intl.formatMessage(messages.learn1)}</li>
              <li>{intl.formatMessage(messages.learn2)}</li>
              <li>{intl.formatMessage(messages.learn3)}</li>
              <li>{intl.formatMessage(messages.learn4)}</li>
              <li>{intl.formatMessage(messages.learn5)}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.contentTitle)}</h2>
          {course.modules.map((m, i) => (
            <div key={m.title} className="tels-syllabus-item" {...(openIdx === i ? { open: true } : {})}>
              <button type="button" onClick={() => setOpenIdx(openIdx === i ? null : i)} aria-expanded={openIdx === i}>
                <span>
                  {intl.formatMessage(messages.moduleLabel, { moduleNumber: i + 1, moduleTitle: m.title })}
                </span>
                <FontAwesomeIcon icon={openIdx === i ? faChevronUp : faChevronDown} />
              </button>
              {openIdx === i && <div className="body">{m.description}</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container tels-course-detail__two-col">
          <div>
            <h2 className="tels-h2">{intl.formatMessage(messages.prerequisitesTitle)}</h2>
            <p className="tels-muted">
              {intl.formatMessage(messages.prerequisitesBody, { level: levelLower })}
            </p>
            <ul className="tels-course-detail__list tels-course-detail__list--loose">
              <li>{intl.formatMessage(messages.prereq1)}</li>
              <li>{intl.formatMessage(messages.prereq2)}</li>
              <li>{intl.formatMessage(messages.prereq3)}</li>
            </ul>
          </div>
          <div>
            <h2 className="tels-h2">{intl.formatMessage(messages.howTitle)}</h2>
            <ul className="tels-course-detail__list tels-course-detail__list--loose">
              <li><FontAwesomeIcon icon={faTasks} /> &nbsp;{intl.formatMessage(messages.how1)}</li>
              <li><FontAwesomeIcon icon={faBookOpen} /> &nbsp;{intl.formatMessage(messages.how2)}</li>
              <li><FontAwesomeIcon icon={faUsers} /> &nbsp;{intl.formatMessage(messages.how3)}</li>
              <li><FontAwesomeIcon icon={faAward} /> &nbsp;{intl.formatMessage(messages.how4)}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.instructorTitle)}</h2>
          <div className="tels-course-detail__instructor">
            <div className="tels-course-detail__instructor-avatar">
              <img src={`https://i.pravatar.cc/320?u=${course.id}`} alt={intl.formatMessage(messages.instructorAlt)} className="tels-course-detail__instructor-img" />
            </div>
            <div>
              <h3 className="tels-h3 tels-course-detail__instructor-name">{intl.formatMessage(messages.instructorName)}</h3>
              <p className="tels-muted tels-course-detail__instructor-role">
                {intl.formatMessage(messages.instructorRole, { org: course.org })}
              </p>
              <p className="tels-muted tels-course-detail__instructor-bio">
                {intl.formatMessage(messages.instructorBio, { subject: subjectLower })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--warm">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.testimonialsTitle)}</h2>
          <div className="tels-grid tels-grid--3 tels-course-detail__testimonials">
            {testimonials.map((t) => (
              <div key={t.name.id} className="tels-benefit">
                <FontAwesomeIcon icon={faQuoteLeft} className="tels-course-detail__quote-icon" />
                <p className="tels-muted tels-course-detail__quote-text">
                  &quot;
                  {t.quote}
                  &quot;
                </p>
                <div className="tels-course-detail__quote-name">{intl.formatMessage(t.name)}</div>
                <div className="tels-muted tels-course-detail__quote-role">{intl.formatMessage(t.role)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container tels-course-detail__two-col tels-course-detail__two-col--aligned">
          <div>
            <h2 className="tels-h2">{intl.formatMessage(messages.certificateTitle)}</h2>
            <p className="tels-muted">
              {intl.formatMessage(messages.certificateBody, { org: course.org })}
            </p>
            <ul className="tels-course-detail__list tels-course-detail__list--loose">
              <li>{intl.formatMessage(messages.certificateItem1)}</li>
              <li>{intl.formatMessage(messages.certificateItem2)}</li>
              <li>{intl.formatMessage(messages.certificateItem3)}</li>
            </ul>
          </div>
          <div className="tels-benefit tels-course-detail__cert-card">
            <FontAwesomeIcon icon={faCertificate} className="tels-course-detail__cert-icon" />
            <h3 className="tels-h3 tels-course-detail__cert-title">{intl.formatMessage(messages.certificateCardTitle)}</h3>
            <p className="tels-muted tels-course-detail__cert-course">{course.title}</p>
            <p className="tels-muted tels-course-detail__cert-issued">
              {intl.formatMessage(messages.issuedBy, { org: course.org })}
            </p>
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <h2 className="tels-h2">{intl.formatMessage(messages.faqTitle)}</h2>
          <div className="tels-course-detail__faq">
            {faq.map((f, i) => (
              <div key={f.q.id} className="tels-syllabus-item">
                <button type="button" onClick={() => setOpenIdx(openIdx === 100 + i ? null : 100 + i)} aria-expanded={openIdx === 100 + i}>
                  <span><FontAwesomeIcon icon={faQuestion} />&nbsp;&nbsp;{intl.formatMessage(f.q)}</span>
                  <FontAwesomeIcon icon={openIdx === 100 + i ? faChevronUp : faChevronDown} />
                </button>
                {openIdx === 100 + i && <div className="body">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--warm">
        <div className="tels-container tels-course-detail__two-col">
          <div>
            <h2 className="tels-h2">{intl.formatMessage(messages.whoTitle)}</h2>
            <div className="tels-benefit">
              <ul className="tels-course-detail__list--flush">
                <li>{intl.formatMessage(messages.who1)}</li>
                <li>{intl.formatMessage(messages.who2)}</li>
                <li>{intl.formatMessage(messages.who3)}</li>
                <li>{intl.formatMessage(messages.who4)}</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="tels-h2">{intl.formatMessage(messages.skillsTitle)}</h2>
            <div className="tels-pills tels-course-detail__skills">
              {course.skills.map((s) => <span key={s} className="tels-pill">{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-section-row__head">
            <h2 className="tels-h2 tels-course-detail__related-title">{intl.formatMessage(messages.relatedTitle)}</h2>
            <Link to="/courses" className="tels-link">{intl.formatMessage(messages.browseAll)} <FontAwesomeIcon icon={faArrowRight} /></Link>
          </div>
          <div className="tels-grid tels-grid--4 tels-course-detail__related-grid">
            {related.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>
      )}
    </>
  );
};
export default CourseDetailPage;
