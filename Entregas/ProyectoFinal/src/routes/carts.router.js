import { Router } from 'express';
import CartsManager from '../dao/dbManagers/carts.managers.js';
import cartsModel from '../models/cart.model.js';

const router = Router();

const cartManager = new CartsManager();

router.post('/', async (req, res) => {
  const cart = {
    products: [],
  };
  const result = await cartManager.addNewCart(cart);
  res.send({ status: 'ok', result });
});

router.get('/', async (req, res) => {
  const carts = await cartManager.getCarts();
  res.send({ status: 'ok', carts });
});

router.get('/:cid', async (req, res) => {
  const cartId = Number(req.params.cid);
  const cart = await cartsModel.findById(cartId).populate('products');
  if (!cart) {
    res.status(404).send({ status: 'error', message: 'Cart not found' });
    return;
  }
  res.send({ status: 'ok', cart });
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  const result = await cartManager.addProductToCart(cartId, productId);
  res.send({ status: 'ok', result });
});

router.delete('/:cid/products/:pid', async (req, res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  const result = await cartManager.removeProductFromCart(cartId, productId);
  res.send({ status: 'ok', result });
});

router.put('/:cid', async (req, res) => {
  const cartId = Number(req.params.cid);
  const products = req.body.products;
  const result = await cartManager.updateCart(cartId, products);
  res.send({ status: 'ok', result });
});

router.put('/:cid/products/:pid', async (req, res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  const quantity = req.body.quantity;
  const result = await cartManager.updateProductQuantity(cartId, productId, quantity);
  res.send({ status: 'ok', result });
});

router.delete('/:cid', async (req, res) => {
  const cartId = Number(req.params.cid);
  const result = await cartManager.removeAllProductsFromCart(cartId);
  res.send({ status: 'ok', result });
});

export default router;