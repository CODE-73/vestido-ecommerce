import { ReactNode, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { z } from 'zod';

import { GetOrderResponse } from '@vestido-ecommerce/orders/client';
import { useCreateReturnOrder } from '@vestido-ecommerce/orders/client';
import { GetReturnableitemsResponse } from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@vestido-ecommerce/shadcn-ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/dialog';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import ItemImage from '../../components/item-image';
import { InputElement } from '../../forms/input-element';
import { CircleCheckIcon } from '../orders/order-confirmation-view';
type ReturnReplaceDialogProps = {
  children: ReactNode;
  isReturn?: boolean;
  order: GetOrderResponse['data'];
  returnableItems: GetReturnableitemsResponse;
};

const ReturnItemSchema = z.object({
  orderItemId: z.string().uuid(),
  quantity: z.coerce.number().int(),
  FulfillmentItemPrice: z.number().positive(),
  fulfillmentId: z.string().uuid(),
});

const ReturnOrderSchema = z.object({
  returnType: z.string(),
  orderId: z.string().uuid(),
  reason: z.string(),
  returnItems: z.array(ReturnItemSchema),
});

export type ReturnReplaceForm = z.infer<typeof ReturnOrderSchema>;

const useReturnableItemsGroupedByFulfillment = (
  returnableItems: GetReturnableitemsResponse,
) => {
  return useMemo(
    () =>
      returnableItems.reduce(
        (a, b) => {
          let fArray = a.find((x) => x.fulfillmentId === b.fulfillmentId);
          if (!fArray) {
            fArray = {
              deliveredDate: b.deliveredDate ?? new Date(),
              fulfillmentId: b.fulfillmentId,
              items: [],
            };
            a.push(fArray);
          }

          fArray.items.push(b);
          return a;
        },
        [] as Array<{
          fulfillmentId: string;
          deliveredDate: Date;
          items: GetReturnableitemsResponse;
        }>,
      ),
    [returnableItems],
  );
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

const ReturnReplaceDialog: React.FC<ReturnReplaceDialogProps> = ({
  children,
  isReturn,
  order,
  returnableItems,
}) => {
  const cod = order?.payments[0].paymentGateway === 'CASH_ON_DELIVERY';
  const { toast } = useToast();

  console.info('retuuuurnable', returnableItems);
  const ItemsGroupedByFulfillment =
    useReturnableItemsGroupedByFulfillment(returnableItems);
  console.log('hook', ItemsGroupedByFulfillment);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { trigger } = useCreateReturnOrder();

  const getReturnableItemDetails = (
    itemId: string,
    order: GetOrderResponse['data'],
  ) => {
    const details = order?.orderItems.find((x) => x.itemId === itemId);
    return details;
  };

  const [activeDialog, setActiveDialog] = useState<string>('selectItems');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setActiveDialog('selectItems');
  };

  const form = useForm<ReturnReplaceForm>({
    resolver: zodResolver(ReturnOrderSchema),
    defaultValues: {
      returnType: 'RETURN',
      orderId: order?.id,
      returnItems: [{ quantity: 0 }],
      reason: 'Other',
    },
  });

  console.info('formvalues', form.getValues());
  console.info(
    'form..',
    form.formState.isValid,
    form.formState.isDirty,
    form.formState.errors,
  );

  const returnItems = form.watch('returnItems') || [];

  const handleSubmit = async (data: ReturnReplaceForm) => {
    console.log('handlesubmit return');
    try {
      // Filter out items with quantity > 0
      const filteredReturnItems = returnItems.filter(
        (item) => item.quantity > 0,
      );

      // Group returnItems by fulfillmentId
      const groupedByFulfillment: Record<
        string,
        {
          fulfillmentId: string;
          items: Omit<(typeof filteredReturnItems)[number], 'fulfillmentId'>[];
        }
      > = {};

      filteredReturnItems.forEach(
        ({ fulfillmentId, ...itemWithoutFulfillmentId }) => {
          if (!groupedByFulfillment[fulfillmentId]) {
            groupedByFulfillment[fulfillmentId] = { fulfillmentId, items: [] };
          }
          groupedByFulfillment[fulfillmentId].items.push(
            itemWithoutFulfillmentId,
          );
        },
      );

      // Prepare return requests for each unique fulfillmentId
      const returnRequests = Object.values(groupedByFulfillment).map(
        ({ fulfillmentId, items }) => ({
          ...data,
          fulfillmentId, // Attach fulfillmentId at the request level
          returnItems: items, // Ensure returnItems array does NOT contain fulfillmentId
        }),
      );

      // Send all return requests in parallel
      await Promise.all(returnRequests.map((req) => trigger(req)));
      // console.info('Return Submissions', returnRequests);

      // Show success message
      toast({
        title: `${isReturn ? 'Return' : 'Exchange'} Request Placed Successfully.`,
      });

      setActiveDialog('confirmation');
    } catch (e) {
      console.error('Error creating return order', e);
      toast({
        title: 'Error',
        description: 'Failed to place return request. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => !open && handleDialogClose()}
    >
      <DialogTrigger onClick={() => setIsDialogOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {activeDialog === 'selectItems' && (
              <>
                <DialogTitle>
                  {isReturn ? (
                    <div>Return Items</div>
                  ) : (
                    <div>Exchange Items</div>
                  )}
                </DialogTitle>

                <DialogDescription className="text-xs w-full">
                  Select Item(s) to&nbsp;
                  {isReturn ? (
                    <span>return</span>
                  ) : (
                    <span>
                      exchange. If you want a different size or color, you might
                      need to return this, and order your preferred variant
                      separately.
                    </span>
                  )}
                </DialogDescription>
                <div className="flex flex-col gap-3">
                  {ItemsGroupedByFulfillment.map((fulfillment, index) => (
                    <div key={index} className="bg-gray-300 p-2 rounded-lg">
                      <div className="text-xs text-gray-500">
                        Delivered on {formattedDate(fulfillment.deliveredDate)}
                      </div>
                      <hr className="border-gray-400" />
                      {fulfillment.items.map((item, index) => {
                        const orderItemDetails = getReturnableItemDetails(
                          item.orderItem.itemId,
                          order,
                        );
                        console.log(orderItemDetails);
                        return (
                          <div key={index} className="py-3 grid grid-cols-10">
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
                            <div className="flex flex-row text-neutral-500 border border-neutral-500 rounded-full w-[100px] items-center justify-between px-2">
                              {/* Decrement Button */}
                              <div
                                className="text-zinc-300 cursor-pointer"
                                onClick={() => {
                                  const path =
                                    `returnItems.${index}.quantity` as const;
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
                                <LuMinus />
                              </div>

                              {/* Quantity Input */}
                              <InputElement
                                name={`returnItems.${index}.quantity`}
                                disabled
                                // type="number"
                                validation={{
                                  min: 0,
                                  max: item.orderItem.returnableQty,
                                }}
                                wrapperClassName="w-6 text-center bg-transparent border-none"
                                onChange={(e) => {
                                  const value = Number(e.target.value);
                                  if (
                                    value >= 0 &&
                                    value <= item.orderItem.returnableQty
                                  ) {
                                    form.setValue(
                                      `returnItems.${index}.quantity`,
                                      value,
                                    );
                                  }
                                }}
                              />

                              {/* Increment Button */}
                              <div
                                className={`cursor-pointer ${
                                  form.getValues(
                                    `returnItems.${index}.quantity`,
                                  ) >= item.orderItem.returnableQty
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                                }`}
                                onClick={() => {
                                  const path =
                                    `returnItems.${index}.quantity` as const;
                                  const currentValue = form.getValues(path);
                                  const currentQty = Math.max(
                                    0,
                                    parseInt(String(currentValue), 10) || 0,
                                  );
                                  form.setValue(
                                    `returnItems.${index}.orderItemId`,
                                    item.orderItem.id,
                                  );
                                  form.setValue(
                                    `returnItems.${index}.FulfillmentItemPrice`,
                                    item.fulfillmentItemPrice as number,
                                  );
                                  form.setValue(
                                    `returnItems.${index}.fulfillmentId`,
                                    item.fulfillmentId,
                                  );

                                  if (
                                    currentQty < item.orderItem.returnableQty
                                  ) {
                                    form.setValue(
                                      `returnItems.${index}.quantity`,
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
                  {isReturn && cod ? (
                    <Button
                      onClick={() => setActiveDialog('bankDetails')}
                      type="button"
                      className="w-full"
                    >
                      Confirm Items
                    </Button>
                  ) : (
                    <Button className="w-full mt-5" type="submit">
                      Confirm &nbsp;
                      {isReturn ? <span>Return</span> : <span>Exchange</span>}
                    </Button>
                  )}
                </DialogFooter>
              </>
            )}
            {activeDialog === 'bankDetails' && (
              <>
                <DialogTitle>Bank Details for Return</DialogTitle>
                <DialogDescription className="text-xs w-full mb-5 mt-2">
                  Enter your bank details for a refund.
                </DialogDescription>

                <InputElement
                  name="account_holder_name"
                  label="Account Holder Name"
                  placeholder="Account holder name"
                />
                <InputElement
                  name="account_number"
                  label="Account Number"
                  placeholder="Account no."
                />
                <InputElement
                  name="ifsc_code"
                  label="IFSC Code"
                  placeholder="IFSC code"
                />

                <DialogFooter>
                  <Button type="submit" className="w-full mt-4">
                    Confirm &nbsp;
                    {isReturn ? <span>Return</span> : <span>Exchange</span>}
                  </Button>
                </DialogFooter>
              </>
            )}
          </form>
        </Form>
        {activeDialog === 'confirmation' && (
          <Card className="w-full max-w-md p-6 md:p-8">
            <CardHeader className="flex flex-col text-center items-center justify-center gap-2">
              <CircleCheckIcon className="text-green-500 w-12 h-12" />
              <CardTitle className="text-lg font-bold w-full ">
                {isReturn ? 'Return' : 'Exchange'} Request Placed Successfully.
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                You can check the progress of the{' '}
                {isReturn ? 'Return' : 'Exchange'} process in here!
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReturnReplaceDialog;
