import express from 'express';
import {getAllTasks, createTask ,removeTask} from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';



const router = express.Router();


router.get('/', authMiddleware, getAllTasks);

router.post('/', authMiddleware, createTask);

router.delete('/:id', authMiddleware, removeTask);

export default router;