import Products from "../dao/factory.js";

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

  getProductById = async (id) => {
    const product = await this.productsDao.getProductById(id);
    return product;
  }

  updateProduct = async (id, title, description, price, thumbnail, code, stock, category) => {
    const product = await this.productsDao.updateProduct(id, title, description, price, thumbnail, code, stock, category);
    return product;
  }

  deleteProduct = async (id) => {
    const product = await this.productsDao.deleteProduct(id);
    return product;
  }

  getPaginatedProducts = async (page, limit) => {
    const products = await this.productsDao.getPaginatedProducts(page, limit);
    return products;
  }
}