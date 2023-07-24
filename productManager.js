const pantalon = {
    title: 'Pantalon',
    description: 'prenda de vestir',
    price: 100,
    thumbnail: 'pantalon.jpg',
    code: 12,
    stock: 10
}

const remera = {
    id: 1,
    title: 'Remera',
    description: 'prenda de vestir',
    price: 60,
    thumbnail: 'remera.jpg',
    code: 123,
    stock: 10
}

const medias = {
    title: 'Medias',
    description: 'prenda de vestir',
    price: null,
    thumbnail: 'medias.jpg',
    code: 1234,
    stock: 10
}

class Product {
    constructor({ id, title, price, thumbnail, description, code, stock }) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.description = description;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor() {
        this.products = [];
    }

    validateProductCode(product) {
        let res = true;
        if (this.products.length > 0) {
            res = !this.products.some(prod => prod.code === product.code)
        }
        return res;
    }

    addProduct(prod) {
        let product = new Product(prod);

        const validateProps = product.title && product.price && product.thumbnail && product.description && product.code && product.stock;

        if (validateProps) {
            if (this.validateProductCode(product)) {
                this.products.push({ ...product, id: this.products.length + 1 })
                console.log('Producto agregado con éxito!')
            } else {
                console.log('Codigo de producto repetido')
            }
        } else {
            console.log('Todos los campos son obligatorios')
        }
    }

    getProductById(id) {
        let res = 'Not found'
        this.products.find(prod => {
            if (prod.id == id) {
                res = prod;
            }
        })
        return console.log(res);
    }

    // showProducts() {
    //     console.log('products', this.products)
    // }
}

const productManager = new ProductManager();
productManager.addProduct(pantalon)
productManager.addProduct(pantalon)
productManager.addProduct(remera)
productManager.addProduct(medias)
productManager.getProductById(2)
productManager.getProductById(999)
// productManager.showProducts()