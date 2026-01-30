import express from 'express';
import {getAllTasks, createTask ,removeTask} from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createTaskSchema } from '../validators/taskValidators.js';
import { sanitizeTask } from './middleware/sanitizeMiddleware.js';
import { expressValidatorHandler } from '../middleware/expressValidatorHandlerMiddleware.js';


const router = express.Router();
router.use(authMiddleware);

router.get('/', getAllTasks);

router.post('/', sanitizeTask, validateRequest(createTaskSchema), expressValidatorHandler,  createTask);

router.delete('/:id', removeTask);

export default router;