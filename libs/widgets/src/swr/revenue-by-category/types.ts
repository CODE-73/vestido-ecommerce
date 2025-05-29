import { VestidoResponse } from '@vestido-ecommerce/utils';

import { type RevenueByCategoryResult } from '../../services/revenue-by-category/types';

export type RevenueByCategoryResponse =
  VestidoResponse<RevenueByCategoryResult>;
