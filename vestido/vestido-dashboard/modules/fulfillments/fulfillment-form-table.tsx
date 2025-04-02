import { FC } from 'react';
import Image from 'next/image';

import { OrderItem } from '@prisma/client';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { LuPlus, LuTrash } from 'react-icons/lu';

import { FulfillmentDetailsResponse } from '@vestido-ecommerce/orders/client';
import { useOrder } from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { InputElement } from '../../forms/input-element';
import { SelectElement } from '../../forms/select-element';
import FulfillmentItemSizePrice from './fulfillment-item-size-price';
import { UpdateFulfillmentForm } from './FulfillmentForm';

type FulfillmentFormTableProps = {
  orderId: string;
  fulfillment: FulfillmentDetailsResponse['data'] | null;
};

const FulfillmentFormTable: FC<FulfillmentFormTableProps> = ({
  orderId,
  fulfillment,
}) => {
  const form = useFormContext<UpdateFulfillmentForm>();
  const { data: { data: order } = { data: null } } = useOrder(orderId);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
    keyName: '_id' as 'id',
  });

  const getImage = (fulfillmentItemId: string) => {
    const fulfillingItem = fulfillment?.fulfillmentItems.find(
      (x) => x.id === fulfillmentItemId,
    );
    if (!fulfillmentItemId) {
      return null;
    }

    const images = fulfillingItem?.orderItem.item.images as ImageSchemaType[];
    if (!images || !images.length) {
      return null;
    }
    return images.find((x) => x.default) ?? images[0];
  };
  const fulfillingItems = form.watch('items') ?? [];

  const getAvailableOrderItems = (orderItems: OrderItem[]) => {
    const fulfillmentItemIds = fulfillingItems.map((item) => item.orderItemId);
    return orderItems.filter((item) => !fulfillmentItemIds.includes(item.id));
  };

  const availableOrderItems = getAvailableOrderItems(order?.orderItems ?? []);

  const titleFromOrderItemId = (orderItemId: string) => {
    const orderItem = order?.orderItems.find((x) => x.id === orderItemId);
    if (!orderItemId) {
      return null;
    }

    return orderItem?.item.title;
  };

  return (
    <>
      <div className="text-xl mt-10">Fulfilling Items & Quantities</div>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Fulfilling Qty</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {fields.map((fItem, index) => {
            // console.log('fItem:', fItem);
            const selectedOrderItemId = form.watch(
              `items.${index}.orderItemId`,
            );
            const selectedTitle = selectedOrderItemId
              ? titleFromOrderItemId(selectedOrderItemId)
              : null;

            return (
              // @ts-expect-error keyName _id defined above
              <TableRow key={fItem._id} className="cursor-pointer">
                <TableCell>
                  <Image
                    className="w-10 h-12"
                    src={getImage(fItem.id)?.url || ''}
                    alt={getImage(fItem.id)?.alt || ''}
                    width={50}
                    height={70}
                  />
                </TableCell>
                <TableCell className="font-semibold capitalize">
                  {selectedOrderItemId ? (
                    <span>{selectedTitle || 'No Title Available'}</span>
                  ) : (
                    <Controller
                      name={`items.${index}.orderItemId`}
                      control={form.control}
                      render={({ field }) => (
                        <SelectElement
                          {...field}
                          options={availableOrderItems
                            .filter(
                              (item) =>
                                !fields.some(
                                  (existingItem) =>
                                    existingItem.orderItemId === item.id,
                                ),
                            )
                            .map((item) => ({
                              title: titleFromOrderItemId(item.id) ?? '',
                              id: item.id,
                            }))}
                          placeholder="Select an Item"
                        />
                      )}
                    />
                  )}
                </TableCell>
                <FulfillmentItemSizePrice
                  _fulfillmentItem={fItem}
                  fulfillment={fulfillment}
                />

                <TableCell className="font-semibold capitalize">
                  <Controller
                    name={`items.${index}.quantity`}
                    control={form.control}
                    defaultValue={fItem.quantity} // Set the default value for quantity
                    render={({ field: { value, onChange, onBlur } }) => (
                      <InputElement
                        name={`items.${index}.quantity`}
                        value={value} // Bind the value from the form state
                        onChange={(e) => {
                          const newValue = e.target.value;
                          onChange(newValue); // Update the form state when the value changes
                        }}
                        onBlur={onBlur} // Ensure onBlur is handled properly for validation (if needed)
                        type="number" // Ensure that the input is of type number
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                  >
                    <LuTrash size={25} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <Button
              type="button"
              onClick={() => {
                append({
                  orderItemId: '',
                  quantity: 0,
                });
              }}
              className=" bg-white opacity-75 border border-2 text-gray-300 border-dashed border-gray-300 hover:bg-white hover:opacity-100"
              disabled={availableOrderItems.length === 0}
            >
              <LuPlus /> Add another Item in the order to this fulfillment
            </Button>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default FulfillmentFormTable;
