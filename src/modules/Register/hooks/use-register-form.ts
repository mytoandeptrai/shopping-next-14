import { registerRequest } from '@/api/auth';
import { initialFormValue } from '@/modules/Register/hooks/config';
import { registerSchema, registerSchemaType } from '@/modules/Register/hooks/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';

export const useRegisterForm = () => {
  const formId = useId();
  const navigate = useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues: initialFormValue,
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerRequest,
    onSuccess: (res) => {
      if (!res) return;
      toast({
        description: res.message,
        variant: 'default',
      });
      navigate.push('/login');
    },
    onError: (error) => {
      toast({
        description: error?.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (data: registerSchemaType) => {
    mutate(data);
  };

  return {
    formId,
    form,
    isPending,
    onSubmit,
  };
};
