import { useEffect } from 'react';
/**
 * Sets the browser tab title for a page. Lightweight stand-in for the
 * per-route `head()` meta the Lovable reference used (TanStack Router) —
 * avoids pulling in a head-management dependency for a single title string.
 */
const useDocumentTitle = (title) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => { document.title = previous; };
  }, [title]);
};
export default useDocumentTitle;
