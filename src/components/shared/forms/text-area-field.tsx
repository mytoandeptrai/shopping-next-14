import { ReactNode } from 'react';
import { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { Show } from '@/components/common/show';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextArea, TextAreaProps } from '@/components/ui/textarea';

interface Props<T extends FieldValues = FieldValues> extends TextAreaProps {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: ReactNode;
  required?: boolean;
  labelClassName?: string;
}

export const TextAreaField = <T extends FieldValues>({
  defaultValue,
  labelClassName,
  control,
  label,
  required,
  ...props
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={props.name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          <div className="flex w-full flex-col items-stretch justify-start gap-4">
            <FormControl className="w-full">
              <div>
                <Show when={!!label}>
                  <FormLabel className={labelClassName}>
                    {label} {required && <span className="text-error-light">*</span>}
                  </FormLabel>
                </Show>
                <TextArea {...field} {...props} />
              </div>
            </FormControl>
            <FormMessage className="mt-1 text-xs" />
          </div>
        </FormItem>
      )}
    />
  );
};
