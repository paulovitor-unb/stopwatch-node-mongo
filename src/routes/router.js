import { Router } from "express";

import routerController from "../controllers/routerController.js";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).send("<h1>API running!</h1>");
});

router.post("/:modelName", routerController.create);
router.get("/:modelName", routerController.readList);
router.get("/:modelName/:id", routerController.read);
router.post("/:modelName/:id", routerController.update);

export default router;
