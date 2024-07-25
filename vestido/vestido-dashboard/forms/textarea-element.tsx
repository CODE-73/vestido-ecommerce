import {
  Control,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@vestido-ecommerce/shadcn-ui/form';
import { Textarea, TextareaProps } from '@vestido-ecommerce/shadcn-ui/textarea';

export type TextAreaElementProps<T extends FieldValues = FieldValues> = Omit<
  TextareaProps,
  'defaultValue'
> & {
  name: FieldPath<T>;
  control?: Control<T>;
  required?: boolean;
  label?: string;
  validation?: ControllerProps<T>['rules'];
};

export function TextAreaElement<
  TFieldValues extends FieldValues = FieldValues,
>({ label, ...props }: TextAreaElementProps<TFieldValues>) {
  const validation: ControllerProps<TFieldValues>['rules'] =
    props.validation ?? {};

  if (props.required && !validation.required) {
    validation.required = 'This field is required';
  }

  return (
    <FormField
      {...props}
      rules={validation}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Textarea
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={props.placeholder}
          />
          <FormMessage className="-mt-3" />
        </FormItem>
      )}
    />
  );
}
