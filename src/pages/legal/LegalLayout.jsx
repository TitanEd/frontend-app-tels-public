import useDocumentTitle from '../../lib/useDocumentTitle';

/**
 * Layout shared by the legal pages (Privacy Policy, Terms of Use, Accessibility, EEA
 * Privacy Disclosures): the same page header band and body container as the contact page,
 * then the numbered sections. `title`, `intro`, `lastUpdated` and each section's
 * `title`/`body` arrive translated (message ids live on each legal page).
 */
const LegalLayout = ({
  docTitle, title, intro, sections, lastUpdated, seeAlso,
}) => {
  useDocumentTitle(docTitle);
  return (
    <div className="tels-legal-page">
      <div className="tels-page-header">
        <div className="tels-container">
          <h1>{title}</h1>
          {intro ? <p className="tels-page-header__intro">{intro}</p> : null}
        </div>
      </div>
      <div className="tels-container tels-page-body tels-legal-layout">
        <article className="tels-legal">
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
