import { validationResult } from 'express-validator';
import { ValidationError } from '../utils/error.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  // if there errors
  if (!errors.isEmpty()) {
    throw new ValidationError(JSON.stringify(errors.array()));
  }
  next();
};
