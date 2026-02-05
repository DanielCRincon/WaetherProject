import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '@/types';
import { logger } from '@/utils/logger';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error('Unhandled error:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Don't send error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';

  let statusCode = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let message = 'Error interno del servidor';

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = 'Error de validación';
  } else if (error.name === 'UnauthorizedError') {
    statusCode = 401;
    errorCode = 'UNAUTHORIZED';
    message = 'No autorizado';
  } else if (error.name === 'ForbiddenError') {
    statusCode = 403;
    errorCode = 'FORBIDDEN';
    message = 'Acceso prohibido';
  } else if (error.name === 'NotFoundError') {
    statusCode = 404;
    errorCode = 'NOT_FOUND';
    message = 'Recurso no encontrado';
  }

  const response: APIResponse = {
    success: false,
    error: {
      code: errorCode,
      message,
      ...(isDevelopment && { details: error.message })
    },
    meta: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string || 'unknown',
      version: '2.0.0'
    }
  };

  if (res.headersSent) {
    return next(error);
  }

  res.status(statusCode).json(response);
}