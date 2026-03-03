import { Router } from "express";
import { UserController } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";

const router:Router = Router();

router.post("/register",validate(registerSchema), UserController.register);
router.post("/login",   validate(loginSchema), UserController.login);

export default router;