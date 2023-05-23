import { Router } from 'express';
import ProductsManager from '../dao/dbManagers/products.managers.js';


const router = Router();

const productManager = new ProductsManager();

router.post('/', async (req, res) => {
  const { title, description, price, thumbnail, code, stock, category } = req.body;
  if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
    res.status(400).send({ status: 'error', message: 'Faltan datos' });
    return;
  }
  const product = await productManager.addProduct(title, description, price, thumbnail, code, stock, category);

  const io = req.app.get('socketio');
  io.emit('showProducts', await productManager.getAll());

  res.send({ status: 'ok', product });
});


router.get('/', async (req, res) => {
  const products = await productManager.getAll();
  res.send({ status: 'ok', products });
});


router.get('/:pid', async (req, res) => {
  const pid = Number(req.params.pid);
  const product = await productManager.getProductById(pid);
  if (!product) {
    res.status(404).send({ status: 'error', message: 'Product not found' });
    return;
  }
  res.send({ status: 'ok', product });
});


router.put('/:pid', async (req, res) => {
  const productId = Number(req.params.pid);
  const product = await productManager.getProductById(productId);
  if (!product) {
    res.status(404).send({ status: 'error', message: 'Product not found' });
    return;
  }
  const newProduct = req.body;
  if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
    res.status(400).send({ status: 'error', message: 'Faltan datos' });
    return;
  }
  const result = await productManager.updateProduct(productId, newProduct);
  res.send({ status: 'ok', result });
});


router.delete('/:pid', async (req, res) => {
  const productId = Number(req.params.pid);
  const product = await productManager.getProductById(productId);
  if (!product) {
    res.status(404).send({ status: 'error', message: 'Product not found' });
    return;
  }
  const result = await productManager.deleteProduct(productId);

  const io = req.app.get('socketio');
  io.emit('showProducts', await productManager.getAll());

  res.send({ status: 'ok', result });
});

export default router;