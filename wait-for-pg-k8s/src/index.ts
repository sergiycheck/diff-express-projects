import dotenv from 'dotenv';
dotenv.config();
import { AddressInfo } from 'net';
import http from 'http';
import createServer from './app';
import logger from './logger';

const port = process.env.PORT || 5002;

async function startServer() {
  const app = await createServer();

  try {
    const server = http.createServer(app).listen(port, () => {
      const addressInfo = server.address() as AddressInfo;
      logger.info(`Listening on port ${addressInfo.port}`);
    });
  } catch (error) {
    logger.error('could not create server ', error);
    process.exit(1);
  }
}

const gracefulShutdown = async () => {
  logger.info('gracefully shutting down');
  const { sequelize } = await import('./sequelize.config');
  await sequelize.close();
  process.exit();
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);

startServer();
