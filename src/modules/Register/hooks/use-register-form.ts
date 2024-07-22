import { initialFormValue } from '@/modules/Register/hooks/config';
import { registerSchema, registerSchemaType } from '@/modules/Register/hooks/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';

export const useRegisterForm = () => {
  const formId = useId();
  const form = useForm<registerSchemaType>({
    defaultValues: initialFormValue,
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: registerSchemaType) => {
    console.log('Submitting form:', data);
  };

  return {
    formId,
    form,
    onSubmit,
  };
};
