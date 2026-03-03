import { Router } from "express";
import authRoutes from "./authRoutes.js";

const router:Router = Router();

router.use("/auth", authRoutes);



export default router;