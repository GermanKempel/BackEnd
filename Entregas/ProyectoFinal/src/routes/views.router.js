import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();

const productManager = new ProductManager("src/files/productos.json");

router.get('/', async (req, res) => {
  res.render('home', { products: await productManager.getAll() });
});

router.get('/realtimeproducts', async (req, res) => {
  res.render('realtimeproducts', { products: await productManager.getAll() });
});

export default router;