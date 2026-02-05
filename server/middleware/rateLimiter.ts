import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '@/types';
import { logger } from '@/utils/logger';

// Create rate limiters for different endpoints
const weatherRateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => req.ip,
  points: 100, // Number of requests
  duration: 60, // Per 60 seconds
  blockDuration: 60, // Block for 60 seconds if limit exceeded
});

const authRateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => req.ip,
  points: 5, // Number of requests
  duration: 900, // Per 15 minutes
  blockDuration: 900, // Block for 15 minutes if limit exceeded
});

const generalRateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => req.ip,
  points: 1000, // Number of requests
  duration: 3600, // Per hour
  blockDuration: 3600, // Block for 1 hour if limit exceeded
});

export function rateLimiter(type: 'weather' | 'auth' | 'general' = 'general') {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limiter = type === 'weather' ? weatherRateLimiter : 
                      type === 'auth' ? authRateLimiter : 
                      generalRateLimiter;

      await limiter.consume(req.ip);
      next();
    } catch (rejRes) {
      const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
      
      logger.warn(`Rate limit exceeded for IP: ${req.ip}, type: ${type}`);
      
      res.set('Retry-After', String(secs));
      res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Demasiadas solicitudes. Por favor, inténtalo más tarde.',
          details: `Límite excedido. Intenta de nuevo en ${secs} segundos.`
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.headers['x-request-id'] as string || 'unknown',
          version: '2.0.0'
        }
      } as APIResponse);
    }
  };
}