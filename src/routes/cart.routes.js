import { Router } from "express";
import cartModel from "../models/carts.models.js";

const cartRouter = Router();

cartRouter.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            cart.products.push({ id_prod: pid, quantity: quantity });
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart); // Actualizo el carrito de mi BDD con el nuevo producto
            res.status(200).send({ respuesta: "OK", mensaje: respuesta });
        }
    } catch (error) {
        res.status(400).send({
            error: `Error al consultar carritos: ${error}`,
        });
    }
});

cartRouter.put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            let findProd = false;
            cart.products.map((prod) => {
                if (prod.id_prod._id == pid) {
                    prod.quantity = quantity;
                    findProd = true;
                }
            });
            if (findProd) {
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart); //Actualizo el carrito de mi BDD con la cantidad de producto modificada
                res.status(200).send({
                    respuesta: "OK, producto actualizado",
                    mensaje: respuesta,
                });
            } else {
                res.status(404).send({
                    respuesta: "Error, producto no encontrado",
                });
            }
        }
    } catch (error) {
        res.status(400).send({
            error: `Error al consultar carritos: ${error}`,
        });
    }
});

cartRouter.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const { productos } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            cart.products = productos;
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart); // Actualizo el carrito de mi BDD con el array de productos por query params
            res.status(200).send({
                respuesta: "OK, productos modificados",
                mensaje: respuesta,
            });
        } else {
            res.status(404).send({
                resultado: "Not Found",
                message: respuesta,
            });
        }
    } catch (error) {
        res.status(400).send({
            error: `Error al modificar los productos del carrito: ${error}`,
        });
    }
});

cartRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        let prods;
        if (cid) {
            prods = await cartModel.findOne({ _id: cid });
            res.status(200).send({ resultado: "OK", message: prods });
        }
    } catch (error) {
        res.status(400).send({
            error: `Error al consultar carritos: ${error}`,
        });
    }
});

cartRouter.post("/", async (req, res) => {
    try {
        const respuesta = await cartModel.create({});
        res.status(200).send({
            resultado: "OK, carrito creado",
            message: respuesta,
        });
    } catch (error) {
        res.status(400).send({ error: `Error al crear carrito: ${error}` });
    }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartModel.findById(cid);
        const product = cart.products.find((prod) => prod.id_prod._id == pid);

        if (cart && product) {
            const prodIndex = cart.products.indexOf(product);
            cart.products.splice(prodIndex, 1);
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart); // Actualizo el carrito de mi BDD sin el producto correspondiente
            res.status(200).send({
                respuesta: "OK, producto eliminado",
                mensaje: respuesta,
            });
        } else {
            res.status(404).send({
                resultado: "Error, producto o carrito no encontrado",
            });
        }
    } catch (error) {
        res.status(400).send({
            error: `Error al eliminar el producto del carrito: ${error}`,
        });
    }
});

export default cartRouter;
