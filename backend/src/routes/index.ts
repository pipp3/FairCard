import { Router } from "express";
import authRoutes from "./authRoutes.js";
import listingsRoutes from "./listingsRoutes.js";
import { authMiddleware } from "../middlewares/Auth.js";
const router:Router = Router();

router.use("/auth", authRoutes);
router.use("/listings", authMiddleware, listingsRoutes);


export default router;