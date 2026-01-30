import express from 'express';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';
import limiter from './middleware/ratelimitMiddleware.js';
import logMiddleware from './middleware/logMiddleware.js';
//import routes
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';

config();
connectDB();


const app = express();
app.use(express.json());

app.use(limiter);

app.use(logMiddleware);


app.get('/', (req, res) => {
  res.json({ message: 'Task Management API is running' });
});


app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection! Shutting down...' , err);
    server.close(async () =>{
        await disconnectDB();
        process.exit(1);
    });
});

process.on('unhandledException', async (err) => {
    console.error('Unhandled Exception! Shutting down...' , err);
    await disconnectDB();
    process.exit(1);
});

process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close( async () => {
        await disconnectDB();
        process.exit(0);
    });
});