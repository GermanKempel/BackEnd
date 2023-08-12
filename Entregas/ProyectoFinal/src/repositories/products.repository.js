import { Products } from "../dao/factory.js";

export default class ProductsRepository {
  constructor() {
    this.productsDao = new Products();
  }

  getAll = async () => {
    const products = await this.productsDao.getAll();
    return products;
  }

  addProduct = async (product) => {
    const newProduct = await this.productsDao.addProduct(product);
    return newProduct;
  }

  getProductById = async (productId) => {
    const product = await this.productsDao.getProductById(productId);
    return product;
  }

  updateProduct = async (id, title, description, price, thumbnail, code, stock, category) => {
    const product = await this.productsDao.updateProduct(id, title, description, price, thumbnail, code, stock, category);
    return product;
  }

  deleteProduct = async (productId) => {
    const product = await this.productsDao.deleteProduct(productId);
    return product;
  }

  getPaginatedProducts = async (page, limit) => {
    return await this.productsDao.getPaginatedProducts(page, limit);
  }
}