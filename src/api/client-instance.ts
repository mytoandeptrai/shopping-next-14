import { reNewTokenRequest } from '@/api/auth';
import { baseInstance, getStore, setStore } from '@/api/base-instance';
import { env } from '@/config';
import { ExceptionCode } from '@/constants/exception-code';
import { ApiErrorResponse } from '@/types/ky-response.type';
import { default as Cookies, default as jsCookie } from 'js-cookie';
import ky, { AfterResponseHook, BeforeRequestHook, NormalizedOptions } from 'ky';
import merge from 'lodash/merge';

import { runtimeCheck } from '@/lib/run-time-check';

type AfterResponseHookWithProcess = (process: NodeJS.Process) => AfterResponseHook;

interface FailedRequests {
  resolve: (value: Response | PromiseLike<Response>) => void;
  reject: (reason?: unknown) => void;
  request: Request;
  response: Response;
  options: NormalizedOptions;
}

let failedRequests: FailedRequests[] = [];
let isTokenRefreshing = false;

const retryRequestAfterUnauthorized: AfterResponseHookWithProcess = (process) => {
  return async (request, options, response) => {
    if (runtimeCheck() === 'browser') {
      const data: any = await response.json();
      if (data.code === ExceptionCode.UNAUTHORIZED) {
        if (isTokenRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequests.push({
              resolve,
              reject,
              request,
              options,
              response,
            });
          });
        }

        isTokenRefreshing = true;

        try {
          const refreshToken = getStore(env.COOKIE_NAME_RF_TOKEN) ?? '';
          const res = await reNewTokenRequest(refreshToken);
          const { newAccessToken, newRefreshToken } = res.data;
          setStore(env.COOKIE_NAME_TOKEN, newAccessToken);
          setStore(env.COOKIE_NAME_RF_TOKEN, newRefreshToken);
          failedRequests.forEach(({ options, reject, request, resolve }) => {
            ky(request, options)
              .then((resHttp) => resolve(resHttp))
              .catch((errorHttp) => reject(errorHttp));
          });
        } catch (_error: unknown) {
          failedRequests.forEach(({ reject }) => reject(_error));
          window.location.href = '/login';
          return Promise.reject(_error);
        } finally {
          failedRequests = [];
          isTokenRefreshing = false;
        }

        return ky(request, options);
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
  const token = jsCookie.get(env.COOKIE_NAME_TOKEN);
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
