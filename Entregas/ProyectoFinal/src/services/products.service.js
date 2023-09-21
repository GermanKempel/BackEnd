import ProductRepository from '../repositories/products.repository.js';
import UsersRepository from '../repositories/users.repository.js';
import { sendMail } from '../services/mail.services.js';
import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';
import { generateProductNotFoundErrorInfo, generateProductErrorInfo, generateUserIsPremiumAdminErrorInfo, generateProductNotValidErrorInfo } from '../middlewares/errors/info.js';
import logger from '../utils/loggers.js';

const productRepository = new ProductRepository();
const usersRepository = new UsersRepository();

const saveProduct = async (product, user) => {
  try {
    if (!product.title || !product.description || !product.price) {
      throw CustomError.createError({
        name: 'IncompleteProductError',
        cause: generateProductErrorInfo(product),
        message: 'Error trying to save product',
        code: EErrors.INVALID_TYPE_ERROR
      });
    }

    const isUserPremiumAdmin = user.role === 'premium' || user.role === 'admin';

    if (!isUserPremiumAdmin) {
      throw CustomError.createError({
        name: 'InvalidRoleError',
        cause: generateUserIsPremiumAdminErrorInfo(product),
        message: 'Error trying to save product',
        code: EErrors.INVALID_TYPE_ERROR
      });
    }

    product.owner = user._id.toString();
    await productRepository.addProduct(product);
    logger.info('Product saved successfully');
  } catch (error) {
    logger.info('Error trying to save product', error);
    throw error;
  }
}

const getAllProducts = async () => {
  try {
    const products = await productRepository.getAll();
    return products;
  } catch (error) {
    logger.info('Error trying to get all products', error);
  }

}

const getProductById = async (productId) => {

  if (!productId) {
    throw CustomError.createError({
      name: 'InvalidProductIdError',
      cause: generateProductNotValidErrorInfo(productId),
      message: 'Error trying to get product by id',
      code: EErrors.PRODUCT_NOT_FOUND
    });
  }

  const product = await productRepository.getProductById(productId);
  return product;
}

const updateProduct = async (productId, newProduct) => {
  try {
    if (!productId) {
      throw CustomError.createError({
        name: 'InvalidProductIdError',
        cause: generateProductNotFoundErrorInfo(productId),
        message: 'Error trying to update product',
        code: EErrors.INVALID_TYPE_ERROR
      });
    }
    const product = await productRepository.updateProduct(productId, newProduct);
    return product;
  } catch (error) {
    logger.info('Error trying to update product', error);
  }
}

const deleteProduct = async (productId, user) => {
  try {
    if (!productId) {
      throw CustomError.createError({
        name: 'InvalidProductIdError',
        cause: generateProductNotFoundErrorInfo(productId),
        message: 'Error trying to update product',
        code: EErrors.INVALID_TYPE_ERROR
      });
    }

    const product = await productRepository.getProductById(productId);

    if (!product) {
      logger.info('Product not found');
    }

    const isAdmin = user.role === 'admin';
    const isOwner = product.owner === user._id.toString();

    if (isAdmin || isOwner) {

      const userId = product.owner;
      const owner = await usersRepository.getById(userId);

      if (!owner) {
        logger.info('User not found');
      }

      if (owner.role === 'premium') {
        await sendMail({
          to: owner.email,
          subject: 'Tu producto ha sido eliminado',
          html: 'Tu producto ha sido eliminado'
        });
      }

      await productRepository.delete(productId);
    } else {
      logger.info('User not authorized');
    }

  } catch (error) {
    logger.info('Error trying to delete product', error);
  }
};


const getPaginatedProducts = async (page, limit) => {
  try {
    return await productRepository.getPaginatedProducts(page, limit);
  } catch (error) {
    logger.info('Error trying to get paginated products', error);
  }
}

export {
  saveProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getPaginatedProducts
}