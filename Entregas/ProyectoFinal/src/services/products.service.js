import { PRODUCTSDAO } from "../dao/index.js";

const saveProduct = async (product) => {
  await PRODUCTSDAO.save(product);
  return product;
}

const getAllProducts = async () => {
  return await PRODUCTSDAO.getAll();
}

const getProductsById = async (productId) => {
  return await PRODUCTSDAO.getProductById(productId);
}

const updateProduct = async (productId, newProduct) => {
  return await PRODUCTSDAO.updateProduct(productId, newProduct);
}

const deleteProduct = async (productId) => {
  return await PRODUCTSDAO.deleteProduct(productId);
}

export {
  saveProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProduct
}