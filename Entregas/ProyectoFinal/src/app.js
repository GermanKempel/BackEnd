import express from "express";
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import sessionsRouter from "./routes/sessions.router.js";
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import './dao/dbManagers/dbConfig.js'
import config from './config/config.js';
import { addLogger } from "./utils/loggers.js";
import errorHandler from "./middlewares/errors/index.js";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();

app.use(session({
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
    ttl: 3600,
  }),
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentación de la API',
      description: 'Esta es la documentación de la API del proyecto final de Coderhouse',
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
};

const specs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('handlebars', handlebars.engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);
app.use(addLogger);

app.get('/loggerTest', (req, res) => {
  req.logger.fatal('Prueba Fatal');
  req.logger.error('Prueba Error');
  req.logger.warning('Prueba Warning');
  req.logger.info('Prueba Info');
  req.logger.http('Prueba Http');
  req.logger.debug('Prueba Debug');
});

const PORT = config.port;

app.listen(PORT, () =>
  console.log("Server listening on port" + PORT));
