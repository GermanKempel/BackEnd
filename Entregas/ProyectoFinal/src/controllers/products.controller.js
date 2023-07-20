import * as productsService from '../services/products.service.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAll();
    res.send({ status: 'success', products });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const getProductById = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const product = await productsService.getProductsById(productId);
    res.send({ status: 'success', product });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const saveProduct = async (req, res) => {
  try {
    const product = req.body;
    await productsService.saveProduct(product);
    res.send({ status: 'Product saved successfully' });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const newProduct = req.body;
    await productsService.updateProduct(productId, newProduct);
    res.send({ status: 'Product updated successfully' });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    await productsService.deleteProduct(productId);
    res.send({ status: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const getPaginatedProducts = async (req, res) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const products = await productsService.getPaginatedProducts(page, limit);
    res.send({ status: 'success', products });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
}

export {
  getAllProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
  getPaginatedProducts
}