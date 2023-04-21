import { Router } from 'express';
import CartManager from '../managers/CartManager.js';
import ProductManager from '../managers/ProductManager.js';


const router = Router();

const cartManager = new CartManager();

router.post('/', async (req, res) => {

  const cart = {
    products: [],
  }
  const result = await cartManager.save();
  res.send({ status: 'ok', result });

});

router.get('/:cid', async (req, res) => {
  const cartId = Number(req.params.cid);
  const cart = await cartManager.getCartById(cartId);
  if (!cart) {
    res.status(404).send({ status: 'error', message: 'Cart not found' });
    return;
  }
  res.send({ status: 'ok', cart });
});


router.post('/:cid/product/:pid', (req, res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  const cart = cartManager.getCartById(cartId);
  const product = ProductManager.getProductById(productId);
  const quantity = parseInt(req.body.quantity);
  if (!cart) {
    res.status(404).send({ status: 'error', message: 'Cart not found' });
    return;
  }
  if (!product) {
    res.status(404).send({ status: 'error', message: 'Product not found' });
    return;
  }
  if (quantity <= 0) {
    res.status(400).send({ status: 'error', message: 'Quantity must be greater than 0' });
    return;
  }
  if (quantity > product.stock) {
    res.status(400).send({ status: 'error', message: 'Quantity must be less than stock' });
    return;
  }
  const cartProduct = {
    product,
    quantity,
  }
  cart.products.push(cartProduct);
  res.send({ status: 'ok', cart });
});

export default router;