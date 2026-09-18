import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
import './VideoModal.scss';

/**
 * Extract a YouTube video id from common watch / youtu.be / embed URLs.
 */
export const getYoutubeId = (url) => {
  if (!url || typeof url !== 'string') {
    return null;
  }
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      return parsed.pathname.split('/').filter(Boolean)[0] || null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/')[2] || null;
      }
      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/')[2] || null;
      }
      return parsed.searchParams.get('v');
    }
  } catch {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
    return match?.[1] || null;
  }
  return null;
};

const VideoModal = ({
  open,
  onClose,
  videoUrl,
  title,
}) => {
  const intl = useIntl();
  const titleId = useId();
  const youtubeId = getYoutubeId(videoUrl);
  const isDirectVideo = videoUrl && /\.(mp4|webm|ogg)(\?|$)/i.test(videoUrl);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open || !videoUrl || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className="tels-video-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="tels-video-modal__backdrop"
        aria-label={intl.formatMessage(messages.closeVideo)}
        onClick={onClose}
      />
      <div className="tels-video-modal__panel">
        <div className="tels-video-modal__chrome">
          <h2 id={titleId} className="tels-video-modal__title">
            {title || intl.formatMessage(messages.videoTitle)}
          </h2>
          <button
            type="button"
            className="tels-video-modal__close"
            onClick={onClose}
            aria-label={intl.formatMessage(messages.closeVideo)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="tels-video-modal__player">
          {youtubeId && (
            <iframe
              title={title || intl.formatMessage(messages.videoTitle)}
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          {!youtubeId && isDirectVideo && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video controls autoPlay playsInline src={videoUrl} />
          )}
          {!youtubeId && !isDirectVideo && (
            <iframe
              title={title || intl.formatMessage(messages.videoTitle)}
              src={videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default VideoModal;
