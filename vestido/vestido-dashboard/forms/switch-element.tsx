import { ComponentProps } from 'react';
import { Switch } from '@vestido-ecommerce/shadcn-ui/switch';
import { FormField } from 'libs/shadcn-ui/src/ui/form';
import { Control, FieldValues, FieldPath } from 'react-hook-form';
import { Label } from 'libs/shadcn-ui/src/ui/label';

export type SwitchElementProps<T extends FieldValues = FieldValues> =
  ComponentProps<typeof Switch> & {
    name: FieldPath<T>;
    control?: Control<T>;
    label?: string;
  };

export function SwitchElement<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  ...props
}: SwitchElementProps<TFieldValues>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex gap-3 items-center">
          <Switch
            onCheckedChange={(checked) => field.onChange(checked)}
            checked={field.value}
            {...props}
          />
          <Label>{label}</Label>
        </div>
      )}
    />
  );
}
