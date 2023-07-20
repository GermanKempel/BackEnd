import ProductRepository from '../repositories/products.repository.js';

const productRepository = new ProductRepository();

const saveProduct = async (product) => {
  await productRepository.addProduct(product);
}

const getAllProducts = async () => {
  const products = await productRepository.getAll();
  return products;
}

const getProductsById = async (productId) => {
  const product = await productRepository.getProductById(productId);
  return product;
}

const updateProduct = async (productId, newProduct) => {
  const product = await productRepository.updateProduct(productId, newProduct);
  return product;
}

const deleteProduct = async (productId) => {
  await productRepository.deleteProduct(productId);
}

const getPaginatedProducts = async (page, limit) => {
  const products = await productRepository.getPaginatedProducts(page, limit);
  return products;
}

export {
  saveProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
  getPaginatedProducts
}