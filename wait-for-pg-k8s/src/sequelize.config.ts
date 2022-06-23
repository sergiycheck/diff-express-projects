import { Sequelize } from 'sequelize';
import logger from './logger';

const pgConfig = {
  db: process.env.PG_DB,
  host: process.env.PG_DB_HOST,
  pass: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
  port: +process.env.PG_DB_PORT,
};
const connectionStr = `postgres://${pgConfig.user}:${pgConfig.pass}@${pgConfig.host}:${pgConfig.port}/${pgConfig.db}`;
logger.debug(`connectionStr ${connectionStr}`);
export const sequelize = new Sequelize(connectionStr, {
  logging: (msg) => logger.debug(msg),
});
