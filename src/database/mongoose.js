import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const dbURL = process.env.DB_URL;

mongoose.connect(dbURL);

const { connection } = mongoose;
connection.once("connected", () => {
    console.log("Conexão com banco de dados feita com sucesso!");
});
connection.on("disconnected ", () => {
    console.log("Conexão com banco de dados perdida!");
});
connection.on("reconnected ", () => {
    console.log("Conexão com banco de dados reestabelecida!");
});
connection.on("error", () => {
    console.log("Erro de conexão com o banco de dados!");
});

export default mongoose;
