import express from 'express';
import {
  getAllProfiles,
  getCurUserProfile,
  getProfileById,
  getProfileByUserId,
  updateProfileById,
  updateCurUserProfile,
  updateProfileByUserId,
} from '../controllers/profiles.js';
import { verifyLoginToken, checkHR } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @route GET /api/profiles
 * @desc Get all profiles
 * @access Public
 */
router.get('/', getAllProfiles);

/**
 * @route GET /api/profiles/me
 * @desc Get current user's profile
 * @access Private
 */
router.get('/me', verifyLoginToken, getCurUserProfile);

/**
 * @route GET /api/profiles/:id
 * @desc Get a profile by ID
 * @access Public
 */
router.get('/:id', getProfileById);

/**
 * @route GET /api/profiles/users/:id
 * @desc Get a profile by user ID
 * @access Public
 */
router.get('/users/:id', getProfileByUserId);

/**
 * @route PUT /api/profiles/me
 * @desc Update a profile by current user ID
 * @access Private User
 */
router.put('/me', verifyLoginToken, updateCurUserProfile);

/**
 * @route PUT /api/profiles/:id
 * @desc Update a profile by ID
 * @access Public
 */
router.put('/:id', updateProfileById);

/**
 * @route PUT /api/profiles/:id
 * @desc Update a profile by user ID
 * @access Public
 */
router.put('/users/:id', updateProfileByUserId);

export default router;
