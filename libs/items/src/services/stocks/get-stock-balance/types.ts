import { VestidoResponse } from '@vestido-ecommerce/utils';

import { getStockBalances } from './service';
import { GetStockBalanceInputSchemaType } from './zod';

export type GetStockBalanceArgs = GetStockBalanceInputSchemaType;

export type GetStockBalanceResult = Awaited<
  ReturnType<typeof getStockBalances>
>;

export type GetStockBalanceResponse = VestidoResponse<GetStockBalanceResult>;

export type StockBalanceRow = {
  itemId: string;
  itemVariantId: string | null;
  balance: number;
  hasVariants?: boolean;
};
