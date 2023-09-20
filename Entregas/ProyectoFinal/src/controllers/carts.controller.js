import * as cartService from '../services/carts.services.js';
import * as ticketService from '../services/tickets.services.js';
import logger from '../utils/loggers.js';

const getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAll();
    res.send({ status: 'success', carts });
  } catch (error) {
    logger.info('Error trying to get all carts', error)
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getById(cartId);
    res.send({ status: 'success', cart });
  } catch (error) {
    logger.info('Error trying to get cart by id', error)
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = Number(req.body.quantity);
    const result = await cartService.addProduct(cartId, productId, quantity);
    res.send({ status: 'Product added to cart succesfully', result });
  } catch (error) {
    logger.info('Error trying to add product to cart', error)
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const removeProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const result = await cartService.removeProduct(cartId, productId);
    res.send({ status: 'Product removed from cart successfully', result });
  } catch (error) {
    logger.info('Error trying to remove product from cart', error)
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const removeAllProductsFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const result = await cartService.removeAllProducts(cartId);
    res.send({ status: 'success', result });
  } catch (error) {
    logger.info('Error trying to remove all products from cart', error)
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const updateCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body.products;
    const result = await cartService.updateCart(cartId, products);
    res.send({ status: 'success', result });
  } catch (error) {
    logger.info('Error trying to update cart', error)
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const updateProductQuantity = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = Number(req.body.quantity);
    const result = await cartService.updateProductQuantity(cartId, productId, quantity);
    res.send({ status: 'success', result });
  } catch (error) {
    logger.info('Error trying to update product quantity', error)
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const purchaseCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getById(cartId);
    const ticket = await ticketService.saveTicket({ purchaser: { userId: cart.userId }, totalPrice: cart.totalPrice });
    const result = await cartService.purchaseCart(cartId);
    console.log(cartId, ticket, cart);

    res.send({ status: 'success', ticket, cart, result });
  }
  catch (error) {
    logger.info('Error trying to purchase cart', error);
    res.status(500).send({ status: 'error', message: error.message });
  }
}
const saveCart = async (req, res) => {
  try {
    const cart = req.body;
    const result = await cartService.saveCart(cart);
    res.send({ status: 'success', result });
  } catch (error) {
    logger.info('Error trying to save cart', error)
    res.status(500).send({ status: 'error', message: error.message });
  }
}

export {
  getAllCarts,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  removeAllProductsFromCart,
  updateCart,
  updateProductQuantity,
  purchaseCart,
  saveCart
}