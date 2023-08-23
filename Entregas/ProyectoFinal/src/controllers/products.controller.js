import userModel from '../dao/dbManagers/models/users.model.js';
import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';
import { generateProductErrorInfo } from '../middlewares/errors/info.js';
import * as productsService from '../services/products.service.js';
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
//   const productId = req.params.pid;

//   if (!productId) {
//     throw CustomError.createError({
//       name: 'InvalidTypeError',
//       cause: generateProductNotFoundErrorInfo(productId),
//       message: 'Error trying to get product by id',
//       code: EErrors.INVALID_TYPE_ERROR
//     });
//   }
//   const product = await productsService.getProductById(productId);
//   res.send({ status: 'success', product });
// }

const saveProduct = async (req, res) => {
  try {
    const product = req.body;
    if (!product.title || !product.description || !product.price) {
      throw CustomError.createError({
        name: 'IncompleteProductError',
        cause: generateProductErrorInfo(product),
        message: 'Error trying to save product',
        code: EErrors.INVALID_TYPE_ERROR
      });
    }
    const currentUser = await userModel.findById(req.user._id);
    const isUserPremiumAdmin = currentUser.role === 'premium' || currentUser.role === 'admin';
    if (!isUserPremiumAdmin) {
      throw CustomError.createError({
        name: 'InvalidRoleError',
        cause: generateProductErrorInfo(product),
        message: 'Error trying to save product',
        code: EErrors.INVALID_TYPE_ERROR
      });
    }
    await productsService.saveProduct(product, currentUser);
    res.send({ status: 'success', message: 'Product saved successfully' });
  } catch (error) {
    logger.info('Error trying to save product', error);
    res.status(500).send({ status: 'error', message: error.message });
  }
}


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
  const productId = req.params.pid;

  try {
    const product = await productsService.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const currentUser = await userModel.findById(req.user._id);

    const isAdmin = currentUser.role === 'admin';
    const isOwner = product.owner === currentUser._id.toString();

    if (isAdmin || isOwner) {
      await productsService.deleteProduct(productId);
      return res.json({ status: 'Product deleted successfully' });
    } else {
      return res.status(403).json({ error: 'Not authorized to delete this product' });
    }
  } catch (error) {
    logger.info('Error trying to delete product', error);
    res.status(500).json({ error: 'Error trying to delete product' });
  }
};

const getPaginatedProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await productsService.getPaginatedProducts(page, limit);

    res.render('products', { products });
  } catch (error) {
    console.error('Error trying to get paginated products', error);
    res.status(500).send('Internal Server Error');
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