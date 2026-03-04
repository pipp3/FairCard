import type { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}