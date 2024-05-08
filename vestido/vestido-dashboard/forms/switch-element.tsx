import { Switch } from 'components/ui/switch';
import { FormField } from 'components/ui/form';
import { Control, FieldValues, FieldPath } from 'react-hook-form';
import { Label } from 'components/ui/label';

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
