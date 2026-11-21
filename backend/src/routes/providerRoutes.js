import express from 'express';
import { loginProvider, submitProviderVerification } from '../controllers/providerController.js';

const router = express.Router();

router.post('/login', loginProvider);
router.post('/verify', submitProviderVerification);

export default router;
