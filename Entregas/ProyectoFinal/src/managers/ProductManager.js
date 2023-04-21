import fs from 'fs';

export default class ProductManager {

  constructor(path) {
    this.path = path
  }

  async getAll() {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      const products = JSON.parse(data);
      return products;
    } else {
      return []
    }
  }

  async getProductById(pid) {
    const products = await this.getAll();
    const product = this.products.find((p) => p.pid === pid);
    return product;
  }

  async updateProduct(pid, newProduct) {
    const products = await this.getAll();
    const product = products.find((p) => p.pid === pid);
    product.title = newProduct.title;
    product.description = newProduct.description;
    product.code = newProduct.code;
    product.price = newProduct.price;
    product.stock = newProduct.stock;
    product.category = newProduct.category;
    product.thumbnail = newProduct.thumbnail;

    await fs.promises.writeFile(this.path, JSON.stringify(product, null, '\t'));

    return product;
  }

  async save(product) {
    if (this.products.length === 0) {
      product.pid = 1;
    } else {
      product.pid = this.products[this.products.length - 1].pid + 1;
    }
    this.products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(product, null, '\t'));

    return product;
  }

  async deleteProduct(pid) {
    const product = this.products.find(product => product.pid === pid);
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(product, null, '\t'));
    return product;
  }
}