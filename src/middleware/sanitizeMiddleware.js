import { body } from "express-validator";

export const sanitizeAuth = [
    body('name').trim().escape(),
    body('email').normalizeEmail(),
    body('password').trim().escape()
];

export const sanitizeTask = [
    body('title').trim().escape(),
    body('description').trim().escape()
];

