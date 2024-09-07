import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { AttributeDetailsSWRKeys } from '../keys';
import { deleteAttribute } from './service';
import { DeleteAttributeRequest, DeleteAttributeResponse } from './types';

export function useAttributeDelete(attributeId: string) {
  const { authHeaders } = useAuth();
  const key = [
    AttributeDetailsSWRKeys.ATTRIBUTE,
    AttributeDetailsSWRKeys.DETAILS,
    attributeId,
  ];

  return useSWRMutation<
    DeleteAttributeResponse,
    Error,
    string[] | null,
    Pick<DeleteAttributeRequest, 'attributeId'>
  >(key, (_, { arg }) => deleteAttribute({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(AttributeDetailsSWRKeys.ATTRIBUTE),
  });
}
