import { ReactNode, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  GetOrderResponse,
  GetReturnableitemsResponse,
  useCreateReturnOrder,
} from '@vestido-ecommerce/orders/client';
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

import { InputElement } from '../../forms/input-element';
import { RadioGroupElement } from '../../forms/radio-group-element';
import { CircleCheckIcon } from '../orders/order-confirmation-view';
import { SelectItems } from './return-exchange-dialog-select-items';
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
  reason: z.enum([
    'DAMAGED_ITEM',
    'WRONG_ITEM_RECEIVED',
    'MISSING_PART_OF_SET',
    'QUALITY_ISSUES',
    'FIT_ISSUES',
    'OTHER',
  ]),
  returnItems: z.array(ReturnItemSchema),
});

export type ReturnReplaceForm = z.infer<typeof ReturnOrderSchema>;

const ReturnReplaceDialog: React.FC<ReturnReplaceDialogProps> = ({
  children,
  isReturn,
  order,
  returnableItems,
}) => {
  const cod = order?.payments[0].paymentGateway === 'CASH_ON_DELIVERY';
  const { toast } = useToast();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { trigger } = useCreateReturnOrder();

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
      reason: 'OTHER',
    },
  });

  const returnItems = form.watch('returnItems') || [];

  useEffect(() => {
    form.reset({
      returnType: isReturn ? 'RETURN' : 'EXCHANGE',
      orderId: order?.id,
      reason: 'OTHER',
      returnItems: returnableItems.map((item) => ({
        fulfillmentId: item.fulfillmentId,
        FulfillmentItemPrice: item.fulfillmentItemPrice ?? 0,
        orderItemId: item.orderItemId,
        quantity: 0,
      })),
    });
  }, [form, returnableItems, isReturn, order?.id]);

  const handleSubmit = async (data: ReturnReplaceForm) => {
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
              <SelectItems
                form={form}
                isReturn={isReturn}
                returnableItems={returnableItems}
                setActiveDialog={setActiveDialog}
                order={order}
              />
            )}
            {activeDialog === 'selectReason' && (
              <>
                <RadioGroupElement
                  name="reason"
                  label={`Reason for ${isReturn} ? 'Return' :'Exchange'`}
                  options={[
                    {
                      label: 'Received Damaged/torn Item',
                      value: 'DAMAGED_ITEM',
                    },
                    {
                      label: 'Received product different from ordered',
                      value: 'WRONG_ITEM_RECEIVED',
                    },
                    {
                      label: 'Missing part of a set',
                      value: 'MISSING_PART_OF_SET',
                    },
                    {
                      label: 'Bad Quality',
                      value: 'QUALITY_ISSUES',
                    },
                    {
                      label: 'Need to Change Payment Method',
                      value: 'FIT_ISSUES',
                    },
                    { label: 'Other', value: 'OTHER' },
                  ]}
                />
                <DialogFooter>
                  {isReturn && cod ? (
                    <Button
                      onClick={() => setActiveDialog('bankDetails')}
                      type="button"
                      className="w-full mt-4"
                    >
                      Next
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
                You can check the progress of the
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
