import { Router } from 'express';
import ProductsManager from '../dao/dbManagers/products.managers.js';
import CartsManager from '../dao/dbManagers/carts.managers.js';

const router = Router();

const productManager = new ProductsManager();
const cartManager = new CartsManager();

// router.get('/', async (req, res) => {
//   res.render('home', { products: await productManager.getAll() });
// });

router.get('/realtimeproducts', async (req, res) => {
  res.render('realtimeproducts', { products: await productManager.getAll() });
});

router.get('/products', async (req, res) => {
  // Obtener parámetros de paginación
  const { page = 1, limit = 10 } = req.query;

  // Obtener productos paginados
  const products = await productManager.getPaginatedProducts({}, { page, limit });

  res.render('products', { products });
});

router.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;

  // Obtener producto por ID
  const product = await productManager.getProductById(productId);

  res.render('product-details', { product });
});

router.post('/products/:pid/add-to-cart', async (req, res) => {
  const productId = req.params.pid;
  const cartId = req.params.cid;

  // Agregar producto al carrito
  await cartManager.addProductToCart(cartId, productId);

  res.redirect('/products');
});


router.get('/carts/:cid', async (req, res) => {
  const cartId = req.params.cid;

  // Obtener carrito por ID
  const cart = await cartManager.getCartById(cartId);

  // Obtener productos asociados al carrito
  const cartProducts = await productManager.getProductsInCart(cart.products);

  res.render('cart-details', { cartProducts });
});

//Acceso público y privado
const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect('/products');
  next();
}

const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
}

router.get('/register', publicAccess, (req, res) => {
  res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
  res.render('login');
});

router.get('/', privateAccess, (req, res) => {
  res.render('profile', {
    user: req.session.user
  });
});

export default router;