import { PrismaClient } from '@prisma/client';

import { populateImageURLs } from '@vestido-ecommerce/caching';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export async function getReturnOrder(returnId: string) {
  const prisma = new PrismaClient();

  const returnOrder = await prisma.return.findUnique({
    where: {
      id: returnId,
    },
    include: {
      order: {
        include:{
          payments: true
        }
      },
      bankDetails: true,
      fulfillment: true,
      returnItems: {
        include: {
          orderItem: {
            include: {
              item: true,
              variant: true,
            },
          },
        },
      },
    },
  });

  if (returnOrder) {
    const images = returnOrder.returnItems.flatMap((returnItem) => [
      ...((returnItem.orderItem.item.images ?? []) as ImageSchemaType[]),
    ]);
    await populateImageURLs(images);
  }

  return returnOrder;
}
