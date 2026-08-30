import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validate(schema: z) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Dados inválidos",
        error: "VALIDATION_ERROR",
        details: result.error.issues
      });
    }

    req.body = result.data;

    next();
  };
}