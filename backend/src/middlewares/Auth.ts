import type{ Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
    role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }
        const [bearer,token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Invalid authorization header format' });
        }
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }
        const secretKey = process.env.JWT_SECRET
        if (!secretKey) {
            return res.status(500).json({ message: 'JWT secret key not configured' });
        }
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        req.user = { id: decoded.userId, role: decoded.role } as any;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}