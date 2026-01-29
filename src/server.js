import express from 'express';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/dp.js';
//import routes
import taskRoutes from './routes/taskRoutes.js';

config();
connectDB();


const app = express();

app.use("/tasks", taskRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
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
    sever.close( async () => {
        await disconnectDB();
        process.exit(0);
    });
});