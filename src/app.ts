import express from "express";
import healthRoutes from "./routes/health.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);

app.use(errorMiddleware);

export default app;