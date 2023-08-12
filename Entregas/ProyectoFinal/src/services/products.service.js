import ProductRepository from '../repositories/products.repository.js';

const productRepository = new ProductRepository();

const saveProduct = async (product) => {
  await productRepository.addProduct(product);
}

const getAllProducts = async () => {
  const products = await productRepository.getAll();
  return products;
}

const getProductById = async (productId) => {
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
  return await productRepository.getPaginatedProducts(page, limit);
}

export {
  saveProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getPaginatedProducts
}