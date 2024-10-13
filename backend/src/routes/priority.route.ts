import { Router } from "express";
import { createPriorityController, deletePriorityByIdController, getAllPrioritysController, getPrioriyByIdController } from "../controllers/priority";
import { updateBoardByIdController } from "../controllers/board";

export const priorityRoutes = Router();

priorityRoutes.get("/", getAllPrioritysController);
priorityRoutes.get("/:id", getPrioriyByIdController);
priorityRoutes.post("/", createPriorityController);
priorityRoutes.delete("/:id", deletePriorityByIdController);
priorityRoutes.patch("/:id", updateBoardByIdController);