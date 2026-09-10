import { useEffect } from 'react';

/** Sets the browser tab title for a page. */
const useDocumentTitle = (title) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => { document.title = previous; };
  }, [title]);
};

export default useDocumentTitle;
