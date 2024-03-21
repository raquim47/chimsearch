'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useRef } from 'react';

const RQProvider = ({ children }: { children: React.ReactNode }) => {
  const clientRef = useRef<QueryClient>();
  if (!clientRef.current) {
    clientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false,
          retry: false,
        },
      },
    });
  }
  return (
    <QueryClientProvider client={clientRef.current}>
      {children}
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
};

export default RQProvider;
