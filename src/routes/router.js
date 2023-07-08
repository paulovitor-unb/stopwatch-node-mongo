import { Router } from "express";

import usersFunctions from "../controllers/usersController.js";
import projectsFunctions from "../controllers/projectsController.js";
import timesFunctions from "../controllers/timesController.js";

const router = Router();

router.post("/users", usersFunctions.create);

router.post("/projects", projectsFunctions.create);

router.post("/times", timesFunctions.create);

export default router;
