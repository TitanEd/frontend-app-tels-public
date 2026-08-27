import { Link } from 'react-router-dom';

import LegalLayout from './LegalLayout';

// New page (not present in the tels-mirror reference design — added per the
// real pll.harvard.edu site's "Footer Links" group). Placeholder drafting
// notes in the same house style as Privacy Policy / Terms of Use.
const SECTIONS = [
  { id: 'commitment', title: '1. Our Commitment', body: 'TODO: State TELS/TitanEd’s commitment to digital accessibility for learners using assistive technology, and the standard targeted (e.g. WCAG 2.1 AA).' },
  { id: 'standards', title: '2. Standards We Follow', body: 'TODO: Reference the accessibility standards and guidelines the platform is designed against, and any conformance evaluation (e.g. VPAT) available on request.' },
  { id: 'features', title: '3. Accessibility Features', body: 'TODO: Describe supported features — keyboard navigation, screen-reader support, captioned video, adjustable text size/contrast, and alt text on course imagery.' },
  { id: 'course-content', title: '4. Course Content Accessibility', body: 'TODO: Describe expectations for instructors/partner schools around accessible course materials (transcripts, captions, document structure) and how exceptions are handled.' },
  { id: 'third-party', title: '5. Third-Party Tools', body: 'TODO: Note that some embedded or linked third-party tools may not be fully within TELS’s control, and how known limitations are documented.' },
  { id: 'assistive-tech', title: '6. Compatibility with Assistive Technology', body: 'TODO: List the browsers/assistive technology combinations the platform is tested against.' },
  { id: 'known-issues', title: '7. Known Issues', body: 'TODO: Summarize any known accessibility issues currently being addressed, with an approximate remediation timeline.' },
  { id: 'feedback', title: '8. Feedback and Assistance', body: 'TODO: Explain how a learner who encounters a barrier can request accessible course materials or report an issue, and the expected response time.' },
  { id: 'training', title: '9. Ongoing Training', body: 'TODO: Note any internal training or review process TitanEd staff/partner schools follow to maintain accessibility over time.' },
  { id: 'changes', title: '10. Changes to this Statement', body: 'TODO: How updates to this accessibility statement will be communicated and how the effective date is tracked.' },
  { id: 'contact', title: '11. Contact', body: 'For accessibility questions or to request accommodations, contact us via titaned.com.' },
];

const AccessibilityPage = () => (
  <LegalLayout
    docTitle="Accessibility — TELS by TitanEd"
    title="Accessibility"
    intro={`Placeholder accessibility statement for TELS by TitanEd. This page ships with
      drafting notes only — replace each section with counsel-approved language before publishing.`}
    sections={SECTIONS}
    lastUpdated="TODO"
    seeAlso={<>See also our <Link to="/privacy" className="tels-link">Privacy Policy</Link> and <Link to="/terms" className="tels-link">Terms of Use</Link>.</>}
  />
);

export default AccessibilityPage;
