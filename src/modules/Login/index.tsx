import { Form } from '@/modules/Login/components';
import Link from 'next/link';

import { HStack } from '@/components/common';

const Login = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="lg:shadow-3xl container max-w-2xl space-y-6 p-12 lg:rounded-lg lg:border-x-gray-200">
        <Link passHref href="/">
          <h1 className="text-bold text-center text-2xl">Login Page</h1>
        </Link>
        <Form />
        <HStack pos="apart" className="text-xs md:text-base">
          <p className="mr-3 inline text-xs text-gray-800 md:text-base">Dont have an account yet ? </p>
          <Link href="/register" className="text-main text-base">
            Register
          </Link>
        </HStack>
      </section>
    </main>
  );
};

export default Login;
