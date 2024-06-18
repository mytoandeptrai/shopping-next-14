import { useId } from 'react';
import { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface SwitchProps<T extends FieldValues = FieldValues> {
  isChecked?: boolean;
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
}

export const SwitchField = <T extends FieldValues>({ control, name, ...props }: SwitchProps<T>) => {
  const id = useId();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Switch id={id} checked={field.value} onCheckedChange={field.onChange} {...props} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
