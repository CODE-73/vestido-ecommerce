import { useMemo } from 'react';

import { GetReturnableitemsResponse } from '@vestido-ecommerce/orders/client';

export const useReturnableItemsGroupedByFulfillment = (
  returnableItems: GetReturnableitemsResponse,
) => {
  return useMemo(
    () =>
      returnableItems.reduce(
        (a, b, idx) => {
          let fArray = a.find((x) => x.fulfillmentId === b.fulfillmentId);
          if (!fArray) {
            fArray = {
              deliveredDate: b.deliveredDate ?? new Date(),
              fulfillmentId: b.fulfillmentId,
              items: [],
            };
            a.push(fArray);
          }

          fArray.items.push({
            ...b,
            returnableItemIdx: idx,
          });
          return a;
        },
        [] as Array<{
          fulfillmentId: string;
          deliveredDate: Date;
          items: Array<
            GetReturnableitemsResponse[number] & {
              returnableItemIdx: number;
            }
          >;
        }>,
      ),
    [returnableItems],
  );
};
