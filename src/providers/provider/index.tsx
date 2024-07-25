'use client';

import { FCC } from '@/types';
import { DefaultOptions, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React from 'react';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';

interface Props {}

const queryOption: DefaultOptions['queries'] = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

const queryClient = new QueryClient({ defaultOptions: { queries: queryOption } });

const Provider: FCC<Props> = ({ children }) => {
  const [_queryClient] = React.useState(() => queryClient);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <QueryClientProvider client={_queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        <TailwindIndicator />
        <ProgressBar height="4px" color="#133C65" options={{ showSpinner: false }} shallowRouting />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Provider;
