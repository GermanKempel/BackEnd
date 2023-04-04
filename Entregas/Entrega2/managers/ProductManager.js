import fs from 'fs';

export default class ProductManager {
  constructor(path) {
    this.path = path
  }

  getProducts = async () => {
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

  addProduct = async (nombre, descripcion, precio, thumbnail, code, stock) => {
    try {
      const producto = { nombre, descripcion, precio, thumbnail, code, stock };
      const productos = await this.getProducts();

      if (productos.some((p) => p.code === producto.code)) {
        console.log("Error: el campo 'code' ya está en uso");
        return;
      }

      if (!producto.nombre || !producto.descripcion || !producto.precio || !producto.thumbnail || !producto.code || !producto.stock) {
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
      const productos = await this.getProducts();
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

  updateProduct = async (id, nombre, descripcion, precio, thumbnail, code, stock) => {
    try {
      const productos = await this.getProducts();
      const index = productos.findIndex((p) => p.id === id);
      if (index === -1) {
        console.log(`Error: no se encontró un producto con el ID ${id}`);
        return;
      }
      const updatedProduct = { id, nombre, descripcion, precio, thumbnail, code, stock };
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
      const productos = await this.getProducts();
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
}