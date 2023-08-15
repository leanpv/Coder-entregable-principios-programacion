import { Router } from 'express'
import { CartManager } from '../controllers/cartManager.js'

const cartManager = new CartManager('src/models/carts.txt')

const routerCart = Router()

routerCart.get('/:id', async (req, res) => {
    const { id } = req.params
    const resp = await cartManager.getProdsCartById(parseInt(id))
    res.status(resp.status).send(resp.message)
})

routerCart.post('/', async (req, res) => {
    const resp = await cartManager.addCart()
    res.status(resp.status).send(resp.message)
})

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const resp = await cartManager.addProduct(parseInt(cid), parseInt(pid))
    res.status(resp.status).send(resp.message)
})


export default routerCart