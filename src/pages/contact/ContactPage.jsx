import { useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Mail, MapPin, Globe, Linkedin,
} from 'lucide-react';

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

const ContactPage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.docTitle));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [pending, setPending] = useState(false);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = intl.formatMessage(messages.nameRequired);
    if (!email.trim()) {
      next.email = intl.formatMessage(messages.emailRequired);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = intl.formatMessage(messages.emailInvalid);
    }
    if (!message.trim()) next.message = intl.formatMessage(messages.messageRequired);
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('');
    setFormMessage('');
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setPending(true);
    const result = await submitContact(
      { name: name.trim(), email: email.trim(), message: message.trim() },
      {
        thanks: intl.formatMessage(messages.thanks),
        error: intl.formatMessage(messages.error),
      },
    );
    setPending(false);

    if (result.ok) {
      setFormStatus('success');
      setFormMessage(result.message || intl.formatMessage(messages.thanks));
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setFormStatus('error');
      setFormMessage(
        result.notFound
          ? (result.message || intl.formatMessage(messages.notFound))
          : (result.message || intl.formatMessage(messages.error)),
      );
    }
  };

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
          <Field
            id="tels-contact-name"
            label={intl.formatMessage(messages.name)}
            error={errors.name}
          >
            <input
              id="tels-contact-name"
              required
              type="text"
              name="name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'tels-contact-name-error' : undefined}
              disabled={pending}
            />
          </Field>
          <Field
            id="tels-contact-email"
            label={intl.formatMessage(messages.email)}
            error={errors.email}
          >
            <input
              id="tels-contact-email"
              required
              type="email"
              name="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'tels-contact-email-error' : undefined}
              disabled={pending}
            />
          </Field>
          <Field
            id="tels-contact-message"
            label={intl.formatMessage(messages.message)}
            error={errors.message}
          >
            <textarea
              id="tels-contact-message"
              required
              name="message"
              rows={6}
              value={message}
              onChange={(ev) => setMessage(ev.target.value)}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'tels-contact-message-error' : undefined}
              disabled={pending}
            />
          </Field>
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
          <p className="tels-contact-row">
            <Mail size={14} aria-hidden="true" />
            <a className="tels-link" href={`mailto:${intl.formatMessage(messages.emailAddress)}`}>
              {intl.formatMessage(messages.emailAddress)}
            </a>
          </p>
          <p className="tels-contact-row">
            <MapPin size={14} aria-hidden="true" />
            {intl.formatMessage(messages.address)}
          </p>
          <p className="tels-contact-row">
            <Globe size={14} aria-hidden="true" />
            <a className="tels-link" href="https://titaned.com/" target="_blank" rel="noreferrer">
              {intl.formatMessage(messages.websiteLabel)}
            </a>
          </p>
          <p className="tels-contact-row">
            <Linkedin size={14} aria-hidden="true" />
            <a className="tels-link" href="https://www.linkedin.com/company/titaned" target="_blank" rel="noreferrer">
              {intl.formatMessage(messages.linkedinLabel)}
            </a>
          </p>
        </aside>
      </div>
    </div>
  );
};

export default ContactPage;
