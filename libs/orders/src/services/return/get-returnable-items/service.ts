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
          status: {
            notIn: ['RETURNED', 'REJECTED'], // Exclude RETURNED and REJECTED statuses
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
        orderItem: {
          ...orderItem,
          returnableQty,
        },
      };
    }),
  );

  return filteredFulfillmentItems;
}
