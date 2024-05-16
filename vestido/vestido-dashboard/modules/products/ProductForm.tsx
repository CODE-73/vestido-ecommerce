import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'libs/shadcn-ui/src/ui/form';
import { InputElement } from '../../forms/input-element';
import { useItemUpsert } from 'libs/items/src/swr/item/create-item';
import { Button } from 'libs/shadcn-ui/src/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useItem } from 'libs/items/src/swr/item';

const CreateProductFormSchema = z.object({
  title: z.string(),
  price: z.string(),
  description: z.string(),
  stock: z.string(),
  unit: z.string(),
  brand: z.string(),
});

export type CreateProductForm = z.infer<typeof CreateProductFormSchema>;

interface ProductFormProps {
  itemId?: string;
  isNew: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ itemId, isNew }) => {
  const form = useForm<CreateProductForm>({
    resolver: zodResolver(CreateProductFormSchema),
    defaultValues: {
      title: '',
      price: '',
      description: '',
      stock: '',
      unit: '',
      brand: '',
    },
  });
  const { trigger } = useItemUpsert();
  const { data: { data: item } = { data: null }, error } = useItem(
    isNew ? null : itemId
  );

  console.log('item details is', item);
  const { isDirty, isValid, errors } = form.formState;
  console.info({ form: form.getValues(), isDirty, isValid, errors });

  useEffect(() => {
    if (!isNew && item) {
      form.reset({ ...item });
    }
  }, [isNew, item, form]);

  const handleSubmit = async (data: CreateProductForm) => {
    try {
      await trigger({
        ...data,
        id: isNew ? undefined : itemId,
      });
    } catch (e) {
      console.error('Error updating item:', e);
    }
    if (error) return <div>Error loading Item details</div>;
    if (!item) {
      return <div>Loading item details...</div>;
    }
    console.log('HandleSubmit');
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
            <InputElement name="brand" placeholder="Brand" label="Brand" />
          </div>
          <div className="grid grid-cols-2 gap-5 lg:px-10">
            <InputElement name="unit" placeholder="unit" label="Unit" />
          </div>
          <div className="grid grid-cols-2 gap-5 lg:px-10">
            <InputElement name="stock" placeholder="Stock" label="Stock" />
          </div>
        </div>

        <div className="grid grid-cols-8 mt-3 text-right gap-2">
          <Button type="submit" disabled={!isValid || !isDirty}>
            {isNew ? 'Create' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
