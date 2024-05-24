import { z } from 'zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
//import {useItemAttributeUpsert} from
//import { useItemAttributes, useItemAttribute } from '';'
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputElement } from '../../forms/input-element';
import { Button } from 'libs/shadcn-ui/src/ui/button';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';

const CreateItemAttributeFormSchema = z.object({
  name: z.string(),
  description: z
    .string()
    .nullable()
    .transform((x) => {
      if (!x || x.length === 0) {
        return null;
      }
      return x;
    }),
});

export type CreateItemAttributeForm = z.infer<
  typeof CreateItemAttributeFormSchema
>;

interface ItemAttributeFormProps {
  itemAttributeId?: string;
  isNew: boolean;
}

const ItemAttributeForm: React.FC<ItemAttributeFormProps> = ({
  itemAttributeId,
  isNew,
}) => {
  const { data: categories } = useCategories();
  const { toast } = useToast();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const form = useForm<CreateItemAttributeForm>({
    resolver: zodResolver(CreateItemAttributeFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const { trigger } = useItemAttributeUpsert();
  const { data: { data: itemAttribute } = { data: null }, error } =
    useItemAttribute(isNew ? null : itemAttributeId);

  console.log('Item Attribute details is', itemAttribute);
  const { isDirty, isValid, errors } = form.formState;
  const isSubmitting = form.formState.isSubmitting;
  console.info({ form: form.getValues(), isDirty, isValid, errors });

  useEffect(() => {
    if (!isNew && itemAttribute) {
      form.reset({ ...itemAttribute });
    }
  }, [isNew, itemAttribute, form]);

  const handleSubmit = async (data: CreateItemAttributeForm) => {
    try {
      const response = await trigger({
        ...data,
        id: isNew ? undefined : itemAttributeId,
      });
      toast({
        title: isNew
          ? 'Item Attribute Added Successfully'
          : 'Item Attribute Updated Successfully',
      });
      router.replace(`/itemAttributes/${response.data.id}`);
    } catch (e) {
      console.error('Error updating item Attribute:', e);
    }
    if (error) return <div>Error loading item Attribute details</div>;
    if (!itemAttribute) {
      return <div>Loading item Attribute details...</div>;
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
          {isNew ? 'Add New Item Attribute' : 'Edit Item Attribute'}
        </div>
        <div className="flex h-full flex-col flex-grow ps-2 pe-2">
          <hr className="border-t-1 border-slate-400 mb-4 w-full" />
          <div className="grid grid-cols-2 gap-5 lg:px-10">
            <InputElement
              required
              name="name"
              placeholder="Name"
              label="Name"
            />
            <InputElement
              name="description"
              placeholder="Description"
              label="Description"
            />{' '}
          </div>
        </div>

        <div className="grid grid-cols-8 mt-3 text-right gap-2">
          <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
            {isNew ? 'Create' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ItemAttributeForm;
