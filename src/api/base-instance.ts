import { env } from '@/config';
import type { Options } from 'ky';

export const store: { [key in string]: string } = {};

export const setStore = (key: string, value: string) => {
  store[key] = value;
};

export const getStore = (key: string): string | undefined => {
  return store[key];
};

export const removeStore = (key: string) => {};

export const baseInstance: Options = {
  prefixUrl: env.APP_URL,
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
