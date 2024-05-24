import useSWRMutation from 'swr/mutation';
import { DeleteAttributeResponse, DeleteAttributeRequest } from './types';
import { deleteAttribute } from './service';
import { AttributeDetailsSWRKeys } from '../keys';

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
  >(key, (_, { arg }) => deleteAttribute({ ...arg }));
}
