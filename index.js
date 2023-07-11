import dotenv from "dotenv";
dotenv.config();
import os from "os";

import express from "express";
import cors from "cors";

import errorsMiddleware from "./src/middlewares/errorsMiddleware.js";
import router from "./src/routes/router.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.use("/api", errorsMiddleware.checkMissingData);
app.use("/api", router);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running!`);
    if (process.env.NODE_ENV === "development") {
        const localIPv4 = getLocalIPv4();
        if (localIPv4) {
            console.log(`Server @ http://${localIPv4}:${port}`);
        }
    }
});

const getLocalIPv4 = () => {
    const netInterfaces = os.networkInterfaces();

    for (let key in netInterfaces) {
        const localAddress = netInterfaces[key].find(
            (element) => element.family === "IPv4"
        );

        if (localAddress?.address) {
            return localAddress.address;
        }
    }
};
