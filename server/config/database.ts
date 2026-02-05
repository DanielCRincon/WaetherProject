import { Pool } from 'pg';
import { logger } from '@/utils/logger';

let pool: Pool;

export async function connectDB(): Promise<void> {
  try {
    pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'weather_app',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Test connection
    await pool.query('SELECT NOW()');
    logger.info('🗄️ Connected to PostgreSQL database');
  } catch (error) {
    logger.error('❌ Error connecting to PostgreSQL:', error);
    throw error;
  }
}

export { pool as db };