import { getPrismaClient } from '@vestido-ecommerce/models';

import { getStockBalances } from '../get-stock-balance';
import { getStockStatus } from '../get-stock-status';
import { ReconcileStockSchema } from './zod';
import { ReconcileStockSchemaType } from './zod';

export async function reconcileStock(data: ReconcileStockSchemaType) {
  const prisma = getPrismaClient();
  const validatedData = ReconcileStockSchema.parse(data);

  await prisma.$transaction(async (prisma) => {
    // Acquire Lock on Stock Balances
    const balances = await getStockBalances(prisma, [
      {
        itemId: validatedData.itemId,
        itemVariantId: validatedData.itemVariantId
          ? validatedData.itemVariantId
          : undefined,
      },
    ]);
    const currentBalance =
      balances[validatedData.itemVariantId ?? validatedData.itemId]
        .stockBalance;

    if (!validatedData.itemVariantId) {
      await prisma.item.update({
        where: {
          id: validatedData.itemId,
        },
        data: {
          stockBalance: validatedData.qty,
          stockStatus: getStockStatus(validatedData.qty),
        },
      });
    } else {
      await prisma.itemVariant.update({
        where: {
          id: validatedData.itemVariantId,
        },
        data: {
          stockBalance: validatedData.qty,
          stockStatus: getStockStatus(validatedData.qty),
        },
      });
    }

    await prisma.stockLedger.create({
      data: {
        qty: validatedData.qty - currentBalance,
        balance: validatedData.qty,
        itemId: validatedData.itemId,
        itemVariantId: validatedData.itemVariantId
          ? validatedData.itemVariantId
          : null,
        remarks: validatedData.remarks,
        refId: validatedData.refId,
      },
    });
  });

  return {
    itemId: validatedData.itemId,
    itemVariantId: validatedData.itemVariantId
      ? validatedData.itemVariantId
      : undefined,
    stockBalance: validatedData.qty,
    stockStatus: getStockStatus(validatedData.qty),
  };
}
