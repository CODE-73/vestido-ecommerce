import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { Gender, StockStatus } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useItemUpsert } from '@vestido-ecommerce/items';
import { useItem } from '@vestido-ecommerce/items';
import { Genders } from '@vestido-ecommerce/items';
import { useVariants } from '@vestido-ecommerce/items';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@vestido-ecommerce/shadcn-ui/form';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { ImageSchema, ImageSchemaType } from '@vestido-ecommerce/utils';

import MultiImageUploaderElement from '../../components/MultiImageUploaderElement';
import { CategoryElement } from '../../forms/category-combobox-element';
import { InputElement } from '../../forms/input-element';
import { RadioGroupElement } from '../../forms/radio-group-element';
import { SwitchElement } from '../../forms/switch-element';
import { TextAreaElement } from '../../forms/textarea-element';
import VariantsTable from '../variants/VariantsTable';

const CreateProductFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Please provide a title for the product' }),
  price: z.coerce.number(),
  description: z.string(),
  categoryId: z.string().min(2, { message: 'You have to choose a category' }),
  hasVariants: z.boolean().default(false),
  stockStatus: z
    .nativeEnum(StockStatus)
    .default('AVAILABLE' satisfies StockStatus),
  images: z.array(ImageSchema),
  gender: z
    .array(z.nativeEnum(Gender))
    .refine((value) => value.some((gender) => gender), {
      message: 'You have to select at least one item.',
    })
    .default(['MEN', 'WOMEN'] satisfies Gender[]),
  discountPercent: z.coerce
    .number()
    .max(100, { message: 'Percentage cannot be more than 100' })
    .default(0)
    .nullable(),
  discountedPrice: z.coerce.number().nullable(),
  slug: z.string(),
});

export type CreateProductForm = z.infer<typeof CreateProductFormSchema>;

type ProductFormProps = {
  itemId: string | null;
  isNew: boolean;
};

const defaultValues = {
  title: '',
  price: 0,
  description: '',
  categoryId: '',
  gender: ['MEN', 'WOMEN'],
  hasVariants: false,
  stockStatus: 'AVAILABLE',
  images: [],
  discountPercent: 0,
  discountedPrice: 0,
  slug: '',
} satisfies CreateProductForm;

const ProductForm: React.FC<ProductFormProps> = ({ itemId, isNew }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CreateProductForm>({
    resolver: zodResolver(CreateProductFormSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  const { trigger } = useItemUpsert();
  const { data: { data: item } = { data: null } } = useItem(
    isNew ? null : itemId,
  );
  const { isDirty, isValid } = form.formState;

  const isSubmitting = form.formState.isSubmitting;

  const { data: variants } = useVariants(itemId ?? '');

  const no_of_variants = variants?.data.length;

  useEffect(() => {
    if (!isNew && item) {
      form.reset({
        ...{
          ...defaultValues,
          ...item,
          images: (item.images as ImageSchemaType[]) ?? [],
        },
        categoryId: item.categoryId ?? '',
      });
    }
  }, [isNew, item, form]);

  const price = form.watch('price');
  const discountPercent = form.watch('discountPercent');

  useEffect(() => {
    const discountedPrice = price - (price * (discountPercent ?? 0)) / 100;
    form.setValue('discountedPrice', discountedPrice);
  }, [form, price, discountPercent]);

  const hasVariants = form.watch('hasVariants');

  const handleSubmit = async (data: CreateProductForm) => {
    try {
      const response = await trigger({
        ...data,
        id: isNew ? undefined : (itemId as string),
      });
      toast({
        title: isNew
          ? 'Product Added Successfully'
          : 'Product Updated Successfully',
      });

      router.replace(`/products/${response.data.id}`);
    } catch (e) {
      console.error('Error updating item:', e);
      toast({
        title: isNew ? 'Error adding Product' : 'Error updating Product',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-center w-full space-y-2 mt-16 bg-slate-200 p-5"
      >
        <div className="text-xl font-semibold">
          {isNew ? 'Add New Product' : item?.title}
        </div>
        <div className="flex h-full flex-col flex-grow ps-2 pe-2">
          <hr className="border-t-1 border-slate-400 mb-4 w-full" />
          <div className="grid grid-cols-2 gap-5 lg:px-10">
            <InputElement
              required
              name="title"
              placeholder="Title"
              label="Title"
            />
            <InputElement name="price" placeholder="Price" label="Price" />
          </div>
          <div className="grid grid-cols-2 gap-5 lg:px-10 mb-10">
            <InputElement name="slug" placeholder="Slug" label="Slug" />
          </div>
          <div className="grid grid-cols-1 lg:px-10 mt-2">
            <CategoryElement
              name="categoryId"
              placeholder="Category"
              label="Category"
            />
          </div>
          <div className="grid grid-cols-2 gap-5 lg:px-10 mt-2">
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
          <div className="grid grid-cols-1 lg:px-10 mt-2">
            <TextAreaElement
              name="description"
              placeholder="Description"
              label="Description"
            />
          </div>
          <div className="grid grid-cols-2 gap-5 lg:px-10 mt-10">
            {hasVariants == false && (
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
            )}
            <div></div>
            <FormField
              control={form.control}
              name="gender"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Gender</FormLabel>
                    <FormDescription>
                      Select the gender(s) this product is apt for.
                    </FormDescription>
                  </div>
                  {Genders.map((gender) => (
                    <FormField
                      key={gender}
                      control={form.control}
                      name="gender"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={gender}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(gender)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, gender])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== gender,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {gender}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <SwitchElement
                disabled={
                  !isNew && no_of_variants != undefined && no_of_variants > 0
                }
                name="hasVariants"
                label="Has Variant(s)"
              />
            </div>
          </div>
        </div>
        <hr className="border-t-1 border-slate-400 mb-4 w-full" />
        <div className="text-lg font-semibold">Product Images</div>
        <MultiImageUploaderElement name="images" />

        <div className=" mt-3 gap-2">
          <Button
            className="lg:px-5"
            type="submit"
            disabled={!isValid || !isDirty || isSubmitting}
          >
            {isNew ? 'Create' : 'Update'}
          </Button>
        </div>
      </form>
      {hasVariants && <VariantsTable itemId={itemId as string} />}
    </Form>
  );
};

export default ProductForm;
