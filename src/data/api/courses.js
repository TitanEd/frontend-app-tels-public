import { camelCaseObject } from '@edx/frontend-platform';

import { getHttpClient, getHttpStatus, logApiFailure } from './http';
import { isCourseKey, mapDetailToCourse, mapSearchHitToCourse } from './mappers';
import {
  getCatalogCourseDetailUrl,
  getCatalogCoursesUrl,
  getCatalogRecommendationsUrl,
} from './urls';

/**
 * Build the Error thrown for any failed catalog request.
 * API message (if any) is stored for display; local UI copy must use
 * intl.formatMessage — never rely on English embedded here for i18n.
 */
const buildApiError = (error, code = 'API_ERROR') => {
  const status = getHttpStatus(error);
  const responseData = camelCaseObject(error?.response?.data) || {};
  const apiMessage = responseData?.error?.message
    || (typeof responseData?.error === 'string' ? responseData.error : null)
    || responseData?.message
    || responseData?.detail
    || responseData?.developerMessage
    || null;
  const apiError = new Error(apiMessage || '');
  apiError.status = status;
  apiError.fromApi = !!apiMessage;
  apiError.code = code;
  return apiError;
};

/**
 * POST control-panel faceted course search
 * (`course_metadata.CourseListView` / `catalog_search.search_courses`).
 */
const postCourseSearch = async ({
  pageSize = 12,
  pageIndex = 0,
  searchString = '',
  filters = {},
}) => {
  const body = {
    page_size: pageSize,
    page_index: pageIndex,
    ...(searchString ? { search_string: searchString } : {}),
    ...filters,
  };

  const { data } = await getHttpClient().post(getCatalogCoursesUrl(), body, {
    headers: { 'Content-Type': 'application/json' },
  });
  return camelCaseObject(data);
};

/**
 * Fetch courses for Home / Catalog. Throws a real Error (API message first,
 * generic local message as fallback) on failure — callers (react-query)
 * surface this via isError/error rather than silently rendering mock data.
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
      .map((hit) => mapSearchHitToCourse(hit))
      .filter((c) => c?.id);

    return {
      courses,
      total: typeof data.total === 'number' ? data.total : courses.length,
      aggs: data.aggs || null,
    };
  } catch (error) {
    logApiFailure('fetchCourses failed', error);
    throw buildApiError(error, 'COURSES_LOAD_FAILED');
  }
}

/**
 * Convenience for pages that only need the course array.
 */
export async function fetchCoursesList(params) {
  const result = await fetchCourses(params);
  return result.courses;
}

const fetchDetailFromCatalog = async (courseId) => {
  const { data } = await getHttpClient().get(getCatalogCourseDetailUrl(courseId));
  return camelCaseObject(data);
};

/**
 * Resolve a marketing slug to a course key via catalog search, then load
 * detail. Control-panel has no by-slug route.
 */
const fetchDetailBySlug = async (slug) => {
  const search = await postCourseSearch({
    pageSize: 20,
    pageIndex: 0,
    searchString: slug,
  });
  const hit = (search?.results || []).find((r) => {
    const d = r?.data || {};
    return d.slug === slug
      || d.id === slug
      || (d.content?.displayName || d.content?.display_name || '').toLowerCase() === slug.toLowerCase();
  });
  const courseKey = hit?.data?.id || hit?.data?.course;
  if (!courseKey) {
    return hit ? { fromSearchHit: hit } : null;
  }
  try {
    return await fetchDetailFromCatalog(courseKey);
  } catch (detailError) {
    logApiFailure('catalog detail after slug search failed; using search hit', detailError);
    return { fromSearchHit: hit };
  }
};

/**
 * Fetch one course by LMS key or marketing slug.
 * Returns null when the course is not found (404 / no match).
 * Throws (API message first, local fallback second) on other failures.
 */
export async function fetchCourse(idOrSlug) {
  if (!idOrSlug) {
    return null;
  }

  try {
    let raw = null;

    if (isCourseKey(idOrSlug)) {
      raw = await fetchDetailFromCatalog(idOrSlug);
    } else {
      raw = await fetchDetailBySlug(idOrSlug);
      if (raw?.fromSearchHit) {
        return mapSearchHitToCourse(raw.fromSearchHit);
      }
    }

    return raw ? mapDetailToCourse(raw) : null;
  } catch (error) {
    const status = getHttpStatus(error);
    if (status === 404) {
      return null;
    }
    logApiFailure('fetchCourse failed', error);
    throw buildApiError(error, 'COURSE_DETAIL_LOAD_FAILED');
  }
}

/**
 * Suggested / related courses via control-panel recommendations.
 * Falls back to detail.suggestedCourses (already part of the real API
 * response), then an empty list — never mock courses.
 */
export async function fetchSuggestedCourses(course, limit = 4) {
  const courseKey = course?.courseKey || course?.id;

  if (Array.isArray(course?.suggestedCourses) && course.suggestedCourses.length) {
    return course.suggestedCourses.slice(0, limit);
  }

  if (!courseKey || !isCourseKey(courseKey)) {
    return [];
  }

  try {
    const { data } = await getHttpClient().get(getCatalogRecommendationsUrl(courseKey), {
      params: { limit },
    });
    const payload = camelCaseObject(data);
    const results = Array.isArray(payload?.results) ? payload.results : [];
    return results.map((hit) => mapSearchHitToCourse(hit)).filter((c) => c?.id).slice(0, limit);
  } catch (error) {
    logApiFailure('fetchSuggestedCourses failed', error);
    return [];
  }
}
