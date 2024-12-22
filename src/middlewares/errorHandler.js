import {logger} from '../utils/logger.js'


class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor)
  }
}

const globalErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err); 
  }

  if (err.isOperational) {
    logger.error(`Operational Error: ${err.message}`, { statusCode: err.statusCode, stack: err.stack });
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    logger.error('Unhandled Error', { stack: err.stack || 'No stacktrace' });
    res.status(500).json({
      success: false,
      message: 'Something went very wrong!',
    });
  }
};

export { AppError, globalErrorHandler };