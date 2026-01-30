import { prisma } from '../config/db.js';



const getAllTasks = async (req, res) => {
    try 
    {
        const tasks = await prisma.task.findMany();
        res.status(200).json({ status: "success", data: tasks });
    } catch (error) {     
        res.status(500).json({ status: "error", message: error.message });
    }
};


const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                userId: req.user.id
            }
        });
        res.status(201).json({ status: "success", data: task });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }   
};


const removeTask = async (req, res) => {
    try {
        const taskExists = await prisma.task.findUnique({
            where: { id: parseInt(req.params.id) }
        }); 
        if(!taskExists){
            return res.status(404).json({ status: "error", message: "Task not found" });
        }

        if(taskExists.userId !== req.user.id){
            return res.status(403).json({ status: "error", message: "You are not authorized to delete this task" });
        }

        await prisma.task.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(200).json({ status: "success", message: "Task deleted successfully"});
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


export { getAllTasks, createTask, removeTask };