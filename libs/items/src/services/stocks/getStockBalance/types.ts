import { VestidoResponse } from '@vestido-ecommerce/utils';

import { getStockBalances } from './service';
import { getStockBalanceSchemaType } from './zod';

export type getStockBalanceRequest = {
  data: getStockBalanceSchemaType;
};

export type getStockBalanceResponse = {
  data: Awaited<ReturnType<typeof getStockBalances>>;
};

export type getStockBalanceSWRResponse =
  VestidoResponse<getStockBalanceResponse>;

export type StockBalanceRow = {
  itemId: string;
  itemVariantId: string | null;
  balance: number;
};
