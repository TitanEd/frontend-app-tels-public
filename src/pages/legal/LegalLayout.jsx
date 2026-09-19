import useDocumentTitle from '../../lib/useDocumentTitle';

/**
 * Shared dark-header + sticky-TOC + numbered-section layout used by all four
 * legal pages (Accessibility, Privacy Policy, Terms of Use, EEA Privacy
 * Disclosures) — matches tels-mirror's privacy-statement.tsx / terms-use.tsx
 * pattern. `title`, `intro`, `lastUpdated`, and each section's `title`/`body`
 * must already be translated by the caller (message IDs live on each legal page).
 */
const LegalLayout = ({
  docTitle, title, intro, sections, lastUpdated, seeAlso,
}) => {
  useDocumentTitle(docTitle);

  return (
    <div className="tels-legal-page">
      <div className="tels-legal-header">
        <div className="tels-container">
          <h1>{title}</h1>
        </div>
      </div>

      <div className="tels-container tels-legal-layout">
        <article className="tels-legal">
          {intro ? <p className="tels-legal__intro">{intro}</p> : null}
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="tels-legal__block">
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          {(seeAlso || lastUpdated) && (
            <div className="tels-legal__note">
              {lastUpdated ? (
                <p className="tels-legal__updated">{lastUpdated}</p>
              ) : null}
              {seeAlso}
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default LegalLayout;
