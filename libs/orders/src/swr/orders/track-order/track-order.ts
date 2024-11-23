import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { TrackOrderSWRKeys } from '../keys';
import { trackOrder } from './service';
import { trackOrderResponse } from './types';

export function useTrackOrder(orderId?: string | null) {
  const { authHeaders } = useAuth();
  const key = orderId
    ? [TrackOrderSWRKeys.TRACK, TrackOrderSWRKeys.ORDER, orderId]
    : null;

  return useSWRImmutable<trackOrderResponse, Error>(key, () =>
    trackOrder(orderId as string, authHeaders),
  );
}
