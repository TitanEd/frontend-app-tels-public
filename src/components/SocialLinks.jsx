import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF, faInstagram, faLinkedinIn, faTwitter, faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export const SOCIAL_ICONS = {
  facebook: faFacebookF,
  instagram: faInstagram,
  twitter: faTwitter,
  linkedin: faLinkedinIn,
  youtube: faYoutube,
};

const SOCIAL_NAMES = {
  facebook: 'Facebook', instagram: 'Instagram', twitter: 'X', linkedin: 'LinkedIn', youtube: 'YouTube',
};

/** Social media links from the footer settings ([{name, url, label?}]) as icon buttons. */
const SocialLinks = ({ links, className = 'tels-social', label }) => {
  const rows = (links || []).filter((link) => SOCIAL_ICONS[link.name]);
  if (!rows.length) { return null; }
  return (
    <ul className={className} aria-label={label}>
      {rows.map((link) => (
        <li key={link.name}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label || SOCIAL_NAMES[link.name]}
            title={link.label || SOCIAL_NAMES[link.name]}
          >
            <FontAwesomeIcon icon={SOCIAL_ICONS[link.name]} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
