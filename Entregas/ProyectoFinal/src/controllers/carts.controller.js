import * as cartService from '../services/carts.services.js';
import * as ticketService from '../services/tickets.services.js';

const getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAll();
    res.send({ status: 'success', carts });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getById(cartId);
    res.send({ status: 'success', cart });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    if (!cartId) {
      throw new Error('Cart not found');
    }
    const productId = req.params.pid;
    if (!productId) {
      throw new Error('Product not found');
    }
    const result = await cartService.addProduct(cartId, productId);
    res.send({ status: 'Product added to cart succesfully', result });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const removeProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    if (!cartId) {
      throw new Error('Cart not found');
    }
    const productId = req.params.pid;
    if (!productId) {
      throw new Error('Product not found');
    }
    const result = await cartService.removeProduct(cartId, productId);
    res.send({ status: 'Product removed from cart successfully', result });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const removeAllProductsFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    if (!cartId) {
      throw new Error('Cart not found');
    }
    const result = await cartService.removeAllProducts(cartId);
    res.send({ status: 'success', result });
  } catch (error) {
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
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const purchaseCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const result = await cartService.purchaseCart(cartId);

    const failedProducts = [];

    for (const item of result.failedProducts) {
      const product = await productsModel.findById(item.productId);

      if (!product) {
        failedProducts.push(item.productId);
      } else if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();
      } else {
        failedProducts.push(item.productId);
      }
    }

    // Filtrar los productos que no se pudieron comprar y actualizar el carrito
    const cart = await cartService.getCartById(cartId);
    const remainingItems = cart.products.filter(item => !failedProducts.includes(item.productId));
    cart.products = remainingItems;
    await cartService.updateCart(cartId, remainingItems);

    // Generar el ticket con los datos de la compra
    const ticket = await ticketService.saveTicket(result);

    res.send({ status: 'success', result: ticket });
  }
  catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
}
const saveCart = async (req, res) => {
  try {
    const cart = req.body;
    const result = await cartService.saveCart(cart);
    res.send({ status: 'success', result });
  } catch (error) {
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