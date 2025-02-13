import { useMemo } from 'react';

import { GetOrderResponse } from '@vestido-ecommerce/orders';

/**
 * Returns an Array of {
 *  ...orderItem,
 *  statuses: [
 *      { title: DELIVERED, qty: 1, fulfillmentId: '123123' },
 *      ...
 *  ]
 * }
 */
export const useOrderItemsDetailedStatus = (
  order: GetOrderResponse['data'] | null,
) => {
  return useMemo(() => {
    if (!order) {
      return [];
    }

    return order.orderItems.map((orderItem) => {
      const fulfillmentsWithTheOrderItem = order.fulfillments.filter((x) =>
        x.fulfillmentItems.some((y) => y.orderItemId === orderItem.id),
      );

      const statuses = fulfillmentsWithTheOrderItem.map((fulfillment) => {
        const matchingFulfillmentItem = fulfillment.fulfillmentItems.find(
          (item) => item.orderItemId === orderItem.id,
        );
        // const HasReturnInFulfillment =
        //   fulfillment.returns && fulfillment.returns.length > 0;
        // if (HasReturnInFulfillment) {
        //     fulfillment.returns.map((return) => return.returnItems.find((x) => x.orderItemId === orderItem.id ))
        // }
        return {
          title: fulfillment.status,
          qty: matchingFulfillmentItem?.quantity ?? 0,
          fulfillmentId: fulfillment.id,
        };
      });

      const returnItems = orderItem.returnItems || [];
      const returnInitiatedQty = returnItems.reduce(
        (acc, returnItem) => acc + returnItem.qty,
        0,
      );

      const hasFulfilledQty =
        orderItem.fulfilledQuantity && orderItem.fulfilledQuantity > 0;
      const hasReturnedOrReplacedQty =
        orderItem.replacedQty > 0 || orderItem.returnedQty > 0;
      const hasReturnInitiatedQty = returnItems.length > 0;

      return {
        ...orderItem,
        statuses,
        // remove the following after testing
        returnInitiatedQty,
        hasFulfilledQty,
        hasReturnedOrReplacedQty,
        hasReturnInitiatedQty,
      };
    });
  }, [order]);
};
