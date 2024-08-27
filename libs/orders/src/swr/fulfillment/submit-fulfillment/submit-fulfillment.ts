import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { SubmitFulfillmentSWRKeys } from '../keys';
import { submitFulfillmentDetails } from './service';
import {
  UpdateFulfillmentRequest,
  UpdateFulfillmentResponse,
} from 'libs/orders/src/services/fulfillment/update-fulfillment/type';

export const useSubmitFulfillment = () => {
  const { authHeaders } = useAuth();
  const key = [
    SubmitFulfillmentSWRKeys.SUBMIT,
    SubmitFulfillmentSWRKeys.FULFILLMENT,
  ];

  return useSWRMutation<
    UpdateFulfillmentResponse,
    Error,
    string[] | null,
    string
  >(key, (_, { arg }) => submitFulfillmentDetails(arg, authHeaders), {
    ...useClearCacheOnSuccess(SubmitFulfillmentSWRKeys.FULFILLMENT),
  });
};
