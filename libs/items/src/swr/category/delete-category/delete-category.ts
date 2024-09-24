import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CategorySWRKeys } from '../keys';
import { deleteCategory } from './service';
import { DeleteCategoryRequest, DeleteCategoryResponse } from './types';

export function useCategoryDelete() {
  const { authHeaders } = useAuth();
  const key = [CategorySWRKeys.CATEGORY, CategorySWRKeys.DETAILS, 'deletion'];

  return useSWRMutation<
    DeleteCategoryResponse,
    Error,
    string[] | null,
    Pick<DeleteCategoryRequest, 'categoryId'>
  >(key, (_, { arg }) => deleteCategory({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CategorySWRKeys.CATEGORY),
  });
}
