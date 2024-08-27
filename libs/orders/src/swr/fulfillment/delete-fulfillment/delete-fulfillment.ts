import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { DeleteFulfillmentSWRKeys } from '../keys';
import { deleteFulfillmentDetails } from './service';
import { FulfillmentResponse } from 'libs/orders/src/services/fulfillment/update-fulfillment/type';

export const useDeleteFulfillment = () => {
  const { authHeaders } = useAuth();
  const key = [
    DeleteFulfillmentSWRKeys.DELETE,
    DeleteFulfillmentSWRKeys.FULFILLMENT,
  ];

  return useSWRMutation<FulfillmentResponse, Error, string[] | null, string>(
    key,
    (_, { arg }) => deleteFulfillmentDetails(arg, authHeaders),
    {
      ...useClearCacheOnSuccess(DeleteFulfillmentSWRKeys.FULFILLMENT),
    },
  );
};
