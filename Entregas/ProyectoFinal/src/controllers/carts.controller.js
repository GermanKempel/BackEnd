import {
  saveCart as saveCartService,
  getAllCarts as getAllCartsService,
  getCartById as getCartByIdService,
  addProductToCart as addProductToCartService,
  removeProductFromCart as removeProductFromCartService,
  removeAllProductsFromCart as removeAllProductsFromCartService,
  updateCart as updateCartService,
  updateProductQuantity as updateProductQuantityService,
  purchaseCart as purchaseCartService
} from '../services/carts.services.js';

const saveCart = async (req, res) => {
  const cart = req.body;
  await saveCartService(cart);
  res.send(cart)
}

const getAllCarts = async (req, res) => {
  const carts = await getAllCartsService();
  res.send(carts);
}

const getCartById = async (req, res) => {
  const cartId = Number(req.params.cid);
  const cart = await getCartByIdService(cartId).populate('products');
  if (!cart) {
    res.status(404).send({ status: 'error', message: 'Cart not found' });
    return;
  }
  res.send({ status: 'ok', cart });
}

const addProductToCart = async (req, res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  const result = await addProductToCartService(cartId, productId);
  res.send({ status: 'ok', result });
}

const removeProductFromCart = async (req, res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  const result = await removeProductFromCartService(cartId, productId);
  res.send({ status: 'ok', result });
}

const removeAllProductsFromCart = async (req, res) => {
  const cartId = Number(req.params.cid);
  const result = await removeAllProductsFromCartService(cartId);
  res.send({ status: 'ok', result });
}

const updateCart = async (req, res) => {
  const cartId = Number(req.params.cid);
  const products = req.body.products;
  const result = await updateCartService(cartId, products);
  res.send({ status: 'ok', result });
}

const updateProductQuantity = async (req, res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  const quantity = req.body.quantity;
  const result = await updateProductQuantityService(cartId, productId, quantity);
  res.send({ status: 'ok', result });
}

const purchaseCart = async (req, res) => {
  const cartId = Number(req.params.cid);
  const result = await purchaseCartService(cartId);
  res.send({ status: 'ok', result });
}

export {
  saveCart,
  getAllCarts,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  removeAllProductsFromCart,
  updateCart,
  updateProductQuantity,
  purchaseCart
}