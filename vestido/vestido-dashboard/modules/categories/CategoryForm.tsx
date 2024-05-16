import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'libs/shadcn-ui/src/ui/form';
import { InputElement } from '../../forms/input-element';
import { Button } from 'libs/shadcn-ui/src/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCategoryUpsert } from '@vestido-ecommerce/items';
import { useCategory } from 'libs/items/src/swr/category';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { useRouter } from 'next/router';

const CreateCategoryFormSchema = z.object({
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
  parentCategoryId: z
    .string()
    .nullable()
    .transform((x) => {
      if (!x || x.length === 0) {
        return null;
      }
      return x;
    }),
});

export type CreateCategoryForm = z.infer<typeof CreateCategoryFormSchema>;

interface CategoryFormProps {
  categoryId?: string;
  isNew: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categoryId, isNew }) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CreateCategoryForm>({
    resolver: zodResolver(CreateCategoryFormSchema),
    defaultValues: {
      name: '',
      description: '',
      parentCategoryId: '',
    },
  });
  const { trigger } = useCategoryUpsert();
  const { data: { data: category } = { data: null }, error } = useCategory(
    isNew ? null : categoryId
  );

  console.log('category details is', category);
  const { isDirty, isValid, errors } = form.formState;
  const isSubmitting = form.formState.isSubmitting;
  console.info({ form: form.getValues(), isDirty, isValid, errors });

  useEffect(() => {
    if (!isNew && category) {
      form.reset({ ...category });
    }
  }, [isNew, category, form]);

  const handleSubmit = async (data: CreateCategoryForm) => {
    try {
      await trigger({
        ...data,
        id: isNew ? undefined : categoryId,
      });
      toast({
        title: isNew
          ? 'Category Added Successfully'
          : 'Category Updated Successfully',
      });
    } catch (e) {
      console.error('Error updating category:', e);
    }
    if (error) return <div>Error loading category details</div>;
    if (!category) {
      return <div>Loading category details...</div>;
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
          {isNew ? 'Add New Category' : 'Edit Category'}
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
            />
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

export default CategoryForm;
