import { Link, Navigate, useParams } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Calendar,
  CircleHelp,
  Clock,
  Gauge,
  GraduationCap,
  Landmark,
  Monitor,
  Signal,
  Tag,
  Wallet,
} from 'lucide-react';

import CourseCard from '../../components/CourseCard';
import EmailSignup from '../../components/EmailSignup';
import emailMessages from '../../components/email-signup-messages';
import { COURSES, SCHOOLS } from '../../data/telsCourses';
import taxonomyMessages, {
  formatDifficulty,
  formatModality,
  formatSubject,
  formatAvailability,
} from '../../i18n/taxonomyMessages';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './course-detail-messages';

const initials = (name) => name.split(' ').map((n) => n[0]).join('').slice(0, 2);

const Fact = ({ icon: Icon, label, children }) => (
  <div className="tels-course-fact">
    <div className="tels-course-fact__label">
      <Icon size={16} aria-hidden="true" />
      <span>{label}</span>
    </div>
    <div className="tels-course-fact__value">{children}</div>
  </div>
);

const EnrollButton = ({ title, href = '#enroll', className = 'tels-btn tels-btn--primary' }) => {
  const intl = useIntl();
  return (
    <a
      className={className}
      href={href}
      aria-label={intl.formatMessage(messages.enrollAria, { title })}
    >
      {intl.formatMessage(messages.enroll)}
    </a>
  );
};

const CourseDetailPage = () => {
  const intl = useIntl();
  const { slug } = useParams();
  const course = COURSES.find((c) => c.slug === slug);

  useDocumentTitle(
    course
      ? intl.formatMessage(messages.docTitle, { title: course.title })
      : intl.formatMessage(messages.docTitleFallback),
  );

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const school = SCHOOLS.find((s) => s.slug === course.schoolSlug);
  const related = COURSES.filter((c) => c.subject === course.subject && c.slug !== course.slug).slice(0, 3);
  const priceLabel = course.price === 0
    ? intl.formatMessage(taxonomyMessages.freeStar)
    : intl.formatNumber(course.price, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const certPrice = course.price === 0 ? null : priceLabel;

  return (
    <article className="tels-course-about">
      <div className="tels-container tels-course-about__layout">
        <div className="tels-course-about__hero-band" aria-hidden="true" />

        <header className="tels-course-hero">
          <h1>{course.title}</h1>
          <p className="tels-course-hero__teaser">{course.description}</p>
        </header>

        <div className="tels-course-extras">
          <div className="tels-course-extras__row">
            <div className="tels-course-extras__item">
              <Calendar size={16} aria-hidden="true" />
              <span className="sr-only">{intl.formatMessage(messages.duration)}</span>
              <span>{formatAvailability(intl, course.availability)}</span>
            </div>
            <div className="tels-course-extras__item tels-course-extras__item--price">
              <Wallet size={16} aria-hidden="true" />
              <span className="sr-only">{intl.formatMessage(messages.price)}</span>
              <span>{priceLabel}</span>
            </div>
            <div className="tels-course-extras__item">
              <GraduationCap size={16} aria-hidden="true" />
              <span className="sr-only">{intl.formatMessage(messages.modality)}</span>
              <span>{formatModality(intl, course.modality)}</span>
              <Link
                to="/contact"
                className="tels-course-extras__help"
                title={intl.formatMessage(messages.helpChoose)}
              >
                <CircleHelp size={16} aria-hidden="true" />
                <span className="sr-only">{intl.formatMessage(messages.helpChoose)}</span>
              </Link>
            </div>
          </div>
        </div>

        <aside className="tels-course-facts">
          <div className="tels-course-facts__media">
            <img src={course.image} alt="" />
          </div>
          <div className="tels-course-facts__list">
            <Fact icon={Clock} label={intl.formatMessage(messages.timeCommitment)}>{course.timeCommitment}</Fact>
            <Fact icon={Gauge} label={intl.formatMessage(messages.pace)}>{course.pace}</Fact>
            <Fact icon={GraduationCap} label={intl.formatMessage(messages.subject)}>
              <Link to={`/courses?subject=${encodeURIComponent(course.subject)}`}>
                {formatSubject(intl, course.subject)}
              </Link>
            </Fact>
            <Fact icon={Signal} label={intl.formatMessage(messages.difficulty)}>
              {formatDifficulty(intl, course.difficulty)}
            </Fact>
            <Fact icon={Landmark} label={intl.formatMessage(messages.credit)}>
              {intl.formatMessage(messages.auditFree)}
              {certPrice ? (
                <>
                  <br />
                  {intl.formatMessage(messages.verifiedCert, { price: certPrice })}
                </>
              ) : null}
            </Fact>
            <Fact icon={Monitor} label={intl.formatMessage(messages.platform)}>
              {intl.formatMessage(messages.platformValue)}
            </Fact>
            <Fact icon={Tag} label={intl.formatMessage(messages.topics)}>
              <div className="tels-topic-chips">
                {course.topics.map((t) => (
                  <Link key={t} to={`/courses?keywords=${encodeURIComponent(t)}`} className="tels-topic-chip">
                    {t}
                  </Link>
                ))}
              </div>
            </Fact>
          </div>
          {school && (
            <div className="tels-course-facts__schools">
              <p className="tels-course-facts__schools-label">
                {intl.formatMessage(messages.associatedSchools)}
              </p>
              <Link to={`/courses?school=${encodeURIComponent(school.slug)}`} className="tels-course-school">
                {school.logo ? <img src={school.logo} alt="" /> : null}
                <span>{school.name}</span>
              </Link>
            </div>
          )}
          <div className="tels-course-facts__enroll" id="enroll">
            <EnrollButton title={course.title} />
          </div>
        </aside>

        <div className="tels-course-about__primary">
          <div className="tels-course-body">
            <section>
              <h2 className="tels-detail-heading">{intl.formatMessage(messages.whatYoullLearn)}</h2>
              <ul className="tels-course-learn">
                {course.learn.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h2 className="tels-detail-heading">{intl.formatMessage(messages.courseDescription)}</h2>
              <p className="tels-course-body__copy">{course.longDescription}</p>
            </section>
          </div>
        </div>
      </div>

      <section className="tels-course-faculty">
        <div className="tels-container">
          <h2 className="tels-detail-heading">{intl.formatMessage(messages.instructors)}</h2>
          <div className="tels-course-faculty__grid">
            {course.instructors.map((instructor) => (
              <article key={instructor.name} className="tels-instructor-card">
                <div className="tels-instructor-card__avatar" aria-hidden="true">
                  {initials(instructor.name)}
                </div>
                <h3>{instructor.name}</h3>
                <p>{instructor.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="tels-course-about__more">
        {related.length > 0 && (
          <section className="tels-section tels-section--tight">
            <div className="tels-container">
              <h2 className="tels-section-header__title tels-course-related-title">
                {intl.formatMessage(messages.youMayAlsoLike)}
              </h2>
              <div className="tels-grid tels-grid--3">
                {related.map((item) => <CourseCard key={item.slug} course={item} />)}
              </div>
            </div>
          </section>
        )}

        <EmailSignup
          title={intl.formatMessage(emailMessages.joinListTitle)}
          subtitle={intl.formatMessage(emailMessages.joinListSubtitle)}
          submitLabel={intl.formatMessage(emailMessages.submit)}
          variant="light"
        />
      </div>
    </article>
  );
};

export default CourseDetailPage;
