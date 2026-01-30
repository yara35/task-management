import express from 'express';
import {getAllTasks, createTask ,removeTask} from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createTaskSchema } from '../validators/taskValidators.js';



const router = express.Router();
router.use(authMiddleware);

router.get('/', getAllTasks);

router.post('/', validateRequest(createTaskSchema), createTask);

router.delete('/:id', removeTask);

export default router;