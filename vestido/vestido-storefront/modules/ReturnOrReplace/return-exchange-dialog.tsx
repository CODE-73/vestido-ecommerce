import { ReactNode, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { GetOrderResponse } from '@vestido-ecommerce/orders';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@vestido-ecommerce/shadcn-ui/card';
import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';
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
export type ReturnReplaceForm = z.infer<typeof ReturnReplaceFormSchema>;

const ReturnReplaceDialog: React.FC<ReturnReplaceDialogProps> = ({
  children,
  isReturn,
  order,
}) => {
  const cod = order?.payments[0].paymentGateway === 'CASH_ON_DELIVERY';
  const { toast } = useToast();

  const [activeDialog, setActiveDialog] = useState<string>('selectItems');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setActiveDialog('selectItems');
  };

  const form = useForm<ReturnReplaceForm>({
    resolver: zodResolver(ReturnReplaceFormSchema),
    defaultValues: { orderId: order?.id, orderItems: [] },
  });

  const handleSubmit = async (/* data: ReturnReplaceForm */) => {
    await toast({
      title: `${isReturn ? 'Return' : 'Exchange'} Request Placed Successfully.`,
    });
    setActiveDialog('confirmation');
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

                {order?.orderItems.map((orderItem, index) => (
                  <div key={index} className="py-3 grid grid-cols-10">
                    <Checkbox />
                    <ItemImage
                      item={orderItem.item}
                      width={50}
                      height={70}
                      className="w-10 h-12 justify-self-center col-span-2"
                    />
                    <div className="text-xs col-span-6 pl-1">
                      {orderItem.item.title}
                    </div>
                    <div className="px-1 text-sm text-center justify-self-center">
                      {orderItem.qty}
                    </div>
                  </div>
                ))}
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
