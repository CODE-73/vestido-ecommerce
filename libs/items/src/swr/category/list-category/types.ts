import { VestidoResponse } from '@vestido-ecommerce/auth';
import { type ListCategoriesResponse as _ListCategoriesResponse } from '../../../services/categories/list-category/types';

export type ListCategoryResponse = VestidoResponse<_ListCategoriesResponse>;
