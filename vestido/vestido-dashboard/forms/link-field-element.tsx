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
import { LinkField } from 'components/modules/labs/LinkField';
import { InputProps } from 'components/ui/input';

export type InputElementProps<T extends FieldValues = FieldValues> = Omit<
  InputProps,
  'defaultValue'
> & {
  doctype: string;
  name: FieldPath<T>;
  control?: Control<T>;
  required?: boolean;
  validation?: ControllerProps<T>['rules'];
  wrapperClassName?: string;
  label?: string;
  description?: string | ReactElement;
};

export function LinkFieldElement<
  TFieldValues extends FieldValues = FieldValues
>({
  doctype,
  name,
  control,
  validation,
  label,
  description,
  type,
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
          <LinkField
            doctype={doctype}
            value={field.value ?? ''}
            onChange={field.onChange}
          />
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="-mt-3" />
        </FormItem>
      )}
    />
  );
}
