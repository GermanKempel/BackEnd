import ProductRepository from '../repositories/products.repository.js';
import UsersRepository from '../repositories/users.repository.js';
import { sendMail } from '../services/mail.services.js';
import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';
import { generateProductErrorInfo } from '../middlewares/errors/info.js';
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
        cause: generateProductErrorInfo(product),
        message: 'Error trying to save product',
        code: EErrors.INVALID_TYPE_ERROR
      });
    }
    await productRepository.addProduct(product);
  } catch (error) {
    logger.info('Error trying to save product', error);
    throw error;
  }
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

const deleteProduct = async (productId, user) => {
  try {
    const product = await productRepository.getProductById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const isAdmin = user.role === 'admin';
    const isOwner = product.owner === user._id.toString();

    if (isAdmin || isOwner) {

      const userId = product.owner;
      const owner = await usersRepository.getById(userId);

      if (!owner) {
        throw new Error("Owner not found");
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
      throw new Error('Not authorized to delete this product');
    }

  } catch (error) {
    console.error("Error deleting product:", error.message);
  }
};


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