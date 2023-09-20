import * as productsService from '../services/products.service.js';
import * as cartsService from "../services/carts.services.js";
import * as usersService from "../services/users.service.js";
import logger from '../utils/loggers.js';

const renderRealtimeProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.render('realtimeproducts', { products });
  } catch (error) {
    logger.info('Error trying to get all products', error);
    res.status(500).send('Internal Server Error');
  }
};

const renderProductById = async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productsService.getProductById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('product', { product });
  } catch (error) {
    logger.info('Error trying to get product by id', error);
    res.status(500).send('Internal Server Error');
  }
};

const renderCartPage = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartsService.getById(cartId);
    const productsInCart = await cartsService.getById(cartId);

    const products = productsInCart.products.map((product) => {
      const { title, price, thumbnail } = product.productId;
      return { title, price, thumbnail };
    });

    res.render('cart', { cart, productsInCart, products });
  } catch (error) {
    logger.info('Error trying to get cart', error);
    res.status(500).send('Internal Server Error');
  }
};

const renderLoginPage = (req, res) => {
  try {
    res.render('login', {
      user: req.user
    });
  } catch (error) {
    logger.info('Error trying to get login page', error);
    res.status(500).send('Internal Server Error');
  }
};

const renderUsersPage = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.render('users', { users });
  } catch (error) {
    logger.info('Error trying to get all users', error);
    res.status(500).send('Internal Server Error');
  }
};

const renderResetPasswordPage = (req, res) => {
  res.render('resetPass');
};

const renderRegisterPage = (req, res) => {
  res.render('register');
}

const renderHomePage = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await productsService.getPaginatedProducts(page, limit);
    res.render('home', { products });
  } catch (error) {
    logger.info('Error trying to get paginated products', error);
    res.status(500).send('Internal Server Error');
  }
}

const renderProducts = async (req, res) => {
  try {
    const user = req.user;
    const { page = 1, limit = 10 } = req.query;
    const products = await productsService.getPaginatedProducts(page, limit);
    res.render('products', { products, cartId: user.cart });
  } catch (error) {
    logger.info('Error trying to get paginated products', error);
    res.status(500).send('Internal Server Error');
  }
}

export {
  renderProducts,
  renderHomePage,
  renderRegisterPage,
  renderResetPasswordPage,
  renderUsersPage,
  renderLoginPage,
  renderCartPage,
  renderProductById,
  renderRealtimeProducts,
};