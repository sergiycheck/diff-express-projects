import express from 'express';
import cors from 'cors';
import errorHandler from './error-handler';
import { sequelize } from './sequelize.config';
import { morganLogger } from './morgan-logger';
import logger from './logger';

const establishConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.debug('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
};

const createServer = async (): Promise<express.Application> => {
  await establishConnection();
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.disable('x-powered-by');

  app.use(errorHandler);
  app.use(morganLogger());

  app.get('/health', (_req, res) => {
    res.json({ message: 'up and working! yes!' });
  });

  app.get('/', (_req, res) => {
    res.json({ message: 'default' });
  });

  return app;
};

export default createServer;
