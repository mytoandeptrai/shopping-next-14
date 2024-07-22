import { initialFormValue } from '@/modules/Login/hooks/config';
import { loginSchema, loginSchemaType } from '@/modules/Login/hooks/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
  const formId = useId();
  const form = useForm<loginSchemaType>({
    defaultValues: initialFormValue,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: loginSchemaType) => {
    console.log('Submitting form:', data);
  };

  return {
    formId,
    form,
    onSubmit,
  };
};
