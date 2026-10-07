import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  docTitle: {
    id: 'tels.courses.docTitle',
    defaultMessage: 'Courses — TELS by TitanEd',
    description: 'Courses page document title',
  },
  docTitleNamed: {
    id: 'tels.courses.docTitle.named',
    defaultMessage: '{title} — TELS by TitanEd',
    description: 'Courses page document title when a section title is set',
  },
  heading: {
    id: 'tels.courses.heading',
    defaultMessage: 'Courses',
    description: 'Courses page H1',
  },
  subjectCourses: {
    id: 'tels.courses.subjectCourses',
    defaultMessage: '{subject} Courses',
    description: 'Subject landing page title',
  },
  schoolCourses: {
    id: 'tels.courses.schoolCourses',
    defaultMessage: '{school} Courses',
    description: 'School landing page title',
  },
  filterSubject: {
    id: 'tels.courses.filter.subject',
    defaultMessage: 'Subject Area',
    description: 'Courses filter dropdown label',
  },
  filterPrice: {
    id: 'tels.courses.filter.price',
    defaultMessage: 'Price',
    description: 'Courses filter dropdown label',
  },
  filterStartDate: {
    id: 'tels.courses.filter.startDate',
    defaultMessage: 'Start Date',
    description: 'Courses filter dropdown label',
  },
  filterSchools: {
    id: 'tels.courses.filter.schools',
    defaultMessage: 'Schools',
    description: 'Courses filter dropdown label',
  },
  filterDuration: {
    id: 'tels.courses.filter.duration',
    defaultMessage: 'Duration',
    description: 'Courses filter dropdown label',
  },
  filterDifficulty: {
    id: 'tels.courses.filter.difficulty',
    defaultMessage: 'Difficulty',
    description: 'Courses filter dropdown label',
  },
  filterModality: {
    id: 'tels.courses.filter.modality',
    defaultMessage: 'Modality',
    description: 'Courses filter dropdown label',
  },
  results: {
    id: 'tels.courses.results',
    defaultMessage: '{count} results',
    description: 'Courses results count with no filters',
  },
  resultsFor: {
    id: 'tels.courses.resultsFor',
    defaultMessage: '{count} results for',
    description: 'Courses results count when filters are active',
  },
  clearFilters: {
    id: 'tels.courses.clearFilters',
    defaultMessage: 'Clear all filters',
    description: 'Courses clear-filters control',
  },
  empty: {
    id: 'tels.courses.empty',
    defaultMessage: 'No courses matched your search.',
    description: 'Courses empty state',
  },
  removeFilter: {
    id: 'tels.courses.removeFilter',
    defaultMessage: 'Remove {label} filter',
    description: 'Aria label for chip remove button',
  },
  schoolLogoAlt: {
    id: 'tels.courses.schoolLogoAlt',
    defaultMessage: '{name} logo',
    description: 'School landing page logo alt text',
  },
  filterSkills: {
    id: 'tels.courses.filter.skills',
    defaultMessage: 'Skills',
    description: 'Catalog filter: skills',
  },
  startAny: {
    id: 'tels.courses.filter.start.any',
    defaultMessage: 'Any start date',
    description: 'Catalog start date filter: no constraint',
  },
  startAvailable: {
    id: 'tels.courses.filter.start.available',
    defaultMessage: 'Available now',
    description: 'Catalog start date filter: started or self-paced courses',
  },
  startUpcoming: {
    id: 'tels.courses.filter.start.upcoming',
    defaultMessage: 'Starting soon',
    description: 'Catalog start date filter: courses starting in the future',
  },
  loading: {
    id: 'tels.courses.loading',
    defaultMessage: 'Loading courses…',
    description: 'Catalog results loading state',
  },
  loadFailed: {
    id: 'tels.courses.loadFailed',
    defaultMessage: 'The courses could not be loaded. Please try again.',
    description: 'Catalog results error state',
  },
  pageOf: {
    id: 'tels.courses.pageOf',
    defaultMessage: 'Page {page} of {pageCount}',
    description: 'Catalog pagination summary',
  },
  orgCourses: {
    id: 'tels.courses.orgCourses',
    defaultMessage: '{org} courses',
    description: 'Heading of the catalog filtered to one organization',
  },
});

export default messages;
