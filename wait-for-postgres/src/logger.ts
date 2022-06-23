import winston from 'winston';
import logsDir from './logs-dir';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const dirname = logsDir();

const LoggerWrapper = (): winston.Logger => {
  return winston.createLogger({
    level: 'info',
    format: combine(label({ label: 'winston_log' }), timestamp(), myFormat),
    transports: [
      new winston.transports.File({ filename: 'access.log', dirname }),
      new winston.transports.File({
        filename: 'debug.log',
        dirname,
        level: 'debug',
      }),
      new winston.transports.File({
        filename: 'error.log',
        dirname,
        level: 'error',
      }),
    ],
    exitOnError: false,
  });
};

const logger = LoggerWrapper();

export default logger;
