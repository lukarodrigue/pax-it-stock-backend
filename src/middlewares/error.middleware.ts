import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
    error: "INTERNAL_SERVER_ERROR"
  });
}