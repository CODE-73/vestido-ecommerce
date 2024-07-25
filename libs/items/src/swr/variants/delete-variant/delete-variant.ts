import useSWRMutation from 'swr/mutation';

import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { VariantDetailsSWRKeys } from '../keys';
import { deleteVariant } from './service';
import { DeleteVariantRequest, DeleteVariantResponse } from './types';

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
  >(key, (_, { arg }) => deleteVariant({ ...arg }, itemId), {
    ...useClearCacheOnSuccess(VariantDetailsSWRKeys.VARIANT),
  });
}
