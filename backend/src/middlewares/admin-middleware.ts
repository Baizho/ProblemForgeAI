import { NextFunction, Request, Response } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing. Not Authorized.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = atob(token);
        if (payload.split(":")[0] !== process.env.ADMIN_LOGIN || payload.split(":")[1] !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ message: 'Access denied' });
        }
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
    next();
};