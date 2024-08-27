import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CreateFulfillmentSWRKeys } from '../keys';
import { createNewFulfillment } from './service';
import { CreateFulfillmentRequest } from 'libs/orders/src/services/fulfillment/create-fulfillment';
import { FulfillmentResponse } from 'libs/orders/src/services';

export const useCreateFulfillment = () => {
  const { authHeaders } = useAuth();
  const key = [
    CreateFulfillmentSWRKeys.CREATE,
    CreateFulfillmentSWRKeys.FULFILLMENT,
  ];

  return useSWRMutation<
    FulfillmentResponse,
    Error,
    string[] | null,
    CreateFulfillmentRequest
  >(key, (_, { arg }) => createNewFulfillment({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CreateFulfillmentSWRKeys.FULFILLMENT),
  });
};
