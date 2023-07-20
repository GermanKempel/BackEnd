import { Router } from 'express';
import { saveProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { authorization } from '../utils.js';

const router = Router();

router.post('/', saveProduct, authorization('admin'));
router.get('/', getAllProducts);
router.get('/:pid', getProductById);
router.put('/:pid', updateProduct, authorization('admin'));
router.delete('/:pid', deleteProduct, authorization('admin'));

export default router;