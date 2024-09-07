import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { FulfillmentResponse } from '../../../services/fulfillment/update-fulfillment/type';
import { DeleteFulfillmentSWRKeys } from '../keys';
import { deleteFulfillmentDetails } from './service';

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
