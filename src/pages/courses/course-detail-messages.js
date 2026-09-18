import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  pageTitle: {
    id: 'public.course-detail.page-title',
    defaultMessage: '{title} — TELS',
    description: 'Course detail document title with course title',
  },
  pageTitleFallback: {
    id: 'public.course-detail.page-title-fallback',
    defaultMessage: 'Course — TELS',
    description: 'Course detail document title while loading',
  },
  loadErrorTitle: {
    id: 'public.course-detail.error.title',
    defaultMessage: "Couldn't load this course",
    description: 'Course detail error title when detail API fails',
  },
  loadErrorBody: {
    id: 'public.course-detail.error.body',
    defaultMessage: 'Something went wrong on our end — please try again in a moment.',
    description: 'Course detail local fallback error body when API has no message',
  },
  loadErrorRetry: {
    id: 'public.course-detail.error.retry',
    defaultMessage: 'Try again',
    description: 'Course detail retry CTA',
  },
  loadErrorBack: {
    id: 'public.course-detail.error.back',
    defaultMessage: 'Back to courses',
    description: 'Course detail error link back to courses list',
  },
  untitledCourse: {
    id: 'public.course-detail.untitled',
    defaultMessage: 'Untitled course',
    description: 'Fallback title when course detail has no name from the API',
  },
  breadcrumbHome: {
    id: 'public.course-detail.breadcrumb.home',
    defaultMessage: 'Home',
    description: 'Course detail breadcrumb Home',
  },
  breadcrumbCourses: {
    id: 'public.course-detail.breadcrumb.courses',
    defaultMessage: 'Courses',
    description: 'Course detail breadcrumb Courses',
  },
  modulesCount: {
    id: 'public.course-detail.meta.modules',
    defaultMessage: '{count} modules',
    description: 'Module count in meta row',
  },
  offeredBy: {
    id: 'public.course-detail.meta.offered-by',
    defaultMessage: 'Offered by',
    description: 'Label before organization name',
  },
  startsOn: {
    id: 'public.course-detail.meta.starts',
    defaultMessage: '· Starts {startDate}',
    description: 'Start date after organization',
  },
  enrollNoteFree: {
    id: 'public.course-detail.enroll.note-free',
    defaultMessage: 'Full audit access. Upgrade for a verified certificate.',
    description: 'Enroll card note for free courses',
  },
  enrollNotePaid: {
    id: 'public.course-detail.enroll.note-paid',
    defaultMessage: 'Includes verified certificate on completion.',
    description: 'Enroll card note for paid courses',
  },
  enrollNow: {
    id: 'public.course-detail.enroll.cta',
    defaultMessage: 'Enroll now',
    description: 'Enroll now button',
  },
  enrollPending: {
    id: 'public.course-detail.enroll.pending',
    defaultMessage: 'Enrolling…',
    description: 'Enroll button pending state',
  },
  enrollError: {
    id: 'public.course-detail.enroll.error',
    defaultMessage: 'Unable to enroll — try again later.',
    description: 'Generic enrollment failure message',
  },
  enrollDisabled: {
    id: 'public.course-detail.enroll.disabled',
    defaultMessage: 'Enrollment is not available',
    description: 'When can_enroll is false',
  },
  alreadyEnrolled: {
    id: 'public.course-detail.enroll.already',
    defaultMessage: 'You are enrolled — go to course',
    description: 'CTA when user is already enrolled',
  },
  watchIntro: {
    id: 'public.course-detail.enroll.watch-intro',
    defaultMessage: 'Watch intro video',
    description: 'Link to the course intro/promo video, shown only when the API provides one',
  },
  perkSelfPaced: {
    id: 'public.course-detail.enroll.perk-self-paced',
    defaultMessage: 'Self-paced access',
    description: 'Enroll perk self-paced',
  },
  perkMobile: {
    id: 'public.course-detail.enroll.perk-mobile',
    defaultMessage: 'Mobile & desktop',
    description: 'Enroll perk mobile',
  },
  perkCertificate: {
    id: 'public.course-detail.enroll.perk-certificate',
    defaultMessage: 'Certificate available',
    description: 'Enroll perk certificate',
  },
  whyTitle: {
    id: 'public.course-detail.why.title',
    defaultMessage: 'Why take this course',
    description: 'Why take this course heading',
  },
  why1Title: {
    id: 'public.course-detail.why.1.title',
    defaultMessage: 'Practical skills',
    description: 'Benefit 1 title',
  },
  why1Body: {
    id: 'public.course-detail.why.1.body',
    defaultMessage: 'Hands-on learning aligned with real work outcomes, not just theory.',
    description: 'Benefit 1 body',
  },
  why2Title: {
    id: 'public.course-detail.why.2.title',
    defaultMessage: 'Recognized credential',
    description: 'Benefit 2 title',
  },
  why2Body: {
    id: 'public.course-detail.why.2.body',
    defaultMessage: 'Earn a certificate you can share with employers and peers.',
    description: 'Benefit 2 body',
  },
  why3Title: {
    id: 'public.course-detail.why.3.title',
    defaultMessage: 'Career momentum',
    description: 'Benefit 3 title',
  },
  why3Body: {
    id: 'public.course-detail.why.3.body',
    defaultMessage: 'Build skills that open doors — from your first role to your next promotion.',
    description: 'Benefit 3 body',
  },
  aboutTitle: {
    id: 'public.course-detail.about.title',
    defaultMessage: 'About this course',
    description: 'About this course heading',
  },
  aboutExtra: {
    id: 'public.course-detail.about.extra',
    defaultMessage: "Whether you're new to the subject or building on existing experience, this course provides a structured path with clear checkpoints, applied practice, and support along the way.",
    description: 'Static about paragraph after longDesc',
  },
  learnTitle: {
    id: 'public.course-detail.learn.title',
    defaultMessage: "What you'll learn",
    description: 'What you will learn heading',
  },
  learn1: {
    id: 'public.course-detail.learn.1',
    defaultMessage: 'Core concepts and terminology used by practitioners',
    description: 'Learning outcome 1',
  },
  learn2: {
    id: 'public.course-detail.learn.2',
    defaultMessage: 'How to apply the material to real-world scenarios',
    description: 'Learning outcome 2',
  },
  learn3: {
    id: 'public.course-detail.learn.3',
    defaultMessage: 'Best practices, workflows, and common pitfalls',
    description: 'Learning outcome 3',
  },
  learn4: {
    id: 'public.course-detail.learn.4',
    defaultMessage: 'How AI can accelerate your work in this domain',
    description: 'Learning outcome 4',
  },
  learn5: {
    id: 'public.course-detail.learn.5',
    defaultMessage: 'How to communicate results with confidence',
    description: 'Learning outcome 5',
  },
  contentTitle: {
    id: 'public.course-detail.content.title',
    defaultMessage: 'Course content',
    description: 'Course content heading',
  },
  moduleLabel: {
    id: 'public.course-detail.content.module',
    defaultMessage: 'Module {moduleNumber}: {moduleTitle}',
    description: 'Syllabus module accordion label',
  },
  prerequisitesTitle: {
    id: 'public.course-detail.prerequisites.title',
    defaultMessage: 'Prerequisites',
    description: 'Prerequisites heading',
  },
  howTitle: {
    id: 'public.course-detail.how.title',
    defaultMessage: "How you'll learn",
    description: 'How you will learn heading',
  },
  how1: {
    id: 'public.course-detail.how.1',
    defaultMessage: 'Guided lessons with short videos and readings',
    description: 'How you learn item 1',
  },
  how2: {
    id: 'public.course-detail.how.2',
    defaultMessage: 'Applied exercises after each module',
    description: 'How you learn item 2',
  },
  how3: {
    id: 'public.course-detail.how.3',
    defaultMessage: 'Peer discussions and community support',
    description: 'How you learn item 3',
  },
  how4: {
    id: 'public.course-detail.how.4',
    defaultMessage: 'Capstone project reviewed against a clear rubric',
    description: 'How you learn item 4',
  },
  instructorTitle: {
    id: 'public.course-detail.instructor.section-title',
    defaultMessage: 'Meet your instructor',
    description: 'Instructor section heading',
  },
  testimonialsTitle: {
    id: 'public.course-detail.testimonials.title',
    defaultMessage: 'What learners are saying',
    description: 'Testimonials section heading',
  },
  certificateTitle: {
    id: 'public.course-detail.certificate.title',
    defaultMessage: 'Earn a certificate',
    description: 'Certificate section heading',
  },
  certificateBody: {
    id: 'public.course-detail.certificate.body',
    defaultMessage: 'Complete every module and the capstone to receive a verified certificate from {org}. Share it on LinkedIn, add it to your resume, and use it to signal your new skills to employers.',
    description: 'Certificate section body with org',
  },
  certificateItem1: {
    id: 'public.course-detail.certificate.item1',
    defaultMessage: 'Verified completion, sharable on LinkedIn',
    description: 'Certificate benefit 1',
  },
  certificateItem2: {
    id: 'public.course-detail.certificate.item2',
    defaultMessage: 'Unique credential ID for employer verification',
    description: 'Certificate benefit 2',
  },
  certificateItem3: {
    id: 'public.course-detail.certificate.item3',
    defaultMessage: 'Downloadable PDF for offline use',
    description: 'Certificate benefit 3',
  },
  certificateCardTitle: {
    id: 'public.course-detail.certificate.card-title',
    defaultMessage: 'Certificate of Completion',
    description: 'Certificate card title',
  },
  issuedBy: {
    id: 'public.course-detail.certificate.issued-by',
    defaultMessage: 'Issued by {org}',
    description: 'Certificate issued by line',
  },
  faqTitle: {
    id: 'public.course-detail.faq.title',
    defaultMessage: 'Frequently asked questions',
    description: 'Course detail FAQ heading',
  },
  whoTitle: {
    id: 'public.course-detail.who.title',
    defaultMessage: 'Who is this for',
    description: 'Audience section heading',
  },
  who1: {
    id: 'public.course-detail.who.1',
    defaultMessage: 'Professionals looking to build practical, career-relevant skills',
    description: 'Audience item 1',
  },
  who2: {
    id: 'public.course-detail.who.2',
    defaultMessage: 'Teams and organizations upskilling their workforce',
    description: 'Audience item 2',
  },
  who3: {
    id: 'public.course-detail.who.3',
    defaultMessage: 'Learners returning to structured education',
    description: 'Audience item 3',
  },
  who4: {
    id: 'public.course-detail.who.4',
    defaultMessage: 'Educators exploring AI-era learning approaches',
    description: 'Audience item 4',
  },
  skillsTitle: {
    id: 'public.course-detail.skills.title',
    defaultMessage: "Skills you'll gain",
    description: 'Skills section heading',
  },
  relatedTitle: {
    id: 'public.course-detail.related.title',
    defaultMessage: 'Related courses',
    description: 'Related courses heading',
  },
  browseAll: {
    id: 'public.course-detail.related.browse-all',
    defaultMessage: 'Browse all',
    description: 'Browse all courses link',
  },
});
export default messages;
