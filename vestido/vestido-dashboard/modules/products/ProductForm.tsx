import React from 'react';
import { useRouter } from 'next/router';

import { LuChevronLeft } from 'react-icons/lu';

import { Genders, useItem } from '@vestido-ecommerce/items/client';
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

import MultiImageUploaderElement from '../../components/MultiImageUploaderElement';
import { CategoryElement } from '../../forms/category-combobox-element';
import { InputElement } from '../../forms/input-element';
import { RadioGroupElement } from '../../forms/radio-group-element';
import { SwitchElement } from '../../forms/switch-element';
import { TextAreaElement } from '../../forms/textarea-element';
import ProductFormTaxItem from './product-form-tax-item';
import ProductSizeForm from './ProductSizeForm';
import { useProductForm } from './use-product-form';

type ProductFormProps = {
  itemId: string | null;
  isNew: boolean;
};

const ProductForm: React.FC<ProductFormProps> = ({ itemId, isNew }) => {
  const router = useRouter();

  const { data: { data: item } = { data: null }, isLoading } = useItem(
    isNew ? null : itemId,
  );
  const { form, handleSubmit } = useProductForm(isNew, itemId, item);

  const hasVariants = form.watch('hasVariants');
  const { isSubmitting } = form.formState;

  if ((!isNew && !item) || isLoading) {
    return (
      <div className="h-screen flex">
        <span className="m-auto">Loading...</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-center w-full text-lg  bg-slate-200 px-5"
      >
        <div className="flex -mx-5 mb-5 py-4 px-4 bg-white">
          <div
            onClick={() => router.back()}
            className="flex gap-1 items-center cursor-pointer"
          >
            <LuChevronLeft />
            Back
          </div>
        </div>
        <div className="text-2xl font-semibold capitalize flex justify-between">
          {isNew ? 'Add New Product' : item?.title}
          <div>
            <SwitchElement name="enabled" label="Enabled" />
          </div>
        </div>
        <div className="flex h-full flex-col flex-grow ps-2 pe-2 pb-10">
          <hr className="border-t-1 border-slate-400 mb-4 w-full" />
          <div className="grid grid-cols-2 gap-5 lg:px-10">
            <InputElement name="title" placeholder="Title" label="Title" />
            <InputElement name="price" placeholder="Price" label="Price" />
          </div>
          <div className="grid grid-cols-2 gap-5 lg:px-10 mb-10">
            <InputElement name="slug" placeholder="Slug" label="Slug" />
            {!hasVariants && (
              <InputElement name="sku" placeholder="SKU" label="SKU" />
            )}
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

          <ProductFormTaxItem />
          <div className="grid grid-cols-2 gap-5 lg:px-10 mt-10">
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
          </div>
          {/* TODO: hasVariants field is disabled for now. */}
          <div className="hidden">
            <SwitchElement
              // disabled={!isNew && no_of_variants > 0}
              className="my-10"
              name="hasVariants"
              label="Has Variant(s)"
            />
          </div>
        </div>
        {hasVariants && (
          <>
            <hr className="border-t-1 border-slate-400 my-4 w-full" />
            <div className="text-lg font-semibold">Size Availability</div>
            <ProductSizeForm />
          </>
        )}
        <hr className="border-t-1 border-slate-400 my-4 w-full" />

        <div className="text-lg font-semibold">Product Images</div>
        <MultiImageUploaderElement name="images" />
        <Button
          className="lg:px-5 max-w-xs my-10"
          type="submit"
          disabled={isSubmitting}
        >
          {isNew ? 'Create' : 'Update'}
        </Button>
      </form>
      {/* TODO: Uncomment this when full variants are implemented */}
      {/* {hasVariants && <VariantsTable itemId={itemId as string} />} */}
    </Form>
  );
};

export default ProductForm;
