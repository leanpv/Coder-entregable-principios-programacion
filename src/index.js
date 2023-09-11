import "dotenv/config"; //Permite utilizar variables de entorno
import express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import mongoose from "mongoose";
const app = express();
const PORT = 4000;

mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        console.log("BDD conectada");
    })
    .catch((error) =>
        console.log("Error en conexion con MongoDB ATLAS: ", error)
    );

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
