import { Router } from 'express';
import { getMockingProducts, saveProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { authorization, passportCall } from '../utils.js';
import toAsyncRouter from 'async-express-decorator'

const router = toAsyncRouter(Router());

router.post('/', saveProduct, authorization('admin'));
router.get('/', getAllProducts);
router.get('/:pid', getProductById);
router.put('/:pid', updateProduct, authorization('admin'));
router.delete('/:pid', deleteProduct, authorization('admin'));
router.get('/mockingProducts', getMockingProducts);

export default router;