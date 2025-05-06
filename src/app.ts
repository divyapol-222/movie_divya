import express, { Express, Request, Response, NextFunction } from 'express';
import request, { Response as SupertestResponse } from 'supertest';
import morgan from 'morgan';
import { config } from './config';
import moviesRoutes from './routes/movies';

interface InjectOptions {
  method: string;
  url: string;
  headers?: Record<string, string>;
  payload?: any;
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

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err.statusCode) {
        const errorResponse: any = {
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
        delete (app as any).listen;
        const method = options.method.toLowerCase() as keyof (typeof request);
        let req = (request(app) as any)[method](options.url);

        (app as any).listen = originalListen;

        if (options.headers) {
          for (const [key, value] of Object.entries(options.headers)) {
            req = req.set(key, value);
          }
        }
        if (options.payload) {
          req = req.send(options.payload);
        }

        req.end((err: any, res: SupertestResponse) => {
          if (err) return reject(err);
          (res as any).json = () => res.body;
          resolve(res);
        });
      });
    };

    return app;
  }
}