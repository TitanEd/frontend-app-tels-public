import './Skeletons.scss';

const toCssSize = (v) => (typeof v === 'number' ? `${v}px` : v);

export const Skeleton = ({
  w = '100%', h = 12, r = 6, className = '',
}) => (
  <div
    className={['tels-skeleton', className].filter(Boolean).join(' ')}
    style={{
      '--tels-skeleton-w': toCssSize(w),
      '--tels-skeleton-h': toCssSize(h),
      '--tels-skeleton-r': toCssSize(r),
    }}
  />
);

export const CourseCardSkeleton = () => (
  <div className="tels-card" aria-hidden>
    <Skeleton w="100%" h={0} r={0} className="tels-skeleton--media" />
    <div className="tels-card__body tels-card__body--skeleton">
      <Skeleton w={70} h={16} r={4} />
      <Skeleton w="90%" h={18} />
      <Skeleton w="55%" h={14} />
      <div className="tels-skeleton-meta">
        <Skeleton w={60} h={12} />
        <Skeleton w={70} h={12} />
        <Skeleton w={50} h={12} />
      </div>
    </div>
  </div>
);

export const CourseGridSkeleton = ({ count = 4, cols = 4 }) => (
  <div className={`tels-grid tels-grid--${cols}`}>
    {/* eslint-disable-next-line react/no-array-index-key -- anonymous placeholder list, no stable id */}
    {Array.from({ length: count }).map((_, i) => <CourseCardSkeleton key={i} />)}
  </div>
);

export const ModuleListSkeleton = ({ count = 5 }) => (
  <div aria-hidden>
    {Array.from({ length: count }).map((_, i) => (
      <div
        // eslint-disable-next-line react/no-array-index-key -- anonymous placeholder list, no stable id
        key={i}
        className="tels-syllabus-item tels-syllabus-item--skeleton"
      >
        <Skeleton w={`${45 + ((i * 7) % 25)}%`} h={16} />
        <Skeleton w={16} h={16} r={4} />
      </div>
    ))}
  </div>
);
