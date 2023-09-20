import * as productsService from '../services/products.service.js';
import { generateRandomProducts } from "../utils.js";
import logger from '../utils/loggers.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.send({ status: 'success', products });
  } catch (error) {
    logger.info('Error trying to get all products', error);
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const getProductById = async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productsService.getProductById(productId);
    res.send({ status: 'success', product });
  } catch (error) {
    logger.info('Error trying to get product by id', error);
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const saveProduct = async (req, res) => {
  try {
    const product = req.body;
    const user = req.user;

    await productsService.saveProduct(product, user);

    res.send({ status: 'success', message: 'Product saved successfully' });
  } catch (error) {
    logger.info('Error trying to save product', error);
    res.status(500).send({ status: 'error', message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.pid;
    const newProduct = req.body;
    await productsService.updateProduct(productId, newProduct);
    res.send({ status: 'Product updated successfully' });
  } catch (error) {
    logger.info('Error trying to update product', error);
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.pid;
    const currentUser = req.user;
    if (!currentUser) {
      logger.info('User not authenticated');
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const result = await productsService.deleteProduct(productId, currentUser);
    res.send({ status: 'Product deleted successfully', result });
  } catch (error) {
    logger.info('Error trying to delete product', error);
    res.status(500).json({ error: 'Error trying to delete product' });
  }
};

const getPaginatedProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await productsService.getPaginatedProducts(page, limit);
    res.send({ status: 'Products retrieved successfully', products });
  } catch (error) {
    console.error('Error trying to get paginated products', error);
    res.status(500).send('Internal Server Error');
  }
}

const getMockingProducts = (req, res) => {
  try {
    const products = generateRandomProducts();
    res.send({ status: 'success', products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export {
  getMockingProducts,
  getAllProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
  getPaginatedProducts
}