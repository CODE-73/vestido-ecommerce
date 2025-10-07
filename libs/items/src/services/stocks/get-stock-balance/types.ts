import { getStockBalances } from './service';
import { GetStockBalanceInputSchemaType } from './zod';

export type GetStockBalanceArgs = GetStockBalanceInputSchemaType;

export type GetStockBalanceResult = Awaited<
  ReturnType<typeof getStockBalances>
>;

export type StockBalanceRow = {
  itemId: string;
  itemVariantId: string | null;
  balance: number;
  hasVariants?: boolean;
};
