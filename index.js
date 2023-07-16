import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import errorsMiddleware from "./src/middlewares/errorsMiddleware.js";
const { errorsCheck } = errorsMiddleware;
import router from "./src/routes/router.js";
import getLocalIPv4Service from "./src/services/getLocalIPv4Service.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.use("/api", errorsCheck.missingData);
app.use("/api", router);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running!`);
    if (process.env.NODE_ENV === "development") {
        getLocalIPv4Service(port);
    }
});
