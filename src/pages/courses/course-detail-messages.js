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
  price: {
    id: 'public.course-detail.enroll.price',
    defaultMessage: '$149',
    description: 'Paid course price display',
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
  prerequisitesBody: {
    id: 'public.course-detail.prerequisites.body',
    defaultMessage: 'No formal prerequisites. This {level} course is designed to meet you where you are and build up from there.',
    description: 'Prerequisites intro with level',
  },
  prereq1: {
    id: 'public.course-detail.prerequisites.1',
    defaultMessage: 'Basic comfort with a computer and web browser',
    description: 'Prerequisite item 1',
  },
  prereq2: {
    id: 'public.course-detail.prerequisites.2',
    defaultMessage: 'Curiosity and willingness to practice',
    description: 'Prerequisite item 2',
  },
  prereq3: {
    id: 'public.course-detail.prerequisites.3',
    defaultMessage: 'Approximately 3–5 hours per week to engage with the material',
    description: 'Prerequisite item 3',
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
  instructorAlt: {
    id: 'public.course-detail.instructor.alt',
    defaultMessage: 'Instructor',
    description: 'Instructor image alt',
  },
  instructorName: {
    id: 'public.course-detail.instructor.name',
    defaultMessage: 'Dr. Alex Morgan',
    description: 'Demo instructor name',
  },
  instructorRole: {
    id: 'public.course-detail.instructor.role',
    defaultMessage: 'Lead Faculty, {org}',
    description: 'Instructor role with organization',
  },
  instructorBio: {
    id: 'public.course-detail.instructor.bio',
    defaultMessage: "Alex has spent 15+ years teaching and building in {subject}. Their work bridges research and real-world practice, and they've helped thousands of learners translate ideas into results.",
    description: 'Instructor bio with subject',
  },
  testimonialsTitle: {
    id: 'public.course-detail.testimonials.title',
    defaultMessage: 'What learners are saying',
    description: 'Testimonials section heading',
  },
  testimonial1Quote: {
    id: 'public.course-detail.testimonials.1.quote',
    defaultMessage: "This was hands-down the most useful {subject} course I've taken. The projects made everything click.",
    description: 'Testimonial 1 quote with subject',
  },
  testimonial1Name: {
    id: 'public.course-detail.testimonials.1.name',
    defaultMessage: 'Priya S.',
    description: 'Testimonial 1 name',
  },
  testimonial1Role: {
    id: 'public.course-detail.testimonials.1.role',
    defaultMessage: 'Program Manager',
    description: 'Testimonial 1 role',
  },
  testimonial2Quote: {
    id: 'public.course-detail.testimonials.2.quote',
    defaultMessage: 'Clear structure, excellent instructors, and content I could apply the same week at work.',
    description: 'Testimonial 2 quote',
  },
  testimonial2Name: {
    id: 'public.course-detail.testimonials.2.name',
    defaultMessage: 'Marco D.',
    description: 'Testimonial 2 name',
  },
  testimonial2Role: {
    id: 'public.course-detail.testimonials.2.role',
    defaultMessage: 'Team Lead',
    description: 'Testimonial 2 role',
  },
  testimonial3Quote: {
    id: 'public.course-detail.testimonials.3.quote',
    defaultMessage: 'The pacing worked perfectly with a full-time job, and the capstone gave me something to show employers.',
    description: 'Testimonial 3 quote',
  },
  testimonial3Name: {
    id: 'public.course-detail.testimonials.3.name',
    defaultMessage: 'Ayesha K.',
    description: 'Testimonial 3 name',
  },
  testimonial3Role: {
    id: 'public.course-detail.testimonials.3.role',
    defaultMessage: 'Analyst',
    description: 'Testimonial 3 role',
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
  faq1q: {
    id: 'public.course-detail.faq.1.q',
    defaultMessage: 'When does the course start?',
    description: 'FAQ 1 question',
  },
  faq1aSelfPaced: {
    id: 'public.course-detail.faq.1.a-self-paced',
    defaultMessage: 'This course is self-paced — start any time and learn on your schedule.',
    description: 'FAQ 1 answer for self-paced',
  },
  faq1aScheduled: {
    id: 'public.course-detail.faq.1.a-scheduled',
    defaultMessage: 'This course is scheduled to start {startDate}. You can enroll now to reserve your seat.',
    description: 'FAQ 1 answer for scheduled start',
  },
  faq2q: {
    id: 'public.course-detail.faq.2.q',
    defaultMessage: 'How long will it take to complete?',
    description: 'FAQ 2 question',
  },
  faq2a: {
    id: 'public.course-detail.faq.2.a',
    defaultMessage: 'Most learners finish in about {duration}, spending 3–5 hours per week.',
    description: 'FAQ 2 answer with duration',
  },
  faq3q: {
    id: 'public.course-detail.faq.3.q',
    defaultMessage: 'Do I need any prior experience?',
    description: 'FAQ 3 question',
  },
  faq3a: {
    id: 'public.course-detail.faq.3.a',
    defaultMessage: 'No. This {level} course starts from the fundamentals and builds up progressively.',
    description: 'FAQ 3 answer with level',
  },
  faq4q: {
    id: 'public.course-detail.faq.4.q',
    defaultMessage: 'Will I get a certificate?',
    description: 'FAQ 4 question',
  },
  faq4a: {
    id: 'public.course-detail.faq.4.a',
    defaultMessage: 'Yes — a verified certificate is issued when you complete all modules and the capstone project.',
    description: 'FAQ 4 answer',
  },
  faq5q: {
    id: 'public.course-detail.faq.5.q',
    defaultMessage: 'Can I access the course on mobile?',
    description: 'FAQ 5 question',
  },
  faq5a: {
    id: 'public.course-detail.faq.5.a',
    defaultMessage: 'Yes, the entire course works on mobile, tablet, and desktop.',
    description: 'FAQ 5 answer',
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
