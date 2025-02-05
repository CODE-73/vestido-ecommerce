import React from 'react';

import { UseFormReturn } from 'react-hook-form';
import { LuMinus, LuPlus } from 'react-icons/lu';

import {
  GetOrderResponse,
  GetReturnableitemsResponse,
} from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@vestido-ecommerce/shadcn-ui/dialog';

import ItemImage from '../../components/item-image';
import { InputElement } from '../../forms/input-element';
import { useReturnableItemsGroupedByFulfillment } from '../../hooks/useReturnableItemsGroupedByFulfillment';
import { ReturnReplaceForm } from './return-exchange-dialog';

type selectItemProps = {
  form: UseFormReturn<ReturnReplaceForm>;
  isReturn?: boolean;
  returnableItems: GetReturnableitemsResponse;
  order: GetOrderResponse['data'];
  setActiveDialog: (dialog: string) => void;
};

const formattedDate = (date: Date | string | number) => {
  const validDate = new Date(date); // Ensure it's a Date object
  if (isNaN(validDate.getTime())) return 'Invalid Date'; // Handle invalid dates

  return validDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // AM/PM format
  });
};

export const SelectItems: React.FC<selectItemProps> = ({
  form,
  isReturn,
  returnableItems,
  order,
  setActiveDialog,
}) => {
  const ItemsGroupedByFulfillment =
    useReturnableItemsGroupedByFulfillment(returnableItems);

  const getReturnableItemDetails = (
    itemId: string,
    order: GetOrderResponse['data'],
  ) => {
    const details = order?.orderItems.find((x) => x.itemId === itemId);
    return details;
  };
  return (
    <>
      <DialogTitle>
        {isReturn ? <div>Return Items</div> : <div>Exchange Items</div>}
      </DialogTitle>

      <DialogDescription className="text-xs w-full">
        Select Item(s) to&nbsp;
        {isReturn ? (
          <span>return</span>
        ) : (
          <span>
            exchange. If you want a different size or color, you might need to
            return this, and order your preferred variant separately.
          </span>
        )}
      </DialogDescription>
      <div className="flex flex-col gap-3">
        {ItemsGroupedByFulfillment.map((fulfillment) => (
          <div
            key={fulfillment.fulfillmentId}
            className="bg-gray-300 p-2 rounded-lg"
          >
            <div className="text-xs text-gray-500">
              Delivered on {formattedDate(fulfillment.deliveredDate)}
            </div>
            <hr className="border-gray-400" />
            {fulfillment.items.map((item) => {
              const orderItemDetails = getReturnableItemDetails(
                item.orderItem.itemId,
                order,
              );
              const itemQty = form.getValues(
                `returnItems.${item.returnableItemIdx}.quantity`,
              );
              return (
                <div key={item.orderItemId} className="py-3 grid grid-cols-11">
                  {orderItemDetails && (
                    <>
                      <ItemImage
                        item={orderItemDetails.item}
                        width={50}
                        height={70}
                        className="w-10 h-12 justify-self-center col-span-2"
                      />
                      <div className="text-xs col-span-6 pl-1">
                        {orderItemDetails.item.title}
                      </div>
                    </>
                  )}

                  {/* Quantity selector */}
                  <div className="max-h-8 flex flex-row text-neutral-500 gap-2 border border-neutral-500 rounded-full w-[100px] items-center justify-between px-2">
                    {/* Decrement Button */}
                    <div
                      className="text-zinc-300 cursor-pointer"
                      onClick={() => {
                        const path =
                          `returnItems.${item.returnableItemIdx}.quantity` as const;
                        const currentValue = form.getValues(path);
                        const currentQty = Math.max(
                          0,
                          parseInt(String(currentValue), 10) || 0,
                        );

                        if (currentQty > 0) {
                          form.setValue(path, currentQty - 1);
                        }
                      }}
                    >
                      <LuMinus className="border-black" />
                    </div>

                    {/* Quantity Input */}
                    <InputElement
                      name={`returnItems.${item.returnableItemIdx}.quantity`}
                      readOnly
                      className=" p-0 text-center max-h-8 bg-transparent max-w-6 border border-1 border-x-neutral-400 rounded-none focus:border-none focus-visible:ring-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      // type="number"
                      validation={{
                        min: 0,
                        max: item.quantity,
                      }}
                      wrapperClassName="w-6 text-center bg-transparent border-none"
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 0 && value <= item.quantity) {
                          form.setValue(
                            `returnItems.${item.returnableItemIdx}.quantity`,
                            value,
                          );
                        }
                      }}
                    />

                    {/* Increment Button */}
                    <div
                      className={`cursor-pointer ${
                        itemQty >= item.quantity
                          ? 'pointer-events-none opacity-50'
                          : ''
                      }`}
                      onClick={() => {
                        const path =
                          `returnItems.${item.returnableItemIdx}.quantity` as const;
                        const currentValue = form.getValues(path);
                        const currentQty = Math.max(
                          0,
                          parseInt(String(currentValue), 10) || 0,
                        );

                        if (currentQty < item.quantity) {
                          form.setValue(
                            `returnItems.${item.returnableItemIdx}.quantity`,
                            currentQty + 1,
                          );
                        }
                      }}
                    >
                      <LuPlus />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <DialogFooter>
        {isReturn ? (
          <Button
            onClick={() => setActiveDialog('selectReason')}
            type="button"
            className="w-full"
          >
            Next
          </Button>
        ) : (
          <Button className="w-full mt-5" type="submit">
            Confirm Exchange
          </Button>
        )}
      </DialogFooter>
    </>
  );
};
