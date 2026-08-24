/**
 * Placeholder course catalog for the public marketing pages (Home, Courses,
 * Course About). Ported from the Lovable "tels-bright" reference design
 * (github.com/Sonu-TitanEd/tels-bright, src/lib/tels-data.ts) so those pages
 * render real-looking content while matching the reference pixel-for-pixel.
 *
 * This is DEMO DATA, not real Open edX course discovery. Wiring the real
 * course discovery/catalog API is separate, larger follow-up work — see
 * docs/branding/TOKEN_MAP.md for how this page system is styled.
 */
const IMG = {
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=70',
  data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=70',
  leadership: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=70',
  product: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=70',
  python: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=70',
  health: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=70',
  instructional: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=70',
  cyber: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=70',
  speaking: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=70',
  finance: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=70',
  ml: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=70',
  teaching: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=70',
};
const modulesFor = (topic) => [
  { title: `Getting started with ${topic}`, description: `Foundational overview, orientation, and setup for ${topic}.` },
  { title: `Core concepts of ${topic}`, description: 'Key frameworks, models, and vocabulary used across the field.' },
  { title: 'Applied practice', description: 'Hands-on activities, case studies, and guided assignments.' },
  { title: 'AI-assisted workflows', description: `Using AI tools to accelerate work in ${topic}.` },
  { title: 'Capstone project', description: "Bring together everything you've learned in a real-world scenario." },
];
export const COURSES = [
  {
    id: 'ai-foundations', title: 'AI Foundations for Professionals', org: 'TitanEd Academy', subject: 'Technology', skills: ['AI', 'Python', 'Prompting'], language: 'English', type: 'Course', level: 'Introductory', duration: '6 weeks', startDate: 'Self-paced', shortDesc: 'Build a working understanding of modern AI, from LLMs to real workplace applications.', longDesc: "This introductory course helps professionals understand and apply modern AI concepts. You'll explore language models, prompting, retrieval, and how AI reshapes workflows across industries.", free: true, image: IMG.ai, rating: 4.8, reviews: 1240, modules: modulesFor('AI'),
  },
  {
    id: 'data-analytics', title: 'Data Analytics for Decision Makers', org: 'Eduquest', subject: 'Data', skills: ['SQL', 'Analytics', 'Dashboards'], language: 'English', type: 'Professional Certificate', level: 'Intermediate', duration: '8 weeks', startDate: 'Jan 15', shortDesc: 'Turn data into confident decisions with practical analytics workflows.', longDesc: 'Learn to explore, clean, and visualize data. Build dashboards that leaders trust and communicate insights that drive action.', free: false, image: IMG.data, rating: 4.7, reviews: 980, modules: modulesFor('data analytics'),
  },
  {
    id: 'leadership-essentials', title: 'Modern Leadership Essentials', org: 'TitanEd Academy', subject: 'Leadership', skills: ['Coaching', 'Feedback', 'Strategy'], language: 'English', type: 'Course', level: 'Intermediate', duration: '5 weeks', startDate: 'Self-paced', shortDesc: 'Lead teams with clarity, empathy, and outcomes in a hybrid world.', longDesc: 'A hands-on program covering the leadership habits that separate great managers from good ones — coaching, feedback, prioritization, and change.', free: true, image: IMG.leadership, rating: 4.6, reviews: 742, modules: modulesFor('leadership'),
  },
  {
    id: 'product-management', title: 'Product Management Fundamentals', org: 'Scapes', subject: 'Business', skills: ['Discovery', 'Roadmaps', 'Metrics'], language: 'English', type: 'Course', level: 'Introductory', duration: '6 weeks', startDate: 'Feb 05', shortDesc: 'From discovery to delivery: how modern product teams ship what matters.', longDesc: 'Understand the product lifecycle, user research, roadmapping, and metrics that guide product decisions.', free: true, image: IMG.product, rating: 4.7, reviews: 655, modules: modulesFor('product management'),
  },
  {
    id: 'python-programming', title: 'Python for Everybody', org: 'EBC', subject: 'Technology', skills: ['Python', 'Programming'], language: 'English', type: 'Course', level: 'Introductory', duration: '10 weeks', startDate: 'Self-paced', shortDesc: 'Start programming from zero with Python, one of the most widely used languages.', longDesc: 'A gentle introduction to programming using Python. Covers syntax, control flow, functions, and small projects.', free: true, image: IMG.python, rating: 4.9, reviews: 2130, modules: modulesFor('Python'),
  },
  {
    id: 'digital-health', title: 'Digital Health Innovation', org: 'UFJ', subject: 'Health', skills: ['Healthcare', 'Innovation', 'Systems'], language: 'English', type: 'Professional Certificate', level: 'Advanced', duration: '12 weeks', startDate: 'Mar 10', shortDesc: 'Design the next generation of digital-first healthcare experiences.', longDesc: 'Explore how technology is reshaping care delivery, patient experience, and health systems worldwide.', free: false, image: IMG.health, rating: 4.5, reviews: 412, modules: modulesFor('digital health'),
  },
  {
    id: 'instructional-design', title: 'Instructional Design for AI-Era Learning', org: 'TitanEd Academy', subject: 'Education', skills: ['Curriculum', 'Assessment', 'AI'], language: 'English', type: 'Course', level: 'Intermediate', duration: '6 weeks', startDate: 'Self-paced', shortDesc: 'Design learning that works in classrooms and on modern LMS platforms.', longDesc: 'Learn instructional design frameworks and apply them to build engaging, AI-enhanced learning experiences.', free: true, image: IMG.instructional, rating: 4.6, reviews: 528, modules: modulesFor('instructional design'),
  },
  {
    id: 'cyber-basics', title: 'Cybersecurity Basics for Teams', org: 'Eduquest', subject: 'Technology', skills: ['Security', 'Risk'], language: 'English', type: 'Course', level: 'Introductory', duration: '4 weeks', startDate: 'Self-paced', shortDesc: 'Everyday security habits every professional should master.', longDesc: 'Understand common threats, protect accounts and data, and build a security-first mindset.', free: true, image: IMG.cyber, rating: 4.5, reviews: 389, modules: modulesFor('cybersecurity'),
  },
  {
    id: 'public-speaking', title: 'Confident Public Speaking', org: 'Scapes', subject: 'Leadership', skills: ['Communication', 'Storytelling'], language: 'English', type: 'Course', level: 'Introductory', duration: '3 weeks', startDate: 'Self-paced', shortDesc: 'Present with clarity, confidence, and presence — in-person or online.', longDesc: 'Practical techniques for structuring talks, controlling nerves, and connecting with any audience.', free: true, image: IMG.speaking, rating: 4.8, reviews: 611, modules: modulesFor('public speaking'),
  },
  {
    id: 'financial-literacy', title: 'Financial Literacy for Managers', org: 'EBC', subject: 'Business', skills: ['Finance', 'Budgeting'], language: 'English', type: 'Course', level: 'Intermediate', duration: '5 weeks', startDate: 'Feb 20', shortDesc: 'Read financial statements and make budget calls with confidence.', longDesc: 'A finance course written for non-finance leaders. Learn statements, budgeting, and unit economics.', free: false, image: IMG.finance, rating: 4.6, reviews: 470, modules: modulesFor('finance'),
  },
  {
    id: 'ml-applied', title: 'Applied Machine Learning', org: 'TitanEd Academy', subject: 'Data', skills: ['Python', 'ML', 'Modeling'], language: 'English', type: 'Professional Certificate', level: 'Advanced', duration: '10 weeks', startDate: 'Apr 01', shortDesc: 'Ship ML models that actually work in real products.', longDesc: 'A practical, hands-on program covering the full ML workflow: data, features, models, evaluation, and deployment.', free: false, image: IMG.ml, rating: 4.8, reviews: 890, modules: modulesFor('machine learning'),
  },
  {
    id: 'teaching-online', title: 'Teaching Effectively Online', org: 'UFJ', subject: 'Education', skills: ['Pedagogy', 'LMS'], language: 'English', type: 'Course', level: 'Introductory', duration: '4 weeks', startDate: 'Self-paced', shortDesc: 'Engage learners in fully online and blended classrooms.', longDesc: 'Techniques and tools for teaching well in modern LMS-based environments, including Open edX.', free: true, image: IMG.teaching, rating: 4.7, reviews: 335, modules: modulesFor('online teaching'),
  },
];
export const SUBJECTS = ['Business', 'Technology', 'Health', 'Education', 'Data', 'Leadership'];
export const LEVELS = ['Introductory', 'Intermediate', 'Advanced'];
export const LANGUAGES = ['English', 'Spanish', 'French'];
export const TYPES = ['Course', 'Professional Certificate', 'Learning Path'];
export const ORGS = ['TitanEd Academy', 'Eduquest', 'EBC', 'Scapes', 'UFJ'];
export function fetchCourses() {
  return new Promise((resolve) => { setTimeout(() => resolve(COURSES), 120); });
}
export function fetchCourse(id) {
  return new Promise((resolve) => { setTimeout(() => resolve(COURSES.find((c) => c.id === id)), 120); });
}
export const PARTNER_LOGOS = [
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoft.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/google.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ibm.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/oracle.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/sap.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/salesforce.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cisco.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/adobe.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/intel.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nvidia.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/dell.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/hp.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlecloud.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/meta.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tesla.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/samsung.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/sony.svg',
];
