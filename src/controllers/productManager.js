import { promises as fs } from 'fs'
import { Product } from './product.js'

export class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
    }

    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async getProducts(limit) {
        try {
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const products = prods.slice(0, limit)
            return { status: 200, message: `Productos: ${JSON.stringify(products)}` };
        } catch (error) {
            error.status = 400
            return error;
        }

    }

    async addProduct(prod) {

        try {
            const validateProps = prod.title && prod.price && prod.description && prod.code && prod.stock;
            if (!validateProps) throw new Error('Todos los campos son obligatorios')

            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const existProd = prods.find(producto => producto.code === prod.code)

            if (existProd) {
                throw new Error('Codigo de producto repetido')
            } else {
                prods.push( new Product(prod) )
                await fs.writeFile(this.path, JSON.stringify(prods))
                return { status: 200, message: 'Producto agregado con exito' }
            }
        } catch (error) {
            error.status = 400;
            return error;
        }

    }

    async getProductById(id) {
        try {
            let res = false;
            const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const prod = productos.find(prod => prod.id == id)
            if (prod) {
                res = { status: 200, message: `Producto: ${JSON.stringify(prod)}` };
            } else {
                throw new Error(`No existe producto con id: ${id}`)
            }
            return res;
        } catch (error) {
            error.status = 404
            return error
        }
    }

    async updateProduct(id, product) {
        try {
            if (product && id) {
                let productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
                let objIndex = productos.findIndex((obj => obj.id == id));
                if (objIndex > -1) {
                    productos[objIndex] = { ...product, id }
                    await fs.writeFile(this.path, JSON.stringify(productos))
                    return { status: 200, message: 'Producto actualizado con exito' }
                } else {
                    throw new Error(`No se encontró producto con id: ${id}`)
                }
            }
        } catch (error) {
            error.status = 404
            return error
        }

    }

    async deleteProduct(id) {
        try {
            if (id) {
                let productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
                let objIndex = productos.findIndex((obj => obj.id == id));
                if (objIndex > -1) {
                    productos.splice(objIndex, 1)
                    await fs.writeFile(this.path, JSON.stringify(productos))
                    return { status: 200, message: 'Producto eliminado con exito' }
                } else {
                    throw new Error(`No se encontró producto con id: ${id}`)
                }
            }
        } catch (error) {
            error.status = 404
            return error
        }
    }
}