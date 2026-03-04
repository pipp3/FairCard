import { Router } from "express";
import { ConversationController } from "../controllers/conversationController.js";
import { validate } from "../middlewares/validate.js";
import { conversationSchema } from "../schemas/conversationSchema.js";


const router: Router = Router();

router.post("/", validate(conversationSchema), ConversationController.create);
router.get("/my-conversations", ConversationController.getMyConversations);
router.get("/:id", ConversationController.getConversationById);

export default router;