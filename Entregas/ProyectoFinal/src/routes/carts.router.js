import { Router } from 'express';
import { saveCart, getAllCarts, getCartById, addProductToCart, removeProductFromCart, updateCart, updateProductQuantity, removeAllProductsFromCart } from '../controllers/carts.controller.js';

const router = Router();

router.post('/', saveCart);
router.get('/', getAllCarts);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/products/:pid', removeProductFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', removeAllProductsFromCart);

export default router;