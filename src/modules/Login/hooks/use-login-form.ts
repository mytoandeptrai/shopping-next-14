import { loginRequest } from '@/api/auth';
import { initialFormValue } from '@/modules/Login/hooks/config';
import { loginSchema, loginSchemaType } from '@/modules/Login/hooks/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useId } from 'react';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
  const formId = useId();
  const form = useForm<loginSchemaType>({
    defaultValues: initialFormValue,
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (res) => {
      console.log('res', res);
    },
  });

  const onSubmit = async (data: loginSchemaType) => {
    mutate(data);
  };

  return {
    formId,
    form,
    onSubmit,
  };
};
