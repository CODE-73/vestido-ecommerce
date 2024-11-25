import React, { useEffect } from 'react';
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

  const orderId = useFulfillment(fulfillmentId).data?.data.orderId;

  const form = useForm<UpdateFulfillmentForm>({
    resolver: zodResolver(UpdateFulfillmentFormSchema),
    defaultValues: {
      id: fulfillmentId,
      status: 'DRAFT',
      length: 0,
      breadth: 0,
      height: 0,
      weight: 0,
      description: null,
    },
  });

  const { data: { data: fulfillment } = { data: null } /*, isLoading */ } =
    useFulfillment(fulfillmentId);

  console.log('fulfillment is', fulfillment);

  const { isDirty, isValid, errors } = form.formState;
  const isSubmitting = form.formState.isSubmitting;
  console.info(
    'FormState:',
    structuredClone({
      isDirty,
      isValid,
      errors,
      values: form.getValues(),
    }),
  );

  useEffect(() => {
    const items = fulfillment?.fulfillmentItems.map((fulfillmentItem) => {
      return {
        id: fulfillmentItem.id,
        fulfillmentId: fulfillmentItem.fulfillmentId,
        orderItemId: fulfillmentItem.orderItemId,
        quantity: fulfillmentItem.quantity,
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
        <div className="text-2xl font-semibold capitalize flex justify-between">
          {fulfillment?.id}
        </div>
        <div className="flex h-full flex-col flex-grow ps-2 pe-2">
          <hr className="border-t-1 border-slate-400 mb-4 w-full" />
          <BasicFulfillmentForm />
          <hr />
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
              <Button type="button" disabled={isDirty} className="col-span-2">
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
                  further changes will be allowed. This will be forwarded to the
                  delivery partner. Would you like to proceed
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
      </form>
    </Form>
  );
};

export default FulfillmentForm;
