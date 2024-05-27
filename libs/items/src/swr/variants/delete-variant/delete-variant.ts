import useSWRMutation from 'swr/mutation';
import { DeleteVariantResponse, DeleteVariantRequest } from './types';
import { deleteVariant } from './service';
import { VariantDetailsSWRKeys } from '../keys';

export function useVariantDelete(variantId: string, itemId: string) {
  const key = [
    VariantDetailsSWRKeys.VARIANT,
    VariantDetailsSWRKeys.DETAILS,
    variantId,
    itemId,
  ];

  return useSWRMutation<
    DeleteVariantResponse,
    Error,
    string[] | null,
    Pick<DeleteVariantRequest, 'variantId'>
  >(key, (_, { arg }) => deleteVariant({ ...arg }, itemId));
}
