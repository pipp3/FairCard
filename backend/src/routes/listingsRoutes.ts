import { Router } from "express";
import { ListingsController } from "../controllers/listingsController.js";
import { listingSchema, updateListingSchema } from "../schemas/listingsSchema.js";
import { validate } from "../middlewares/validate.js";

const router: Router = Router();

router.post("/", validate(listingSchema), ListingsController.create);
router.get("/", ListingsController.getAll);
router.get("/:id", ListingsController.getById);
router.put("/:id", validate(updateListingSchema), ListingsController.update);
router.delete("/:id", ListingsController.delete);

export default router;