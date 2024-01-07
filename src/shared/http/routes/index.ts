import { AppError } from "@shared/errors/AppError";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  throw new AppError("Acesso negado", 401);
});

export { router };
