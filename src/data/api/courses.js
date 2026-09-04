import { camelCaseObject } from '@edx/frontend-platform';

import {
  COURSES,
} from '../telsData';
import { getHttpClient, isHttpError, logApiFailure } from './http';
import { isCourseKey, mapDetailToCourse, mapSearchHitToCourse } from './mappers';
import {
  getCourseAboutUrl,
  getCourseListSearchUrl,
  getSuggestedCoursesUrl,
  getTelsCourseBySlugUrl,
  getTelsCourseDetailUrl,
  getTelsCourseSearchUrl,
} from './urls';

const findMockCourse = (idOrSlug) => (
  COURSES.find((c) => c.id === idOrSlug || c.courseKey === idOrSlug) || null
);

const appendFilters = (formData, filters = {}) => {
  Object.entries(filters).forEach(([key, values]) => {
    if (!Array.isArray(values)) {
      return;
    }
    values.filter((v) => v !== undefined && v !== null && v !== '').forEach((value) => {
      formData.append(key, value);
    });
  });
};

/**
 * POST course list search (Open edX catalog pattern).
 * Tries LMS search first; optional TitanEd wrapper on failure.
 */
const postCourseSearch = async ({
  pageSize = 12,
  pageIndex = 0,
  searchString = '',
  filters = {},
}) => {
  const formData = new FormData();
  formData.append('page_size', String(pageSize));
  formData.append('page_index', String(pageIndex));
  formData.append('enable_course_sorting_by_start_date', 'false');
  if (searchString) {
    formData.append('search_string', searchString);
  }
  appendFilters(formData, filters);

  const client = getHttpClient();
  try {
    const { data } = await client.post(getCourseListSearchUrl(), formData);
    return camelCaseObject(data);
  } catch (lmsError) {
    logApiFailure('course_list_search LMS failed; trying TitanEd wrapper', lmsError);
    try {
      const { data } = await client.post(getTelsCourseSearchUrl(), {
        page_size: pageSize,
        page_index: pageIndex,
        search_string: searchString || undefined,
        ...filters,
      });
      return camelCaseObject(data);
    } catch (telsError) {
      logApiFailure('course_list_search TitanEd wrapper failed', telsError);
      throw telsError;
    }
  }
};

/**
 * Fetch courses for Home / Catalog. Never throws — falls back to mock.
 */
export async function fetchCourses(params = {}) {
  const {
    pageSize = 100,
    pageIndex = 0,
    searchString = '',
    filters = {},
  } = params;

  try {
    const data = await postCourseSearch({
      pageSize, pageIndex, searchString, filters,
    });
    const results = Array.isArray(data?.results) ? data.results : [];
    const courses = results
      .map((hit) => {
        const hitData = hit?.data || {};
        // eslint-disable-next-line no-underscore-dangle -- Open edX search hit id
        const courseKey = hitData.id || hitData.course || hit?._id;
        const mock = findMockCourse(courseKey) || findMockCourse(hitData.slug);
        return mapSearchHitToCourse(hit, mock);
      })
      .filter((c) => c?.id);

    if (!courses.length) {
      return {
        courses: COURSES,
        total: COURSES.length,
        fromFallback: true,
        aggs: null,
      };
    }

    return {
      courses,
      total: typeof data.total === 'number' ? data.total : courses.length,
      fromFallback: false,
      aggs: data.aggs || null,
    };
  } catch (error) {
    logApiFailure('fetchCourses → mock COURSES', error);
    return {
      courses: COURSES,
      total: COURSES.length,
      fromFallback: true,
      aggs: null,
    };
  }
}

/**
 * Convenience for pages that only need the course array (react-query).
 */
export async function fetchCoursesList(params) {
  const result = await fetchCourses(params);
  return result.courses;
}

const fetchDetailFromLms = async (courseId) => {
  const { data } = await getHttpClient().get(getCourseAboutUrl(courseId));
  return camelCaseObject(data);
};

const fetchDetailFromTels = async (courseId) => {
  const { data } = await getHttpClient().get(getTelsCourseDetailUrl(courseId));
  return camelCaseObject(data);
};

const fetchDetailBySlug = async (slug) => {
  const { data } = await getHttpClient().get(getTelsCourseBySlugUrl(slug));
  return camelCaseObject(data);
};

/**
 * Fetch one course by LMS key or marketing slug.
 * Never throws — returns mock match or null.
 */
export async function fetchCourse(idOrSlug) {
  if (!idOrSlug) {
    return null;
  }

  const mock = findMockCourse(idOrSlug);

  try {
    let raw = null;

    if (isCourseKey(idOrSlug)) {
      try {
        raw = await fetchDetailFromLms(idOrSlug);
      } catch (lmsError) {
        logApiFailure('courseware detail failed; trying TitanEd detail', lmsError);
        raw = await fetchDetailFromTels(idOrSlug);
      }
    } else {
      try {
        raw = await fetchDetailBySlug(idOrSlug);
      } catch (slugError) {
        if (!isHttpError(slugError, 404)) {
          logApiFailure('tels by-slug failed', slugError);
        }
        // Try search by string as last live attempt
        try {
          const search = await postCourseSearch({
            pageSize: 5,
            pageIndex: 0,
            searchString: idOrSlug,
          });
          const hit = (search?.results || []).find((r) => {
            const d = r?.data || {};
            return d.slug === idOrSlug
              || d.id === idOrSlug
              || (d.content?.displayName || '').toLowerCase().includes(idOrSlug);
          }) || search?.results?.[0];
          if (hit?.data?.id) {
            try {
              raw = await fetchDetailFromLms(hit.data.id);
            } catch {
              return mapSearchHitToCourse(hit, mock);
            }
          }
        } catch (searchError) {
          logApiFailure('slug search fallback failed', searchError);
        }
      }
    }

    if (raw) {
      return mapDetailToCourse(raw, mock);
    }
  } catch (error) {
    logApiFailure('fetchCourse → mock', error);
  }

  return mock || null;
}

/**
 * Suggested / related courses. Falls back to same-subject mock list.
 */
export async function fetchSuggestedCourses(course, limit = 4) {
  const courseKey = course?.courseKey || course?.id;
  const mockRelated = COURSES
    .filter((c) => c.subject === course?.subject && c.id !== course?.id)
    .slice(0, limit);

  if (Array.isArray(course?.suggestedCourses) && course.suggestedCourses.length) {
    return course.suggestedCourses.slice(0, limit);
  }

  if (!courseKey || !isCourseKey(courseKey)) {
    return mockRelated;
  }

  try {
    const { data } = await getHttpClient().get(getSuggestedCoursesUrl(courseKey), {
      params: { limit },
    });
    const payload = camelCaseObject(data);
    const results = Array.isArray(payload?.results) ? payload.results : [];
    const mapped = results.map((hit) => mapSearchHitToCourse(hit)).filter((c) => c?.id);
    return mapped.length ? mapped.slice(0, limit) : mockRelated;
  } catch (error) {
    logApiFailure('fetchSuggestedCourses → mock related', error);
    return mockRelated;
  }
}
