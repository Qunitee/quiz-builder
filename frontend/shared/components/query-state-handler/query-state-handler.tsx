'use client';

import type { ReactNode } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { StateMessage } from '@/shared/components/state-message/state-message';
import { UiButton } from '@/shared/ui/ui-button/ui-button';
import { UiSpinner } from '@/shared/ui/ui-spinner/ui-spinner';
import { getErrorMessage } from '@/shared/utils/get-error-message.util';

interface QueryStateHandlerProps<T> {
  query: Pick<
    UseQueryResult<T>,
    'data' | 'error' | 'isPending' | 'isFetching' | 'isRefetchError' | 'refetch'
  >;
  isEmpty?: (data: T) => boolean;
  emptyState?: ReactNode;
  children: (data: T) => ReactNode;
}

export function QueryStateHandler<T>({
  query,
  isEmpty,
  emptyState,
  children,
}: QueryStateHandlerProps<T>) {
  const { data, error, isPending, isFetching, isRefetchError, refetch } = query;

  const retryButton = (
    <UiButton
      type="button"
      variant="outline"
      size="sm"
      disabled={isFetching}
      onClick={() => refetch()}
    >
      Try again
    </UiButton>
  );

  if (data !== undefined) {
    return (
      <>
        {isRefetchError && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <p className="text-sm text-destructive">
              Could not refresh: {getErrorMessage(error)}
            </p>
            {retryButton}
          </div>
        )}
        {isEmpty?.(data) ? emptyState : children(data)}
      </>
    );
  }

  if (isPending) {
    return (
      <div className="flex justify-center py-16">
        <UiSpinner />
      </div>
    );
  }

  return (
    <StateMessage
      icon="CircleX"
      title="Could not load data"
      description={getErrorMessage(error)}
    >
      {retryButton}
    </StateMessage>
  );
}
