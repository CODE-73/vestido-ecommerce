import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { getPickupLoc } from './service';

import { getPickupLocSWRKeys } from '../keys';
import { PickupLocationResponse } from 'libs/orders/src/services';

export function usePickupLoc() {
  const { authHeaders } = useAuth();
  const key = [getPickupLocSWRKeys.GET, getPickupLocSWRKeys.SHIPROCKET];

  return useSWRImmutable<PickupLocationResponse, Error>(key, () =>
    getPickupLoc(authHeaders),
  );
}
