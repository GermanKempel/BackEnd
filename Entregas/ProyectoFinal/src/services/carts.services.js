import CartsRepository from "../repositories/carts.repository.js";
import ProductsRepository from "../repositories/products.repository.js";

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
    throw new Error('Cart not found');
  }
  if (!productId) {
    throw new Error('Product not found');
  }

  let result;
  const existingCart = await cartsRepository.getById(cartId);
  if (!existingCart) {
    throw new Error('Cart not found');
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
  let totalPrice = 0;
  for (const productItem of products) {
    // Fetch product details including price from your repository or database
    const product = await productRepository.getProductById(productItem.productId);

    if (product && typeof product.price === 'number') {
      totalPrice += product.price * productItem.quantity;
    }
  }

  return totalPrice;
}

const removeProduct = async (cartId, productId) => {
  if (!cartId) {
    throw new Error('Cart not found');
  }
  if (!productId) {
    throw new Error('Product not found');
  }

  const result = await cartsRepository.removeProduct(cartId, productId);

  // Get the updated cart after removing the product
  const updatedCart = await cartsRepository.getById(cartId);

  if (!updatedCart) {
    throw new Error('Cart not found');
  }

  // Calculate the new total price for the updated cart
  const totalPrice = await calculateTotalPrice(updatedCart.products);

  // Update the cart's total price
  updatedCart.totalPrice = totalPrice;
  await updatedCart.save();

  return result;
}


const removeAllProducts = async (cartId) => {
  const result = await cartsRepository.removeAllProducts(cartId);
  if (!cartId) {
    throw new Error('Cart not found');
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
    throw new Error('Cart not found');
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