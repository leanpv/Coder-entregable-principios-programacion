import express from 'express'
import multer from 'multer'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import routerProd from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import { __dirname } from './path.js'
import path from 'path'
import { ProductManager } from './controllers/productManager.js'
const PORT = 4000
const app = express()

//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
const io = new Server(server)

//Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => { //cb => callback
        cb(null, 'src/public/img') //el null hace referencia a que no envie errores
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) //concateno la fecha actual en ms con el nombre del archivo
        //1232312414heladera-samsung-sv
    }
})

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //URL extensas

app.engine('handlebars', engine()) //Defino que voy a trabajar con hbs y guardo la config
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

const upload = multer({ storage: storage })

// instancia de productManager
const productManager = new ProductManager('src/models/productos.txt')

//Conexion de Socket.io
io.on("connection", (socket) => {
    console.log("Conexion con Socket.io")

    socket.on('nuevoProducto', async (prod) => {
        console.log("PRODUCTO", prod)
        const resp = await productManager.addProduct(prod)
        socket.emit("mensajeProductoCreado", "El producto se creo correctamente")
    })
})

//Routes
app.use('/static', express.static(path.join(__dirname, '/public'))) //path.join() es una concatenacion de una manera mas optima que con el +
app.use('/api/product', routerProd)
app.use('/api/cart', routerCart)

//HBS
app.get('/static', (req, res) => {

    res.render("realTimeProducts", {
        rutaCSS: "realTimeProducts",
        rutaJS: "realTimeProducts"
    })

})

app.get('/productos', async (req, res) => {

    const prods = await productManager.getProducts();

    const tableHeaders = {title: 'Titulo', description: 'Descripcion', category: 'Categoria', price: 'Precio', stock: 'Stock', code: 'Codigo', id: 'ID'}

    res.render("products", {
        titulo: "products",
        rutaCSS: "products",
        productos: JSON.parse(prods.message),
        tableHeaders: tableHeaders,
        rutaJS: 'script'
    })
})


app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("Imagen cargada")
})