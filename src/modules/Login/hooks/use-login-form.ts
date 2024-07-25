import { loginRequest } from '@/api/auth';
import { setStore } from '@/api/base-instance';
import { env } from '@/config';
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
      if (!res) return;
      setStore(env.COOKIE_NAME_TOKEN, res.data.accessToken);
      setStore(env.COOKIE_NAME_RF_TOKEN, res.data.refreshToken);
    },
  });

  const onSubmit = async (data: loginSchemaType) => {
    mutate(data);
  };

  return {
    formId,
    form,
    isPending,
    onSubmit,
  };
};
