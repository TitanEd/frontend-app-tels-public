import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faGlobe,
  faMapMarkerAlt,
  faClock,
  faChevronDown,
  faChevronUp,
  faHeadset,
  faHandshake,
  faUniversity,
  faLifeRing,
  faNewspaper,
  faUserTie,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn, faFacebookF, faTwitter, faYoutube, faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { submitContact } from '../../data/api';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './messages';
import './ContactPage.scss';

const ContactPage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.pageTitle));
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});
    setSent(false);
    const form = e.target;
    const formData = new FormData(form);
    setSubmitting(true);
    try {
      const result = await submitContact({
        name: formData.get('name'),
        email: formData.get('email'),
        org: formData.get('org'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        consent: formData.get('consent') === 'on',
        sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/public/contact',
      });
      if (!result?.ok) {
        setFormError(result?.message || intl.formatMessage(messages.formError));
        return;
      }
      setSent(true);
      form.reset();
    } catch (error) {
      setSent(false);
      if (error?.code === 'VALIDATION_ERROR') {
        setFieldErrors(error.fields || {});
        setFormError(error.message || intl.formatMessage(messages.formError));
      } else {
        setFormError(error?.message || intl.formatMessage(messages.formError));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const reasons = [
    {
      icon: faHeadset,
      title: messages.reason1Title,
      body: messages.reason1Body,
    },
    {
      icon: faHandshake,
      title: messages.reason2Title,
      body: messages.reason2Body,
    },
    {
      icon: faUniversity,
      title: messages.reason3Title,
      body: messages.reason3Body,
    },
    {
      icon: faNewspaper,
      title: messages.reason4Title,
      body: messages.reason4Body,
    },
  ];
  const offices = [
    {
      city: messages.office1City,
      country: messages.office1Country,
      address: messages.office1Address,
      role: messages.office1Role,
    },
    {
      city: messages.office2City,
      country: messages.office2Country,
      address: messages.office2Address,
      role: messages.office2Role,
    },
  ];
  const faq = [
    { q: messages.faq1q, a: messages.faq1a },
    { q: messages.faq2q, a: messages.faq2a },
    { q: messages.faq3q, a: messages.faq3a },
    { q: messages.faq4q, a: messages.faq4a },
    { q: messages.faq5q, a: messages.faq5a },
  ];
  const social = [
    { icon: faLinkedinIn, href: 'https://www.linkedin.com/company/titaned', label: messages.socialLinkedIn },
    { icon: faFacebookF, href: null, label: messages.socialFacebook },
    { icon: faTwitter, href: null, label: messages.socialX },
    { icon: faYoutube, href: null, label: messages.socialYouTube },
    { icon: faInstagram, href: null, label: messages.socialInstagram },
  ];

  const firstFieldError = (name) => {
    const msgs = fieldErrors?.[name];
    return Array.isArray(msgs) && msgs.length ? msgs[0] : null;
  };

  return (
    <>
      <section className="tels-courses-hero tels-courses-hero--text-only">
        <div className="tels-container">
          <div className="tels-breadcrumbs">
            <Link to="/">{intl.formatMessage(messages.breadcrumbHome)}</Link>
            {' '}
            <span>&rsaquo;</span>
            {' '}
            <span>{intl.formatMessage(messages.breadcrumbContact)}</span>
          </div>
          <div className="tels-courses-hero__text">
            <div className="tels-eyebrow">{intl.formatMessage(messages.heroEyebrow)}</div>
            <h1 className="tels-h1">
              {intl.formatMessage(messages.heroTitleLead)}
              {' '}
              <span className="tels-contact__accent">{intl.formatMessage(messages.heroTitleAccent)}</span>
            </h1>
            <p className="tels-lead">{intl.formatMessage(messages.heroLead)}</p>
            <div className="tels-courses-hero__accent" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-contact">
            <div>
              <div className="tels-eyebrow">{intl.formatMessage(messages.reachEyebrow)}</div>
              <h2 className="tels-h2">{intl.formatMessage(messages.reachTitle)}</h2>
              <p className="tels-muted">{intl.formatMessage(messages.reachBody)}</p>

              <ul className="tels-contact-list">
                <li>
                  <span className="tels-outcome__icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                  <div>
                    <strong>{intl.formatMessage(messages.labelEmail)}</strong>
                    <a href="mailto:Legal@TitanEd.com">Legal@TitanEd.com</a>
                  </div>
                </li>
                <li>
                  <span className="tels-outcome__icon"><FontAwesomeIcon icon={faGlobe} /></span>
                  <div>
                    <strong>{intl.formatMessage(messages.labelWebsite)}</strong>
                    <a href="https://titaned.com/" target="_blank" rel="noreferrer">titaned.com</a>
                  </div>
                </li>
                <li>
                  <span className="tels-outcome__icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                  <div>
                    <strong>{intl.formatMessage(messages.labelGlobalHq)}</strong>
                    <span>{intl.formatMessage(messages.hqAddress)}</span>
                  </div>
                </li>
                <li>
                  <span className="tels-outcome__icon"><FontAwesomeIcon icon={faClock} /></span>
                  <div>
                    <strong>{intl.formatMessage(messages.labelHours)}</strong>
                    <span>{intl.formatMessage(messages.hoursValue)}</span>
                  </div>
                </li>
              </ul>

              <div className="tels-contact__social">
                <h4 className="tels-contact__social-heading">
                  {intl.formatMessage(messages.followTitanEd)}
                </h4>
                <div className="tels-contact__social-row">
                  {social.map((s) => (
                    s.href ? (
                      <a key={s.label.id} href={s.href} target="_blank" rel="noreferrer" aria-label={intl.formatMessage(s.label)} className="tels-contact__social-link">
                        <FontAwesomeIcon icon={s.icon} />
                      </a>
                    ) : (
                      <span key={s.label.id} aria-label={intl.formatMessage(s.label)} className="tels-contact__social-link tels-contact__social-link--static" title={intl.formatMessage(s.label)}>
                        <FontAwesomeIcon icon={s.icon} />
                      </span>
                    )
                  ))}
                </div>
              </div>
            </div>

            <form
              id="form"
              className="tels-form"
              onSubmit={handleSubmit}
            >
              <div className="tels-eyebrow">{intl.formatMessage(messages.formEyebrow)}</div>
              <h3 className="tels-h3 tels-contact__form-title">{intl.formatMessage(messages.formTitle)}</h3>
              {sent && !formError && (
              <div className="tels-alert">
                <FontAwesomeIcon icon={faCheckCircle} />
                  &nbsp;{intl.formatMessage(messages.formSuccess)}
              </div>
              )}
              {formError && (
              <div className="tels-alert tels-alert--error" role="alert">
                {formError}
              </div>
              )}
              <div className="row">
                <div className="field">
                  <label htmlFor="contact-name">{intl.formatMessage(messages.fieldName)}</label>
                  <input required id="contact-name" name="name" placeholder={intl.formatMessage(messages.fieldNamePlaceholder)} />
                  {firstFieldError('name') && <span className="tels-field-error">{firstFieldError('name')}</span>}
                </div>
                <div className="field">
                  <label htmlFor="contact-email">{intl.formatMessage(messages.fieldEmail)}</label>
                  <input required id="contact-email" type="email" name="email" placeholder={intl.formatMessage(messages.fieldEmailPlaceholder)} />
                  {firstFieldError('email') && <span className="tels-field-error">{firstFieldError('email')}</span>}
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label htmlFor="contact-org">{intl.formatMessage(messages.fieldOrg)}</label>
                  <input id="contact-org" name="org" placeholder={intl.formatMessage(messages.fieldOrgPlaceholder)} />
                </div>
                <div className="field">
                  <label htmlFor="contact-subject">{intl.formatMessage(messages.fieldSubject)}</label>
                  <select id="contact-subject" name="subject" required defaultValue="">
                    <option value="" disabled>{intl.formatMessage(messages.subjectChoose)}</option>
                    <option>{intl.formatMessage(messages.subjectGeneral)}</option>
                    <option>{intl.formatMessage(messages.subjectLearner)}</option>
                    <option>{intl.formatMessage(messages.subjectPartnership)}</option>
                    <option>{intl.formatMessage(messages.subjectDemo)}</option>
                    <option>{intl.formatMessage(messages.subjectMedia)}</option>
                  </select>
                  {firstFieldError('subject') && <span className="tels-field-error">{firstFieldError('subject')}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="contact-message">{intl.formatMessage(messages.fieldMessage)}</label>
                <textarea id="contact-message" name="message" rows={6} required placeholder={intl.formatMessage(messages.fieldMessagePlaceholder)} />
                {firstFieldError('message') && <span className="tels-field-error">{firstFieldError('message')}</span>}
              </div>
              <div className="field consent">
                <input id="consent" name="consent" type="checkbox" required className="tels-contact__consent-input" />
                <label htmlFor="consent" className="tels-contact__consent-label">
                  {intl.formatMessage(messages.consentPrefix)}
                  <Link to="/privacy">{intl.formatMessage(messages.consentPrivacy)}</Link>
                  {intl.formatMessage(messages.consentSuffix)}
                </label>
                {firstFieldError('consent') && <span className="tels-field-error">{firstFieldError('consent')}</span>}
              </div>
              <button type="submit" className="tels-btn tels-btn--primary tels-btn--lg" disabled={submitting}>
                {submitting ? intl.formatMessage(messages.formSubmitting) : intl.formatMessage(messages.submit)}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container">
          <div className="tels-eyebrow tels-contact__text-center">{intl.formatMessage(messages.reasonsEyebrow)}</div>
          <h2 className="tels-h2 tels-contact__text-center">{intl.formatMessage(messages.reasonsTitle)}</h2>
          <p className="tels-lead tels-contact__lead-centered">{intl.formatMessage(messages.reasonsLead)}</p>
          <div className="tels-outcomes">
            {reasons.map((r) => (
              <div key={r.title.id} className="tels-outcome">
                <span className="tels-outcome__icon"><FontAwesomeIcon icon={r.icon} /></span>
                <h3>{intl.formatMessage(r.title)}</h3>
                <p>{intl.formatMessage(r.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-eyebrow tels-contact__text-center">{intl.formatMessage(messages.officesEyebrow)}</div>
          <h2 className="tels-h2 tels-contact__text-center">{intl.formatMessage(messages.officesTitle)}</h2>
          <p className="tels-lead tels-contact__lead-centered">{intl.formatMessage(messages.officesLead)}</p>
          <div className="tels-grid tels-grid--2">
            {offices.map((o) => (
              <div key={o.city.id} className="tels-benefit">
                <div className="tels-eyebrow">{intl.formatMessage(o.role)}</div>
                <h3 className="tels-h3">
                  {intl.formatMessage(o.city)}
                  ,
                  {' '}
                  {intl.formatMessage(o.country)}
                </h3>
                <p className="tels-muted tels-contact__office-address">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {' '}
                  {intl.formatMessage(o.address)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--warm">
        <div className="tels-container">
          <div className="tels-eyebrow tels-contact__text-center">{intl.formatMessage(messages.commitmentsEyebrow)}</div>
          <h2 className="tels-h2 tels-contact__text-center">{intl.formatMessage(messages.commitmentsTitle)}</h2>
          <div className="tels-outcomes tels-contact__commitments">
            <div className="tels-outcome">
              <span className="tels-outcome__icon"><FontAwesomeIcon icon={faClock} /></span>
              <h3>{intl.formatMessage(messages.commitment1Title)}</h3>
              <p>{intl.formatMessage(messages.commitment1Body)}</p>
            </div>
            <div className="tels-outcome">
              <span className="tels-outcome__icon"><FontAwesomeIcon icon={faUserTie} /></span>
              <h3>{intl.formatMessage(messages.commitment2Title)}</h3>
              <p>{intl.formatMessage(messages.commitment2Body)}</p>
            </div>
            <div className="tels-outcome">
              <span className="tels-outcome__icon"><FontAwesomeIcon icon={faLifeRing} /></span>
              <h3>{intl.formatMessage(messages.commitment3Title)}</h3>
              <p>{intl.formatMessage(messages.commitment3Body)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tels-section">
        <div className="tels-container">
          <div className="tels-split">
            <div>
              <div className="tels-eyebrow">{intl.formatMessage(messages.beforeEyebrow)}</div>
              <h2 className="tels-h2">{intl.formatMessage(messages.beforeTitle)}</h2>
              <p className="tels-muted">{intl.formatMessage(messages.beforeBody)}</p>
              <ul className="tels-contact-list tels-contact-list--plain">
                <li>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  &nbsp;{intl.formatMessage(messages.beforeTip1)}
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  &nbsp;{intl.formatMessage(messages.beforeTip2)}
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  &nbsp;{intl.formatMessage(messages.beforeTip3)}
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  &nbsp;{intl.formatMessage(messages.beforeTip4)}
                </li>
              </ul>
              <Link to="/courses" className="tels-btn tels-btn--outline">{intl.formatMessage(messages.browseCourses)}</Link>
            </div>
            <div>
              <div className="tels-benefit">
                <div className="tels-eyebrow">{intl.formatMessage(messages.popularEyebrow)}</div>
                <h3 className="tels-h3">{intl.formatMessage(messages.popularTitle)}</h3>
                <p className="tels-muted">{intl.formatMessage(messages.popularBody)}</p>
                <div className="tels-contact__popular-actions">
                  <Link to="/courses" className="tels-btn tels-btn--primary tels-btn--sm">{intl.formatMessage(messages.exploreCourses)}</Link>
                  <Link to="/about" className="tels-btn tels-btn--outline tels-btn--sm">{intl.formatMessage(messages.aboutTels)}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tels-section tels-section--subtle">
        <div className="tels-container tels-faq">
          <div className="tels-eyebrow tels-contact__text-center">{intl.formatMessage(messages.faqEyebrow)}</div>
          <h2 className="tels-h2 tels-contact__text-center">{intl.formatMessage(messages.faqTitle)}</h2>
          <div className="tels-contact__faq">
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
export default ContactPage;
