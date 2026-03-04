import { Router } from "express";
import { authMiddleware } from "../middlewares/Auth.js";
import authRoutes from "./authRoutes.js";
import listingsRoutes from "./listingsRoutes.js";
import usersRoutes from "./usersRoutes.js";
import conversationRoutes from "./conversationRoutes.js";
const router:Router = Router();

router.use("/auth", authRoutes);
router.use("/listings", authMiddleware, listingsRoutes);
router.use("/users", authMiddleware, usersRoutes);
router.use("/conversations", authMiddleware, conversationRoutes);



export default router;