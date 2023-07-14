import { cartsModel } from './models/carts.model.js';
import { productsModel } from './models/products.model.js';

export default class CartsDao {
  constructor() {
    console.log('Working Carts with DB');
  }

  async addNewCart(cartData) {
    const cart = new cartsModel(cartData);
    return cart.save();
  }

  async getCarts() {
    return cartsModel.find().populate('products');
  }

  async getCartsById(cartId) {
    return cartsModel.findById(cartId).populate('products');
  }

  async addProductToCart(cartId, productId) {
    const cart = await cartsModel.findById(cartId);
    if (!cart) {
      return { status: 'error', message: 'Cart not found' };
    }

    const product = await productsModel.findById(productId);
    if (!product) {
      return { status: 'error', message: 'Product not found' };
    }

    cart.products.push(product);
    await cart.save();

    return { status: 'ok', message: 'Product added to cart successfully' };
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await cartsModel.findById(cartId);
    if (!cart) {
      return { status: 'error', message: 'Cart not found' };
    }

    cart.products = cart.products.filter(product => product != productId);
    await cart.save();

    return { status: 'ok', message: 'Product removed from cart successfully' };
  }

  async updateCart(cartId, products) {
    const cart = await cartsModel.findById(cartId);
    if (!cart) {
      return { status: 'error', message: 'Cart not found' };
    }

    cart.products = products;
    await cart.save();

    return { status: 'ok', message: 'Cart updated successfully' };
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await cartsModel.findById(cartId);
    if (!cart) {
      return { status: 'error', message: 'Cart not found' };
    }

    const productIndex = cart.products.findIndex(product => product == productId);
    if (productIndex === -1) {
      return { status: 'error', message: 'Product not found in cart' };
    }

    // Actualizar la cantidad del producto en el carrito
    cart.products[productIndex].quantity = quantity;
    await cart.save();

    return { status: 'ok', message: 'Product quantity updated successfully' };
  }

  async removeAllProductsFromCart(cartId) {
    const cart = await cartsModel.findById(cartId);
    if (!cart) {
      return { status: 'error', message: 'Cart not found' };
    }

    cart.products = [];
    await cart.save();

    return { status: 'ok', message: 'All products removed from cart successfully' };
  }

  async purchaseCart(cartId) {
    const cart = await cartsModel.findById(cartId);
    if (!cart) {
      return { status: 'error', message: 'Cart not found' };
    }

    cart.products = [];
    await cart.save();

    for (const item of cart.products) {
      const product = await productsModel.findById(item._id);

      if (!product) {
        return { status: 'error', message: 'Product not found' };
      }
      else if (product.stock < item.quantity) {
        product.stock -= item.quantity;
      }
      else {
        return { status: 'error', message: 'Not enough stock' };
      }
      await product.save();
    }
    return { status: 'ok', message: 'Purchase completed' };
  }
}