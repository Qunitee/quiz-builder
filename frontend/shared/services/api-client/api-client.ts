const ApiUrl = (
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
).replace(/\/+$/, '');

export interface ApiFieldError {
  path: string;
  message: string;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly fieldErrors: ApiFieldError[] = [],
  ) {
    super(message);
  }
}

type ErrorBody = {
  message?: string | string[];
  errors?: ApiFieldError[];
} | null;

async function sendRequest(path: string, init?: RequestInit) {
  try {
    return await fetch(`${ApiUrl}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
      cache: 'no-store',
    });
  } catch {
    throw new ApiError(0, 'Could not reach the server. Please try again.');
  }
}

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await sendRequest(path, init);

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as ErrorBody;
    const bodyMessage = Array.isArray(body?.message)
      ? body.message.join(', ')
      : body?.message;
    const message =
      bodyMessage || res.statusText || `Request failed (${res.status})`;
    throw new ApiError(res.status, message, body?.errors);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
