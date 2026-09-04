import { resolveMediaUrl } from './http';

const isCourseKey = (id) => typeof id === 'string' && id.startsWith('course-v1:');

const stripHtml = (html) => {
  if (!html || typeof html !== 'string') {
    return '';
  }
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const pick = (...values) => {
  const found = values.find((v) => v !== undefined && v !== null && v !== '');
  return found === undefined ? undefined : found;
};

const asNumber = (value, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const asArray = (value, fallback = []) => (Array.isArray(value) ? value : fallback);

const slugify = (text) => {
  if (!text) {
    return '';
  }
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Map one LMS / TitanEd search hit → public MFE course card model.
 * Missing marketing fields fall back to `mock` when provided.
 */
export const mapSearchHitToCourse = (hit, mock) => {
  const data = hit?.data || hit || {};
  const content = data.content || {};
  // eslint-disable-next-line no-underscore-dangle -- Open edX search hit id
  const courseKey = pick(data.id, data.course, hit?._id, mock?.courseKey);
  const title = pick(content.displayName, content.display_name, data.name, mock?.title) || 'Untitled course';
  const slug = pick(data.slug, mock?.id, slugify(title));
  const routeId = slug || courseKey || mock?.id;

  return {
    id: routeId,
    courseKey: courseKey || (isCourseKey(routeId) ? routeId : mock?.courseKey),
    title,
    org: pick(data.org, data.displayOrgWithDefault, mock?.org) || '',
    subject: pick(data.subject, mock?.subject) || 'General',
    skills: asArray(data.skills, mock?.skills || []),
    language: pick(data.language, mock?.language) || 'English',
    type: pick(data.type, mock?.type) || 'Course',
    level: pick(data.level, mock?.level) || 'Introductory',
    duration: pick(data.duration, data.effort ? `${data.effort} hours` : null, mock?.duration) || '',
    startDate: pick(data.startDateLabel, data.start_date_label, data.advertisedStart, data.start, mock?.startDate) || 'Self-paced',
    shortDesc: pick(content.shortDescription, content.short_description, data.shortDescription, mock?.shortDesc) || '',
    longDesc: pick(
      stripHtml(content.overview),
      stripHtml(data.overview),
      data.longDesc,
      mock?.longDesc,
    ) || '',
    free: typeof data.free === 'boolean'
      ? data.free
      : (mock?.free ?? !(asArray(data.modes).some((m) => ['verified', 'professional'].includes(m)))),
    image: resolveMediaUrl(pick(data.imageUrl, data.image_url, mock?.image)) || mock?.image || '',
    rating: asNumber(data.rating, mock?.rating ?? 4.5),
    reviews: asNumber(data.reviews, mock?.reviews ?? 0),
    modules: asArray(data.modules, mock?.modules || []),
    modes: asArray(data.modes, mock?.modes || []),
  };
};

/**
 * Map courseware / TitanEd detail payload → public MFE detail model.
 */
export const mapDetailToCourse = (raw, mock) => {
  if (!raw && !mock) {
    return null;
  }
  const data = raw || {};
  const media = data.media || {};
  const imagePath = pick(
    media.image?.large,
    media.image?.raw,
    media.courseImage?.uri,
    media.course_image?.uri,
    data.imageUrl,
    data.image_url,
    mock?.image,
  );
  const courseKey = pick(data.id, data.courseId, mock?.courseKey);
  const title = pick(data.name, data.displayName, mock?.title) || 'Untitled course';
  const slug = pick(data.slug, mock?.id, slugify(title));
  const enrollment = data.enrollment || {};

  const priceLabel = String(data.coursePrice || data.course_price || '').toLowerCase();
  let free = mock?.free;
  if (typeof data.free === 'boolean') {
    free = data.free;
  } else if (priceLabel.includes('free')) {
    free = true;
  } else if (typeof free !== 'boolean') {
    free = true;
  }

  const mapped = {
    id: slug || courseKey || mock?.id,
    courseKey: courseKey || (isCourseKey(slug) ? slug : mock?.courseKey),
    title,
    org: pick(data.displayOrgWithDefault, data.display_org_with_default, data.org, mock?.org) || '',
    subject: pick(data.subject, mock?.subject) || 'General',
    skills: asArray(data.skills, mock?.skills || []),
    language: pick(data.language, mock?.language) || 'English',
    type: pick(data.type, mock?.type) || 'Course',
    level: pick(data.level, mock?.level) || 'Introductory',
    duration: pick(data.duration, data.effort ? `${data.effort} hours` : null, mock?.duration) || '',
    startDate: pick(
      data.startDateLabel,
      data.start_date_label,
      data.advertisedStart,
      data.advertised_start,
      data.start,
      mock?.startDate,
    ) || 'Self-paced',
    shortDesc: pick(data.shortDescription, data.short_description, mock?.shortDesc) || '',
    longDesc: pick(stripHtml(data.overview), mock?.longDesc) || '',
    free,
    image: resolveMediaUrl(imagePath) || mock?.image || '',
    rating: asNumber(data.rating, mock?.rating ?? 4.5),
    reviews: asNumber(data.reviews, mock?.reviews ?? 0),
    modules: asArray(data.modules, mock?.modules || []).map((m) => ({
      title: m.title || m.displayName || '',
      description: m.description || '',
    })),
    instructor: data.instructor || mock?.instructor || null,
    testimonials: asArray(data.testimonials, mock?.testimonials || []),
    faq: asArray(data.faq, mock?.faq || []),
    canEnroll: data.canEnroll !== false && data.can_enroll !== false,
    isEnrolled: !!(enrollment.isActive || enrollment.is_active),
    invitationOnly: !!(data.invitationOnly || data.invitation_only),
    isCourseFull: !!(data.isCourseFull || data.is_course_full),
    ecommerceCheckout: !!(data.ecommerceCheckout || data.ecommerce_checkout),
    ecommerceCheckoutLink: pick(data.ecommerceCheckoutLink, data.ecommerce_checkout_link) || null,
    suggestedCourses: asArray(data.suggestedCourses || data.suggested_courses).map(
      (hit) => mapSearchHitToCourse(hit),
    ),
  };

  return mapped;
};

export const mapPromo = (raw, fallback) => {
  const promo = raw?.promo || raw || {};
  return {
    id: pick(promo.id, fallback.id),
    eyebrow: pick(promo.eyebrow, fallback.eyebrow),
    title: pick(promo.title, fallback.title),
    body: pick(promo.body, fallback.body),
    ctaLabel: pick(promo.ctaLabel, promo.cta_label, fallback.ctaLabel),
    ctaUrl: pick(promo.ctaUrl, promo.cta_url, fallback.ctaUrl),
    videoUrl: pick(promo.videoUrl, promo.video_url, fallback.videoUrl),
    posterUrl: pick(promo.posterUrl, promo.poster_url, fallback.posterUrl),
    youtubeId: pick(promo.youtubeId, promo.youtube_id, fallback.youtubeId),
    autoplay: promo.autoplay ?? fallback.autoplay ?? false,
    muted: promo.muted ?? fallback.muted ?? false,
  };
};

export { isCourseKey, stripHtml };
