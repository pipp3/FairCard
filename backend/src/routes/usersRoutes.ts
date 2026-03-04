import { Router } from "express";
import { UsersController } from "../controllers/usersController.js";
import { createUserSchema, updateUserSchema } from "../schemas/usersSchema.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/Auth.js";
import { adminMiddleware } from "../middlewares/Admin.js";
const router: Router = Router();

router.post("/",  adminMiddleware, validate(createUserSchema), UsersController.create);
router.get("/me", UsersController.getMe);
router.get("/:id" , UsersController.getByIdUser);
router.put("/me", validate(updateUserSchema), UsersController.updateUser);
router.put("/:id", adminMiddleware, validate(updateUserSchema), UsersController.updateUserById);

export default router;