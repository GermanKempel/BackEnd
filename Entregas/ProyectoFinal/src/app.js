import express from "express";
import { Server } from 'socket.io';
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./dao/fileManagers/ProductManager.js";
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import sessionsRouter from "./routes/sessions.router.js";
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import authRouter from './routes/auth.router.js'
import cookieParser from 'cookie-parser';

const app = express();

try {
  await mongoose.connect('mongodb+srv://GermanKempel:GcsLTjZBjYXUT5Ht@cluster0.tnbfe67.mongodb.net/?retryWrites=true&w=majority');
  console.log('Base de datos conectada');
} catch (error) {
  console.log('Error al conectar a la base de datos');
}

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
    ttl: 3600,
  }),
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// app.engine('handlebars', handlebars.engine({
//   runtimeOptions: {
//     allowProtoPropertiesByDefault: true,
//     allowProtoMethodsByDefault: true
//   }
// }));

app.engine('handlebars', handlebars.engine())

app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/auth', authRouter);

app.listen(8080, () =>
  console.log("Server listening on port 8080"));

// const io = new Server(server);

// io.on('connection', async socket => {
//   console.log('Nueva conexión');

//   const productManager = new ProductManager("src/files/productos.json");
//   const products = await productManager.getAll();

//   io.emit('showProducts', products)

// });

