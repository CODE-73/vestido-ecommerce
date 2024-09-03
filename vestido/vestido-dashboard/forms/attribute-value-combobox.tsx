import { FocusEventHandler, ReactElement, useState } from 'react';

import clsx from 'clsx';
import {
  Control,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import { useAttribute } from '@vestido-ecommerce/items/client';
import { Combobox } from '@vestido-ecommerce/shadcn-ui/combobox';
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@vestido-ecommerce/shadcn-ui/form';

interface AttributeValueComboboxProps {
  attributeId: string | null;
  value?: string | null;
  onChange?: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}
export const AttributeValueCombobox: React.FC<AttributeValueComboboxProps> = ({
  attributeId,
  value,
  onChange,
  onBlur,
  placeholder = 'Select Attribute',
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: attribute } = useAttribute(attributeId);

  // Doing the searchQuery filtration locally only because useAttribute returns ALL the attr-values
  const attrValueList = (attribute?.data?.values ?? []).filter((x) => {
    if (!searchQuery) {
      return true;
    }

    return x.value.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Combobox
      className={clsx('overflow-x-clip', 'w-full', className)}
      placeholder={
        value
          ? attrValueList?.find((attributeValue) => attributeValue.id === value)
              ?.value
          : placeholder
      }
      noOptionsText="No Attribute Values Found"
      fullWidth
      onSearch={setSearchQuery}
      options={
        attrValueList?.map((attributeValue) => ({
          value: attributeValue.id,
          label: attributeValue.value,
        })) || []
      }
      onChange={onChange}
      onBlur={onBlur}
      value={value ?? null}
    />
  );
};

export type AttributeValueElementProps<T extends FieldValues = FieldValues> =
  AttributeValueComboboxProps & {
    name: FieldPath<T>;
    control?: Control<T>;
    required?: boolean;
    validation?: ControllerProps<T>['rules'];
    wrapperClassName?: string;
    label?: string;
    description?: string | ReactElement;
  };

export function AttributeValueElement<
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  validation,
  label,
  description,
  onBlur,
  ...props
}: AttributeValueElementProps<TFieldValues>) {
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
          <AttributeValueCombobox
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
