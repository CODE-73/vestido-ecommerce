import { FC, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCancelOrder } from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/dialog';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { VestidoError } from '@vestido-ecommerce/utils';

import { RadioGroupElement } from '../../forms/radio-group-element';
import { TextAreaElement } from '../../forms/textarea-element';

type CancelOrderDialogProps = {
  orderId: string;
  orderNo: bigint | undefined;
  children: ReactNode;
  onOrderCancelled?: () => void;
};

const CancelOrderFormSchema = z.object({
  orderId: z.string(),
  reason: z.enum([
    'ORDER_CREATED_BY_MISTAKE',
    'ITEM_PRICE_TOO_HIGH',
    'NEED_TO_CHANGE_SHIPPING_ADDRESS',
    'NEED_TO_CHANGE_PAYMENT_METHOD',
    'OTHER',
  ]),
  remarks: z.string(),
});
export type CancelOrderForm = z.infer<typeof CancelOrderFormSchema>;

const CancelOrderDialog: FC<CancelOrderDialogProps> = ({
  orderId,
  orderNo,
  children,
  onOrderCancelled,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<CancelOrderForm>({
    resolver: zodResolver(CancelOrderFormSchema),
    defaultValues: {
      orderId: orderId,
      reason: 'ORDER_CREATED_BY_MISTAKE',
      remarks: '',
    },
  });

  const { trigger, isMutating } = useCancelOrder();
  const handleSubmit = async (data: CancelOrderForm) => {
    try {
      await trigger({
        ...data,
      });

      router.replace(`/orders/${orderId}`);
      onOrderCancelled?.();
      setIsDialogOpen(false);
    } catch (e) {
      if (e instanceof VestidoError) {
        form.setError('root', { message: e.message });
        toast({
          title: 'Error Cancelling Order',
          description: e.message,
        });
      } else {
        console.error('Error cancelling Order', e);
      }
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(_open) => setIsDialogOpen(_open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        // disable backdrop click
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Order #{orderNo?.toString()}</DialogTitle>
          </DialogHeader>
          <hr />

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3 divide-y"
          >
            <RadioGroupElement
              name="reason"
              label="Reason for cancellation"
              options={[
                {
                  label: 'Order Created By Mistake',
                  value: 'ORDER_CREATED_BY_MISTAKE',
                },
                {
                  label: 'Price of Item(s) Too High',
                  value: 'ITEM_PRICE_TOO_HIGH',
                },
                {
                  label: 'Need to Change Shipping Address',
                  value: 'NEED_TO_CHANGE_SHIPPING_ADDRESS',
                },
                {
                  label: 'Need to Change Payment Method',
                  value: 'NEED_TO_CHANGE_PAYMENT_METHOD',
                },
                { label: 'Other', value: 'OTHER' },
              ]}
            />
            <TextAreaElement
              name="remarks"
              label="Remarks"
              placeholder="Remarks if any..."
            />
            <DialogFooter>
              <Button
                disabled={isMutating}
                className="bg-black w-full text-lg my-1 text-white px-2 py-6 font-bold hover:bg-black rounded-none"
              >
                <div>Cancel Order</div>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderDialog;
