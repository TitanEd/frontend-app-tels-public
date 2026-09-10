import { useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Mail, MapPin, Globe, Linkedin,
} from 'lucide-react';

import useDocumentTitle from '../../lib/useDocumentTitle';
import messages from './messages';

const Field = ({ label, children }) => (
  <div className="tels-field">
    <label>{label}</label>
    {children}
  </div>
);

const ContactPage = () => {
  const intl = useIntl();
  useDocumentTitle(intl.formatMessage(messages.docTitle));
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <div className="tels-page-header">
        <div className="tels-container">
          <h1>{intl.formatMessage(messages.heading)}</h1>
          <p style={{ marginTop: '0.5rem', maxWidth: '40rem', color: 'var(--pgn-color-text-secondary)' }}>
            {intl.formatMessage(messages.intro)}
          </p>
        </div>
      </div>

      <div className="tels-container tels-contact-grid" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <form onSubmit={onSubmit} style={{ maxWidth: '36rem' }}>
          <Field label={intl.formatMessage(messages.name)}>
            <input required type="text" name="name" />
          </Field>
          <Field label={intl.formatMessage(messages.email)}>
            <input required type="email" name="email" />
          </Field>
          <Field label={intl.formatMessage(messages.message)}>
            <textarea required name="message" rows={6} />
          </Field>
          <button type="submit" className="tels-btn tels-btn--primary">
            {intl.formatMessage(messages.send)}
          </button>
          {sent && (
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--pgn-color-green)' }}>
              {intl.formatMessage(messages.thanks)}
            </p>
          )}
        </form>

        <aside className="tels-contact-aside">
          <h3>{intl.formatMessage(messages.reachUs)}</h3>
          <p className="tels-contact-row">
            <Mail size={14} />
            Legal@TitanEd.com
          </p>
          <p className="tels-contact-row">
            <MapPin size={14} />
            Gurugram, Haryana, India
          </p>
          <p className="tels-contact-row">
            <Globe size={14} />
            <a className="tels-link" href="https://titaned.com/" target="_blank" rel="noreferrer">titaned.com</a>
          </p>
          <p className="tels-contact-row">
            <Linkedin size={14} />
            <a className="tels-link" href="https://www.linkedin.com/company/titaned" target="_blank" rel="noreferrer">LinkedIn</a>
          </p>
        </aside>
      </div>
    </div>
  );
};

export default ContactPage;
