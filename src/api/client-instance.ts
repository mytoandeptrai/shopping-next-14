import { baseInstance } from '@/api/base-instance';
import { env } from '@/config';
import { ExceptionCode } from '@/constants/exception-code';
import { ApiErrorResponse } from '@/types/ky-response.type';
import { default as Cookies, default as jsCookie } from 'js-cookie';
import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';
import merge from 'lodash/merge';

import { runtimeCheck } from '@/lib/run-time-check';

type AfterResponseHookWithProcess = (process: NodeJS.Process) => AfterResponseHook;

const retryRequestAfterUnauthorized: AfterResponseHookWithProcess = (process) => {
  return async (request, options, response) => {
    if (runtimeCheck() === 'browser') {
      const data = await response.json();
      if (data.exceptionCode === ExceptionCode.UNAUTHORIZED) {
        window.location.href = '/login';
        // const data = await getRefresh();
        // if (data.success === true) {
        //   return ky(request, options);
        // } else {
        //   window.location.href = '/login';
        //   return;
        // }
      }
    }
  };
};

const throwServerErrorMessage: AfterResponseHook = async (request, options, response) => {
  if (response.status >= 400) {
    const responseData = (await response.json()) as ApiErrorResponse;

    throw responseData;
  }
};

const deleteClientCookiesPath: AfterResponseHook = async () => {
  if (Cookies.get(env.REDIRECT_URL)) {
    Cookies.remove(env.REDIRECT_URL);
  }
};

const beforeRequestInterceptor: BeforeRequestHook = async (request) => {
  const token = jsCookie.get('token');
  const locale = jsCookie.get('NEXT_LOCALE');
  if (token) request.headers.set('Authorization', `Bearer ${token}`);
  if (locale) request.headers.set('X-Locale', locale);
};

export const clientInstance = ky.create(
  merge(baseInstance, {
    hooks: {
      beforeRequest: [beforeRequestInterceptor],
      afterResponse: [retryRequestAfterUnauthorized(process), throwServerErrorMessage, deleteClientCookiesPath],
    },
  })
);
