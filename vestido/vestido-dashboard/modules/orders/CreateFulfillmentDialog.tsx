import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { type GetOrderResponse } from '@vestido-ecommerce/orders/client';
import { useCreateFulfillment } from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@vestido-ecommerce/shadcn-ui/dialog';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { InputElement } from '../../forms/input-element';

const FulfillmentItemSchema = z
  .object({
    orderItemId: z.string().uuid(),
    pendingQty: z.coerce.number().int(),
    fulfillingQty: z.coerce.number().int(),
  })
  .refine((data) => data.fulfillingQty <= data.pendingQty, {
    message: 'Cannot exceed pending quantity',
    path: ['fulfillingQty'],
  });

export type FulfillmentItem = z.infer<typeof FulfillmentItemSchema>;
const CreateFulfillmentFormSchema = z.object({
  orderId: z.string().uuid(),
  items: z.array(FulfillmentItemSchema),
});
export type CreateFulfillmentForm = z.infer<typeof CreateFulfillmentFormSchema>;

type CreateFulfillmentDialogProps = {
  order: GetOrderResponse['data'];
};
export const CreateFulfillmentDialog: React.FC<
  CreateFulfillmentDialogProps
> = ({ order }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const form = useForm<CreateFulfillmentForm>({
    mode: 'onBlur',
    resolver: zodResolver(CreateFulfillmentFormSchema),
    defaultValues: {
      orderId: order?.id,
      items: [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  useEffect(() => {
    const items = order?.orderItems
      .filter(
        (orderItem) =>
          orderItem.fulfilledQuantity === null ||
          (orderItem.fulfilledQuantity &&
            orderItem.qty > orderItem.fulfilledQuantity),
      )
      .map((orderItem) => {
        return {
          orderItemId: orderItem.id,
          pendingQty: orderItem.qty - (orderItem.fulfilledQuantity || 0),
          fulfillingQty: orderItem.qty - (orderItem.fulfilledQuantity || 0),
        } satisfies FulfillmentItem;
      });

    items &&
      form.setValue('items', items, {
        shouldValidate: true,
      });
  }, [form, order]);

  const { trigger } = useCreateFulfillment();

  const errors = form.formState.errors;
  const isValid = form.formState.isValid;
  const isDirty = form.formState.isDirty;

  console.info(isDirty, isValid, errors, structuredClone(form.getValues()));

  const handleSubmit = async (data: CreateFulfillmentForm) => {
    try {
      const response = await trigger({
        ...data,
        orderId: order?.id ?? '',
        items: data.items.map((x) => ({
          orderItemId: x.orderItemId,
          quantity: x.fulfillingQty,
        })),
      });
      toast({
        title: 'Fulfillment Draft Created',
      });
      setIsDialogOpen(false);

      router.replace(`/fulfillments/${response.data.id}`);
    } catch (e) {
      console.error('Error creating fulfillment:', e);
    }
  };

  const getImage = (orderItemId: string) => {
    const orderItem = order?.orderItems.find((x) => x.id === orderItemId);
    if (!orderItem) {
      return null;
    }

    const images = orderItem.item.images as ImageSchemaType[];
    if (!images || !images.length) {
      return null;
    }

    return images.find((x) => x.default) ?? images[0];
  };

  const getTitle = (orderItemId: string) => {
    const orderItem = order?.orderItems.find((x) => x.id === orderItemId);
    if (!orderItem) {
      return null;
    }
    return orderItem.item.title;
  };

  return (
    <Form {...form}>
      {isDialogOpen && (
        <DialogContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader className="col-span-6">
              <DialogTitle>
                <div className="flex">Create Fulfillment</div>
              </DialogTitle>
              <DialogDescription className="col-span-6">
                Choose items and corresponding quantities to go in this
                fuifillment
              </DialogDescription>
            </DialogHeader>
            <hr />
            <div className="bg-white col-span-6">
              <div className="p-4 text-lg font-semibold">Order Items</div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Pending Qty</TableHead>
                    <TableHead>Fulfilling Qty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((fItem, index) => (
                    <TableRow key={index} className="cursor-pointer">
                      <TableCell>
                        <Image
                          className="w-10 h-12"
                          src={getImage(fItem.orderItemId)?.url || ''}
                          alt={getImage(fItem.orderItemId)?.alt || ''}
                          width={50}
                          height={70}
                        />
                      </TableCell>
                      <TableCell className="font-semibold capitalize">
                        {getTitle(fItem.orderItemId)}
                      </TableCell>
                      <TableCell className="font-semibold capitalize">
                        {fItem.pendingQty} {/* total qty - already fulfilled */}
                      </TableCell>
                      <TableCell className="font-semibold capitalize">
                        {' '}
                        <Controller
                          name={`items.${index}.fulfillingQty`}
                          control={form.control}
                          render={({ field }) => <InputElement {...field} />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <DialogFooter className="w-full col-span-6">
              <Button
                type="submit"
                className="w-full uppercase text-base tracking-wide"
              >
                Create
              </Button>
            </DialogFooter>{' '}
          </form>
        </DialogContent>
      )}
    </Form>
  );
};
