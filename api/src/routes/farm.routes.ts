import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createFarmSchema,
  updateFarmSchema,
} from "../validators/farm.validator.js";
import {
  createFarm,
  getMyFarms,
  getFarmById,
  updateFarm,
  deleteFarm,
} from "../controllers/farm.controller.js";

const router = Router();

router.post("/", requireAuth, validate(createFarmSchema), createFarm);
router.get("/", requireAuth, getMyFarms);
router.get("/:id", requireAuth, getFarmById);
router.put("/:id", requireAuth, validate(updateFarmSchema), updateFarm);
router.delete("/:id", requireAuth, deleteFarm);

export default router;
