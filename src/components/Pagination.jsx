import { useIntl } from '@edx/frontend-platform/i18n';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import messages from './pagination-messages';

/** Page numbers with the first, the last and a window around the current one. */
const pageItems = (current, total) => {
  const pages = new Set([1, total, current - 1, current, current + 1].filter((p) => p >= 1 && p <= total));
  const sorted = [...pages].sort((a, b) => a - b);
  const items = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) { items.push(`gap-${page}`); }
    items.push(page);
  });
  return items;
};

const Pagination = ({ page, pageCount, onChange }) => {
  const intl = useIntl();
  if (pageCount <= 1) { return null; }
  return (
    <nav className="tels-pagination" aria-label={intl.formatMessage(messages.label)}>
      <button
        type="button"
        className="tels-pagination__arrow"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label={intl.formatMessage(messages.previous)}
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>
      <ol className="tels-pagination__pages">
        {pageItems(page, pageCount).map((item) => (typeof item === 'string' ? (
          <li key={item} className="tels-pagination__gap" aria-hidden="true">…</li>
        ) : (
          <li key={item}>
            <button
              type="button"
              className={`tels-pagination__page${item === page ? ' is-current' : ''}`}
              onClick={() => onChange(item)}
              aria-current={item === page ? 'page' : undefined}
              aria-label={intl.formatMessage(messages.page, { page: item })}
            >
              {intl.formatNumber(item)}
            </button>
          </li>
        )))}
      </ol>
      <button
        type="button"
        className="tels-pagination__arrow"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        aria-label={intl.formatMessage(messages.next)}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
};

export default Pagination;
