'use client';

import { useLoginForm } from '@/modules/Login/hooks';
import { useEffect } from 'react';

import { VStack } from '@/components/common';
import { TextField } from '@/components/shared/forms';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';

const Form = () => {
  const { form, formId, isPending, onSubmit } = useLoginForm();
  const { control, setFocus } = form;

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <FormWrapper form={form} formId={formId} onSubmit={onSubmit}>
      <VStack>
        <TextField control={control} name="email" disabled={isPending} placeholder="Enter your email..." />
        <TextField
          control={control}
          name="password"
          type="password"
          disabled={isPending}
          placeholder="Enter your password..."
        />
        <Button className="w-full" type="submit" disabled={isPending}>
          Login
        </Button>
      </VStack>
    </FormWrapper>
  );
};

export default Form;
