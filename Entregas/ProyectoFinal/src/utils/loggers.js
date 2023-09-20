import winston from 'winston';
import config from '../config/config.js';

const { ENVIRONMENT } = config;

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },

  colors: {
    fatal: 'red',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    http: 'cyan',
    debug: 'blue',
  },
};

let logger;

if (ENVIRONMENT === 'development') {
  logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelOptions.colors }),
          winston.format.simple(),
        ),
      }),
      new winston.transports.File({
        filename: '/src/logs/errors.log',
        level: 'error',
      }),],
  });
} else {
  if (ENVIRONMENT === 'production') {
    logger = winston.createLogger({
      levels: customLevelOptions.levels,
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.colorize({ colors: customLevelOptions.colors }),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          filename: '/src/logs/errors.log',
          level: 'error',
        }),],
    });
  }
}

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.info(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
  next();
}

export default logger;