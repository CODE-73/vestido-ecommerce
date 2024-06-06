import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { InputElement } from '../../forms/input-element';
import { useVariantUpsert } from 'libs/items/src/swr/variants/upsert-variant';
import { Button } from 'libs/shadcn-ui/src/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useVariant } from 'libs/items/src/swr/variants';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { useRouter } from 'next/router';
import { ChevronRight, Plus } from 'lucide-react';
import { AttributeElement } from 'vestido/vestido-dashboard/forms/attribute-combobox-element';
import { AttributeValueElement } from 'vestido/vestido-dashboard/forms/attribute-value-combobox';

export const VariantAttributeValueSchema = z.object({
  attributeId: z.string(),
  attributeValueId: z.string(),
});
const CreateVariantFormSchema = z.object({
  itemId: z.string(),
  price: z.coerce.number(),
  title: z.string().optional(),
  attributeValues: z.array(VariantAttributeValueSchema),
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
  const form = useForm<CreateVariantForm>({
    resolver: zodResolver(CreateVariantFormSchema),
    defaultValues: {
      itemId: propItemId ?? '',
      price: 0,
      attributeValues: [],
    },
  });
  const itemId = form.watch('itemId');

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'attributeValues',
  });
  const { trigger } = useVariantUpsert(itemId);
  const { data: { data: variant } = { data: null }, error } = useVariant(
    itemId,
    isNew ? null : variantId
  );

  const { isDirty, isValid, errors } = form.formState;
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (!isNew && variant) {
      form.reset({
        itemId: variant.itemId,
        price: variant.price,
        attributeValues: variant.attributeValues,
        title: variant.title,
      });
    }
  }, [isNew, variant, form]);

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
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-5 gap-3 lg:px-10 mt-2"
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
                  placeholder="Attribute Value"
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
            <Plus /> Add Attribute
          </Button>
        </div>

        <div className="grid grid-cols-8 mt-3 text-right gap-2">
          <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
            {isNew ? 'Create' : 'Update'}
          </Button>
          <Button type="button" onClick={handleButtonClick} disabled={isNew}>
            Add Next Variant <ChevronRight />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VariantForm;
