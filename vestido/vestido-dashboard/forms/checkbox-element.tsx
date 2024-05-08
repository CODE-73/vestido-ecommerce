import { ReactElement } from 'react';

import { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Checkbox } from 'components/ui/checkbox';
import { FormDescription, FormField, FormLabel } from 'components/ui/form';

export type CheckboxElementProps<T extends FieldValues = FieldValues> = {
  name: FieldPath<T>;
  control?: Control<T>;
  label?: string;
  description?: string | ReactElement;
};

export function CheckBoxElement<TFieldValues extends FieldValues = FieldValues>(
  props: CheckboxElementProps<TFieldValues>
) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <div className="flex gap-3 items-center">
          <Checkbox
            onCheckedChange={(checked) => field.onChange(checked)}
            checked={field.value}
          />
          <div className="space-y-1 leading-none">
            <FormLabel>{props.label}</FormLabel>
            {props.description && (
              <FormDescription>{props.description}</FormDescription>
            )}
          </div>
        </div>
      )}
    />
  );
}
