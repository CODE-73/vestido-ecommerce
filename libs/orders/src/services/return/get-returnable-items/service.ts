import { PrismaClient } from '@prisma/client';

export async function getReturnableItems(orderId: string) {
  const prisma = new PrismaClient();

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const fulfillmentitems = await prisma.fulfillmentItem.findMany({
    where: {
      fulfillment: {
        orderId: orderId,
        status: 'DELIVERED',
        deliveredDate: {
          gte: threeDaysAgo,
        },
      },
    },
    include: {
      orderItem: true,
    },
  });

  const fulfillments =
    fulfillmentitems.length > 0
      ? await prisma.fulfillment.findMany({
          where: {
            id: {
              in: fulfillmentitems.map((x) => x.fulfillmentId),
            },
          },
          select: {
            id: true,
            deliveredDate: true,
          },
        })
      : [];

  const filteredFulfillmentItems = await Promise.all(
    fulfillmentitems.map(async (fulfillmentItem) => {
      const orderItem = fulfillmentItem.orderItem;

      let returnableQty =
        orderItem.fulfilledQuantity && orderItem.fulfilledQuantity > 0
          ? orderItem.fulfilledQuantity
          : 0;
      returnableQty -= orderItem.returnedQty;
      returnableQty -= orderItem.replacedQty;

      const returnRecords = await prisma.return.findMany({
        where: {
          returnItems: {
            some: {
              orderItemId: orderItem.id, // check if orderItem is in returnItems
            },
          },
        },
        include: {
          returnItems: true,
        },
      });

      if (returnRecords.length > 0) {
        returnRecords.forEach((returnRecord) => {
          returnRecord.returnItems.forEach((returnItem) => {
            if (returnItem.orderItemId === orderItem.id) {
              returnableQty -= returnItem.qty || 0;
            }
          });
        });
      }

      return {
        ...fulfillmentItem,
        deliveredDate:
          fulfillments.find((x) => x.id === fulfillmentItem.fulfillmentId)
            ?.deliveredDate || null,
        orderItem: {
          ...orderItem,
          returnableQty,
        },
      };
    }),
  );

  return filteredFulfillmentItems.filter((x) => x.orderItem.returnableQty > 0);
}
