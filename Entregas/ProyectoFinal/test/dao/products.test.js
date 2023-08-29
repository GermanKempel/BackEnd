import mongoose from 'mongoose';
import ProductsDao from '../../src/dao/dbManagers/products.dao.js';
import chai from 'chai';

const expect = chai.expect;

await mongoose.connect('mongodb+srv://GermanKempel:GcsLTjZBjYXUT5Ht@cluster0.tnbfe67.mongodb.net/testing?retryWrites=true&w=majority');

let productsDao

describe('ProductsDao', () => {
  before(() => {
    productsDao = new ProductsDao();
  });

  beforeEach(async () => {
    try {
      await mongoose.connection.collections.products.drop();
    }
    catch (err) {
      console.log(err);
    }
  });

  it('debe devolver todos los productos', async () => {
    const products = await productsDao.getAll();
    expect(products).to.be.an('array');
  });

  it('debe agregar un producto', async () => {
    const product = {
      title: 'Test Product',
      description: 'Test Description',
      price: 100,
      thumbnail: 'Test Thumbnail',
      code: 'Test Code',
      stock: 10,
      category: 'Test Category'
    };
    const newProduct = await productsDao.addProduct(product);
    expect(newProduct).to.have.property('_id');
    expect(newProduct.title).to.be.equal(product.title);
    expect(newProduct.description).to.be.equal(product.description);
    expect(newProduct.price).to.be.equal(product.price);
    expect(newProduct.thumbnail).to.be.equal(product.thumbnail);
    expect(newProduct.code).to.be.equal(product.code);
    expect(newProduct.stock).to.be.equal(product.stock);
    expect(newProduct.category).to.be.equal(product.category);
  });

  it('debe obtener un producto por su id', async () => {
    const product = {
      title: 'Test Product',
      description: 'Test Description',
      price: 100,
      thumbnail: 'Test Thumbnail',
      code: 'Test Code',
      stock: 10,
      category: 'Test Category'
    };
    const newProduct = await productsDao.addProduct(product);
    const productToGet = await productsDao.getProductById(newProduct._id);
    expect(productToGet).to.have.property('_id');
    expect(productToGet.title).to.be.equal(product.title);
    expect(productToGet.description).to.be.equal(product.description);
    expect(productToGet.price).to.be.equal(product.price);
    expect(productToGet.thumbnail).to.be.equal(product.thumbnail);
    expect(productToGet.code).to.be.equal(product.code);
    expect(productToGet.stock).to.be.equal(product.stock);
    expect(productToGet.category).to.be.equal(product.category);
  });

  it('debe actualizar un producto', async () => {
    const product = {
      title: 'Test Product',
      description: 'Test Description',
      price: 100,
      thumbnail: 'Test Thumbnail',
      code: 'Test Code',
      stock: 10,
      category: 'Test Category'
    };
    const newProduct = await productsDao.addProduct(product);
    const productToUpdate = {
      title: 'Test Product Updated',
      description: 'Test Description Updated',
      price: 200,
      thumbnail: 'Test Thumbnail Updated',
      code: 'Test Code Updated',
      stock: 20,
      category: 'Test Category Updated'
    };
    const updatedProduct = await productsDao.updateProduct(newProduct._id, productToUpdate.title, productToUpdate.description, productToUpdate.price, productToUpdate.thumbnail, productToUpdate.code, productToUpdate.stock, productToUpdate.category);
    expect(updatedProduct).to.have.property('_id');
    expect(updatedProduct.title).to.be.equal(productToUpdate.title);
    expect(updatedProduct.description).to.be.equal(productToUpdate.description);
    expect(updatedProduct.price).to.be.equal(productToUpdate.price);
    expect(updatedProduct.thumbnail).to.be.equal(productToUpdate.thumbnail);
    expect(updatedProduct.code).to.be.equal(productToUpdate.code);
    expect(updatedProduct.stock).to.be.equal(productToUpdate.stock);
    expect(updatedProduct.category).to.be.equal(productToUpdate.category);
  });

  it('debe eliminar un producto', async () => {
    const product = {
      title: 'Test Product',
      description: 'Test Description',
      price: 100,
      thumbnail: 'Test Thumbnail',
      code: 'Test Code',
      stock: 10,
      category: 'Test Category'
    };
    const newProduct = await productsDao.addProduct(product);
    const deletedProduct = await productsDao.deleteProduct(newProduct._id);
    expect(deletedProduct).to.have.property('_id');
    expect(deletedProduct.title).to.be.equal(product.title);
    expect(deletedProduct.description).to.be.equal(product.description);
    expect(deletedProduct.price).to.be.equal(product.price);
    expect(deletedProduct.thumbnail).to.be.equal(product.thumbnail);
    expect(deletedProduct.code).to.be.equal(product.code);
    expect(deletedProduct.stock).to.be.equal(product.stock);
    expect(deletedProduct.category).to.be.equal(product.category);
  }
  );

  it('debe obtener productos paginados', async () => {
    const product = {
      title: 'Test Product',
      description: 'Test Description',
      price: 100,
      thumbnail: 'Test Thumbnail',
      code: 'Test Code',
      stock: 10,
      category: 'Test Category'
    };
    await productsDao.addProduct(product);
    const paginatedProducts = await productsDao.getPaginatedProducts(1, 10);
    expect(paginatedProducts).to.have.property('docs');
    expect(paginatedProducts.docs).to.be.an('array');
    expect(paginatedProducts.docs.length).to.be.equal(1);
    expect(paginatedProducts.docs[0]).to.have.property('_id');
    expect(paginatedProducts.docs[0].title).to.be.equal(product.title);
    expect(paginatedProducts.docs[0].description).to.be.equal(product.description);
    expect(paginatedProducts.docs[0].price).to.be.equal(product.price);
    expect(paginatedProducts.docs[0].thumbnail).to.be.equal(product.thumbnail);
    expect(paginatedProducts.docs[0].code).to.be.equal(product.code);
    expect(paginatedProducts.docs[0].stock).to.be.equal(product.stock);
    expect(paginatedProducts.docs[0].category).to.be.equal(product.category);
  });
});