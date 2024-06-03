import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@vestido-ecommerce/shadcn-ui/form';
import { InputElement } from '../../forms/input-element';
import { useItemUpsert } from 'libs/items/src/swr/item/upsert-item';
import { Button } from 'libs/shadcn-ui/src/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useItem } from 'libs/items/src/swr/item';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { useRouter } from 'next/router';
import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';
import { Genders } from '@vestido-ecommerce/items';
import VariantsTable from '../variants/VariantsTable';
import { SwitchElement } from 'vestido/vestido-dashboard/forms/switch-element';

const CreateProductFormSchema = z.object({
  title: z.string(),
  price: z.string(),
  description: z.string(),
  stock: z.string(),
  unit: z.string(),
  hasVariants: z.boolean().default(false),
  gender: z
    .array(z.enum(Genders))
    .refine((value) => value.some((gender) => gender), {
      message: 'You have to select at least one item.',
    })
    .default(['MEN', 'WOMEN']),
});

export type CreateProductForm = z.infer<typeof CreateProductFormSchema>;

interface ProductFormProps {
  itemId?: string;
  isNew: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ itemId, isNew }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [showVariantsTable, setShowVariantsTable] = useState(false);
  const form = useForm<CreateProductForm>({
    resolver: zodResolver(CreateProductFormSchema),
    defaultValues: {
      title: '',
      price: '',
      description: '',
      stock: '',
      unit: '',
      gender: ['MEN', 'WOMEN'],
      hasVariants: false,
    },
  });
  const { trigger } = useItemUpsert();
  const { data: { data: item } = { data: null }, error } = useItem(
    isNew ? null : itemId
  );
  const { isDirty, isValid, errors } = form.formState;
  const isSubmitting = form.formState.isSubmitting;
  console.info({ form: form.getValues(), isDirty, isValid, errors });
  const hasVariants = form.watch('hasVariants');

  useEffect(() => {
    if (!isNew && item) {
      form.reset({ ...item });
    }
  }, [isNew, item, form]);

  const handleSubmit = async (data: CreateProductForm) => {
    try {
      const response = await trigger({
        ...data,
        id: isNew ? undefined : itemId,
      });
      toast({
        title: isNew
          ? 'Product Added Successfully'
          : 'Product Updated Successfully',
      });
      router.replace(`/products/${response.data.id}`);
    } catch (e) {
      console.error('Error updating item:', e);
    }
    setShowVariantsTable(hasVariants);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-center w-full space-y-8 mt-16 bg-slate-200 p-5"
      >
        <div className="text-lg font-bold">
          {isNew ? 'Add New Product' : 'Product Details'}
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
          <div className="grid grid-cols-2 gap-5 lg:px-10">
            <InputElement
              name="description"
              placeholder="Description"
              label="Description"
            />
          </div>
          <div className="grid grid-cols-2 gap-5 lg:px-10">
            <div>
              <InputElement name="unit" placeholder="unit" label="Unit" />
              <InputElement name="stock" placeholder="Stock" label="Stock" />
            </div>

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
                                          (value) => value !== gender
                                        )
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
          </div>
          <div>
            <SwitchElement name="hasVariants" label="Has Variant(s)" />
          </div>
        </div>

        <div className="grid grid-cols-8 mt-3 text-right gap-2">
          <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
            {isNew ? 'Create' : 'Update'}
          </Button>
        </div>
      </form>
      {(showVariantsTable || hasVariants) && (
        <VariantsTable itemId={itemId as string} />
      )}
    </Form>
  );
};

export default ProductForm;
