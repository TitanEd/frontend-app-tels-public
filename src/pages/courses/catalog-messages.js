import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  docTitle: {
    id: 'tels.catalog.docTitle',
    defaultMessage: 'Courses — TELS by TitanEd',
    description: 'Catalog page document title',
  },
  docTitleNamed: {
    id: 'tels.catalog.docTitle.named',
    defaultMessage: '{title} — TELS by TitanEd',
    description: 'Catalog page document title when a section title is set',
  },
  heading: {
    id: 'tels.catalog.heading',
    defaultMessage: 'Courses',
    description: 'Catalog page H1',
  },
  subjectCourses: {
    id: 'tels.catalog.subjectCourses',
    defaultMessage: '{subject} Courses',
    description: 'Subject landing page title',
  },
  schoolCourses: {
    id: 'tels.catalog.schoolCourses',
    defaultMessage: '{school} Courses',
    description: 'School landing page title',
  },
  filterSubject: {
    id: 'tels.catalog.filter.subject',
    defaultMessage: 'Subject Area',
    description: 'Catalog filter dropdown label',
  },
  filterPrice: {
    id: 'tels.catalog.filter.price',
    defaultMessage: 'Price',
    description: 'Catalog filter dropdown label',
  },
  filterStartDate: {
    id: 'tels.catalog.filter.startDate',
    defaultMessage: 'Start Date',
    description: 'Catalog filter dropdown label',
  },
  filterSchools: {
    id: 'tels.catalog.filter.schools',
    defaultMessage: 'Schools',
    description: 'Catalog filter dropdown label',
  },
  filterDuration: {
    id: 'tels.catalog.filter.duration',
    defaultMessage: 'Duration',
    description: 'Catalog filter dropdown label',
  },
  filterDifficulty: {
    id: 'tels.catalog.filter.difficulty',
    defaultMessage: 'Difficulty',
    description: 'Catalog filter dropdown label',
  },
  filterModality: {
    id: 'tels.catalog.filter.modality',
    defaultMessage: 'Modality',
    description: 'Catalog filter dropdown label',
  },
  results: {
    id: 'tels.catalog.results',
    defaultMessage: '{count} results',
    description: 'Catalog results count with no filters',
  },
  resultsFor: {
    id: 'tels.catalog.resultsFor',
    defaultMessage: '{count} results for',
    description: 'Catalog results count when filters are active',
  },
  clearFilters: {
    id: 'tels.catalog.clearFilters',
    defaultMessage: 'Clear all filters',
    description: 'Catalog clear-filters control',
  },
  empty: {
    id: 'tels.catalog.empty',
    defaultMessage: 'No courses matched your search.',
    description: 'Catalog empty state',
  },
  removeFilter: {
    id: 'tels.catalog.removeFilter',
    defaultMessage: 'Remove {label} filter',
    description: 'Aria label for chip remove button',
  },
});

export default messages;
