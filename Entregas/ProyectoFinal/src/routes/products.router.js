import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';


const router = Router();

const productManager = new ProductManager("src/files/productos.json");

router.post('/', async (req, res) => {

  const product = req.body;

  if (!product.status) {
    product.status = true;
  }

  if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
    res.status(400).send({ status: 'error', message: 'Faltan datos' });
    return;
  }

  const result = await productManager.save(product);
  res.send({ status: 'ok', result });
});

router.get('/', async (req, res) => {
  const products = await productManager.getAll();
  res.send({ status: 'ok', products });
});

router.get('/:pid', async (req, res) => {
  const productId = Number(req.params.pid);
  const product = await productManager.getProductById(productId);
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
  res.send({ status: 'ok', result });
});



export default router;