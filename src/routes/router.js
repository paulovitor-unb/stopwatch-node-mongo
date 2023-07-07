import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).send("List of times!");
});
router.post("/", (req, res) => {
    res.status(201).send("Time saved!");
});

export default router;
