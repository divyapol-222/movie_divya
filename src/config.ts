import path from 'path';
// Load environment variables from .env if dotenv is available
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
} catch (err) {
  // dotenv not available or failed to load, ignore
}

export interface Config {
  port: number;
  env: string;
  moviesDb: string;
  ratingsDb: string;
  logLevel: string;
}

export const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  env: process.env.NODE_ENV || 'development',
  moviesDb: process.env.MOVIES_DB || path.resolve(process.cwd(), 'db', 'movies.db'),
  ratingsDb: process.env.RATINGS_DB || path.resolve(process.cwd(), 'db', 'ratings.db'),
  logLevel:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
};