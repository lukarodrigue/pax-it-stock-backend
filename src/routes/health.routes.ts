import { Router } from "express";
import { HealthController } from "../controllers/health.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { healthSchema } from "../schemas/health.schema.js";

const router = Router();

const healthController = new HealthController();

router.get("/", healthController.getStatus);

router.post(
  "/test",
  validate(healthSchema),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Dados válidos",
      data: req.body
    });
  }
);

export default router;