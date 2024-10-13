import express from 'express';
import { mailSender } from '../controllers/mailer.js';

const router = express.Router();

router.post('/send-email', mailSender);

export default router;
