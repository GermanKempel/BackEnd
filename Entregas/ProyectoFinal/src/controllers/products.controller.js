import {
  saveProduct as saveProductService,
  getAllProducts as getAllProductsService,
  getProductsById as getProductsByIdService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService
} from '../services/products.service.js';

const saveProduct = async (req, res) => {
  const product = req.body;
  await saveProductService(product);
  res.send(product)
}

const getAllProducts = async (req, res) => {
  const products = await getAllProductsService();
  res.send(products);
}

const getProductsById = async (req, res) => {
  const productId = Number(req.params.pid);
  const product = await getProductsByIdService(productId);
  if (!product) {
    res.status(404).send({ status: 'error', message: 'Product not found' });
    return;
  }
  res.send(product);
}

const updateProduct = async (req, res) => {
  const productId = Number(req.params.pid);
  const product = await getProductsByIdService(productId);
  if (!product) {
    res.status(404).send({ status: 'error', message: 'Product not found' });
    return;
  }
  const newProduct = req.body;
  if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
    res.status(400).send({ status: 'error', message: 'Faltan datos' });
    return;
  }
  const result = await updateProductService(productId, newProduct);
  res.send({ status: 'ok', result });
}

const deleteProduct = async (req, res) => {
  const productId = Number(req.params.pid);
  const product = await getProductsByIdService(productId);
  if (!product) {
    res.status(404).send({ status: 'error', message: 'Product not found' });
    return;
  }
  await deleteProductService(productId);
  res.send({ status: 'ok' });
}

export {
  saveProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProduct
}