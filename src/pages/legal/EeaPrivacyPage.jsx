import { Link } from 'react-router-dom';

import LegalLayout from './LegalLayout';

// New page (not present in the tels-mirror reference design — added per the
// real pll.harvard.edu site's "Footer Links" group). Placeholder drafting
// notes in the same house style as Privacy Policy / Terms of Use, scoped to
// disclosures specific to learners in the European Economic Area, UK, and
// Switzerland.
const SECTIONS = [
  { id: 'scope', title: '1. Who this Applies To', body: 'TODO: State that this page supplements the general Privacy Policy with disclosures required for individuals in the EEA, UK, and Switzerland under GDPR / UK GDPR.' },
  { id: 'controller', title: '2. Data Controller and Representative', body: 'TODO: Name the data controller for EEA/UK data, and, if applicable, the EU/UK representative and their contact details.' },
  { id: 'legal-basis', title: '3. Legal Bases for Processing', body: 'TODO: List the specific legal bases relied on for each processing activity — contract performance, legitimate interests, consent, and legal obligation.' },
  { id: 'categories', title: '4. Categories of Personal Data', body: 'TODO: Summarize the categories of personal data processed about EEA/UK learners and the source of each category.' },
  { id: 'transfers', title: '5. International Data Transfers', body: 'TODO: Describe the transfer mechanism used when EEA/UK personal data is processed outside the EEA/UK (e.g. Standard Contractual Clauses, adequacy decisions) and how to request a copy of the safeguards.' },
  { id: 'retention', title: '6. Retention', body: 'TODO: Retention periods applicable to EEA/UK learner data and the criteria used to determine them.' },
  { id: 'rights', title: '7. Your Rights under GDPR / UK GDPR', body: 'TODO: Detail the rights of access, rectification, erasure, restriction, portability, and objection, including automated decision-making, and how to exercise each.' },
  { id: 'complaints', title: '8. Right to Lodge a Complaint', body: 'TODO: Note the right to lodge a complaint with a supervisory authority in the learner’s EEA/UK member state of residence, work, or the place of the alleged infringement.' },
  { id: 'dpo', title: '9. Data Protection Contact', body: 'TODO: Provide contact details for the Data Protection Officer or privacy contact handling EEA/UK requests.' },
  { id: 'changes', title: '10. Changes to these Disclosures', body: 'TODO: How updates to this page will be communicated and how the effective date is tracked.' },
  { id: 'contact', title: '11. Contact', body: 'For EEA/UK privacy questions, contact us via titaned.com.' },
];

const EeaPrivacyPage = () => (
  <LegalLayout
    docTitle="EEA Privacy Disclosures — TELS by TitanEd"
    title="EEA Privacy Disclosures"
    intro={`Placeholder EEA/UK privacy disclosures for TELS by TitanEd. This page ships with
      drafting notes only — replace each section with counsel-approved language before publishing.`}
    sections={SECTIONS}
    lastUpdated="TODO"
    seeAlso={<>See also our general <Link to="/privacy" className="tels-link">Privacy Policy</Link>.</>}
  />
);

export default EeaPrivacyPage;
