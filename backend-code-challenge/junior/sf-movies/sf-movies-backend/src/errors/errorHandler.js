import AppError from './AppError.js';

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const handleCastError = (error) => {
  const statusCode = 400;
  const message = `Invalid Id ${error.value}`;

  return new AppError(message, statusCode);
};

export default async (err, req, res, next) => {
  console.log('The error occured', err);
  err.statusCode = err.statusCode || 500; // eslint-disable-line
  err.status = err.status || 'failure'; // eslint-disable-line

  if (process.env.NODE_ENV === 'development') {
    let error = Object.create(
      Object.getPrototypeOf(err),
      Object.getOwnPropertyDescriptors(err),
    );

    if (error.name === 'CastError') error = handleCastError(error);

    sendDevError(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.create(
      Object.getPrototypeOf(err),
      Object.getOwnPropertyDescriptors(err),
    );

    if (error.name === 'CastError') error = handleCastError(error);

    sendProdError(error, res);
  }
};
