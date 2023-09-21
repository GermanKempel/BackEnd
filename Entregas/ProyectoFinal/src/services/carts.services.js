import CartsRepository from "../repositories/carts.repository.js";
import ProductsRepository from "../repositories/products.repository.js";
import logger from "../utils/loggers.js";

const cartsRepository = new CartsRepository();
const productRepository = new ProductsRepository();

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

const addProduct = async (cartId, productId, quantity) => {
  if (!cartId) {
    logger.info('Cart not found');
  }
  if (!productId) {
    logger.info('Product not found');
  }

  let result;
  const existingCart = await cartsRepository.getById(cartId);
  if (!existingCart) {
    logger.info('Cart not found');
  }

  const existingProduct = existingCart.products.find((item) => item.productId.toString() === productId.toString());
  if (existingProduct) {
    existingProduct.quantity += quantity;
    result = await existingCart.save();
  } else {
    existingCart.products.push({ productId, quantity });
    result = await existingCart.save();
  }

  const totalPrice = await calculateTotalPrice(existingCart.products);

  existingCart.totalPrice = totalPrice;
  await existingCart.save();
}

const calculateTotalPrice = async (products) => {
  try {
    let totalPrice = 0;
    for (const productItem of products) {

      const product = await productRepository.getProductById(productItem.productId);

      if (product && typeof product.price === 'number') {
        totalPrice += product.price * productItem.quantity;
      }
    }

    return totalPrice;
  } catch (error) {
    logger.info('Error trying to calculate total price', error);
  }

}

const removeProduct = async (cartId, productId) => {
  if (!cartId) {
    logger.info('Cart not found');
  }
  if (!productId) {
    logger.info('Product not found');
  }

  const result = await cartsRepository.removeProduct(cartId, productId);

  const updatedCart = await cartsRepository.getById(cartId);

  if (!updatedCart) {
    logger.info('Cart not found');
  }

  const totalPrice = await calculateTotalPrice(updatedCart.products);

  updatedCart.totalPrice = totalPrice;
  await updatedCart.save();

  return result;
}


const removeAllProducts = async (cartId) => {
  const result = await cartsRepository.removeAllProducts(cartId);
  if (!cartId) {
    logger.info('Cart not found');
  }
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

  const cart = await cartsRepository.getById(cartId);
  const failedProducts = [];
  for (const item of cart.products) {
    const product = await cartsRepository.getProductById(item.productId);
    if (!product) {
      failedProducts.push(item.productId);
    } else if (product.stock >= item.quantity) {
      product.stock -= item.quantity;
      await product.save();
    } else {
      failedProducts.push(item.productId);
    }
  }

  if (failedProducts.length > 0) {
    const remainingItems = cart.products.filter(item => !failedProducts.includes(item.productId));
    cart.products = remainingItems;
    await cart.save();
  }

  if (!cartId) {
    logger.info('Cart not found');
  }
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