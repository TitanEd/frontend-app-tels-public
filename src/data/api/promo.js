import { camelCaseObject } from '@edx/frontend-platform';

import { getHttpClient, logApiFailure } from './http';
import { mapPromo } from './mappers';
import { getHomePromoUrl } from './urls';

export const DEFAULT_HOME_PROMO = {
  id: 'home-promo-fallback',
  eyebrow: '',
  title: '',
  body: '',
  ctaLabel: '',
  ctaUrl: '/courses',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  posterUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=75',
  youtubeId: null,
  autoplay: false,
  muted: false,
};

/**
 * Home promo. Never throws — falls back to DEFAULT_HOME_PROMO media.
 */
export async function fetchHomePromo() {
  try {
    const { data } = await getHttpClient().get(getHomePromoUrl());
    const mapped = mapPromo(camelCaseObject(data), DEFAULT_HOME_PROMO);
    if (!mapped.videoUrl && !mapped.youtubeId) {
      return {
        ...mapped,
        videoUrl: DEFAULT_HOME_PROMO.videoUrl,
        posterUrl: mapped.posterUrl || DEFAULT_HOME_PROMO.posterUrl,
        fromFallback: true,
      };
    }
    return { ...mapped, fromFallback: false };
  } catch (error) {
    logApiFailure('fetchHomePromo → mock promo', error);
    return { ...DEFAULT_HOME_PROMO, fromFallback: true };
  }
}
