import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import {
  CreateCODRequest,
  CreateCODResponse,
} from './../../services/cod/types';
import { CreateOrderSWRKeys } from './../orders/keys';
import { createNewCOD } from './service';

export const useCreateCOD = () => {
  const { authHeaders } = useAuth();
  const key = [CreateOrderSWRKeys.CREATE, CreateOrderSWRKeys.ORDER];

  return useSWRMutation<
    CreateCODResponse,
    Error,
    string[] | null,
    CreateCODRequest
  >(key, (_, { arg }) => createNewCOD({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CreateOrderSWRKeys.ORDER),
  });
};
