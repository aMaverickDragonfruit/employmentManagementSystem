import jwt from 'jsonwebtoken';
import { AuthError } from '../utils/error.js';

export const verifyLoginToken = (req, res, next) => {
  const token =
    req.header('Authorization') ||
    req.headers?.authorization?.match(/^Bearer (.+)/)[1];
  if (!token) {
    throw new AuthError('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    if (err.name == 'TokenExpiredError') {
      throw new AuthError('Token has expired.');
    } else {
      throw new AuthError('Invalid token.');
    }
  }
};

export const verifyRegisterToken = (req, res, next) => {
  const token = req.params?.registerToken;

  if (!token) {
    throw new AuthError('Missing token from request URL!');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { firstName, middleName, lastName, email } = decoded;
    Object.assign(req.body, { firstName, middleName, lastName, email });
    next();
  } catch (err) {
    if (err.name == 'TokenExpiredError') {
      throw new AuthError('Token has expired.');
    } else {
      throw new AuthError('Invalid token.');
    }
  }
};

export const checkHR = (req, res, next) => {
  if (req.user.isHR) {
    next();
  } else {
    throw new AuthError('Not authorized as an HR');
  }
};
