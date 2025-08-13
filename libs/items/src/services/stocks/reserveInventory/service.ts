import type { PrismaTransactionalClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { reserveInventorySchema, reserveInventorySchemaType } from './zod';

type StockRow = { stockBalance: number };

export async function reserveInventory(
  prisma: PrismaTransactionalClient,
  data: reserveInventorySchemaType,
) {
  const validatedData = reserveInventorySchema.parse(data);

  for (const item of validatedData.items) {
    let currentStock: StockRow | undefined;

    if (item.itemVariantId === null) {
      [currentStock] = await prisma.$queryRaw<StockRow[]>`
        SELECT "stockBalance"
        FROM "Item"
        WHERE "id" = ${item.itemId}
        FOR UPDATE;
      `;
    } else {
      [currentStock] = await prisma.$queryRaw<StockRow[]>`
        SELECT "stockBalance"
        FROM "ItemVariant"
        WHERE "id" = ${item.itemVariantId}
        FOR UPDATE;
      `;
    }

    if (!currentStock) {
      throw new VestidoError({
        name: 'Item Not Found',
        message: `Item ${item.itemId} not found`,
        httpStatus: 400,
      });
    }

    if (currentStock.stockBalance < item.qty) {
      throw new VestidoError({
        name: 'Not Enough Stock',
        message: `Not enough stock to reserve for item ${item.itemId}`,
        httpStatus: 400,
      });
    }

    if (item.itemVariantId === null) {
      await prisma.item.update({
        where: {
          id: item.itemId,
        },
        data: {
          stockBalance: currentStock.stockBalance - item.qty,
        },
      });
    } else {
      await prisma.itemVariant.update({
        where: {
          id: item.itemVariantId,
        },
        data: {
          stockBalance: currentStock.stockBalance - item.qty,
        },
      });
    }

    await prisma.stockLedger.create({
      data: {
        qty: item.qty,
        balance: currentStock.stockBalance - item.qty,
        itemId: item.itemId,
        itemVariantId: item.itemVariantId ?? '',
        remarks: validatedData.remarks,
        refId: validatedData.refId,
      },
    });
  }
}
