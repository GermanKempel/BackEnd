import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';
import { generateProductNotFoundErrorInfo, generateProductErrorInfo } from '../middlewares/errors/info.js';
import * as productsService from '../services/products.service.js';
import logger from '../utils/loggers.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAll();
    res.send({ status: 'success', products });
  } catch (error) {
    logger.info('Error trying to get all products', error);
    res.status(500).send({ status: 'error', message: error.message });
  }
}

const getProductById = async (req, res) => {
  // try {
  //   const productId = Number(req.params.id);
  //   const product = await productsService.getProductsById(productId);
  //   res.send({ status: 'success', product });
  // } catch (error) {
  //   res.status(500).send({ status: 'error', message: error.message });
  // }
  const productId = Number(req.params.id);
  if (!productId) {
    throw CustomError.createError({
      name: 'InvalidTypeError',
      cause: generateProductNotFoundErrorInfo(productId),
      message: 'Error trying to get product by id',
      code: EErrors.INVALID_TYPE_ERROR
    });
  }
  const product = await productsService.getProductsById(productId);
  res.send({ status: 'success', product });
}

const saveProduct = async (req, res) => {
  //   try {
  //     const product = req.body;
  //     await productsService.saveProduct(product);
  //     res.send({ status: 'Product saved successfully' });
  //   } catch (error) {
  //     res.status(500).send({ status: 'error', message: error.message });
  //   }
  // }
  const product = req.body;
  if (!product.title || !product.description || !product.price) {
    throw CustomError.createError({
      name: 'IncompleteProductError',
      cause: generateProductErrorInfo(product),
      message: 'Error trying to save product',
      code: EErrors.INVALID_TYPE_ERROR
    });
  }
  await productsService.saveProduct(product);
  res.send({ status: 'Product saved successfully' });
}



const updateProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);
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
    const productId = Number(req.params.id);
    await productsService.deleteProduct(productId);
    res.send({ status: 'Product deleted successfully' });
  } catch (error) {
    logger.info('Error trying to delete product', error);
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
    logger.info('Error trying to get paginated products', error);
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