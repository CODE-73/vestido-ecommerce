import { VestidoResponse } from '@vestido-ecommerce/utils';

import { getStockBalance } from './service';
import { getStockBalanceSchemaType } from './zod';

export type getStockBalanceRequest = {
  data: getStockBalanceSchemaType;
};

export type getStockBalanceResponse = {
  data: Awaited<ReturnType<typeof getStockBalance>>;
};

export type getStockBalanceSWRResponse =
  VestidoResponse<getStockBalanceResponse>;
