import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';
import errorHandler from './error-handler';
import childProcessRouters from './child-process.routes';

const createServer = async (): Promise<express.Application> => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.disable('x-powered-by');

  app.use(errorHandler);

  app.use(apiRoutes);
  app.use(childProcessRouters);

  return app;
};

export default createServer;
