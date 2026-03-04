import type { Request, Response } from 'express';
import { createUser, getUserById, updateUser } from '../services/usersServices.js';

export class UsersController {

    static async create(req: Request, res: Response) {
        try {
            const data = await createUser(req.body);
            res.status(201).json(data);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByIdUser(req: Request, res: Response) {
        try {
           
            const { id } = req.params;
            if (!id || Array.isArray(id)) {
                res.status(400).json({ error: "Invalid user ID" });
                return;
            }
            const isAdmin = req.user.role === 'ADMIN';
            if (req.user.id !== id && !isAdmin) {
                return res.status(403).json({ error: "Access denied" });
            }
            const data = await getUserById(id);
            res.json(data);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    static async getMe(req: Request, res: Response) {
        try {
     
            const id = req.user.id;
            const data = await getUserById(id);
            res.json(data);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    static async updateUser(req: Request, res: Response) { 
        try {
            const id = req.user?.id;
            if (!id) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
            const data = await updateUser(id, req.body);
            res.json(data);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateUserById(req: Request, res: Response) {
        try {

            const { id } = req.params;
            if (!id || Array.isArray(id)) {
                res.status(400).json({ error: "Invalid user ID" });
                return;
            }
            const data = await updateUser(id, req.body);
            res.json(data);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}