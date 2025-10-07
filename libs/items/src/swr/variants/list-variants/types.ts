import { VestidoResponse } from '@vestido-ecommerce/utils';

import { VariantListResult } from '../../../services';

export type VariantListRequest = {
  filters?: VariantListFilterParams;
};

export type VariantListResponse = VestidoResponse<VariantListResult>;

type VariantListFilterParams = {
  // name?: string;
  q?: string;
};
