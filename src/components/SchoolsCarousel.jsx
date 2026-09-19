import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import messages from './schools-carousel-messages';

const visibleForWidth = (w) => {
  if (w < 640) return 2;
  if (w < 1024) return 3;
  return 5;
};

/**
 * PLL-style schools logo carousel (slick-like): N logos visible, prev/next chevrons.
 */
const SchoolsCarousel = ({ schools }) => {
  const intl = useIntl();
  const items = schools.filter((s) => s.logo);
  const [visible, setVisible] = useState(5);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const sync = () => setVisible(visibleForWidth(window.innerWidth));
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  const maxIndex = Math.max(0, items.length - visible);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  if (!items.length) return null;

  const slidePct = 100 / visible;
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  return (
    <div className="tels-orgs-carousel">
      <button
        type="button"
        className="tels-orgs-carousel__arrow tels-orgs-carousel__arrow--prev"
        aria-label={intl.formatMessage(messages.previous)}
        onClick={prev}
        disabled={!canPrev}
      >
        <ChevronLeft size={40} strokeWidth={3} aria-hidden="true" />
      </button>

      <div className="tels-orgs-carousel__viewport">
        <div
          className="tels-orgs-carousel__track"
          style={{ transform: `translate3d(-${index * slidePct}%, 0, 0)` }}
        >
          {items.map((s) => (
            <div
              key={s.slug}
              className="tels-orgs-carousel__slide"
              style={{ flex: `0 0 ${slidePct}%`, maxWidth: `${slidePct}%` }}
            >
              <Link to={`/school/${s.slug}`} className="tels-orgs-carousel__item">
                <img
                  src={s.logo}
                  alt={intl.formatMessage(messages.logoAlt, { name: s.name })}
                />
                <span className="tels-orgs-carousel__name">{s.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="tels-orgs-carousel__arrow tels-orgs-carousel__arrow--next"
        aria-label={intl.formatMessage(messages.next)}
        onClick={next}
        disabled={!canNext}
      >
        <ChevronRight size={40} strokeWidth={3} aria-hidden="true" />
      </button>
    </div>
  );
};

export default SchoolsCarousel;
