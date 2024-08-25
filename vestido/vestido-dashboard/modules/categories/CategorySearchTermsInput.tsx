import { FC } from 'react';

import { useFormContext } from 'react-hook-form';
import { LuBrainCircuit } from 'react-icons/lu';

import { useCategorySearchTerms } from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@vestido-ecommerce/shadcn-ui/form';

export type CategorySearchTermsInputProps = {
  categoryId?: string;
};

export const CategorySearchTermsInput: FC<CategorySearchTermsInputProps> = (
  props,
) => {
  const form = useFormContext();
  const { trigger: _fetchSearchTerms, isMutating: isLoadingSearchTerms } =
    useCategorySearchTerms(props.categoryId);

  const fetchSearchTerms = () => {
    _fetchSearchTerms().then((r) => {
      const { searchTerms } = form.getValues();
      form.setValue(
        'searchTerms',
        Array.from(new Set([...searchTerms, ...r.searchTerms])),
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        },
      );
    });
  };

  return (
    <FormField
      control={form.control}
      name="searchTerms"
      render={({ field }) => {
        const value = field.value ?? [];

        return (
          <FormItem>
            <div className="flex">
              <div>
                <FormLabel className="text-base">Search Terms</FormLabel>
                <FormDescription>
                  Type the search terms for this category.
                </FormDescription>
              </div>
              <Button
                type="button"
                disabled={isLoadingSearchTerms}
                variant="ghost"
                className="ml-auto"
                onClick={fetchSearchTerms}
              >
                <LuBrainCircuit size={24} />
                AI
              </Button>
            </div>
            <textarea
              value={value.join('\n')}
              disabled={isLoadingSearchTerms}
              onBlur={field.onBlur}
              onChange={(e) => {
                const value = e.target.value.split('\n');
                field.onChange(value);
              }}
              className="border rounded-md p-2 w-full"
              placeholder="Search Terms"
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
