import type { PrismaTransactionalClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { StockBalanceRow } from '../getStockBalance';
import { releaseInventorySchema, releaseInventorySchemaType } from './zod';

export async function releaseInventory(
  prisma: PrismaTransactionalClient,
  data: releaseInventorySchemaType,
  stockBalances: StockBalanceRow[],
) {
  const validatedData = releaseInventorySchema.parse(data);

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
        },
      });
    } else {
      await prisma.itemVariant.update({
        where: {
          id: inventoryItem.itemVariantId,
        },
        data: {
          stockBalance: newBalance,
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
