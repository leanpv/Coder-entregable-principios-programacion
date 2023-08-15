import { Router } from 'express'
import { ProductManager } from '../controllers/productManager.js'

const productManager = new ProductManager('src/models/productos.txt')

const routerProd = Router()

routerProd.get('/', async (req, res) => {
    const { limit } = req.query
    const prods = await productManager.getProducts(limit)
    res.status(200).send(prods)
})

routerProd.get('/:id', async (req, res) => {
    const { id } = req.params
    const resp = await productManager.getProductById(parseInt(id))
    res.status(resp.status).send(resp.message)
})

routerProd.post('/', async (req, res) => {
    const resp = await productManager.addProduct(req.body)

    res.status(resp.status).send(resp.message)
})

routerProd.put('/:id', async (req, res) => {
    const resp = await productManager.updateProduct(parseInt(req.params.id), req.body)
    res.status(resp.status).send(resp.message)
})

routerProd.delete('/:id', async (req, res) => {
    const resp = await productManager.deleteProduct(req.params.id)
    res.status(resp.status).send(resp.message)
})

export default routerProd