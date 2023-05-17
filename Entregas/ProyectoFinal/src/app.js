import express from "express";
import { Server } from 'socket.io';
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/ProductManager.js";
import mongoose from 'mongoose';

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

try {
  await mongoose.connect('mongodb+srv://GermanKempel:GcsLTjZBjYXUT5Ht@cluster0.tnbfe67.mongodb.net/?retryWrites=true&w=majority');
  console.log('Base de datos conectada');
} catch (error) {
  console.log('Error al conectar a la base de datos');
}

const server = app.listen(8080, () =>
  console.log("Server listening on port 8080"));

const io = new Server(server);

io.on('connection', async socket => {
  console.log('Nueva conexión');

  const productManager = new ProductManager("src/files/productos.json");
  const products = await productManager.getAll();

  io.emit('showProducts', products)

});

