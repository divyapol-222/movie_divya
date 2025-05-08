import { config } from './config';
import AppFactory from './app';

const app = AppFactory.createApp();

/**
 * Start the Express server
 */
/**
 * Start the Express server
 */
export const start = (): void => {
  const server = app.listen(config.port, () => {
    console.log(`Server listening at port ${config.port}`);
  });
  server.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
};

// Invoke start if run directly
if (require.main === module) {
  start();
}