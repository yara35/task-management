import express from 'express';
import {register, login, logout} from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { registerSchema } from '../validators/authValidators.js';
import { sanitizeAuth } from './middleware/sanitizeMiddleware.js';
import { expressValidatorHandler } from '../middleware/expressValidatorHandlerMiddleware.js';
const router = express.Router();


router.post('/register', sanitizeAuth, validateRequest(registerSchema), expressValidatorHandler, register);
router.post('/login', login);
router.post('/logout', logout);

export default router;