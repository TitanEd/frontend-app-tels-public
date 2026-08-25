import { useEffect, useState } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Icon } from '@openedx/paragon';
import { Nightlight, WbSunny } from '@openedx/paragon/icons';
import './ToggleThemeButton.scss';

const themeCookie = 'selected-paragon-theme-variant';
const ToggleThemeButton = () => {
  const intl = useIntl();
  const isThemeToggleEnabled = getConfig().INDIGO_ENABLE_DARK_TOGGLE;
  const initialDark = typeof document !== 'undefined'
        && document.cookie.split('; ').find((row) => row.startsWith(`${themeCookie}=`))?.split('=')[1] === 'dark';
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(initialDark);
  const getCookie = (name) => document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
  const setCookie = (name, value, domain) => {
    const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; domain=${domain}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
  };
  const onToggleTheme = () => {
    const nextIsDark = getCookie(themeCookie) !== 'dark';
    const theme = nextIsDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-paragon-theme-variant', theme);
    setIsDarkThemeEnabled(nextIsDark);
    window.localStorage.setItem(themeCookie, theme);
    setTimeout(() => {
      setCookie(themeCookie, theme, new URL(getConfig().LMS_BASE_URL).hostname);
      window.location.reload();
    }, 1);
  };
  useEffect(() => {
    const cookieTheme = getCookie(themeCookie);
    if (!cookieTheme || cookieTheme === 'undefined') {
      return;
    }
    if (cookieTheme !== window.localStorage.getItem(themeCookie)) {
      window.localStorage.setItem(themeCookie, cookieTheme);
      window.location.reload();
    }
    setIsDarkThemeEnabled(cookieTheme === 'dark');
  }, []);
  if (!isThemeToggleEnabled) {
    return null;
  }
  const label = intl.formatMessage({
    id: 'header.user.theme',
    defaultMessage: 'Toggle theme',
    description: 'Toggle between light and dark theme',
  });
  return (
    <div className="indigo-theme-toggle" title={label}>
      <span className="indigo-theme-toggle__icon" aria-hidden="true">
        <Icon src={WbSunny} />
      </span>
      <label className="indigo-theme-toggle__switch" htmlFor="indigo-theme-toggle-input">
        <input id="indigo-theme-toggle-input" type="checkbox" role="switch" checked={isDarkThemeEnabled} onChange={onToggleTheme} aria-label={label} />
        <span className="indigo-theme-toggle__slider" />
      </label>
      <span className="indigo-theme-toggle__icon" aria-hidden="true">
        <Icon src={Nightlight} />
      </span>
    </div>
  );
};
export default ToggleThemeButton;
