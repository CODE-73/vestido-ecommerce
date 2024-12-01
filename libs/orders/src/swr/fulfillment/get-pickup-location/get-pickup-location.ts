import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { PickupLocationResponse } from '../../../services';
import { getPickupLocSWRKeys } from '../keys';
import { getPickupLoc } from './service';

export function usePickupLoc() {
  const { authHeaders } = useAuth();
  const key = [getPickupLocSWRKeys.GET, getPickupLocSWRKeys.SHIPROCKET];

  return useSWRImmutable<PickupLocationResponse, Error>(key, () =>
    getPickupLoc(authHeaders),
  );
}
