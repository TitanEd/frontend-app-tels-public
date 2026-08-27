import useDocumentTitle from '../../lib/useDocumentTitle';

/**
 * Shared dark-header + sticky-TOC + numbered-section layout used by all four
 * legal pages (Accessibility, Privacy Policy, Terms of Use, EEA Privacy
 * Disclosures) — matches tels-mirror's privacy-statement.tsx / terms-use.tsx
 * pattern.
 */
const LegalLayout = ({
  docTitle, title, intro, sections, lastUpdated, seeAlso,
}) => {
  useDocumentTitle(docTitle);

  return (
    <div>
      <div className="tels-legal-header">
        <div className="tels-container">
          <p className="tels-eyebrow">Legal</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </div>

      <div className="tels-container tels-legal-layout" style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>
        <aside>
          <p style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 700,
            color: 'var(--pgn-color-chrome-text-muted)',
            margin: '0 0 0.75rem',
          }}
          >
            On this page
          </p>
          <ul className="tels-toc">
            {sections.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
            ))}
          </ul>
        </aside>

        <article className="tels-legal">
          <p style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 700,
            color: 'var(--pgn-color-chrome-text-muted)',
            marginBottom: '2rem',
          }}
          >
            Last updated:
            {' '}
            {lastUpdated}
          </p>
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="tels-legal__block">
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <div className="tels-legal__note">
            {seeAlso}
          </div>
        </article>
      </div>
    </div>
  );
};

export default LegalLayout;
