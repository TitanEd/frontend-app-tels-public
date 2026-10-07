import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  docTitle: {
    id: 'tels.course.docTitle',
    defaultMessage: '{title} — TELS by TitanEd',
    description: 'Course about page document title',
  },
  docTitleFallback: {
    id: 'tels.course.docTitle.fallback',
    defaultMessage: 'Course — TELS by TitanEd',
    description: 'Course about page title when course is missing',
  },
  enroll: {
    id: 'tels.course.enroll',
    defaultMessage: 'Enroll',
    description: 'Course about primary CTA label',
  },
  enrollAria: {
    id: 'tels.course.enrollAria',
    defaultMessage: 'Enroll in {title}',
    description: 'Course about CTA aria-label',
  },
  duration: {
    id: 'tels.course.extras.duration',
    defaultMessage: 'Duration',
    description: 'Course extras screen-reader label',
  },
  durationLong: {
    id: 'tels.course.fact.durationLong',
    defaultMessage: '{duration} long',
    description: 'Course facts duration value, e.g. “8 weeks long”',
  },
  registrationDeadline: {
    id: 'tels.course.extras.registrationDeadline',
    defaultMessage: 'Registration Deadline',
    description: 'Course extras screen-reader label (PLL registration field)',
  },
  price: {
    id: 'tels.course.extras.price',
    defaultMessage: 'Price',
    description: 'Course extras screen-reader label',
  },
  modality: {
    id: 'tels.course.extras.modality',
    defaultMessage: 'Modality',
    description: 'Course extras screen-reader label',
  },
  helpChoose: {
    id: 'tels.course.extras.helpChoose',
    defaultMessage: 'Help me choose',
    description: 'Course extras help link',
  },
  timeCommitment: {
    id: 'tels.course.fact.timeCommitment',
    defaultMessage: 'Time Commitment',
    description: 'Course facts card label',
  },
  pace: {
    id: 'tels.course.fact.pace',
    defaultMessage: 'Pace',
    description: 'Course facts card label',
  },
  subject: {
    id: 'tels.course.fact.subject',
    defaultMessage: 'Subject',
    description: 'Course facts card label',
  },
  difficulty: {
    id: 'tels.course.fact.difficulty',
    defaultMessage: 'Difficulty',
    description: 'Course facts card label',
  },
  credit: {
    id: 'tels.course.fact.credit',
    defaultMessage: 'Credit',
    description: 'Course facts card label',
  },
  auditFree: {
    id: 'tels.course.fact.auditFree',
    defaultMessage: 'Audit for Free',
    description: 'Course facts credit value',
  },
  verifiedCert: {
    id: 'tels.course.fact.verifiedCert',
    defaultMessage: 'Add a Verified Certificate for {price}',
    description: 'Course facts verified certificate line',
  },
  platform: {
    id: 'tels.course.fact.platform',
    defaultMessage: 'Platform',
    description: 'Course facts card label',
  },
  platformValue: {
    id: 'tels.course.fact.platformValue',
    defaultMessage: 'TELS / Open edX',
    description: 'Course facts platform value',
  },
  topics: {
    id: 'tels.course.fact.topics',
    defaultMessage: 'Topics',
    description: 'Course facts card label',
  },
  associatedSchools: {
    id: 'tels.course.fact.associatedSchools',
    defaultMessage: 'Associated Schools',
    description: 'Course facts schools heading',
  },
  whatYoullLearn: {
    id: 'tels.course.whatYoullLearn',
    defaultMessage: 'What you’ll learn',
    description: 'Course body section heading',
  },
  courseDescription: {
    id: 'tels.course.courseDescription',
    defaultMessage: 'Course description',
    description: 'Course body section heading',
  },
  enrollNow: {
    id: 'tels.course.enrollNow',
    defaultMessage: 'Enroll now.',
    description: 'Course enroll banner',
  },
  schoolLogoAlt: {
    id: 'tels.course.schoolLogoAlt',
    defaultMessage: '{name} logo',
    description: 'Alt text for associated school logo',
  },
  youMayAlsoLike: {
    id: 'tels.course.youMayAlsoLike',
    defaultMessage: 'You may also like',
    description: 'Related courses heading',
  },
  instructors: {
    id: 'tels.course.instructors',
    defaultMessage: 'Instructors',
    description: 'Course about instructors section heading',
  },
  courseImageAlt: {
    id: 'tels.course.imageAlt',
    defaultMessage: '{title}',
    description: 'Course about hero/facts image alt text',
  },
  loading: { id: 'tels.course.loading', defaultMessage: 'Loading course…', description: 'Course detail loading state' },
  notFound: {
    id: 'tels.course.notFound',
    defaultMessage: 'This course is not available.',
    description: 'Course detail: unknown or hidden course',
  },
  backToCatalog: { id: 'tels.course.backToCatalog', defaultMessage: 'Browse all courses', description: 'Link back to the catalog' },
  goToCourse: { id: 'tels.course.goToCourse', defaultMessage: 'Go to course', description: 'Button for an enrolled learner' },
  enrolling: { id: 'tels.course.enrolling', defaultMessage: 'Enrolling…', description: 'Enrol button while the request runs' },
  enrollmentClosed: {
    id: 'tels.course.enrollmentClosed',
    defaultMessage: 'Enrollment is not open for this course.',
    description: 'Shown instead of the enrol button when enrolment is not allowed',
  },
  invitationOnly: {
    id: 'tels.course.invitationOnly',
    defaultMessage: 'Enrollment in this course is by invitation only.',
    description: 'Invitation-only course message',
  },
  courseFull: { id: 'tels.course.courseFull', defaultMessage: 'This course is full.', description: 'Full course message' },
  enrollFailed: {
    id: 'tels.course.enrollFailed',
    defaultMessage: 'Enrollment failed: {message}',
    description: 'Enrol error message with the API reason',
  },
  enrollFailedGeneric: {
    id: 'tels.course.enrollFailedGeneric',
    defaultMessage: 'Enrollment failed. Please try again.',
    description: 'Enrol error message without a reason',
  },
  signInToEnroll: {
    id: 'tels.course.signInToEnroll',
    defaultMessage: 'Sign in to enroll',
    description: 'Enrol button label for anonymous visitors',
  },
  curriculum: { id: 'tels.course.curriculum', defaultMessage: 'Course content', description: 'Course outline heading' },
  module: { id: 'tels.course.module', defaultMessage: 'Module {number}: {title}', description: 'Course outline item' },
  faq: { id: 'tels.course.faq', defaultMessage: 'Frequently asked questions', description: 'FAQ heading' },
  language: { id: 'tels.course.language', defaultMessage: 'Language', description: 'Fact label: language' },
  startDate: { id: 'tels.course.startDate', defaultMessage: 'Start date', description: 'Fact label: start date' },
  effortPerWeek: {
    id: 'tels.course.effortPerWeek',
    defaultMessage: '{hours, plural, one {# hour} other {# hours}} per week',
    description: 'Fact value: weekly effort',
  },
  organization: { id: 'tels.course.organization', defaultMessage: 'Offered by', description: 'Fact label: organization' },
});

export default messages;
