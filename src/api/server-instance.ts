import { baseInstance } from '@/api/base-instance';
import { env } from '@/config';
import ky, { BeforeRequestHook } from 'ky';
import merge from 'lodash/merge';
import { cookies } from 'next/headers';

const beforeRequest: BeforeRequestHook = async (request) => {
  const token = cookies().get(env.COOKIE_NAME_TOKEN)?.value;
  const locale = cookies().get('NEXT_LOCALE')?.value;
  if (token) request.headers.set('Authorization', `Bearer ${token}`);
  if (locale) request.headers.set('X-Locale', locale);
};

export const serverInstance = ky.create(
  merge(baseInstance, {
    hooks: {
      beforeRequest: [beforeRequest],
    },
  })
);
