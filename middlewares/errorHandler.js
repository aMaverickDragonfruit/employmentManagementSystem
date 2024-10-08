import CustomAPIError from '../errors/index.js';

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || 'Something went wrong, please try again' });
};

export default errorHandlerMiddleware;
