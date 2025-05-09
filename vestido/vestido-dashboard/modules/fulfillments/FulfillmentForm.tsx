import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { FulfillmentItem, FulfillmentStatus } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { LuChevronLeft } from 'react-icons/lu';
import * as z from 'zod';
import { ZodError } from 'zod';

import {
  useFulfillment,
  useSubmitFulfillment,
  useUpdateFulfillment,
} from '@vestido-ecommerce/orders/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/alert-dialog';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@vestido-ecommerce/shadcn-ui/card';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { VestidoError } from '@vestido-ecommerce/utils';

import BasicFulfillmentForm from './fulfillment-form-basic';
import FulfillmentFormTable from './fulfillment-form-table';

const FulfillmentItemSchema = z.object({
  orderItemId: z.string().uuid(),
  quantity: z.coerce.number().int(),
  id: z.string().optional(),
});

const UpdateFulfillmentFormSchema = z.object({
  id: z.string(),
  status: z
    .nativeEnum(FulfillmentStatus)
    .default('DRAFT' satisfies FulfillmentStatus),
  pickup_location: z.string().nullable(),
  length: z.coerce.number().nullable(),
  breadth: z.coerce.number().nullable(),
  height: z.coerce.number().nullable(),
  weight: z.coerce.number().nullable(),
  description: z.string().nullable(),
  items: z.array(FulfillmentItemSchema),
});

export type UpdateFulfillmentForm = z.infer<typeof UpdateFulfillmentFormSchema>;

interface FulfillmentFormProps {
  fulfillmentId?: string;
}

const FulfillmentForm: React.FC<FulfillmentFormProps> = ({ fulfillmentId }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { trigger: submitTrigger } = useSubmitFulfillment();

  const { data } = useFulfillment(fulfillmentId);

  const orderId = data?.data?.orderId;

  const form = useForm<UpdateFulfillmentForm>({
    resolver: zodResolver(UpdateFulfillmentFormSchema),
    defaultValues: {
      id: fulfillmentId,
      status: 'DRAFT',
      pickup_location: null,
      length: 0,
      breadth: 0,
      height: 0,
      weight: 0,
      description: null,
    },
  });

  const { data: { data: fulfillment } = { data: null } /*, isLoading */ } =
    useFulfillment(fulfillmentId);

  const { isDirty, isValid } = form.formState;
  const isSubmitting = form.formState.isSubmitting;
  const isDraft = fulfillment?.status === 'DRAFT' || false;

  useEffect(() => {
    const items = fulfillment?.fulfillmentItems.map((fulfillmentItem) => {
      return {
        id: fulfillmentItem.id,
        fulfillmentId: fulfillmentItem.fulfillmentId,
        orderItemId: fulfillmentItem.orderItemId,
        createdAt: fulfillmentItem.createdAt,
        updatedAt: fulfillmentItem.updatedAt,
        quantity: fulfillmentItem.quantity,
        fulfillmentItemPrice: fulfillmentItem.fulfillmentItemPrice,
      } satisfies FulfillmentItem;
    });

    form.reset({
      ...fulfillment,
      items: items ?? [],
    });
  }, [form, fulfillment]);

  const { trigger } = useUpdateFulfillment();

  const handleSubmit = async (data: UpdateFulfillmentForm) => {
    try {
      const response = await trigger({
        ...data,
      });
      toast({
        title: 'Fulfillment Updated Successfully',
      });
      router.replace(`/fulfillments/${response.data.id}`);
    } catch (e) {
      if (e instanceof VestidoError) {
        form.setError('root', { message: e.message });
        toast({
          title: 'Error updating Fulfillment',
          description: e.message,
        });
      } else if (e instanceof ZodError) {
        for (const issue of e.issues) {
          form.setError(issue.path.join('.') as keyof UpdateFulfillmentForm, {
            message: issue.message,
          });
          toast({
            title: 'Error updating Fulfillment',
            description: issue.message,
          });
        }
      } else {
        console.error('Error updating fulfillment:', e);
      }
    }
  };

  const handleSubmitFulfillment = async (fulfillmentId: string) => {
    try {
      // Trigger the fulfillment submission (no additional data needed)
      await submitTrigger(fulfillmentId);
      toast({
        title: 'Fulfillment Submitted Successfully',
      });
    } catch (err) {
      console.error('Error submitting fulfillment:', err);
    }
  };

  return (
    <Form {...form}>
      <div
        onClick={() => router.back()}
        className="flex gap-1 items-center mt-12 mb-4 ml-4 cursor-pointer"
      >
        <LuChevronLeft />
        Back
      </div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-center w-full text-lg mt-16 bg-slate-200 px-5 py-10 mb-5"
      >
        <fieldset disabled={!isDraft}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-semibold capitalize flex justify-between">
                Fulfillment #{fulfillment?.fulfillment_no.toString()}
              </div>
              <Link
                href={`/orders/${fulfillment?.orderId}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Part of Order #{fulfillment?.order.order_no.toString()}
              </Link>
            </div>
            <div>{fulfillment?.status}</div>
          </div>

          <div className="flex h-full flex-col flex-grow ps-2 pe-2">
            <hr className="border-t-1 border-slate-400 mb-4 w-full" />
            <BasicFulfillmentForm />
            <hr />
            <div>
              <Card className="col-span-6">
                <CardHeader>
                  <CardTitle className="text-xl">Shiprocket Details</CardTitle>
                  <hr />
                </CardHeader>
                <CardContent className="gap-4 grid grid-cols-3 max-w-xl">
                  <div className="">Shiprocket Order ID: </div>
                  <div className="font-semibold col-span-2">
                    {fulfillment?.shiprocket_order_id ? (
                      <a
                        href={` https://app.shiprocket.in/seller/orders/details/${fulfillment.shiprocket_order_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {fulfillment.shiprocket_order_id}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </div>
                  <div className="">Shipment ID:</div>
                  <div className="font-semibold col-span-2">
                    {fulfillment?.shipment_id ? fulfillment.shipment_id : 'N/A'}
                  </div>
                  <div className="">AWB: </div>
                  <div className="font-semibold col-span-2">
                    {fulfillment?.tracking ? fulfillment.tracking : 'N/A'}
                  </div>
                </CardContent>
              </Card>
            </div>
            <FulfillmentFormTable
              orderId={orderId ?? ''}
              fulfillment={fulfillment}
            />
          </div>

          <div className="grid grid-cols-3 md:grid-cols-8 mt-3 text-right gap-2">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting || !isDirty}
              className="col-span-2"
            >
              Update Fulfillment
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  disabled={isDirty || !isDraft}
                  className="col-span-2"
                >
                  Submit
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Final Submit Fulfillment ??{' '}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You are about to submit this fulfillment permanently. No
                    further changes will be allowed. This will be forwarded to
                    the delivery partner. Would you like to proceed
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleSubmitFulfillment(fulfillmentId ?? '')}
                  >
                    Yes, Submit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};

export default FulfillmentForm;
