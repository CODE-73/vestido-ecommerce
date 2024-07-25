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
import {
  RadioGroup,
  RadioGroupItem,
} from '@vestido-ecommerce/shadcn-ui/radio-group';

export type RadioGroupElementProps<T extends FieldValues = FieldValues> = {
  name: FieldPath<T>;
  required?: boolean;
  validation?: ControllerProps<T>['rules'];
  control?: Control<T>;
  wrapperClassName?: string;
  label?: string;
  options: Array<{ label: string; value: string }>;
  defaultValue?: string;
  // other props as needed, similar to InputElementProps
};

export function RadioGroupElement<
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  validation,
  label,
  options,
  wrapperClassName,
  ...props
}: RadioGroupElementProps<TFieldValues>) {
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
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className={wrapperClassName}
          >
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`radio-${index}`} />
                {option.label && (
                  <FormLabel htmlFor={`radio-${index}`}>
                    {option.label}
                  </FormLabel>
                )}
              </div>
            ))}
          </RadioGroup>
          <FormMessage className="-mt-3" />
        </FormItem>
      )}
    />
  );
}
