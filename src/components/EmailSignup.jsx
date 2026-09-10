import { useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './email-signup-messages';

const EmailSignup = ({
  title,
  subtitle,
  submitLabel,
  variant,
}) => {
  const intl = useIntl();
  const [sent, setSent] = useState(false);

  const heading = title ?? intl.formatMessage(messages.title);
  const sub = subtitle ?? intl.formatMessage(messages.subtitle);
  const submit = submitLabel ?? intl.formatMessage(messages.submit);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section className={['tels-email-signup', variant === 'light' && 'tels-email-signup--light'].filter(Boolean).join(' ')}>
      <div className="tels-container">
        <h2 className="tels-email-signup__title">{heading}</h2>
        <p className="tels-email-signup__subtitle">{sub}</p>
        {sent ? (
          <p className="tels-email-signup__success">{intl.formatMessage(messages.success)}</p>
        ) : (
          <form className="tels-email-signup__form" onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              placeholder={intl.formatMessage(messages.emailPlaceholder)}
              required
              aria-label={intl.formatMessage(messages.emailAria)}
            />
            <button type="submit">{submit}</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSignup;
