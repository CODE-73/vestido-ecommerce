import { PrismaClient } from '@prisma/client';

export async function getReturnOrder(returnId: string) {
  const prisma = new PrismaClient();

  const returnOrder = await prisma.return.findUnique({
    where: {
      id: returnId,
    },
    include: {
      order: true,
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

  return returnOrder;
}
