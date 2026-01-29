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
        const { title, description, status,userId } = req.body;
        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                userId 
            }
        });
        res.status(201).json({ status: "success", data: task });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }   
};
export { getAllTasks, createTask };