import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { FulfillmentResponse } from '../../../services/fulfillment/update-fulfillment/type';
import { CancelFulfillmentSWRKeys } from '../keys';
import { updateFulfillmentCancelled } from './service';

export const useCancelFulfillment = () => {
  const { authHeaders } = useAuth();
  const key = [
    CancelFulfillmentSWRKeys.CANCEL,
    CancelFulfillmentSWRKeys.FULFILLMENT,
  ];

  return useSWRMutation<FulfillmentResponse, Error, string[] | null, string>(
    key,
    (_, { arg }) => updateFulfillmentCancelled(arg, authHeaders),
    {
      ...useClearCacheOnSuccess(CancelFulfillmentSWRKeys.FULFILLMENT),
    },
  );
};
