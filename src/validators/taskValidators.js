import {z} from 'zod';

const createTaskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long") ,
    description: z.string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long"),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"],{
        errorMap: () => ({ message: "Status must be one of TODO, IN_PROGRESS, DONE" })
    }).optional(),
});

export { createTaskSchema };