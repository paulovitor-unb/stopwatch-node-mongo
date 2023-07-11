import { Router } from "express";

import usersController from "../controllers/usersController.js";
import projectsController from "../controllers/projectsController.js";
import timesController from "../controllers/timesController.js";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).send("<h1>API running!</h1>");
});

router.post("/users", usersController.create);

router.post("/projects", projectsController.create);

router.post("/times", timesController.create);

export default router;
