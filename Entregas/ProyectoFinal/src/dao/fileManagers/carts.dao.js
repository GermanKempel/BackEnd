import fs from 'fs';
import ProductManager from './products.dao.js';

const productManager = new ProductManager('./src/files/productos.json');
export default class CartsDao {

  constructor(path) {
    this.path = path;
  }


  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(data);
        return carts;
      } else {
        return []
      }
    } catch (error) {
      console.log(error);
    }
  }


  async addCart() {
    try {
      const cart = {
        products: [],
      }
      const carts = await this.getCarts();
      if (carts.length === 0) {
        cart.id = 1;
      } else {
        cart.id = carts[carts.length - 1].id + 1;
      }
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
      return cart;
    } catch (error) {
      console.log(error);
    }
  }


  async addProduct(cartId, productId) {
    try {
      const carts = await this.getCarts();
      const productById = await productManager.getProductById(productId);
      carts.forEach((cart) => {
        if (cart.id === cartId && productById.id === productId) {
          let isInCart = cart.products.find((item) => item.product === productId)
          if (isInCart) {
            cart.products.forEach(item => {
              if (item.product === productId) item.quantity++;
              return item;
            });
          } else {
            cart.products.push({ product: productById.id, quantity: 1 });
          }
        }
      });
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
      return carts;
    } catch (error) {
      console.log(error);
    }
  }


  async getById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === id);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
}
