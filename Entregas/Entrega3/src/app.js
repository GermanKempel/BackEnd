import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const manager = new ProductManager('./src/productos.json');

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  const limit = Number(req.query.limit);
  if (limit) {
    const products = await manager.getProducts();
    res.send(products.slice(0, limit));
    return;
  } else {
    const products = await manager.getProducts();
    res.send(products);
  }
})

app.get('/products/:pid', async (req, res) => {
  const pid = Number(req.params.pid);
  const product = await manager.getProductById(pid);
  res.send(product);
})

app.get('/', async (req, res) => {
  const products = await manager.getProducts();
  res.send({ products });
})

app.listen(8080, () => console.log("Listening on 8080"))