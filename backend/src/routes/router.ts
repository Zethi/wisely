import { Router } from "express";

import { boardRoutes } from "./board.route";
import { priorityRoutes } from "./priority.route";

export const allRoutes = Router();

allRoutes.use("/board", boardRoutes);
allRoutes.use("/priority", priorityRoutes);

