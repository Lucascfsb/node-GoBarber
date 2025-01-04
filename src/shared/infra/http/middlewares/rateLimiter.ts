import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';
import AppError from '@shared/errors/AppError';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.connect().catch(err => {
  console.error('Redis connection error:', err);
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimit',
  points: 10,
  duration: 1,

});


export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const ip = request.ip || '';
    await limiter.consume(ip);
    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}

process.on('SIGINT', async () => {
  await redisClient.quit();
  console.log('Redis client disconnected');
  process.exit(0);
});
