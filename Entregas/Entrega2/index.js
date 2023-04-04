import ProductManager from "./managers/productManager.js";

const manager = new ProductManager('./files/productos.json');

const env = async () => {
  const productos = await manager.getProducts();
  console.log(productos);

  await manager.addProduct("Remera", "Remera Nirvana", 1000, "https://www.soyturemera.com.ar/productos/nirvana/#product-gallery", "1", 10);
  await manager.addProduct("Remera", "", 1000, "https://www.soyturemera.com.ar/productos/nirvana/#product-gallery", "2", 10);
  await manager.addProduct("Remera", "Remera Nirvana", 1000, "https://www.soyturemera.com.ar/productos/nirvana/#product-gallery", "1", 10);
  await manager.addProduct("Remera", "Remera Nirvana", 1000, "https://www.soyturemera.com.ar/productos/nirvana/#product-gallery", "3", 10);
  await manager.addProduct("Remera", "Remera Nirvana", 1000, "https://www.soyturemera.com.ar/productos/nirvana/#product-gallery", "4", 10);
  await manager.updateProduct(1, "Remera", "Remera Nirvana", 1000, "https://www.soyturemera.com.ar/productos/nirvana/#product-gallery", "1", 20);
  await manager.deleteProduct(2);


  const prodResult = await manager.getProducts();
  console.log(prodResult);

  console.log(await manager.getProductById(1));

}

env();