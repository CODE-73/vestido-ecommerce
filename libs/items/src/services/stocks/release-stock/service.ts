import type { PrismaTransactionalClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { StockBalanceRow } from '../get-stock-balance';
import { getStockStatus } from '../get-stock-status';
import { ReleaseStockSchema, ReleaseStockSchemaType } from './zod';

export async function releaseStock(
  prisma: PrismaTransactionalClient,
  data: ReleaseStockSchemaType,
  stockBalances: StockBalanceRow[],
) {
  const validatedData = ReleaseStockSchema.parse(data);

  for (const inventoryItem of validatedData.items) {
    const stockRow = stockBalances.find(
      (s) =>
        s.itemId === inventoryItem.itemId &&
        s.itemVariantId === inventoryItem.itemVariantId,
    );
    if (!stockRow) {
      throw new VestidoError({
        name: 'Item Not Found',
        message: `Item ${inventoryItem.itemId} not found`,
        httpStatus: 400,
      });
    }

    const newBalance = stockRow.balance + inventoryItem.qty;

    if (inventoryItem.itemVariantId === null) {
      await prisma.item.update({
        where: {
          id: inventoryItem.itemId,
        },
        data: {
          stockBalance: newBalance,
          stockStatus: getStockStatus(newBalance),
        },
      });
    } else {
      await prisma.itemVariant.update({
        where: {
          id: inventoryItem.itemVariantId,
        },
        data: {
          stockBalance: newBalance,
          stockStatus: getStockStatus(newBalance),
        },
      });
    }

    await prisma.stockLedger.create({
      data: {
        qty: inventoryItem.qty,
        balance: newBalance,
        itemId: inventoryItem.itemId,
        itemVariantId: inventoryItem.itemVariantId ?? '',
        remarks: validatedData.remarks,
        refId: validatedData.refId,
      },
    });
  }
}
