class ProductManager {
  constructor() {
    this.productos = [];
  }
  agregarProducto = (
    nombre, descripcion, precio, thumbnail, code, stock) => {
    const producto = {
      nombre, descripcion, precio, thumbnail, code, stock
    };

    if (this.productos.some((p) => p.code === producto.code)) {
      console.log("Error: el campo 'code' ya está en uso");
      return;
    }

    if (!producto.nombre || !producto.descripcion || !producto.precio || !producto.thumbnail || !producto.code || !producto.stock) {
      console.log("Error: todos los campos son obligatorios");
      return;
    }

    if (this.productos.length === 0) {
      producto.id = 1;
    }
    else {
      producto.id = this.productos[this.productos.length - 1].id + 1;
    }

    this.productos.push(producto);
  }
  getProducts = () => {
    return this.productos;
  }
  getProductById = (id) => {
    const producto = this.productos.find((p) => p.id === id);
    if (producto) {
      return producto;
    } else {
      console.log("Error: producto no encontrado");
    }
  }
}

const productManager = new ProductManager();
productManager.agregarProducto("Remera", "Remera Nirvana", 1000, "https://www.soyturemera.com.ar/productos/nirvana/#product-gallery", "1", 10);
productManager.agregarProducto("Remera", "", 1000, "https://www.soyturemera.com.ar/productos/nirvana/#product-gallery", "2", 10);
productManager.agregarProducto("Remera", "Remera Nirvana", 1000, "https://www.soyturemera.com.ar/productos/nirvana/#product-gallery", "1", 10);

console.log(productManager.getProducts());
console.log(productManager.getProductById(2));