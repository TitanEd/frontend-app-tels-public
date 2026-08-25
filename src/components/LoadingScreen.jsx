import { useIntl } from '@edx/frontend-platform/i18n';
import {
  CourseGridSkeleton,
  ModuleListSkeleton,
  Skeleton,
} from './Skeletons';
import messages from './loading-messages';
import './LoadingScreen.scss';

/** Full course-about layout skeleton (used by course detail loading). */
export const CourseAboutSkeleton = () => (
  <>
    <section className="tels-about-hero">
      <div className="tels-container">
        <Skeleton w={220} h={12} className="tels-course-detail__skeleton-mb" />
        <div className="tels-about-grid">
          <div>
            <Skeleton w={90} h={22} r={4} />
            <div className="tels-course-detail__spacer--12" />
            <Skeleton w="80%" h={44} />
            <div className="tels-course-detail__spacer--12" />
            <Skeleton w="95%" h={16} />
            <div className="tels-course-detail__spacer--8" />
            <Skeleton w="70%" h={16} />
            <div className="tels-course-detail__spacer--20" />
            <div className="tels-course-detail__meta-skeletons">
              <Skeleton w={100} h={14} />
              <Skeleton w={90} h={14} />
              <Skeleton w={110} h={14} />
              <Skeleton w={80} h={14} />
            </div>
          </div>
          <aside className="tels-enrollcard">
            <Skeleton w={90} h={30} />
            <div className="tels-course-detail__spacer--10" />
            <Skeleton w="100%" h={14} />
            <div className="tels-course-detail__spacer--18" />
            <Skeleton w="100%" h={42} r={8} />
            <div className="tels-course-detail__spacer--8" />
            <Skeleton w="100%" h={42} r={8} />
          </aside>
        </div>
      </div>
    </section>
    <section className="tels-section">
      <div className="tels-container">
        <Skeleton w={240} h={30} />
        <div className="tels-course-detail__spacer--24" />
        <div className="tels-grid tels-grid--3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="tels-benefit">
              <Skeleton w={44} h={44} r={10} />
              <div className="tels-course-detail__spacer--12" />
              <Skeleton w="60%" h={18} />
              <div className="tels-course-detail__spacer--8" />
              <Skeleton w="100%" h={14} />
              <div className="tels-course-detail__spacer--6" />
              <Skeleton w="80%" h={14} />
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="tels-section tels-section--subtle">
      <div className="tels-container">
        <Skeleton w={220} h={28} />
        <div className="tels-course-detail__spacer--20" />
        <ModuleListSkeleton count={5} />
      </div>
    </section>
    <section className="tels-section">
      <div className="tels-container">
        <Skeleton w={200} h={28} />
        <div className="tels-course-detail__spacer--20" />
        <CourseGridSkeleton count={4} cols={4} />
      </div>
    </section>
  </>
);

/**
 * Reusable loading UI for data-fetching pages (skeleton-based).
 *
 * Variants:
 * - page — generic page hero + course grid
 * - courses — course card grid
 * - courseDetail — full course-about skeleton
 * - inline — compact text lines
 * - custom — render `children`
 */
const LoadingScreen = ({
  variant = 'page',
  count,
  cols = 4,
  showLabel = true,
  children = null,
  className = '',
}) => {
  const intl = useIntl();
  const label = intl.formatMessage(messages.loadingLabel);
  const status = intl.formatMessage(messages.loadingData);
  const rootClass = [
    'tels-loading',
    `tels-loading--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  let body = null;
  if (variant === 'custom') {
    body = children;
  } else if (variant === 'courses') {
    body = <CourseGridSkeleton count={count ?? 12} cols={cols} />;
  } else if (variant === 'courseDetail') {
    body = <CourseAboutSkeleton />;
  } else if (variant === 'inline') {
    body = (
      <>
        <Skeleton w="40%" h={18} />
        <Skeleton w="100%" h={12} />
        <Skeleton w="85%" h={12} />
        <Skeleton w="60%" h={12} />
      </>
    );
  } else {
    body = (
      <div className="tels-container">
        <Skeleton w={120} h={14} />
        <div className="tels-loading__hero-title">
          <Skeleton w="55%" h={40} />
        </div>
        <div className="tels-loading__hero-lead">
          <Skeleton w="80%" h={16} />
          <Skeleton w="65%" h={16} />
        </div>
        <div className="tels-loading__section">
          <CourseGridSkeleton count={count ?? 4} cols={cols} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={rootClass}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={label}
    >
      <span className="tels-loading__status">{status}</span>
      {showLabel && (
        <p className="tels-loading__visible-status tels-container" aria-hidden="true">
          {status}
        </p>
      )}
      <div aria-hidden="true">
        {body}
      </div>
    </div>
  );
};

export default LoadingScreen;
export {
  Skeleton,
  CourseCardSkeleton,
  CourseGridSkeleton,
  ModuleListSkeleton,
} from './Skeletons';
