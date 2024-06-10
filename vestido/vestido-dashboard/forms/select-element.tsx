import { InputHTMLAttributes, ReactElement } from 'react';

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';

export type SelectProps = InputHTMLAttributes<HTMLSelectElement>;

export type SelectElementProps<T extends FieldValues = FieldValues> = Omit<
  SelectProps,
  'defaultValue'
> & {
  name: FieldPath<T>;
  control?: Control<T>;
  required?: boolean;
  validation?: ControllerProps<T>['rules'];
  options: { id: string; title: string }[];
  label?: string;
  description?: string | ReactElement;
  inputProps?: typeof SelectElement;
};

export function SelectElement<TFieldValues extends FieldValues = FieldValues>(
  props: SelectElementProps<TFieldValues>
) {
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
        <FormItem className="w-full">
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <Select
            {...props.inputProps}
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder={props.placeholder} />
              <FormMessage className="-mt-3" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{props.placeholder}</SelectLabel>
                {props.options.map((option) => (
                  <SelectItem key={option.id} value={option.id as string}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
