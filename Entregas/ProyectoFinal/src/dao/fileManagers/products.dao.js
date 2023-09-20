import fs from 'fs';

export default class ProductsDao {

  constructor(path) {
    this.path = path
  }

  getAll = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        console.log(data);
        const productos = JSON.parse(data);
        return productos;
      } else {
        return []
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  addProduct = async (title, description, price, thumbnail, code, stock, category) => {
    try {
      const producto = { title, description, price, thumbnail, code, stock, category };
      const productos = await this.getAll();

      if (productos.some((p) => p.code === producto.code)) {
        console.log("Error: el campo 'code' ya está en uso");
        return;
      }

      if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock || !producto.category) {
        console.log("Error: todos los campos son obligatorios");
        return;
      }

      if (productos.length === 0) {
        producto.id = 1;
      }
      else {
        producto.id = productos[productos.length - 1].id + 1;
      }
      productos.push(producto);

      await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

      return producto;
    }
    catch (error) {
      console.log(error);
    }
  }

  getProductById = async (id) => {
    try {
      const productos = await this.getAll();
      const producto = productos.find((p) => p.id === id);
      if (!producto) {
        console.log(`Error: no se encontró un producto con el ID ${id}`);
        return;
      }
      return producto;
    }
    catch (error) {
      console.log(error);
    }
  }

  updateProduct = async (id, title, description, price, thumbnail, code, stock, category) => {
    try {
      const productos = await this.getAll();
      const index = productos.findIndex((p) => p.id === id);
      if (index === -1) {
        console.log(`Error: no se encontró un producto con el ID ${id}`);
        return;
      }
      const updatedProduct = { id, title, description, price, thumbnail, code, stock, category };
      productos[index] = updatedProduct;
      await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
      return updatedProduct;
    }
    catch (error) {
      console.log(error);
    }
  }

  deleteProduct = async (id) => {
    try {
      const productos = await this.getAll();
      const index = productos.findIndex((p) => p.id === id);
      if (index === -1) {
        console.log(`Error: no se encontró un producto con el ID ${id}`);
        return;
      }
      productos.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
      console.log(`Producto con el ID ${id} eliminado.`);
    }
    catch (error) {
      console.log(error);
    }
  }

  getPaginatedProducts = async (page, limit) => {
    try {
      const productos = await this.getAll();
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedProducts = productos.slice(startIndex, endIndex);
      return paginatedProducts;
    }
    catch (error) {
      console.log(error);
    }
  }
}