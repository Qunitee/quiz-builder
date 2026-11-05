import { ApiError } from '@/shared/services/api-client/api-client';

const FallbackMessage = 'Something went wrong. Please try again.';

export function getErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : FallbackMessage;
}
