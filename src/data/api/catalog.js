/**
 * Catalog data for the marketing pages, from the shared course_metadata API of control-panel
 * (the same endpoints template-1 uses; no per-template API):
 *
 *   GET /api/v1/catalog/courses/?featured=true&sort=promotion&page_size=3   home: Featured
 *   GET /api/v1/catalog/courses/?trending=true&sort=promotion&page_size=3   home: Trending
 *   GET /api/v1/catalog/courses/?sort=created_desc&page_size=3              home: Recently added
 *   GET /api/v1/catalog/courses/?start_after=<now>&sort=start_asc&page_size=3   home: Starting soon
 *   GET /api/v1/catalog/subjects/                                           header menu, home subject areas
 *
 * Every search hit is mapped to the course model the components here expect (CourseCard,
 * TrendingCard): see `mapCatalogHitToCourse`. All courses are free for now (product decision);
 * `free` from the API is kept on the model for later.
 */
import { getConfig } from '@edx/frontend-platform';

import { apiRequest } from '../../lib/api';

export const slugify = (text) => String(text || '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const lmsBase = () => String(getConfig().LMS_BASE_URL || '').replace(/\/$/, '');

/** A media path from the API (course image, org logo) as an absolute URL. */
export const resolveMediaUrl = (path) => {
  if (!path || typeof path !== 'string') { return ''; }
  if (/^(https?:|data:|blob:)/i.test(path)) { return path; }
  return `${lmsBase()}${path.startsWith('/') ? path : `/${path}`}`;
};

const buildQuery = (params) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') { return; }
    if (Array.isArray(value)) {
      value.forEach((item) => search.append(key, item));
    } else {
      search.set(key, String(value));
    }
  });
  const query = search.toString();
  return query ? `?${query}` : '';
};

/** "Available now" for started / self-paced courses, else the start date label the API gives. */
const availabilityOf = (data) => {
  if (data.self_paced) { return 'Available now'; }
  const start = data.start ? new Date(data.start) : null;
  if (!start || Number.isNaN(start.getTime()) || start <= new Date()) { return 'Available now'; }
  return data.start_date_label || 'Starts soon';
};

/** Map one search hit ({_id, data}) of /api/v1/catalog/courses/ to the marketing course model. */
export const mapCatalogHitToCourse = (hit) => {
  const data = hit?.data || hit || {};
  const content = data.content || {};
  const title = content.display_name || data.name || '';
  const courseKey = data.id || data.course || hit?._id || ''; // eslint-disable-line no-underscore-dangle
  // Open edX has no course duration; `effort` is the weekly time, free text ("3 hours per week") or
  // Studio's HH:MM. Cards show "<duration> long" only for a real duration and "<n> hours per week" otherwise.
  const effort = String(data.effort || data.duration || '').trim();
  const effortMatch = /^(\d{1,3}):(\d{2})$/.exec(effort);
  const effortHours = effortMatch
    ? Number(effortMatch[1]) + (Number(effortMatch[2]) ? Number(effortMatch[2]) / 60 : 0)
    : null;
  const isDuration = /\b(week|month|day|hour)s?\b/i.test(effort) && !/per\s+week|\/\s*week|weekly/i.test(effort);
  return {
    id: courseKey,
    courseKey,
    slug: data.slug || slugify(title) || courseKey,
    title,
    subject: data.subject || '',
    subjectSlug: slugify(data.subject || ''),
    level: data.level || '',
    difficulty: data.level || '',
    skills: Array.isArray(data.skills) ? data.skills : [],
    topics: Array.isArray(data.skills) ? data.skills : [],
    modality: 'Online',
    description: content.short_description || data.short_description || '',
    longDescription: '',
    price: 0, // every course is free for now; `free` keeps the API's answer
    free: data.free !== false,
    duration: isDuration ? effort : '',
    effort,
    effortHours,
    pace: data.self_paced ? 'Self-paced' : 'Instructor-paced',
    language: data.language || '',
    availability: availabilityOf(data),
    startDate: data.start || null,
    startDateLabel: data.start_date_label || '',
    createdAt: data.created || null,
    school: data.org || '',
    schoolSlug: slugify(data.org || ''),
    orgLogo: resolveMediaUrl(data.org_image_url),
    image: resolveMediaUrl(data.image_url),
    featured: Boolean(data.featured),
    trending: Boolean(data.trending),
    rating: Number(data.rating) || 0,
    reviews: Number(data.reviews) || 0,
    modes: Array.isArray(data.modes) ? data.modes : [],
  };
};

/**
 * Search / browse courses. `params` in API terms (snake_case keys are passed through):
 * page_size, page_index, search_string, org, language, modes, subject, level,
 * featured, trending, start_after, start_before, sort.
 */
export async function fetchCatalogCourses(params = {}) {
  const response = await apiRequest(`/api/v1/catalog/courses/${buildQuery(params)}`);
  if (!response.ok || !response.data) {
    return { courses: [], total: 0 };
  }
  const results = Array.isArray(response.data.results) ? response.data.results : [];
  const courses = results.map(mapCatalogHitToCourse).filter((course) => course.id);
  return { courses, total: Number(response.data.total) || courses.length };
}

/** The subject areas: [{id, name, icon, courseCount}] in the administrator's order. */
export async function fetchSubjects({ onlyWithCourses = false } = {}) {
  const response = await apiRequest(`/api/v1/catalog/subjects/${buildQuery({ only_with_courses: onlyWithCourses ? 1 : '' })}`);
  if (!response.ok || !response.data) { return []; }
  const results = Array.isArray(response.data.results) ? response.data.results : [];
  return results.map((subject) => ({
    id: subject.id,
    name: subject.name,
    icon: subject.icon || '',
    courseCount: Number(subject.course_count) || 0,
  }));
}

/** The four home page course sections, loaded in parallel. */
export async function fetchHomeSections({ limit = 3 } = {}) {
  const now = new Date().toISOString();
  const [featured, trending, recent, startingSoon] = await Promise.all([
    fetchCatalogCourses({ featured: true, sort: 'promotion', page_size: limit }),
    fetchCatalogCourses({ trending: true, sort: 'promotion', page_size: limit }),
    fetchCatalogCourses({ sort: 'created_desc', page_size: limit }),
    fetchCatalogCourses({ start_after: now, sort: 'start_asc', page_size: limit }),
  ]);
  return {
    featured: featured.courses,
    trending: trending.courses,
    recent: recent.courses,
    startingSoon: startingSoon.courses,
  };
}

/** Every value the catalog filters can offer: {subjects, skills, levels}, each [{id, name, courseCount, icon?}]. */
export async function fetchTaxonomy() {
  const response = await apiRequest('/api/v1/catalog/taxonomy/');
  const data = response.ok && response.data ? response.data : {};
  const rows = (list) => (Array.isArray(list) ? list : []).map((item) => ({
    id: item.id,
    name: item.name,
    icon: item.icon || '',
    courseCount: Number(item.course_count) || 0,
  }));
  return { subjects: rows(data.subjects), skills: rows(data.skills), levels: rows(data.levels) };
}

const stripHtml = (html) => String(html || '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const paceOf = (pacing, selfPaced) => {
  if (pacing === 'self' || selfPaced === true) { return 'Self-paced'; }
  if (pacing === 'instructor') { return 'Instructor-paced'; }
  return '';
};

/** Map /api/v1/catalog/courses/<key> to the detail model of CourseDetailPage. */
export const mapDetailToCourse = (data) => {
  if (!data || !data.id) { return null; }
  const media = data.media || {};
  const imagePath = media.image?.large || media.image?.raw || media.course_image?.uri || data.image_url || '';
  const title = data.name || data.display_name || '';
  const effort = String(data.effort || data.duration || '').trim();
  const effortMatch = /^(\d{1,3}):(\d{2})$/.exec(effort);
  const price = String(data.course_price || '');
  const free = data.free !== false || /free/i.test(price);
  const enrollment = data.enrollment || {};
  return {
    id: data.id,
    courseKey: data.id,
    slug: data.slug || slugify(title),
    title,
    description: data.short_description || '',
    overviewHtml: String(data.overview || ''),
    longDescription: stripHtml(data.overview),
    subject: data.subject || '',
    difficulty: data.level || '',
    level: data.level || '',
    topics: Array.isArray(data.skills) ? data.skills : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    modality: 'Online',
    language: data.language || '',
    duration: /\b(week|month|day)s?\b/i.test(effort) ? effort : '',
    effort,
    effortHours: effortMatch ? Number(effortMatch[1]) + Number(effortMatch[2]) / 60 : null,
    pace: paceOf(data.pacing, data.self_paced),
    startDate: data.start || null,
    startDateLabel: data.start_date_label || data.advertised_start || '',
    endDate: data.end || null,
    enrollmentStart: data.enrollment_start || null,
    enrollmentEnd: data.enrollment_end || null,
    availability: (() => {
      const start = data.start ? new Date(data.start) : null;
      if (data.pacing === 'self' || !start || Number.isNaN(start.getTime()) || start <= new Date()) {
        return 'Available now';
      }
      return data.start_date_label || 'Starts soon';
    })(),
    price: 0, // every course is free for now
    free,
    priceLabel: price,
    school: data.display_org_with_default || data.org || '',
    org: data.org || '',
    schoolSlug: slugify(data.org || ''),
    image: resolveMediaUrl(imagePath),
    videoUrl: media.course_video?.uri || '',
    modules: (Array.isArray(data.modules) ? data.modules : [])
      .map((m) => ({ title: m.title || '', description: m.description || '' }))
      .filter((m) => m.title),
    faq: Array.isArray(data.faq) ? data.faq : [],
    testimonials: Array.isArray(data.testimonials) ? data.testimonials : [],
    instructor: data.instructor || null,
    rating: Number(data.rating) || 0,
    reviews: Number(data.reviews) || 0,
    canEnroll: data.can_enroll !== false,
    isEnrolled: Boolean(enrollment.is_active),
    enrollmentMode: enrollment.mode || null,
    invitationOnly: Boolean(data.invitation_only),
    isCourseFull: Boolean(data.is_course_full),
    showCoursewareLink: Boolean(data.show_courseware_link),
    certificateStatus: data.certificate_data?.cert_status || 'none',
    suggestedCourses: (Array.isArray(data.suggested_courses) ? data.suggested_courses : []).map(mapCatalogHitToCourse),
  };
};

/** One course by key (GET /api/v1/catalog/courses/<key>). `null` when it is not visible / does not exist. */
export async function fetchCourseDetail(courseKey) {
  if (!courseKey) { return null; }
  const response = await apiRequest(`/api/v1/catalog/courses/${encodeURIComponent(courseKey)}`);
  if (!response.ok || !response.data) { return null; }
  return mapDetailToCourse(response.data);
}

/** The instructors of a course: [{name, title, image, bio}] (GET /api/v1/catalog/course-instructors/<key>/). */
export async function fetchCourseInstructors(courseKey) {
  const response = await apiRequest(`/api/v1/catalog/course-instructors/${encodeURIComponent(courseKey)}/`);
  const rows = response.ok && Array.isArray(response.data) ? response.data : [];
  return rows
    .map((row) => ({
      name: row.name || '',
      title: row.designation || row.title || '',
      image: resolveMediaUrl(row.profile_picture || row.image || ''),
      bio: row.bio || '',
    }))
    .filter((row) => row.name);
}

export const isCourseKey = (value) => typeof value === 'string' && /^course-v1:/.test(value);

/** Resolve a legacy /course/<slug> URL to a course key through the search API (same approach as template-1). */
export async function findCourseKeyBySlug(slug) {
  if (!slug) { return null; }
  if (isCourseKey(slug)) { return slug; }
  const { courses } = await fetchCatalogCourses({ search_string: slug.replace(/-/g, ' '), page_size: 20 });
  const match = courses.find((course) => course.slug === slug)
    || courses.find((course) => slugify(course.title) === slug);
  return match ? match.courseKey : null;
}
