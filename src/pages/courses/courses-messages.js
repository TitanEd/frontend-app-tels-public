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
});

export default messages;
