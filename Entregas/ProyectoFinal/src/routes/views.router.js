import { Router } from 'express';
import { authorization, passportCall } from '../utils.js';
import { renderProducts, renderHomePage, renderRegisterPage, renderCartPage, renderLoginPage, renderProductById, renderRealtimeProducts, renderResetPasswordPage, renderUsersPage } from '../controllers/views.controller.js';


const router = Router();


router.get('/realtimeproducts', renderRealtimeProducts);

router.get('/products', passportCall('jwt'), renderProducts);

router.get('/products/:pid', renderProductById);

router.get('/carts/:cid', renderCartPage);

router.get('/register', renderRegisterPage);

router.get('/login', renderLoginPage);

router.get('/', renderHomePage);

router.get('/reset-pass', renderResetPasswordPage);

router.get('/users', renderUsersPage, authorization('admin'))

export default router;