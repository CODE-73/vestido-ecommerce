import { VestidoResponse } from '@vestido-ecommerce/utils';

import { getStockBalances } from './service';
import { GetStockBalanceInputSchemaType } from './zod';

export type getStockBalanceRequest = {
  data: GetStockBalanceInputSchemaType;
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
