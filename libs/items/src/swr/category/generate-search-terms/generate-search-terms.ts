import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth';

import { GenerateCategorySearchTermsResponse } from '../../../services/categories/generate-search-terms/types';
import { CategorySWRKeys } from '../keys';
import { getCategorySearchTerms } from './service';

export function useCategorySearchTerms(categoryId?: string | null) {
  const { authHeaders } = useAuth();

  const key = categoryId
    ? [
        CategorySWRKeys.CATEGORY,
        CategorySWRKeys.GENERATE_SEARCH_TERMS,
        categoryId,
      ]
    : null;

  return useSWRMutation<GenerateCategorySearchTermsResponse, Error>(key, () =>
    getCategorySearchTerms(categoryId as string, authHeaders),
  );
}