import { promises as fs } from 'fs'

export class Product {
    constructor({ title, price, thumbnail, description, code, stock }) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.description = description;
        this.code = code;
        this.stock = stock;
        this.id = Product.increId();
    }

    static increId() {
        if (this.incrementId) {
            this.incrementId++
        } else {
            this.incrementId = 1
        }
        return this.incrementId
    }
}

export class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async validateProductCode(product) {
        let res = true;
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if (productos.length > 0) {
            res = !productos.some(prod => prod.code === product.code)
        }
        return res;
    }

    async addProduct(product) {
        const validateProps = product.title && product.price && product.thumbnail && product.description && product.code && product.stock;

        if (validateProps) {
            if (await this.validateProductCode(product)) {
                const resultado = JSON.parse(await fs.readFile(this.path, 'utf-8'))
                await resultado.push({ ...product })
                await fs.writeFile(this.path, JSON.stringify(await resultado))
                console.log('Producto agregado con éxito!')
            } else {
                console.log('Codigo de producto repetido')
            }
        } else {
            console.log('Todos los campos son obligatorios')
        }
    }

    async getProductById(id) {
        let res = 'Not found'
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        productos.find(prod => {
            if (prod.id == id) {
                res = prod;
            }
        })
        return res;
    }

    async updateProduct(id, product) {
        let res = 'Es necesario un id y un producto a modificar'
        if (product && id) {
            let productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            let objIndex = productos.findIndex((obj => obj.id == id));
            if (objIndex > -1) {
                productos[objIndex] = { ...product, id }
                await fs.writeFile(this.path, JSON.stringify(productos))
                res = `Producto actualizado con éxito!`
            } else {
                res = 'No se ha encontrado un producto con ese id'
            }
        }
        return console.log(res);
    }

    async deleteProduct(id) {
        let res = 'Es necesario un id'
        if (id) {
            let productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            let objIndex = productos.findIndex((obj => obj.id == id));
            if (objIndex > -1) {
                productos.splice(objIndex, 1)
                await fs.writeFile(this.path, JSON.stringify(productos))
                res = `Producto eliminado con éxito!`
            } else {
                res = 'No se ha encontrado un producto con ese id'
            }
        }
        return console.log(res);
    }

    async getProducts() {
        const resultado = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return  resultado
    }
}

// const path = './products.txt'

// const productManager = new ProductManager(path);
// const product1A = new Product({
//     title: 'Remera',
//     description: 'prenda de vestir',
//     price: 60,
//     thumbnail: 'remera.jpg',
//     code: 123,
//     stock: 10
// })
// const product1B = new Product({
//     title: 'Pantalon',
//     description: 'prenda de vestir',
//     price: 75,
//     thumbnail: 'pantalon.jpg',
//     code: 124,
//     stock: 5
// })

// await productManager.addProduct(product1A)
// await productManager.getProductById(1)
// await productManager.updateProduct(1, product1B)
// await productManager.getProducts()
// await productManager.deleteProduct(1)
// await productManager.getProducts()