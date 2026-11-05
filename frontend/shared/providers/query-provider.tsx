'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiError } from '@/shared/services/api-client/api-client';

const MaxRetries = 2;

function isClientError(error: Error) {
  return error instanceof ApiError && error.status >= 400 && error.status < 500;
}

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) =>
          !isClientError(error) && failureCount < MaxRetries,
      },
    },
  });
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
