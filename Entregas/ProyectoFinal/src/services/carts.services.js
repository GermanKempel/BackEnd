import CartsRepository from "../repositories/carts.repository.js";

const cartsRepository = new CartsRepository();

const getAll = async () => {
  const carts = await cartsRepository.getAll();
  return carts;
}

const getById = async (cartId) => {
  const cart = await cartsRepository.getById(cartId);
  return cart;
}

const getByUserId = async (userId) => {
  const cart = await cartsRepository.getByUserId(userId);
  return cart;
}

const addProduct = async (cartId, productId) => {
  const result = await cartsRepository.addProduct(cartId, productId);
  return result;
}

const removeProduct = async (cartId, productId) => {
  const result = await cartsRepository.removeProduct(cartId, productId);
  return result;
}

const removeAllProducts = async (cartId) => {
  const result = await cartsRepository.removeAllProducts(cartId);
  return result;
}

const updateCart = async (cart) => {
  const result = await cartsRepository.updateCart(cart);
  return result;
}

const updateProductQuantity = async (cartId, productId, quantity) => {
  const result = await cartsRepository.updateProductQuantity(cartId, productId, quantity);
  return result;
}

const purchaseCart = async (cartId) => {
  const result = await cartsRepository.purchaseCart(cartId);
  return result;
}

const saveCart = async (cart) => {
  const result = await cartsRepository.saveCart(cart);
  return result;
}

const deleteCart = async (cartId) => {
  const result = await cartsRepository.deleteCart(cartId);
  return result;
}

export {
  getAll,
  getById,
  addProduct,
  removeProduct,
  removeAllProducts,
  getByUserId,
  updateCart,
  updateProductQuantity,
  purchaseCart,
  saveCart,
  deleteCart
}