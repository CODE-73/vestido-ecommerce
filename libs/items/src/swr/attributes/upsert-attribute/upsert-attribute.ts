import useSWRMutation from 'swr/dist/mutation';
import { AttributeUpsertSWRKeys } from '../keys';
import { attributeUpsertRequest, attributeUpsertResponse } from './types';
import { upsertAttribute } from './service';

export const useAttributeUpsert = () => {
  const key = [AttributeUpsertSWRKeys.ATTRIBUTE, AttributeUpsertSWRKeys.UPSERT];

  return useSWRMutation<
    attributeUpsertResponse,
    Error,
    string[] | null,
    attributeUpsertRequest
  >(key, (_, { arg }) => upsertAttribute({ ...arg }));
};
