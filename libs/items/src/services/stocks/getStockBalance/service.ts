import { getPrismaClient } from '@vestido-ecommerce/models';

import { getStockBalanceSchema, getStockBalanceSchemaType } from './zod';

export async function getStockBalance(data: getStockBalanceSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = getStockBalanceSchema.parse(data);

  let latestStockBalanceDetails;

  if (validatedData.itemVariantId === null) {
    latestStockBalanceDetails = await prisma.stockLedger.findFirst({
      where: { itemId: validatedData.itemId },
      orderBy: { createdAt: 'desc' },
      select: { itemId: true, itemVariantId: true, balance: true },
    });
  } else {
    latestStockBalanceDetails = await prisma.stockLedger.findFirst({
      where: {
        itemId: validatedData.itemId,
        itemVariantId: validatedData.itemVariantId,
      },
      orderBy: { createdAt: 'desc' },
      select: { itemId: true, itemVariantId: true, balance: true },
    });
  }
  return latestStockBalanceDetails;
}
