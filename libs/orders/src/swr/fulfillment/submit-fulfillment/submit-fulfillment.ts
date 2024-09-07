import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { FulfillmentResponse } from '../../../services/fulfillment/update-fulfillment/type';
import { SubmitFulfillmentSWRKeys } from '../keys';
import { submitFulfillmentDetails } from './service';

export const useSubmitFulfillment = () => {
  const { authHeaders } = useAuth();
  const key = [
    SubmitFulfillmentSWRKeys.SUBMIT,
    SubmitFulfillmentSWRKeys.FULFILLMENT,
  ];

  return useSWRMutation<FulfillmentResponse, Error, string[] | null, string>(
    key,
    (_, { arg }) => submitFulfillmentDetails(arg, authHeaders),
    {
      ...useClearCacheOnSuccess(SubmitFulfillmentSWRKeys.FULFILLMENT),
    },
  );
};
