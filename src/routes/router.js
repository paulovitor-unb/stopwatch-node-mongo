import { Router } from "express";

import routerController from "../controllers/routerController.js";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).send("<h1>API running!</h1>");
});

router.post("/:name", routerController.create);
router.get("/:name", routerController.readList);
router.get("/:name/:id", routerController.read);
router.post("/:name/:id", routerController.update);

export default router;
