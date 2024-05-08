import { ReactElement, Ref } from 'react';

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
} from 'components/ui/form';
import { Input, InputProps } from 'components/ui/input';

export type InputElementProps<T extends FieldValues = FieldValues> = Omit<
  InputProps,
  'defaultValue'
> & {
  name: FieldPath<T>;
  control?: Control<T>;
  required?: boolean;
  validation?: ControllerProps<T>['rules'];
  wrapperClassName?: string;
  label?: string;
  description?: string | ReactElement;
  inputRef?: Ref<HTMLInputElement>;
};

export function InputElement<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  validation,
  label,
  description,
  onBlur,
  type,
  inputRef,
  ...props
}: InputElementProps<TFieldValues>) {
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
          <Input
            {...props}
            ref={inputRef}
            name={field.name}
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={(e) => {
              field.onBlur();
              onBlur?.(e);
            }}
            type={type ?? 'text'}
          />

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="-mt-3" />
        </FormItem>
      )}
    />
  );
}
