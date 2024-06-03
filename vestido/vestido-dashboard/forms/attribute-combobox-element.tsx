import { useAttributes } from '@vestido-ecommerce/items';
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

interface AttributeComboboxProps {
  value?: string | null;
  onChange?: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}
export const AttributeCombobox: React.FC<AttributeComboboxProps> = ({
  value,
  onChange,
  onBlur,
  placeholder = 'Select Attribute',
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: attributes } = useAttributes(searchQuery);

  return (
    <Combobox
      className={clsx('overflow-x-clip', 'w-full', className)}
      placeholder={
        value
          ? attributes?.data.find((attribute) => attribute.id === value)?.name
          : placeholder
      }
      noOptionsText="No Attributes Found"
      fullWidth
      onSearch={setSearchQuery}
      options={
        attributes?.data.map((attribute) => ({
          value: attribute.id,
          label: attribute.name,
        })) || []
      }
      onChange={onChange}
      onBlur={onBlur}
      value={value ?? null}
    />
  );
};

export type AttributeElementProps<T extends FieldValues = FieldValues> =
  AttributeComboboxProps & {
    name: FieldPath<T>;
    control?: Control<T>;
    required?: boolean;
    validation?: ControllerProps<T>['rules'];
    wrapperClassName?: string;
    label?: string;
    description?: string | ReactElement;
  };

export function AttributeElement<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  validation,
  label,
  description,
  onBlur,
  ...props
}: AttributeElementProps<TFieldValues>) {
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
          <AttributeCombobox
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
