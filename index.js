import dotenv from "dotenv";
dotenv.config();
import os from "os";

import express from "express";
import cors from "cors";

import router from "./src/routes/router.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use("/api", (req, res, next) => {
    if (req.method === "POST" && !req.body.data) {
        res.status(400).send("Missing data object in request body!");
        return;
    }
    next();
});
app.use("/api", router);

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
    if (process.env.MODE === "dev") {
        const localIPv4 = getLocalIPv4();
        if (localIPv4) {
            console.log(`Server running at http://${localIPv4}:${port}`);
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
