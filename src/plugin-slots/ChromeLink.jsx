import { NavLink } from 'react-router-dom';

import { toPublicAppPath } from './publicUrls';

/** href is the real browser URL (/public, /public/courses?subject=…). */
const ChromeLink = ({ href, className, children, ...rest }) => {
  const inPublicApp = process.env.APP_ID === 'public';
  if (inPublicApp && href && !href.startsWith('//')) {
    const to = toPublicAppPath(href);
    if (to && !to.startsWith('http://') && !to.startsWith('https://')) {
      return <NavLink to={to} className={className} {...rest}>{children}</NavLink>;
    }
  }
  return <a href={href} className={className} {...rest}>{children}</a>;
};

export default ChromeLink;
