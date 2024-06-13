import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputElement } from '../../forms/input-element';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCategoryUpsert } from '@vestido-ecommerce/items';
import { useCategory } from '@vestido-ecommerce/items';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { useRouter } from 'next/router';
import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';
import { Genders } from '@vestido-ecommerce/items';
import { Gender } from '@prisma/client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@vestido-ecommerce/shadcn-ui/form';
import { CategoryElement } from '../../forms/category-combobox-element';

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
  // const [searchQuery, setSearchQuery] = useState('');
  const form = useForm<CreateCategoryForm>({
    resolver: zodResolver(CreateCategoryFormSchema),
    defaultValues: {
      name: '',
      description: '',
      parentCategoryId: '',
      gender: ['MEN', 'WOMEN'],
    },
  });
  // const parentCategoryId = form.watch('parentCategoryId');

  const { trigger } = useCategoryUpsert();
  const { data: { data: category } = { data: null } } = useCategory(
    isNew ? null : categoryId
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
      console.error('Error updating category:', e);
    }
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
            <CategoryElement
              name="parentCategoryId"
              placeholder="Select Parent Category"
              label="Parent Category"
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
