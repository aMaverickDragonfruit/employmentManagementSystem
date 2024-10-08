import express from 'express';

import {
  getAllRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistrationById,
  deleteRegistration,
} from '../controllers/registration.js';

import { verifyLoginToken, checkHR } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @route GET /api/registrations
 * @desc Get all registrations
 * @access Private, HR
 */
router.get('/', getAllRegistrations);

/**
 * @route GET /api/registrations/:id
 * @desc Get registration by ID
 * @access Private, HR
 */
router.get('/:id', getRegistrationById);

/**
 * @route POST /api/registrations
 * @desc Create a registration
 * @access Public
 */
router.post('/', createRegistration);

/**
 * @route PUT /api/registrations/:id
 * @desc Update a registration
 * @access Private, HR
 */
router.put('/:id', updateRegistrationById);

/**
 * @route DELETE /api/registrations/:id
 * @desc Delete a registrations
 * @access Private, HR
 */
router.delete('/:id', deleteRegistration);

export default router;
