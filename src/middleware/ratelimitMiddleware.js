import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, 
    message: 'Too many requests from this IP, please try again later.'
});

export default limiter; 