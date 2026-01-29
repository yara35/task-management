import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const prisma = new PrismaClient({
    log:
    process.env.NODE_ENV === "development"
    ? ["warn", "error"]
    : ["error"],
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };