import { VestidoResponse } from '@vestido-ecommerce/auth/client';

import {
  ListCategoryArgs,
  ListCategoryResult,
} from '../../../services/categories/list-category/types';
export type ListCategoryRequest = ListCategoryArgs;
export type ListCategoryResponse = VestidoResponse<ListCategoryResult>;
