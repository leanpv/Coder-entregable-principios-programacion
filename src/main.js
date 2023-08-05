import express from 'express'
import { Product, ProductManager } from "./productManager/productManager.js";
import { pantalon, remera, medias } from './productManager/products.js';

const app = express()
const path = './src/DB/products.txt'
const PORT = 4000

app.use(express.urlencoded({ extended: true }))

const prodManager = new ProductManager(path);

if ((await prodManager.getProducts()).length === 0) {
    await prodManager.addProduct(new Product(pantalon))
    await prodManager.addProduct(new Product(remera))
    await prodManager.addProduct(new Product(medias))
}

app.get('/productos/:id', async (req, res) => {
    const prod = await prodManager.getProductById(parseInt(req.params.id))
    prod ? res.send(`<pre>${JSON.stringify(prod, null, 4)}<pre/>`) : res.send('no encontrado')
})


app.get('/productos', async (req, res) => {
    const { categoria, limit } = req.query
    const productos = await prodManager.getProducts()
    if (limit) productos = productos.slice(0, limit)
    res.send(`<pre>${JSON.stringify(productos, null, 4)}<pre/>`)
})


app.get('*', (req, res) => {
    res.send('Error 404')
})

app.listen(PORT, () => console.log(`Server on port: ${PORT}`))