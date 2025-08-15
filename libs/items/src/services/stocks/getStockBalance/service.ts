import type { PrismaTransactionalClient } from '@vestido-ecommerce/models';

import { StockBalanceRow } from './types';
import { getStockBalanceSchemaType } from './zod';

export async function getStockBalances(
  prisma: PrismaTransactionalClient,
  items: getStockBalanceSchemaType[],
) {
  const itemIdsOnly = items
    .filter((i) => i.itemVariantId === null)
    .map((i) => i.itemId);
  const variantIdsOnly = items
    .filter((i) => i.itemVariantId !== null)
    .map((i) => i.itemVariantId!);

  const rows: StockBalanceRow[] = await prisma.$queryRawUnsafe(
    `
    (
      SELECT "id" AS "itemId",
             NULL AS "itemVariantId",
             "stockBalance" AS balance
      FROM "Item"
      WHERE "id" = ANY($1::uuid[])
    )
    UNION ALL
    (
      SELECT "itemId",
             "id" AS "itemVariantId",
             "stockBalance" AS balance
      FROM "ItemVariant"
      WHERE "id" = ANY($2::uuid[])
    )
    FOR UPDATE
  `,
    itemIdsOnly,
    variantIdsOnly,
  );

  return rows.map((row) => ({
    latestStockBalanceDetails: row,
    stockStatus:
      row.balance <= 0
        ? 'OUT_OF_STOCK'
        : row.balance < 20
          ? 'LIMITED_STOCK'
          : 'AVAILABLE',
  }));
}
