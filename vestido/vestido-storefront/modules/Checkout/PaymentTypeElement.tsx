import React from 'react';
import {
  Control,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@vestido-ecommerce/shadcn-ui/form';
import PaymentTypeSelector from './PaymentTypeSelector';

interface PaymentTypeElementProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control?: Control<T>;
  required?: boolean;
  validation?: ControllerProps<T>['rules'];
  label?: string;
  description?: string;
}

export function PaymentTypeElement<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  validation,
  label,
  description,
  ...props
}: PaymentTypeElementProps<TFieldValues>) {
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
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <PaymentTypeSelector
            {...props}
            value={field.value}
            onChange={field.onChange}
          />
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
