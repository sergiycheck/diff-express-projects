import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/error-handler';
import apiRoutes from './routes/routes';
import childProcessRouters from './routes/child-process.routes';
import workerThreadsRoutes from './routes/worker-threads.routes';

const createServer = async (): Promise<express.Application> => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.disable('x-powered-by');

  app.use(apiRoutes);
  app.use(childProcessRouters);
  app.use(workerThreadsRoutes);
  app.use(errorHandler);

  return app;
};

export default createServer;
