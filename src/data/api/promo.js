import { camelCaseObject } from '@edx/frontend-platform';

import { getHttpClient, logApiFailure } from './http';
import { mapPromo } from './mappers';
import { getHomePromoUrl } from './urls';

/**
 * Home promo video. Real API data only — no fake sample video/poster.
 * Returns null when the API has nothing real (no endpoint yet, request
 * failed, or the response has neither a video nor a YouTube id) so the
 * caller can hide the whole promo section instead of showing a placeholder.
 */
export async function fetchHomePromo() {
  try {
    const { data } = await getHttpClient().get(getHomePromoUrl());
    const mapped = mapPromo(camelCaseObject(data));
    if (!mapped.videoUrl && !mapped.youtubeId) {
      return null;
    }
    return mapped;
  } catch (error) {
    logApiFailure('fetchHomePromo failed', error);
    return null;
  }
}
