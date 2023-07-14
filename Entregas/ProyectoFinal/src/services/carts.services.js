import { CARTSDAO } from "../dao/index.js";

const saveCart = async (cart) => {
  await CARTSDAO.save(cart);
  return cart;
}

const getAllCarts = async () => {
  return await CARTSDAO.getAll();
}

const getCartById = async (cartId) => {
  return await CARTSDAO.getById(cartId);
}

const addProductToCart = async (cartId, productId) => {
  return await CARTSDAO.addProductToCart(cartId, productId);
}

const removeProductFromCart = async (cartId, productId) => {
  return await CARTSDAO.removeProductFromCart(cartId, productId);
}

const removeAllProductsFromCart = async (cartId) => {
  return await CARTSDAO.removeAllProductsFromCart(cartId);
}

const updateCart = async (cartId, products) => {
  return await CARTSDAO.updateCart(cartId, products);
}

const updateProductQuantity = async (cartId, productId, quantity) => {
  return await CARTSDAO.updateProductQuantity(cartId, productId, quantity);
}

const purchaseCart = async (cartId) => {
  return await CARTSDAO.purchaseCart(cartId);
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