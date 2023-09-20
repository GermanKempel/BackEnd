import { Router } from 'express';
import { saveCart, getAllCarts, getCartById, addProductToCart, removeProductFromCart, updateCart, updateProductQuantity, removeAllProductsFromCart, purchaseCart } from '../controllers/carts.controller.js';
import toAsyncRouter from 'async-express-decorator';

const router = toAsyncRouter(Router());

router.post('/', saveCart);
router.get('/', getAllCarts);
router.get('/:cid', getCartById);
router.post('/:cid/products/:pid', addProductToCart);
router.delete('/:cid/products/:pid', removeProductFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', removeAllProductsFromCart);
router.post('/:cid/purchase', purchaseCart);

export default router;