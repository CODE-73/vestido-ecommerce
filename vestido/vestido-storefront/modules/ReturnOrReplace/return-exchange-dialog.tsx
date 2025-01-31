import { ReactNode, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { z } from 'zod';

import { GetOrderResponse } from '@vestido-ecommerce/orders';
import { ReturnOrderSchema } from '@vestido-ecommerce/orders';
import { useCreateReturnOrder } from '@vestido-ecommerce/orders/client';
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
};

const ReturnReplaceItemSchema = z.object({
  itemId: z.string(),
  qty: z.number(),
});

const ReturnReplaceFormSchema = z.object({
  orderId: z.string(),
  orderItems: z.array(ReturnReplaceItemSchema),
  account_holder_name: z.string().nullish(),
  account_number: z.string().nullish(),
  ifsc_code: z.string().nullish(),
});
export type ReturnReplaceForm = z.infer<typeof ReturnOrderSchema>;

const ReturnReplaceDialog: React.FC<ReturnReplaceDialogProps> = ({
  children,
  isReturn,
  order,
}) => {
  const cod = order?.payments[0].paymentGateway === 'CASH_ON_DELIVERY';
  const { toast } = useToast();

  const { trigger } = useCreateReturnOrder();

  const [activeDialog, setActiveDialog] = useState<string>('selectItems');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setActiveDialog('selectItems');
  };

  const form = useForm<ReturnReplaceForm>({
    resolver: zodResolver(ReturnReplaceFormSchema),
    defaultValues: {
      returnType: 'RETURN',
      orderId: order?.id,
      returnItems: [{ quantity: 0 }],
      reason: 'Other',
      fulfillmentId: 'trial',
    },
  });

  console.info(
    form.formState.isValid,
    form.formState.isDirty,
    form.formState.errors,
    form.getValues(),
  );

  const returnItems = form.watch('returnItems') || [];

  // Dynamically filter items with quantities > 0
  const filteredReturnItems = returnItems.filter((item) => item.quantity > 0);

  console.log('Filtered Return Items:', filteredReturnItems);

  const handleSubmit = async (data: ReturnReplaceForm) => {
    console.log('handlesubmit return');
    try {
      await trigger({
        ...data,
        returnItems: filteredReturnItems,
        fulfillmentId: 'jghgh',
      });
      toast({
        title: `${isReturn ? 'Return' : 'Exchange'} Request Placed Successfully.`,
      });
      setActiveDialog('confirmation');
    } catch (e) {
      console.error('Error creating return order', e);
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

                {/* {order?.orderItems.map((orderItem, index) => (
                  <div key={index} className="py-3 grid grid-cols-10">
                    <ItemImage
                      item={orderItem.item}
                      width={50}
                      height={70}
                      className="w-10 h-12 justify-self-center col-span-2"
                    />
                    <div className="text-xs col-span-6 pl-1">
                      {orderItem.item.title}
                    </div>

                    <div className="flex flex-row text-neutral-500 border border-neutral-500 rounded-full  w-[100px] items-center justify-between  px-2 ">
                      <div className="text-zinc-300 cursor-pointer">
                        <LuMinus />
                      </div>
                      <div className="font-semibold ">{orderItem.qty}</div>
                      <div className=" cursor-pointer">
                        <LuPlus />
                      </div>
                    </div>
                  </div>
                ))} */}
                {order?.orderItems.map((orderItem, index) => {
                  return (
                    <div key={index} className="py-3 grid grid-cols-10">
                      <ItemImage
                        item={orderItem.item}
                        width={50}
                        height={70}
                        className="w-10 h-12 justify-self-center col-span-2"
                      />
                      <div className="text-xs col-span-6 pl-1">
                        {orderItem.item.title}
                      </div>

                      {/* Quantity selector */}
                      <div className="flex flex-row text-neutral-500 border border-neutral-500 rounded-full w-[100px] items-center justify-between px-2">
                        {/* Decrement Button */}
                        <div
                          className={`text-zinc-300 cursor-pointer`}
                          onClick={() => {
                            const currentQty =
                              form.getValues(`returnItems.${index}.quantity`) ||
                              0;
                            if (currentQty > 0) {
                              form.setValue(
                                `returnItems.${index}.quantity`,
                                currentQty - 1,
                              );
                            }
                          }}
                        >
                          <LuMinus />
                        </div>

                        {/* Quantity Input */}
                        <InputElement
                          name={`returnItems.${index}.quantity`}
                          type="number"
                          validation={{
                            min: 0,
                            max: orderItem.qty,
                          }}
                          wrapperClassName="w-6 text-center bg-transparent border-none"
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value >= 0 && value <= orderItem.qty) {
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
                            form.getValues(`returnItems.${index}.quantity`) >=
                            orderItem.qty
                              ? 'pointer-events-none opacity-50'
                              : ''
                          }`}
                          onClick={() => {
                            const currentQty =
                              form.getValues(`returnItems.${index}.quantity`) ||
                              0;
                            form.setValue(
                              `returnItems.${index}.orderItemId`,
                              orderItem.id,
                            );
                            if (currentQty < orderItem.qty) {
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
                    <Button className="w-full" type="submit">
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
