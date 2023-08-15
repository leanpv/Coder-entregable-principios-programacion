import { promises as fs } from 'fs'
import { Cart } from './cart.js'
import { CartProduct } from './cartProduct.js'

export class CartManager {
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

    async addCart() {
        try {
            const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            carts.push(new Cart())
            await fs.writeFile(this.path, JSON.stringify(carts))
            return { status: 200, message: 'Carrito creado correctamente' };
        } catch (error) {
            return error;
        }
    }

    async getProductsCartById(id) {
        try {
            let res = false
            const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            carts.find(cart => {
                if (cart.id == id) {
                    res = cart.products;
                }
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async getProdsCartById(id) {
        try {
            let res = false
            const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            carts.find(cart => {
                if (cart.id == id) {
                    res = { status: 200, message: `Productos: ${JSON.stringify(cart.products)}` };
                } else {
                    throw new Error(`El carrito con id: ${id}, no tiene productos o no existe`)
                }
            })
            return res;
        } catch (error) {
            error.status = 404
            return error;
        }
    }

    async addProduct(cid, pid) {
        try {
            const products = JSON.parse(await fs.readFile('src/models/productos.txt', 'utf-8'));
            const product = products.find(prod => {
                if (prod.id == pid) {
                    return prod;
                }
            })
            let carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const cartIndex = carts.findIndex((cart => cart.id == cid));

            if (product && cartIndex > -1) {
                const cartProducts = await this.getProductsCartById(cid);
                const prodIndex = carts[cartIndex].products.findIndex((prod => prod.id == pid));
                const cartProduct = new CartProduct(product.id);

                if (cartProducts.length == 0) {
                    cartProducts.push({ ...cartProduct })
                    carts[cartIndex].products = cartProducts
                } else {
                    if (prodIndex > -1) {
                        cartProducts[prodIndex].quantity = cartProducts[prodIndex].quantity + 1;
                        carts[cartIndex].products = cartProducts;
                    } else {
                        carts[cartIndex].products.push({ ...cartProduct })
                    }
                }
                await fs.writeFile(this.path, JSON.stringify(carts))
            } else {
                if (cartIndex == -1) throw new Error('No existe carrito con id: ' + cid)
                if (!product) throw new Error('No existe producto con id: ' + pid)
            }
            return { status: 200, message: 'Producto agregado correctamente al carrito' };
        } catch (error) {
            error.status = 404
            return error
        }
    }
}