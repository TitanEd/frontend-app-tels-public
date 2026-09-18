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
 * Pure API mapping — no mock-data fallback; missing fields get a neutral
 * default (empty string / 'Course' / etc.), never a fabricated value.
 */
export const mapSearchHitToCourse = (hit) => {
  const data = hit?.data || hit || {};
  const content = data.content || {};
  // eslint-disable-next-line no-underscore-dangle -- Open edX search hit id
  const courseKey = pick(data.id, data.course, hit?._id);
  const title = pick(content.displayName, content.display_name, data.name) || '';
  const slug = pick(data.slug, slugify(title));
  const routeId = slug || courseKey;

  return {
    id: routeId,
    courseKey: courseKey || (isCourseKey(routeId) ? routeId : undefined),
    title,
    org: pick(data.org, data.displayOrgWithDefault) || '',
    subject: pick(data.subject) || '',
    skills: asArray(data.skills),
    language: pick(data.language) || '',
    type: pick(data.type) || 'Course',
    level: pick(data.level) || '',
    duration: pick(data.duration, data.effort ? `${data.effort}` : null) || '',
    startDate: pick(data.startDateLabel, data.start_date_label, data.advertisedStart, data.start) || '',
    shortDesc: pick(content.shortDescription, content.short_description, data.shortDescription) || '',
    longDesc: pick(
      stripHtml(content.overview),
      stripHtml(data.overview),
      data.longDesc,
    ) || '',
    free: typeof data.free === 'boolean'
      ? data.free
      : !(asArray(data.modes).some((m) => ['verified', 'professional'].includes(m))),
    image: resolveMediaUrl(pick(data.imageUrl, data.image_url)) || '',
    rating: asNumber(data.rating, 0),
    reviews: asNumber(data.reviews, 0),
    modules: asArray(data.modules),
    modes: asArray(data.modes),
  };
};

/**
 * Map courseware / TitanEd detail payload → public MFE detail model.
 * Pure API mapping — no mock-data fallback.
 */
export const mapDetailToCourse = (raw) => {
  if (!raw) {
    return null;
  }
  const data = raw;
  const media = data.media || {};
  const imagePath = pick(
    media.image?.large,
    media.image?.raw,
    media.courseImage?.uri,
    media.course_image?.uri,
    data.imageUrl,
    data.image_url,
  );
  const courseKey = pick(data.id, data.courseId);
  const title = pick(data.name, data.displayName) || '';
  const slug = pick(data.slug, slugify(title));
  const enrollment = data.enrollment || {};

  const price = pick(data.coursePrice, data.course_price) || '';
  const priceLabel = price.toLowerCase();
  let free = true;
  if (typeof data.free === 'boolean') {
    // Prefer explicit free flag, but trust a Free price label when they disagree.
    free = data.free || priceLabel.includes('free');
  } else if (priceLabel.includes('free')) {
    free = true;
  }

  const mapped = {
    id: slug || courseKey,
    courseKey: courseKey || (isCourseKey(slug) ? slug : undefined),
    title,
    org: pick(data.displayOrgWithDefault, data.display_org_with_default, data.org) || '',
    subject: pick(data.subject) || '',
    skills: asArray(data.skills),
    language: pick(data.language) || '',
    type: pick(data.type) || 'Course',
    level: pick(data.level) || '',
    duration: pick(data.duration, data.effort ? `${data.effort}` : null) || '',
    startDate: pick(
      data.startDateLabel,
      data.start_date_label,
      data.advertisedStart,
      data.advertised_start,
      data.start,
    ) || '',
    shortDesc: pick(data.shortDescription, data.short_description) || '',
    longDesc: pick(stripHtml(data.overview)) || '',
    free,
    price,
    image: resolveMediaUrl(imagePath) || '',
    rating: asNumber(data.rating, 0),
    reviews: asNumber(data.reviews, 0),
    modules: asArray(data.modules).map((m) => ({
      title: m.title || m.displayName || '',
      description: m.description || '',
    })).filter((m) => m.title),
    instructor: data.instructor || null,
    testimonials: asArray(data.testimonials),
    faq: asArray(data.faq),
    canEnroll: data.canEnroll !== false && data.can_enroll !== false,
    isEnrolled: !!(enrollment.isActive || enrollment.is_active),
    invitationOnly: !!(data.invitationOnly || data.invitation_only),
    isCourseFull: !!(data.isCourseFull || data.is_course_full),
    ecommerceCheckout: !!(data.ecommerceCheckout || data.ecommerce_checkout),
    ecommerceCheckoutLink: pick(data.ecommerceCheckoutLink, data.ecommerce_checkout_link) || null,
    requirements: pick(data.requirements) || '',
    videoUrl: pick(media.courseVideo?.uri, media.course_video?.uri) || '',
    certificateStatus: pick(data.certificateData?.certStatus, data.certificate_data?.cert_status) || 'none',
    suggestedCourses: asArray(data.suggestedCourses || data.suggested_courses).map(
      (hit) => mapSearchHitToCourse(hit),
    ),
  };

  return mapped;
};

export const mapPromo = (raw) => {
  const promo = raw?.promo || raw || {};
  return {
    id: promo.id || '',
    eyebrow: promo.eyebrow || '',
    title: promo.title || '',
    body: promo.body || '',
    ctaLabel: pick(promo.ctaLabel, promo.cta_label) || '',
    ctaUrl: pick(promo.ctaUrl, promo.cta_url) || '',
    videoUrl: pick(promo.videoUrl, promo.video_url) || '',
    posterUrl: pick(promo.posterUrl, promo.poster_url) || '',
    youtubeId: pick(promo.youtubeId, promo.youtube_id) || null,
    autoplay: promo.autoplay ?? false,
    muted: promo.muted ?? false,
  };
};

export { isCourseKey, stripHtml };
