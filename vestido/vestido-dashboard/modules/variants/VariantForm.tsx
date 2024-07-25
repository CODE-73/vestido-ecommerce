import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { InputElement } from '../../forms/input-element';
import { useVariantUpsert } from '@vestido-ecommerce/items';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useVariant } from '@vestido-ecommerce/items';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { useRouter } from 'next/router';
import { LuChevronRight, LuPlus } from 'react-icons/lu';
import { AttributeElement } from '../../forms/attribute-combobox-element';
import { AttributeValueElement } from '../../forms/attribute-value-combobox';
import MultiImageUploaderElement from '../../components/MultiImageUploaderElement';
import { ImageSchema, ImageSchemaType } from '@vestido-ecommerce/utils';
import { RadioGroupElement } from '../../forms/radio-group-element';
import { SwitchElement } from '../../forms/switch-element';
import { StockStatus } from '@prisma/client';

export const VariantAttributeValueSchema = z.object({
  attributeId: z.string(),
  attributeValueId: z.string(),
});
const CreateVariantFormSchema = z.object({
  itemId: z.string(),
  price: z.coerce.number(),
  title: z.string().optional(),
  images: z.array(ImageSchema),
  attributeValues: z.array(VariantAttributeValueSchema),
  default: z.boolean(),
  stockStatus: z
    .nativeEnum(StockStatus)
    .default('AVAILABLE' satisfies StockStatus),
  discountPercent: z.coerce
    .number()
    .max(100, { message: 'Percentage cannot be more than 100' })
    .default(0)
    .nullable(),
  discountedPrice: z.coerce.number().nullable(),
});

export type CreateVariantForm = z.infer<typeof CreateVariantFormSchema>;

interface VariantFormProps {
  variantId?: string;
  itemId?: string;
  isNew: boolean;
}

const VariantForm: React.FC<VariantFormProps> = ({
  variantId,
  itemId: propItemId,
  isNew,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  // const { data } = useItem(propItemId);
  // const item = data?.data;

  const form = useForm<CreateVariantForm>({
    resolver: zodResolver(CreateVariantFormSchema),
    defaultValues: {
      itemId: propItemId ?? '',
      price: 0,
      discountPercent: 0,
      discountedPrice: 0,
      attributeValues: [],
      default: false,
    },
  });
  const itemId = form.watch('itemId');

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'attributeValues',
  });
  const { trigger } = useVariantUpsert(itemId);
  const { data: { data: variant } = { data: null } /*error*/ } = useVariant(
    itemId,
    isNew ? null : variantId
  );

  const { isDirty, isValid, errors } = form.formState;
  console.info(isValid, errors);
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (!isNew && variant) {
      form.reset({
        itemId: variant.itemId,
        price: variant.price,
        attributeValues: variant.attributeValues,
        title: variant.title,
        default: variant.default,
        images: (variant.images ?? []) as ImageSchemaType[],
        stockStatus: variant.stockStatus,
        discountPercent: variant.discountPercent,
        discountedPrice: variant.discountedPrice,
      });
    }
  }, [isNew, variant, form]);

  const price = form.watch('price');
  const discountPercent = form.watch('discountPercent');

  useEffect(() => {
    const discountedPrice = price - (price * (discountPercent ?? 0)) / 100;
    form.setValue('discountedPrice', discountedPrice);
  }, [form, price, discountPercent]);

  const handleSubmit = async (data: CreateVariantForm) => {
    try {
      const response = await trigger({
        ...data,
        id: isNew ? undefined : variantId,
      });
      toast({
        title: isNew
          ? 'Variant Added Successfully'
          : 'Variant Updated Successfully',
      });
      router.replace(`/products/${itemId}/variants/${response.data.id}`);
    } catch (e) {
      console.error('Error updating variant:', e);
    }
  };

  const handleButtonClick = () => {
    router.push(`/products/${encodeURIComponent(itemId)}/variants/add-new`);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-center w-full space-y-8 mt-16 bg-slate-200 p-5"
      >
        <div className="text-lg font-bold">
          {isNew ? 'Add New Variant' : 'Variant Details'}
        </div>
        <div className="flex flex-col flex-grow ps-2 pe-2">
          <hr className="border-t-1 border-slate-400 mb-4 w-full" />
          <div>
            <SwitchElement name="default" label="Default Variant" />
          </div>{' '}
          <hr className="border-t-1 border-slate-400 my-4 w-full" />
          <div className="grid grid-cols-2 gap-5 lg:px-10 mb-10">
            <InputElement
              name="itemId"
              disabled
              placeholder="Item ID"
              label="Item ID"
            />
            <InputElement name="price" placeholder="Price" label="Price" />
            <InputElement
              disabled={isNew}
              name="title"
              placeholder="Title"
              label="Title"
            ></InputElement>
          </div>
          <div className="grid grid-cols-2 gap-5 lg:px-10 my-2">
            <InputElement
              name="discountPercent"
              placeholder="Discount %"
              label="Discount percentage"
            />
            <InputElement
              name="discountedPrice"
              placeholder="Price after discount"
              label="Discounted Price"
            />
          </div>
          <RadioGroupElement
            name="stockStatus"
            label="Stock Status"
            options={[
              { label: 'Available', value: 'AVAILABLE' },
              {
                label: 'Limited Stock',
                value: 'LIMITED_STOCK',
              },
              {
                label: 'Out of Stock',
                value: 'OUT_OF_STOCK',
              },
            ]}
          />
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-5 gap-3 lg:px-10 mt-3"
            >
              <div className="col-span-2">
                <AttributeElement
                  name={`attributeValues.${index}.attributeId`}
                  placeholder="Attribute "
                />
              </div>
              <div className="col-span-2">
                <AttributeValueElement
                  name={`attributeValues.${index}.attributeValueId`}
                  placeholder="Value"
                  attributeId={form.watch(
                    `attributeValues.${index}.attributeId`
                  )}
                />
              </div>
              <Button
                type="button"
                onClick={() => remove(index)}
                className="self-end"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ attributeId: '', attributeValueId: '' })}
            className="mx-10 mt-3 bg-white opacity-75 border border-2 text-gray-400 border-dashed border-gray-300 hover:bg-white hover:opacity-100"
          >
            <LuPlus /> Add Attribute
          </Button>
        </div>

        <hr className="border-t-1 border-slate-400 mb-4 w-full" />
        <div className="text-lg font-semibold">Variant Images</div>
        <MultiImageUploaderElement name="images" />

        <div className=" flex justify-between md:justify-start  mt-3 text-right gap-2">
          <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
            {isNew ? 'Create' : 'Update'}
          </Button>
          <Button type="button" onClick={handleButtonClick} disabled={isNew}>
            Add Next Variant <LuChevronRight />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VariantForm;
