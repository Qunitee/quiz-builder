import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Prisma } from '../../generated/prisma/client';
import {
  INTERNAL_ERROR,
  PrismaErrors,
} from '../constants/prisma-errors.constant';

type Normalized = {
  status: HttpStatus;
  code: string;
  message: unknown;
  errors?: unknown;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { status, code, message, errors } = this.normalize(exception);

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }
    response.status(status).json({
      statusCode: status,
      code,
      message,
      errors,
      path: request.url,
      timeStamp: new Date().toISOString(),
    });
  }

  private normalize(exception: unknown): Normalized {
    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      const status = exception.getStatus();
      return {
        status,
        code: HttpStatus[status] ?? 'ERROR',
        message:
          typeof body === 'string'
            ? body
            : (body as { message: unknown }).message,
        errors:
          typeof body === 'object'
            ? (body as { errors?: unknown }).errors
            : undefined,
      };
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const mapped = PrismaErrors[exception.code as keyof typeof PrismaErrors];
      if (mapped) return mapped;
    }
    return INTERNAL_ERROR;
  }
}
