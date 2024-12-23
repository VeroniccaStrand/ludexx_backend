import winston from 'winston';
import { AppError } from '../interface/middlewares/errorHandler.js';


const { combine, timestamp, printf, colorize, align, errors } = winston.format;


// Format för konsoltransporten
const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

// Format för filtransporten
const fileFormat = combine(
  errors({ stack: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf((info) => {
    const meta = info.meta ? `\nMeta: ${JSON.stringify(info.meta, null, 2)}` : '';
    if (info.stack) {
      return `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}\nStacktrace: ${info.stack}${meta}`;
    }
    return `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}${meta}`;
  })
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
   
    new winston.transports.File({
      filename: 'Error.log',
      format: fileFormat,
      level: 'error'
    }),
   
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
});


