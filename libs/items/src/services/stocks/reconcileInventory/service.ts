import { getPrismaClient } from '@vestido-ecommerce/models';

import { stockUpdateSchema } from './zod';
import { stockUpdateSchemaType } from './zod';

export async function reconcileInventory(data: stockUpdateSchemaType) {
  const prisma = getPrismaClient();
  const validatedData = stockUpdateSchema.parse(data);

  await prisma.$transaction(async (prisma) => {
    if (validatedData.itemVariantId === null) {
      await prisma.item.update({
        where: {
          id: validatedData.itemId,
        },
        data: {
          stockBalance: validatedData.qty,
        },
      });
    } else {
      await prisma.itemVariant.update({
        where: {
          id: validatedData.itemVariantId,
        },
        data: {
          stockBalance: validatedData.qty,
        },
      });
    }

    await prisma.stockLedger.create({
      data: {
        qty: validatedData.qty,
        balance: validatedData.qty,
        itemId: validatedData.itemId,
        itemVariantId: validatedData.itemVariantId
          ? validatedData.itemVariantId
          : ' ',
        remarks: validatedData.remarks,
        refId: validatedData.refId,
      },
    });
  });

  return;
}
