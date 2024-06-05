import { z } from 'zod';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputElement } from '../../forms/input-element';
import { Button } from 'libs/shadcn-ui/src/ui/button';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { useAttribute, useAttributeUpsert } from '@vestido-ecommerce/items';
import { Edit, Plus, Trash } from 'lucide-react';

const ItemAttributeValueSchema = z.object({
  value: z.string(),
});
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
  itemAttributeValues: z.array(ItemAttributeValueSchema).optional(),
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
  const { toast } = useToast();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const form = useForm<CreateItemAttributeForm>({
    mode: 'onBlur',
    resolver: zodResolver(CreateItemAttributeFormSchema),
    defaultValues: {
      name: '',
      description: '',
      itemAttributeValues: [],
    },
  });
  const { trigger } = useAttributeUpsert();
  const { data: { data: itemAttribute } = { data: null }, error } =
    useAttribute(isNew ? null : itemAttributeId);
  const { isDirty, isValid, errors } = form.formState;
  const isSubmitting = form.formState.isSubmitting;
  console.info({ form: form.getValues(), isDirty, isValid, errors });

  const itemAttributeValues = form.watch('itemAttributeValues');
  const lastValue =
    itemAttributeValues?.[itemAttributeValues.length - 1]?.value;

  useEffect(() => {
    if (!isNew && itemAttribute) {
      form.reset({
        name: itemAttribute.name,
        description: itemAttribute.description,
        itemAttributeValues: itemAttribute.ItemAttributeValues,
      });
    }
  }, [isNew, itemAttribute, form]);

  const attrValues = form.watch('itemAttributeValues') ?? [];
  const { append, remove } = useFieldArray({
    control: form.control,
    name: 'itemAttributeValues',
  });

  const [editingRowIdx, setEditingRowIdx] = useState<number>(-1);

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

      router.replace(`/attributes/${response.data.id}`);
    } catch (e) {
      console.error('Error updating item Attribute:', e);
    }
  };

  console.info(
    'AttributeItems Len',
    attrValues.length,
    attrValues.map((x) => x.value)
  );

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
            />
          </div>
        </div>
        <hr className="border-t-1 border-slate-400 mb-4 w-full" />
        <div>
          <div className="my-5 font-semibold text-lg">Attribute Values</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:px-10">
            {attrValues.map((field, index) => (
              <div
                key={index}
                className="grid grid-cols-5 items-center bg-white divide-x"
              >
                <div className="col-span-3">
                  {editingRowIdx === index || !field.value ? (
                    <Controller
                      name={`itemAttributeValues.${index}.value`}
                      control={form.control}
                      render={({ field }) => <InputElement {...field} />}
                    />
                  ) : (
                    <span className="px-4">{field.value}</span>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    setEditingRowIdx(editingRowIdx === index ? -1 : index)
                  }
                >
                  <Edit size={20} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                >
                  <Trash size={25} />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => {
                append({ value: '' });
                setEditingRowIdx(attrValues.length); // Set the newly added row to be in edit mode
              }}
              className=" bg-white opacity-75 border border-2 text-gray-300 border-dashed border-gray-300 hover:bg-white hover:opacity-100"
              disabled={attrValues.length != 0 && !lastValue}
            >
              <Plus />
            </Button>
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
