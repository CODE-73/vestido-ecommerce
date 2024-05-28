import { Switch } from 'libs/shadcn-ui/src/ui/switch';
import { FormField } from 'libs/shadcn-ui/src/ui/form';
import { Control, FieldValues, FieldPath } from 'react-hook-form';
import { Label } from 'libs/shadcn-ui/src/ui/label';

export type SwitchElementProps<T extends FieldValues = FieldValues> = {
  name: FieldPath<T>;
  control?: Control<T>;
  label?: string;
};

export function SwitchElement<TFieldValues extends FieldValues = FieldValues>(
  props: SwitchElementProps<TFieldValues>
) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <div className="flex gap-3 items-center">
          <Switch
            onCheckedChange={(checked) => field.onChange(checked)}
            checked={field.value}
          />
          <Label>{props.label}</Label>
        </div>
      )}
    />
  );
}
