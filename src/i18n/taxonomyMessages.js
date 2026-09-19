import { defineMessages } from '@edx/frontend-platform/i18n';

/**
 * Shared taxonomy labels (subjects, modality, difficulty, duration, price).
 * English strings in course data / query params stay as keys; UI renders
 * these message IDs so Transifex can translate the visible copy.
 */
const taxonomyMessages = defineMessages({
  artDesign: {
    id: 'tels.taxonomy.subject.artDesign',
    defaultMessage: 'Art & Design',
    description: 'Subject area name',
  },
  business: {
    id: 'tels.taxonomy.subject.business',
    defaultMessage: 'Business',
    description: 'Subject area name',
  },
  computerScience: {
    id: 'tels.taxonomy.subject.computerScience',
    defaultMessage: 'Computer Science',
    description: 'Subject area name',
  },
  dataScience: {
    id: 'tels.taxonomy.subject.dataScience',
    defaultMessage: 'Data Science',
    description: 'Subject area name',
  },
  educationTeaching: {
    id: 'tels.taxonomy.subject.educationTeaching',
    defaultMessage: 'Education & Teaching',
    description: 'Subject area name',
  },
  healthMedicine: {
    id: 'tels.taxonomy.subject.healthMedicine',
    defaultMessage: 'Health & Medicine',
    description: 'Subject area name',
  },
  humanities: {
    id: 'tels.taxonomy.subject.humanities',
    defaultMessage: 'Humanities',
    description: 'Subject area name',
  },
  mathematics: {
    id: 'tels.taxonomy.subject.mathematics',
    defaultMessage: 'Mathematics',
    description: 'Subject area name',
  },
  programming: {
    id: 'tels.taxonomy.subject.programming',
    defaultMessage: 'Programming',
    description: 'Subject area name',
  },
  science: {
    id: 'tels.taxonomy.subject.science',
    defaultMessage: 'Science',
    description: 'Subject area name',
  },
  socialSciences: {
    id: 'tels.taxonomy.subject.socialSciences',
    defaultMessage: 'Social Sciences',
    description: 'Subject area name',
  },
  theology: {
    id: 'tels.taxonomy.subject.theology',
    defaultMessage: 'Theology',
    description: 'Subject area name',
  },
  inPerson: {
    id: 'tels.taxonomy.modality.inPerson',
    defaultMessage: 'In-Person',
    description: 'Course modality',
  },
  blended: {
    id: 'tels.taxonomy.modality.blended',
    defaultMessage: 'Blended',
    description: 'Course modality',
  },
  online: {
    id: 'tels.taxonomy.modality.online',
    defaultMessage: 'Online',
    description: 'Course modality',
  },
  onlineLive: {
    id: 'tels.taxonomy.modality.onlineLive',
    defaultMessage: 'Online Live',
    description: 'Course modality',
  },
  introductory: {
    id: 'tels.taxonomy.difficulty.introductory',
    defaultMessage: 'Introductory',
    description: 'Course difficulty',
  },
  intermediate: {
    id: 'tels.taxonomy.difficulty.intermediate',
    defaultMessage: 'Intermediate',
    description: 'Course difficulty',
  },
  advanced: {
    id: 'tels.taxonomy.difficulty.advanced',
    defaultMessage: 'Advanced',
    description: 'Course difficulty',
  },
  free: {
    id: 'tels.taxonomy.price.free',
    defaultMessage: 'Free',
    description: 'Price filter: free courses',
  },
  paid: {
    id: 'tels.taxonomy.price.paid',
    defaultMessage: 'Paid',
    description: 'Price filter: paid courses',
  },
  freeStar: {
    id: 'tels.taxonomy.price.freeStar',
    defaultMessage: 'FREE*',
    description: 'Course card free price label',
  },
  any: {
    id: 'tels.taxonomy.any',
    defaultMessage: 'Any',
    description: 'Unspecified filter option',
  },
  availableNow: {
    id: 'tels.taxonomy.availability.availableNow',
    defaultMessage: 'Available now',
    description: 'Course availability / start-date filter',
  },
  startsSoon: {
    id: 'tels.taxonomy.availability.startsSoon',
    defaultMessage: 'Starts soon',
    description: 'Start-date filter',
  },
  duration0to1: {
    id: 'tels.taxonomy.duration.0to1',
    defaultMessage: '0-1 weeks',
    description: 'Duration filter bucket',
  },
  duration1to2: {
    id: 'tels.taxonomy.duration.1to2',
    defaultMessage: '1-2 weeks',
    description: 'Duration filter bucket',
  },
  duration2to4: {
    id: 'tels.taxonomy.duration.2to4',
    defaultMessage: '2-4 weeks',
    description: 'Duration filter bucket',
  },
  duration4to8: {
    id: 'tels.taxonomy.duration.4to8',
    defaultMessage: '4-8 weeks',
    description: 'Duration filter bucket',
  },
  duration8to12: {
    id: 'tels.taxonomy.duration.8to12',
    defaultMessage: '8-12 weeks',
    description: 'Duration filter bucket',
  },
  duration12plus: {
    id: 'tels.taxonomy.duration.12plus',
    defaultMessage: '12+ weeks',
    description: 'Duration filter bucket',
  },
  selfPaced: {
    id: 'tels.taxonomy.pace.selfPaced',
    defaultMessage: 'Self-paced',
    description: 'Course pace',
  },
  instructorPaced: {
    id: 'tels.taxonomy.pace.instructorPaced',
    defaultMessage: 'Instructor-paced',
    description: 'Course pace',
  },
});

export const SUBJECT_MESSAGE_KEY = {
  'Art & Design': 'artDesign',
  Business: 'business',
  'Computer Science': 'computerScience',
  'Data Science': 'dataScience',
  'Education & Teaching': 'educationTeaching',
  'Health & Medicine': 'healthMedicine',
  Humanities: 'humanities',
  Mathematics: 'mathematics',
  Programming: 'programming',
  Science: 'science',
  'Social Sciences': 'socialSciences',
  Theology: 'theology',
};

export const MODALITY_MESSAGE_KEY = {
  'In-Person': 'inPerson',
  Blended: 'blended',
  Online: 'online',
  'Online Live': 'onlineLive',
};

export const DIFFICULTY_MESSAGE_KEY = {
  Introductory: 'introductory',
  Intermediate: 'intermediate',
  Advanced: 'advanced',
};

export const DURATION_MESSAGE_KEY = {
  '0-1 weeks': 'duration0to1',
  '1-2 weeks': 'duration1to2',
  '2-4 weeks': 'duration2to4',
  '4-8 weeks': 'duration4to8',
  '8-12 weeks': 'duration8to12',
  '12+ weeks': 'duration12plus',
};

export const AVAILABILITY_MESSAGE_KEY = {
  'Available now': 'availableNow',
  'Starts soon': 'startsSoon',
};

export const PACE_MESSAGE_KEY = {
  'Self-paced': 'selfPaced',
  'Instructor-paced': 'instructorPaced',
};

const formatKeyed = (intl, map, value) => {
  const key = map[value];
  if (!key || !taxonomyMessages[key]) {
    return value;
  }
  return intl.formatMessage(taxonomyMessages[key]);
};

export const formatSubject = (intl, subject) => formatKeyed(intl, SUBJECT_MESSAGE_KEY, subject);
export const formatModality = (intl, modality) => formatKeyed(intl, MODALITY_MESSAGE_KEY, modality);
export const formatDifficulty = (intl, difficulty) => formatKeyed(intl, DIFFICULTY_MESSAGE_KEY, difficulty);
export const formatDurationBucket = (intl, label) => formatKeyed(intl, DURATION_MESSAGE_KEY, label);
export const formatAvailability = (intl, value) => formatKeyed(intl, AVAILABILITY_MESSAGE_KEY, value);
export const formatPace = (intl, pace) => formatKeyed(intl, PACE_MESSAGE_KEY, pace);

export default taxonomyMessages;
