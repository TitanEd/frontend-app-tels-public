import { useEffect } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

/**
 * Keeps <html lang> / dir in sync with the active intl locale (LTR ↔ RTL).
 * Does not change layout chrome — only document direction for CSS logical props.
 */
const LocaleDocument = () => {
  const { locale } = useIntl();

  useEffect(() => {
    const lang = (locale || 'en').toLowerCase();
    const rtl = lang === 'ar' || lang.startsWith('ar-')
      || lang === 'he' || lang.startsWith('he-')
      || lang === 'fa' || lang.startsWith('fa-');
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
};

export default LocaleDocument;
