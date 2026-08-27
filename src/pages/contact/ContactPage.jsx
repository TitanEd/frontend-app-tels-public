import { useState } from 'react';
import {
  Mail, MapPin, Globe, Linkedin,
} from 'lucide-react';

import useDocumentTitle from '../../lib/useDocumentTitle';

const Field = ({ label, children }) => (
  <div className="tels-field">
    <label>{label}</label>
    {children}
  </div>
);

const ContactPage = () => {
  useDocumentTitle('Contact — TELS by TitanEd');
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <div className="tels-page-header">
        <div className="tels-container">
          <h1>Contact</h1>
          <p style={{ marginTop: '0.5rem', maxWidth: '40rem', color: 'var(--pgn-color-text-secondary)' }}>
            Questions about a course, partnership, or your account? Send us a note.
          </p>
        </div>
      </div>

      <div className="tels-container tels-contact-grid" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <form onSubmit={onSubmit} style={{ maxWidth: '36rem' }}>
          <Field label="Name">
            <input required type="text" name="name" />
          </Field>
          <Field label="Email">
            <input required type="email" name="email" />
          </Field>
          <Field label="Message">
            <textarea required name="message" rows={6} />
          </Field>
          <button type="submit" className="tels-btn tels-btn--primary">Send message</button>
          {sent && (
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--pgn-color-green)' }}>
              Thanks — we&rsquo;ll be in touch.
            </p>
          )}
        </form>

        <aside className="tels-contact-aside">
          <h3>Reach us</h3>
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
