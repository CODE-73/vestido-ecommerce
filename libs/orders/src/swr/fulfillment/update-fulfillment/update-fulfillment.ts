import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { UpdateFulfillmentRequest } from '../../../services/fulfillment/update-fulfillment/type';
import { FulfillmentResponse } from '../../../services/fulfillment/update-fulfillment/type';
import { UpdateFulfillmentSWRKeys } from '../keys';
import { updateFulfillmentDetails } from './service';

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
