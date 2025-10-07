import type { PrismaTransactionalClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { StockBalanceRow } from '../get-stock-balance/types';
import { getStockStatus } from '../get-stock-status';
import { ReserveStockSchema, ReserveStockSchemaType } from './zod';

export async function reserveStock(
  prisma: PrismaTransactionalClient,
  data: ReserveStockSchemaType,
  stockBalances: StockBalanceRow[],
) {
  const validatedData = ReserveStockSchema.parse(data);

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

    if (stockRow.balance < inventoryItem.qty) {
      throw new VestidoError({
        name: 'Not Enough Stock',
        message: `Not enough stock to reserve for item ${inventoryItem.itemId}`,
        httpStatus: 400,
      });
    }
    const newBalance = stockRow.balance - inventoryItem.qty;

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
