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

  const environment = process.env.NODE_ENV || 'development';

  // Metadata om felet och request
 const errorDetails = {
  route: `${req.method} ${req.originalUrl}`,
  body: Object.keys(req.body || {}).length ? req.body : null,
  params: Object.keys(req.params || {}).length ? req.params : null,
  query: Object.keys(req.query || {}).length ? req.query : null,
  stack: err.stack,
};

  if (err.isOperational) {
    logger.error(`Operational Error: ${err.message}`, { meta: errorDetails });

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(environment === 'development' && { stack: err.stack }),
    });
  } else {
    logger.error('Unhandled Error', { meta: errorDetails });

    res.status(500).json({
      success: false,
      message: environment === 'development' ? err.message : 'Something went very wrong!',
    });
  }
};

export { AppError, globalErrorHandler };