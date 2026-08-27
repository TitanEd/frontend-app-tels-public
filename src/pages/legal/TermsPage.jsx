import { Link } from 'react-router-dom';

import LegalLayout from './LegalLayout';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of these Terms', body: 'TODO: Describe how using the TELS website and courses constitutes acceptance of these terms, and how updates to the terms will be communicated.' },
  { id: 'eligibility', title: '2. Eligibility and Accounts', body: 'TODO: Age requirements, accurate registration information, responsibility for account credentials, and grounds for suspension.' },
  { id: 'content', title: '3. Course Content and Licenses', body: 'TODO: Ownership of course materials, the limited personal-use license granted to learners, and what is prohibited (redistribution, scraping, resale, etc.).' },
  { id: 'conduct', title: '4. Acceptable Use', body: 'TODO: Rules for participation in discussions, prohibitions on harassment, cheating, and any activity that disrupts the platform.' },
  { id: 'payments', title: '5. Payments, Refunds, and Cancellations', body: 'TODO: Pricing, taxes, billing cadence, refund windows, and cancellation procedures. Reference any regional consumer-protection requirements.' },
  { id: 'third-party', title: '6. Third-Party Services', body: 'TODO: How third-party integrations (payment processors, video hosts, analytics providers) are governed by their own terms.' },
  { id: 'ip', title: '7. Intellectual Property', body: 'TODO: TitanEd trademarks, learner-generated content licenses, and DMCA / copyright-complaint contact details.' },
  { id: 'disclaimers', title: '8. Disclaimers', body: 'TODO: "As-is" nature of the service, no warranty of continued availability, no guarantee of specific learning outcomes or employment results.' },
  { id: 'liability', title: '9. Limitation of Liability', body: 'TODO: Cap on damages and exclusions permitted by applicable law.' },
  { id: 'termination', title: '10. Termination', body: 'TODO: When TELS may suspend or terminate access, and what happens to purchased content after termination.' },
  { id: 'law', title: '11. Governing Law and Disputes', body: 'TODO: Choice of law, venue, and any arbitration or dispute-resolution requirements.' },
  { id: 'changes', title: '12. Changes to these Terms', body: 'TODO: How and when TELS may amend these terms, and how continued use signals acceptance.' },
  { id: 'contact', title: '13. Contact', body: 'For questions about these terms, contact us via titaned.com.' },
];

const TermsPage = () => (
  <LegalLayout
    docTitle="Terms of Use — TELS by TitanEd"
    title="Terms of Use"
    intro={`Placeholder terms for TELS by TitanEd. This page ships with drafting notes only —
      replace each section with counsel-approved language before publishing.`}
    sections={SECTIONS}
    lastUpdated="TODO"
    seeAlso={<>See also our <Link to="/privacy" className="tels-link">Privacy Policy</Link>.</>}
  />
);

export default TermsPage;
