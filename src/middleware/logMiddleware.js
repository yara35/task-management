import { prisma } from "../config/db.js";

const logMiddleware = async (req, res, next) => {
    const { method, originalUrl, body, params, query } = req;
    res.on('finish', async () => {
        if(req.user){
            await prisma.log.create({
                data: {
                    action: `${method} ${originalUrl} `,
                    userId: req.user.id
                }
            }); 
        }
    });
    next();
};

export default logMiddleware;