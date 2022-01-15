import { Application } from 'express';
import entryRouter from './api/controllers/entry/router';
import healthRouter from './api/controllers/health/router';

export default function routes(app: Application): void {
  app.use('/api/v1/entry', entryRouter);
  app.use('/health', healthRouter);
}
