'use client';

import { useLoginForm } from '@/modules/Login/hooks';
import { useEffect } from 'react';

import { VStack } from '@/components/common';
import { TextField } from '@/components/shared/forms';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';

const Form = () => {
  const { form, formId, onSubmit } = useLoginForm();
  const { control, setFocus } = form;

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <FormWrapper form={form} formId={formId} onSubmit={onSubmit}>
      <VStack>
        <TextField control={control} name="email" placeholder="Enter your email..." />
        <TextField control={control} name="password" type="password" placeholder="Enter your password..." />
        <Button className="w-full" type="submit">
          Login
        </Button>
      </VStack>
    </FormWrapper>
  );
};

export default Form;
