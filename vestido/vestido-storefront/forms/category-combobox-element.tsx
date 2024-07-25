import { useCategories } from '@vestido-ecommerce/items';
import { Combobox } from '@vestido-ecommerce/shadcn-ui/combobox';
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@vestido-ecommerce/shadcn-ui/form';
import clsx from 'clsx';
import { ReactElement, useState, FocusEventHandler } from 'react';
import {
  Control,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

interface CategoryComboboxProps {
  value?: string | null;
  onChange?: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

export const CategoryCombobox: React.FC<CategoryComboboxProps> = ({
  value,
  onChange,
  onBlur,
  placeholder = 'Select Category',
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data } = useCategories({ q: searchQuery });
  const categories = data?.success ? data.data : [];

  return (
    <Combobox
      className={clsx('overflow-x-clip', 'w-full', className)}
      placeholder={
        value
          ? categories.find((category) => category.id === value)?.name
          : placeholder
      }
      noOptionsText="No Categories Found"
      fullWidth
      onSearch={setSearchQuery}
      options={
        categories.map((category) => ({
          value: category.id,
          label: category.name,
        })) || []
      }
      onChange={onChange}
      onBlur={onBlur}
      value={value ?? null}
    />
  );
};

export type CategoryElementProps<T extends FieldValues = FieldValues> =
  CategoryComboboxProps & {
    name: FieldPath<T>;
    control?: Control<T>;
    required?: boolean;
    validation?: ControllerProps<T>['rules'];
    wrapperClassName?: string;
    label?: string;
    description?: string | ReactElement;
  };

export function CategoryElement<
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  validation,
  label,
  description,
  onBlur,
  ...props
}: CategoryElementProps<TFieldValues>) {
  validation ??= {};
  if (props.required && !validation.required) {
    validation.required = 'This field is required';
  }

  return (
    <FormField
      name={name}
      control={control}
      rules={validation}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <CategoryCombobox
            {...props}
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={(e) => {
              field.onBlur();
              onBlur?.(e);
            }}
          />

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="-mt-3" />
        </FormItem>
      )}
    />
  );
}
