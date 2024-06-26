import type { NextPage } from 'next';
import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

export type FCC<P = {}> = FC<PropsWithChildren<P>>;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface ErrorMutate {
  code: number;
  error_code: string;
  message: string | string[];
  dynamic_data?: {};
}

export interface IPaging {
  page: number;
  limit: number;
  total?: number;
}
