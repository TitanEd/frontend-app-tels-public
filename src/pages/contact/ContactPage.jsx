import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Mail, MapPin } from 'lucide-react';

import SocialLinks from '../../components/SocialLinks';
import { useFooterConfig } from '../../data/api/footerConfig';
import { submitContact } from '../../lib/api';
import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './messages';

const Field = ({
  id, label, error, children,
}) => (
  <div className="tels-field">
    <label htmlFor={id}>{label}</label>
    {children}
    {error ? (
      <p className="tels-field-error" id={`${id}-error`} role="alert">{error}</p>
    ) : null}
  </div>
);

const SUBJECT_OPTIONS = ['subjectGeneral', 'subjectCourses', 'subjectPartnership', 'subjectSupport'];

/**
 * Contact page: the form posts to the shared contact API (control-panel, POST /api/v1/contact-us/),
 * the "Reach us" column shows the address, email and social links saved on the theme configuration
 * page (footer settings), so both templates and the footer share one source.
 */
const ContactPage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.docTitle));
  const footer = useFooterConfig();

  const [form, setForm] = useState({
    name: '', email: '', org: '', subject: '', message: '', consent: false,
  });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [pending, setPending] = useState(false);

  const set = (field) => (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) { next.name = intl.formatMessage(messages.nameRequired); }
    if (!form.email.trim()) {
      next.email = intl.formatMessage(messages.emailRequired);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = intl.formatMessage(messages.emailInvalid);
    }
    if (!form.subject) { next.subject = intl.formatMessage(messages.subjectRequired); }
    if (!form.message.trim()) { next.message = intl.formatMessage(messages.messageRequired); }
    if (!form.consent) { next.consent = intl.formatMessage(messages.consentRequired); }
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('');
    setFormMessage('');
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { return; }

    setPending(true);
    const result = await submitContact(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        org: form.org.trim(),
        subject: form.subject,
        message: form.message.trim(),
        consent: form.consent,
      },
      { thanks: intl.formatMessage(messages.thanks), error: intl.formatMessage(messages.error) },
    );
    setPending(false);

    if (result.ok) {
      setFormStatus('success');
      setFormMessage(result.message || intl.formatMessage(messages.thanks));
      setForm({
        name: '', email: '', org: '', subject: '', message: '', consent: false,
      });
      return;
    }
    // Field errors from the API ({field: [messages]}) land under the matching inputs.
    const apiFields = result.fields || {};
    const fieldErrors = Object.fromEntries(
      Object.entries(apiFields).map(([field, list]) => [field, Array.isArray(list) ? list.join(' ') : String(list)]),
    );
    setErrors(fieldErrors);
    setFormStatus('error');
    setFormMessage(result.message || intl.formatMessage(messages.error));
  };

  const describedBy = (id) => (errors[id] ? `tels-contact-${id}-error` : undefined);
  const subjectLabel = (key) => intl.formatMessage(messages[key]);

  return (
    <div>
      <div className="tels-page-header">
        <div className="tels-container">
          <h1>{intl.formatMessage(messages.heading)}</h1>
          <p className="tels-page-header__intro">
            {intl.formatMessage(messages.intro)}
          </p>
        </div>
      </div>

      <div className="tels-container tels-contact-grid tels-page-body">
        <form onSubmit={onSubmit} className="tels-contact-form" noValidate>
          <Field id="tels-contact-name" label={intl.formatMessage(messages.name)} error={errors.name}>
            <input
              id="tels-contact-name"
              required
              type="text"
              name="name"
              value={form.name}
              onChange={set('name')}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={describedBy('name')}
              disabled={pending}
            />
          </Field>
          <Field id="tels-contact-email" label={intl.formatMessage(messages.email)} error={errors.email}>
            <input
              id="tels-contact-email"
              required
              type="email"
              name="email"
              value={form.email}
              onChange={set('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={describedBy('email')}
              disabled={pending}
            />
          </Field>
          <Field id="tels-contact-org" label={intl.formatMessage(messages.org)} error={errors.org}>
            <input
              id="tels-contact-org"
              type="text"
              name="org"
              value={form.org}
              onChange={set('org')}
              disabled={pending}
            />
          </Field>
          <Field id="tels-contact-subject" label={intl.formatMessage(messages.subject)} error={errors.subject}>
            <select
              id="tels-contact-subject"
              required
              name="subject"
              value={form.subject}
              onChange={set('subject')}
              aria-invalid={errors.subject ? 'true' : 'false'}
              aria-describedby={describedBy('subject')}
              disabled={pending}
            >
              <option value="">{intl.formatMessage(messages.subjectPlaceholder)}</option>
              {SUBJECT_OPTIONS.map((key) => (
                <option key={key} value={subjectLabel(key)}>{subjectLabel(key)}</option>
              ))}
            </select>
          </Field>
          <Field id="tels-contact-message" label={intl.formatMessage(messages.message)} error={errors.message}>
            <textarea
              id="tels-contact-message"
              required
              name="message"
              rows={6}
              value={form.message}
              onChange={set('message')}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={describedBy('message')}
              disabled={pending}
            />
          </Field>
          <div className={`tels-field tels-field--checkbox${errors.consent ? ' is-invalid' : ''}`}>
            <label htmlFor="tels-contact-consent">
              <input
                id="tels-contact-consent"
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={set('consent')}
                aria-invalid={errors.consent ? 'true' : 'false'}
                aria-describedby={describedBy('consent')}
                disabled={pending}
              />
              <span>
                {intl.formatMessage(messages.consent, {
                  privacyLink: <Link to="/privacy">{intl.formatMessage(messages.consentPrivacy)}</Link>,
                })}
              </span>
            </label>
            {errors.consent ? (
              <p className="tels-field-error" id="tels-contact-consent-error" role="alert">{errors.consent}</p>
            ) : null}
          </div>
          <button type="submit" className="tels-btn tels-btn--primary" disabled={pending}>
            {pending ? intl.formatMessage(messages.sending) : intl.formatMessage(messages.send)}
          </button>
          {formStatus === 'success' && formMessage ? (
            <p className="tels-form-banner tels-form-banner--success" role="status">{formMessage}</p>
          ) : null}
          {formStatus === 'error' && formMessage ? (
            <p className="tels-form-banner tels-form-banner--error" role="alert">{formMessage}</p>
          ) : null}
        </form>

        <aside className="tels-contact-aside">
          <h3>{intl.formatMessage(messages.reachUs)}</h3>
          {footer.contactEmail && (
            <p className="tels-contact-row">
              <Mail size={14} aria-hidden="true" />
              <a className="tels-link" href={`mailto:${footer.contactEmail}`}>{footer.contactEmail}</a>
            </p>
          )}
          {footer.addressLines.length > 0 && (
            <p className="tels-contact-row tels-contact-row--address">
              <MapPin size={14} aria-hidden="true" />
              <span>
                {footer.addressLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 && <br />}
                    {line}
                  </span>
                ))}
              </span>
            </p>
          )}
          {footer.socialLinks.length > 0 && (
            <>
              <h3>{intl.formatMessage(messages.followUs)}</h3>
              <SocialLinks links={footer.socialLinks} className="tels-social" label={intl.formatMessage(messages.followUs)} />
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ContactPage;
