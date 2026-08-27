import { Link } from 'react-router-dom';

import LegalLayout from './LegalLayout';

const SECTIONS = [
  { id: 'scope', title: '1. Scope of this Statement', body: 'TODO: Describe which TELS properties (website, catalog, course platform, marketing emails) this statement covers and who the data controller is.' },
  { id: 'collect', title: '2. Information We Collect', body: 'TODO: Account details, enrollment activity, payment metadata, device/usage data, cookies, and any information collected from third-party sign-in providers.' },
  { id: 'use', title: '3. How We Use Information', body: 'TODO: Delivering courses, personalizing recommendations, processing payments, sending service messages, improving the platform, and complying with legal obligations.' },
  { id: 'legal-basis', title: '4. Legal Bases for Processing', body: 'TODO: Where GDPR, UK GDPR, or similar frameworks apply, list the legal bases (contract, consent, legitimate interests, legal obligation).' },
  { id: 'share', title: '5. When We Share Information', body: 'TODO: Categories of recipients — hosting providers, payment processors, analytics, partner institutions issuing certificates — and safeguards used.' },
  { id: 'cookies', title: '6. Cookies and Similar Technologies', body: 'TODO: Describe cookie categories in use (strictly necessary, analytics, marketing), how to manage consent, and any cookie-management UI you provide.' },
  { id: 'retention', title: '7. Data Retention', body: 'TODO: Retention periods per data category and the criteria used to determine them.' },
  { id: 'rights', title: '8. Your Rights', body: 'TODO: Access, correction, deletion, portability, objection, restriction, and how to withdraw consent. Include the process for exercising each right.' },
  { id: 'children', title: "9. Children's Privacy", body: 'TODO: Minimum age of use and how information from minors is handled if the platform is opened to them.' },
  { id: 'transfers', title: '10. International Transfers', body: "TODO: Cross-border transfer mechanisms (standard contractual clauses, adequacy decisions) between the learner's country and TitanEd's operating regions." },
  { id: 'security', title: '11. Security', body: 'TODO: Summary of the organizational and technical measures TELS uses to protect information, plus a note that no system is perfectly secure.' },
  { id: 'changes', title: '12. Changes to this Statement', body: 'TODO: How updates will be communicated and how the effective date is tracked.' },
  { id: 'contact', title: '13. Contact', body: 'For privacy questions, contact us via titaned.com.' },
];

const PrivacyPage = () => (
  <LegalLayout
    docTitle="Privacy Policy — TELS by TitanEd"
    title="Privacy Policy"
    intro={`Placeholder privacy statement for TELS by TitanEd. This page ships with drafting notes
      only — replace each section with counsel-approved language before publishing.`}
    sections={SECTIONS}
    lastUpdated="TODO"
    seeAlso={<>See also our <Link to="/terms" className="tels-link">Terms of Use</Link>.</>}
  />
);

export default PrivacyPage;
