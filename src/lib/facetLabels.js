/**
 * Visible labels for catalog facet values. The API returns raw values (the admin's level and mode
 * names, course language codes); the known ones are shown through translatable messages so the
 * catalog filters and course facts follow the visitor's language.
 */
import { defineMessages } from '@edx/frontend-platform/i18n';

export const facetValueMessages = defineMessages({
  levelIntroductory: {
    id: 'public.courses.facet.level.introductory',
    defaultMessage: 'Introductory',
    description: 'Course difficulty level',
  },
  levelIntermediate: {
    id: 'public.courses.facet.level.intermediate',
    defaultMessage: 'Intermediate',
    description: 'Course difficulty level',
  },
  levelAdvanced: {
    id: 'public.courses.facet.level.advanced',
    defaultMessage: 'Advanced',
    description: 'Course difficulty level',
  },
  modeAudit: {
    id: 'public.courses.facet.mode.audit',
    defaultMessage: 'Audit (free)',
    description: 'Enrollment mode filter option',
  },
  modeHonor: {
    id: 'public.courses.facet.mode.honor',
    defaultMessage: 'Honor (free)',
    description: 'Enrollment mode filter option',
  },
  modeVerified: {
    id: 'public.courses.facet.mode.verified',
    defaultMessage: 'Verified certificate',
    description: 'Enrollment mode filter option',
  },
  modeProfessional: {
    id: 'public.courses.facet.mode.professional',
    defaultMessage: 'Professional',
    description: 'Enrollment mode filter option',
  },
});

const LEVEL_KEYS = {
  introductory: 'levelIntroductory',
  beginner: 'levelIntroductory',
  intermediate: 'levelIntermediate',
  advanced: 'levelAdvanced',
};

const MODE_KEYS = {
  audit: 'modeAudit',
  honor: 'modeHonor',
  verified: 'modeVerified',
  professional: 'modeProfessional',
  'no-id-professional': 'modeProfessional',
};

const languageName = (intl, code) => {
  try {
    const name = intl.formatDisplayName(String(code).replace('_', '-'), { type: 'language' });
    return name || code;
  } catch {
    return code;
  }
};

/** Label of one facet value (`level`, `modes`, `language`, `subject`, `org`) in the visitor's language. */
export const formatFacetValue = (intl, facetKey, value) => {
  const raw = String(value ?? '');
  if (!raw) {
    return '';
  }
  if (facetKey === 'level') {
    const key = LEVEL_KEYS[raw.toLowerCase()];
    return key ? intl.formatMessage(facetValueMessages[key]) : raw;
  }
  if (facetKey === 'modes') {
    const key = MODE_KEYS[raw.toLowerCase()];
    return key ? intl.formatMessage(facetValueMessages[key]) : raw;
  }
  if (facetKey === 'language' && /^[a-z]{2,3}([-_][A-Za-z0-9]{2,8})?$/.test(raw)) {
    return languageName(intl, raw);
  }
  return raw;
};
