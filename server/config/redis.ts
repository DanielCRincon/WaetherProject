import { createClient } from 'redis';
import { logger } from '@/utils/logger';

let client: ReturnType<typeof createClient>;

export async function connectRedis(): Promise<void> {
  try {
    client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      password: process.env.REDIS_PASSWORD,
    });

    client.on('error', (err) => logger.error('Redis Client Error', err));
    client.on('connect', () => logger.info('🔄 Connected to Redis'));
    client.on('ready', () => logger.info('🚀 Redis Client Ready'));
    client.on('end', () => logger.info('📴 Redis Client Disconnected'));

    await client.connect();
  } catch (error) {
    logger.error('❌ Error connecting to Redis:', error);
    throw error;
  }
}

export { client as redis };