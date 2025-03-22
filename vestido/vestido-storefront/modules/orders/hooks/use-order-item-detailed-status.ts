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
      // Fulfillments that handled current Order Item
      const fulfillments = order.fulfillments.filter((x) =>
        x.fulfillmentItems.some((y) => y.orderItemId === orderItem.id),
      );

      const statuses = fulfillments
        .reduce(
          (_statuses, fulfillment) => {
            const fulfillmentItem = fulfillment.fulfillmentItems.find(
              (item) => item.orderItemId === orderItem.id,
            );

            let fulfilledQty = fulfillmentItem?.quantity ?? 0;
            if (fulfillment.returns?.length > 0) {
              const returns = fulfillment.returns.filter((x) =>
                x.returnItems.some((y) => y.orderItemId === orderItem.id),
              );
              for (const _return of returns) {
                const returnItem = _return.returnItems.find(
                  (x) => x.orderItemId === orderItem.id,
                );
                if (!returnItem) {
                  continue;
                }

                const returnQty = returnItem.qty ?? 0;
                fulfilledQty -= returnQty;
                _statuses.push({
                  title: `RETURN:${_return.status}`,
                  qty: returnQty,
                  fulfillmentId: `${fulfillment.id}/${_return.id}`,
                  return: true,
                });
              }
            }

            _statuses.push({
              title: fulfillment.status,
              qty: fulfilledQty,
              fulfillmentId: fulfillment.id,
            });

            return _statuses;
          },
          [] as Array<{
            title: string;
            qty: number;
            fulfillmentId: string;
            return?: boolean;
          }>,
        )
        .filter((x) => x.qty > 0);

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

export type OrderItemDetailedStatus = ReturnType<
  typeof useOrderItemsDetailedStatus
>[number];
