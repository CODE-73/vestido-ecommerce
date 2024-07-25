import useSWRMutation from 'swr/mutation';

import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { AttributeUpsertSWRKeys } from '../keys';
import { upsertAttribute } from './service';
import { attributeUpsertRequest, attributeUpsertResponse } from './types';

export const useAttributeUpsert = () => {
  const key = [AttributeUpsertSWRKeys.ATTRIBUTE, AttributeUpsertSWRKeys.UPSERT];

  return useSWRMutation<
    attributeUpsertResponse,
    Error,
    string[] | null,
    attributeUpsertRequest
  >(key, (_, { arg }) => upsertAttribute({ ...arg }), {
    ...useClearCacheOnSuccess(AttributeUpsertSWRKeys.ATTRIBUTE),
  });
};
