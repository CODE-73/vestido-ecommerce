import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodError } from 'zod';

import { type ItemDetails } from '@vestido-ecommerce/items';
import { useItemUpsert } from '@vestido-ecommerce/items/client';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { VestidoError } from '@vestido-ecommerce/utils';

import {
  CreateProductForm,
  CreateProductFormDefaultValues as defaultValues,
  CreateProductFormSchema,
  parseItemDetails,
} from './zod';

export const useProductForm = (
  isNew: boolean,
  itemId: string | null,
  item: ItemDetails | null,
) => {
  const { trigger } = useItemUpsert();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CreateProductForm>({
    resolver: zodResolver(CreateProductFormSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (!isNew && item) {
      form.reset(parseItemDetails(item));
    }
  }, [isNew, item, form]);

  // Price x Discount
  const price = form.watch('price');
  const discountPercent = form.watch('discountPercent');

  useEffect(() => {
    const discountedPrice = price - (price * (discountPercent ?? 0)) / 100;
    form.setValue('discountedPrice', discountedPrice);
  }, [form, price, discountPercent]);

  const handleSubmit = async (data: CreateProductForm) => {
    try {
      const response = await trigger({
        ...data,
        variants:
          data.variants?.filter((x) => x.enabled || x.id || x.sku) ?? [],
        id: isNew ? undefined : (itemId as string),
      });
      toast({
        title: isNew
          ? 'Product Added Successfully'
          : 'Product Updated Successfully',
      });

      if (isNew) {
        router.replace(`/products/${response.data.id}`);
      } else {
        form.reset({
          ...parseItemDetails(response.data),
        });
      }
    } catch (e) {
      if (e instanceof VestidoError) {
        if (e.name === 'ProductGenderNotSubsetOfCategoryGender') {
          form.setError('root', {
            message: e.message,
          });
          toast({
            title: isNew ? 'Error adding Product' : 'Error updating Product',
            description: e.message,
          });
        } else {
          form.setError('root', { message: e.message });
          toast({
            title: isNew ? 'Error adding Product' : 'Error updating Product',
            description: e.message,
          });
        }
      } else if (e instanceof ZodError) {
        for (const issue of e.issues) {
          form.setError(issue.path.join('.') as keyof CreateProductForm, {
            message: issue.message,
          });
          toast({
            title: isNew ? 'Error adding Product' : 'Error updating Product',
            description: issue.message,
          });
        }
      }
    }
  };

  return {
    form,
    handleSubmit,
  };
};
