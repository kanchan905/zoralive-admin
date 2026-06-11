import { HttpErrorResponse } from '@angular/common/http';

export interface ApiMessageBody {
  message?: string;
  error?: string | { message?: string };
  errors?: string[] | Record<string, string[]>;
}

export function extractApiMessage(source: unknown, fallback: string): string {
  if (!source) {
    return fallback;
  }

  if (typeof source === 'string') {
    const trimmed = source.trim();
    return trimmed || fallback;
  }

  if (source instanceof HttpErrorResponse) {
    if (typeof source.error === 'string') {
      const trimmed = source.error.trim();
      if (trimmed) {
        return trimmed;
      }
    }

    const fromBody = extractApiMessage(source.error, '');
    if (fromBody) {
      return fromBody;
    }

    if (source.status === 0) {
      return 'Network error. Check your connection and try again.';
    }

    if (source.status === 401) {
      return 'Session expired or unauthorized. Please sign in again.';
    }

    if (source.status === 403) {
      return 'You do not have permission to perform this action.';
    }

    if (source.status === 404) {
      return 'The requested resource was not found.';
    }

    if (source.status >= 500) {
      return 'Server error. Please try again later.';
    }

    return fallback;
  }

  if (typeof source === 'object') {
    const body = source as ApiMessageBody;

    if (typeof body.message === 'string' && body.message.trim()) {
      return body.message.trim();
    }

    if (typeof body.error === 'string' && body.error.trim()) {
      return body.error.trim();
    }

    if (body.error && typeof body.error === 'object' && typeof body.error.message === 'string') {
      const nested = body.error.message.trim();
      if (nested) {
        return nested;
      }
    }

    if (Array.isArray(body.errors) && body.errors.length > 0) {
      return body.errors.filter(Boolean).join(', ');
    }

    if (body.errors && typeof body.errors === 'object') {
      const messages = Object.values(body.errors)
        .flat()
        .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);

      if (messages.length > 0) {
        return messages.join(', ');
      }
    }
  }

  return fallback;
}
