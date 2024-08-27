import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { UpdateFulfillmentSWRKeys } from '../keys';
import { updateFulfillmentDetails } from './service';
import { UpdateFulfillmentRequest } from 'libs/orders/src/services/fulfillment/update-fulfillment/type';
import { FulfillmentResponse } from 'libs/orders/src/services/fulfillment/update-fulfillment/type';

export const useUpdateFulfillment = () => {
  const { authHeaders } = useAuth();
  const key = [
    UpdateFulfillmentSWRKeys.UPDATE,
    UpdateFulfillmentSWRKeys.FULFILLMENT,
  ];

  return useSWRMutation<
    FulfillmentResponse,
    Error,
    string[] | null,
    UpdateFulfillmentRequest
  >(key, (_, { arg }) => updateFulfillmentDetails({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(UpdateFulfillmentSWRKeys.FULFILLMENT),
  });
};
