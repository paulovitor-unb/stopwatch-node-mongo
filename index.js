import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import router from "./src/routes/router.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use("/api", router);

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
