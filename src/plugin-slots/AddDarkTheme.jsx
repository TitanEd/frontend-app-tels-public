import { useEffect } from 'react';
import { getConfig } from '@edx/frontend-platform';
import './AddDarkTheme.scss';

const themeVariant = 'selected-paragon-theme-variant';
const AddDarkTheme = () => {
  const isThemeToggleEnabled = getConfig().INDIGO_ENABLE_DARK_TOGGLE;
  useEffect(() => {
    const theme = window.localStorage.getItem(themeVariant);
    const observer = new MutationObserver(() => {
      const iframes = document.getElementsByTagName('iframe');
      Array.from(iframes).forEach((iframe) => {
        if (!iframe.contentDocument) {
          return;
        }
        const style = document.createElement('style');
        style.textContent = `
          body { background-color: #0D0D0E; color: #ccc; }
          a { color: #ccc; }
          a:hover { color: #d3d3d3; }
        `;
        iframe.contentDocument.head.appendChild(style);
      });
    });
    if (isThemeToggleEnabled && theme === 'dark') {
      document.documentElement.setAttribute('data-paragon-theme-variant', 'dark');
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 15000);
    }
    return () => observer.disconnect();
  }, [isThemeToggleEnabled]);
  return null;
};
export default AddDarkTheme;
