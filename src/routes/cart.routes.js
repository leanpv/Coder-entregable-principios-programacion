import { Router } from "express";
import cartModel from "../models/carts.models.js";

const cartRouter = Router()

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    console.log('cid, pid', cid, pid)
    console.log('quantity', quantity)
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            cart.products.push({ id_prod: pid, quantity: quantity })
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart) //Actualizo el carrito de mi BDD con el nuevo producto
            res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
        }
    } catch (e) {
        res.status(400).send({ error: e })
    }
})

cartRouter.get('/', async (req, res) => {
    const { limit } = req.query
    try {
        const prods = await cartModel.find().limit(limit)
        res.status(200).send({ resultado: 'OK', message: prods })
    } catch (error) {
        res.status(400).send({ error: `Error al consultar carritos: ${error}` })
    }
})

cartRouter.post('/', async (req, res) => {
    const { title, description, stock, code, price, category } = req.body

    try {
        const respuesta = await cartModel.create({
            title, description, stock, code, price, category
        })

        res.status(200).send({ resultado: 'OK', message: respuesta })
    } catch (error) {
        res.status(400).send({ error: `Error al crear producto: ${error}` })
    }
})

export default cartRouter