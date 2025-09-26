import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import issuesRouter from "./issues/routes";

export function createApp(): Express {
  const app = express();

  // Middlewares
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.get("/health", (req: Request, res: Response) => {
    res.send("OK");
  });

  // Routes
  app.use("/api/issues", issuesRouter);

  return app;
}
