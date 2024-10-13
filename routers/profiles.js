import express from 'express';
import {
  getAllProfiles,
  getCurUserProfile,
  getProfileById,
  getProfileByUserId,
  updateProfileById,
  updateCurUserProfile,
  updateProfileByUserId,
  updateProfileDocStatusByUserId,
  updateCurUserProfileDoc,
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

/**
 * @route PUT /api/profiles/documents
 * @desc Update a profile's document status by user ID
 * @access Private HR
 */
router.put('/documents/status', updateProfileDocStatusByUserId);

/**
 * @route PUT /api/me/documents
 * @desc Update a current user's profile document
 * @access Private User
 */
router.put('/me/documents', verifyLoginToken, updateCurUserProfileDoc);

export default router;
