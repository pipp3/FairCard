import type { Request, Response } from "express";
import { registerUser,loginUser } from "../services/authServices.js";
export class UserController {

    static async register(req: Request, res: Response) {
        try {
            const data = await registerUser(req.body);
        
            res.status(201).json({ message: "Usuario registrado exitosamente", data });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const data = await loginUser(req.body);
          
            res.status(200).json({ message: "Inicio de sesión exitoso", data });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

}