import { Router } from "express";
import authRoutes from "./authRoutes.js";
import listingsRoutes from "./listingsRoutes.js";
import { authMiddleware } from "../middlewares/Auth.js";
import usersRoutes from "./usersRoutes.js";
const router:Router = Router();

router.use("/auth", authRoutes);
router.use("/listings", authMiddleware, listingsRoutes);
router.use("/users", authMiddleware, usersRoutes);


export default router;