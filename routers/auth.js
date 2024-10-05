import express from 'express';
import { check } from 'express-validator';
import { loginUser, registerUser } from '../controllers/auth.js';
import { validate } from '../middlewares/validation.js';

const router = express.Router();

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
router.post(
  '/login',
  [
    check('userName', 'Please provide a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  validate,
  loginUser
);

/**
 * @route POST /api/auth/register
 * @desc Register user
 * @access Public
 */
router.post(
  '/register',
  [
    check('lastName', 'Last name is missing in Token').notEmpty(),
    check('firstName', 'First name is missing in Token').notEmpty(),
    check('email', 'Email is missing in Token').notEmpty(),
    check('userName', 'Please provide a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  validate,
  registerUser
);

export default router;
