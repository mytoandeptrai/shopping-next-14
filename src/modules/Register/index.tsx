import Form from '@/modules/Register/components/form';
import Link from 'next/link';

import { HStack } from '@/components/common';

const Register = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="lg:shadow-3xl container max-w-2xl space-y-6 p-12 lg:rounded-lg lg:border-x-gray-200">
        <Link passHref href="/">
          <h1 className="text-bold text-center text-2xl">Register Page</h1>
        </Link>
        <Form />
        <HStack pos="apart" className="text-xs md:text-base">
          <p className="mr-3 inline text-xs text-gray-800 md:text-base">Have an account ? </p>
          <Link href="/login" className="text-main text-base">
            Login
          </Link>
        </HStack>
      </section>
    </main>
  );
};

export default Register;
