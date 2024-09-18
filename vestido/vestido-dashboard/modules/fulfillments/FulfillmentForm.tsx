import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { FulfillmentItem, FulfillmentStatus } from '@prisma/client';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { LuChevronLeft, LuTrash } from 'react-icons/lu';
import * as z from 'zod';
import { ZodError } from 'zod';

import {
  useFulfillment,
  useUpdateFulfillment,
} from '@vestido-ecommerce/orders/client';
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
import { ImageSchemaType, VestidoError } from '@vestido-ecommerce/utils';

import { InputElement } from '../../forms/input-element';

const FulfillmentItemSchema = z.object({
  orderItemId: z.string().uuid(),
  quantity: z.coerce.number().int(),
  id: z.string().optional(),
});

const UpdateFulfillmentFormSchema = z.object({
  fulfillmentId: z.string(),
  orderId: z.string(),
  status: z
    .nativeEnum(FulfillmentStatus)
    .default('DRAFT' satisfies FulfillmentStatus),
  length: z.coerce.number().optional(),
  breadth: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  items: z.array(FulfillmentItemSchema),
});

export type UpdateFulfillmentForm = z.infer<typeof UpdateFulfillmentFormSchema>;

interface FulfillmentFormProps {
  fulfillmentId?: string;
}

const FulfillmentForm: React.FC<FulfillmentFormProps> = ({ fulfillmentId }) => {
  const { toast } = useToast();
  const router = useRouter();

  const orderId = useFulfillment(fulfillmentId).data?.data.orderId;
  //   const order = useOrder(orderId);

  const form = useForm<UpdateFulfillmentForm>({
    resolver: zodResolver(UpdateFulfillmentFormSchema),
    defaultValues: {
      orderId: orderId,
      status: 'DRAFT',
      length: 0,
      breadth: 0,
      height: 0,
      weight: 0,
    },
  });

  const { data: { data: fulfillment } = { data: null } /*, isLoading */ } =
    useFulfillment(fulfillmentId);

  console.log('fulfillment is', fulfillment);

  //   const { isDirty, isValid } = form.formState;
  //   const isSubmitting = form.formState.isSubmitting;

  const { fields /*append, remove*/ } = useFieldArray({
    control: form.control,
    name: 'items',
  });
  useEffect(() => {
    const items = fulfillment?.fulfillmentItems.map((fulfillmentItem) => {
      return {
        fulfillmentId: fulfillmentItem.fulfillmentId,
        orderItemId: fulfillmentItem.orderItemId,
        quantity: fulfillmentItem.quantity,
        id: fulfillmentItem.id,
      } satisfies FulfillmentItem;
    });

    console.log('useffect items', items);
    items &&
      form.setValue('items', items, {
        shouldValidate: true,
      });
  }, [form, fulfillment]);

  const { trigger } = useUpdateFulfillment();

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

  console.log('get image', getImage('7269f24c-5651-4f87-bd18-314ca5b2f5b6'));

  const getTitle = (fulfillmentItemId: string) => {
    const fulfillingItem = fulfillment?.fulfillmentItems.find(
      (x) => x.id === fulfillmentItemId,
    );
    if (!fulfillmentItemId) {
      return null;
    }

    return fulfillingItem?.orderItem.item.title;
  };
  console.log('get title', getTitle('e1e2c462-9f95-479f-9baa-f2f8215c0db8'));
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

  //   if (!fulfillment || isLoading) {
  //     return (
  //       <div className="h-screen flex">
  //         <span className="m-auto">Loading...</span>
  //       </div>
  //     );
  //   }

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
          <div className="grid grid-cols-4 gap-5 lg:px-10">
            <div className="col-start-1 col-end-3 ">
              <InputElement
                required
                disabled
                name="orderId"
                placeholder={orderId}
                label="Order Id"
              />
            </div>
            <div className="col-start-1">
              <InputElement
                name="length"
                placeholder="Length of package"
                label="Length"
              />
            </div>
            <InputElement
              name="breadth"
              placeholder="Breadth of package"
              label="Breadth"
            />
            <InputElement
              name="height"
              placeholder="Height of package"
              label="Height"
            />
            <InputElement
              name="weight"
              placeholder="Weight of package"
              label="Weight"
            />
          </div>
          <hr />
          <div className="text-xl mt-10">Fulfilling Items & Quantities</div>
          <Table className="mt-10">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Fulfilling Qty</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((fItem, index) => {
                console.log('fItem:', fItem);
                return (
                  <TableRow key={index} className="cursor-pointer">
                    <TableCell>
                      <Image
                        className="w-10 h-12"
                        src={getImage(fItem.id)?.key || ''}
                        alt={getImage(fItem.id)?.alt || ''}
                        width={50}
                        height={70}
                      />
                    </TableCell>
                    <TableCell className="font-semibold capitalize">
                      {getTitle(fItem.id) || 'No Title Available'}
                    </TableCell>

                    <TableCell className="font-semibold capitalize">
                      <Controller
                        name={`items.${index}.quantity`}
                        control={form.control}
                        render={({ field }) => <InputElement {...field} />}
                      />
                    </TableCell>
                    <TableCell>
                      <LuTrash />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="grid grid-cols-8 mt-3 text-right gap-2">
          {/* <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
            {isNew ? 'Create' : 'Update'}
          </Button> */}
        </div>
      </form>
    </Form>
  );
};

export default FulfillmentForm;
