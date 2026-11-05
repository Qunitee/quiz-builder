import { HttpStatus } from '@nestjs/common';

export const PrismaErrors = {
  P2025: {
    status: HttpStatus.NOT_FOUND,
    code: 'NOT_FOUND',
    message: 'Resource not found',
  },
  P2002: {
    status: HttpStatus.CONFLICT,
    code: 'ALREADY_EXISTS',
    message: 'Resource already exists',
  },
  P2003: {
    status: HttpStatus.BAD_REQUEST,
    code: 'RELATED_NOT_FOUND',
    message: 'Related resource does not exist',
  },
  P2000: {
    status: HttpStatus.BAD_REQUEST,
    code: 'VALUE_TOO_LONG',
    message: 'Value is too long for the column',
  },
} as const;

export const INTERNAL_ERROR = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  code: 'INTERNAL_ERROR',
  message: 'Internal server error',
} as const;
