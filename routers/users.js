import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/users.js';
import { verifyLoginToken, checkHR } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @route GET /api/users
 * @desc Get all users
 * @access Public
 */
router.get('/', getAllUsers);

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 * @access Public
 */
router.get('/:id', getUserById);

/**
 * @route PUT /api/users/:id
 * @desc Update a user
 * @access Public
 */
router.put('/:id', updateUser);

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user
 * @access Private, Admin
 */
router.delete('/:id', deleteUser);

export default router;
