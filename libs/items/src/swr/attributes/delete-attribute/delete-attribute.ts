import useSWRMutation from 'swr/mutation';

import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { AttributeDetailsSWRKeys } from '../keys';
import { deleteAttribute } from './service';
import { DeleteAttributeRequest, DeleteAttributeResponse } from './types';

export function useAttributeDelete(attributeId: string) {
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
  >(key, (_, { arg }) => deleteAttribute({ ...arg }), {
    ...useClearCacheOnSuccess(AttributeDetailsSWRKeys.ATTRIBUTE),
  });
}
