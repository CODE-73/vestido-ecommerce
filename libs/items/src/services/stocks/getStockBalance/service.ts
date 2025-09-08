import type { PrismaTransactionalClient } from '@vestido-ecommerce/models';
import { PrismaClient } from '@vestido-ecommerce/models';

import { StockBalanceRow } from './types';
import { getStockBalanceSchemaType } from './zod';

type StockBalanceResult = {
  latestStockBalanceDetails: StockBalanceRow;
  stockStatus: 'OUT_OF_STOCK' | 'LIMITED_STOCK' | 'AVAILABLE';
};

export async function getStockBalances(
  prisma: PrismaClient | PrismaTransactionalClient,
  items: getStockBalanceSchemaType[],
): Promise<Record<string, StockBalanceResult>> {
  const itemIdsOnly = items
    .filter((i) => !i.itemVariantId)
    .map((i) => i.itemId);
  const variantIdsOnly = items
    .filter((i) => !!i.itemVariantId)
    .map((i) => i.itemVariantId!);

  console.info({
    itemIdsOnly,
    variantIdsOnly,
  });

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
      latestStockBalanceDetails: row,
      stockStatus:
        row.balance <= 0
          ? 'OUT_OF_STOCK'
          : row.balance < 20
            ? 'LIMITED_STOCK'
            : 'AVAILABLE',
    };
  }

  return result;
}
