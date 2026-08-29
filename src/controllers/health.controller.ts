import { Request, Response } from "express";
import { HealthService } from "../services/health.service.js";
import { successResponse } from "../utils/api-response.js";

const healthService = new HealthService();

export class HealthController {
  getStatus(req: Request, res: Response) {
    const status = healthService.getStatus();

    return res.status(200).json(
      successResponse(
        "API funcionando corretamente",
        status
      )
    );
  }
}