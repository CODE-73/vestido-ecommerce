import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { Gender } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { LuChevronLeft } from 'react-icons/lu';
import * as z from 'zod';
import { ZodError } from 'zod';

import {
  Genders,
  useCategory,
  useCategoryUpsert,
  useItems,
} from '@vestido-ecommerce/items/client';
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
import { VestidoError } from '@vestido-ecommerce/utils';

import { CategoryElement } from '../../forms/category-combobox-element';
import { InputElement } from '../../forms/input-element';
import { SwitchElement } from '../../forms/switch-element';
import ProductsTable from '../products/ProductsTable';
import { CategorySearchTermsInput } from './CategorySearchTermsInput';

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
  gender: z
    .array(z.nativeEnum(Gender))
    .refine((value) => value.some((gender) => gender), {
      message: 'You have to select at least one item.',
    })
    .default(['MEN', 'WOMEN'] satisfies Gender[]),
  slug: z.string().optional(),
  enabled: z.boolean().default(true),
  searchTerms: z.array(z.string()).default([]),
});

export type CreateCategoryForm = z.infer<typeof CreateCategoryFormSchema>;

interface CategoryFormProps {
  categoryId?: string;
  isNew: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categoryId, isNew }) => {
  // const { data: categories } = useCategories();
  const { toast } = useToast();
  const router = useRouter();
  const { data } = useItems();
  // const [searchQuery, setSearchQuery] = useState('');
  const form = useForm<CreateCategoryForm>({
    resolver: zodResolver(CreateCategoryFormSchema),
    defaultValues: {
      name: '',
      description: '',
      parentCategoryId: '',
      gender: ['MEN', 'WOMEN'],
      slug: '',
      enabled: true,
    },
  });
  // const parentCategoryId = form.watch('parentCategoryId');

  const { trigger } = useCategoryUpsert();
  const { data: { data: category } = { data: null }, isLoading } = useCategory(
    isNew ? null : categoryId,
  );

  const { isDirty, isValid } = form.formState;
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (!isNew && category) {
      form.reset({ ...category });
    }
  }, [isNew, category, form]);

  const handleSubmit = async (data: CreateCategoryForm) => {
    try {
      const response = await trigger({
        ...data,
        id: isNew ? undefined : categoryId,
      });
      toast({
        title: isNew
          ? 'Category Added Successfully'
          : 'Category Updated Successfully',
      });
      router.replace(`/categories/${response.data.id}`);
    } catch (e) {
      if (e instanceof VestidoError) {
        form.setError('root', { message: e.message });
        toast({
          title: isNew ? 'Error adding Category' : 'Error updating Category',
          description: e.message,
        });
      } else if (e instanceof ZodError) {
        for (const issue of e.issues) {
          form.setError(issue.path.join('.') as keyof CreateCategoryForm, {
            message: issue.message,
          });
          toast({
            title: isNew ? 'Error adding Category' : 'Error updating Category',
            description: issue.message,
          });
        }
      } else {
        console.error('Error updating category:', e);
      }
    }
  };

  if ((!isNew && !category) || isLoading) {
    return (
      <div className="h-screen flex">
        <span className="m-auto">Loading...</span>
      </div>
    );
  }

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
          {isNew ? 'Add New Category' : category?.name}
          <div>
            <SwitchElement name="enabled" label="Enabled" />
          </div>
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
            <div className="grid grid-cols-2 gap-5 mb-10">
              <InputElement name="slug" placeholder="Slug" label="Slug" />
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
            <CategoryElement
              nullable
              name="parentCategoryId"
              placeholder="Select Parent Category"
              label="Parent Category"
            />
            <CategorySearchTermsInput categoryId={categoryId} />
          </div>
        </div>

        <div className="grid grid-cols-8 mt-3 text-right gap-2">
          <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
            {isNew ? 'Create' : 'Update'}
          </Button>
        </div>
      </form>
      {!isNew && <ProductsTable data={data ?? []} categoryId={categoryId} />}
    </Form>
  );
};

export default CategoryForm;
