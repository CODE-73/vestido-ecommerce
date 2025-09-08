import type { PrismaTransactionalClient } from '@vestido-ecommerce/models';
import { PrismaClient } from '@vestido-ecommerce/models';

import { getStockStatus } from '../get-stock-status';
import { StockBalanceRow } from './types';
import { GetStockBalanceInputSchemaType } from './zod';

type StockBalanceResult = {
  itemId: string;
  itemVariantId: string | null;
  stockBalance: number;
  stockStatus: 'OUT_OF_STOCK' | 'LIMITED_STOCK' | 'AVAILABLE';
  _stockBalanceRow: StockBalanceRow;
};

export async function getStockBalances(
  prisma: PrismaClient | PrismaTransactionalClient,
  items: GetStockBalanceInputSchemaType[],
): Promise<Record<string, StockBalanceResult>> {
  const itemIdsOnly = items
    .filter((i) => !i.itemVariantId)
    .map((i) => i.itemId);
  const variantIdsOnly = items
    .filter((i) => !!i.itemVariantId)
    .map((i) => i.itemVariantId!);

  const rows: StockBalanceRow[] = [];
  if (itemIdsOnly.length > 0) {
    rows.push(
      ...((await prisma.$queryRawUnsafe(
        `
      SELECT
        "id" AS "itemId",
             NULL AS "itemVariantId",
             "stockBalance" AS balance
      FROM "Item"
      WHERE "id" = ANY($1::uuid[])
      FOR UPDATE
      `,
        itemIdsOnly,
      )) as StockBalanceRow[]),
    );
  }

  if (variantIdsOnly.length > 0) {
    rows.push(
      ...((await prisma.$queryRawUnsafe(
        `
        SELECT "itemId",
              "id" AS "itemVariantId",
              "stockBalance" AS balance
        FROM "ItemVariant"
        WHERE "id" = ANY($1::uuid[])
        FOR UPDATE
        `,
        variantIdsOnly,
      )) as StockBalanceRow[]),
    );
  }

  const result: Record<string, StockBalanceResult> = {};

  for (const row of rows) {
    const key = row.itemVariantId ?? row.itemId;
    result[key] = {
      itemId: row.itemId,
      itemVariantId: row.itemVariantId,
      stockBalance: row.balance,
      stockStatus: getStockStatus(row.balance),
      _stockBalanceRow: row,
    };
  }

  return result;
}
