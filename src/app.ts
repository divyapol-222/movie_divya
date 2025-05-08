import express, { Express, Request, Response, NextFunction } from 'express';
import request, { Response as SupertestResponse } from 'supertest';
import morgan from 'morgan';
import { config } from './config';
import moviesRoutes from './routes/movies';

interface InjectOptions {
  method: string;
  url: string;
  headers?: Record<string, string>;
  payload?: unknown;
}

export interface TestableApp extends Express {
  inject(options: InjectOptions): Promise<SupertestResponse>;
}

export default class AppFactory {
  static createApp(): TestableApp {
    const app = express() as TestableApp;

    app.use(express.json());

    if (config.env === 'development') {
      app.use(morgan('dev'));
    }

    app.use('/movies', moviesRoutes);

    app.use((req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: { message: 'The requested resource could not be found.' },
      });
    });

    app.use((err, req: Request, res: Response, next: NextFunction) => {
      // Handle errors with HTTP status codes
      if (err && err.statusCode) {
        const errorResponse: { success: false; error: { message: string; details?: unknown } } = {
          success: false,
          error: { message: err.message },
        };
        if (err.details) {
          errorResponse.error.details = err.details;
        }
        return res.status(err.statusCode).json(errorResponse);
      }
      console.error('Unhandled error:', err);
      res.status(500).json({
        success: false,
        error: { message: 'An unexpected error occurred on the server.' },
      });
    });

    app.inject = async (options: InjectOptions): Promise<SupertestResponse> => {
      return new Promise((resolve, reject) => {
        const originalListen = app.listen;
        // Prevent supertest from opening a real HTTP server
        // @ts-ignore
        delete app.listen;
        const method = options.method.toLowerCase() as keyof typeof request;
        // @ts-ignore
        let req = request(app)[method](options.url);

        // @ts-ignore
        app.listen = originalListen;

        if (options.headers) {
          for (const [key, value] of Object.entries(options.headers)) {
            req = req.set(key, value);
          }
        }
        if (options.payload) {
          req = req.send(options.payload);
        }

        // Execute the request
        // @ts-ignore
        req.end((err, res: SupertestResponse) => {
          if (err) return reject(err);
          // Add json() helper to return parsed body
          // @ts-ignore
          res.json = () => res.body;
          resolve(res);
        });
      });
    };

    return app;
  }
}