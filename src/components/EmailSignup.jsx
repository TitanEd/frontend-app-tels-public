import { useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { submitNewsletter } from '../lib/api';
import messages from './email-signup-messages';

const EmailSignup = ({
  title,
  subtitle,
  submitLabel,
  variant,
}) => {
  const intl = useIntl();
  const [email, setEmail] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState(''); // success | error | ''
  const [pending, setPending] = useState(false);

  const heading = title ?? intl.formatMessage(messages.title);
  const sub = subtitle ?? intl.formatMessage(messages.subtitle);
  const submit = submitLabel ?? intl.formatMessage(messages.submit);

  const validate = (value) => {
    const trimmed = String(value || '').trim();
    if (!trimmed) {
      return intl.formatMessage(messages.emailRequired);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return intl.formatMessage(messages.emailInvalid);
    }
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormMessage('');
    setFormStatus('');
    const err = validate(email);
    if (err) {
      setFieldError(err);
      return;
    }
    setFieldError('');
    setPending(true);
    const result = await submitNewsletter(email.trim(), {
      success: intl.formatMessage(messages.success),
      error: intl.formatMessage(messages.error),
    });
    setPending(false);
    if (result.ok) {
      setFormStatus('success');
      setFormMessage(result.message || intl.formatMessage(messages.success));
      setEmail('');
    } else {
      setFormStatus('error');
      setFormMessage(result.message || intl.formatMessage(messages.error));
      if (result.notFound) {
        setFormMessage(result.message || intl.formatMessage(messages.notFound));
      }
    }
  };

  const errorId = 'tels-email-signup-error';
  const formMsgId = 'tels-email-signup-form-msg';

  return (
    <section className={['tels-email-signup', variant === 'light' && 'tels-email-signup--light'].filter(Boolean).join(' ')}>
      <div className="tels-container">
        <h2 className="tels-email-signup__title">{heading}</h2>
        <p className="tels-email-signup__subtitle">{sub}</p>
        {formStatus === 'success' ? (
          <p className="tels-email-signup__success" id={formMsgId} role="status">
            {formMessage}
          </p>
        ) : (
          <form className="tels-email-signup__form" onSubmit={onSubmit} noValidate>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(ev) => {
                setEmail(ev.target.value);
                if (fieldError) setFieldError('');
              }}
              placeholder={intl.formatMessage(messages.emailPlaceholder)}
              required
              aria-label={intl.formatMessage(messages.emailAria)}
              aria-invalid={fieldError ? 'true' : 'false'}
              aria-describedby={fieldError ? errorId : undefined}
              disabled={pending}
            />
            {fieldError ? (
              <p className="tels-field-error" id={errorId} role="alert">{fieldError}</p>
            ) : null}
            {formStatus === 'error' && formMessage ? (
              <p className="tels-form-banner tels-form-banner--error" id={formMsgId} role="alert">
                {formMessage}
              </p>
            ) : null}
            <button type="submit" className="tels-btn tels-btn--primary" disabled={pending}>
              {pending ? intl.formatMessage(messages.submitting) : submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSignup;
