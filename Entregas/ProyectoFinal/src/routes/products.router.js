import { Router } from 'express';
import { saveProduct, getAllProducts, getProductsById, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const router = Router();

router.post('/', saveProduct);
router.get('/', getAllProducts);
router.get('/:pid', getProductsById);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

export default router;